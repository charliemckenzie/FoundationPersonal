/**
 * Creates a GitHub Project (v2) board for Foundation DDS component tracking.
 * Columns: Backlog | In Progress | In Review | Done
 * Assignee field: Paolo / Jade / Adam
 * Populates from docs/components.md status tables.
 *
 * Usage: node scripts/setup-github-project.mjs
 */

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

// ── Load token ──────────────────────────────────────────────────────────────
const envPath = join(root, '.env.local');
const env = readFileSync(envPath, 'utf8');
const tokenMatch = env.match(/GH_TOKEN=(.+)/);
if (!tokenMatch) throw new Error('.env.local missing GH_TOKEN');
const TOKEN = tokenMatch[1].trim();

const REPO_OWNER = 'Paolo-Meyer_artghec';
const REPO_NAME = 'Foundation';
const PROJECT_TITLE = 'Foundation DDS — Component Tracker';

// ── GraphQL helper ───────────────────────────────────────────────────────────
async function gql(query, variables = {}) {
  const res = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query, variables }),
  });
  const json = await res.json();
  if (json.errors) throw new Error(JSON.stringify(json.errors, null, 2));
  return json.data;
}

// ── REST helper ──────────────────────────────────────────────────────────────
async function rest(path, method = 'GET', body = null) {
  const res = await fetch(`https://api.github.com${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      'Content-Type': 'application/json',
      Accept: 'application/vnd.github+json',
    },
    body: body ? JSON.stringify(body) : null,
  });
  return res.json();
}

// ── Parse components.md ──────────────────────────────────────────────────────
function parseComponents() {
  const md = readFileSync(join(root, 'docs/components.md'), 'utf8');
  const components = [];

  const sections = {
    Stable: /## Stable[\s\S]*?(?=## |$)/,
    'In Review': /## In Review[\s\S]*?(?=## |$)/,
    Draft: /## Draft[\s\S]*?(?=## |$)/,
  };

  for (const [stage, pattern] of Object.entries(sections)) {
    const section = md.match(pattern)?.[0] ?? '';
    // Match table rows — skip header and separator rows
    const rows = [...section.matchAll(/^\|([^|]+)\|([^|]+)\|([^|]+)/gm)];
    for (const row of rows) {
      const name = row[1].trim();
      if (name === 'Component' || name.startsWith('---') || name.startsWith('|')) continue;
      const description = row[3]?.trim() ?? '';
      components.push({ name, stage, description });
    }
  }

  return components;
}

// ── Map stage → column ───────────────────────────────────────────────────────
function stageToColumn(stage) {
  if (stage === 'Stable') return 'Done';
  if (stage === 'In Review') return 'In Review';
  return 'In Progress';
}

// ── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  console.log('🔍 Fetching org/user ID...');

  // Get the viewer's node ID (avoids needing read:org scope)
  const viewerData = await gql(`query { viewer { id login } }`);
  const ownerId = viewerData?.viewer?.id;
  console.log(`   Authenticated as: ${viewerData?.viewer?.login} (${ownerId})`);

  if (!ownerId) throw new Error('Could not resolve authenticated user ID');

  // ── Use existing project (already created) ──────────────────────────────
  console.log('\n📋 Looking up existing GitHub Project...');
  const existingProjects = await gql(`
    query($login: String!) {
      user(login: $login) {
        projectsV2(first: 10) {
          nodes { id number url title }
        }
      }
    }
  `, { login: viewerData.viewer.login });

  let project = existingProjects.user.projectsV2.nodes.find(p => p.title === PROJECT_TITLE);
  if (!project) {
    console.log('   Not found — creating...');
    const createProject = await gql(`
      mutation CreateProject($ownerId: ID!, $title: String!) {
        createProjectV2(input: { ownerId: $ownerId, title: $title }) {
          projectV2 { id number url title }
        }
      }
    `, { ownerId, title: PROJECT_TITLE });
    project = createProject.createProjectV2.projectV2;
    console.log(`   Created: ${project.url}`);
  } else {
    console.log(`   Found existing: ${project.url}`);
  }

  // ── Get default Status field & options ───────────────────────────────────
  console.log('\n🔧 Reading Status field...');
  const fieldsData = await gql(`
    query($projectId: ID!) {
      node(id: $projectId) {
        ... on ProjectV2 {
          fields(first: 20) {
            nodes {
              ... on ProjectV2SingleSelectField {
                id name
                options { id name }
              }
            }
          }
        }
      }
    }
  `, { projectId: project.id });

  const statusField = fieldsData.node.fields.nodes.find(f => f.name === 'Status');
  if (!statusField) throw new Error('Status field not found on project');

  const columnMap = {};
  for (const opt of statusField.options) {
    columnMap[opt.name] = opt.id;
  }
  console.log(`   Columns available: ${Object.keys(columnMap).join(', ')}`);

  // GitHub's default columns are: Todo, In Progress, Done
  // We'll rename and add what we need
  // For now map our stages to defaults:
  const stageToOptionId = (stage) => {
    if (stage === 'Stable') return columnMap['Done'];
    if (stage === 'In Review') return columnMap['In Progress'];
    return columnMap['Todo'];
  };

  // ── Get repo ID for creating issues ─────────────────────────────────────
  console.log('\n📦 Fetching repo info...');
  const repoData = await gql(`
    query { repository(owner: "${REPO_OWNER}", name: "${REPO_NAME}") { id } }
  `);
  const repoId = repoData.repository.id;

  // ── Add Assignee label field ─────────────────────────────────────────────
  console.log('\n🏷  Checking Owner field...');
  const fieldsCheck = await gql(`
    query($projectId: ID!) {
      node(id: $projectId) {
        ... on ProjectV2 {
          fields(first: 20) {
            nodes {
              ... on ProjectV2SingleSelectField { id name options { id name } }
            }
          }
        }
      }
    }
  `, { projectId: project.id });

  let ownerField = fieldsCheck.node.fields.nodes.find(f => f.name === 'Owner');

  if (ownerField) {
    console.log(`   Owner field already exists.`);
  } else {
    const addField = await gql(`
      mutation($projectId: ID!) {
        createProjectV2Field(input: {
          projectId: $projectId,
          dataType: SINGLE_SELECT,
          name: "Owner",
          singleSelectOptions: [
            { name: "Paolo", color: BLUE, description: "" },
            { name: "Jade", color: GREEN, description: "" },
            { name: "Adam", color: ORANGE, description: "" }
          ]
        }) {
          projectV2Field {
            ... on ProjectV2SingleSelectField { id name options { id name } }
          }
        }
      }
    `, { projectId: project.id });

    ownerField = addField?.createProjectV2Field?.projectV2Field;
    if (!ownerField) {
      console.log('   ⚠️  Could not create Owner field — continuing without it.');
    } else {
      console.log(`   Owner field created: ${ownerField.name}`);
    }
  }

  // ── Fetch existing issues to avoid duplicates ────────────────────────────
  console.log('\n🔎 Checking existing issues...');
  const existingIssues = await rest(`/repos/${REPO_OWNER}/${REPO_NAME}/issues?state=all&per_page=100`);
  const existingTitles = new Set(Array.isArray(existingIssues) ? existingIssues.map(i => i.title) : []);

  // ── Parse and create issues + add to project ─────────────────────────────
  const components = parseComponents();
  console.log(`\n🧩 Syncing ${components.length} component issues...`);

  for (const comp of components) {
    const issueTitle = `[Component] ${comp.name}`;
    process.stdout.write(`   ${comp.name}...`);

    if (existingTitles.has(issueTitle)) {
      console.log(` ↩ already exists`);
      continue;
    }

    // Create issue
    const issue = await rest(`/repos/${REPO_OWNER}/${REPO_NAME}/issues`, 'POST', {
      title: `[Component] ${comp.name}`,
      body: `**Component:** ${comp.name}\n**Stage:** ${comp.stage}\n\n${comp.description}\n\n_Tracked in Foundation DDS component registry._`,
      labels: [],
    });

    if (!issue.node_id) {
      console.log(` ⚠️  skipped (${issue.message ?? 'unknown error'})`);
      continue;
    }

    // Add issue to project
    const addItem = await gql(`
      mutation($projectId: ID!, $contentId: ID!) {
        addProjectV2ItemById(input: { projectId: $projectId, contentId: $contentId }) {
          item { id }
        }
      }
    `, { projectId: project.id, contentId: issue.node_id });

    const itemId = addItem.addProjectV2ItemById.item.id;

    // Set Status
    const optionId = stageToOptionId(comp.stage);
    if (optionId) {
      await gql(`
        mutation($projectId: ID!, $itemId: ID!, $fieldId: ID!, $optionId: String!) {
          updateProjectV2ItemFieldValue(input: {
            projectId: $projectId,
            itemId: $itemId,
            fieldId: $fieldId,
            value: { singleSelectOptionId: $optionId }
          }) { projectV2Item { id } }
        }
      `, { projectId: project.id, itemId, fieldId: statusField.id, optionId });
    }

    console.log(` ✓ (${comp.stage})`);

    // Small delay to avoid rate limiting
    await new Promise(r => setTimeout(r, 300));
  }

  console.log(`\n✅ Done! View your board:\n   ${project.url}\n`);
}

main().catch(err => {
  console.error('\n❌ Error:', err.message);
  process.exit(1);
});

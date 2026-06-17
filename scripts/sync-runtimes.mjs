#!/usr/bin/env node
// Sync the Copilot runtime (.github) → the Claude Code runtime (.claude).
//
// Canonical source of truth is `.github/` (where personas + skills are authored).
// This script regenerates:
//   - .claude/skills/   <- copy of .github/skills/
//   - .claude/agents/   <- frontmatter generated from .github/agents/ + policy,
//                          preserving each wrapper's hand-written body.
//
// Usage:
//   node scripts/sync-runtimes.mjs           apply changes
//   node scripts/sync-runtimes.mjs --check    report drift only, exit 1 if any (CI)
//
// Why: AGENTS.md is shared and runtime-neutral, but each runtime reads agents/skills
// from its own directory. Without this sync the two drift silently. See AGENTS.md
// "Runtime adapters".

import { readFileSync, writeFileSync, readdirSync, mkdirSync, existsSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const CHECK = process.argv.includes('--check');

// --- policy ---------------------------------------------------------------

// Copilot tool name -> Claude Code tool name(s). [] = no Claude equivalent (drop).
const TOOL_MAP = {
  codebase: ['Read', 'Glob'],
  search: ['Grep', 'Glob'],
  'edit/editFiles': ['Edit', 'Write'],
  editFiles: ['Edit', 'Write'],
  runCommands: ['Bash'],
  runTasks: ['Bash'],
  runTests: ['Bash'],
  terminalLastCommand: ['Bash'],
  terminalSelection: [],
  testFailure: [],
  usages: ['Grep'],
  problems: [],
  changes: ['Bash'],
  openSimpleBrowser: [],
  'web/fetch': ['WebFetch'],
  fetch: ['WebFetch'],
  extensions: [],
  agent: ['Agent'],
};

// Canonical ordering for the generated Claude `tools` list.
const TOOL_ORDER = ['Read', 'Grep', 'Glob', 'Edit', 'Write', 'Bash', 'WebFetch', 'WebSearch', 'Agent'];

// Display name -> Claude subagent slug, where kebab-casing isn't enough.
const SLUG_OVERRIDES = { 'Next.js Expert': 'nextjs-expert' };

// Reasoning-heavy gates run on opus; everything else on sonnet.
const MODEL_POLICY = { moe: 'opus', chalmers: 'opus', flanders: 'opus', 'sideshow-bob': 'opus' };

// Agents that should inherit ALL tools (omit the `tools` field) — e.g. runtime
// a11y tester needs Playwright MCP browser tools.
const TOOL_INHERIT = new Set(['accessibility-runtime-tester']);

// Extra Claude tools to add beyond the translated set.
const TOOL_ADD = { 'search-ai-optimization-expert': ['WebSearch'] };

// --- helpers --------------------------------------------------------------

const changes = [];
function note(action, file) { changes.push(`${action}  ${file.replace(ROOT + '\\', '').replace(ROOT + '/', '')}`); }

function slugify(name) {
  if (SLUG_OVERRIDES[name]) return SLUG_OVERRIDES[name];
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

/** Split a markdown file into { fm: rawFrontmatterText, body: everythingAfter }. */
function splitFrontmatter(text) {
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!m) return { fm: null, body: text };
  return { fm: m[1], body: text.slice(m[0].length) };
}

/** Minimal frontmatter field reader (handles quoted scalars + ['a','b'] arrays). */
function fmField(fm, key) {
  const line = fm.split(/\r?\n/).find((l) => l.startsWith(`${key}:`));
  if (!line) return null;
  let v = line.slice(key.length + 1).trim();
  if (v.startsWith('[') && v.endsWith(']')) {
    return v.slice(1, -1).split(',').map((s) => s.trim().replace(/^['"]|['"]$/g, '')).filter(Boolean);
  }
  return v.replace(/^['"]|['"]$/g, '');
}

function translateTools(copilotTools, slug) {
  if (TOOL_INHERIT.has(slug)) return null;
  const out = new Set();
  for (const t of copilotTools || []) for (const mapped of TOOL_MAP[t] ?? []) out.add(mapped);
  for (const extra of TOOL_ADD[slug] ?? []) out.add(extra);
  return [...out].sort((a, b) => {
    const ia = TOOL_ORDER.indexOf(a), ib = TOOL_ORDER.indexOf(b);
    return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib);
  });
}

function quoteYaml(value) {
  // Descriptions contain colons, so they must be quoted. Prefer double quotes;
  // fall back to single quotes if the value contains a double quote.
  if (!value.includes('"')) return `"${value}"`;
  if (!value.includes("'")) return `'${value}'`;
  return `"${value.replace(/"/g, '\\"')}"`;
}

function buildClaudeFrontmatter({ slug, description, model, tools }) {
  const lines = [`name: ${slug}`, `description: ${quoteYaml(description)}`, `model: ${model}`];
  if (tools !== null) lines.push(`tools: ${tools.join(', ')}`);
  return `---\n${lines.join('\n')}\n---\n`;
}

function defaultBody(slug, display) {
  return `\nYou are **${display}** for the Foundation design system team.\n\n` +
    `Full charter: **AGENTS.md** (§ ${display}). Operate per that. This file adapts you to Claude Code.\n\n` +
    `## Runtime adaptation (Claude Code)\n\n` +
    `- Skill names in AGENTS.md resolve via the **Runtime adapters** table (mirrored under \`.claude/skills/\`).\n` +
    `- Only \`smithers\` carries the \`Agent\` tool; do component discovery inline with \`Read\`/\`Grep\`/\`Glob\`.\n\n` +
    `Speak in character.\n`;
}

function writeIfChanged(path, content) {
  const existing = existsSync(path) ? readFileSync(path, 'utf8') : null;
  if (existing === content) return false;
  if (!CHECK) { mkdirSync(dirname(path), { recursive: true }); writeFileSync(path, content); }
  note(existing === null ? 'CREATE' : 'UPDATE', path);
  return true;
}

// --- 1. skills: copy .github/skills -> .claude/skills ---------------------

function syncSkills() {
  const src = join(ROOT, '.github', 'skills');
  const dst = join(ROOT, '.claude', 'skills');
  for (const name of readdirSync(src)) {
    const sdir = join(src, name);
    if (!statSync(sdir).isDirectory()) continue;
    for (const file of readdirSync(sdir)) {
      const sf = join(sdir, file);
      if (!statSync(sf).isFile()) continue;
      writeIfChanged(join(dst, name, file), readFileSync(sf, 'utf8'));
    }
  }
}

// --- 2. agents: generate .claude/agents from .github/agents ---------------

function syncAgents() {
  const src = join(ROOT, '.github', 'agents');
  const dst = join(ROOT, '.claude', 'agents');
  for (const file of readdirSync(src)) {
    if (!file.endsWith('.agent.md')) continue;
    const { fm } = splitFrontmatter(readFileSync(join(src, file), 'utf8'));
    if (!fm) { console.warn(`! no frontmatter in ${file}, skipping`); continue; }
    const display = fmField(fm, 'name');
    const description = fmField(fm, 'description');
    const slug = slugify(display);
    const model = MODEL_POLICY[slug] ?? 'sonnet';
    const tools = translateTools(fmField(fm, 'tools'), slug);

    const target = join(dst, `${slug}.md`);
    const body = existsSync(target) ? splitFrontmatter(readFileSync(target, 'utf8')).body : defaultBody(slug, display);
    writeIfChanged(target, buildClaudeFrontmatter({ slug, description, model, tools }) + body);
  }
}

// --- run ------------------------------------------------------------------

syncSkills();
syncAgents();

if (changes.length === 0) {
  console.log('✓ runtimes in sync (.github → .claude)');
  process.exit(0);
}
console.log(`${CHECK ? 'DRIFT DETECTED' : 'Synced'} (${changes.length}):`);
for (const c of changes) console.log('  ' + c);
if (CHECK) {
  console.error('\nRun `npm run sync-runtimes` to update .claude/ from .github/.');
  process.exit(1);
}
process.exit(0);

#!/usr/bin/env node
/**
 * Troy McClure's Setup Verification Script
 * "Hi, I'm Troy McClure! You may remember me from such errors as 'missing node_modules'."
 *
 * Run: node scripts/check-setup.mjs
 */

import { execSync } from 'child_process';
import { existsSync, readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { homedir } from 'os';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

// Plugins that must be installed from the marketplace
const REQUIRED_PLUGINS = [
  { id: 'frontend-design@claude-plugins-official', skill: '/frontend-design', usedBy: 'Lenny, Kent Brockman' },
  { id: 'feature-dev@claude-plugins-official', skill: '/feature-dev:feature-dev', usedBy: 'Lenny, Carl, Marge' },
  { id: 'ui-ux-pro-max@ui-ux-pro-max-skill', skill: '/ui-ux-pro-max', usedBy: 'Lenny, Marge, Flanders' },
  { id: 'security-guidance@claude-plugins-official', skill: '/security-review', usedBy: 'Chalmers' },
];

const REQUIRED_NODE_MAJOR = 20;

let passed = 0;
let failed = 0;
let warnings = 0;

function check(label, fn) {
  try {
    const warning = fn();
    if (warning) {
      console.log(`  ⚠  ${label}: ${warning}`);
      warnings++;
    } else {
      console.log(`  ✓  ${label}`);
      passed++;
    }
  } catch (err) {
    console.log(`  ✗  ${label}`);
    console.log(`     ${err.message}`);
    failed++;
  }
}

function cmd(command) {
  return execSync(command, { encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'] }).trim();
}

console.log('\n👋 Hi, I\'m Troy McClure!\n');
console.log('Checking your Foundation setup...\n');

// ── Node.js ──────────────────────────────────────────────────────────────────
console.log('Node.js');

check('Node version', () => {
  const version = process.version;
  const major = parseInt(version.slice(1).split('.')[0], 10);
  if (major < REQUIRED_NODE_MAJOR) {
    throw new Error(`Found ${version}, need v${REQUIRED_NODE_MAJOR}+. Use nvm or fnm to switch.`);
  }
  if (major > 22) {
    return `${version} (newer than tested — things should work but let the team know)`;
  }
});

check('npm available', () => {
  cmd('npm --version');
});

// ── Dependencies ─────────────────────────────────────────────────────────────
console.log('\nDependencies');

check('node_modules installed', () => {
  if (!existsSync(join(root, 'node_modules'))) {
    throw new Error('node_modules missing. Run: npm install');
  }
  if (!existsSync(join(root, 'node_modules', 'next'))) {
    throw new Error('next not found in node_modules. Run: npm install');
  }
});

check('No known vulnerabilities (high+)', () => {
  try {
    const result = cmd('npm audit --audit-level=high --json');
    const audit = JSON.parse(result);
    const high = audit.metadata?.vulnerabilities?.high ?? 0;
    const critical = audit.metadata?.vulnerabilities?.critical ?? 0;
    if (high > 0 || critical > 0) {
      return `${critical} critical, ${high} high vulnerabilities found. Run: npm audit fix`;
    }
  } catch {
    // npm audit exits non-zero when vulns found — that's handled above
  }
});

// ── TypeScript ────────────────────────────────────────────────────────────────
console.log('\nTypeScript');

check('TypeScript compiles without errors', () => {
  try {
    cmd(`npx tsc --noEmit --project "${join(root, 'tsconfig.json')}"`, );
  } catch (err) {
    throw new Error('TypeScript errors found. Run: npx tsc --noEmit to see them.');
  }
});

// ── Next.js ───────────────────────────────────────────────────────────────────
console.log('\nNext.js');

check('next binary available', () => {
  if (!existsSync(join(root, 'node_modules', '.bin', 'next'))) {
    throw new Error('next binary missing. Run: npm install');
  }
});

check('next.config.ts present', () => {
  if (!existsSync(join(root, 'next.config.ts')) && !existsSync(join(root, 'next.config.js'))) {
    throw new Error('next.config.ts not found');
  }
});

// ── Storybook ─────────────────────────────────────────────────────────────────
console.log('\nStorybook');

check('Storybook config present', () => {
  if (!existsSync(join(root, '.storybook', 'main.ts'))) {
    throw new Error('.storybook/main.ts not found');
  }
});

check('Stories directory exists', () => {
  if (!existsSync(join(root, 'src', 'stories'))) {
    throw new Error('src/stories not found');
  }
});

// ── Claude Code ───────────────────────────────────────────────────────────────
console.log('\nClaude Code');

check('Claude Code installed', () => {
  try {
    cmd('claude --version');
  } catch {
    throw new Error('Claude Code not found. Install it: https://claude.ai/code');
  }
});

check('.claude/settings.json present', () => {
  if (!existsSync(join(root, '.claude', 'settings.json'))) {
    throw new Error('.claude/settings.json missing — git pull and check the branch');
  }
});

check('AGENTS.md present', () => {
  if (!existsSync(join(root, 'AGENTS.md'))) {
    throw new Error('AGENTS.md missing — the team instructions are gone!');
  }
});

// ── Claude Code Skills ────────────────────────────────────────────────────────
console.log('\nClaude Code Skills');

check('Plugin registry readable', () => {
  const registryPath = join(homedir(), '.claude', 'plugins', 'installed_plugins.json');
  if (!existsSync(registryPath)) {
    throw new Error('Plugin registry not found. Open Claude Code at least once to initialise it.');
  }
});

(() => {
  const registryPath = join(homedir(), '.claude', 'plugins', 'installed_plugins.json');
  if (!existsSync(registryPath)) return;

  let installed = {};
  try {
    installed = JSON.parse(readFileSync(registryPath, 'utf8')).plugins ?? {};
  } catch {
    check('Plugin registry parseable', () => { throw new Error('Could not parse installed_plugins.json'); });
    return;
  }

  for (const { id, skill, usedBy } of REQUIRED_PLUGINS) {
    check(`${skill} (used by ${usedBy})`, () => {
      if (!installed[id]) {
        throw new Error(
          `Plugin not installed.\n     Fix: open Claude Code and run: /install-plugin ${id}`
        );
      }
    });
  }
})();

// ── Git ───────────────────────────────────────────────────────────────────────
console.log('\nGit');

check('Inside a git repository', () => {
  try {
    cmd('git rev-parse --git-dir');
  } catch {
    throw new Error('Not a git repository. Did you clone it?');
  }
});

check('On a feature branch (not main)', () => {
  const branch = cmd('git rev-parse --abbrev-ref HEAD');
  if (branch === 'main' || branch === 'master') {
    return `You are on ${branch}. Create a feature branch before making changes: git checkout -b feat/your-work`;
  }
});

check('No uncommitted changes from others', () => {
  const status = cmd('git status --porcelain');
  if (status.length > 0) {
    return `${status.split('\n').length} uncommitted change(s) in working tree`;
  }
});

check('gc.auto disabled (OneDrive compat)', () => {
  let gcAuto;
  try {
    gcAuto = cmd('git config --global gc.auto');
  } catch {
    gcAuto = '';
  }
  if (gcAuto !== '0') {
    throw new Error(
      'Git auto-gc is enabled. On OneDrive this causes hundreds of y/n prompts after commits.\n' +
      '     Fix: git config --global gc.auto 0'
    );
  }
});

// ── Summary ───────────────────────────────────────────────────────────────────
console.log('\n' + '─'.repeat(50));
console.log(`\n  ${passed} passed  |  ${warnings} warnings  |  ${failed} failed\n`);

if (failed > 0) {
  console.log('❌ Setup incomplete. Fix the issues above and re-run this script.\n');
  process.exit(1);
} else if (warnings > 0) {
  console.log('✅ Setup complete (with warnings). You\'re good to go — but check the warnings above.\n');
} else {
  console.log('✅ Everything looks great. Welcome to the Foundation team!\n');
  console.log('   Next steps:');
  console.log('   1. Run `npm run storybook` to see the component library');
  console.log('   2. Read AGENTS.md to meet the team');
  console.log('   3. Tell Smithers what you want to build\n');
}

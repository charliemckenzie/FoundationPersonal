#!/usr/bin/env node
/**
 * Always-on context budget meter (AI token efficiency).
 *
 * Measures the context auto-loaded *before any work begins* on each AI runtime.
 * Per docs/Adam/ai-efficiency-research.md there are TWO budgets, and conflating
 * them hides the real win:
 *
 *   FIXED tax     — loaded every session regardless of what you're editing.
 *                   Claude Code: the CLAUDE.md @import chain (followed transitively).
 *                   Copilot: .github/copilot-instructions.md @imports PLUS any
 *                   .github/instructions/*.instructions.md whose `applyTo` matches
 *                   even a non-UI file (i.e. effectively '**' — loads for everything).
 *   UI-conditional — Copilot only: instruction docs that match a UI file but NOT a
 *                   non-UI file (e.g. the a11y catalogue after its glob was narrowed
 *                   to UI surfaces). Loaded when editing components/pages, where it
 *                   belongs — not "tax". Reported separately, never in the guard.
 *
 * The headline saving and the --check guard use the FIXED tax. (Before the a11y glob
 * was narrowed it matched '**', so it counted as fixed — making the before/after a
 * fair comparison: narrowing it MOVED a11y from fixed tax to UI-conditional.)
 *
 * Usage:
 *   node scripts/context-budget.mjs           print both runtimes' budgets
 *   node scripts/context-budget.mjs --check    fail (exit 1) if fixed tax over BUDGET
 *
 * Mirrors scripts/check-setup.mjs (plain .mjs, console output) and the --check
 * shape of scripts/sync-runtimes.mjs. No dependencies.
 */

import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { join, dirname, resolve, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const CHECK = process.argv.includes('--check');

// Token estimate heuristic: ~4 chars per token (good enough for a budget gauge;
// the absolute number isn't load-bearing, the before/after delta is).
const CHARS_PER_TOKEN = 4;

// A typical component edit — used to find Copilot's UI-conditional instruction docs.
const REPRESENTATIVE_UI_FILE = 'src/components/Button/index.tsx';
// A non-UI file — an instruction doc that matches this is fixed tax (loads regardless).
const REPRESENTATIVE_NON_UI_FILE = 'scripts/sync-runtimes.mjs';

// Advisory guard threshold (FIXED-tax tokens per runtime). Set just above the
// post-Phase-1 number for headroom. Phase 1 baseline (committed): ~29.5k/30.3k → ~11.4k.
const BUDGET = 13000;

// --- import-chain resolution ----------------------------------------------

/** Lines that are exactly `@some/path.md` are runtime @imports. */
function parseImports(text) {
  return text
    .split(/\r?\n/)
    .map((l) => l.trim())
    .map((l) => /^@(.+\.md)$/.exec(l)?.[1])
    .filter(Boolean);
}

/** Resolve an @import token to an absolute file. Tokens here are repo-root-relative
 *  (CLAUDE.md sits at root; copilot-instructions.md's `@AGENTS.md` also means root).
 *  Fall back to file-relative for robustness. Returns null if nothing exists. */
function resolveImport(token, fromFileAbs) {
  const candidates = [resolve(ROOT, token), resolve(dirname(fromFileAbs), token)];
  return candidates.find((p) => existsSync(p)) ?? null;
}

/** Walk an entry file's @imports transitively; return unique abs paths in load order. */
function collectChain(entryAbs) {
  const seen = new Set();
  const order = [];
  const visit = (abs) => {
    if (seen.has(abs) || !existsSync(abs)) return;
    seen.add(abs);
    order.push(abs);
    for (const token of parseImports(readFileSync(abs, 'utf8'))) {
      const resolved = resolveImport(token, abs);
      if (resolved) visit(resolved);
    }
  };
  visit(entryAbs);
  return order;
}

// --- Copilot applyTo glob matching ----------------------------------------

/** Read the `applyTo:` scalar from a file's YAML frontmatter (or null). */
function readApplyTo(absFile) {
  const m = /^---\r?\n([\s\S]*?)\r?\n---/.exec(readFileSync(absFile, 'utf8'));
  if (!m) return null;
  const line = m[1].split(/\r?\n/).find((l) => l.trim().startsWith('applyTo:'));
  return line ? line.slice(line.indexOf(':') + 1).trim().replace(/^['"]|['"]$/g, '') : null;
}

/** Convert a single glob to an anchored RegExp. Handles `**` (globstar, crosses /),
 *  `*` (within a segment), and literal segments — the patterns this repo uses. */
function globToRegExp(glob) {
  let re = '';
  for (let i = 0; i < glob.length; i++) {
    const c = glob[i];
    if (c === '*' && glob[i + 1] === '*') {
      i++;
      if (glob[i + 1] === '/') { i++; re += '(?:.*/)?'; } else { re += '.*'; }
    } else if (c === '*') {
      re += '[^/]*';
    } else if ('.+?^${}()|[]\\/'.includes(c)) {
      re += (c === '/') ? '/' : '\\' + c;
    } else {
      re += c;
    }
  }
  return new RegExp('^' + re + '$');
}

/** `applyTo` may be a comma-separated list of globs; match if any one matches. */
function applyToMatches(applyTo, filePath) {
  return applyTo
    .split(',')
    .map((g) => g.trim())
    .filter(Boolean)
    .some((g) => globToRegExp(g).test(filePath));
}

/** Instruction docs (abs paths) that apply to `filePath` via their applyTo glob. */
function instructionFilesFor(filePath) {
  const dir = join(ROOT, '.github', 'instructions');
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((f) => f.endsWith('.instructions.md'))
    .map((f) => join(dir, f))
    .filter((abs) => { const a = readApplyTo(abs); return a && applyToMatches(a, filePath); });
}

// --- measurement + reporting ----------------------------------------------

function measure(absFiles) {
  const files = absFiles.map((abs) => {
    const chars = readFileSync(abs, 'utf8').length;
    return { path: relative(ROOT, abs).replace(/\\/g, '/'), chars, tokens: Math.round(chars / CHARS_PER_TOKEN) };
  });
  const chars = files.reduce((sum, f) => sum + f.chars, 0);
  return { files, chars, tokens: Math.round(chars / CHARS_PER_TOKEN) };
}

function report(name, budget, note) {
  console.log(`\n${name}`);
  for (const f of budget.files) {
    console.log(`  ${f.tokens.toString().padStart(7)} tok  ${f.chars.toString().padStart(7)} ch   ${f.path}`);
  }
  console.log('  ' + '─'.repeat(46));
  console.log(`  ${budget.tokens.toString().padStart(7)} tok  ${budget.chars.toString().padStart(7)} ch   TOTAL${note ? '  — ' + note : ''}`);
}

// --- compute --------------------------------------------------------------

// Claude Code has no applyTo mechanism: its fixed tax is just the @import chain.
const claudeFixed = measure(collectChain(join(ROOT, 'CLAUDE.md')));

// Copilot: @import chain + instruction docs that match a non-UI file = fixed tax.
const copilotChain = collectChain(join(ROOT, '.github', 'copilot-instructions.md'));
const copilotFixedDocs = instructionFilesFor(REPRESENTATIVE_NON_UI_FILE);
const copilotFixed = measure([...new Set([...copilotChain, ...copilotFixedDocs])]);

// Copilot UI-conditional: docs matching a UI file that AREN'T already fixed tax.
const fixedSet = new Set([...copilotChain, ...copilotFixedDocs]);
const copilotUIExtra = measure(instructionFilesFor(REPRESENTATIVE_UI_FILE).filter((p) => !fixedSet.has(p)));

// --- print ----------------------------------------------------------------

console.log('\nAlways-on context budget  (token estimate = chars ÷ ' + CHARS_PER_TOKEN + ')');
report('Claude Code — fixed tax (CLAUDE.md @import chain)', claudeFixed);
report('Copilot — fixed tax (copilot-instructions.md @imports + always-on instruction docs)', copilotFixed);
if (copilotUIExtra.files.length) {
  report(`Copilot — + UI-conditional when editing ${REPRESENTATIVE_UI_FILE}`, copilotUIExtra, 'loaded only on UI files, not tax');
}

console.log('\n' + '═'.repeat(56));
console.log('  FIXED per-session tax (the guarded number):');
console.log(`    Claude Code : ~${claudeFixed.tokens.toLocaleString()} tokens`);
console.log(`    Copilot     : ~${copilotFixed.tokens.toLocaleString()} tokens`);
if (copilotUIExtra.files.length) {
  console.log(`  Copilot when editing a UI file: ~${(copilotFixed.tokens + copilotUIExtra.tokens).toLocaleString()} tokens (fixed + a11y catalogue)`);
}
console.log('═'.repeat(56) + '\n');

if (CHECK) {
  const over = [['Claude Code', claudeFixed.tokens], ['Copilot', copilotFixed.tokens]].filter(([, t]) => t > BUDGET);
  if (over.length) {
    for (const [name, t] of over) console.error(`✗  ${name} fixed tax ~${t} tok exceeds budget ${BUDGET} tok`);
    console.error('\nThe always-on context has grown. Move bulk to on-demand reference, or raise BUDGET deliberately.');
    process.exit(1);
  }
  console.log(`✓  Both runtimes' fixed tax within budget (${BUDGET} tok).\n`);
}

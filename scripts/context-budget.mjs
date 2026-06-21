#!/usr/bin/env node
/**
 * Always-on context budget meter (AI token efficiency — Phase 0).
 *
 * Measures the context auto-loaded *before any work begins* on each AI runtime —
 * the "fixed per-session tax" (see docs/Adam/ai-efficiency-research.md, Finding 1).
 * This is the provable "before" number for the Phase 1 slim, and the mechanism for
 * an advisory guard that stops the bloat creeping back.
 *
 *   Claude Code: CLAUDE.md + everything it @imports, followed transitively.
 *   Copilot:     .github/copilot-instructions.md + its @imports, PLUS every
 *                .github/instructions/*.instructions.md whose `applyTo` glob
 *                matches a representative UI file (the a11y doc is applyTo:'**').
 *
 * Usage:
 *   node scripts/context-budget.mjs           print both runtimes' budgets
 *   node scripts/context-budget.mjs --check    fail (exit 1) if over BUDGET (see below)
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

// The UI file used to decide which Copilot `applyTo` instruction docs are "always-on".
// A typical component edit — matches '**' and '**/*.tsx', not '**/*.spec.ts'.
const REPRESENTATIVE_UI_FILE = 'src/components/Button/index.tsx';

// Advisory guard threshold (tokens per runtime). Intentionally NOT armed in Phase 0:
// it is set in Phase 1, step 1G of docs/Adam/ai-efficiency-implementation-plan.md,
// once the slim establishes the real "after" number. null => --check always passes.
const BUDGET = null;

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

/** Instruction docs that are always-on for Copilot when editing `uiFile`. */
function matchingInstructionFiles(uiFile) {
  const dir = join(ROOT, '.github', 'instructions');
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((f) => f.endsWith('.instructions.md'))
    .map((f) => join(dir, f))
    .filter((abs) => {
      const applyTo = readApplyTo(abs);
      return applyTo && applyToMatches(applyTo, uiFile);
    });
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

function report(name, budget) {
  console.log(`\n${name}`);
  for (const f of budget.files) {
    console.log(`  ${f.tokens.toString().padStart(7)} tok  ${f.chars.toString().padStart(7)} ch   ${f.path}`);
  }
  console.log('  ' + '─'.repeat(46));
  console.log(`  ${budget.tokens.toString().padStart(7)} tok  ${budget.chars.toString().padStart(7)} ch   TOTAL (${budget.files.length} files)`);
}

// --- run ------------------------------------------------------------------

const claude = measure(collectChain(join(ROOT, 'CLAUDE.md')));

const copilotEntry = join(ROOT, '.github', 'copilot-instructions.md');
const copilotChain = collectChain(copilotEntry);
const copilotAll = [...new Set([...copilotChain, ...matchingInstructionFiles(REPRESENTATIVE_UI_FILE)])];
const copilot = measure(copilotAll);

console.log('\nAlways-on context budget  (token estimate = chars ÷ ' + CHARS_PER_TOKEN + ')');
report('Claude Code  — CLAUDE.md @import chain', claude);
report(`Copilot      — copilot-instructions.md @imports + applyTo matches for ${REPRESENTATIVE_UI_FILE}`, copilot);

console.log('\n' + '═'.repeat(48));
console.log(`  Claude Code : ~${claude.tokens.toLocaleString()} tokens`);
console.log(`  Copilot     : ~${copilot.tokens.toLocaleString()} tokens`);
console.log('═'.repeat(48) + '\n');

if (CHECK) {
  if (BUDGET === null) {
    console.log('ℹ  --check: budget guard not yet armed (set in Phase 1, step 1G). Passing.\n');
    process.exit(0);
  }
  const over = [['Claude Code', claude.tokens], ['Copilot', copilot.tokens]].filter(([, t]) => t > BUDGET);
  if (over.length) {
    for (const [name, t] of over) console.error(`✗  ${name} always-on context ~${t} tok exceeds budget ${BUDGET} tok`);
    process.exit(1);
  }
  console.log(`✓  Both runtimes within budget (${BUDGET} tok).\n`);
}

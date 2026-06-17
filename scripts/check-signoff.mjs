#!/usr/bin/env node
// Validate the Foundation pipeline sign-off block.
//
// The pipeline's review gates (Moe → Chalmers → Flanders → Marge → Lisa → Willie)
// are otherwise enforced only by prose, and neither Copilot nor Claude Code share
// memory across agent switches. This makes the PR body the durable, machine-readable
// record of who signed off — so Willie (and CI) can actually verify the gates.
//
// Input (first match wins):
//   - PR_BODY env var            (used by the CI workflow)
//   - a file path argument        node scripts/check-signoff.mjs body.md
//   - stdin                       gh pr view --json body -q .body | node scripts/check-signoff.mjs
//
// Exit 0 = complete or N/A; exit 1 = missing/incomplete sign-off.

import { readFileSync } from 'node:fs';

const GATES = ['Moe', 'Chalmers', 'Flanders', 'Marge', 'Lisa', 'Willie'];
const MARKER = '## Foundation sign-off';

function loadBody() {
  if (process.env.PR_BODY) return process.env.PR_BODY;
  const fileArg = process.argv[2];
  if (fileArg) return readFileSync(fileArg, 'utf8');
  try { return readFileSync(0, 'utf8'); } catch { return ''; }
}

const isPlaceholder = (s) => {
  const v = (s || '').trim().replace(/`/g, '');
  return v === '' || v === '-' || /^tbd$/i.test(v) || /^\.\.\.$/.test(v) || (/^<.*>$/.test(v));
};

function fail(reasons) {
  console.error('✗ Foundation sign-off incomplete:\n');
  for (const r of reasons) console.error('  • ' + r);
  console.error('\nFill the sign-off block in the PR description (every gate checked with a one-line');
  console.error('evidence pointer), or replace the block with "Sign-off: N/A — <reason>" for');
  console.error('non-component PRs. See AGENTS.md → "Pipeline sign-off".');
  process.exit(1);
}

// Strip HTML comments first, so the template's own instructions (and any
// commented-out gate lines) are never parsed as real content.
const body = (loadBody() || '').replace(/\r\n/g, '\n').replace(/<!--[\s\S]*?-->/g, '');

// Non-component PRs explicitly opt out.
if (/sign-?off:\s*n\/?a/i.test(body)) {
  console.log('✓ Sign-off: N/A acknowledged.');
  process.exit(0);
}

if (!body.includes(MARKER)) {
  fail([`No "${MARKER}" block found, and no "Sign-off: N/A — <reason>" present.`]);
}

const reasons = [];

// Component + target status must be filled.
const component = (body.match(/Component:\s*(.+)/) || [])[1];
const status = (body.match(/Target status:\s*(.+)/) || [])[1];
if (isPlaceholder(component)) reasons.push('`Component:` is empty or still a placeholder.');
if (isPlaceholder(status)) reasons.push('`Target status:` is empty or still a placeholder.');

// Parse gate checkbox lines: "- [x] **Owner** — label: evidence"
const gateLine = /^- \[([ xX])\]\s*\*\*([A-Za-z]+)\*\*\s*[—:-].*?:\s*(.*)$/;
const found = new Map();
for (const line of body.split('\n')) {
  const m = line.match(gateLine);
  if (m && GATES.includes(m[2])) found.set(m[2], { checked: m[1].toLowerCase() === 'x', evidence: m[3] });
}

for (const gate of GATES) {
  const entry = found.get(gate);
  if (!entry) { reasons.push(`${gate} — gate line missing.`); continue; }
  if (!entry.checked) reasons.push(`${gate} — not checked (\`[ ]\`).`);
  else if (isPlaceholder(entry.evidence)) reasons.push(`${gate} — checked but no evidence pointer.`);
}

if (reasons.length) fail(reasons);

console.log(`✓ Foundation sign-off complete for "${component.trim()}" → ${status.trim()} (all ${GATES.length} gates).`);
process.exit(0);

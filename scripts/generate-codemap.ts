#!/usr/bin/env tsx
/**
 * Foundation code map generator (AI token efficiency — Phase 2).
 *
 * Builds one in-memory graph of the component library and serialises it to three
 * artifacts (all GENERATED — never hand-edit; change the source and regenerate):
 *   - codemap.json          compact, canonical, for the AI to load on demand
 *   - CODEMAP.md            a skimmable table rendering
 *   - docs/codemap/*.md     an Obsidian vault (one wikilinked note per node) for humans
 *
 * Node model (decided — see docs/Adam/ai-efficiency-implementation-plan.md §2C):
 *   - Nodes are CODE-DERIVED: real components found via the public barrel (src/index.ts)
 *     plus internal top-level component dirs not exported there. `status` is overlaid
 *     from src/stories/component-status.ts by name (unmatched → 'unknown', flagged).
 *   - `partOf`  = containment, derived from path nesting (SideNav partOf MemberOnline).
 *   - `composes` = dependency, from a ts-morph pass over each node's Foundation imports.
 *   - `usedBy`  = the inverse of composes.
 * Pure-container dirs (MemberOnline, Charts — an index that only re-exports children)
 * get a synthetic `container` node so children have a parent; they carry no status.
 *
 * Usage:
 *   tsx scripts/generate-codemap.ts            write the artifacts
 *   tsx scripts/generate-codemap.ts --check     report drift/integrity, exit 1 on drift
 *
 * Mould: scripts/generate-tokens.ts (tsx + imports from src) and the --check/diff
 * shape of scripts/sync-runtimes.mjs.
 */

import { Project } from 'ts-morph';
import { readdirSync, existsSync, mkdirSync, readFileSync, writeFileSync, rmSync, statSync } from 'node:fs';
import { join, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { COMPONENTS } from '../src/stories/component-status';

const ROOT = norm(join(dirname(fileURLToPath(import.meta.url)), '..'));
const COMPONENTS_DIR = ROOT + '/src/components';
const CHECK = process.argv.includes('--check');

function norm(p: string): string { return p.replace(/\\/g, '/'); }
function rel(abs: string): string { return norm(relative(ROOT, abs)); }

type Kind = 'component' | 'container';
interface CodemapNode {
  name: string;
  kind: Kind;
  status: string;
  path: string;            // dir, repo-relative
  dir: string;             // dir, absolute-normalised (internal only)
  story?: string;
  partOf?: string;
  composes: Set<string>;
  usedBy: Set<string>;
  exports: Set<string>;
}

// --- build the project + barrel ------------------------------------------

const project = new Project({ tsConfigFilePath: ROOT + '/tsconfig.json' });
const barrel = project.getSourceFileOrThrow(ROOT + '/src/index.ts');

/** True for declaration kinds that represent a runtime value (a component), not a type. */
function isValueDecl(kindName: string): boolean {
  return kindName === 'FunctionDeclaration' || kindName === 'VariableDeclaration' || kindName === 'ClassDeclaration';
}

/** Exported name -> { file, isValue } for every public-barrel export. */
function readBarrelExports(): Map<string, { file: string; isValue: boolean }> {
  const out = new Map<string, { file: string; isValue: boolean }>();
  for (const [name, decls] of barrel.getExportedDeclarations()) {
    const decl = decls[0];
    if (!decl) continue;
    out.set(name, { file: norm(decl.getSourceFile().getFilePath()), isValue: isValueDecl(decl.getKindName()) });
  }
  return out;
}

// --- assemble nodes -------------------------------------------------------

const nodes = new Map<string, CodemapNode>();
const statusByName = new Map(COMPONENTS.map((c) => [c.name, c]));

function addNode(name: string, dir: string, kind: Kind): CodemapNode {
  const entry = statusByName.get(name);
  const node: CodemapNode = {
    name, kind, dir: norm(dir), path: rel(dir),
    status: kind === 'container' ? 'container' : entry?.status ?? 'unknown',
    story: entry?.story, composes: new Set(), usedBy: new Set(), exports: new Set(),
  };
  nodes.set(name, node);
  return node;
}

/** Component nodes from the public barrel (value exports living under src/components). */
function addBarrelNodes(exports: Map<string, { file: string; isValue: boolean }>): void {
  for (const [name, { file, isValue }] of exports) {
    if (!isValue || !file.startsWith(COMPONENTS_DIR + '/')) continue;
    addNode(name, dirname(file), 'component');
  }
}

/** Container nodes (dirs that only re-export children) + internal component dirs. */
function addDirNodes(): void {
  for (const dirName of readdirSync(COMPONENTS_DIR)) {
    const dir = norm(join(COMPONENTS_DIR, dirName));
    if (!statSync(dir).isDirectory()) continue;
    if (!existsSync(join(dir, 'index.tsx')) && !existsSync(join(dir, 'index.ts'))) continue; // skip buttons/, inputs/
    const owned = [...nodes.values()].filter((n) => n.dir === dir);
    if (owned.length) continue;                                   // a component already owns this dir
    const hasChildren = [...nodes.values()].some((n) => n.dir.startsWith(dir + '/'));
    addNode(dirName, dir, hasChildren ? 'container' : 'component'); // container vs internal component
  }
}

/** Attach exported symbol names to the node whose dir owns their source file. */
function attachExports(exports: Map<string, { file: string; isValue: boolean }>): void {
  for (const [name, { file }] of exports) {
    const owner = ownerOf(file);
    if (owner) owner.exports.add(name);
  }
}

// --- edges ----------------------------------------------------------------

let nodesByDirDesc: CodemapNode[] = [];
/** The node whose dir is the longest prefix of an absolute file/dir path. */
function ownerOf(absFile: string): CodemapNode | undefined {
  const f = norm(absFile);
  return nodesByDirDesc.find((n) => f === n.dir || f.startsWith(n.dir + '/'));
}

/** `partOf` = the nearest strictly-ancestor node's dir. */
function computePartOf(): void {
  for (const node of nodes.values()) {
    const parent = nodesByDirDesc.find((n) => n !== node && node.dir.startsWith(n.dir + '/'));
    if (parent) node.partOf = parent.name;
  }
}

/** `composes` = Foundation components imported by files each node owns (ts-morph). */
function computeComposes(): void {
  for (const sf of project.getSourceFiles()) {
    const file = norm(sf.getFilePath());
    if (!file.startsWith(COMPONENTS_DIR + '/')) continue;
    if (/\.(stories|test|spec)\.|\.d\.ts$/.test(file)) continue;
    const owner = ownerOf(file);
    if (!owner) continue;
    for (const imp of sf.getImportDeclarations()) {
      if (imp.isTypeOnly()) continue;
      const target = imp.getModuleSpecifierSourceFile();
      const targetOwner = target && ownerOf(norm(target.getFilePath()));
      if (targetOwner && targetOwner !== owner) owner.composes.add(targetOwner.name);
    }
  }
  for (const node of nodes.values())
    for (const dep of node.composes) nodes.get(dep)?.usedBy.add(node.name);
}

// --- serialise ------------------------------------------------------------

const sortedNames = (s: Set<string>) => [...s].sort();
function sortedNodes(): CodemapNode[] { return [...nodes.values()].sort((a, b) => a.name.localeCompare(b.name)); }

function buildJson(): string {
  const byStatus: Record<string, number> = {};
  for (const n of nodes.values()) byStatus[n.status] = (byStatus[n.status] ?? 0) + 1;
  const payload = {
    generatedBy: 'scripts/generate-codemap.ts',
    note: 'GENERATED — do not hand-edit. Run `npm run generate-codemap`.',
    counts: { total: nodes.size, byStatus },
    nodes: sortedNodes().map((n) => ({
      name: n.name, kind: n.kind, status: n.status, path: n.path,
      ...(n.story ? { story: n.story } : {}),
      ...(n.partOf ? { partOf: n.partOf } : {}),
      composes: sortedNames(n.composes), usedBy: sortedNames(n.usedBy), exports: sortedNames(n.exports),
    })),
  };
  return JSON.stringify(payload, null, 2) + '\n';
}

function buildCatalogueMd(): string {
  const rows = sortedNodes().map((n) => {
    const composes = sortedNames(n.composes).join(', ') || '—';
    const usedBy = sortedNames(n.usedBy).join(', ') || '—';
    return `| ${n.name} | ${n.status} | \`${n.path}\` | ${composes} | ${usedBy} |`;
  });
  return [
    '<!-- GENERATED by scripts/generate-codemap.ts — do not hand-edit. Run `npm run generate-codemap`. -->',
    '# Foundation code map', '',
    `${nodes.size} nodes. Status is owned by \`src/stories/component-status.ts\`; structure and edges are derived from code.`, '',
    '| Component | Status | Path | Composes | Used by |', '|---|---|---|---|---|',
    ...rows, '',
  ].join('\n');
}

function buildNoteMd(n: CodemapNode): string {
  const link = (name: string) => `[[${name}]]`;
  const lines = [
    '---', `status: ${n.status}`, `path: ${n.path}`, `kind: ${n.kind}`,
    ...(n.partOf ? [`partOf: ${n.partOf}`] : []),
    `composes: [${sortedNames(n.composes).join(', ')}]`, '---',
    '<!-- GENERATED by scripts/generate-codemap.ts — do not hand-edit. -->',
    `# ${n.name}`, '',
  ];
  if (n.partOf) lines.push(`**Part of:** ${link(n.partOf)}`);
  if (n.composes.size) lines.push(`**Composes:** ${sortedNames(n.composes).map(link).join(' · ')}`);
  if (n.usedBy.size) lines.push(`**Used by:** ${sortedNames(n.usedBy).map(link).join(' · ')}`);
  if (n.story) lines.push('', `**Story:** \`${n.story}\``);
  return lines.join('\n') + '\n';
}

// --- write / check --------------------------------------------------------

const drift: string[] = [];
function reconcile(path: string, content: string): void {
  const existing = existsSync(path) ? readFileSync(path, 'utf8') : null;
  if (existing === content) return;
  drift.push((existing === null ? 'create ' : 'update ') + rel(path));
  if (!CHECK) { mkdirSync(dirname(path), { recursive: true }); writeFileSync(path, content); }
}

/** Write the vault and drop any stale generated note no longer in the model. */
function reconcileVault(): void {
  const dir = ROOT + '/docs/codemap';
  const wanted = new Map(sortedNodes().map((n) => [`${n.name}.md`, buildNoteMd(n)]));
  wanted.set('README.md', '<!-- GENERATED by scripts/generate-codemap.ts — do not hand-edit. -->\n# Code map vault\n\nGenerated Obsidian vault — one note per Foundation component, linked by `[[wikilinks]]`. Open `docs/codemap/` as an Obsidian vault for the graph view + backlinks. Source of truth is the code; run `npm run generate-codemap`.\n');
  for (const [file, content] of wanted) reconcile(join(dir, file), content);
  if (existsSync(dir))
    for (const file of readdirSync(dir))
      if (file.endsWith('.md') && !wanted.has(file)) { drift.push('delete  docs/codemap/' + file); if (!CHECK) rmSync(join(dir, file)); }
}

// --- integrity ------------------------------------------------------------

function integrity(): string[] {
  const issues: string[] = [];
  for (const n of nodes.values())
    if (n.kind === 'component' && n.status === 'unknown')
      issues.push(`no status: '${n.name}' (${n.path}) has no entry in component-status.ts`);
  for (const c of COMPONENTS)
    if (!nodes.has(c.name)) issues.push(`no code: '${c.name}' in component-status.ts resolves to no component`);
  return issues.sort();
}

// --- run ------------------------------------------------------------------

const barrelExports = readBarrelExports();
addBarrelNodes(barrelExports);
addDirNodes();
nodesByDirDesc = [...nodes.values()].sort((a, b) => b.dir.length - a.dir.length);
attachExports(barrelExports);
computePartOf();
computeComposes();

reconcile(ROOT + '/codemap.json', buildJson());
reconcile(ROOT + '/CODEMAP.md', buildCatalogueMd());
reconcileVault();

const issues = integrity();
console.log(`\nCode map: ${nodes.size} nodes (${[...nodes.values()].filter((n) => n.kind === 'container').length} containers).`);
if (issues.length) {
  console.log(`\n⚠  ${issues.length} integrity issue(s) — advisory (status is Willie's call):`);
  for (const i of issues) console.log('   • ' + i);
}

if (CHECK) {
  if (drift.length) {
    console.error(`\n✗  codemap artifacts are stale (${drift.length}):`);
    for (const d of drift) console.error('   ' + d);
    console.error('\nRun `npm run generate-codemap` and commit the result.');
    process.exit(1);
  }
  console.log('\n✓  codemap artifacts up to date.\n');
} else {
  console.log(drift.length ? `\nWrote ${drift.length} change(s).\n` : '\nNo changes.\n');
}

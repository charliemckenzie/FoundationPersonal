/**
 * Pushes design tokens from tokens.json into Figma as native Variables via the REST API.
 *
 * Usage:
 *   npm run generate-tokens                              # build tokens.json first
 *   FIGMA_TOKEN=<personal_access_token> \
 *     FIGMA_FILE=<file_key> \
 *     node scripts/figma-import-variables.mjs
 *
 * The file key is the string in your Figma file URL:
 *   https://www.figma.com/file/<FILE_KEY>/...
 *
 * Requires:
 *   - Figma plan that supports Variables (Pro or above)
 *   - Personal access token with `file_variables:write` scope
 *
 * Idempotency:
 *   On first run, all collections/modes/variables are CREATE'd and the resulting
 *   IDs are written to `figma-id-map.json`. Subsequent runs read that file and
 *   issue UPDATE actions, preserving variable identity in Figma (so existing
 *   library subscribers don't see breakage). Delete the map to start fresh.
 */

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const TOKENS_PATH = resolve(__dirname, '../tokens.json');
const ID_MAP_PATH = resolve(__dirname, '../figma-id-map.json');

// ── Load tokens ──────────────────────────────────────────────────────────────

if (!existsSync(TOKENS_PATH)) {
  console.error(`tokens.json not found at ${TOKENS_PATH}.`);
  console.error('Run `npm run generate-tokens` first.');
  process.exit(1);
}

const tokens = JSON.parse(readFileSync(TOKENS_PATH, 'utf8'));

const env = {
  token:   process.env.FIGMA_TOKEN,
  fileKey: process.env.FIGMA_FILE,
};

if (!env.token || !env.fileKey) {
  console.error('Missing env vars. Set FIGMA_TOKEN and FIGMA_FILE before running.');
  process.exit(1);
}

// ── ID map (for idempotent updates) ───────────────────────────────────────────

let idMap = { collections: {}, modes: {}, variables: {} };
if (existsSync(ID_MAP_PATH)) {
  idMap = JSON.parse(readFileSync(ID_MAP_PATH, 'utf8'));
  console.log(`Loaded existing id map → will UPDATE existing variables.`);
} else {
  console.log(`No id map found → will CREATE new variables on this run.`);
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function hexToFigmaColor(hex) {
  const h = hex.replace('#', '');
  const r = parseInt(h.slice(0, 2), 16) / 255;
  const g = parseInt(h.slice(2, 4), 16) / 255;
  const b = parseInt(h.slice(4, 6), 16) / 255;
  const a = h.length === 8 ? parseInt(h.slice(6, 8), 16) / 255 : 1;
  return { r, g, b, a };
}

/**
 * DTCG alias values from generate-tokens.ts look like `{primitives.scale.step}`.
 * Resolve to the corresponding Figma variable id from the id map (or temp id on first run).
 */
function resolveAlias(value, getVarId) {
  const match = /^\{primitives\.([^.]+)\.([^}]+)\}$/.exec(value);
  if (!match) return null;
  const [, scale, step] = match;
  const tempId = `primitives.${scale}.${step}`;
  return { type: 'VARIABLE_ALIAS', id: getVarId(tempId) };
}

function getOrCreateId(map, key, kind) {
  if (map[key]) return map[key];
  const newId = `tmp_${kind}_${key.replace(/[^a-zA-Z0-9_]/g, '_')}`;
  map[key] = newId;
  return newId;
}

// ── Build the API payload ────────────────────────────────────────────────────

const variableCollections = [];
const variableModes = [];
const variables = [];
const variableModeValues = [];

// Collections:
//   - "Primitives"      — single mode "Value"
//   - "Semantic — ART"  — modes "Light", "Dark"
//   - "Semantic — QSuper" — modes "Light", "Dark"
//   - "Action Opacity"  — modes "Light", "Dark"
//   - "Spacing"         — single mode "Value"
//   - "Radius"          — single mode "Value"
//   - "Typography"      — single mode "Value"

function addCollection(collKey, name, modes) {
  const collId = getOrCreateId(idMap.collections, collKey, 'coll');
  const action = idMap.collections[collKey] && !collId.startsWith('tmp_') ? 'UPDATE' : 'CREATE';
  const initialModeId = getOrCreateId(idMap.modes, `${collKey}.${modes[0]}`, 'mode');
  variableCollections.push({ action, id: collId, name, ...(action === 'CREATE' ? { initialModeId } : {}) });
  for (const modeName of modes) {
    const modeKey = `${collKey}.${modeName}`;
    const modeId = getOrCreateId(idMap.modes, modeKey, 'mode');
    const modeAction = idMap.modes[modeKey] && !modeId.startsWith('tmp_') ? 'UPDATE' : 'CREATE';
    // Skip re-creating the initial mode (Figma auto-creates it with the collection)
    if (modeAction === 'CREATE' && modeName === modes[0]) continue;
    variableModes.push({ action: modeAction, id: modeId, name: modeName, variableCollectionId: collId });
  }
  return collId;
}

function modeId(collKey, modeName) {
  return idMap.modes[`${collKey}.${modeName}`];
}

function addVariable(varKey, name, resolvedType, collId) {
  const varId = getOrCreateId(idMap.variables, varKey, 'var');
  const action = idMap.variables[varKey] && !varId.startsWith('tmp_') ? 'UPDATE' : 'CREATE';
  variables.push({ action, id: varId, name, resolvedType, variableCollectionId: collId });
  return varId;
}

function setColorValue(varId, modeId, value) {
  let figmaValue;
  if (typeof value === 'string' && value.startsWith('#')) {
    figmaValue = hexToFigmaColor(value);
  } else if (typeof value === 'string' && value.startsWith('{')) {
    figmaValue = resolveAlias(value, (key) => idMap.variables[key]);
    if (!figmaValue) {
      console.warn(`Unresolved alias: ${value} — emitting transparent placeholder.`);
      figmaValue = { r: 0, g: 0, b: 0, a: 0 };
    }
  } else {
    console.warn(`Unexpected color value: ${value}`);
    return;
  }
  variableModeValues.push({ variableId: varId, modeId, value: figmaValue });
}

function setScalarValue(varId, modeId, value) {
  variableModeValues.push({ variableId: varId, modeId, value });
}

// Walk a token group, calling visit for each leaf token. Supports nested groups.
function walkTokens(group, path, visit) {
  for (const [key, node] of Object.entries(group)) {
    const nextPath = [...path, key];
    if (node && typeof node === 'object' && 'value' in node && 'type' in node) {
      visit(nextPath, node);
    } else if (node && typeof node === 'object') {
      walkTokens(node, nextPath, visit);
    }
  }
}

// 1. Primitives — CREATE first so other collections can alias them
const primitivesColl = addCollection('primitives', 'Primitives', ['Value']);
walkTokens(tokens.primitives, ['primitives'], (path, token) => {
  // path = ['primitives', 'trueBlue', '500'] or ['primitives', 'white', 'value']
  const [, scale, step] = path;
  const varKey = `primitives.${scale}.${step}`;
  // white/black are single-value primitives — name them without the '/value' suffix
  const varName = (step === 'value' && (scale === 'white' || scale === 'black'))
    ? scale
    : `${scale}/${step}`;
  const varId = addVariable(varKey, varName, 'COLOR', primitivesColl);
  setColorValue(varId, modeId('primitives', 'Value'), token.value);
});

// 2. Semantic — ART (Light + Dark)
const artColl = addCollection('semantic-art', 'Semantic — ART', ['Light', 'Dark']);
for (const mode of ['light', 'dark']) {
  const modeName = mode === 'light' ? 'Light' : 'Dark';
  const modeIdResolved = modeId('semantic-art', modeName);
  walkTokens(tokens['semantic-art'][mode], [], (path, token) => {
    // path = ['primary', 'main'] or ['background', 'default']
    const varKey = `semantic-art.${path.join('.')}`;
    const varName = path.join('/');
    const varId = addVariable(varKey, varName, 'COLOR', artColl);
    setColorValue(varId, modeIdResolved, token.value);
  });
}

// 3. Semantic — QSuper (Light + Dark)
const qsuperColl = addCollection('semantic-qsuper', 'Semantic — QSuper', ['Light', 'Dark']);
for (const mode of ['light', 'dark']) {
  const modeName = mode === 'light' ? 'Light' : 'Dark';
  const modeIdResolved = modeId('semantic-qsuper', modeName);
  walkTokens(tokens['semantic-qsuper'][mode], [], (path, token) => {
    const varKey = `semantic-qsuper.${path.join('.')}`;
    const varName = path.join('/');
    const varId = addVariable(varKey, varName, 'COLOR', qsuperColl);
    setColorValue(varId, modeIdResolved, token.value);
  });
}

// 4. Action Opacity (Light + Dark)
const opacityColl = addCollection('action-opacity', 'Action Opacity', ['Light', 'Dark']);
for (const mode of ['light', 'dark']) {
  const modeName = mode === 'light' ? 'Light' : 'Dark';
  const modeIdResolved = modeId('action-opacity', modeName);
  walkTokens(tokens['action-opacity'][mode], [], (path, token) => {
    const varKey = `action-opacity.${path.join('.')}`;
    const varName = path.join('/');
    const varId = addVariable(varKey, varName, 'FLOAT', opacityColl);
    setScalarValue(varId, modeIdResolved, token.value);
  });
}

// 5. Spacing — single Value mode, FLOAT type (Figma stores px)
const spacingColl = addCollection('spacing', 'Spacing', ['Value']);
walkTokens(tokens.spacing, [], (path, token) => {
  const varKey = `spacing.${path.join('.')}`;
  const varName = path.join('/');
  const varId = addVariable(varKey, varName, 'FLOAT', spacingColl);
  setScalarValue(varId, modeId('spacing', 'Value'), token.value);
});

// 6. Radius — single Value mode
const radiusColl = addCollection('radius', 'Radius', ['Value']);
walkTokens(tokens.radius, [], (path, token) => {
  const varKey = `radius.${path.join('.')}`;
  const varName = path.join('/');
  const varId = addVariable(varKey, varName, 'FLOAT', radiusColl);
  setScalarValue(varId, modeId('radius', 'Value'), token.value);
});

// 7. Typography — single Value mode. Mixed FLOAT/STRING; skip nested fontFamily groups for now.
const typoColl = addCollection('typography', 'Typography', ['Value']);
walkTokens(tokens.typography, [], (path, token) => {
  const varKey = `typography.${path.join('.')}`;
  const varName = path.join('/');
  const figmaType = token.type === 'number' ? 'FLOAT' : 'STRING';
  const varId = addVariable(varKey, varName, figmaType, typoColl);
  setScalarValue(varId, modeId('typography', 'Value'), token.value);
});

// ── Send to Figma ────────────────────────────────────────────────────────────

const payload = { variableCollections, variableModes, variables, variableModeValues };

console.log(`Pushing to Figma file ${env.fileKey}:`);
console.log(`  ${variableCollections.length} collections (${variableCollections.filter((c) => c.action === 'CREATE').length} new)`);
console.log(`  ${variables.length} variables (${variables.filter((v) => v.action === 'CREATE').length} new)`);
console.log(`  ${variableModeValues.length} mode values`);

const res = await fetch(`https://api.figma.com/v1/files/${env.fileKey}/variables`, {
  method: 'POST',
  headers: { 'X-Figma-Token': env.token, 'Content-Type': 'application/json' },
  body: JSON.stringify(payload),
});

const json = await res.json();

if (!res.ok) {
  console.error('Figma API error:', JSON.stringify(json, null, 2));
  process.exit(1);
}

// Update id map with the real IDs Figma assigned, so subsequent runs UPDATE rather than CREATE.
// Figma's response includes a `meta.tempIdToRealId` map for resources created on this request.
const tempIdToRealId = json?.meta?.tempIdToRealId ?? {};
function applyRealIds(map) {
  for (const [key, id] of Object.entries(map)) {
    if (tempIdToRealId[id]) map[key] = tempIdToRealId[id];
  }
}
applyRealIds(idMap.collections);
applyRealIds(idMap.modes);
applyRealIds(idMap.variables);

writeFileSync(ID_MAP_PATH, JSON.stringify(idMap, null, 2) + '\n');

console.log('Done. id map saved → re-runs will issue UPDATE actions.');

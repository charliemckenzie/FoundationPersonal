/**
 * Imports design tokens into Figma as native variables via the REST API.
 *
 * Usage:
 *   FIGMA_TOKEN=<personal_access_token> FIGMA_FILE=<file_key> node scripts/figma-import-variables.mjs
 *
 * The file key is the string in your Figma file URL:
 *   https://www.figma.com/file/<FILE_KEY>/...
 *
 * Requires a Figma plan that supports variables (Pro or above).
 */

// ─── Primitive scales (source of truth from src/app/themes/primitives/colors.ts) ───

const scales = {
  neutral: {
    50: '#f8fafc', 100: '#f1f5f9', 200: '#e2e8f0', 300: '#cbd5e1',
    400: '#94a3b8', 500: '#64748b', 600: '#475569', 700: '#334155',
    800: '#1e293b', 900: '#0f172a', 950: '#020617',
  },
  blue: {
    50: '#eff6ff', 100: '#dbeafe', 200: '#bfdbfe', 300: '#93c5fd',
    400: '#60a5fa', 500: '#3b82f6', 600: '#2563eb', 700: '#1d4ed8',
    800: '#1e40af', 900: '#1e3a8a', 950: '#172554',
  },
  violet: {
    50: '#f5f3ff', 100: '#ede9fe', 200: '#ddd6fe', 300: '#c4b5fd',
    400: '#a78bfa', 500: '#8b5cf6', 600: '#7c3aed', 700: '#6d28d9',
    800: '#5b21b6', 900: '#4c1d95', 950: '#2e1065',
  },
  green: {
    50: '#ecfdf5', 100: '#d1fae5', 200: '#a7f3d0', 300: '#6ee7b7',
    400: '#34d399', 500: '#10b981', 600: '#059669', 700: '#047857',
    800: '#065f46', 900: '#064e3b', 950: '#022c22',
  },
  red: {
    50: '#fff1f2', 100: '#ffe4e6', 200: '#fecdd3', 300: '#fda4af',
    400: '#fb7185', 500: '#f43f5e', 600: '#e11d48', 700: '#be123c',
    800: '#9f1239', 900: '#881337', 950: '#4c0519',
  },
  amber: {
    50: '#fffbeb', 100: '#fef3c7', 200: '#fde68a', 300: '#fcd34d',
    400: '#fbbf24', 500: '#f59e0b', 600: '#d97706', 700: '#b45309',
    800: '#92400e', 900: '#78350f', 950: '#451a03',
  },
  cyan: {
    50: '#ecfeff', 100: '#cffafe', 200: '#a5f3fc', 300: '#67e8f9',
    400: '#22d3ee', 500: '#06b6d4', 600: '#0891b2', 700: '#0e7490',
    800: '#155e75', 900: '#164e63', 950: '#083344',
  },
};

// ─── Semantic tokens (from src/app/themes/semantic.ts) ────────────────────────
// Each entry: [tokenPath, lightAlias, darkAlias | darkHex]

const semanticTokens = [
  // primary (foundation brand = blue)
  ['primary/light',        'blue/400',    'blue/300'],
  ['primary/main',         'blue/600',    'blue/400'],
  ['primary/dark',         'blue/700',    'blue/600'],
  ['primary/contrastText', '#ffffff',     '#ffffff'],
  // secondary (foundation brand = violet)
  ['secondary/light',        'violet/400',  'violet/300'],
  ['secondary/main',         'violet/500',  'violet/400'],
  ['secondary/dark',         'violet/700',  'violet/600'],
  ['secondary/contrastText', '#ffffff',     '#ffffff'],
  // error
  ['error/light',        'red/400',  'red/300'],
  ['error/main',         'red/600',  'red/400'],
  ['error/dark',         'red/700',  'red/600'],
  ['error/contrastText', '#ffffff',  '#ffffff'],
  // warning
  ['warning/light',        'amber/300', 'amber/300'],
  ['warning/main',         'amber/500', 'amber/400'],
  ['warning/dark',         'amber/700', 'amber/500'],
  ['warning/contrastText', '#000000',  '#000000'],
  // info
  ['info/light',        'cyan/400', 'cyan/300'],
  ['info/main',         'cyan/600', 'cyan/400'],
  ['info/dark',         'cyan/700', 'cyan/600'],
  ['info/contrastText', '#ffffff',  '#000000'],
  // success
  ['success/light',        'green/400', 'green/300'],
  ['success/main',         'green/600', 'green/400'],
  ['success/dark',         'green/700', 'green/600'],
  ['success/contrastText', '#ffffff',   '#000000'],
  // background
  ['background/default', 'neutral/50',  'neutral/950'],
  ['background/paper',   '#ffffff',     'neutral/900'],
  // text
  ['text/primary',   'neutral/900', 'neutral/50'],
  ['text/secondary', 'neutral/600', 'neutral/400'],
  ['text/disabled',  'neutral/400', 'neutral/600'],
  // divider
  ['divider', 'neutral/200', 'neutral/800'],
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function hexToFigmaColor(hex) {
  const h = hex.replace('#', '');
  return {
    r: parseInt(h.slice(0, 2), 16) / 255,
    g: parseInt(h.slice(2, 4), 16) / 255,
    b: parseInt(h.slice(4, 6), 16) / 255,
    a: 1,
  };
}

function primitiveVarId(scaleName, step) {
  return `var_primitive_${scaleName}_${step}`;
}

function isHex(value) {
  return value.startsWith('#');
}

// ─── Build the API payload ────────────────────────────────────────────────────

const COL_PRIMITIVES = 'col_primitives';
const COL_SEMANTIC   = 'col_semantic';
const MODE_VALUE     = 'mode_primitives_value'; // single mode for primitives
const MODE_LIGHT     = 'mode_light';
const MODE_DARK      = 'mode_dark';

const variableCollections = [
  { action: 'CREATE', id: COL_PRIMITIVES, name: 'Primitives', initialModeId: MODE_VALUE },
  { action: 'CREATE', id: COL_SEMANTIC,   name: 'Semantic',   initialModeId: MODE_LIGHT },
];

const variableModes = [
  { action: 'CREATE', id: MODE_VALUE, name: 'Value', variableCollectionId: COL_PRIMITIVES },
  { action: 'CREATE', id: MODE_LIGHT, name: 'Light', variableCollectionId: COL_SEMANTIC },
  { action: 'CREATE', id: MODE_DARK,  name: 'Dark',  variableCollectionId: COL_SEMANTIC },
];

const variables = [];
const variableModeValues = [];

// Primitive variables — one per scale step
for (const [scaleName, steps] of Object.entries(scales)) {
  for (const [step, hex] of Object.entries(steps)) {
    const id = primitiveVarId(scaleName, step);
    variables.push({
      action: 'CREATE',
      id,
      name: `${scaleName}/${step}`,
      resolvedType: 'COLOR',
      variableCollectionId: COL_PRIMITIVES,
    });
    variableModeValues.push({
      variableId: id,
      modeId: MODE_VALUE,
      value: hexToFigmaColor(hex),
    });
  }
}

// Semantic variables — light + dark modes
for (const [path, lightRef, darkRef] of semanticTokens) {
  const id = `var_semantic_${path.replace(/\//g, '_')}`;
  variables.push({
    action: 'CREATE',
    id,
    name: path,
    resolvedType: 'COLOR',
    variableCollectionId: COL_SEMANTIC,
  });

  // Light mode value
  if (isHex(lightRef)) {
    variableModeValues.push({ variableId: id, modeId: MODE_LIGHT, value: hexToFigmaColor(lightRef) });
  } else {
    const [scale, step] = lightRef.split('/');
    variableModeValues.push({
      variableId: id,
      modeId: MODE_LIGHT,
      value: { type: 'VARIABLE_ALIAS', id: primitiveVarId(scale, step) },
    });
  }

  // Dark mode value
  if (isHex(darkRef)) {
    variableModeValues.push({ variableId: id, modeId: MODE_DARK, value: hexToFigmaColor(darkRef) });
  } else {
    const [scale, step] = darkRef.split('/');
    variableModeValues.push({
      variableId: id,
      modeId: MODE_DARK,
      value: { type: 'VARIABLE_ALIAS', id: primitiveVarId(scale, step) },
    });
  }
}

const payload = { variableCollections, variableModes, variables, variableModeValues };

// ─── Send to Figma ────────────────────────────────────────────────────────────

const token   = process.env.FIGMA_TOKEN;
const fileKey = process.env.FIGMA_FILE;

if (!token || !fileKey) {
  console.error('Missing env vars. Set FIGMA_TOKEN and FIGMA_FILE before running.');
  process.exit(1);
}

console.log(`Importing ${variables.length} variables into Figma file ${fileKey}…`);

const res = await fetch(`https://api.figma.com/v1/files/${fileKey}/variables`, {
  method: 'POST',
  headers: { 'X-Figma-Token': token, 'Content-Type': 'application/json' },
  body: JSON.stringify(payload),
});

const json = await res.json();

if (!res.ok) {
  console.error('Figma API error:', JSON.stringify(json, null, 2));
  process.exit(1);
}

console.log('Done. Variables created:');
console.log(`  Primitives: ${variables.filter(v => v.variableCollectionId === COL_PRIMITIVES).length}`);
console.log(`  Semantic:   ${variables.filter(v => v.variableCollectionId === COL_SEMANTIC).length}`);

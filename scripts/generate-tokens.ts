/**
 * Generates tokens.json from the live theme source files.
 * Run with: npm run generate-tokens
 */

import { writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { primitiveScales } from '../src/app/themes/primitives/colors';
import { foundation } from '../src/app/themes/brands/foundation';
import type { ColorScale } from '../src/app/themes/primitives/colors';

const __dirname = dirname(fileURLToPath(import.meta.url));

// ── Types ─────────────────────────────────────────────────────────────────────

type Token = {
  value: string | number;
  type: string;
  description?: string;
  codeSyntax?: { web: string };
  scopes?: string[];
};
type TokenGroup = Record<string, Token | Record<string, Token>>;

// ── Helpers ───────────────────────────────────────────────────────────────────

function resolveHex(scale: string, step: number | string): string {
  return (primitiveScales as unknown as Record<string, Record<string, string>>)[scale]?.[String(step)] ?? '';
}

function colorAlias(scale: string, step: number | string, palettePath: string, scopes?: string[]): Token {
  const hex = resolveHex(scale, step);
  return {
    value: `{${scale}.${step}}`,
    type: 'color',
    description: `${scale}.${step} → ${hex}`,
    codeSyntax: { web: `theme.palette.${palettePath}` },
    ...(scopes && { scopes }),
  };
}

function rawColor(hex: string, palettePath?: string, scopes?: string[]): Token {
  return {
    value: hex,
    type: 'color',
    description: palettePath ? `${hex} (fixed)` : undefined,
    codeSyntax: palettePath ? { web: `theme.palette.${palettePath}` } : undefined,
    ...(scopes && { scopes }),
  };
}

function num(value: number, web: string, description?: string): Token {
  return { value, type: 'number', description, codeSyntax: { web } };
}

function str(value: string, web: string, description?: string): Token {
  return { value, type: 'string', description, codeSyntax: { web } };
}

function scaleName(scale: ColorScale): string {
  for (const [name, s] of Object.entries(primitiveScales)) {
    if (s === scale) return name;
  }
  throw new Error('Scale not found in primitiveScales');
}

// ── Primitive colour scales ───────────────────────────────────────────────────

const primitives: Record<string, TokenGroup> = {};

for (const [name, scale] of Object.entries(primitiveScales)) {
  primitives[name] = Object.fromEntries(
    Object.entries(scale).map(([step, hex]) => [
      step,
      { value: hex, type: 'color', description: 'Raw scale. Use semantic tokens in code.', codeSyntax: { web: hex } },
    ])
  );
}

// ── Semantic tokens ───────────────────────────────────────────────────────────

const primary   = scaleName(foundation.primary);
const secondary = scaleName(foundation.secondary);
const tertiary  = foundation.tertiary ? scaleName(foundation.tertiary) : null;
const neutral   = scaleName(foundation.neutral);

const TEXT_FILL = ['TEXT_FILL'];
const BG_FILL   = ['FRAME_FILL', 'SHAPE_FILL'];

const semanticLight: TokenGroup = {
  primary: {
    light:        colorAlias(primary, 400, 'primary.light'),
    main:         colorAlias(primary, 600, 'primary.main'),
    dark:         colorAlias(primary, 700, 'primary.dark'),
    contrastText: rawColor('#ffffff',      'primary.contrastText'),
  },
  secondary: {
    light:        colorAlias(secondary, 600, 'secondary.light'),
    main:         colorAlias(secondary, 800, 'secondary.main'),
    dark:         colorAlias(secondary, 900, 'secondary.dark'),
    contrastText: rawColor('#ffffff',         'secondary.contrastText'),
  },
  ...(tertiary && {
    tertiary: {
      light:        colorAlias(tertiary, 400, 'tertiary.light'),
      main:         colorAlias(tertiary, 500, 'tertiary.main'),
      dark:         colorAlias(tertiary, 700, 'tertiary.dark'),
      contrastText: colorAlias(tertiary, 950, 'tertiary.contrastText'),
    },
  }),
  error: {
    light:        colorAlias('red', 400, 'error.light'),
    main:         colorAlias('red', 600, 'error.main'),
    dark:         colorAlias('red', 700, 'error.dark'),
    contrastText: rawColor('#ffffff',    'error.contrastText'),
  },
  warning: {
    light:        colorAlias('amber', 300, 'warning.light'),
    main:         colorAlias('amber', 500, 'warning.main'),
    dark:         colorAlias('amber', 700, 'warning.dark'),
    contrastText: rawColor('#000000',     'warning.contrastText'),
  },
  info: {
    light:        colorAlias('cyan', 400, 'info.light'),
    main:         colorAlias('cyan', 700, 'info.main'),
    dark:         colorAlias('cyan', 800, 'info.dark'),
    contrastText: rawColor('#ffffff',    'info.contrastText'),
  },
  success: {
    light:        colorAlias('green', 400, 'success.light'),
    main:         colorAlias('green', 700, 'success.main'),
    dark:         colorAlias('green', 800, 'success.dark'),
    contrastText: rawColor('#ffffff',     'success.contrastText'),
  },
  background: {
    default:        colorAlias(neutral, 50,  'background.default',        BG_FILL),
    paper:          rawColor('#ffffff',       'background.paper',          BG_FILL),
    elevated:       colorAlias(neutral, 100, 'background.elevated',       BG_FILL),
    brandPrimary:   colorAlias(primary, 600, 'background.brandPrimary',   BG_FILL),
    brandSecondary: colorAlias(secondary, 800, 'background.brandSecondary', BG_FILL),
    brandTertiary:  tertiary
      ? colorAlias(tertiary, 500, 'background.brandTertiary', BG_FILL)
      : colorAlias(primary, 600,  'background.brandTertiary', BG_FILL),
    brandSky:       colorAlias('skyBlue',   200, 'background.brandSky',   BG_FILL),
    brandClear:     colorAlias('clearBlue', 100, 'background.brandClear', BG_FILL),
    brandWarm:      colorAlias('salmon',    50,  'background.brandWarm',  BG_FILL),
  },
  text: {
    primary:     colorAlias(neutral,     900, 'text.primary',     TEXT_FILL),
    muted:       colorAlias(neutral,     600, 'text.muted',       TEXT_FILL),
    disabled:    colorAlias(neutral,     400, 'text.disabled',    TEXT_FILL),
    inverse:     rawColor('#ffffff',          'text.inverse',     TEXT_FILL),
    heading:     colorAlias(secondary,   800, 'text.heading',     TEXT_FILL),
    link:        colorAlias(primary,     600, 'text.link',        TEXT_FILL),
    linkInverse: colorAlias('clearBlue', 100, 'text.linkInverse', TEXT_FILL),
  },
  divider: colorAlias(neutral, 500, 'divider'),
  border: {
    default: colorAlias(neutral, 500, 'border.default'),
    input:   colorAlias(neutral, 500, 'border.input'),
    focus:   colorAlias(neutral, 700, 'border.focus'),
  },
  action: {
    disabled:           colorAlias(neutral, 400, 'action.disabled'),
    disabledBackground: colorAlias(neutral, 200, 'action.disabledBackground'),
  },
};

const semanticDark: TokenGroup = {
  primary: {
    light:        colorAlias(primary, 300, 'primary.light'),
    main:         colorAlias(primary, 400, 'primary.main'),
    dark:         colorAlias(primary, 600, 'primary.dark'),
    contrastText: colorAlias(primary, 950, 'primary.contrastText'),
  },
  secondary: {
    light:        colorAlias(secondary, 400, 'secondary.light'),
    main:         colorAlias(secondary, 600, 'secondary.main'),
    dark:         colorAlias(secondary, 800, 'secondary.dark'),
    contrastText: rawColor('#ffffff',         'secondary.contrastText'),
  },
  ...(tertiary && {
    tertiary: {
      light:        colorAlias(tertiary, 300, 'tertiary.light'),
      main:         colorAlias(tertiary, 400, 'tertiary.main'),
      dark:         colorAlias(tertiary, 600, 'tertiary.dark'),
      contrastText: rawColor('#000000',       'tertiary.contrastText'),
    },
  }),
  error: {
    light:        colorAlias('red', 300, 'error.light'),
    main:         colorAlias('red', 400, 'error.main'),
    dark:         colorAlias('red', 600, 'error.dark'),
    contrastText: rawColor('#ffffff',    'error.contrastText'),
  },
  warning: {
    light:        colorAlias('amber', 300, 'warning.light'),
    main:         colorAlias('amber', 400, 'warning.main'),
    dark:         colorAlias('amber', 500, 'warning.dark'),
    contrastText: rawColor('#000000',     'warning.contrastText'),
  },
  info: {
    light:        colorAlias('cyan', 300, 'info.light'),
    main:         colorAlias('cyan', 400, 'info.main'),
    dark:         colorAlias('cyan', 600, 'info.dark'),
    contrastText: rawColor('#000000',    'info.contrastText'),
  },
  success: {
    light:        colorAlias('green', 300, 'success.light'),
    main:         colorAlias('green', 400, 'success.main'),
    dark:         colorAlias('green', 600, 'success.dark'),
    contrastText: rawColor('#000000',     'success.contrastText'),
  },
  background: {
    default:        colorAlias(neutral, 950, 'background.default',        BG_FILL),
    paper:          colorAlias(neutral, 900, 'background.paper',          BG_FILL),
    elevated:       colorAlias(neutral, 800, 'background.elevated',       BG_FILL),
    brandPrimary:   colorAlias(primary, 400, 'background.brandPrimary',   BG_FILL),
    brandSecondary: colorAlias(secondary, 600, 'background.brandSecondary', BG_FILL),
    brandTertiary:  tertiary
      ? colorAlias(tertiary, 400, 'background.brandTertiary', BG_FILL)
      : colorAlias(primary, 400,  'background.brandTertiary', BG_FILL),
    brandSky:       colorAlias('skyBlue',   800, 'background.brandSky',   BG_FILL),
    brandClear:     colorAlias('clearBlue', 700, 'background.brandClear', BG_FILL),
    brandWarm:      colorAlias('salmon',    800, 'background.brandWarm',  BG_FILL),
  },
  text: {
    primary:     colorAlias(neutral,     50,  'text.primary',     TEXT_FILL),
    muted:       colorAlias(neutral,     300, 'text.muted',       TEXT_FILL),
    disabled:    colorAlias(neutral,     600, 'text.disabled',    TEXT_FILL),
    inverse:     colorAlias(neutral,     900, 'text.inverse',     TEXT_FILL),
    heading:     rawColor('#ffffff',          'text.heading',     TEXT_FILL),
    link:        colorAlias(primary,     300, 'text.link',        TEXT_FILL),
    linkInverse: colorAlias('clearBlue', 100, 'text.linkInverse', TEXT_FILL),
  },
  divider: colorAlias(neutral, 500, 'divider'),
  border: {
    default: colorAlias(neutral, 500, 'border.default'),
    input:   colorAlias(neutral, 400, 'border.input'),
    focus:   colorAlias(neutral, 300, 'border.focus'),
  },
  action: {
    disabled:           colorAlias(neutral, 600, 'action.disabled'),
    disabledBackground: colorAlias(neutral, 800, 'action.disabledBackground'),
  },
};

// ── Spacing ───────────────────────────────────────────────────────────────────

const spacingScale: [string, number, number][] = [
  ['0',  0,   0],
  ['1',  4,   0.5],
  ['2',  8,   1],
  ['3',  12,  1.5],
  ['4',  16,  2],
  ['5',  24,  3],
  ['6',  32,  4],
  ['7',  48,  6],
  ['8',  64,  8],
  ['9',  96,  12],
  ['10', 128, 16],
];

const spacing: TokenGroup = Object.fromEntries(
  spacingScale.map(([key, px, muiN]) => [
    key,
    num(px, `theme.spacing(${muiN})`, `${px}px`),
  ])
);

// ── Border radius ─────────────────────────────────────────────────────────────

const radius: TokenGroup = {
  none: num(0,    '0',                            '0px'),
  sm:   num(4,    'theme.shape.borderRadius',     '4px — 1 × theme.shape.borderRadius'),
  md:   num(8,    '2 * theme.shape.borderRadius', '8px'),
  lg:   num(12,   '3 * theme.shape.borderRadius', '12px'),
  xl:   num(16,   '4 * theme.shape.borderRadius', '16px'),
  full: num(9999, "'9999px'",                     'Full pill / circle rounding'),
};

// ── Typography ────────────────────────────────────────────────────────────────

const typography: TokenGroup = {
  fontFamily: {
    sans: str('Inter, system-ui, sans-serif', 'theme.typography.fontFamily'),
    mono: str('JetBrains Mono, monospace',    "sx: { fontFamily: 'monospace' }"),
  },
  fontSize: {
    xs:    num(12, 'theme.typography.caption.fontSize', '0.75rem'),
    sm:    num(14, 'theme.typography.body2.fontSize',   '0.875rem'),
    md:    num(16, 'theme.typography.body1.fontSize',   '1rem'),
    lg:    num(20, 'theme.typography.h6.fontSize',      '1.25rem'),
    xl:    num(24, 'theme.typography.h5.fontSize',      '1.5rem'),
    '2xl': num(30, 'theme.typography.h4.fontSize',      '1.875rem'),
    '3xl': num(36, 'theme.typography.h3.fontSize',      '2.25rem'),
  },
  fontWeight: {
    regular:  num(400, 'theme.typography.fontWeightRegular'),
    medium:   num(500, 'theme.typography.fontWeightMedium'),
    semibold: num(600, '600',                                'No direct MUI alias'),
    bold:     num(700, 'theme.typography.fontWeightBold'),
  },
  lineHeight: {
    tight:   num(1.25, '1.25', 'Headings'),
    normal:  num(1.5,  '1.5',  'Body text'),
    relaxed: num(1.75, '1.75', 'Long-form reading'),
  },
};

// ── Assemble and write ────────────────────────────────────────────────────────

const tokens = {
  primitives,
  'semantic/light': semanticLight,
  'semantic/dark':  semanticDark,
  spacing,
  radius,
  typography,
};

const outPath = resolve(__dirname, '../tokens.json');
writeFileSync(outPath, JSON.stringify(tokens, null, 2) + '\n');

console.log(`✓ tokens.json written`);
console.log(`  Brand:       ${foundation.name}`);
console.log(`  Primary:     ${primary}`);
console.log(`  Secondary:   ${secondary}`);
if (tertiary) console.log(`  Tertiary:    ${tertiary}`);
console.log(`  Collections: ${Object.keys(tokens).length}`);

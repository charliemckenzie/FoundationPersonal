/**
 * Generates tokens.json from the live theme source files.
 *
 * Output is DTCG-ish (Design Token Community Group) — Tokens Studio can consume
 * the structure directly. Each token includes a Figma-friendly `value` (alias or
 * raw), the source description, and a `codeSyntax.web` snippet showing how to
 * read it from the MUI theme in code.
 *
 * Output structure:
 *   primitives/                  — raw color scales (one per primitive)
 *   semantic-art/light, /dark    — ART semantic tokens, both modes
 *   semantic-qsuper/light, /dark — QSuper semantic tokens, both modes
 *   spacing/                     — MUI spacing scale
 *   radius/                      — shape.borderRadius and named radii
 *   typography/                  — font family, size, weight, line height
 *   action-opacity/              — interaction-state opacity scalars
 *
 * Run with: npm run generate-tokens
 */

import { writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { primitiveScales } from '../src/app/themes/primitives/colors';
import { foundation } from '../src/app/themes/brands/foundation';
import { themeB } from '../src/app/themes/brands/theme-b';
import { OPACITY } from '../src/app/themes/semantic';
import type { ColorScale } from '../src/app/themes/primitives/colors';
import type { BrandConfig } from '../src/app/themes/brands/index';

const __dirname = dirname(fileURLToPath(import.meta.url));

// ── Types ─────────────────────────────────────────────────────────────────────

type Token = {
  value: string | number;
  type: string;
  description?: string;
  codeSyntax?: { web: string };
  scopes?: string[];
};
type TokenGroup = Record<string, Token | Record<string, Token | Record<string, Token>>>;

// ── Helpers ───────────────────────────────────────────────────────────────────

function resolveHex(scale: string, step: number | string): string {
  return (primitiveScales as unknown as Record<string, Record<string, string>>)[scale]?.[String(step)] ?? '';
}

function scaleNameOf(scale: ColorScale): string {
  for (const [name, s] of Object.entries(primitiveScales)) {
    if (s === scale) return name;
  }
  throw new Error('Scale not found in primitiveScales');
}

function colorAlias(scale: string, step: number | string, palettePath: string, scopes?: string[]): Token {
  const hex = resolveHex(scale, step);
  return {
    value: `{primitives.${scale}.${step}}`,
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
    description: palettePath ? `${hex} (literal)` : undefined,
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

// Look up the scale name for a colour the brand provides as a primitive scale,
// or return null if the brand didn't define it (e.g. quaternary on ART).
function brandScale(brand: BrandConfig, key: 'primary' | 'secondary' | 'tertiary' | 'quaternary' | 'neutral'): string | null {
  const s = brand[key];
  return s ? scaleNameOf(s) : null;
}

// Convert a brand override value (already a hex string from the semanticOverrides)
// into a primitive-alias token by reverse-mapping the hex through primitiveScales.
// Falls back to a raw colour if no primitive matches (shouldn't happen for well-tuned brands).
function hexToAlias(hex: string, palettePath: string, scopes?: string[]): Token {
  const normalized = hex.toLowerCase();
  for (const [name, scale] of Object.entries(primitiveScales)) {
    for (const [step, value] of Object.entries(scale)) {
      if (value.toLowerCase() === normalized) {
        return colorAlias(name, step, palettePath, scopes);
      }
    }
  }
  return rawColor(hex, palettePath, scopes);
}

// ── Primitive colour scales ───────────────────────────────────────────────────

const primitives: Record<string, TokenGroup> = {};

for (const [name, scale] of Object.entries(primitiveScales)) {
  primitives[name] = Object.fromEntries(
    Object.entries(scale).map(([step, hex]) => [
      step,
      { value: hex, type: 'color', description: 'Raw scale. Use semantic tokens in code.', codeSyntax: { web: hex } } as Token,
    ])
  );
}

// ── Semantic builder — runs once per brand × mode ─────────────────────────────

type Mode = 'light' | 'dark';

const TEXT_FILL = ['TEXT_FILL'];
const BG_FILL   = ['FRAME_FILL', 'SHAPE_FILL'];
const STROKE    = ['STROKE_COLOR'];

interface BrandModeSteps {
  primary:   { light: number | string; main: number | string; dark: number | string; text: number | string; icon: number | string; background: number | string; border: number | string };
  secondary: { light: number | string; main: number | string; dark: number | string; text: number | string; icon: number | string; background: number | string; border: number | string };
  /** Status colours use the same eight-step pattern regardless of brand. */
  status:    { light: number | string; main: number | string; dark: number | string; text: number | string; icon: number | string; background: number | string; border: number | string };
  bg:        { default: number | string; paper: number | string | null; elevated: number | string; tableStripe: number | string };
  borderSubtle: number | string;
  actionActive: number | string;
  actionDisabled: number | string;
  actionDisabledBg: number | string;
}

const LIGHT_STEPS: BrandModeSteps = {
  primary:   { light: 400, main: 600, dark: 700, text: 800, icon: 600, background: 50,  border: 100 },
  secondary: { light: 600, main: 800, dark: 900, text: 800, icon: 800, background: 50,  border: 100 },
  status:    { light: 400, main: 600, dark: 700, text: 800, icon: 600, background: 50,  border: 100 },
  bg:        { default: 50, paper: null /* literal white */, elevated: 100, tableStripe: 100 },
  borderSubtle: 200,
  actionActive: 600,
  actionDisabled: 500,
  actionDisabledBg: 200,
};

const DARK_STEPS: BrandModeSteps = {
  // For dark mode, primary/secondary `.main` collapse to lighter shades for contrast
  primary:   { light: 300, main: 300, dark: 400, text: 200, icon: 300, background: 400 /* applied with alpha */, border: 700 },
  secondary: { light: 400, main: 600, dark: 800, text: 200, icon: 400, background: 400, border: 700 },
  status:    { light: 300, main: 400, dark: 600, text: 300, icon: 400, background: 950, border: 900 },
  bg:        { default: 950, paper: 900, elevated: 800, tableStripe: 800 },
  borderSubtle: 800,
  actionActive: 300,
  actionDisabled: 500,
  actionDisabledBg: 800,
};

function buildSemantic(brand: BrandConfig, mode: Mode): TokenGroup {
  const steps = mode === 'light' ? LIGHT_STEPS : DARK_STEPS;
  const sem = brand.semanticOverrides[mode];
  const primary = brandScale(brand, 'primary')!;
  const secondary = brandScale(brand, 'secondary')!;
  const tertiary = brandScale(brand, 'tertiary');
  const quaternary = brandScale(brand, 'quaternary');
  const neutral = brandScale(brand, 'neutral')!;

  const out: TokenGroup = {
    primary: {
      light:        colorAlias(primary, steps.primary.light, 'primary.light'),
      main:         colorAlias(primary, steps.primary.main,  'primary.main'),
      dark:         colorAlias(primary, steps.primary.dark,  'primary.dark'),
      contrastText: mode === 'light' ? rawColor('#ffffff', 'primary.contrastText') : colorAlias(primary, 950, 'primary.contrastText'),
      text:         colorAlias(primary, steps.primary.text, 'primary.text', TEXT_FILL),
      icon:         colorAlias(primary, steps.primary.icon, 'primary.icon'),
      background:   colorAlias(primary, steps.primary.background, 'primary.background', BG_FILL),
      border:       colorAlias(primary, steps.primary.border, 'primary.border', STROKE),
    },
    secondary: {
      light:        colorAlias(secondary, steps.secondary.light, 'secondary.light'),
      main:         colorAlias(secondary, steps.secondary.main,  'secondary.main'),
      dark:         colorAlias(secondary, steps.secondary.dark,  'secondary.dark'),
      contrastText: rawColor('#ffffff', 'secondary.contrastText'),
      text:         colorAlias(secondary, steps.secondary.text, 'secondary.text', TEXT_FILL),
      icon:         colorAlias(secondary, steps.secondary.icon, 'secondary.icon'),
      background:   colorAlias(secondary, steps.secondary.background, 'secondary.background', BG_FILL),
      border:       colorAlias(secondary, steps.secondary.border, 'secondary.border', STROKE),
    },
    error: {
      light:      colorAlias('red', steps.status.light, 'error.light'),
      main:       colorAlias('red', steps.status.main,  'error.main'),
      dark:       colorAlias('red', steps.status.dark,  'error.dark'),
      text:       colorAlias('red', steps.status.text,  'error.text', TEXT_FILL),
      icon:       colorAlias('red', steps.status.icon,  'error.icon'),
      background: colorAlias('red', steps.status.background, 'error.background', BG_FILL),
      border:     colorAlias('red', steps.status.border, 'error.border', STROKE),
    },
    warning: {
      light:      colorAlias('amber', steps.status.light, 'warning.light'),
      main:       colorAlias('amber', steps.status.main,  'warning.main'),
      dark:       colorAlias('amber', steps.status.dark,  'warning.dark'),
      text:       colorAlias('amber', steps.status.text,  'warning.text', TEXT_FILL),
      icon:       colorAlias('amber', steps.status.icon,  'warning.icon'),
      background: colorAlias('amber', steps.status.background, 'warning.background', BG_FILL),
      border:     colorAlias('amber', steps.status.border, 'warning.border', STROKE),
    },
    info: {
      light:      colorAlias('blue', steps.status.light, 'info.light'),
      main:       colorAlias('blue', steps.status.main,  'info.main'),
      dark:       colorAlias('blue', steps.status.dark,  'info.dark'),
      text:       colorAlias('blue', steps.status.text,  'info.text', TEXT_FILL),
      icon:       colorAlias('blue', steps.status.icon,  'info.icon'),
      background: colorAlias('blue', steps.status.background, 'info.background', BG_FILL),
      border:     colorAlias('blue', steps.status.border, 'info.border', STROKE),
    },
    success: {
      light:      colorAlias('green', steps.status.light, 'success.light'),
      main:       colorAlias('green', steps.status.main,  'success.main'),
      dark:       colorAlias('green', steps.status.dark,  'success.dark'),
      text:       colorAlias('green', steps.status.text,  'success.text', TEXT_FILL),
      icon:       colorAlias('green', steps.status.icon,  'success.icon'),
      background: colorAlias('green', steps.status.background, 'success.background', BG_FILL),
      border:     colorAlias('green', steps.status.border, 'success.border', STROKE),
    },
    ...(tertiary && {
      tertiary: {
        light:        colorAlias(tertiary, mode === 'light' ? 400 : 300, 'tertiary.light'),
        main:         colorAlias(tertiary, mode === 'light' ? 500 : 400, 'tertiary.main'),
        dark:         colorAlias(tertiary, mode === 'light' ? 700 : 600, 'tertiary.dark'),
        contrastText: mode === 'light' ? colorAlias(tertiary, 950, 'tertiary.contrastText') : rawColor('#000000', 'tertiary.contrastText'),
        text:         colorAlias(tertiary, mode === 'light' ? 800 : 200, 'tertiary.text', TEXT_FILL),
        icon:         colorAlias(tertiary, mode === 'light' ? 500 : 400, 'tertiary.icon'),
        background:   colorAlias(tertiary, mode === 'light' ? 50  : 400, 'tertiary.background', BG_FILL),
        border:       colorAlias(tertiary, mode === 'light' ? 100 : 700, 'tertiary.border', STROKE),
      },
    }),
    ...(quaternary && {
      quaternary: {
        light:        colorAlias(quaternary, mode === 'light' ? 100 : 200, 'quaternary.light'),
        main:         colorAlias(quaternary, 300, 'quaternary.main'),
        dark:         colorAlias(quaternary, 500, 'quaternary.dark'),
        contrastText: mode === 'light' ? colorAlias(quaternary, 950, 'quaternary.contrastText') : rawColor('#000000', 'quaternary.contrastText'),
        text:         colorAlias(quaternary, mode === 'light' ? 800 : 100, 'quaternary.text', TEXT_FILL),
        icon:         colorAlias(quaternary, mode === 'light' ? 500 : 300, 'quaternary.icon'),
        background:   colorAlias(quaternary, mode === 'light' ? 50  : 400, 'quaternary.background', BG_FILL),
        border:       colorAlias(quaternary, mode === 'light' ? 100 : 700, 'quaternary.border', STROKE),
      },
    }),
    background: {
      default:        colorAlias(neutral, steps.bg.default, 'background.default', BG_FILL),
      paper:          steps.bg.paper === null
        ? rawColor('#ffffff', 'background.paper', BG_FILL)
        : colorAlias(neutral, steps.bg.paper, 'background.paper', BG_FILL),
      elevated:       colorAlias(neutral, steps.bg.elevated, 'background.elevated', BG_FILL),
      brandPrimary:   colorAlias(primary, mode === 'light' ? 600 : steps.bg.elevated, 'background.brandPrimary', BG_FILL),
      brandSecondary: colorAlias(secondary, mode === 'light' ? 800 : steps.bg.elevated, 'background.brandSecondary', BG_FILL),
      brandTertiary:  tertiary
        ? colorAlias(tertiary, mode === 'light' ? 500 : steps.bg.elevated, 'background.brandTertiary', BG_FILL)
        : colorAlias(primary,  mode === 'light' ? 600 : steps.bg.elevated, 'background.brandTertiary', BG_FILL),
      tintCool:        hexToAlias(sem.tintCool,        'background.tintCool',        BG_FILL),
      tintNeutralCool: hexToAlias(sem.tintNeutralCool, 'background.tintNeutralCool', BG_FILL),
      tintWarm:        hexToAlias(sem.tintWarm,        'background.tintWarm',        BG_FILL),
      tintNeutral:     hexToAlias(sem.tintNeutral,     'background.tintNeutral',     BG_FILL),
      tableStripe:     colorAlias(neutral, steps.bg.tableStripe, 'background.tableStripe', BG_FILL),
    },
    text: {
      primary:     hexToAlias(sem.text.primary, 'text.primary', TEXT_FILL),
      muted:       hexToAlias(sem.text.muted,   'text.muted',   TEXT_FILL),
      disabled:    colorAlias(neutral, 500, 'text.disabled', TEXT_FILL),
      inverse:     mode === 'light'
        ? rawColor('#ffffff', 'text.inverse', TEXT_FILL)
        : colorAlias(neutral, 900, 'text.inverse', TEXT_FILL),
      heading:     mode === 'light'
        ? colorAlias(secondary, 800, 'text.heading', TEXT_FILL)
        : rawColor('#ffffff', 'text.heading', TEXT_FILL),
      link:        colorAlias(primary, mode === 'light' ? 600 : 300, 'text.link', TEXT_FILL),
      linkInverse: hexToAlias(sem.text.linkInverse, 'text.linkInverse', TEXT_FILL),
    },
    divider: hexToAlias(sem.divider, 'divider', STROKE),
    border: {
      subtle:  colorAlias(neutral, steps.borderSubtle, 'border.subtle', STROKE),
      default: hexToAlias(sem.border.default, 'border.default', STROKE),
      input:   hexToAlias(sem.border.input, 'border.input', STROKE),
      focus:   colorAlias(primary, mode === 'light' ? 600 : 300, 'border.focus', STROKE),
    },
    action: {
      active:             colorAlias(neutral, steps.actionActive, 'action.active'),
      disabled:           colorAlias(neutral, steps.actionDisabled, 'action.disabled'),
      disabledBackground: colorAlias(neutral, steps.actionDisabledBg, 'action.disabledBackground', BG_FILL),
    },
  };

  return out;
}

// ── Action opacity scalars (composed in Figma with .active hex + opacity number) ─

const actionOpacityLight: TokenGroup = {
  hover:     num(OPACITY.hover.light,     'theme.palette.action.hoverOpacity'),
  selected:  num(OPACITY.selected.light,  'theme.palette.action.selectedOpacity'),
  focus:     num(OPACITY.focus.light,     'theme.palette.action.focusOpacity'),
  activated: num(OPACITY.activated.light, 'theme.palette.action.activatedOpacity'),
  disabled:  num(OPACITY.disabled.light,  'theme.palette.action.disabledOpacity'),
};

const actionOpacityDark: TokenGroup = {
  hover:     num(OPACITY.hover.dark,     'theme.palette.action.hoverOpacity'),
  selected:  num(OPACITY.selected.dark,  'theme.palette.action.selectedOpacity'),
  focus:     num(OPACITY.focus.dark,     'theme.palette.action.focusOpacity'),
  activated: num(OPACITY.activated.dark, 'theme.palette.action.activatedOpacity'),
  disabled:  num(OPACITY.disabled.dark,  'theme.palette.action.disabledOpacity'),
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

// ── Border radius (matches factory.ts shape) ──────────────────────────────────

const radius: TokenGroup = {
  none: num(0,    '0',                    '0px'),
  xs:   num(4,    'theme.shape.xs',       '4px'),
  sm:   num(8,    'theme.shape.sm',       '8px'),
  md:   num(12,   'theme.shape.md',       '12px'),
  lg:   num(16,   'theme.shape.lg',       '16px'),
  xl:   num(24,   'theme.shape.xl',       '24px'),
  '2xl': num(32,  "theme.shape['2xl']",   '32px'),
  full: num(9999, 'theme.shape.full',     'Full pill / circle rounding'),
};

// ── Typography ────────────────────────────────────────────────────────────────

const typography: TokenGroup = {
  fontFamily: {
    art: {
      body:    str('var(--font-noto-sans), "Noto Sans", system-ui, sans-serif', 'theme.typography.fontFamily', 'ART body'),
      heading: str('var(--font-merriweather), Merriweather, serif',             'theme.typography.h1.fontFamily', 'ART headings'),
    } as Record<string, Token>,
    qsuper: {
      body:    str('Effra, system-ui, sans-serif', 'theme.typography.fontFamily', 'QSuper body'),
      heading: str('var(--font-merriweather), Merriweather, serif', 'theme.typography.h1.fontFamily', 'QSuper headings'),
    } as Record<string, Token>,
  },
  fontSize: {
    caption: str('0.75rem',  'theme.typography.caption.fontSize', '12px'),
    small:   str('0.875rem', 'theme.typography.small.fontSize',   '14px'),
    body:    str('1rem',     'theme.typography.body.fontSize',    '16px'),
    lead:    str('1.25rem',  'theme.typography.lead.fontSize',    '20px'),
    h6:      str('1rem',     'theme.typography.h6.fontSize',      '16px'),
    h5:      str('1.25rem',  'theme.typography.h5.fontSize',      '20px'),
    h4:      str('1.5rem',   'theme.typography.h4.fontSize',      '24px'),
    h3:      str('1.75rem',  'theme.typography.h3.fontSize',      '28px'),
    h2:      str('2rem',     'theme.typography.h2.fontSize',      '32px'),
    h1:      str('2.5rem',   'theme.typography.h1.fontSize',      '40px'),
    'display-6': str('2.5rem', "theme.typography['display-6'].fontSize", '40px'),
    'display-5': str('3rem',   "theme.typography['display-5'].fontSize", '48px'),
    'display-4': str('3.5rem', "theme.typography['display-4'].fontSize", '56px'),
    'display-3': str('4rem',   "theme.typography['display-3'].fontSize", '64px'),
    'display-2': str('4.5rem', "theme.typography['display-2'].fontSize", '72px'),
    'display-1': str('5rem',   "theme.typography['display-1'].fontSize", '80px'),
  },
  fontWeight: {
    regular:  num(400, 'theme.typography.fontWeightRegular'),
    medium:   num(500, 'theme.typography.fontWeightMedium'),
    semibold: num(600, '600'),
    bold:     num(700, 'theme.typography.fontWeightBold'),
  },
  lineHeight: {
    tight:   num(1.2,  '1.2',  'Headings and display'),
    normal:  num(1.5,  '1.5',  'Body text'),
    relaxed: num(1.6,  '1.6',  'Lead paragraphs'),
  },
};

// ── Assemble and write ────────────────────────────────────────────────────────

const tokens = {
  primitives,
  'semantic-art': {
    light: buildSemantic(foundation, 'light'),
    dark:  buildSemantic(foundation, 'dark'),
  },
  'semantic-qsuper': {
    light: buildSemantic(themeB, 'light'),
    dark:  buildSemantic(themeB, 'dark'),
  },
  'action-opacity': {
    light: actionOpacityLight,
    dark:  actionOpacityDark,
  },
  spacing,
  radius,
  typography,
};

const outPath = resolve(__dirname, '../tokens.json');
writeFileSync(outPath, JSON.stringify(tokens, null, 2) + '\n');

console.log(`✓ tokens.json written`);
console.log(`  ART:        primary=${scaleNameOf(foundation.primary)}  secondary=${scaleNameOf(foundation.secondary)}  tertiary=${foundation.tertiary ? scaleNameOf(foundation.tertiary) : 'n/a'}`);
console.log(`  QSuper:     primary=${scaleNameOf(themeB.primary)}  secondary=${scaleNameOf(themeB.secondary)}  tertiary=${themeB.tertiary ? scaleNameOf(themeB.tertiary) : 'n/a'}  quaternary=${themeB.quaternary ? scaleNameOf(themeB.quaternary) : 'n/a'}`);
console.log(`  Brands × modes: 4`);
console.log(`  Collections:    ${Object.keys(tokens).length}`);

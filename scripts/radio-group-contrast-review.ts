/**
 * Contrast matrix for RadioGroup component.
 * Covers default, boxed, and card variants across all modes, surfaces, and states.
 *
 * Run: npx tsx .\scripts\radio-group-contrast-review.ts
 */

import { alpha } from '@mui/material/styles';
import { createBrandTheme } from '../src/app/themes/factory';
import { foundation } from '../src/app/themes/brands/foundation';
import { TINT } from '../src/app/themes/semantic';

type Mode = 'light' | 'dark';
type Surface = 'default' | 'paper' | 'elevated';
type Variant = 'default' | 'boxed' | 'card';
type CheckState =
  | 'resting-unselected'
  | 'hover-unselected'
  | 'resting-selected'
  | 'hover-selected'
  | 'active-selected'
  | 'focus-visible';

type Row = {
  mode: Mode;
  surface: Surface;
  variant: Variant;
  state: CheckState;
  labelTextHex: string;
  descTextHex: string | null;
  componentBgHex: string;
  borderHex: string;
  focusHex: string | null;
  labelTextRatio: number;
  descTextRatio: number | null;
  borderRatio: number;
  focusRatio: number | null;
  labelTextPass: boolean;
  descTextPass: boolean | null;
  borderPass: boolean;
  focusPass: boolean | null;
};

// ── colour utilities ──────────────────────────────────────────────────────────

function parseColor(input: string) {
  const color = input.trim();
  if (color.startsWith('#')) {
    let hex = color.slice(1);
    if (hex.length === 3) hex = hex.split('').map((c) => c + c).join('');
    return {
      r: parseInt(hex.slice(0, 2), 16),
      g: parseInt(hex.slice(2, 4), 16),
      b: parseInt(hex.slice(4, 6), 16),
      a: 1,
    };
  }
  const match = color.match(/rgba?\(([^)]+)\)/i);
  if (match) {
    const [r, g, b, a] = match[1].split(',').map((p) => Number(p.trim()));
    return { r, g, b, a: isNaN(a) ? 1 : a };
  }
  throw new Error(`Unsupported color: ${color}`);
}

function toHex(color: { r: number; g: number; b: number }) {
  const ch = (v: number) => Math.round(v).toString(16).padStart(2, '0');
  return `#${ch(color.r)}${ch(color.g)}${ch(color.b)}`;
}

function composite(
  fg: { r: number; g: number; b: number; a: number },
  bg: { r: number; g: number; b: number; a: number }
) {
  const a = fg.a + bg.a * (1 - fg.a);
  if (a === 0) return { r: 0, g: 0, b: 0, a: 0 };
  return {
    r: (fg.r * fg.a + bg.r * bg.a * (1 - fg.a)) / a,
    g: (fg.g * fg.a + bg.g * bg.a * (1 - fg.a)) / a,
    b: (fg.b * fg.a + bg.b * bg.a * (1 - fg.a)) / a,
    a,
  };
}

function linearize(c: number) {
  const s = c / 255;
  return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
}

function luminance(hex: string) {
  const { r, g, b } = parseColor(hex);
  return 0.2126 * linearize(r) + 0.7152 * linearize(g) + 0.0722 * linearize(b);
}

function contrast(hex1: string, hex2: string) {
  const l1 = Math.max(luminance(hex1), luminance(hex2));
  const l2 = Math.min(luminance(hex1), luminance(hex2));
  return parseFloat(((l1 + 0.05) / (l2 + 0.05)).toFixed(2));
}

function resolve(value: string, surfaceHex: string): string {
  const parsed = parseColor(value);
  if (parsed.a < 1) {
    return toHex(composite(parsed, parseColor(surfaceHex)));
  }
  return toHex(parsed);
}

// ── main ──────────────────────────────────────────────────────────────────────

const modes: Mode[] = ['light', 'dark'];
const surfaces: Surface[] = ['default', 'paper', 'elevated'];

const rows: Row[] = [];

// ── State-change pairs (for ST-STATE-CHANGE-01) ───────────────────────────────
type StateChangePair = {
  mode: Mode;
  surface: Surface;
  variant: Variant;
  unselectedBorderHex: string;
  selectedBorderHex: string;
  unselectedBgHex: string;
  selectedBgHex: string;
  borderStateChangeRatio: number;
  bgStateChangeRatio: number;
  borderPass: boolean;
  bgPass: boolean;
  nonColourCue: string | null;
};
const stateChangePairs: StateChangePair[] = [];

for (const mode of modes) {
  const theme = createBrandTheme(foundation, mode);
  const p = theme.palette;

  const surfaceMap: Record<Surface, string> = {
    default: p.background.default,
    paper: p.background.paper,
    elevated: p.background.elevated,
  };

  const textPrimary = p.text.primary;
  const textMuted = p.text.muted;
  const primaryMain = p.primary.main;
  const borderInput = p.border.input;
  const borderFocus = p.border.focus;
  const paperHex = p.background.paper;
  const tintMain = TINT.main[mode];
  const tintDark = TINT.dark[mode];
  const tintDeeper = TINT.deeper[mode];

  for (const surface of surfaces) {
    const surfaceHex = surfaceMap[surface];

    // ── DEFAULT variant ───────────────────────────────────────────────────
    // The radio circle sits on background.paper (its own fill).
    // The container uses background.paper (FormControlLabel background is transparent,
    // so the effective bg for the radio circle is whatever surface it's on).
    // For default variant, border ratio is: radio circle border vs surface background.

    // resting-unselected
    {
      const componentBg = paperHex; // radio circle fill
      const borderHex = toHex(parseColor(borderInput));
      const labelHex = toHex(parseColor(textPrimary));
      rows.push({
        mode, surface, variant: 'default', state: 'resting-unselected',
        labelTextHex: labelHex,
        descTextHex: toHex(parseColor(textMuted)),
        componentBgHex: componentBg,
        borderHex,
        focusHex: null,
        labelTextRatio: contrast(labelHex, componentBg),
        descTextRatio: contrast(toHex(parseColor(textMuted)), componentBg),
        borderRatio: contrast(borderHex, surfaceHex),
        focusRatio: null,
        labelTextPass: contrast(labelHex, componentBg) >= 4.5,
        descTextPass: contrast(toHex(parseColor(textMuted)), componentBg) >= 4.5,
        borderPass: contrast(borderHex, surfaceHex) >= 3,
        focusPass: null,
      });
    }

    // resting-selected (radio circle checked)
    {
      const componentBg = paperHex;
      const borderHex = toHex(parseColor(primaryMain));
      const labelHex = toHex(parseColor(textPrimary));
      rows.push({
        mode, surface, variant: 'default', state: 'resting-selected',
        labelTextHex: labelHex,
        descTextHex: toHex(parseColor(textMuted)),
        componentBgHex: componentBg,
        borderHex,
        focusHex: null,
        labelTextRatio: contrast(labelHex, componentBg),
        descTextRatio: contrast(toHex(parseColor(textMuted)), componentBg),
        borderRatio: contrast(borderHex, surfaceHex),
        focusRatio: null,
        labelTextPass: contrast(labelHex, componentBg) >= 4.5,
        descTextPass: contrast(toHex(parseColor(textMuted)), componentBg) >= 4.5,
        borderPass: contrast(borderHex, surfaceHex) >= 3,
        focusPass: null,
      });
    }

    // focus-visible (default variant — outline on radio)
    {
      const componentBg = paperHex;
      const borderHex = toHex(parseColor(borderInput));
      const focusHex = toHex(parseColor(borderFocus));
      const labelHex = toHex(parseColor(textPrimary));
      rows.push({
        mode, surface, variant: 'default', state: 'focus-visible',
        labelTextHex: labelHex,
        descTextHex: null,
        componentBgHex: componentBg,
        borderHex,
        focusHex,
        labelTextRatio: contrast(labelHex, componentBg),
        descTextRatio: null,
        borderRatio: contrast(borderHex, surfaceHex),
        focusRatio: contrast(focusHex, surfaceHex),
        labelTextPass: contrast(labelHex, componentBg) >= 4.5,
        descTextPass: null,
        borderPass: contrast(borderHex, surfaceHex) >= 3,
        focusPass: contrast(focusHex, surfaceHex) >= 3,
      });
    }

    // ── BOXED variant (card container approach) ───────────────────────────
    // Card sits on the page surface. Card fill = background.paper (unselected).
    // Selected card fill = alpha(primary.main, tintMain) over paper.

    // resting-unselected
    {
      const componentBg = paperHex;
      const borderHex = toHex(parseColor(borderInput));
      const labelHex = toHex(parseColor(textPrimary));
      rows.push({
        mode, surface, variant: 'boxed', state: 'resting-unselected',
        labelTextHex: labelHex,
        descTextHex: toHex(parseColor(textMuted)),
        componentBgHex: componentBg,
        borderHex,
        focusHex: null,
        labelTextRatio: contrast(labelHex, componentBg),
        descTextRatio: contrast(toHex(parseColor(textMuted)), componentBg),
        borderRatio: contrast(borderHex, surfaceHex),
        focusRatio: null,
        labelTextPass: contrast(labelHex, componentBg) >= 4.5,
        descTextPass: contrast(toHex(parseColor(textMuted)), componentBg) >= 4.5,
        borderPass: contrast(borderHex, surfaceHex) >= 3,
        focusPass: null,
      });
    }

    // hover-unselected (hover overlay on paper)
    {
      const hoverBg = resolve(p.action.hover, paperHex);
      const borderHex = toHex(parseColor(borderInput));
      const labelHex = toHex(parseColor(textPrimary));
      rows.push({
        mode, surface, variant: 'boxed', state: 'hover-unselected',
        labelTextHex: labelHex,
        descTextHex: toHex(parseColor(textMuted)),
        componentBgHex: hoverBg,
        borderHex,
        focusHex: null,
        labelTextRatio: contrast(labelHex, hoverBg),
        descTextRatio: contrast(toHex(parseColor(textMuted)), hoverBg),
        borderRatio: contrast(borderHex, surfaceHex),
        focusRatio: null,
        labelTextPass: contrast(labelHex, hoverBg) >= 4.5,
        descTextPass: contrast(toHex(parseColor(textMuted)), hoverBg) >= 4.5,
        borderPass: contrast(borderHex, surfaceHex) >= 3,
        focusPass: null,
      });
    }

    // resting-selected (selectedCardStyles: softMain over paper)
    // descriptionSx uses text.primary when isSelected (RadioCardLabel)
    {
      const selBgAlpha = alpha(primaryMain, tintMain);
      const componentBg = resolve(selBgAlpha, paperHex);
      const borderHex = toHex(parseColor(primaryMain));
      const labelHex = toHex(parseColor(textPrimary));
      const descHex = toHex(parseColor(textPrimary)); // selected: text.primary
      rows.push({
        mode, surface, variant: 'boxed', state: 'resting-selected',
        labelTextHex: labelHex,
        descTextHex: descHex,
        componentBgHex: componentBg,
        borderHex,
        focusHex: null,
        labelTextRatio: contrast(labelHex, componentBg),
        descTextRatio: contrast(descHex, componentBg),
        borderRatio: contrast(borderHex, surfaceHex),
        focusRatio: null,
        labelTextPass: contrast(labelHex, componentBg) >= 4.5,
        descTextPass: contrast(descHex, componentBg) >= 4.5,
        borderPass: contrast(borderHex, surfaceHex) >= 3,
        focusPass: null,
      });
    }

    // hover-selected (softDark over paper)
    // descriptionSx uses text.primary when isSelected
    {
      const hoverBgAlpha = alpha(primaryMain, tintDark);
      const componentBg = resolve(hoverBgAlpha, paperHex);
      const borderHex = toHex(parseColor(primaryMain));
      const labelHex = toHex(parseColor(textPrimary));
      const descHex = toHex(parseColor(textPrimary)); // selected: text.primary
      rows.push({
        mode, surface, variant: 'boxed', state: 'hover-selected',
        labelTextHex: labelHex,
        descTextHex: descHex,
        componentBgHex: componentBg,
        borderHex,
        focusHex: null,
        labelTextRatio: contrast(labelHex, componentBg),
        descTextRatio: contrast(descHex, componentBg),
        borderRatio: contrast(borderHex, surfaceHex),
        focusRatio: null,
        labelTextPass: contrast(labelHex, componentBg) >= 4.5,
        descTextPass: contrast(descHex, componentBg) >= 4.5,
        borderPass: contrast(borderHex, surfaceHex) >= 3,
        focusPass: null,
      });
    }

    // active-selected (softDeeper over paper)
    // descriptionSx uses text.primary when isSelected
    {
      const activeBgAlpha = alpha(primaryMain, tintDeeper);
      const componentBg = resolve(activeBgAlpha, paperHex);
      const borderHex = toHex(parseColor(primaryMain));
      const labelHex = toHex(parseColor(textPrimary));
      const descHex = toHex(parseColor(textPrimary)); // selected: text.primary
      rows.push({
        mode, surface, variant: 'boxed', state: 'active-selected',
        labelTextHex: labelHex,
        descTextHex: descHex,
        componentBgHex: componentBg,
        borderHex,
        focusHex: null,
        labelTextRatio: contrast(labelHex, componentBg),
        descTextRatio: contrast(descHex, componentBg),
        borderRatio: contrast(borderHex, surfaceHex),
        focusRatio: null,
        labelTextPass: contrast(labelHex, componentBg) >= 4.5,
        descTextPass: contrast(descHex, componentBg) >= 4.5,
        borderPass: contrast(borderHex, surfaceHex) >= 3,
        focusPass: null,
      });
    }

    // focus-visible (boxed/card: 2px outline on container)
    {
      const componentBg = paperHex;
      const borderHex = toHex(parseColor(borderInput));
      const focusHex = toHex(parseColor(borderFocus));
      const labelHex = toHex(parseColor(textPrimary));
      rows.push({
        mode, surface, variant: 'boxed', state: 'focus-visible',
        labelTextHex: labelHex,
        descTextHex: null,
        componentBgHex: componentBg,
        borderHex,
        focusHex,
        labelTextRatio: contrast(labelHex, componentBg),
        descTextRatio: null,
        borderRatio: contrast(borderHex, surfaceHex),
        focusRatio: contrast(focusHex, surfaceHex),
        labelTextPass: contrast(labelHex, componentBg) >= 4.5,
        descTextPass: null,
        borderPass: contrast(borderHex, surfaceHex) >= 3,
        focusPass: contrast(focusHex, surfaceHex) >= 3,
      });
    }

    // ── CARD variant (same border + bg logic as boxed) ────────────────────
    // Same structural logic as boxed, copy with variant='card'
    for (const row of rows.filter(
      (r) => r.mode === mode && r.surface === surface && r.variant === 'boxed'
    )) {
      rows.push({ ...row, variant: 'card' });
    }

    // ── STATE-CHANGE pairs ────────────────────────────────────────────────
    // For boxed/card: selected border (primary.main) vs unselected border (border.input)
    // Non-colour cue present: selected state ALSO has inset box-shadow adding 1px thickness
    const unselBorder = toHex(parseColor(borderInput));
    const selBorder = toHex(parseColor(primaryMain));
    const unselBg = paperHex;
    const selBgAlpha = alpha(primaryMain, tintMain);
    const selBg = resolve(selBgAlpha, paperHex);

    stateChangePairs.push({
      mode,
      surface,
      variant: 'boxed',
      unselectedBorderHex: unselBorder,
      selectedBorderHex: selBorder,
      unselectedBgHex: unselBg,
      selectedBgHex: selBg,
      borderStateChangeRatio: contrast(unselBorder, selBorder),
      bgStateChangeRatio: contrast(unselBg, selBg),
      borderPass: contrast(unselBorder, selBorder) >= 3,
      bgPass: contrast(unselBg, selBg) >= 3,
      nonColourCue: 'inset box-shadow adds 1px border-equivalent thickness on selected (total visual weight 2px vs 1px)',
    });

    stateChangePairs.push({
      mode,
      surface,
      variant: 'card',
      unselectedBorderHex: unselBorder,
      selectedBorderHex: selBorder,
      unselectedBgHex: unselBg,
      selectedBgHex: selBg,
      borderStateChangeRatio: contrast(unselBorder, selBorder),
      bgStateChangeRatio: contrast(unselBg, selBg),
      borderPass: contrast(unselBorder, selBorder) >= 3,
      bgPass: contrast(unselBg, selBg) >= 3,
      nonColourCue: 'inset box-shadow adds 1px border-equivalent thickness on selected (total visual weight 2px vs 1px)',
    });
  }
}

// ── Remove duplicate card rows (we duplicated from boxed above) ───────────────
// Actually just note we already pushed them — let's deduplicate
const seen = new Set<string>();
const dedupedRows: Row[] = [];
for (const row of rows) {
  const key = `${row.mode}|${row.surface}|${row.variant}|${row.state}`;
  if (!seen.has(key)) {
    seen.add(key);
    dedupedRows.push(row);
  }
}

// ── Output ────────────────────────────────────────────────────────────────────

const W = [5, 9, 7, 20, 8, 8, 8, 8, 8, 6, 5, 5, 5];
const pad = (s: string, w: number) => s.padEnd(w);
const r2 = (n: number | null) => n === null ? '—' : n.toFixed(2);
const pass = (b: boolean | null) => b === null ? '—' : b ? '✓' : '✗';

console.log('\n=== RadioGroup Contrast Review — ART brand ===\n');

console.log(
  [
    'mode', 'surface', 'variant', 'state',
    'labelTxt', 'descTxt', 'border', 'focus',
    'lbl≥4.5', 'dsc≥4.5', 'brd≥3', 'foc≥3',
  ]
    .map((h, i) => pad(h, W[i]))
    .join(' | ')
);
console.log('-'.repeat(130));

for (const row of dedupedRows) {
  console.log(
    [
      row.mode,
      row.surface,
      row.variant,
      row.state,
      r2(row.labelTextRatio),
      r2(row.descTextRatio),
      r2(row.borderRatio),
      r2(row.focusRatio),
      pass(row.labelTextPass),
      pass(row.descTextPass),
      pass(row.borderPass),
      pass(row.focusPass),
    ]
      .map((v, i) => pad(String(v), W[i]))
      .join(' | ')
  );
}

// Print failures
const failures = dedupedRows.filter(
  (r) =>
    r.labelTextPass === false ||
    r.descTextPass === false ||
    r.borderPass === false ||
    r.focusPass === false
);

console.log(`\n--- FAILURES (${failures.length}) ---`);
if (failures.length === 0) {
  console.log('None. All measured ratios pass their thresholds.');
} else {
  for (const f of failures) {
    const issues: string[] = [];
    if (f.labelTextPass === false) issues.push(`label text ${r2(f.labelTextRatio)}:1 < 4.5`);
    if (f.descTextPass === false) issues.push(`desc text ${r2(f.descTextRatio)}:1 < 4.5`);
    if (f.borderPass === false) issues.push(`border ${r2(f.borderRatio)}:1 < 3`);
    if (f.focusPass === false) issues.push(`focus ${r2(f.focusRatio)}:1 < 3`);
    console.log(
      `  ${f.mode} | ${f.surface} | ${f.variant} | ${f.state}: ${issues.join(', ')}`
    );
  }
}

// Print state-change pairs
console.log('\n--- STATE-CHANGE CONTRAST (ST-STATE-CHANGE-01) ---');
const scSeen = new Set<string>();
for (const sc of stateChangePairs) {
  const key = `${sc.mode}|${sc.variant}`;
  if (scSeen.has(key)) continue;
  scSeen.add(key);
  console.log(
    `  ${sc.mode} | ${sc.variant}: border ${sc.unselectedBorderHex} vs ${sc.selectedBorderHex} = ${sc.borderStateChangeRatio.toFixed(2)}:1 ${sc.borderPass ? '✓' : '✗'} | bg ${sc.unselectedBgHex} vs ${sc.selectedBgHex} = ${sc.bgStateChangeRatio.toFixed(2)}:1 ${sc.bgPass ? '✓' : '✗'}`
  );
  console.log(`    Non-colour cue: ${sc.nonColourCue}`);
}

// Minima summary
console.log('\n--- MINIMA SUMMARY ---');
const byVariant = (['default', 'boxed', 'card'] as const).map((v) => {
  const vRows = dedupedRows.filter((r) => r.variant === v);
  const minLabel = Math.min(...vRows.map((r) => r.labelTextRatio));
  const minDesc = Math.min(...vRows.filter((r) => r.descTextRatio !== null).map((r) => r.descTextRatio!));
  const minBorder = Math.min(...vRows.map((r) => r.borderRatio));
  const minFocus = Math.min(...vRows.filter((r) => r.focusRatio !== null).map((r) => r.focusRatio!));
  return { variant: v, minLabel, minDesc, minBorder, minFocus };
});
for (const s of byVariant) {
  console.log(
    `  ${s.variant}: label min=${s.minLabel.toFixed(2)} | desc min=${s.minDesc.toFixed(2)} | border min=${s.minBorder.toFixed(2)} | focus min=${s.minFocus.toFixed(2)}`
  );
}

/**
 * Contrast matrix for ToggleButton component.
 * Computes text, border (non-text), and focus-visible contrast for every
 * mode × surface × state combination.
 *
 * Run: npx tsx .\scripts\toggle-button-contrast-review.ts
 */

import { alpha } from '@mui/material/styles';
import { createBrandTheme } from '../src/app/themes/factory';
import { foundation } from '../src/app/themes/brands/foundation';
import { TINT } from '../src/app/themes/semantic';

type Mode = 'light' | 'dark';
type Surface = 'default' | 'paper' | 'elevated';
type SelectionState = 'unselected-resting' | 'unselected-hover' | 'selected-resting' | 'selected-hover' | 'selected-active' | 'focus-visible';

type Row = {
  mode: Mode;
  surface: Surface;
  state: SelectionState;
  textHex: string;
  bgHex: string;
  borderHex: string | null;
  focusHex: string | null;
  textRatio: number;
  borderRatio: number | null;
  focusRatio: number | null;
  textPass: boolean;
  borderPass: boolean | null;
  focusPass: boolean | null;
};

// ── colour utilities ────────────────────────────────────────────────────────

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

function composite(fg: { r: number; g: number; b: number; a: number }, bg: { r: number; g: number; b: number; a: number }) {
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

// ── main ────────────────────────────────────────────────────────────────────

const modes: Mode[] = ['light', 'dark'];
const surfaces: Surface[] = ['default', 'paper', 'elevated'];
const rows: Row[] = [];

for (const mode of modes) {
  const theme = createBrandTheme(foundation, mode);
  const p = theme.palette;

  const surfaceMap: Record<Surface, string> = {
    default:  p.background.default,
    paper:    p.background.paper,
    elevated: p.background.elevated,
  };

  // Token values ─────────────────────────────────────────────────────────────
  const textPrimary   = p.text.primary;
  const primaryMain   = p.primary.main;
  const primaryDark   = p.primary.dark!;
  const primaryLight  = p.primary.light;
  const borderInput   = p.border.input;
  const borderFocus   = p.border.focus;
  const paperHex      = p.background.paper;
  const tintMain      = TINT.main[mode];
  const tintDark      = TINT.dark[mode];
  const tintDeeper    = TINT.deeper[mode];

  for (const surface of surfaces) {
    const surfaceHex = surfaceMap[surface];

    // The button always has background.paper as its own fill (unselected)
    const buttonBg = paperHex;

    // ── unselected resting ─────────────────────────────────────────────────
    {
      const textHex    = toHex(parseColor(textPrimary));
      const bgHex      = buttonBg;
      const borderHex  = toHex(parseColor(borderInput));
      rows.push({
        mode, surface, state: 'unselected-resting',
        textHex, bgHex, borderHex, focusHex: null,
        textRatio:   contrast(textHex, bgHex),
        borderRatio: contrast(borderHex, surfaceHex), // border vs page surface (1.4.11)
        focusRatio:  null,
        textPass:    contrast(textHex, bgHex) >= 4.5,
        borderPass:  contrast(borderHex, surfaceHex) >= 3,
        focusPass:   null,
      });
    }

    // ── unselected hover ───────────────────────────────────────────────────
    // MUI applies action.hover overlay on button's own background
    {
      const hoverOverlay = p.action.hover; // alpha color
      const bgHex = resolve(hoverOverlay, buttonBg);
      const textHex = toHex(parseColor(textPrimary));
      const borderHex = toHex(parseColor(borderInput));
      rows.push({
        mode, surface, state: 'unselected-hover',
        textHex, bgHex, borderHex, focusHex: null,
        textRatio:   contrast(textHex, bgHex),
        borderRatio: contrast(borderHex, surfaceHex),
        focusRatio:  null,
        textPass:    contrast(textHex, bgHex) >= 4.5,
        borderPass:  contrast(borderHex, surfaceHex) >= 3,
        focusPass:   null,
      });
    }

    // ── selected resting ───────────────────────────────────────────────────
    {
      const selBgAlpha = alpha(primaryMain, tintMain);
      const bgHex    = resolve(selBgAlpha, buttonBg);
      // Selected state uses text.primary (not primary.main) — theme factory updated 09/06/2026
      const textHex  = toHex(parseColor(textPrimary));
      const borderHex = toHex(parseColor(primaryMain)); // selected border = primary.main
      rows.push({
        mode, surface, state: 'selected-resting',
        textHex, bgHex, borderHex, focusHex: null,
        textRatio:   contrast(textHex, bgHex),
        borderRatio: contrast(borderHex, surfaceHex),
        focusRatio:  null,
        textPass:    contrast(textHex, bgHex) >= 4.5,
        borderPass:  contrast(borderHex, surfaceHex) >= 3,
        focusPass:   null,
      });
    }

    // ── selected hover ─────────────────────────────────────────────────────
    {
      const selHoverBgAlpha = alpha(primaryMain, tintDark);
      const bgHex  = resolve(selHoverBgAlpha, buttonBg);
      // Selected state uses text.primary — theme factory updated 09/06/2026
      const textHex = toHex(parseColor(textPrimary));
      const borderHex = toHex(parseColor(primaryMain));
      rows.push({
        mode, surface, state: 'selected-hover',
        textHex, bgHex, borderHex, focusHex: null,
        textRatio:   contrast(textHex, bgHex),
        borderRatio: contrast(borderHex, surfaceHex),
        focusRatio:  null,
        textPass:    contrast(textHex, bgHex) >= 4.5,
        borderPass:  contrast(borderHex, surfaceHex) >= 3,
        focusPass:   null,
      });
    }

    // ── selected active ────────────────────────────────────────────────────
    {
      const selActiveBgAlpha = alpha(primaryMain, tintDeeper);
      const bgHex  = resolve(selActiveBgAlpha, buttonBg);
      // Selected state uses text.primary — theme factory updated 09/06/2026
      const textHex = toHex(parseColor(textPrimary));
      const borderHex = toHex(parseColor(primaryMain));
      rows.push({
        mode, surface, state: 'selected-active',
        textHex, bgHex, borderHex, focusHex: null,
        textRatio:   contrast(textHex, bgHex),
        borderRatio: contrast(borderHex, surfaceHex),
        focusRatio:  null,
        textPass:    contrast(textHex, bgHex) >= 4.5,
        borderPass:  contrast(borderHex, surfaceHex) >= 3,
        focusPass:   null,
      });
    }

    // ── focus-visible ──────────────────────────────────────────────────────
    // Focus outline is measured against the adjacent surface (outlineOffset=2px → outside the border)
    {
      const focusHex = toHex(parseColor(borderFocus));
      rows.push({
        mode, surface, state: 'focus-visible',
        textHex: toHex(parseColor(textPrimary)),
        bgHex: buttonBg,
        borderHex: toHex(parseColor(borderInput)),
        focusHex,
        textRatio:   contrast(toHex(parseColor(textPrimary)), buttonBg),
        borderRatio: contrast(toHex(parseColor(borderInput)), surfaceHex),
        focusRatio:  contrast(focusHex, surfaceHex),
        textPass:    contrast(toHex(parseColor(textPrimary)), buttonBg) >= 4.5,
        borderPass:  contrast(toHex(parseColor(borderInput)), surfaceHex) >= 3,
        focusPass:   contrast(focusHex, surfaceHex) >= 3,
      });
    }
  }
}

// ── Print report ─────────────────────────────────────────────────────────────

console.log('\n=== ToggleButton Contrast Review ===\n');
console.log('Thresholds: text >= 4.5:1 | border/non-text >= 3:1 | focus >= 3:1\n');

const header = ['Mode', 'Surface', 'State', 'Text fg', 'Button bg', 'TextRatio', 'T?', 'BorderHex', 'SurfaceHex', 'BorderRatio', 'B?', 'FocusHex', 'FocusRatio', 'F?'];
const col = (s: string | number | boolean | null, w: number) => String(s ?? 'N/A').padEnd(w);
console.log(header.map((h, i) => col(h, [6,9,22,9,9,11,5,9,11,12,5,9,11,5][i])).join(' '));
console.log('-'.repeat(130));

for (const r of rows) {
  const widths = [6,9,22,9,9,11,5,9,11,12,5,9,11,5];
  const cells = [
    r.mode,
    r.surface,
    r.state,
    r.textHex,
    r.bgHex,
    r.textRatio,
    r.textPass ? '✓' : '✗ FAIL',
    r.borderHex ?? 'N/A',
    // surface hex for context:
    r.mode === 'light'
      ? r.surface === 'default' ? '#f5f5f5' : r.surface === 'paper' ? '#ffffff' : '#f2f2f2'
      : r.surface === 'default' ? '#121212' : r.surface === 'paper' ? '#1f1f1f' : '#2c2c2c',
    r.borderRatio ?? 'N/A',
    r.borderPass === null ? 'N/A' : r.borderPass ? '✓' : '✗ FAIL',
    r.focusHex ?? 'N/A',
    r.focusRatio ?? 'N/A',
    r.focusPass === null ? 'N/A' : r.focusPass ? '✓' : '✗ FAIL',
  ];
  const line = cells.map((c, i) => col(c, widths[i])).join(' ');
  const hasFail = r.textPass === false || r.borderPass === false || r.focusPass === false;
  if (hasFail) console.log('⚠ ' + line);
  else console.log('  ' + line);
}

// Summary
const fails = rows.filter((r) => r.textPass === false || r.borderPass === false || r.focusPass === false);
console.log(`\nTotal rows: ${rows.length} | Failures: ${fails.length}`);
if (fails.length > 0) {
  console.log('\nFailures summary:');
  for (const r of fails) {
    if (r.textPass === false) console.log(`  FAIL text  [${r.mode}/${r.surface}/${r.state}] ${r.textHex} on ${r.bgHex} = ${r.textRatio}:1`);
    if (r.borderPass === false) console.log(`  FAIL border[${r.mode}/${r.surface}/${r.state}] border ${r.borderHex} on surface = ${r.borderRatio}:1`);
    if (r.focusPass === false) console.log(`  FAIL focus [${r.mode}/${r.surface}/${r.state}] focus ${r.focusHex} on surface = ${r.focusRatio}:1`);
  }
}

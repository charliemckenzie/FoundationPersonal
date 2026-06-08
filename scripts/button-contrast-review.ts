import { createBrandTheme } from '../src/app/themes/factory';
import { foundation } from '../src/app/themes/brands/foundation';
import {
  buildContainedStyles,
  buildGhostStyles,
  buildOutlinedStyles,
  buildReversedStyles,
  buildFocusStyles,
} from '../src/components/buttons/variantStyles';

type Mode = 'light' | 'dark';
type Variant = 'contained' | 'ghost' | 'outlined';
type ColorKey = 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
type Surface = 'default' | 'paper' | 'elevated' | 'brandSecondary';
type State = 'resting' | 'hover' | 'active' | 'focus-visible';

type Row = {
  mode: Mode;
  color: ColorKey;
  variant: Variant;
  surface: Surface;
  state: State;
  reversed: boolean;
  textRatio: number;
  componentContrast: number | null;
  focusRatio: number | null;
};

const allColors: ColorKey[] = ['primary', 'secondary', 'error', 'warning', 'info', 'success'];
const variants: Variant[] = ['contained', 'ghost', 'outlined'];
const modes: Mode[] = ['light', 'dark'];
const standardSurfaces: Exclude<Surface, 'brandSecondary'>[] = ['default', 'paper', 'elevated'];
const states: State[] = ['resting', 'hover', 'active', 'focus-visible'];

function parseColorScopeArg(): ColorKey[] {
  const arg = process.argv.find((value) => value.startsWith('--colors='));
  if (!arg) return allColors;

  const rawValues = arg
    .slice('--colors='.length)
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean);

  const requested = rawValues.filter((value): value is ColorKey =>
    allColors.includes(value as ColorKey),
  );

  return requested.length > 0 ? requested : allColors;
}

const colors = parseColorScopeArg();

function parseColor(input: string | undefined | null) {
  if (!input) return null;
  const color = String(input).trim();

  if (color === 'transparent') {
    return { r: 0, g: 0, b: 0, a: 0 };
  }

  if (color.startsWith('#')) {
    let hex = color.slice(1);
    if (hex.length === 3) hex = hex.split('').map((char) => char + char).join('');
    return {
      r: Number.parseInt(hex.slice(0, 2), 16),
      g: Number.parseInt(hex.slice(2, 4), 16),
      b: Number.parseInt(hex.slice(4, 6), 16),
      a: 1,
    };
  }

  const match = color.match(/rgba?\(([^)]+)\)/i);
  if (match) {
    const [r, g, b, a] = match[1].split(',').map((part) => Number(part.trim()));
    return { r, g, b, a: Number.isNaN(a) ? 1 : a };
  }

  throw new Error(`Unsupported color format: ${color}`);
}

function toHex(color: { r: number; g: number; b: number }) {
  const toChannel = (value: number) => Math.round(value).toString(16).padStart(2, '0');
  return `#${toChannel(color.r)}${toChannel(color.g)}${toChannel(color.b)}`;
}

function composite(
  foreground: { r: number; g: number; b: number; a: number },
  background: { r: number; g: number; b: number; a: number },
) {
  const alpha = foreground.a + background.a * (1 - foreground.a);
  if (alpha === 0) return { r: 0, g: 0, b: 0, a: 0 };

  return {
    r: ((foreground.r * foreground.a) + (background.r * background.a * (1 - foreground.a))) / alpha,
    g: ((foreground.g * foreground.a) + (background.g * background.a * (1 - foreground.a))) / alpha,
    b: ((foreground.b * foreground.a) + (background.b * background.a * (1 - foreground.a))) / alpha,
    a: alpha,
  };
}

function luminance(hex: string) {
  const color = parseColor(hex);
  if (!color) throw new Error(`Cannot compute luminance for ${hex}`);

  const channels = [color.r, color.g, color.b].map((value) => {
    const scaled = value / 255;
    return scaled <= 0.03928 ? scaled / 12.92 : ((scaled + 0.055) / 1.055) ** 2.4;
  });

  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
}

function contrastRatio(foregroundHex: string, backgroundHex: string) {
  const lighter = Math.max(luminance(foregroundHex), luminance(backgroundHex));
  const darker = Math.min(luminance(foregroundHex), luminance(backgroundHex));
  return Number((((lighter + 0.05) / (darker + 0.05))).toFixed(2));
}

function resolveValue<T>(value: T | ((theme: ReturnType<typeof createBrandTheme>) => T), theme: ReturnType<typeof createBrandTheme>) {
  return typeof value === 'function' ? (value as (theme: ReturnType<typeof createBrandTheme>) => T)(theme) : value;
}

function getBaseStyles(variant: Variant, color: ColorKey) {
  if (variant === 'contained') return buildContainedStyles(color);
  if (variant === 'ghost') return buildGhostStyles(color);
  return buildOutlinedStyles(color);
}

function getEffectiveSurface(backgroundValue: string | undefined, ambientHex: string) {
  if (!backgroundValue || backgroundValue === 'transparent') return ambientHex;
  const parsedBackground = parseColor(backgroundValue);
  if (!parsedBackground) return ambientHex;
  if (parsedBackground.a < 1) {
    return toHex(composite(parsedBackground, parseColor(ambientHex)!));
  }
  return toHex(parsedBackground);
}

function getStateStyles<T extends Record<string, unknown>>(styles: T, state: State) {
  if (state === 'hover') return (styles['&:hover'] as Record<string, unknown> | undefined) ?? {};
  if (state === 'active') return (styles['&:active'] as Record<string, unknown> | undefined) ?? {};
  return {};
}

const rows: Row[] = [];

for (const mode of modes) {
  const theme = createBrandTheme(foundation, mode);

  for (const color of colors) {
    for (const variant of variants) {
      for (const surface of standardSurfaces) {
        const ambientHex = theme.palette.background[surface];
        const baseStyles = getBaseStyles(variant, color);
        const focusStyles = buildFocusStyles(false, color);

        for (const state of states) {
          const stateStyles = getStateStyles(baseStyles, state);
          const backgroundValue = resolveValue((stateStyles.backgroundColor as string | undefined) ?? (baseStyles.backgroundColor as string | undefined) ?? 'transparent', theme);
          const textValue = resolveValue((stateStyles.color as string | undefined) ?? (baseStyles.color as string | undefined) ?? theme.palette.text.primary, theme);
          const borderValue = (stateStyles.borderColor as string | undefined) ?? (baseStyles.borderColor as string | undefined);
          const focusValue = state === 'focus-visible'
            ? resolveValue((focusStyles['&.Mui-focusVisible'] as { outline: string | ((theme: ReturnType<typeof createBrandTheme>) => string) }).outline, theme)
            : null;

          const effectiveSurface = getEffectiveSurface(backgroundValue, ambientHex);
          const textHex = toHex(parseColor(textValue)!);
          const componentContrast = variant === 'outlined'
            ? contrastRatio(toHex(parseColor(resolveValue(borderValue!, theme))!), ambientHex)
            : variant === 'ghost'
              ? null
              : contrastRatio(effectiveSurface, ambientHex);
          const focusRatio = focusValue
            ? contrastRatio(String(focusValue).replace(/^2px solid\s+/, ''), ambientHex)
            : null;

          rows.push({
            mode,
            color,
            variant,
            surface,
            state,
            reversed: false,
            textRatio: contrastRatio(textHex, effectiveSurface),
            componentContrast,
            focusRatio,
          });
        }
      }

      const reversedAmbient = theme.palette.background.brandSecondary;
      const baseStyles = getBaseStyles(variant, color);
      const reversedStyles = buildReversedStyles(variant, color);
      const focusStyles = buildFocusStyles(true, color);

      for (const state of states) {
        const baseStateStyles = getStateStyles(baseStyles, state);
        const reversedStateStyles = getStateStyles(reversedStyles, state);
        const backgroundValue = resolveValue(
          (reversedStateStyles.backgroundColor as string | undefined)
            ?? (reversedStyles.backgroundColor as string | undefined)
            ?? (baseStateStyles.backgroundColor as string | undefined)
            ?? (baseStyles.backgroundColor as string | undefined)
            ?? 'transparent',
          theme,
        );
        const textValue = resolveValue(
          (reversedStateStyles.color as string | undefined)
            ?? (reversedStyles.color as string | undefined)
            ?? (baseStateStyles.color as string | undefined)
            ?? (baseStyles.color as string | undefined)
            ?? theme.palette.common.white,
          theme,
        );
        const borderValue = (reversedStateStyles.borderColor as string | undefined)
          ?? (reversedStyles.borderColor as string | undefined)
          ?? (baseStateStyles.borderColor as string | undefined)
          ?? (baseStyles.borderColor as string | undefined);
        const focusValue = state === 'focus-visible'
          ? resolveValue((focusStyles['&.Mui-focusVisible'] as { outline: string | ((theme: ReturnType<typeof createBrandTheme>) => string) }).outline, theme)
          : null;

        const effectiveSurface = getEffectiveSurface(backgroundValue, reversedAmbient);
        const textHex = toHex(parseColor(textValue)!);
        const componentContrast = variant === 'outlined'
          ? contrastRatio(toHex(parseColor(resolveValue(borderValue!, theme))!), reversedAmbient)
          : variant === 'ghost'
            ? null
            : contrastRatio(effectiveSurface, reversedAmbient);
        const focusRatio = focusValue
          ? contrastRatio(String(focusValue).replace(/^2px solid\s+/, ''), reversedAmbient)
          : null;

        rows.push({
          mode,
          color,
          variant,
          surface: 'brandSecondary',
          state,
          reversed: true,
          textRatio: contrastRatio(textHex, effectiveSurface),
          componentContrast,
          focusRatio,
        });
      }
    }
  }
}

const textFailures = rows.filter((row) => row.textRatio < 4.5);
const componentFailures = rows.filter((row) => row.componentContrast !== null && row.componentContrast < 3);
const focusFailures = rows.filter((row) => row.focusRatio !== null && row.focusRatio < 3);

const byColor = colors.map((color) => {
  const colorRows = rows.filter((row) => row.color === color);
  return {
    color,
    minimumTextRatio: Math.min(...colorRows.map((row) => row.textRatio)),
    minimumComponentContrast: Math.min(...colorRows.filter((row) => row.componentContrast !== null).map((row) => row.componentContrast ?? Number.POSITIVE_INFINITY)),
    minimumFocusRatio: Math.min(...colorRows.filter((row) => row.focusRatio !== null).map((row) => row.focusRatio ?? Number.POSITIVE_INFINITY)),
  };
});

const primaryMatrix = rows
  .filter((row) => row.color === 'primary')
  .map((row) => ({
    mode: row.mode,
    variant: row.variant,
    surface: row.surface,
    state: row.state,
    reversed: row.reversed,
    textRatio: row.textRatio,
    componentContrast: row.componentContrast,
    focusRatio: row.focusRatio,
  }));

const primarySummaryMatrix = Array.from(
  new Map(
    primaryMatrix.map((row) => [`${row.mode}:${row.variant}:${row.surface}:${row.reversed}`, row]),
  ).keys(),
).map((key) => {
  const [mode, variant, surface, reversed] = key.split(':');
  const group = primaryMatrix.filter(
    (row) => row.mode === mode && row.variant === variant && row.surface === surface && String(row.reversed) === reversed,
  );

  return {
    mode,
    variant,
    surface,
    reversed: reversed === 'true',
    minimumTextRatio: Math.min(...group.map((row) => row.textRatio)),
    minimumComponentContrast: group.some((row) => row.componentContrast !== null)
      ? Math.min(...group.filter((row) => row.componentContrast !== null).map((row) => row.componentContrast ?? Number.POSITIVE_INFINITY))
      : null,
    focusVisibleRatio: group.find((row) => row.state === 'focus-visible')?.focusRatio ?? null,
  };
});

const topFailures = (failureRows: Row[], key: 'textRatio' | 'componentContrast' | 'focusRatio', limit: number) =>
  [...failureRows]
    .sort((a, b) => (Number(a[key] ?? Number.POSITIVE_INFINITY) - Number(b[key] ?? Number.POSITIVE_INFINITY)))
    .slice(0, limit)
    .map((row) => ({
      mode: row.mode,
      color: row.color,
      variant: row.variant,
      surface: row.surface,
      state: row.state,
      reversed: row.reversed,
      value: row[key],
    }));

console.log(JSON.stringify({
  totalRows: rows.length,
  textFailureCount: textFailures.length,
  componentFailureCount: componentFailures.length,
  focusFailureCount: focusFailures.length,
  worstTextFailures: topFailures(textFailures, 'textRatio', 20),
  worstComponentFailures: topFailures(componentFailures, 'componentContrast', 20),
  worstFocusFailures: topFailures(focusFailures, 'focusRatio', 20),
  byColor,
  primaryMatrix,
  primarySummaryMatrix,
}, null, 2));

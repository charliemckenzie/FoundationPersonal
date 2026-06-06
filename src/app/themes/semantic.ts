import { alpha } from '@mui/material/styles';
import type { PaletteOptions } from '@mui/material/styles';
import { red, amber, blue, green, white, black } from './primitives/colors';
import type { BrandConfig } from './brands/index';

// ── Opacity scalars — single source of truth for interaction-state overlays ──
// Used by both the `alpha()` calls AND the `*Opacity` properties below, so any
// change happens in one place. Also consumed by the Figma export script, which
// emits these as `number/action/*-opacity` variables composed in Figma styles.
export const OPACITY = {
  hover:     { light: 0.04, dark: 0.08 },
  selected:  { light: 0.08, dark: 0.16 },
  focus:     { light: 0.12, dark: 0.12 },
  activated: { light: 0.12, dark: 0.12 },
  disabled:  { light: 0.38, dark: 0.38 },
} as const;

// ── Brand-tint interaction surfaces — single source of truth ─────────────────
// Four-level intensity scale for tinted surfaces across Button, Tabs, inputs, and
// FileUpload. Components read the named palette tokens (e.g. `palette.primary.softMain`)
// and never call `alpha()` themselves. Edit a value here to shift every component
// using that level in one place.
//
//   softLight  — barely-there hover overlay (outlined button hover)
//   softMain   — base fill / hover overlay (soft resting, ghost hover, outlined active)
//   softDark   — deepened fill on hover (soft hover, ghost active)
//   softDeeper — pressed / active feedback (soft active only)
//
// softMain, softDark, softDeeper are mode-aware because dark surfaces need higher
// opacity to produce the same perceived fill weight.
export const TINT = {
  light:  0.04,                             // flat — same in both modes
  main:   { light: 0.08, dark: 0.14 },
  dark:   { light: 0.15, dark: 0.23 },
  deeper: { light: 0.20, dark: 0.29 },
} as const;

/**
 * Compose the four brand-tint interaction surface tokens for one colour channel.
 * Spread into each brand colour channel in the palette builders.
 */
function tintSurfaces(main: string, mode: 'light' | 'dark') {
  return {
    softLight:  alpha(main, TINT.light),
    softMain:   alpha(main, TINT.main[mode]),
    softDark:   alpha(main, TINT.dark[mode]),
    softDeeper: alpha(main, TINT.deeper[mode]),
  };
}

/**
 * Build the LIGHT-mode MUI palette for a given brand.
 *
 * Structure mirrors `buildDarkPalette` exactly — every token defined here is also
 * defined in dark, so theme consumers never see `undefined`. Brand-specific values
 * (where ART and QSuper differ) are read from `brand.semanticOverrides` rather
 * than embedded ternaries, so the token set is Figma-exportable as parallel modes.
 *
 * Token tiers (top-down):
 *   - **Brand colours** (`primary`, `secondary`, `tertiary`, `quaternary`) — identity colours; each has `.main`/`.light`/`.dark`/`.contrastText` plus `.text`/`.icon`/`.background`/`.border` for tinted surfaces.
 *   - **Status colours** (`error`, `warning`, `info`, `success`) — feedback colours with the same eight fields; values fixed across brands.
 *   - **Background** — surface hierarchy: `default` (page) → `paper` (card) → `elevated` (modal/popover) → `brand*` (branded zones) → tints.
 *   - **Text** — `heading`, `primary`, `muted`, `disabled`, `inverse`, `link`, `linkInverse`.
 *   - **Border** — `subtle` (inner dividers, lighter than `divider`), `default` (card outlines), `input` (form fields, ≥3:1 contrast), `focus` (focus ring).
 *   - **Action** — interaction-state overlays (`hover`, `selected`, `focus`, `disabled`) with companion `*Opacity` scalars.
 */
export function buildLightPalette(brand: BrandConfig): PaletteOptions {
  const sem = brand.semanticOverrides.light;
  return {
    /** Brand identity. Use `.main` for focal actions, `.background`/`.border` for tinted surfaces (chips, selected states). */
    primary: {
      light:        brand.primary[400],
      main:         brand.primary[600],
      dark:         brand.primary[700],
      contrastText: white,
      ...tintSurfaces(brand.primary[600], 'light'),
    },
    secondary: {
      light:        brand.secondary[600],
      main:         brand.secondary[800],
      dark:         brand.secondary[900],
      contrastText: white,
      ...tintSurfaces(brand.secondary[800], 'light'),
    },
    /** Feedback / status. Each has `.main` (icon/border), `.background` (alert fill), `.text` (alert body), `.border` (alert outline). Values fixed across brands. */
    error: {
      light:        red[400],
      main:         red[600],
      dark:         red[700],
      text:         red[800],
      icon:         red[600],
      background:   red[50],
      border:       red[100],
      contrastText: white,
    },
    warning: {
      light:        amber[300],
      main:         amber[600],
      dark:         amber[700],
      text:         amber[800],
      icon:         amber[600],
      background:   amber[50],
      border:       amber[100],
      contrastText: black,
    },
    info: {
      light:        blue[400],
      main:         blue[600],
      dark:         blue[700],
      text:         blue[800],
      icon:         blue[600],
      background:   blue[50],
      border:       blue[100],
      contrastText: white,
    },
    success: {
      light:        green[400],
      main:         green[600],
      dark:         green[700],
      text:         green[800],
      icon:         green[600],
      background:   green[50],
      border:       green[100],
      contrastText: white,
    },

    /** Tertiary brand colour (optional — only present when the brand defines one). */
    ...(brand.tertiary && {
      tertiary: {
        light:        brand.tertiary[400],
        main:         brand.tertiary[500],
        dark:         brand.tertiary[700],
        contrastText: brand.tertiary[950],
        ...tintSurfaces(brand.tertiary[500], 'light'),
      },
    }),

    /** Quaternary brand colour — QSuper Light Blue (#8CDDFF). Main anchored at [300]. */
    ...(brand.quaternary && {
      quaternary: {
        light:        brand.quaternary[100],
        main:         brand.quaternary[300],
        dark:         brand.quaternary[500],
        contrastText: brand.quaternary[950],
        ...tintSurfaces(brand.quaternary[300], 'light'),
      },
    }),

    /**
     * Surface hierarchy. Every token in this group has a value in every brand × mode
     * so the Figma export is lossless.
     *   - `default` = page background; `paper` = card; `elevated` = modal / popover
     *   - `brandPrimary` / `brandSecondary` / `brandTertiary` = branded zones (hero sections, CTAs)
     *   - `tintCool` / `tintNeutralCool` / `tintWarm` / `tintNeutral` = tinted brand surfaces; each brand fills with its own shade
     *   - `tableStripe` = striped table rows
     */
    background: {
      default:        brand.neutral[50],
      paper:          white,
      elevated:       brand.neutral[100],
      brandPrimary:   brand.primary[600],
      brandSecondary: brand.secondary[800],
      brandTertiary:  brand.tertiary?.[500] ?? brand.primary[600],
      tintCool:        sem.tintCool,
      tintNeutralCool: sem.tintNeutralCool,
      tintWarm:        sem.tintWarm,
      tintNeutral:     sem.tintNeutral,
      tableStripe:     brand.neutral[100],
    },

    /**
     * Text colours by semantic role.
     *   - `heading` — display, h1-h6
     *   - `primary` — body copy
     *   - `muted` — secondary / metadata
     *   - `disabled` — inactive controls (WCAG 2.2 SC 1.4.3 exempt)
     *   - `inverse` — text on brand surfaces
     *   - `link` / `linkInverse` — anchor rest state only; interaction states live in `MuiLink` styleOverrides
     */
    text: {
      primary:     sem.text.primary,
      muted:       sem.text.muted,
      disabled:    brand.neutral[500],
      inverse:     white,
      heading:     sem.text.heading ?? brand.secondary[800],
      link:        brand.primary[600],
      linkInverse: sem.text.linkInverse,
    },
    divider: sem.divider,
    /**
     * Stroke / outline colours.
     *   - `subtle` — inner dividers, one shade lighter than `divider`; for custom inner section breaks
     *   - `default` — card / container outlines
     *   - `input` — form fields, must hit ≥3:1 contrast
     *   - `focus` — focus ring, matches brand primary
     *
     * `divider` (top-level) is consumed by MUI internals (List, Card, etc.). Don't override it in custom components.
     */
    border: {
      subtle:  brand.neutral[200],
      default: sem.border.default,
      input:   sem.border.input,
      focus:   brand.primary[600],
    },
    /**
     * Interaction-state overlays. Opacity scalars (`*Opacity`) come from the OPACITY constants
     * above so the alpha() call and the scalar can never drift apart.
     */
    action: {
      active:             brand.neutral[600],
      hover:              alpha(brand.neutral[900], OPACITY.hover.light),
      hoverOpacity:       OPACITY.hover.light,
      selected:           alpha(brand.neutral[900], OPACITY.selected.light),
      selectedOpacity:    OPACITY.selected.light,
      disabled:           brand.neutral[500],
      disabledBackground: brand.neutral[200],
      disabledOpacity:    OPACITY.disabled.light,
      focus:              alpha(brand.neutral[900], OPACITY.focus.light),
      focusOpacity:       OPACITY.focus.light,
      activatedOpacity:   OPACITY.activated.light,
    },
  }
}

/**
 * Build the DARK-mode MUI palette for a given brand. See `buildLightPalette` for the
 * tier breakdown and structural contract — this mirrors it exactly.
 */
export function buildDarkPalette(brand: BrandConfig): PaletteOptions {
  const sem = brand.semanticOverrides.dark;
  return {
    primary: {
      light:        brand.primary[100],
      main:         brand.primary[300],
      dark:         brand.primary[400],
      contrastText: brand.primary[950],
      ...tintSurfaces(brand.primary[300], 'dark'),
    },
    secondary: {
      light:        brand.secondary[400],
      main:         brand.secondary[600],
      dark:         brand.secondary[800],
      contrastText: white,
      ...tintSurfaces(brand.secondary[600], 'dark'),
    },
    error: {
      light:        red[300],
      main:         red[400],
      dark:         red[600],
      text:         red[300],
      icon:         red[400],
      background:   red[950],
      border:       red[900],
      contrastText: white,
    },
    warning: {
      light:        amber[300],
      main:         amber[400],
      dark:         amber[500],
      text:         amber[300],
      icon:         amber[400],
      background:   amber[950],
      border:       amber[900],
      contrastText: black,
    },
    info: {
      light:        blue[300],
      main:         blue[400],
      dark:         blue[600],
      text:         blue[300],
      icon:         blue[400],
      background:   blue[950],
      border:       blue[900],
      contrastText: white,
    },
    success: {
      light:        green[300],
      main:         green[400],
      dark:         green[600],
      text:         green[300],
      icon:         green[400],
      background:   green[950],
      border:       green[900],
      contrastText: black,
    },

    ...(brand.tertiary && {
      tertiary: {
        light:        brand.tertiary[300],
        main:         brand.tertiary[400],
        dark:         brand.tertiary[600],
        contrastText: black,
        ...tintSurfaces(brand.tertiary[400], 'dark'),
      },
    }),

    ...(brand.quaternary && {
      quaternary: {
        light:        brand.quaternary[200],
        main:         brand.quaternary[300],
        dark:         brand.quaternary[500],
        contrastText: black,
        ...tintSurfaces(brand.quaternary[300], 'dark'),
      },
    }),

    background: {
      default:        brand.neutral[950],
      paper:          brand.neutral[900],
      elevated:       brand.neutral[800],
      brandPrimary:   brand.neutral[800],  // all brand surfaces unify at neutral[800] in dark mode
      brandSecondary: brand.neutral[800],
      brandTertiary:  brand.neutral[800],
      tintCool:        sem.tintCool,
      tintNeutralCool: sem.tintNeutralCool,
      tintWarm:        sem.tintWarm,
      tintNeutral:     sem.tintNeutral,
      tableStripe:     brand.neutral[800],
    },

    text: {
      primary:     sem.text.primary,
      muted:       sem.text.muted,
      disabled:    brand.neutral[500],
      inverse:     brand.neutral[900],
      heading:     sem.text.heading ?? white,
      link:        brand.primary[300],
      linkInverse: sem.text.linkInverse,
    },
    divider: sem.divider,
    border: {
      subtle:  brand.neutral[800],
      default: sem.border.default,
      input:   sem.border.input,
      focus:   brand.primary[300],
    },
    action: {
      active:             brand.neutral[300],
      hover:              alpha(brand.neutral[50], OPACITY.hover.dark),
      hoverOpacity:       OPACITY.hover.dark,
      selected:           alpha(brand.neutral[50], OPACITY.selected.dark),
      selectedOpacity:    OPACITY.selected.dark,
      disabled:           brand.neutral[500],
      disabledBackground: brand.neutral[800],
      disabledOpacity:    OPACITY.disabled.dark,
      focus:              alpha(brand.neutral[50], OPACITY.focus.dark),
      focusOpacity:       OPACITY.focus.dark,
      activatedOpacity:   OPACITY.activated.dark,
    },
  }
}

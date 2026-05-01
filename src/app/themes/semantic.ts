import { alpha } from '@mui/material/styles';
import type { PaletteOptions } from '@mui/material/styles';
import { red, amber, cyan, green, clearBlue, skyBlue, salmon, white, black } from './primitives/colors';
import type { BrandConfig } from './brands/index';

export function buildLightPalette(brand: BrandConfig): PaletteOptions {
  return {
    primary: {
      light:        brand.primary[400],
      main:         brand.primary[600],
      dark:         brand.primary[700],
      contrastText: white,
    },
    secondary: {
      light:        brand.secondary[600],
      main:         brand.secondary[800],
      dark:         brand.secondary[900],
      contrastText: white,
    },
    error: {
      light:        red[400],
      main:         red[600],
      dark:         red[700],
      contrastText: white,
    },
    warning: {
      light:        amber[300],
      main:         amber[500],
      dark:         amber[700],
      contrastText: black,
    },
    info: {
      light:        cyan[400],
      main:         cyan[700],
      dark:         cyan[800],
      contrastText: white,
    },
    success: {
      light:        green[400],
      main:         green[700],
      dark:         green[800],
      contrastText: white,
    },

    // Tertiary brand color (optional — only present when the brand defines one)
    ...(brand.tertiary && {
      tertiary: {
        light:        brand.tertiary[400],
        main:         brand.tertiary[500],
        dark:         brand.tertiary[700],
        contrastText: brand.tertiary[950],
      },
    }),

    // Quaternary brand color — Light Blue (#8CDDFF); main anchored at [300]
    ...(brand.quaternary && {
      quaternary: {
        light:        brand.quaternary[100],
        main:         brand.quaternary[300],
        dark:         brand.quaternary[500],
        contrastText: brand.quaternary[950],
      },
    }),

    // Background
    background: {
      default:        brand.neutral[50],    // Foundation: #f8fafc
      paper:          white,               // #ffffff
      elevated:       brand.neutral[100],  // Foundation: #f1f5f9
      brandPrimary:   brand.primary[600],  // Foundation: trueBlue[600]  #0051ff
      brandSecondary: brand.secondary[800], // Foundation: deepBlue[800]  #1c355e
      brandTertiary:  brand.tertiary?.[500] ?? brand.primary[600], // Foundation: livingCoral[500] #f24e49
      ...(brand.quaternary === undefined
        ? {
            // ART-only brand backgrounds
            brandSky:   skyBlue[200],    // #B9DCFB
            brandClear: clearBlue[100],  // #DDF5FF
            brandWarm:  salmon[50],      // #F8EBE5
          }
        : {
            // QSuper-only brand backgrounds
            brandGrey:      brand.neutral[100],      // neutral[100] — #f4f6fb
            brandLightBlue: brand.quaternary[100],   // qSkyBlue[100] — stays tied to its own scale
          }
      ),
      tableStripe: brand.neutral[100],  // ART: #f4f6fb / QSuper: #f4f6fb — closest match to #F2F2F2
    },

    // Text & Borders
    text: {
      primary:     brand.quaternary ? brand.neutral[700] : brand.neutral[700], // QSuper: neutral[700] / ART: neutral[700]
      muted:       brand.quaternary ? brand.neutral[600] : brand.neutral[600], // QSuper: neutral[600] / ART: neutral[600]
      disabled:    brand.neutral[500],
      inverse:     white,
      heading:     brand.secondary[800],
      link:        brand.primary[600],
      // linkInverse: resting colour only — interaction states (hover, active, visited) belong in components.MuiLink, not here
      linkInverse: brand.quaternary ? white : clearBlue[100], // QSuper: white (4.8:1 on brandPrimary) / ART: clearBlue[100]
    },
    divider: brand.neutral[300],
    border: {
      subtle:  brand.neutral[200],
      default: brand.neutral[300],
      input:   brand.neutral[500],
      focus:   brand.quaternary ? brand.neutral[700] : brand.neutral[600], // QSuper: neutral[700] / ART: neutral[600]
    },
    action: {
      active:             brand.neutral[600],        // icon/control active colour (e.g. checked checkbox, active icon button)
      hover:              alpha(brand.neutral[900], 0.04),  // hover overlay on any surface
      hoverOpacity:       0.04,
      selected:           alpha(brand.neutral[900], 0.08),  // selected/expanded state overlay (e.g. accordion, list item)
      selectedOpacity:    0.08,
      disabled:           brand.neutral[500],        // disabled text and icons — matches text.disabled
      disabledBackground: brand.neutral[200],        // disabled control fill (e.g. disabled button, input)
      disabledOpacity:    0.38,
      focus:              alpha(brand.neutral[900], 0.12),  // focus overlay (used by MUI internally for ripple-free focus)
      focusOpacity:       0.12,
      activatedOpacity:   0.12,                      // activated state opacity scalar (e.g. pressed chip)
    },
  }
}

export function buildDarkPalette(brand: BrandConfig): PaletteOptions {
  return {
    primary: {
      light:        brand.primary[300],
      main:         brand.primary[300],
      dark:         brand.primary[400],
      contrastText: brand.primary[950],
    },
    secondary: {
      light:        brand.secondary[400],
      main:         brand.secondary[600],
      dark:         brand.secondary[800],
      contrastText: white,
    },
    error: {
      light:        red[300],
      main:         red[400],
      dark:         red[600],
      contrastText: white,
    },
    warning: {
      light:        amber[300],
      main:         amber[400],
      dark:         amber[500],
      contrastText: black,
    },
    info: {
      light:        cyan[300],
      main:         cyan[400],
      dark:         cyan[600],
      contrastText: black,
    },
    success: {
      light:        green[300],
      main:         green[400],
      dark:         green[600],
      contrastText: black,
    },

    // Tertiary brand color (optional — only present when the brand defines one)
    ...(brand.tertiary && {
      tertiary: {
        light:        brand.tertiary[300],
        main:         brand.tertiary[400],
        dark:         brand.tertiary[600],
        contrastText: black,
      },
    }),

    // Quaternary brand color — Light Blue; main anchored at [300]
    ...(brand.quaternary && {
      quaternary: {
        light:        brand.quaternary[200],
        main:         brand.quaternary[300],
        dark:         brand.quaternary[500],
        contrastText: black,
      },
    }),

    // Background
    background: {
      default:        brand.neutral[950],  // Foundation: #020617
      paper:          brand.neutral[900],  // Foundation: #0f172a
      elevated:       brand.neutral[800],  // Foundation: #1e293b
      brandPrimary:   brand.neutral[800],  // Foundation: #1e293b (all brand surfaces unified at neutral[800] in dark mode)
      brandSecondary: brand.neutral[800],  // Foundation: #1e293b
      brandTertiary:  brand.neutral[800],  // Foundation: #1e293b
      ...(brand.quaternary === undefined
        ? {
            brandSky:   brand.neutral[800],
            brandClear: brand.neutral[800],
            brandWarm:  brand.neutral[800],
          }
        : {
            brandGrey:      brand.neutral[800],
            brandLightBlue: brand.neutral[800],
          }
      ),
      tableStripe: brand.neutral[800],  // dark mode stripe
    },

    // Text & Borders
    text: {
      primary:     brand.quaternary ? brand.neutral[50] : brand.neutral[300], // QSuper: neutral[50] / ART: neutral[300]
      muted:       brand.quaternary ? brand.neutral[300] : brand.neutral[500], // QSuper: neutral[300] / ART: neutral[500]
      disabled:    brand.neutral[500],
      inverse:     brand.neutral[900],
      heading:     white,
      link:        brand.primary[300],
      // linkInverse: resting colour only — interaction states (hover, active, visited) belong in components.MuiLink, not here
      linkInverse: brand.quaternary ? white : clearBlue[100], // QSuper: white / ART: clearBlue[100]
    },
    divider: brand.quaternary ? brand.neutral[700] : brand.neutral[600], // QSuper: neutral[700] / ART: neutral[600]
    border: {
      subtle:  brand.neutral[800],  // Foundation: #282c34
      default: brand.quaternary ? brand.neutral[700] : brand.neutral[600], // QSuper: neutral[700] / ART: neutral[600]
      input:   brand.quaternary ? brand.neutral[400] : brand.neutral[500], // QSuper: neutral[400] / ART: neutral[500]
      focus:   brand.quaternary ? brand.neutral[300] : brand.neutral[400], // QSuper: neutral[300] / ART: neutral[400]
    },
    action: {
      active:             brand.neutral[300],        // icon/control active colour
      hover:              alpha(brand.neutral[50], 0.08),   // hover overlay — slightly stronger than light to read on dark surfaces
      hoverOpacity:       0.08,
      selected:           alpha(brand.neutral[50], 0.16),   // selected/expanded state overlay
      selectedOpacity:    0.16,
      disabled:           brand.neutral[500],        // disabled text and icons — matches text.disabled
      disabledBackground: brand.neutral[800],        // disabled control fill
      disabledOpacity:    0.38,
      focus:              alpha(brand.neutral[50], 0.12),   // focus overlay
      focusOpacity:       0.12,
      activatedOpacity:   0.12,
    },
  }
}

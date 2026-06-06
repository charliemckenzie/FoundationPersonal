import { createTheme, alpha, type Shadows } from '@mui/material/styles';
import type {} from '@mui/x-date-pickers/themeAugmentation';
import { buildLightPalette, buildDarkPalette, TINT } from './semantic';
import type { BrandConfig } from './brands/index';

// MUI module augmentations live in src/types/mui.d.ts so they apply globally
// without requiring this file to be imported.

export const LIGHTER_SHADOWS: Shadows = [
  'none',
  '0px 2px 1px -1px rgba(0,0,0,0.12),0px 1px 1px 0px rgba(0,0,0,0.08),0px 1px 3px 0px rgba(0,0,0,0.06)',
  '0px 3px 1px -2px rgba(0,0,0,0.12),0px 2px 2px 0px rgba(0,0,0,0.08),0px 1px 5px 0px rgba(0,0,0,0.06)',
  '0px 3px 3px -2px rgba(0,0,0,0.12),0px 3px 4px 0px rgba(0,0,0,0.08),0px 1px 8px 0px rgba(0,0,0,0.06)',
  '0px 2px 4px -1px rgba(0,0,0,0.12),0px 4px 5px 0px rgba(0,0,0,0.08),0px 1px 10px 0px rgba(0,0,0,0.06)',
  '0px 3px 5px -1px rgba(0,0,0,0.12),0px 5px 8px 0px rgba(0,0,0,0.08),0px 1px 14px 0px rgba(0,0,0,0.06)',
  '0px 3px 5px -1px rgba(0,0,0,0.12),0px 6px 10px 0px rgba(0,0,0,0.08),0px 1px 18px 0px rgba(0,0,0,0.06)',
  '0px 4px 5px -2px rgba(0,0,0,0.12),0px 7px 10px 1px rgba(0,0,0,0.08),0px 2px 16px 1px rgba(0,0,0,0.06)',
  '0px 5px 5px -3px rgba(0,0,0,0.12),0px 8px 10px 1px rgba(0,0,0,0.08),0px 3px 14px 2px rgba(0,0,0,0.06)',
  '0px 5px 6px -3px rgba(0,0,0,0.12),0px 9px 12px 1px rgba(0,0,0,0.08),0px 3px 16px 2px rgba(0,0,0,0.06)',
  '0px 6px 6px -3px rgba(0,0,0,0.12),0px 10px 14px 1px rgba(0,0,0,0.08),0px 4px 18px 3px rgba(0,0,0,0.06)',
  '0px 6px 7px -4px rgba(0,0,0,0.12),0px 11px 15px 1px rgba(0,0,0,0.08),0px 4px 20px 3px rgba(0,0,0,0.06)',
  '0px 7px 8px -4px rgba(0,0,0,0.12),0px 12px 17px 2px rgba(0,0,0,0.08),0px 5px 22px 4px rgba(0,0,0,0.06)',
  '0px 7px 8px -4px rgba(0,0,0,0.12),0px 13px 19px 2px rgba(0,0,0,0.08),0px 5px 24px 4px rgba(0,0,0,0.06)',
  '0px 7px 9px -4px rgba(0,0,0,0.12),0px 14px 21px 2px rgba(0,0,0,0.08),0px 5px 26px 4px rgba(0,0,0,0.06)',
  '0px 8px 9px -5px rgba(0,0,0,0.12),0px 15px 22px 2px rgba(0,0,0,0.08),0px 6px 28px 5px rgba(0,0,0,0.06)',
  '0px 8px 10px -5px rgba(0,0,0,0.12),0px 16px 24px 2px rgba(0,0,0,0.08),0px 6px 30px 5px rgba(0,0,0,0.06)',
  '0px 8px 11px -5px rgba(0,0,0,0.12),0px 17px 26px 2px rgba(0,0,0,0.08),0px 6px 32px 5px rgba(0,0,0,0.06)',
  '0px 9px 11px -5px rgba(0,0,0,0.12),0px 18px 28px 2px rgba(0,0,0,0.08),0px 7px 34px 6px rgba(0,0,0,0.06)',
  '0px 9px 12px -6px rgba(0,0,0,0.12),0px 19px 29px 2px rgba(0,0,0,0.08),0px 7px 36px 6px rgba(0,0,0,0.06)',
  '0px 10px 13px -6px rgba(0,0,0,0.12),0px 20px 31px 3px rgba(0,0,0,0.08),0px 8px 38px 7px rgba(0,0,0,0.06)',
  '0px 10px 13px -6px rgba(0,0,0,0.12),0px 21px 33px 3px rgba(0,0,0,0.08),0px 8px 40px 7px rgba(0,0,0,0.06)',
  '0px 10px 14px -6px rgba(0,0,0,0.12),0px 22px 35px 3px rgba(0,0,0,0.08),0px 8px 42px 7px rgba(0,0,0,0.06)',
  '0px 11px 14px -7px rgba(0,0,0,0.12),0px 23px 36px 3px rgba(0,0,0,0.08),0px 9px 44px 8px rgba(0,0,0,0.06)',
  '0px 11px 15px -7px rgba(0,0,0,0.12),0px 24px 38px 3px rgba(0,0,0,0.08),0px 9px 46px 8px rgba(0,0,0,0.06)',
]

export const DARK_MODE_SHADOWS: Shadows = [
  'none',
  '0px 2px 1px -1px rgba(0,0,0,0.5),0px 1px 1px 0px rgba(0,0,0,0.35),0px 1px 3px 0px rgba(0,0,0,0.3)',
  '0px 3px 1px -2px rgba(0,0,0,0.5),0px 2px 2px 0px rgba(0,0,0,0.35),0px 1px 5px 0px rgba(0,0,0,0.3)',
  '0px 3px 3px -2px rgba(0,0,0,0.5),0px 3px 4px 0px rgba(0,0,0,0.35),0px 1px 8px 0px rgba(0,0,0,0.3)',
  '0px 2px 4px -1px rgba(0,0,0,0.5),0px 4px 5px 0px rgba(0,0,0,0.35),0px 1px 10px 0px rgba(0,0,0,0.3)',
  '0px 3px 5px -1px rgba(0,0,0,0.5),0px 5px 8px 0px rgba(0,0,0,0.35),0px 1px 14px 0px rgba(0,0,0,0.3)',
  '0px 3px 5px -1px rgba(0,0,0,0.5),0px 6px 10px 0px rgba(0,0,0,0.35),0px 1px 18px 0px rgba(0,0,0,0.3)',
  '0px 4px 5px -2px rgba(0,0,0,0.5),0px 7px 10px 1px rgba(0,0,0,0.35),0px 2px 16px 1px rgba(0,0,0,0.3)',
  '0px 5px 5px -3px rgba(0,0,0,0.5),0px 8px 10px 1px rgba(0,0,0,0.35),0px 3px 14px 2px rgba(0,0,0,0.3)',
  '0px 5px 6px -3px rgba(0,0,0,0.5),0px 9px 12px 1px rgba(0,0,0,0.35),0px 3px 16px 2px rgba(0,0,0,0.3)',
  '0px 6px 6px -3px rgba(0,0,0,0.5),0px 10px 14px 1px rgba(0,0,0,0.35),0px 4px 18px 3px rgba(0,0,0,0.3)',
  '0px 6px 7px -4px rgba(0,0,0,0.5),0px 11px 15px 1px rgba(0,0,0,0.35),0px 4px 20px 3px rgba(0,0,0,0.3)',
  '0px 7px 8px -4px rgba(0,0,0,0.5),0px 12px 17px 2px rgba(0,0,0,0.35),0px 5px 22px 4px rgba(0,0,0,0.3)',
  '0px 7px 8px -4px rgba(0,0,0,0.5),0px 13px 19px 2px rgba(0,0,0,0.35),0px 5px 24px 4px rgba(0,0,0,0.3)',
  '0px 7px 9px -4px rgba(0,0,0,0.5),0px 14px 21px 2px rgba(0,0,0,0.35),0px 5px 26px 4px rgba(0,0,0,0.3)',
  '0px 8px 9px -5px rgba(0,0,0,0.5),0px 15px 22px 2px rgba(0,0,0,0.35),0px 6px 28px 5px rgba(0,0,0,0.3)',
  '0px 8px 10px -5px rgba(0,0,0,0.5),0px 16px 24px 2px rgba(0,0,0,0.35),0px 6px 30px 5px rgba(0,0,0,0.3)',
  '0px 8px 11px -5px rgba(0,0,0,0.5),0px 17px 26px 2px rgba(0,0,0,0.35),0px 6px 32px 5px rgba(0,0,0,0.3)',
  '0px 9px 11px -5px rgba(0,0,0,0.5),0px 18px 28px 2px rgba(0,0,0,0.35),0px 7px 34px 6px rgba(0,0,0,0.3)',
  '0px 9px 12px -6px rgba(0,0,0,0.5),0px 19px 29px 2px rgba(0,0,0,0.35),0px 7px 36px 6px rgba(0,0,0,0.3)',
  '0px 10px 13px -6px rgba(0,0,0,0.5),0px 20px 31px 3px rgba(0,0,0,0.35),0px 8px 38px 7px rgba(0,0,0,0.3)',
  '0px 10px 13px -6px rgba(0,0,0,0.5),0px 21px 33px 3px rgba(0,0,0,0.35),0px 8px 40px 7px rgba(0,0,0,0.3)',
  '0px 10px 14px -6px rgba(0,0,0,0.5),0px 22px 35px 3px rgba(0,0,0,0.35),0px 8px 42px 7px rgba(0,0,0,0.3)',
  '0px 11px 14px -7px rgba(0,0,0,0.5),0px 23px 36px 3px rgba(0,0,0,0.35),0px 9px 44px 8px rgba(0,0,0,0.3)',
  '0px 11px 15px -7px rgba(0,0,0,0.5),0px 24px 38px 3px rgba(0,0,0,0.35),0px 9px 46px 8px rgba(0,0,0,0.3)',
]

const FOUNDATION_TRANSITION_DURATION = {
  shortest: 150,
  shorter: 200,
  short: 250,
  standard: 300,
  complex: 375,
  enteringScreen: 225,
  leavingScreen: 195,
  form: 150,
  spring: 350,
};

const FOUNDATION_TRANSITION_EASING = {
  easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
  easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
  spring: 'cubic-bezier(0.25, 1, 0.5, 1)',
};

export function createBrandTheme(brand: BrandConfig, mode: 'light' | 'dark' = 'light') {
  const palette = mode === 'dark' ? buildDarkPalette(brand) : buildLightPalette(brand);
  const shadows = mode === 'dark' ? DARK_MODE_SHADOWS : LIGHTER_SHADOWS;
  const theme = createTheme({
    brandConfig: brand,
    shadows,
    palette: { ...palette, mode },
    // --- Transitions ---------------------------------------------------------
    // Custom durations and easings extend MUI defaults (shortest=150, shorter=200,
    // standard=300, complex=375) and are accessible via t.transitions.duration.*
    // and t.transitions.easing.* in sx props and styleOverrides.
    transitions: {
      duration: FOUNDATION_TRANSITION_DURATION,
      easing: FOUNDATION_TRANSITION_EASING,
    },
    // --- Z-index layer stack ------------------------------------------------
    // Semantic tokens built on MUI defaults (appBar=1100, tooltip=1500).
    // Use these instead of arithmetic offsets in components.
    zIndex: {
      megaMenu: 1101,     // appBar (1100) + 1  — mega-menu panel
      stickyHeader: 1102, // appBar (1100) + 2  — condensed sticky header
      skipLink: 1501,     // tooltip (1500) + 1 — skip-links above all overlays
    },
    shape: {
      borderRadius: 4,
      none: 0,
      xs: 4,
      sm: 8,
      md: 12,
      lg: 16,
      xl: 24,
      '2xl': 32,
      full: 9999,
      button: typeof brand.buttonBorderRadius === 'number' ? brand.buttonBorderRadius : 9999,
    },
    typography: {
      fontFamily: brand.fontFamily,
      htmlFontSize: 16,
      fontSize: 16,
      // Display headings - Bootstrap scale
      'display-1': {
        fontFamily: brand.headingFontFamily,
        fontSize: 'clamp(2.5rem, 4.76vw + 1.43rem, 5rem)',    // 40px → 80px
        fontWeight: 700,
        lineHeight: 1.2,
      },
      'display-2': {
        fontFamily: brand.headingFontFamily,
        fontSize: 'clamp(2.25rem, 4.29vw + 1.29rem, 4.5rem)', // 36px → 72px
        fontWeight: 700,
        lineHeight: 1.2,
      },
      'display-3': {
        fontFamily: brand.headingFontFamily,
        fontSize: 'clamp(2rem, 3.81vw + 1.14rem, 4rem)',      // 32px → 64px
        fontWeight: 700,
        lineHeight: 1.2,
      },
      'display-4': {
        fontFamily: brand.headingFontFamily,
        fontSize: 'clamp(1.875rem, 3.10vw + 1.18rem, 3.5rem)', // 30px → 56px
        fontWeight: 700,
        lineHeight: 1.2,
      },
      'display-5': {
        fontFamily: brand.headingFontFamily,
        fontSize: 'clamp(1.75rem, 2.38vw + 1.21rem, 3rem)',   // 28px → 48px
        fontWeight: 700,
        lineHeight: 1.2,
      },
      // Standard heading hierarchy - Bootstrap scale
      h1: {
        fontFamily: brand.headingFontFamily,
        fontSize: 'clamp(1.75rem, 1.43vw + 1.43rem, 2.5rem)', // 28px → 40px
        fontWeight: 700,
        lineHeight: 1.2,
      },
      h2: {
        fontFamily: brand.headingFontFamily,
        fontSize: 'clamp(1.5rem, 0.95vw + 1.29rem, 2rem)',    // 24px → 32px
        fontWeight: 700,
        lineHeight: 1.2,
      },
      h3: {
        fontFamily: brand.headingFontFamily,
        fontSize: '1.75rem',   // 28px
        fontWeight: 700,
        lineHeight: 1.2,
      },
      h4: {
        fontSize: '1.5rem',    // 24px
        fontWeight: 700,
        lineHeight: 1.2,
      },
      h5: {
        fontSize: '1.25rem',   // 20px
        fontWeight: 700,
        lineHeight: 1.2,
      },
      h6: {
        fontSize: '1rem',      // 16px
        fontWeight: 700,
        lineHeight: 1.2,
      },
      // Body text variants - Bootstrap scale
      lead: {
        fontFamily: brand.fontFamily,
        fontSize: '1.25rem',   // 20px
        fontWeight: 300,       // Light on desktop; bumped to 400 on mobile via MuiTypography styleOverrides
        lineHeight: 1.6,
      },
      body: {
        fontFamily: brand.fontFamily,
        fontSize: '1rem',      // 16px
        fontWeight: 400,
        lineHeight: 1.5,
      },
      small: {
        fontFamily: brand.fontFamily,
        fontSize: '0.875rem',  // 14px
        fontWeight: 400,
        lineHeight: 1.5,
      },
      // Caption — 12px metadata, footer notes, form helper text. Same role as MUI's
      // legacy `caption` variant but defined under our own scale so the design system
      // is self-contained (MUI's caption defaults are disabled via mui.d.ts).
      caption: {
        fontFamily: brand.fontFamily,
        fontSize: '0.75rem',   // 12px
        fontWeight: 400,
        lineHeight: 1.5,
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: (theme) => ({
          // MUI v9 CssBaseline spreads theme.typography.body1 onto the body element.
          // body1 is deleted from the theme (disabled variant), so we restore the
          // essential properties here to keep the body's font-family correct.
          body: {
            fontFamily: brand.fontFamily,
            fontSize: '1rem',
            fontWeight: theme.typography.fontWeightRegular,
            lineHeight: 1.5,
          },
          a: {
            color: theme.palette.text.link,
            textDecoration: 'underline',
            textUnderlineOffset: '0.2em',
            textDecorationColor: alpha(theme.palette.text.link, 0.5),
            '&:hover': {
              color: brand.primary[700],
              textDecorationColor: brand.primary[700],
            },
            '&:active': {
              color: brand.primary[800],
              textDecorationColor: brand.primary[800],
            },
          },
        }),
      },
      MuiContainer: {
        styleOverrides: {
          maxWidthLg: {
            maxWidth: '1248px !important',
          },
        },
      },
      MuiAccordionSummary: {
        styleOverrides: {
          root: ({ theme }) => ({
            color: brand.quaternary ? theme.palette.text.link : theme.palette.text.heading,
            '&.Mui-expanded': {
              backgroundColor: theme.palette.action.selected,
            },
            '&:hover:not(.Mui-disabled)': {
              backgroundColor: theme.palette.action.hover,
            },
            '&.Mui-expanded:hover:not(.Mui-disabled)': {
              backgroundColor: theme.palette.action.selected,
            },
            '&.Mui-focusVisible': {
              outline: `2px solid ${theme.palette.border.focus}`,
              outlineOffset: '-2px',
              boxShadow: 'none',
            },
          }),
        },
      },
      MuiAlert: {
        styleOverrides: {
          root: ({ theme, ownerState }) => ({
            padding: '8px 16px',
            minHeight: '2.75rem',
            borderRadius: `${theme.shape.sm}px`,
            alignItems: 'center',
            gap: '12px',
            ...(ownerState.variant === 'standard' && ownerState.severity === 'error' && {
              backgroundColor: theme.palette.error.background!,
              color:           theme.palette.error.text!,
              border:          `1px solid ${theme.palette.error.border!}`,
            }),
            ...(ownerState.variant === 'standard' && ownerState.severity === 'warning' && {
              backgroundColor: theme.palette.warning.background!,
              color:           theme.palette.warning.text!,
              border:          `1px solid ${theme.palette.warning.border!}`,
            }),
            ...(ownerState.variant === 'standard' && ownerState.severity === 'info' && {
              backgroundColor: theme.palette.info.background!,
              color:           theme.palette.info.text!,
              border:          `1px solid ${theme.palette.info.border!}`,
            }),
            ...(ownerState.variant === 'standard' && ownerState.severity === 'success' && {
              backgroundColor: theme.palette.success.background!,
              color:           theme.palette.success.text!,
              border:          `1px solid ${theme.palette.success.border!}`,
            }),
          }),
          icon: {
            padding: 0,
            margin: 0,
            alignSelf: 'flex-start',
            height: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          },
          message: {
            padding: 0,
            margin: 0,
            lineHeight: 1.5,
          },
          action: {
            padding: 0,
            margin: 0,
            alignSelf: 'flex-start',
          },
        },
      },
      MuiAlertTitle: {
        styleOverrides: {
          root: {
            fontWeight: 700,
            fontSize: '1rem',
            lineHeight: 1.5,
            margin: 0,
          },
        },
      },
      // Link interaction states — light mode and dark mode.
      // Resting colour is set via text.link in the palette.
      // visited uses CSS :visited which is browser-restricted to colour only (WCAG security constraint).
      // Light — ART:    hover primary[700] 8.8:1, active primary[800] 11.6:1, visited secondary[800] 11.7:1
      // Light — QSuper: hover primary[700] 6.4:1, active primary[800] 9.3:1,  visited secondary[800] 14.9:1
      // Dark  — both:   hover primary[200],       active primary[100],         visited secondary[400]
      MuiLink: {
        styleOverrides: {
          root: ({ theme: t }) => ({
            color: 'inherit',
            textDecoration: 'underline',
            textUnderlineOffset: '0.2em',
            textDecorationColor: alpha(brand.primary[600], 0.5),
            '&:hover': {
              color: brand.primary[700],
              textDecorationColor: brand.primary[700],
            },
            '&:active': {
              color: brand.primary[800],
              textDecorationColor: brand.primary[800],
            },
            '&:visited': {
              color: brand.secondary[800],
              textDecorationColor: alpha(brand.secondary[800], 0.5),
              '&:hover': { color: brand.secondary[700], textDecorationColor: brand.secondary[700] },
              '&:active': { color: brand.secondary[900], textDecorationColor: brand.secondary[900] },
            },
            ...t.applyStyles('dark', {
              textDecorationColor: alpha(brand.primary[300], 0.5),
              '&:hover': {
                color: brand.primary[200],
                textDecorationColor: brand.primary[200],
              },
              '&:active': {
                color: brand.primary[100],
                textDecorationColor: brand.primary[100],
              },
              '&:visited': {
                color: brand.secondary[400],
                textDecorationColor: alpha(brand.secondary[400], 0.5),
                '&:hover': { color: brand.secondary[300], textDecorationColor: brand.secondary[300] },
                '&:active': { color: brand.secondary[500], textDecorationColor: brand.secondary[500] },
              },
            }),
          }),
        },
      },
      MuiButton: {
        defaultProps: {
          disableRipple: true,
        },
        styleOverrides: {
          root: {
            textTransform: 'none',
            fontFamily: brand.fontFamily,
            fontSize: '1rem',
            fontWeight: 700,
            lineHeight: 1.5,
            borderRadius: brand.buttonBorderRadius,
          },
          sizeSmall: {
            fontSize: '0.875rem',
            lineHeight: 1.5,
          },
          sizeLarge: {
            fontSize: '1.25rem',
            lineHeight: 1.5,
          },
        },
      },
      MuiCardActionArea: {
        styleOverrides: {
          root: ({ theme }) => ({
            '&.Mui-focusVisible': {
              outline: `2px solid ${theme.palette.border.focus}`,
              outlineOffset: '2px',
              boxShadow: 'none',
            },
          }),
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: ({ ownerState, theme }) => {
            const paletteColors = ['primary', 'secondary', 'error', 'warning', 'info', 'success'] as const;
            type PaletteColor = (typeof paletteColors)[number];
            const isPaletteColor = (c: unknown): c is PaletteColor =>
              paletteColors.includes(c as PaletteColor);
            const ringColor = isPaletteColor(ownerState.color)
              ? theme.palette[ownerState.color].main
              : theme.palette.action.active;
            return {
              '&.Mui-focusVisible': {
                outline: `2px solid ${ringColor}`,
                outlineOffset: '2px',
                boxShadow: 'none',
              },
            };
          },
        },
      },
      MuiFormLabel: {
        styleOverrides: {
          root: ({ theme }) => ({
            '&.Mui-focused': {
              color: theme.palette.text.primary,
            },
          }),
        },
      },
      MuiFormControlLabel: {
        styleOverrides: {
          label: {
            fontSize: '1rem',
          },
        },
      },
      MuiCheckbox: {
        styleOverrides: {
          root: ({ theme }) => ({
            borderRadius: '0.25rem',
            '&.Mui-focusVisible': {
              outline: `2px solid ${theme.palette.border.focus}`,
              outlineOffset: '2px',
              boxShadow: 'none',
              backgroundColor: 'transparent',
            },
          }),
        },
      },
      MuiRadio: {
        styleOverrides: {
          root: ({ theme }) => ({
            '&.Mui-focusVisible, &.Mui-checked.Mui-focusVisible': {
              outline: `2px solid ${theme.palette.border.focus}`,
              outlineOffset: '2px',
              boxShadow: 'none',
              backgroundColor: 'transparent',
            },
            '& input[type="radio"]': {
              appearance: 'none',
              WebkitAppearance: 'none',
            },
          }),
        },
      },
      MuiToggleButton: {
        styleOverrides: {
          root: ({ ownerState, theme }) => ({
            textTransform: 'none',
            // Replaces button defaults removed from theme.typography
            fontFamily: brand.fontFamily,
            fontSize: ownerState.size === 'small' ? '0.875rem' : ownerState.size === 'large' ? '1.25rem' : '1rem',
            fontWeight: 400,
            lineHeight: 1,
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.background.paper,
            borderColor: theme.palette.border.input,
            borderRadius: `${theme.shape.sm}px`,
            position: 'relative',
            zIndex: 0,
            height: ownerState.size === 'small' ? '2.25rem' : ownerState.size === 'large' ? '3.5rem' : '3rem',
            '&.Mui-disabled': {
              backgroundColor: alpha(theme.palette.background.default, 0.6),
              borderColor: alpha(theme.palette.border.input, 0.6),
              color: theme.palette.action.disabled,
            },
            '&.Mui-selected': {
              borderColor: theme.palette.primary.main,
              backgroundColor: theme.palette.primary.softMain ?? alpha(theme.palette.primary.main, TINT.main[theme.palette.mode as 'light' | 'dark']),
              color: theme.palette.primary.main,
              zIndex: 1,
              '&:hover': {
                backgroundColor: theme.palette.primary.softDark ?? alpha(theme.palette.primary.main, TINT.dark[theme.palette.mode as 'light' | 'dark']),
                color: theme.palette.mode === 'light' ? theme.palette.primary.dark : theme.palette.primary.light,
              },
              '&:active': {
                backgroundColor: theme.palette.primary.softDeeper ?? alpha(theme.palette.primary.main, TINT.deeper[theme.palette.mode as 'light' | 'dark']),
                color: theme.palette.mode === 'light' ? theme.palette.primary.dark : theme.palette.primary.light,
              },
            },
            '&.Mui-focusVisible': {
              outline: `2px solid ${theme.palette.border.focus}`,
              outlineOffset: '2px',
              boxShadow: 'none',
              zIndex: 2,
            },
          }),
        },
      },
      MuiToggleButtonGroup: {
        styleOverrides: {
          root: ({ theme }) => ({
            '& .MuiToggleButtonGroup-grouped:not(:first-of-type)': {
              borderLeft: `1px solid ${theme.palette.border.input}`,
            },
            '& .MuiToggleButtonGroup-grouped.Mui-selected:not(:first-of-type)': {
              borderLeft: `1px solid ${theme.palette.primary.main}`,
            },
            '& .MuiToggleButtonGroup-grouped.Mui-disabled:not(:first-of-type)': {
              borderLeft: `1px solid ${alpha(theme.palette.border.input, 0.6)}`,
            },
            '&.MuiToggleButtonGroup-vertical .MuiToggleButtonGroup-grouped:not(:first-of-type)': {
              borderTop: `1px solid ${theme.palette.border.input}`,
            },
            '&.MuiToggleButtonGroup-vertical .MuiToggleButtonGroup-grouped.Mui-selected:not(:first-of-type)': {
              borderTop: `1px solid ${theme.palette.primary.main}`,
            },
            '&.MuiToggleButtonGroup-vertical .MuiToggleButtonGroup-grouped.Mui-disabled:not(:first-of-type)': {
              borderTop: `1px solid ${alpha(theme.palette.border.input, 0.6)}`,
            },
          }),
        },
      },
      // These components internally spread theme.typography.body1 / body2 / button for their
      // default text styles. Since those variants are deleted from the theme, each component
      // needs explicit overrides or they fall back to browser defaults.
      MuiInputBase: {
        styleOverrides: {
          root: {
            fontFamily: brand.fontFamily,
            fontSize: '1rem',
            fontWeight: 400,
            lineHeight: 1.5,
          },
        },
      },
      MuiFormHelperText: {
        styleOverrides: {
          root: {
            fontFamily: brand.fontFamily,
            fontSize: '0.875rem',
            fontWeight: 400,
            lineHeight: 1.5,
            margin: 0,
            marginTop: '0.25rem',
          },
        },
      },
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            fontSize: '0.875rem',
            lineHeight: 1.5,
          },
        },
      },
      MuiMenuItem: {
        styleOverrides: {
          root: {
            fontFamily: brand.fontFamily,
            fontSize: '1rem',
            fontWeight: 400,
            lineHeight: 1.5,
          },
        },
      },
      MuiListItemText: {
        styleOverrides: {
          primary: {
            fontFamily: brand.fontFamily,
            fontSize: '1rem',
            fontWeight: 400,
            lineHeight: 1.5,
          },
          secondary: {
            fontFamily: brand.fontFamily,
            fontSize: '0.875rem',
            fontWeight: 400,
            lineHeight: 1.5,
          },
        },
      },
      MuiTab: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            fontFamily: brand.fontFamily,
            fontSize: '1rem',
            fontWeight: 700,
            lineHeight: 1,
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          label: {
            fontFamily: brand.fontFamily,
            fontSize: '0.875rem',
            fontWeight: 400,
            lineHeight: 1,
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          root: {
            fontFamily: brand.fontFamily,
            fontSize: '1rem',
            fontWeight: 400,
            lineHeight: 1.5,
          },
          sizeSmall: {
            fontSize: '0.875rem',
          },
        },
      },
      // MUI X v9 — PickersOutlinedInput uses Mui-focused / Mui-error (global MUI state classes),
      // NOT MuiPickersInputBase-focused. generateUtilityClass maps 'focused' → 'Mui-focused'.
      // The color variant rule has specificity (0,4,0) via :not(.Mui-error).
      // Theme styleOverrides inject after component defaults — equal specificity → override wins.
      MuiPickersOutlinedInput: {
        styleOverrides: {
          root: ({ theme }) => ({
            // PickersInputBaseRoot spreads theme.typography.body1 (≈18px when fontSize:16)
            fontSize: '1rem',
            borderRadius: `${theme.shape.sm}px`,
            backgroundColor: theme.palette.background.paper,
            '& fieldset': {
              borderColor: theme.palette.border.input,
              borderRadius: `${theme.shape.sm}px`,
            },
            '&:hover:not(.Mui-focused):not(.Mui-error):not(.Mui-disabled) fieldset': {
              borderColor: theme.palette.border.input,
            },
            '&.Mui-disabled': {
              backgroundColor: alpha(theme.palette.background.default, 0.6),
            },
            '&&.Mui-disabled fieldset': {
              borderColor: alpha(theme.palette.border.input, 0.6),
            },
            // Kill MUI X's 2px focused border — base rule specificity (0,3,0)
            '&.Mui-focused .MuiPickersOutlinedInput-notchedOutline': {
              borderWidth: '1px',
              borderColor: theme.palette.border.input,
            },
            // Kill MUI X's color variant rule — specificity (0,4,0) via :not — match exactly
            '&.Mui-focused:not(.Mui-error) .MuiPickersOutlinedInput-notchedOutline': {
              borderWidth: '1px',
              borderColor: theme.palette.border.input,
            },
            '&.Mui-error .MuiPickersOutlinedInput-notchedOutline': {
              borderColor: theme.palette.error.main,
            },
            // Focus ring matching TextField / Select / Autocomplete
            '&.Mui-focused': {
              outline: `2px solid ${theme.palette.border.focus}`,
              outlineOffset: '2px',
            },
          }),
        },
      },
      MuiTypography: {
        defaultProps: {
          // body1 is deleted from theme.typography — fall back to our `body` variant.
          variant: 'body',
          variantMapping: {
            'display-1': 'h1',
            'display-2': 'h1',
            'display-3': 'h1',
            'display-4': 'h1',
            'display-5': 'h2',
            lead: 'p',
            body: 'p',
            small: 'p',
            caption: 'span',
          },
        },
        styleOverrides: {
          root: ({ theme, ownerState }) => ({
            ...(['h1', 'h2', 'h3', 'h4', 'h5', 'h6',
                 'display-1', 'display-2', 'display-3', 'display-4', 'display-5',
                ].includes(ownerState.variant as string) && {
              color: theme.palette.text.heading,
            }),
            // lead: Light (300) on desktop, Normal (400) on mobile for legibility
            ...(ownerState.variant === 'lead' && {
              [theme.breakpoints.down('md')]: {
                fontWeight: 400,
              },
            }),
          }),
        },
      },
    },
  });

  // `createTheme` deep-merges MUI's hardcoded typography defaults (body1, body2,
  // subtitle1, subtitle2, button, overline) before our custom variants land —
  // they can't be overridden to nothing via the options object. Deleting them
  // here makes the runtime theme match the TypeScript types (TypographyPropsVariantOverrides
  // marks them all `false` in mui.d.ts). Any MUI-internal component that spreads
  // one of these (e.g. MuiPickersOutlinedInput spreads body1) already has an
  // explicit styleOverrides override, so nothing breaks.
  const DISABLED_TYPOGRAPHY_VARIANTS = [
    'body1', 'body2', 'subtitle1', 'subtitle2', 'button', 'overline',
  ] as const;
  for (const variant of DISABLED_TYPOGRAPHY_VARIANTS) {
    delete (theme.typography as unknown as Record<string, unknown>)[variant];
  }

  return theme;
}

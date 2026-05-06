import { createTheme, lighten, darken, type PaletteColor, type SimplePaletteColorOptions, type Shadows } from '@mui/material/styles';
import { buildLightPalette, buildDarkPalette } from './semantic';
import type { BrandConfig } from './brands/index';
import { red, amber, blue, green } from './primitives/colors';

const ALERT_BORDER_LIGHT: Record<string, string> = {
  error:   red[100],
  warning: amber[100],
  info:    blue[100],
  success: green[100],
};
const ALERT_BORDER_DARK: Record<string, string> = {
  error:   red[900],
  warning: amber[900],
  info:    blue[900],
  success: green[900],
};
import type React from 'react';

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    soft: true;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    // Bootstrap display headings
    'display-1': true;
    'display-2': true;
    'display-3': true;
    'display-4': true;
    'display-5': true;
    'display-6': true;
    // Bootstrap body variants
    lead: true;
    body: true;
    small: true;
    // Disable MUI defaults
    body1: false;
    body2: false;
    subtitle1: false;
    subtitle2: false;
    button: false;
    caption: false;
    overline: false;
  }
}

interface BorderTokens {
  subtle: string;
  default: string;
  input: string;
  focus: string;
}

declare module '@mui/material/styles' {
  interface Theme {
    brandConfig: BrandConfig;
  }
  interface ThemeOptions {
    brandConfig?: BrandConfig;
  }
  interface Shape {
    none: number
    xs: number
    sm: number
    md: number
    lg: number
    xl: number
    '2xl': number
    full: number
    button: number
  }
  interface ShapeOptions {
    none?: number
    xs?: number
    sm?: number
    md?: number
    lg?: number
    xl?: number
    '2xl'?: number
    full?: number
    button?: number
  }
}

declare module '@mui/material/styles' {
  interface TypeBackground {
    elevated: string;
    brandPrimary: string;
    brandSecondary: string;
    brandTertiary: string;
    // ART-only
    brandSky?: string;
    brandClear?: string;
    brandWarm?: string;
    // QSuper-only
    brandGrey?: string;
    brandLightBlue?: string;
    // Table
    tableStripe: string;
  }

  interface TypeText {
    muted: string;
    inverse: string;
    heading: string;
    link: string;
    linkInverse: string;
  }

  interface Palette {
    border: BorderTokens;
    tertiary?: PaletteColor;
    quaternary?: PaletteColor;
  }

  interface PaletteColor {
    text: string;
  }
  interface SimplePaletteColorOptions {
    text?: string;
  }

  interface PaletteOptions {
    border?: Partial<BorderTokens>;
    tertiary?: SimplePaletteColorOptions;
    quaternary?: SimplePaletteColorOptions;
  }

  interface TypographyVariants {
    'display-1': React.CSSProperties;
    'display-2': React.CSSProperties;
    'display-3': React.CSSProperties;
    'display-4': React.CSSProperties;
    'display-5': React.CSSProperties;
    'display-6': React.CSSProperties;
    lead: React.CSSProperties;
    body: React.CSSProperties;
    small: React.CSSProperties;
  }
  interface TypographyVariantsOptions {
    'display-1'?: React.CSSProperties;
    'display-2'?: React.CSSProperties;
    'display-3'?: React.CSSProperties;
    'display-4'?: React.CSSProperties;
    'display-5'?: React.CSSProperties;
    'display-6'?: React.CSSProperties;
    lead?: React.CSSProperties;
    body?: React.CSSProperties;
    small?: React.CSSProperties;
  }
}

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

export function createBrandTheme(brand: BrandConfig) {
  const theme = createTheme({
    brandConfig: brand,
    shadows: LIGHTER_SHADOWS,
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
        fontSize: '5rem',      // 80px
        fontWeight: 700,
        lineHeight: 1.2,
      },
      'display-2': {
        fontFamily: brand.headingFontFamily,
        fontSize: '4.5rem',    // 72px
        fontWeight: 700,
        lineHeight: 1.2,
      },
      'display-3': {
        fontFamily: brand.headingFontFamily,
        fontSize: '4rem',      // 64px
        fontWeight: 700,
        lineHeight: 1.2,
      },
      'display-4': {
        fontFamily: brand.headingFontFamily,
        fontSize: '3.5rem',    // 56px
        fontWeight: 700,
        lineHeight: 1.2,
      },
      'display-5': {
        fontFamily: brand.headingFontFamily,
        fontSize: '3rem',      // 48px
        fontWeight: 700,
        lineHeight: 1.2,
      },
      'display-6': {
        fontFamily: brand.headingFontFamily,
        fontSize: '2.5rem',    // 40px
        fontWeight: 700,
        lineHeight: 1.2,
      },
      // Standard heading hierarchy - Bootstrap scale
      h1: {
        fontFamily: brand.headingFontFamily,
        fontSize: '2.5rem',    // 40px
        fontWeight: 700,
        lineHeight: 1.2,
      },
      h2: {
        fontFamily: brand.headingFontFamily,
        fontSize: '2rem',      // 32px
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
        fontSize: '1.25rem',   // 20px
        fontWeight: 300,
        lineHeight: 1.6,
      },
      body: {
        fontSize: '1rem',      // 16px
        fontWeight: 400,
        lineHeight: 1.5,
      },
      small: {
        fontSize: '0.875rem',  // 14px
        fontWeight: 400,
        lineHeight: 1.5,
      },
    },
    colorSchemes: {
      light: { palette: buildLightPalette(brand) },
      dark:  { palette: buildDarkPalette(brand) },
    },
    components: {
      MuiAccordionSummary: {
        styleOverrides: {
          root: ({ theme }) => ({
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
            minHeight: '44px',
            borderRadius: '8px',
            alignItems: 'center',
            gap: '12px',
            ...(ownerState.variant === 'standard' && ownerState.severity && {
              border: `1px solid ${ALERT_BORDER_LIGHT[ownerState.severity]}`,
              ...theme.applyStyles('dark', {
                border: `1px solid ${ALERT_BORDER_DARK[ownerState.severity]}`,
              }),
            }),
            ...(ownerState.variant === 'standard' && ownerState.severity === 'error' && {
              backgroundColor: red[50],
              ...theme.applyStyles('dark', {
                backgroundColor: red[950],
              }),
            }),
            ...(ownerState.variant === 'standard' && ownerState.severity === 'warning' && {
              backgroundColor: amber[50],
              ...theme.applyStyles('dark', {
                backgroundColor: amber[950],
              }),
            }),
            ...(ownerState.variant === 'standard' && ownerState.severity === 'info' && {
              backgroundColor: blue[50],
              ...theme.applyStyles('dark', {
                backgroundColor: blue[950],
              }),
            }),
            ...(ownerState.variant === 'standard' && ownerState.severity === 'success' && {
              backgroundColor: green[50],
              ...theme.applyStyles('dark', {
                backgroundColor: green[950],
              }),
            }),
          }),
          icon: {
            padding: 0,
            margin: 0,
            alignSelf: 'flex-start',
            height: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          },
          message: {
            padding: 0,
            margin: 0,
            lineHeight: '24px',
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
            textDecorationColor: 'inherit',
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
              '&:hover': { color: brand.secondary[700] },
              '&:active': { color: brand.secondary[900] },
            },
            ...t.applyStyles('dark', {
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
                '&:hover': { color: brand.secondary[300] },
                '&:active': { color: brand.secondary[500] },
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
            fontSize: '1rem',
            fontWeight: 700,
            lineHeight: 1,
            borderRadius: brand.buttonBorderRadius,
          },
          sizeSmall: {
            fontSize: '14px',
            lineHeight: 1,
          },
          sizeLarge: {
            fontSize: '20px',
            lineHeight: 1,
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: ({ ownerState, theme }) => {
            const colorKey = (ownerState.color === 'default' ? null : ownerState.color) as keyof typeof theme.palette | null;
            const palette = colorKey ? theme.palette[colorKey] as { main?: string } | undefined : undefined;
            const ringColor = palette?.main ?? theme.palette.action.active;
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
      MuiCheckbox: {
        styleOverrides: {
          root: ({ ownerState, theme }) => {
            const colorKey = (ownerState.color === 'default' ? null : ownerState.color) as keyof typeof theme.palette | null;
            const palette = colorKey ? theme.palette[colorKey] as { main?: string } | undefined : undefined;
            const ringColor = palette?.main ?? theme.palette.action.active;
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
      MuiRadio: {
        styleOverrides: {
          root: ({ ownerState, theme }) => {
            const colorKey = (ownerState.color === 'default' ? null : ownerState.color) as keyof typeof theme.palette | null;
            const palette = colorKey ? theme.palette[colorKey] as { main?: string } | undefined : undefined;
            const ringColor = palette?.main ?? theme.palette.action.active;
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
      MuiToggleButton: {
        styleOverrides: {
          root: ({ ownerState, theme }) => {
            const colorKey = (ownerState.color === 'standard' ? null : ownerState.color) as keyof typeof theme.palette | null;
            const palette = colorKey ? theme.palette[colorKey] as { main?: string } | undefined : undefined;
            const ringColor = palette?.main ?? theme.palette.action.active;
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
      MuiTypography: {
        defaultProps: {
          variantMapping: {
            'display-1': 'h1',
            'display-2': 'h1',
            'display-3': 'h1',
            'display-4': 'h1',
            'display-5': 'h2',
            'display-6': 'h2',
            lead: 'p',
            body: 'p',
            small: 'p',
          },
        },
      },
    },
  });
  
  return theme;
}

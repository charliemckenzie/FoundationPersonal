import type { PaletteColor, SimplePaletteColorOptions } from '@mui/material/styles';
import type React from 'react';
import type { BrandConfig } from '../app/themes/brands';

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    soft: true;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    'display-1': true;
    'display-2': true;
    'display-3': true;
    'display-4': true;
    'display-5': true;
    lead: true;
    body: true;
    small: true;
    caption: true;
    body1: false;
    body2: false;
    subtitle1: false;
    subtitle2: false;
    button: false;
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
    none: number;
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    '2xl': number;
    full: number;
    button: number;
  }
  interface ShapeOptions {
    none?: number;
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
    '2xl'?: number;
    full?: number;
    button?: number;
  }

  interface TypeBackground {
    elevated: string;
    brandPrimary: string;
    brandSecondary: string;
    brandTertiary: string;
    /** Cool-tinted brand surface. ART: skyBlue[200]. QSuper: qSkyBlue[100]. */
    tintCool: string;
    /** Lightest cool brand surface. ART: clearBlue[100]. QSuper: qSkyBlue[50]. */
    tintNeutralCool: string;
    /** Warm-tinted brand surface. ART: salmon[50]. QSuper: neutral[100] (fallback). */
    tintWarm: string;
    /** Neutral brand surface. ART: neutralART[100] (fallback). QSuper: neutral[100]. */
    tintNeutral: string;
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
    icon: string;
    background: string;
    border: string;
  }
  interface SimplePaletteColorOptions {
    text?: string;
    icon?: string;
    background?: string;
    border?: string;
  }

  interface PaletteOptions {
    border?: Partial<BorderTokens>;
    tertiary?: SimplePaletteColorOptions;
    quaternary?: SimplePaletteColorOptions;
  }

  interface TransitionDuration {
    /** Form micro-interactions: checkbox, radio, file upload (150 ms). */
    form: number;
    /** Spring-like animations: form-progress track (350 ms). */
    spring: number;
  }

  interface TransitionEasing {
    /** Overshoot easing used for the Tabs indicator spring (cubic-bezier(0.25, 1, 0.5, 1)). */
    spring: string;
  }

  interface ZIndex {
    /** Mega-menu panel — sits above the AppBar (1101). */
    megaMenu: number;
    /** Condensed sticky header — sits above the mega-menu (1102). */
    stickyHeader: number;
    /** Skip-links — must appear above all overlays including tooltips (1501). */
    skipLink: number;
  }

  interface TypographyVariants {
    'display-1': React.CSSProperties;
    'display-2': React.CSSProperties;
    'display-3': React.CSSProperties;
    'display-4': React.CSSProperties;
    'display-5': React.CSSProperties;
    lead: React.CSSProperties;
    body: React.CSSProperties;
    small: React.CSSProperties;
    caption: React.CSSProperties;
  }
  interface TypographyVariantsOptions {
    'display-1'?: React.CSSProperties;
    'display-2'?: React.CSSProperties;
    'display-3'?: React.CSSProperties;
    'display-4'?: React.CSSProperties;
    'display-5'?: React.CSSProperties;
    lead?: React.CSSProperties;
    body?: React.CSSProperties;
    small?: React.CSSProperties;
    caption?: React.CSSProperties;
  }
}

export {};

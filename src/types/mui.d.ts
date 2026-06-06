import type {
  PaletteColor as MuiPaletteColor,
  SimplePaletteColorOptions as MuiSimplePaletteColorOptions,
} from '@mui/material/styles';
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
    tertiary?: MuiPaletteColor;
    quaternary?: MuiPaletteColor;
  }

  interface PaletteColor {
    /** Present on status colours (error/warning/info/success) only. Use .softMain for brand-colour tinted surfaces. */
    text?: string;
    /** @deprecated No consumers. Use .main directly. */
    icon?: string;
    /** Present on status colours (error/warning/info/success) only. Use .softMain for brand-colour tinted surfaces. */
    background?: string;
    /** Present on status colours (error/warning/info/success) only. */
    border?: string;
    // ── Interaction surface tokens (brand colours only; status colours use `.background`) ──
    /** 4% tint — outlined button hover. Flat; same value in both modes. */
    softLight?: string;
    /** 8%/15% tint — soft resting fill, ghost hover, outlined active. Mode-aware. */
    softMain?: string;
    /** 15%/25% tint — soft hover, ghost active. Mode-aware. */
    softDark?: string;
    /** 20%/30% tint — soft active (pressed feedback). Mode-aware. */
    softDeeper?: string;
  }
  interface SimplePaletteColorOptions {
    text?: string;
    icon?: string;
    background?: string;
    border?: string;
    softLight?: string;

    softMain?: string;
    softDark?: string;
    softDeeper?: string;
  }

  interface PaletteOptions {
    border?: Partial<BorderTokens>;
    tertiary?: MuiSimplePaletteColorOptions;
    quaternary?: MuiSimplePaletteColorOptions;
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

declare module '@mui/material/styles/createTransitions' {
  interface Duration {
    /** Form micro-interactions: checkbox, radio, file upload (150 ms). */
    form: number;
    /** Spring-like animations: form-progress track (350 ms). */
    spring: number;
  }

  interface Easing {
    /** Overshoot easing used for the Tabs indicator spring. */
    spring: string;
  }
}

declare module '@mui/material/styles/createTransitions.js' {
  interface Duration {
    /** Form micro-interactions: checkbox, radio, file upload (150 ms). */
    form: number;
    /** Spring-like animations: form-progress track (350 ms). */
    spring: number;
  }

  interface Easing {
    /** Overshoot easing used for the Tabs indicator spring. */
    spring: string;
  }
}

export {};

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
    'display-6': true;
    lead: true;
    body: true;
    small: true;
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
    brandSky?: string;
    brandClear?: string;
    brandWarm?: string;
    brandGrey?: string;
    brandLightBlue?: string;
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

export {};

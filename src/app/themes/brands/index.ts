import type { ColorScale } from '../primitives/colors';

export interface GridConfig {
  columns: Record<'xs' | 'sm' | 'md' | 'lg' | 'xl', number>;
  gutter:  Record<'xs' | 'sm' | 'md' | 'lg' | 'xl', number>;
  margin:  Record<'xs' | 'sm' | 'md' | 'lg' | 'xl', number | 'auto'>;
  maxWidth: number;
}

/** Brand-specific surface background overrides. Falls back to Foundation defaults in semantic.ts. */
export interface BrandSurfaces {
  brandPrimary?: string;
  sky?:          string;
  clear?:        string;
  warm?:         string;
}

/** Named accent colours for icons and highlights (not for backgrounds). */
export interface BrandHighlights {
  [key: string]: string;
}

export interface BrandConfig {
  name: string;
  primary: ColorScale;
  secondary: ColorScale;
  tertiary?: ColorScale;
  neutral: ColorScale;
  buttonBorderRadius: string | number;
  grid?: GridConfig;
  surfaces?: BrandSurfaces;
  highlights?: BrandHighlights;
}

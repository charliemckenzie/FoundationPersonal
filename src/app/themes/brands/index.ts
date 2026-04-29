import type { ColorScale } from '../primitives/colors';

export interface GridConfig {
  columns: Record<'xs' | 'sm' | 'md' | 'lg' | 'xl', number>;
  gutter:  Record<'xs' | 'sm' | 'md' | 'lg' | 'xl', number>;
  margin:  Record<'xs' | 'sm' | 'md' | 'lg' | 'xl', number | 'auto'>;
  maxWidth: number;
}

export interface BrandConfig {
  name: string;
  primary: ColorScale;
  secondary: ColorScale;
  tertiary?: ColorScale;
  quaternary?: ColorScale;
  neutral: ColorScale;
  buttonBorderRadius: string | number;
  fontFamily: string;
  headingFontFamily: string;
  grid?: GridConfig;
}

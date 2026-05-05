import { qBlue, qNavy, qSkyBlue, neutral, qsuperInvestmentAllocations, qsuperAssetAllocations, sharedDiversifiedOptions, sharedAssetClassOptions } from '../primitives/colors';
import type { BrandConfig } from './index';

export const themeB: BrandConfig = {
  name: 'QSuper',
  primary: qBlue,
  secondary: qNavy,
  tertiary: qSkyBlue,
  quaternary: qSkyBlue,   // Light Blue — #8CDDFF sits at [300]
  neutral,
  buttonBorderRadius: 8,
  fontFamily: '"Open Sans", system-ui, sans-serif',
  headingFontFamily: 'Merriweather, serif',
  logos: {
    primary: '/logos/qsuper/qsuper.svg',
    secondary: '/logos/qsuper/qsuper-only.svg',
    alt: 'QSuper',
  },
  grid: {
    //           xs    sm    md    lg    xl
    columns: { xs: 4,  sm: 8,  md: 12, lg: 12, xl: 12 },
    gutter:  { xs: 16, sm: 16, md: 24, lg: 24, xl: 32 },
    margin:  { xs: 16, sm: 24, md: 32, lg: 'auto', xl: 'auto' },
    maxWidth: 1280,
  },
  investmentAllocations: qsuperInvestmentAllocations,
  assetAllocations: qsuperAssetAllocations,
  diversifiedOptions: sharedDiversifiedOptions,
  assetClassOptions: sharedAssetClassOptions,
};

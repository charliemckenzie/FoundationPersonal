import { trueBlue, deepBlue, livingCoral, neutralART, artInvestmentOptions, artAssetMix, sharedDiversifiedOptions, sharedAssetClassOptions } from '../primitives/colors';
import type { BrandConfig } from './index';

export const foundation: BrandConfig = {
  name: 'ART',
  primary: trueBlue,
  secondary: deepBlue,
  tertiary: livingCoral,
  neutral: neutralART,
  buttonBorderRadius: '9999px',
  fontFamily: '"Noto Sans", system-ui, sans-serif',
  headingFontFamily: 'Merriweather, serif',
  grid: {
    //           xs    sm    md    lg    xl
    columns: { xs: 4,  sm: 8,  md: 12, lg: 12, xl: 12 },
    gutter:  { xs: 16, sm: 16, md: 24, lg: 24, xl: 32 },
    margin:  { xs: 16, sm: 24, md: 32, lg: 'auto', xl: 'auto' },
    maxWidth: 1280,
  },
  artInvestmentOptions,
  artAssetMix,
  diversifiedOptions: sharedDiversifiedOptions,
  assetClassOptions: sharedAssetClassOptions,
};

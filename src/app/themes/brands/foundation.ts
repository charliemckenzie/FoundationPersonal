import { trueBlue, deepBlue, livingCoral, neutralART, skyBlue, clearBlue, salmon, artInvestmentOptions, artAssetMix, sharedDiversifiedOptions, sharedAssetClassOptions } from '../primitives/colors';
import type { BrandConfig } from './index';

/**
 * ART brand semantic overrides.
 *
 * Tints use the brand's heritage palette (skyBlue, clearBlue, salmon). Text and border
 * tokens use neutral steps tuned for the gray-based ART neutral scale. linkInverse
 * uses `clearBlue[100]` to sit comfortably on the trueBlue brand surface.
 */
const semanticOverrides: BrandConfig['semanticOverrides'] = {
  light: {
    tintCool:        skyBlue[200],     // #B9DCFB
    tintNeutralCool: clearBlue[100],   // #DDF5FF
    tintWarm:        salmon[50],       // #F8EBE5
    tintNeutral:     neutralART[100],  // #f2f2f2
    text: {
      primary:     neutralART[700],
      muted:       neutralART[600],
      linkInverse: clearBlue[100],     // on trueBlue brand surface
    },
    divider: neutralART[300],
    border:  { default: neutralART[300], input: neutralART[500] },
  },
  dark: {
    tintCool:        neutralART[800],  // unify all branded tints at neutral[800] in dark
    tintNeutralCool: neutralART[800],
    tintWarm:        neutralART[800],
    tintNeutral:     neutralART[800],
    text: {
      primary:     neutralART[300],
      muted:       neutralART[500],
      linkInverse: clearBlue[100],
    },
    divider: neutralART[600],
    border:  { default: neutralART[600], input: neutralART[500] },
  },
};

export const foundation: BrandConfig = {
  name: 'ART',
  primary: trueBlue,
  secondary: deepBlue,
  tertiary: livingCoral,
  neutral: neutralART,
  buttonBorderRadius: '9999px',
  fontFamily: 'var(--font-noto-sans), "Noto Sans", system-ui, sans-serif',
  headingFontFamily: 'var(--font-merriweather), Merriweather, serif',
  semanticOverrides,
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
  logos: {
    primary: '/logos/art/ART_Logo_Horizontal_Preferred_RGB.svg',
    secondary: '/logos/art/ART_Logo_2lines.svg',
    mark: '/logos/art/logo-mark.svg',
    alt: 'Australian Retirement Trust',
  },
};

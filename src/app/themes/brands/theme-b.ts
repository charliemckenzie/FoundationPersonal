import { qBlue, qNavy, qSkyBlue, neutral, qsuperInvestmentAllocations, qsuperAssetAllocations, sharedDiversifiedOptions, sharedAssetClassOptions } from '../primitives/colors';
import type { BrandConfig } from './index';

/**
 * QSuper brand semantic overrides.
 *
 * Tints use qSkyBlue for cool tones; warm/neutral tints fall back to the cooler-toned
 * blue-gray neutral scale since QSuper's palette doesn't include warm-tinted brand
 * surfaces. linkInverse uses pure white because the qBlue brand surface has lower
 * contrast against tinted blues than ART's trueBlue. Dark-mode text is brighter
 * (neutral[50]) than ART's (neutral[300]) to compensate for the lower-saturation
 * qBlue primary.
 */
const semanticOverrides: BrandConfig['semanticOverrides'] = {
  light: {
    tintCool:        qSkyBlue[100],  // light blue brand fill (was background.brandLightBlue)
    tintNeutralCool: qSkyBlue[50],   // lightest cool tint
    tintWarm:        neutral[100],   // QSuper has no warm tint — fall back to elevated neutral
    tintNeutral:     neutral[100],   // grey brand fill (was background.brandGrey)
    text: {
      primary:     neutral[700],
      muted:       neutral[600],
      linkInverse: '#ffffff',        // white on qBlue brand surface (4.8:1)
    },
    divider: neutral[300],
    border:  { default: neutral[300], input: neutral[500] },
  },
  dark: {
    tintCool:        neutral[800],
    tintNeutralCool: neutral[800],
    tintWarm:        neutral[800],
    tintNeutral:     neutral[800],
    text: {
      primary:     neutral[50],       // brighter than ART (neutral[300]) — qBlue is lower-contrast
      muted:       neutral[300],
      linkInverse: '#ffffff',
    },
    divider: neutral[700],
    border:  { default: neutral[700], input: neutral[400] },
  },
};

export const themeB: BrandConfig = {
  name: 'QSuper',
  primary: qBlue,
  secondary: qNavy,
  tertiary: qSkyBlue,
  quaternary: qSkyBlue,   // Light Blue — #8CDDFF sits at [300]
  neutral,
  buttonBorderRadius: 8,
  fontFamily: 'var(--font-open-sans), "Open Sans", system-ui, sans-serif',
  headingFontFamily: 'Effra, sans-serif',
  semanticOverrides,
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

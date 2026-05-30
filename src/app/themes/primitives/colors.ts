export const white = '#ffffff';
export const black = '#000000';

export interface ColorScale {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
  950: string;
}

/** Red — error/danger feedback (fixed across brands) */
export const red: ColorScale = {
  50:  '#FCEBED',
  100: '#F9DEE1',
  200: '#F9B3BA',
  300: '#F98994',
  400: '#F53B4D',
  500: '#E83849',
  600: '#DC3545',
  700: '#9A2531',
  800: '#58151C',
  900: '#3E1419',
  950: '#2A1013',
};

/** Blue-gray neutral — backgrounds, text, borders, surfaces */
export const neutral: ColorScale = {
  50:  '#F3F5F6',
  100: '#F0F2F4',
  200: '#E1E5EA',
  300: '#C5CDD8',
  400: '#A0A7B2',
  500: '#7B818C',
  600: '#565B66',
  700: '#303741',
  800: '#20262E',
  900: '#14191E',
  950: '#0C1013',
};

/** Neutral ART — pure gray neutral scale for ART */
export const neutralART: ColorScale = {
  50:  '#f5f5f5',
  100: '#f2f2f2',
  200: '#e8e8e8',
  300: '#dadada',
  400: '#b8b8b8',
  500: '#939393',
  600: '#6e6e6e',
  700: '#4d4d4d',  // was #333333 — lightened to even out the 600→700 step (~13 L* vs prior 24 L*)
  800: '#333333',  // was #292929 — spreads the previously compressed dark range
  900: '#1f1f1f',  // was #1f1f1f — spreads the previously compressed dark range
  950: '#121212',  // was #121212 — slight spread
};

/** Blue — default primary brand color */
export const blue: ColorScale = {
  50:  '#eff6ff',
  100: '#dbeafe',
  200: '#bfdbfe',
  300: '#93c5fd',
  400: '#60a5fa',
  500: '#3b82f6',
  600: '#2563eb',
  700: '#1d4ed8',
  800: '#1e40af',
  900: '#1e3a8a',
  950: '#172554',
};

/** True Blue — electric blue scale based on #0051ff */
export const trueBlue: ColorScale = {
  50:  '#e5eeff',
  100: '#c2d7ff',
  200: '#8fb6ff',
  300: '#75a1ff',
  400: '#5c8fff',
  500: '#427eff',
  600: '#0051ff',
  700: '#003cbd',
  800: '#002f94',
  900: '#06256a',
  950: '#030917',
};

/** Q Blue — professional blue scale based on #0079d0 */
export const qBlue: ColorScale = {
  50:  '#e8f4fb',
  100: '#d1e9f7',
  200: '#a3d3ef',
  300: '#75bde7',
  400: '#47a7df',
  500: '#1991d7',
  600: '#0079d0',
  700: '#0061a6',
  800: '#00497d',
  900: '#003154',
  950: '#00182a',
};

/** Violet — default secondary brand color */
export const violet: ColorScale = {
  50:  '#f5f3ff',
  100: '#ede9fe',
  200: '#ddd6fe',
  300: '#c4b5fd',
  400: '#a78bfa',
  500: '#8b5cf6',
  600: '#7c3aed',
  700: '#6d28d9',
  800: '#5b21b6',
  900: '#4c1d95',
  950: '#2e1065',
};

/** Green — success feedback (fixed across brands) */
export const green: ColorScale = {
  50:  '#EDF6F2',
  100: '#DAECE3',
  200: '#AFDBC2',
  300: '#5EBD90',
  400: '#19A061',
  500: '#199357',
  600: '#198754',
  700: '#177A4B',
  800: '#146C43',
  900: '#0F3524',
  950: '#0C241A',
};

/** Amber — warning feedback (fixed across brands) */
export const amber: ColorScale = {
  50:  '#FFF9E7',
  100: '#FFEFC1',
  200: '#FFEAA0',
  300: '#FFE186',
  400: '#FFD968',
  500: '#FFCA40',
  600: '#FFC107',
  700: '#997003',
  800: '#664D03',
  900: '#40361A',
  950: '#262110',
};

/** Cyan — info feedback (fixed across brands) */
export const cyan: ColorScale = {
  50:  '#ecfeff',
  100: '#cffafe',
  200: '#a5f3fc',
  300: '#67e8f9',
  400: '#22d3ee',
  500: '#06b6d4',
  600: '#0891b2',
  700: '#0e7490',
  800: '#155e75',
  900: '#164e63',
  950: '#083344',
};

/** Deep Blue — Foundation secondary brand color, anchored on #1C355E */
export const deepBlue: ColorScale = {
  50:  '#eef4fb',
  100: '#d4e5f5',
  200: '#a9cbed',
  300: '#7eb1e5',
  400: '#5397da',
  500: '#2e7dcc',
  600: '#2464a8',
  700: '#1c4d85',
  800: '#1c355e',
  900: '#13243e',
  950: '#0b1527',
};

/** Living Coral — Foundation tertiary brand color, anchored on #F24E49 */
export const livingCoral: ColorScale = {
  50:  '#fff2f2',
  100: '#ffe3e2',
  200: '#fdc7c5',
  300: '#fca8a5',
  400: '#f97b77',
  500: '#f24e49',
  600: '#d93937',
  700: '#b52d2a',
  800: '#8f2220',
  900: '#681917',
  950: '#420f0e',
};

/** Purple — Theme B primary brand color */
export const purple: ColorScale = {
  50:  '#faf5ff',
  100: '#f3e8ff',
  200: '#e9d5ff',
  300: '#d8b4fe',
  400: '#c084fc',
  500: '#a855f7',
  600: '#9333ea',
  700: '#7e22ce',
  800: '#6b21a8',
  900: '#581c87',
  950: '#3b0764',
};

/** Pink — Theme B secondary brand color */
export const pink: ColorScale = {
  50:  '#fdf2f8',
  100: '#fce7f3',
  200: '#fbcfe8',
  300: '#f9a8d4',
  400: '#f472b6',
  500: '#ec4899',
  600: '#db2777',
  700: '#be185d',
  800: '#9d174d',
  900: '#831843',
  950: '#500724',
};

/** Sky Blue — light clear sky blue, anchored on #B9DCFB */
export const skyBlue: ColorScale = {
  50:  '#f0f8fe',
  100: '#daedfb',
  200: '#B9DCFB',
  300: '#8dc5f8',
  400: '#58a9f3',
  500: '#2b8fe8',
  600: '#1a74cc',
  700: '#135ba8',
  800: '#0d4485',
  900: '#082e5c',
  950: '#041730',
};

/** Clear Blue — very pale sky blue, anchored on #DDF5FF */
export const clearBlue: ColorScale = {
  50:  '#f4fbff',
  100: '#DDF5FF',
  200: '#b8eaff',
  300: '#85d6ff',
  400: '#4dbeff',
  500: '#1aa4f5',
  600: '#0086d6',
  700: '#006aad',
  800: '#004e82',
  900: '#003457',
  950: '#001a2c',
};

/** Salmon — warm light blush, anchored on #F8EBE5 */
export const salmon: ColorScale = {
  50:  '#F8EBE5',
  100: '#f2d4c7',
  200: '#e8b5a0',
  300: '#dc9278',
  400: '#cc7055',
  500: '#b85238',
  600: '#9a3d28',
  700: '#7c2c1c',
  800: '#5e1e12',
  900: '#3e120b',
  950: '#200706',
};

/** Q Navy — QSuper secondary brand colour, anchored on #151F6D */
export const qNavy: ColorScale = {
  50:  '#eaecf5',
  100: '#c6cbea',
  200: '#9da6d8',
  300: '#7381c6',
  400: '#4f60b4',
  500: '#3347a2',
  600: '#243490',
  700: '#1a267e',
  800: '#151F6D',
  900: '#0e1550',
  950: '#070b33',
};

/** Q Sky Blue — QSuper tertiary brand colour, anchored on #30B3EE; Light Blue (#8CDDFF) sits at 300 */
export const qSkyBlue: ColorScale = {
  50:  '#edf8fd',
  100: '#d0eefb',
  200: '#a9def7',
  300: '#8CDDFF',
  400: '#59caef',
  500: '#30B3EE',
  600: '#1595cc',
  700: '#1077a3',
  800: '#0c587a',
  900: '#073a51',
  950: '#031d28',
};

/** Sand — warm light cream, anchored on #FDF4E8 */
export const sand: ColorScale = {
  50:  '#FDF4E8',
  100: '#fae3c5',
  200: '#f5cc97',
  300: '#edaf62',
  400: '#e09035',
  500: '#ca741a',
  600: '#a85c10',
  700: '#85450a',
  800: '#623106',
  900: '#3e1e03',
  950: '#1e0f01',
};

/**
 * QSuper Investment Allocation colours — fixed single values, not scales.
 * Use only for data visualisation representing QSuper investment options.
 * Effective from 1 July 2024.
 */
/**
 * QSuper Asset Class Allocation colours — fixed single values, not scales.
 * Use only for data visualisation representing QSuper asset class allocations.
 * Effective from 1 July 2024.
 */
export const qsuperAssetAllocations = {
  australianSharesIndex:            '#650D0C',
  internationalSharesHedgedIndex:   '#FFCC65',
  internationalSharesUnhedgedIndex: '#FF5527',
  listedPropertyIndex:              '#947ACB',
  unlistedAssets:                   '#66D6C5',
  bondsIndex:                       '#CAD83D',
  cash:                             '#199393',
} as const;

export type QSuperAssetAllocationKey = keyof typeof qsuperAssetAllocations;

/**
 * Shared Asset Class Option colours — fixed single values, available to both ART and QSuper.
 * Same values as qsuperAssetAllocations. Use for data visualisation of asset class allocations.
 * Effective from 1 July 2024.
 */
export const sharedAssetClassOptions = qsuperAssetAllocations;
export type SharedAssetClassOptionKey = keyof typeof sharedAssetClassOptions;

/**
 * ART Investment Option colours — fixed single values, not scales.
 * Use only for data visualisation representing ART investment options.
 * Effective from 1 July 2024.
 */
export const artInvestmentOptions = {
  lifecycleHighGrowthPool:      '#A1D0F9',
  lifecycleBalancedPool:        '#0051FF',
  lifecycleCashPool:            '#1C355E',
  highGrowth:                   '#B42026',
  balanced:                     '#E69927',
  sociallyConsciousBalanced:    '#1AB257',
  highGrowthIndex:              '#EE147D',
  balancedIndex:                '#964298',
  conservativeBalanced:         '#28AAEE',
  balancedRiskAdjusted:         '#224F24',
  conservative:                 '#3B4CA4',
} as const;

export type ARTInvestmentOptionKey = keyof typeof artInvestmentOptions;

/**
 * ART Asset Mix colours — fixed single values, not scales.
 * Use only for data visualisation representing ART asset mix allocations.
 * Effective from 1 July 2024.
 */
export const artAssetMix = {
  australianShares:                '#69259B',
  internationalShares:             '#FFBF2F',
  unlistedAssetsAndAlternatives:   '#CF4A9B',
  fixedIncome:                     '#89C86B',
  cash:                            '#1C355E',
} as const;

export type ARTAssetMixKey = keyof typeof artAssetMix;

/**
 * Shared Diversified Option colours — fixed single values, available to both ART and QSuper.
 * Use for data visualisation of diversified investment options.
 * Effective from 1 July 2024.
 */
export const sharedDiversifiedOptions = {
  highGrowthIndex:           '#EE147D',
  highGrowth:                '#B42026',
  balancedIndex:             '#964298',
  balanced:                  '#E69927',
  sociallyConsciousBalanced: '#1AB257',
  balancedRiskAdjusted:      '#224F24',
  conservativeBalanced:      '#28AAEE',
  conservative:              '#3B4CA4',
} as const;

export type SharedDiversifiedOptionKey = keyof typeof sharedDiversifiedOptions;

/**
 * QSuper Investment Allocation colours — fixed single values, not scales.
 * Use only for data visualisation representing QSuper investment options.
 * Effective from 1 July 2024.
 */
export const qsuperInvestmentAllocations = {
  lifetime: '#0079D0',
  outlook:  '#009247',
  aspire1:  '#F48220',
  aspire2:  '#86441E',
  focus1:   '#CF2128',
  focus2:   '#BB2980',
  focus3:   '#831A54',
  sustain1: '#7BDEEE',
  sustain2: '#22B1C7',
  sustain3: '#15657C',
} as const;

export type QSuperInvestmentAllocationKey = keyof typeof qsuperInvestmentAllocations;

export const primitiveScales = {
  neutral,
  neutralART,
  blue,
  trueBlue,
  qBlue,
  qNavy,
  qSkyBlue,
  deepBlue,
  livingCoral,
  violet,
  purple,
  pink,
  skyBlue,
  clearBlue,
  salmon,
  sand,
  green,
  red,
  amber,
  cyan,
} as const;

export type PrimitiveScaleName = keyof typeof primitiveScales;

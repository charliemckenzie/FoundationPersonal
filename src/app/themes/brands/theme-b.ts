import { qSuperBlue, qSuperNavy, qSuperNeutral } from '../primitives/colors';
import type { BrandConfig } from './index';

export const themeB: BrandConfig = {
  name: 'theme-b',
  primary:   qSuperBlue,
  secondary: qSuperNavy,
  neutral:   qSuperNeutral,
  buttonBorderRadius: 8,
  surfaces: {
    brandPrimary: '#0084DD',  // QSuper Blue — hero/section backgrounds (large text only, 3.9:1)
    sky:          '#30B3EE',  // QSuper Sky Blue — secondary colour
    clear:        '#8CDDFF',  // QSuper Light Blue — secondary colour
    warm:         '#eceef9',  // soft navy tint — no direct brand equivalent
  },
  highlights: {
    watermelon:  '#C63663',
    orange:      '#FFA06A',
    lightYellow: '#F0E87B',
    orchid:      '#BB29BB',
    purple:      '#642667',
    teal:        '#2DCCD3',
  },
  grid: {
    //           xs    sm    md    lg    xl
    columns: { xs: 4,  sm: 8,  md: 12, lg: 12, xl: 12 },
    gutter:  { xs: 16, sm: 16, md: 24, lg: 24, xl: 32 },
    margin:  { xs: 16, sm: 24, md: 32, lg: 'auto', xl: 'auto' },
    maxWidth: 1280,
  },
};

import { trueBlue, deepBlue, livingCoral, neutral } from '../primitives/colors';
import type { BrandConfig } from './index';

export const foundation: BrandConfig = {
  name: 'ART',
  primary: trueBlue,
  secondary: deepBlue,
  tertiary: livingCoral,
  neutral,
  buttonBorderRadius: '9999px',
  fontFamily: '"Noto Sans", system-ui, sans-serif',
  headingFontFamily: 'Merriweather, serif',
};

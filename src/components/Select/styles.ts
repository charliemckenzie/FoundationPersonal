import type { Theme } from '@mui/material/styles';
import { buildInputStyles } from '../inputs/variantStyles';
import type { SelectSize } from './types';

const CONDENSED_REDUCTION = 0.25; // rem = 4px

function selectPadding(size: SelectSize, condensed: boolean): string {
  const base = size === 'small' ? 0.5 : 0.75;
  return `${base - (condensed ? CONDENSED_REDUCTION / 2 : 0)}rem`;
}

export function buildSelectSx(size: SelectSize, condensed: boolean) {
  return (t: Theme) => ({
    ...buildInputStyles(t),
    minHeight: size === 'small'
      ? `${2.5 - (condensed ? CONDENSED_REDUCTION : 0)}rem`
      : `${3 - (condensed ? CONDENSED_REDUCTION : 0)}rem`,
    fontSize: t.typography.body.fontSize,
    '& div.MuiSelect-select': {
      lineHeight: 1.5,
      paddingTop: selectPadding(size, condensed),
      paddingBottom: selectPadding(size, condensed),
    },
    '&& select.MuiInputBase-input': {
      paddingTop: selectPadding(size, condensed),
      paddingBottom: selectPadding(size, condensed),
    },
  });
}

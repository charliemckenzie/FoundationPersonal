import type { Theme } from '@mui/material/styles';
import { buildInputStyles } from '../inputs/variantStyles';
import { validateEmail, validatePhone } from '../inputs/validation';
import type { TextFieldSize, TextFieldType } from './types';

export const CONDENSED_REDUCTION = 0.25; // rem = 4px

// Format validators run automatically on blur for these input types.
export const FORMAT_VALIDATORS: Partial<Record<TextFieldType, (value: string) => string | null>> = {
  email: validateEmail,
  tel: validatePhone,
};

interface InputSxConfig {
  size: TextFieldSize;
  condensed: boolean;
  multiline: boolean;
  hasLabel: boolean;
  borderless?: boolean;
  success?: boolean;
  error?: boolean;
}

export function buildFieldInputSx(config: InputSxConfig) {
  return (theme: Theme) => ({
    ...buildInputStyles(theme),
    ...(config.borderless && {
      border: 'none',
      '& fieldset': { border: 'none' },
      '&.Mui-focused': { outline: 'none' },
    }),
    ...(!config.borderless && config.success && !config.error && {
      '& fieldset': { borderColor: 'success.main' },
      '&:hover:not(.Mui-focused):not(.Mui-disabled) fieldset': { borderColor: 'success.main' },
      '&&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'success.main' },
    }),
    '& .MuiInputBase-input': { lineHeight: 1.5, ...(!config.multiline && { height: '1.5em' }) },
    ...(!config.borderless && { '& .MuiInputBase-input[type="date"]::-webkit-date-and-time-value': { minHeight: '1.5em' } }),
    ...(!config.hasLabel && {
      '& .MuiInputBase-input::placeholder': { color: 'text.muted', opacity: 1 },
    }),
    minHeight: config.size === 'small'
      ? `${2.5 - (config.condensed ? CONDENSED_REDUCTION : 0)}rem`
      : `${3 - (config.condensed ? CONDENSED_REDUCTION : 0)}rem`,
    typography: 'body',
    '& .MuiInputAdornment-root': { alignSelf: 'stretch', alignItems: 'center', maxHeight: 'none' },
    ...(!config.multiline && {
      '& .MuiOutlinedInput-input': {
        paddingTop: config.size === 'small'
          ? `${0.5 - (config.condensed ? CONDENSED_REDUCTION / 2 : 0)}rem`
          : `${0.75 - (config.condensed ? CONDENSED_REDUCTION / 2 : 0)}rem`,
        paddingBottom: config.size === 'small'
          ? `${0.5 - (config.condensed ? CONDENSED_REDUCTION / 2 : 0)}rem`
          : `${0.75 - (config.condensed ? CONDENSED_REDUCTION / 2 : 0)}rem`,
      },
    }),
  });
}

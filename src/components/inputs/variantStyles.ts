import { alpha, type Theme } from '@mui/material/styles';
import { TINT } from '../../app/themes/semantic';

/** Soft background for unselected icon circles in card labels. Static fill only — no hover. */
export function selectedSoftBg(theme: Theme): string {
  return theme.palette.primary.softMain ?? alpha(theme.palette.primary.main, TINT.main[theme.palette.mode as 'light' | 'dark']);
}

/**
 * Full soft-interaction styles for selected boxed/card states.
 * Resting → softMain, hover → softDark, active → softDeeper.
 * Mirrors the soft Button variant so every selected surface moves together.
 * Used by Checkbox and RadioGroup boxed/card variants.
 */
export function selectedCardStyles(theme: Theme) {
  const mode = theme.palette.mode as 'light' | 'dark';
  return {
    backgroundColor: theme.palette.primary.softMain ?? alpha(theme.palette.primary.main, TINT.main[mode]),
    '&:hover': {
      backgroundColor: theme.palette.primary.softDark ?? alpha(theme.palette.primary.main, TINT.dark[mode]),
    },
    '&:active': {
      backgroundColor: theme.palette.primary.softDeeper ?? alpha(theme.palette.primary.main, TINT.deeper[mode]),
    },
  };
}

/**
 * Shared chrome for outlined-input wrappers — border, focus ring, disabled state.
 * Used by TextField, Autocomplete, and Select to keep their visual treatment in lockstep.
 * Pair with per-component size, padding, and inner-element rules.
 */
export function buildInputStyles(theme: Theme) {
  return {
    borderRadius: `${theme.shape.sm}px`,
    backgroundColor: theme.palette.background.paper,
    '&.Mui-disabled': {
      backgroundColor: alpha(theme.palette.background.default, 0.6),
    },
    '&&.Mui-disabled fieldset': {
      borderColor: alpha(theme.palette.border.input, 0.6),
    },
    '& fieldset': {
      borderColor: theme.palette.border.input,
      borderRadius: `${theme.shape.sm}px`,
    },
    '&:hover:not(.Mui-focused):not(.Mui-error):not(.Mui-disabled) fieldset': {
      borderColor: theme.palette.border.input,
    },
    '&.Mui-focused': {
      outline: `2px solid ${theme.palette.border.focus}`,
      outlineOffset: '2px',
    },
    '&&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderWidth: '1px',
      borderColor: theme.palette.border.input,
    },
    '&&.Mui-focused.Mui-error .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.error.main,
    },
  };
}

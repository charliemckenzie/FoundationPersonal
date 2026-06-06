import { alpha, type Theme } from '@mui/material/styles';

/**
 * Soft-selected background for selectable card / boxed states.
 * Returns `primary.softMain` (TINT scale in themes/semantic.ts) — the same
 * base fill used by soft buttons, so every selected card surface moves together.
 * Used by Checkbox and RadioGroup boxed/card variants.
 */
export function selectedSoftBg(theme: Theme): string {
  return theme.palette.primary.softMain!;
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

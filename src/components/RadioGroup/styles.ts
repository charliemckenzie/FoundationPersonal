import type { Theme } from '@mui/material/styles';
import { selectedCardStyles } from '../inputs/variantStyles';

export const cardContainerSx = (args: {
  variant: 'boxed' | 'card';
  cardDirection: 'column' | 'row';
  direction: 'column' | 'row';
  description: boolean;
  isSelected: boolean;
  isItemDisabled: boolean;
}) => (theme: Theme) => ({
  ml: 0,
  mr: 0,
  gap: args.variant === 'card' ? 0 : 1.25,
  position: 'relative' as const,
  // Column cards top-align so a wrapping label in one card doesn't push its icon
  // out of line with the others when cards stretch to equal height in a row.
  alignItems:
    args.variant === 'card'
      ? args.cardDirection === 'column'
        ? 'flex-start'
        : 'center'
      : args.description
      ? 'flex-start'
      : 'center',
  justifyContent: args.variant === 'card' && args.cardDirection === 'column' ? 'center' : undefined,
  '& .MuiFormControlLabel-label': args.variant === 'card' ? { flex: 1, display: 'flex', justifyContent: 'center' } : undefined,
  border: '1px solid',
  borderColor: args.isSelected ? 'primary.main' : 'border.input',
  borderRadius: '0.5rem',
  minHeight: '3rem',
  minWidth: args.variant === 'card' && args.cardDirection === 'column' ? '9rem' : undefined,
  width: args.direction === 'column' ? '100%' : undefined,
  flex: args.direction === 'row' ? 1 : undefined,
  px: 2,
  ...(args.variant === 'boxed' && { pr: '1.25rem' }),
  py: args.variant === 'card' || args.description ? 2 : 0,
  cursor: args.isItemDisabled ? 'default' : 'pointer',
  transition: 'border-color 150ms ease, background-color 150ms ease, box-shadow 150ms ease',
  backgroundColor: 'background.paper',
  ...(args.isSelected && {
    ...selectedCardStyles(theme),
    // Inset shadow gives visual weight of a 2px border without changing box model.
    // Non-colour differentiator (thickness) between selected and unselected, no layout shift.
    boxShadow: `inset 0 0 0 1px ${theme.palette.primary.main}`,
  }),
  ...(!args.isItemDisabled && !args.isSelected && { '&:hover': { backgroundColor: 'action.hover' } }),
  '&:has(.Mui-focusVisible)': { outline: '2px solid', outlineColor: 'border.focus', outlineOffset: '2px' },
  '& .MuiRadio-root.Mui-focusVisible': { outline: 'none' },
});

export const cardRadioSx = {
  position: 'absolute' as const,
  width: '1px',
  height: '1px',
  opacity: 0,
  p: 0,
  m: 0,
  overflow: 'hidden',
  '&.Mui-focusVisible': { outline: 'none' },
};

export const defaultRadioSx = {
  p: 0,
  WebkitTapHighlightColor: 'transparent',
  '&:hover, &:active': { backgroundColor: 'transparent' },
};

export const buttonContainerSx = (args: {
  isSelected: boolean;
  isItemDisabled: boolean;
}) => (theme: Theme) => ({
  ml: 0,
  mr: 0,
  gap: 0,
  alignItems: 'center',
  border: '1px solid',
  borderColor: args.isSelected ? 'primary.main' : 'border.input',
  borderRadius: `${theme.shape.sm}px`,
  height: '3rem',
  px: 2,
  cursor: args.isItemDisabled ? 'default' : 'pointer',
  transition: 'border-color 150ms ease, background-color 150ms ease, box-shadow 150ms ease',
  backgroundColor: 'background.paper',
  ...(args.isSelected && {
    ...selectedCardStyles(theme),
    boxShadow: `inset 0 0 0 1px ${theme.palette.primary.main}`,
  }),
  ...(!args.isItemDisabled && !args.isSelected && { '&:hover': { backgroundColor: 'action.hover' } }),
  '&:has(.Mui-focusVisible)': { outline: '2px solid', outlineColor: 'border.focus', outlineOffset: '2px' },
  '& .MuiRadio-root.Mui-focusVisible': { outline: 'none' },
  '& .MuiFormControlLabel-label': { typography: 'body', lineHeight: 1 },
});

import { type Theme } from '@mui/material/styles';
import { selectedCardStyles } from '../inputs/variantStyles';
import type { CheckboxVariant } from './types';

interface ContainerSxArgs {
  variant: CheckboxVariant;
  isButton: boolean;
  isBoxedOrCard: boolean;
  isSelected: boolean;
  error: boolean;
  disabled: boolean;
  description: boolean;
  cardDirection: 'column' | 'row';
}

export function buildContainerSx(args: ContainerSxArgs) {
  const { variant, isButton, isBoxedOrCard, isSelected, error, disabled, description, cardDirection } = args;

  if (isButton) {
    return (theme: Theme) => ({
      ml: 0,
      mr: 0,
      gap: 0,
      alignItems: 'center',
      border: '1px solid',
      borderColor: isSelected ? 'primary.main' : error ? 'error.main' : 'border.input',
      borderRadius: `${theme.shape.sm}px`,
      height: '3rem',
      px: 2,
      cursor: disabled ? 'default' : 'pointer',
      transition: 'border-color 150ms ease, background-color 150ms ease, box-shadow 150ms ease',
      backgroundColor: 'background.paper',
      ...(isSelected && {
        ...selectedCardStyles(theme),
        boxShadow: `inset 0 0 0 1px ${theme.palette.primary.main}`,
      }),
      ...(!disabled && !isSelected && { '&:hover': { backgroundColor: 'action.hover' } }),
      '&:has(.Mui-focusVisible)': { outline: '2px solid', outlineColor: 'border.focus', outlineOffset: '2px' },
      '& .MuiCheckbox-root.Mui-focusVisible': { outline: 'none' },
      '& .MuiFormControlLabel-label': { typography: 'body', lineHeight: 1 },
    });
  }

  if (isBoxedOrCard) {
    return (theme: Theme) => ({
      ml: 0,
      gap: variant === 'card' ? 0 : 1.25,
      position: 'relative' as const,
      alignItems: variant === 'card' ? 'center' : description ? 'flex-start' : 'center',
      justifyContent: variant === 'card' && cardDirection === 'column' ? 'center' : undefined,
      '& .MuiFormControlLabel-label': variant === 'card' ? { flex: 1, display: 'flex', justifyContent: 'center' } : undefined,
      border: '1px solid',
      borderColor: isSelected ? 'primary.main' : error ? 'error.main' : 'border.input',
      borderRadius: '0.5rem',
      minHeight: '3rem',
      minWidth: variant === 'card' && cardDirection === 'column' ? '9rem' : undefined,
      px: 2,
      ...(variant === 'boxed' && { pr: '1.25rem' }),
      ...(variant === 'card' && cardDirection === 'row' && { pr: '2.5rem' }),
      py: variant === 'card' ? 2 : description ? 1.5 : 0,
      cursor: disabled ? 'default' : 'pointer',
      transition: 'border-color 150ms ease, background-color 150ms ease, box-shadow 150ms ease',
      backgroundColor: 'background.paper',
      ...(isSelected && {
        ...selectedCardStyles(theme),
        // Inset shadow gives visual weight of a 2px border without changing box model.
        // Non-colour differentiator (thickness) between selected and unselected, no layout shift.
        boxShadow: `inset 0 0 0 1px ${theme.palette.primary.main}`,
      }),
      ...(!disabled && !isSelected && { '&:hover': { backgroundColor: 'action.hover' } }),
      '&:has(.Mui-focusVisible)': { outline: '2px solid', outlineColor: 'border.focus', outlineOffset: '2px' },
      '& .MuiCheckbox-root.Mui-focusVisible': { outline: 'none' },
    });
  }

  return { ml: 0, gap: 1.25, alignItems: 'flex-start' };
}

export function buildCheckboxSx(variant: CheckboxVariant) {
  return variant === 'card' || variant === 'button'
    ? {
        position: 'absolute' as const,
        width: '1px',
        height: '1px',
        opacity: 0,
        p: 0,
        m: 0,
        overflow: 'hidden',
        '&:hover, &:active': { backgroundColor: 'transparent' },
        '&.Mui-focusVisible': { outline: 'none' },
      }
    : { p: 0, WebkitTapHighlightColor: 'transparent', '&:hover, &:active': { backgroundColor: 'transparent' } };
}

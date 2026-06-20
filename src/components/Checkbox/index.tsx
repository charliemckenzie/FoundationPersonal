import React, { useId } from 'react';
import MuiCheckbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import { type Theme } from '@mui/material/styles';
import { selectedCardStyles } from '../inputs/variantStyles';
import { CheckboxUncheckedIcon, CheckboxIndeterminateIcon, CheckboxCheckedIcon } from './icons';
import { CheckboxCardLabel } from './CheckboxCardLabel';

export type CheckboxVariant = 'default' | 'boxed' | 'card' | 'button';
export type CheckboxColor = 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success' | 'default';
export type CheckboxSize = 'small' | 'medium';
export type LabelPlacement = 'end' | 'start' | 'top' | 'bottom';

export interface CheckboxProps {
  label: string;
  description?: string;
  variant?: CheckboxVariant;
  icon?: string;
  cardDirection?: 'column' | 'row';
  checked?: boolean;
  defaultChecked?: boolean;
  indeterminate?: boolean;
  color?: CheckboxColor;
  size?: CheckboxSize;
  labelPlacement?: LabelPlacement;
  helperText?: React.ReactNode;
  /**
   * Where the helper text renders relative to the control.
   * `'bottom'` (default) keeps it below the checkbox; `'top'` renders it above the
   * checkbox row, in DOM order before the control — useful for descriptive guidance
   * the member should read before ticking the box.
   */
  helperTextPosition?: 'top' | 'bottom';
  errorMessage?: string;
  error?: boolean;
  disabled?: boolean;
  required?: boolean;
  onChange?: (checked: boolean) => void;
  id?: string;
  name?: string;
}

function renderLabelContent(args: {
  label: string;
  description?: string;
  variant: CheckboxVariant;
  icon?: string;
  cardDirection: 'column' | 'row';
  isSelected: boolean;
  disabled: boolean;
}): React.ReactNode {
  const { label, description, variant, icon, cardDirection, isSelected, disabled } = args;
  if (variant === 'card') {
    return (
      <CheckboxCardLabel
        label={label}
        description={description}
        icon={icon}
        cardDirection={cardDirection}
        isSelected={isSelected}
        disabled={disabled}
      />
    );
  }
  if (description) {
    return (
      <Box component="span" sx={{ display: 'flex', flexDirection: 'column' }}>
        {label}
        <Box component="span" sx={{ display: 'block', fontSize: (t: Theme) => t.typography.small.fontSize, color: disabled ? 'text.disabled' : isSelected ? 'text.primary' : 'text.muted', lineHeight: 1.4 }}>
          {description}
        </Box>
      </Box>
    );
  }
  return label;
}

export function Checkbox({
  label,
  description,
  variant = 'default',
  icon,
  cardDirection = 'column',
  checked,
  defaultChecked,
  indeterminate = false,
  color = 'primary',
  size = 'medium',
  labelPlacement = 'end',
  helperText,
  helperTextPosition = 'bottom',
  errorMessage,
  error = false,
  disabled = false,
  required = false,
  onChange,
  id,
  name,
}: CheckboxProps) {
  const generatedId = useId();
  const checkboxId = id ?? generatedId;
  const errorId = error && errorMessage ? `${checkboxId}-error` : undefined;
  const helperId = helperText ? `${checkboxId}-helper-text` : undefined;
  const describedBy = [errorId, helperId].filter(Boolean).join(' ') || undefined;

  const [internalChecked, setInternalChecked] = React.useState(defaultChecked ?? false);
  const resolvedChecked = checked !== undefined ? checked : internalChecked;
  const isBoxedOrCard = variant === 'boxed' || variant === 'card';
  const isButton = variant === 'button';
  const isSelected = (isBoxedOrCard || isButton) && resolvedChecked;

  const handleChange = (_e: React.ChangeEvent<HTMLInputElement>, isChecked: boolean) => {
    if (checked === undefined) setInternalChecked(isChecked);
    onChange?.(isChecked);
  };

  const containerSx = isButton
    ? (theme: Theme) => ({
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
      })
    : isBoxedOrCard
    ? (theme: Theme) => ({
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
      })
    : { ml: 0, gap: 1.25, alignItems: 'flex-start' };

  const checkboxSx =
    variant === 'card' || variant === 'button'
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

  // Single helper-text node reused for both positions so the id (and therefore the
  // aria-describedby link) stays identical whether it renders above or below the control.
  const helperNode = helperText ? (
    <FormHelperText
      id={helperId}
      error={errorMessage ? false : undefined}
      role={error && !errorMessage ? 'alert' : undefined}
      sx={{ ml: 0, ...(helperTextPosition === 'top' && { mt: 0, mb: 2 }) }}
    >
      {helperText}
    </FormHelperText>
  ) : null;

  return (
    <FormControl error={error} disabled={disabled} required={required}>
      {helperTextPosition === 'top' && helperNode}
      <FormControlLabel
        labelPlacement={labelPlacement}
        label={renderLabelContent({ label, description, variant, icon, cardDirection, isSelected, disabled })}
        sx={containerSx}
        control={
          <MuiCheckbox
            checked={checked}
            defaultChecked={defaultChecked}
            indeterminate={indeterminate}
            color={color}
            size={size}
            id={checkboxId}
            name={name}
            slotProps={{ input: { 'aria-invalid': error ? true : undefined, 'aria-describedby': describedBy } }}
            disableRipple
            icon={(variant === 'card' || variant === 'button') ? undefined : <CheckboxUncheckedIcon error={error} disabled={disabled} />}
            checkedIcon={(variant === 'card' || variant === 'button') ? undefined : <CheckboxCheckedIcon />}
            indeterminateIcon={(variant === 'card' || variant === 'button') ? undefined : <CheckboxIndeterminateIcon />}
            onChange={handleChange}
            sx={checkboxSx}
          />
        }
      />
      {helperTextPosition === 'bottom' && helperNode}
      {error && errorMessage && (
        <FormHelperText error role="alert" id={errorId} sx={{ ml: 0, mt: 0 }}>
          {errorMessage}
        </FormHelperText>
      )}
    </FormControl>
  );
}

import React from 'react';
import MuiCheckbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import { type Theme } from '@mui/material/styles';
import { selectedSoftBg } from '../inputs/variantStyles';
import { CheckboxUncheckedIcon, CheckboxIndeterminateIcon, CheckboxCheckedIcon } from './icons';
import { CheckboxCardLabel } from './CheckboxCardLabel';

export type CheckboxVariant = 'default' | 'boxed' | 'card';
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
  helperText?: string;
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
  errorMessage,
  error = false,
  disabled = false,
  required = false,
  onChange,
  id,
  name,
}: CheckboxProps) {
  const [internalChecked, setInternalChecked] = React.useState(defaultChecked ?? false);
  const resolvedChecked = checked !== undefined ? checked : internalChecked;
  const isBoxedOrCard = variant === 'boxed' || variant === 'card';
  const isSelected = isBoxedOrCard && resolvedChecked;

  const handleChange = (_e: React.ChangeEvent<HTMLInputElement>, isChecked: boolean) => {
    if (checked === undefined) setInternalChecked(isChecked);
    onChange?.(isChecked);
  };

  const containerSx = isBoxedOrCard
    ? (theme: Theme) => ({
        ml: 0,
        gap: variant === 'card' ? 0 : 1.25,
        position: 'relative' as const,
        alignItems: variant === 'card' ? 'center' : description ? 'flex-start' : 'center',
        justifyContent: variant === 'card' && cardDirection === 'column' ? 'center' : undefined,
        '& .MuiFormControlLabel-label': variant === 'card' ? { flex: 1, display: 'flex', justifyContent: 'center' } : undefined,
        border: '1px solid',
        borderColor: isSelected ? 'primary.main' : error ? 'error.main' : 'border.default',
        borderRadius: '0.5rem',
        minHeight: '3rem',
        minWidth: variant === 'card' && cardDirection === 'column' ? '9rem' : undefined,
        px: 2,
        ...(variant === 'boxed' && { pr: '1.25rem' }),
        ...(variant === 'card' && cardDirection === 'row' && { pr: '2.5rem' }),
        py: variant === 'card' ? 2 : description ? 1.5 : 0,
        cursor: disabled ? 'default' : 'pointer',
        transition: 'border-color 150ms ease, background-color 150ms ease',
        backgroundColor: 'background.paper',
        ...(isSelected && { backgroundColor: selectedSoftBg(theme) }),
        ...(!disabled && { '&:hover': { backgroundColor: 'action.hover' } }),
        '&:has(.Mui-focusVisible)': { outline: '2px solid', outlineColor: 'border.focus', outlineOffset: '2px' },
        '& .MuiCheckbox-root.Mui-focusVisible': { outline: 'none' },
      })
    : { ml: 0, gap: 1.25, alignItems: description ? 'flex-start' : 'center' };

  const checkboxSx =
    variant === 'card'
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

  return (
    <FormControl error={error} disabled={disabled} required={required}>
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
            id={id}
            name={name}
            disableRipple
            icon={variant === 'card' ? undefined : <CheckboxUncheckedIcon error={error} disabled={disabled} />}
            checkedIcon={variant === 'card' ? undefined : <CheckboxCheckedIcon />}
            indeterminateIcon={variant === 'card' ? undefined : <CheckboxIndeterminateIcon />}
            onChange={handleChange}
            sx={checkboxSx}
          />
        }
      />
      {helperText && (
        <FormHelperText error={errorMessage ? false : undefined} role={error && !errorMessage ? 'alert' : undefined} sx={{ ml: 0 }}>
          {helperText}
        </FormHelperText>
      )}
      {error && errorMessage && (
        <FormHelperText error role="alert" sx={{ ml: 0, mt: 0 }}>
          {errorMessage}
        </FormHelperText>
      )}
    </FormControl>
  );
}

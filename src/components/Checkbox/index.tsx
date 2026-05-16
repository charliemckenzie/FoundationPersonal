import React from 'react';
import MuiCheckbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import { alpha, type Theme } from '@mui/material/styles';
import { Icon } from '../Icon';

const CheckboxUncheckedIcon = ({ error, disabled }: { error?: boolean; disabled?: boolean }) => (
  <Box
    component="span"
    sx={(theme) => ({
      width: '1.5rem',
      height: '1.5rem',
      border: '1px solid',
      borderColor: disabled
        ? alpha(theme.palette.border.input, 0.6)
        : error
        ? 'error.main'
        : 'border.input',
      borderRadius: '0.25rem',
      display: 'inline-block',
      boxSizing: 'border-box',
      backgroundColor: disabled
        ? alpha(theme.palette.background.default, 0.6)
        : theme.palette.background.paper,
    })}
  />
);

const CheckboxIndeterminateIcon = () => (
  <Box
    component="span"
    sx={{
      width: '1.5rem',
      height: '1.5rem',
      bgcolor: 'currentColor',
      border: '1px solid currentColor',
      borderRadius: '0.25rem',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxSizing: 'border-box',
    }}
  >
    <Box component="span" sx={{ color: 'common.white', display: 'flex', lineHeight: 0, mt: '-0.0625rem' }}>
      <Icon icon="minus" size="lg" color="inherit" />
    </Box>
  </Box>
);

const CheckboxCheckedIcon = () => (
  <Box
    component="span"
    sx={{
      width: '1.5rem',
      height: '1.5rem',
      bgcolor: 'currentColor',
      border: '1px solid currentColor',
      borderRadius: '0.25rem',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxSizing: 'border-box',
    }}
  >
    <Box component="span" sx={{ color: 'common.white', display: 'flex', lineHeight: 0, mt: '-0.0625rem' }}>
      <Icon icon="check" size="lg" color="inherit" />
    </Box>
  </Box>
);

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

  const labelContent: React.ReactNode = (() => {
    if (variant === 'card') {
      const circleSize = cardDirection === 'column' ? '3rem' : '2.5rem';
      const iconSize = cardDirection === 'column' ? 'xl' : 'lg';
      const iconCircle = icon ? (
        <Box
          component="span"
          sx={(theme) => ({
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: circleSize,
            height: circleSize,
            borderRadius: '50%',
            flexShrink: 0,
            color: disabled
              ? theme.palette.action.disabled
              : isSelected
              ? theme.palette.common.white
              : theme.palette.primary.main,
            backgroundColor: disabled
              ? theme.palette.action.disabledBackground
              : isSelected
              ? theme.palette.primary.main
              : alpha(theme.palette.primary.main, 0.08),
          })}
        >
          <Icon icon={icon} size={iconSize} style={isSelected ? 'solid' : 'light'} color="inherit" />
        </Box>
      ) : null;

      const cornerIndicator = (
        <Box
          component="span"
          aria-hidden
          sx={(theme) => ({
            position: 'absolute',
            top: '0.5rem',
            right: '0.5rem',
            width: '1.125rem',
            height: '1.125rem',
            borderRadius: '0.1875rem',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxSizing: 'border-box',
            flexShrink: 0,
            transition: 'background-color 150ms ease, border-color 150ms ease',
            ...(isSelected
              ? {
                  backgroundColor: disabled ? theme.palette.action.disabledBackground : theme.palette.primary.main,
                  border: 'none',
                }
              : {
                  backgroundColor: 'transparent',
                  border: `1px solid ${disabled ? alpha(theme.palette.border.input, 0.6) : theme.palette.border.input}`,
                }),
          })}
        >
          {isSelected && (
            <Box component="span" sx={{ color: 'common.white', display: 'inline-flex', lineHeight: 0 }}>
              <Icon icon="check" size="sm" color="inherit" style="solid" />
            </Box>
          )}
        </Box>
      );

      if (cardDirection === 'row') {
        return (
          <Box component="span" sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1.5, width: '100%' }}>
            {iconCircle}
            <Box component="span" sx={{ display: 'flex', flexDirection: 'column' }}>
              <Box component="span" sx={{ fontWeight: 500 }}>{label}</Box>
              {description && (
                <Box component="span" sx={{ display: 'block', fontSize: (t: Theme) => (t.typography as { small?: { fontSize?: string } }).small?.fontSize, color: disabled ? 'text.disabled' : isSelected ? 'text.primary' : 'text.muted', lineHeight: 1.4 }}>
                  {description}
                </Box>
              )}
            </Box>
            {cornerIndicator}
          </Box>
        );
      }

      return (
        <Box component="span" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1, width: '100%' }}>
          {iconCircle}
          <Box component="span" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Box component="span" sx={{ fontWeight: 500 }}>{label}</Box>
            {description && (
              <Box component="span" sx={{ display: 'block', fontSize: (t: Theme) => (t.typography as { small?: { fontSize?: string } }).small?.fontSize, color: disabled ? 'text.disabled' : isSelected ? 'text.primary' : 'text.muted', lineHeight: 1.4, textAlign: 'center' }}>
                {description}
              </Box>
            )}
          </Box>
          {cornerIndicator}
        </Box>
      );
    }
    if (description) {
      return (
        <Box component="span" sx={{ display: 'flex', flexDirection: 'column' }}>
          {label}
          <Box component="span" sx={{ display: 'block', fontSize: (t: Theme) => (t.typography as { small?: { fontSize?: string } }).small?.fontSize, color: disabled ? 'text.disabled' : isSelected ? 'text.primary' : 'text.muted', lineHeight: 1.4 }}>
            {description}
          </Box>
        </Box>
      );
    }
    return label;
  })();

  const containerSx = isBoxedOrCard
    ? (theme: Theme) => ({
        ml: 0,
        gap: variant === 'card' ? 0 : 1,
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
        ...(isSelected && { backgroundColor: alpha(theme.palette.primary.main, 0.08) }),
        ...(!disabled && { '&:hover': { backgroundColor: 'action.hover' } }),
        '&:has(.Mui-focusVisible)': { outline: '2px solid', outlineColor: 'border.focus', outlineOffset: '2px' },
        '& .MuiCheckbox-root.Mui-focusVisible': { outline: 'none' },
      })
    : { ml: 0, gap: 1, alignItems: description ? 'flex-start' : 'center' };

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
        label={labelContent}
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

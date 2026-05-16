import React from 'react';
import MuiRadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Box from '@mui/material/Box';
import { alpha, type Theme } from '@mui/material/styles';
import { Icon } from '../Icon';

const RadioUncheckedIcon = ({ disabled }: { disabled?: boolean }) => (
  <Box
    component="span"
    sx={(theme) => ({
      width: '1.5rem',
      height: '1.5rem',
      border: '1px solid',
      borderColor: disabled ? alpha(theme.palette.border.input, 0.6) : 'border.input',
      borderRadius: '50%',
      display: 'inline-block',
      boxSizing: 'border-box',
      backgroundColor: disabled
        ? alpha(theme.palette.background.default, 0.6)
        : theme.palette.background.paper,
    })}
  />
);

const RadioCheckedIcon = () => (
  <Box
    component="span"
    sx={{
      width: '1.5rem',
      height: '1.5rem',
      border: '1px solid currentColor',
      borderRadius: '50%',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxSizing: 'border-box',
      bgcolor: 'background.paper',
    }}
  >
    <Box
      component="span"
      sx={{
        width: '0.875rem',
        height: '0.875rem',
        bgcolor: 'currentColor',
        borderRadius: '50%',
        display: 'block',
      }}
    />
  </Box>
);

export interface RadioOption {
  value: string;
  label: string;
  description?: string;
  icon?: string;
  disabled?: boolean;
}

export type RadioGroupVariant = 'default' | 'boxed' | 'card';
export type RadioGroupDirection = 'column' | 'row';
export type RadioColor = 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success' | 'default';
export type RadioSize = 'small' | 'medium';

export interface RadioGroupProps {
  legend?: string;
  options: RadioOption[];
  variant?: RadioGroupVariant;
  value?: string;
  defaultValue?: string;
  direction?: RadioGroupDirection;
  color?: RadioColor;
  size?: RadioSize;
  helperText?: string;
  errorMessage?: string;
  error?: boolean;
  disabled?: boolean;
  required?: boolean;
  legendBold?: boolean;
  cardDirection?: 'column' | 'row';
  onChange?: (value: string) => void;
  name?: string;
}

export function RadioGroup({
  legend,
  options,
  variant = 'default',
  value,
  defaultValue,
  direction = 'column',
  color = 'primary',
  size = 'medium',
  helperText,
  errorMessage,
  error = false,
  disabled = false,
  required = false,
  legendBold = true,
  cardDirection = 'column',
  onChange,
  name,
}: RadioGroupProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue ?? '');
  const resolvedValue = value !== undefined ? value : internalValue;
  const isBoxedOrCard = variant === 'boxed' || variant === 'card';

  return (
    <FormControl error={error} disabled={disabled} required={required}>
      {legend && (
        <FormLabel
          sx={{
            color: 'text.primary',
            fontSize: '1rem',
            fontWeight: legendBold ? 600 : 400,
            mb: 1,
            '&.Mui-focused': { color: 'text.primary' },
            '&.Mui-error': { color: 'error.main' },
            '&.Mui-disabled': { color: 'text.disabled' },
          }}
        >
          {legend}
        </FormLabel>
      )}
      <MuiRadioGroup
        value={value}
        defaultValue={defaultValue}
        name={name}
        row={direction === 'row'}
        onChange={(e) => {
          if (value === undefined) setInternalValue(e.target.value);
          onChange?.(e.target.value);
        }}
        sx={{ gap: isBoxedOrCard ? 1 : 1.5 }}
      >
        {options.map((option) => {
          const isItemDisabled = disabled || option.disabled;
          const isSelected = isBoxedOrCard && option.value === resolvedValue;

          if (!isBoxedOrCard) {
            const labelNode: React.ReactNode = option.description ? (
              <Box component="span" sx={{ display: 'flex', flexDirection: 'column' }}>
                {option.label}
                <Box component="span" sx={{ display: 'block', fontSize: (t: Theme) => (t.typography as { small?: { fontSize?: string } }).small?.fontSize, color: isItemDisabled ? 'text.disabled' : 'text.muted', lineHeight: 1.4 }}>
                  {option.description}
                </Box>
              </Box>
            ) : option.label;
            return (
              <FormControlLabel
                key={option.value}
                value={option.value}
                label={labelNode}
                disabled={isItemDisabled}
                sx={{ ml: 0, gap: 1, alignItems: option.description ? 'flex-start' : 'center' }}
                control={
                  <Radio color={color} size={size} disableRipple disableTouchRipple
                    icon={<RadioUncheckedIcon disabled={isItemDisabled} />}
                    checkedIcon={<RadioCheckedIcon />}
                    sx={{ p: 0, WebkitTapHighlightColor: 'transparent', '&:hover, &:active': { backgroundColor: 'transparent' } }}
                  />
                }
              />
            );
          }

          const circleSize = cardDirection === 'column' ? '3rem' : '2.5rem';
          const iconSize = cardDirection === 'column' ? 'xl' : 'lg';
          const iconCircle = option.icon ? (
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
                color: isItemDisabled
                  ? theme.palette.action.disabled
                  : isSelected
                  ? theme.palette.common.white
                  : theme.palette.primary.main,
                backgroundColor: isItemDisabled
                  ? theme.palette.action.disabledBackground
                  : isSelected
                  ? theme.palette.primary.main
                  : alpha(theme.palette.primary.main, 0.08),
              })}
            >
              <Icon icon={option.icon} size={iconSize} style={isSelected ? 'solid' : 'light'} color="inherit" />
            </Box>
          ) : null;

          const labelNode: React.ReactNode = variant === 'card' ? (
            cardDirection === 'row' ? (
              <Box component="span" sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1.5, width: '100%' }}>
                {iconCircle}
                <Box component="span" sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Box component="span" sx={{ fontWeight: 500 }}>{option.label}</Box>
                  {option.description && (
                    <Box component="span" sx={{ display: 'block', fontSize: (t: Theme) => (t.typography as { small?: { fontSize?: string } }).small?.fontSize, color: isItemDisabled ? 'text.disabled' : isSelected ? 'text.primary' : 'text.muted', lineHeight: 1.4 }}>
                      {option.description}
                    </Box>
                  )}
                </Box>
              </Box>
            ) : (
              <Box component="span" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1, width: '100%' }}>
                {iconCircle}
                <Box component="span" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Box component="span" sx={{ fontWeight: 500 }}>{option.label}</Box>
                  {option.description && (
                    <Box component="span" sx={{ display: 'block', fontSize: (t: Theme) => (t.typography as { small?: { fontSize?: string } }).small?.fontSize, color: isItemDisabled ? 'text.disabled' : isSelected ? 'text.primary' : 'text.muted', lineHeight: 1.4, textAlign: 'center' }}>
                      {option.description}
                    </Box>
                  )}
                </Box>
              </Box>
            )
          ) : (
            <Box component="span" sx={{ display: 'flex', flexDirection: 'column' }}>
              {option.label}
              {option.description && (
                <Box component="span" sx={{ display: 'block', fontSize: (t: Theme) => (t.typography as { small?: { fontSize?: string } }).small?.fontSize, color: isItemDisabled ? 'text.disabled' : isSelected ? 'text.primary' : 'text.muted', lineHeight: 1.4 }}>
                  {option.description}
                </Box>
              )}
            </Box>
          );

          return (
            <FormControlLabel
              key={option.value}
              value={option.value}
              label={labelNode}
              disabled={isItemDisabled}
              sx={(theme: Theme) => ({
                ml: 0,
                gap: variant === 'card' ? 0 : 1,
                position: 'relative',
                alignItems: variant === 'card' ? 'center' : option.description ? 'flex-start' : 'center',
                justifyContent: variant === 'card' && cardDirection === 'column' ? 'center' : undefined,
                '& .MuiFormControlLabel-label': variant === 'card' ? { flex: 1, display: 'flex', justifyContent: 'center' } : undefined,
                border: '1px solid',
                borderColor: isSelected ? 'primary.main' : 'border.default',
                borderRadius: '0.5rem',
                minHeight: '3rem',
                minWidth: variant === 'card' && cardDirection === 'column' ? '9rem' : undefined,
                px: 2,
                ...(variant === 'boxed' && { pr: '1.25rem' }),
                py: variant === 'card' ? 2 : option.description ? 1.5 : 0,
                cursor: isItemDisabled ? 'default' : 'pointer',
                transition: 'border-color 150ms ease, background-color 150ms ease',
                backgroundColor: 'background.paper',
                ...(isSelected && { backgroundColor: alpha(theme.palette.primary.main, 0.08) }),
                ...(!isItemDisabled && { '&:hover': { backgroundColor: 'action.hover' } }),
                '&:has(.Mui-focusVisible)': { outline: '2px solid', outlineColor: 'border.focus', outlineOffset: '2px' },
                '& .MuiRadio-root.Mui-focusVisible': { outline: 'none' },
              })}
              control={
                <Radio
                  color={color}
                  size={size}
                  disableRipple
                  disableTouchRipple
                  icon={variant === 'card' ? undefined : <RadioUncheckedIcon disabled={isItemDisabled} />}
                  checkedIcon={variant === 'card' ? undefined : <RadioCheckedIcon />}
                  sx={
                    variant === 'card'
                      ? { position: 'absolute', width: '1px', height: '1px', opacity: 0, p: 0, m: 0, overflow: 'hidden', '&.Mui-focusVisible': { outline: 'none' } }
                      : { p: 0, WebkitTapHighlightColor: 'transparent', '&:hover, &:active': { backgroundColor: 'transparent' } }
                  }
                />
              }
            />
          );
        })}
      </MuiRadioGroup>
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

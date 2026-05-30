import React from 'react';
import MuiRadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Box from '@mui/material/Box';
import { type Theme } from '@mui/material/styles';
import { selectedSoftBg } from '../inputs/variantStyles';
import { RadioUncheckedIcon, RadioCheckedIcon } from './icons';
import { RadioCardLabel } from './RadioCardLabel';

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

const cardContainerSx = (args: {
  variant: 'boxed' | 'card';
  cardDirection: 'column' | 'row';
  description: boolean;
  isSelected: boolean;
  isItemDisabled: boolean;
}) => (theme: Theme) => ({
  ml: 0,
  gap: args.variant === 'card' ? 0 : 1.25,
  position: 'relative' as const,
  alignItems: args.variant === 'card' ? 'center' : args.description ? 'flex-start' : 'center',
  justifyContent: args.variant === 'card' && args.cardDirection === 'column' ? 'center' : undefined,
  '& .MuiFormControlLabel-label': args.variant === 'card' ? { flex: 1, display: 'flex', justifyContent: 'center' } : undefined,
  border: '1px solid',
  borderColor: args.isSelected ? 'primary.main' : 'border.default',
  borderRadius: '0.5rem',
  minHeight: '3rem',
  minWidth: args.variant === 'card' && args.cardDirection === 'column' ? '9rem' : undefined,
  px: 2,
  ...(args.variant === 'boxed' && { pr: '1.25rem' }),
  py: args.variant === 'card' ? 2 : args.description ? 1.5 : 0,
  cursor: args.isItemDisabled ? 'default' : 'pointer',
  transition: 'border-color 150ms ease, background-color 150ms ease',
  backgroundColor: 'background.paper',
  ...(args.isSelected && { backgroundColor: selectedSoftBg(theme) }),
  ...(!args.isItemDisabled && { '&:hover': { backgroundColor: 'action.hover' } }),
  '&:has(.Mui-focusVisible)': { outline: '2px solid', outlineColor: 'border.focus', outlineOffset: '2px' },
  '& .MuiRadio-root.Mui-focusVisible': { outline: 'none' },
});

const cardRadioSx = {
  position: 'absolute' as const,
  width: '1px',
  height: '1px',
  opacity: 0,
  p: 0,
  m: 0,
  overflow: 'hidden',
  '&.Mui-focusVisible': { outline: 'none' },
};

const defaultRadioSx = {
  p: 0,
  WebkitTapHighlightColor: 'transparent',
  '&:hover, &:active': { backgroundColor: 'transparent' },
};

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
          const isItemDisabled = disabled || (option.disabled ?? false);
          const isSelected = isBoxedOrCard && option.value === resolvedValue;
          const isCardVariant = isBoxedOrCard;

          const labelNode = isCardVariant ? (
            <RadioCardLabel
              label={option.label}
              description={option.description}
              icon={option.icon}
              variant={variant as 'boxed' | 'card'}
              cardDirection={cardDirection}
              isSelected={isSelected}
              isItemDisabled={isItemDisabled}
            />
          ) : option.description ? (
            <Box component="span" sx={{ display: 'flex', flexDirection: 'column' }}>
              {option.label}
              <Box component="span" sx={{ display: 'block', fontSize: (t: Theme) => t.typography.small.fontSize, color: isItemDisabled ? 'text.disabled' : 'text.muted', lineHeight: 1.4 }}>
                {option.description}
              </Box>
            </Box>
          ) : option.label;

          if (!isBoxedOrCard) {
            return (
              <FormControlLabel
                key={option.value}
                value={option.value}
                label={labelNode}
                disabled={isItemDisabled}
                sx={{ ml: 0, gap: 1.25, alignItems: option.description ? 'flex-start' : 'center' }}
                control={
                  <Radio
                    color={color}
                    size={size}
                    disableRipple
                    disableTouchRipple
                    icon={<RadioUncheckedIcon disabled={isItemDisabled} />}
                    checkedIcon={<RadioCheckedIcon />}
                    sx={defaultRadioSx}
                  />
                }
              />
            );
          }

          return (
            <FormControlLabel
              key={option.value}
              value={option.value}
              label={labelNode}
              disabled={isItemDisabled}
              sx={cardContainerSx({
                variant: variant as 'boxed' | 'card',
                cardDirection,
                description: !!option.description,
                isSelected,
                isItemDisabled,
              })}
              control={
                <Radio
                  color={color}
                  size={size}
                  disableRipple
                  disableTouchRipple
                  icon={variant === 'card' ? undefined : <RadioUncheckedIcon disabled={isItemDisabled} />}
                  checkedIcon={variant === 'card' ? undefined : <RadioCheckedIcon />}
                  sx={variant === 'card' ? cardRadioSx : defaultRadioSx}
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

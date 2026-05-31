import { useState } from 'react';
import MuiToggleButton from '@mui/material/ToggleButton';
import MuiToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import FormHelperText from '@mui/material/FormHelperText';

export type ToggleButtonSize = 'small' | 'medium' | 'large';
export type ToggleButtonColor = 'standard' | 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
export type ToggleButtonOrientation = 'horizontal' | 'vertical';

export interface ToggleButtonOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface ToggleButtonGroupProps {
  options: ToggleButtonOption[];
  ariaLabel: string;
  value?: string | string[];
  defaultValue?: string | string[];
  exclusive?: boolean;
  color?: ToggleButtonColor;
  size?: ToggleButtonSize;
  orientation?: ToggleButtonOrientation;
  disabled?: boolean;
  fullWidth?: boolean;
  onChange?: (value: string | string[]) => void;
  label?: string;
  error?: boolean;
  errorMessage?: string;
}

export function ToggleButtonGroup({
  options,
  ariaLabel,
  value: valueProp,
  defaultValue,
  exclusive = true,
  color = 'primary',
  size = 'medium',
  orientation = 'horizontal',
  disabled = false,
  fullWidth = false,
  onChange,
  label,
  error = false,
  errorMessage,
}: ToggleButtonGroupProps) {
  const isControlled = valueProp !== undefined;
  const [internalValue, setInternalValue] = useState<string | string[]>(
    defaultValue ?? (exclusive ? '' : [])
  );

  const value = isControlled ? valueProp : internalValue;

  function handleChange(_e: React.MouseEvent, newValue: string | string[]) {
    if (!isControlled) setInternalValue(newValue);
    onChange?.(newValue);
  }

  return (
    <Box sx={{ display: fullWidth ? 'flex' : 'inline-flex', flexDirection: 'column', gap: 0.5, ...(fullWidth && { width: '100%' }) }}>
      {label && (
        <FormLabel
          error={error}
          sx={{ typography: 'body', fontWeight: 700, ...(!error && { color: 'text.primary' }) }}
        >
          {label}
        </FormLabel>
      )}
      <MuiToggleButtonGroup
        value={value}
        exclusive={exclusive}
        color={color}
        size={size}
        orientation={orientation}
        disabled={disabled}
        fullWidth={fullWidth}
        onChange={handleChange}
        aria-label={ariaLabel}
        sx={error ? {
          '& .MuiToggleButton-root': { borderColor: 'error.main' },
          '& .MuiToggleButton-root.Mui-selected': { borderColor: 'error.main' },
          '& .MuiToggleButtonGroup-grouped:not(:first-of-type)': { borderLeftColor: 'error.main' },
          '& .MuiToggleButtonGroup-grouped.Mui-selected:not(:first-of-type)': { borderLeftColor: 'error.main' },
        } : undefined}
      >
        {options.map((opt) => (
          <MuiToggleButton key={opt.value} value={opt.value} disabled={opt.disabled} aria-label={opt.label} disableRipple>
            {opt.label}
          </MuiToggleButton>
        ))}
      </MuiToggleButtonGroup>
      {error && errorMessage && (
        <FormHelperText error sx={{ mx: 0 }}>
          {errorMessage}
        </FormHelperText>
      )}
    </Box>
  );
}

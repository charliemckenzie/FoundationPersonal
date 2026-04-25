import { useState } from 'react';
import MuiToggleButton from '@mui/material/ToggleButton';
import MuiToggleButtonGroup from '@mui/material/ToggleButtonGroup';

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
    >
      {options.map((opt) => (
        <MuiToggleButton key={opt.value} value={opt.value} disabled={opt.disabled} aria-label={opt.label}>
          {opt.label}
        </MuiToggleButton>
      ))}
    </MuiToggleButtonGroup>
  );
}

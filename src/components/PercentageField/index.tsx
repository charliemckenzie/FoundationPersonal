import { useState } from 'react';
import { TextField } from '../TextField';
import type { TextFieldSize } from '../TextField';
import type { SelectAdornmentConfig } from '../InputSelect';
import type React from 'react';

export interface PercentageFieldProps {
  label?: string;
  /** Controlled value. When provided, the field reflects it (e.g. external resets). */
  value?: number | null;
  defaultValue?: number;
  placeholder?: string;
  size?: TextFieldSize;
  condensed?: boolean;
  helperText?: string;
  error?: boolean;
  required?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  selectAdornment?: SelectAdornmentConfig;
  onChange?: (value: number | null) => void;
  id?: string;
  name?: string;
  'aria-label'?: string;
}

function sanitize(input: string): string {
  const stripped = input.replace(/[^0-9.]/g, '');
  const firstDot = stripped.indexOf('.');
  if (firstDot === -1) return stripped;
  const dec = stripped.slice(firstDot + 1).replace(/\./g, '').slice(0, 2);
  return `${stripped.slice(0, firstDot)}.${dec}`;
}

function format(value: number | null | undefined): string {
  return value != null ? Math.min(100, Math.max(0, value)).toFixed(2) : '';
}

export function PercentageField({
  label,
  value,
  defaultValue,
  placeholder = '0.00',
  size,
  condensed,
  helperText,
  error,
  required,
  disabled,
  fullWidth,
  selectAdornment,
  onChange,
  id,
  name,
  'aria-label': ariaLabel,
}: PercentageFieldProps) {
  const [displayValue, setDisplayValue] = useState(() =>
    format(value !== undefined ? value : defaultValue)
  );
  const [focused, setFocused] = useState(false);
  const [prevValue, setPrevValue] = useState(value);

  // Reflect a controlled value that changed externally (e.g. a reset), but never
  // while the user is editing. Adjusting state during render is the React-blessed
  // alternative to a syncing effect.
  if (value !== undefined && value !== prevValue && !focused) {
    setPrevValue(value);
    setDisplayValue(value === null ? '' : format(value));
  }

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const sanitized = sanitize(e.target.value);
    const num = parseFloat(sanitized);
    if (sanitized && !isNaN(num) && num > 100) {
      setDisplayValue('100');
      onChange?.(100);
      return;
    }
    setDisplayValue(sanitized);
    onChange?.(sanitized && !isNaN(num) ? Math.max(0, num) : null);
  };

  const handleFocus: React.FocusEventHandler<HTMLInputElement> = () => setFocused(true);

  // Blur is formatting-only — the numeric value was already committed on every keystroke.
  const handleBlur: React.FocusEventHandler<HTMLInputElement> = () => {
    setFocused(false);
    if (!displayValue) return;
    const num = parseFloat(displayValue);
    if (isNaN(num)) {
      setDisplayValue('');
      return;
    }
    setDisplayValue(format(num));
  };

  return (
    <TextField
      label={label}
      value={displayValue}
      placeholder={placeholder}
      size={size}
      condensed={condensed}
      helperText={helperText}
      error={error}
      required={required}
      disabled={disabled}
      fullWidth={fullWidth}
      endAdornment="%"
      selectAdornment={selectAdornment}
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
      id={id}
      name={name}
      htmlInputProps={ariaLabel ? { 'aria-label': ariaLabel } : undefined}
    />
  );
}

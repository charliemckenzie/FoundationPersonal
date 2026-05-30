import { useState } from 'react';
import { TextField } from '../TextField';
import type { TextFieldSize } from '../TextField';
import type React from 'react';

export interface PercentageFieldProps {
  label?: string;
  defaultValue?: number;
  placeholder?: string;
  size?: TextFieldSize;
  condensed?: boolean;
  helperText?: string;
  error?: boolean;
  required?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  onChange?: (value: number | null) => void;
  id?: string;
  name?: string;
}

function sanitize(input: string): string {
  const stripped = input.replace(/[^0-9.]/g, '');
  const firstDot = stripped.indexOf('.');
  if (firstDot === -1) return stripped;
  const dec = stripped.slice(firstDot + 1).replace(/\./g, '').slice(0, 2);
  return `${stripped.slice(0, firstDot)}.${dec}`;
}

export function PercentageField({
  label,
  defaultValue,
  placeholder = '0.00',
  size,
  condensed,
  helperText,
  error,
  required,
  disabled,
  fullWidth,
  onChange,
  id,
  name,
}: PercentageFieldProps) {
  const [displayValue, setDisplayValue] = useState(() =>
    defaultValue != null ? Math.min(100, Math.max(0, defaultValue)).toFixed(2) : ''
  );

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

  // Blur is formatting-only — the numeric value was already committed on every keystroke.
  const handleBlur: React.FocusEventHandler<HTMLInputElement> = () => {
    if (!displayValue) return;
    const num = parseFloat(displayValue);
    if (isNaN(num)) {
      setDisplayValue('');
      return;
    }
    setDisplayValue(Math.min(100, Math.max(0, num)).toFixed(2));
  };

  const isComplete = parseFloat(displayValue) === 100;

  return (
    <TextField
      label={label}
      value={displayValue}
      placeholder={placeholder}
      size={size}
      condensed={condensed}
      helperText={helperText}
      error={error}
      success={isComplete}
      required={required}
      disabled={disabled}
      fullWidth={fullWidth}
      endAdornment="%"
      onChange={handleChange}
      onBlur={handleBlur}
      id={id}
      name={name}
    />
  );
}

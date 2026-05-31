import { useState } from 'react';
import { TextField } from '../TextField';
import type { TextFieldSize } from '../TextField';
import { validateDateOfBirth } from '../inputs/validation';
import type React from 'react';

export interface DateOfBirthFieldProps {
  label?: string;
  value?: string;
  defaultValue?: string;
  size?: TextFieldSize;
  condensed?: boolean;
  helperText?: string;
  errorMessage?: string;
  error?: boolean;
  required?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  id?: string;
  name?: string;
}

const today = new Date().toISOString().split('T')[0];

export function DateOfBirthField({
  label = 'Date of birth',
  condensed,
  error,
  errorMessage,
  onChange,
  onBlur,
  ...props
}: DateOfBirthFieldProps) {
  // Built-in validation (future date, invalid date, implausible age). Runs on
  // blur, re-checks on change once touched. An externally supplied error wins.
  const [touched, setTouched] = useState(false);
  const [builtInError, setBuiltInError] = useState<string | null>(null);

  const handleBlur: React.FocusEventHandler<HTMLInputElement> = (e) => {
    setTouched(true);
    setBuiltInError(validateDateOfBirth(e.target.value));
    onBlur?.(e);
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (touched) setBuiltInError(validateDateOfBirth(e.target.value));
    onChange?.(e);
  };

  const externalError = error || !!errorMessage;
  const showBuiltInError = !externalError && touched && builtInError != null;

  return (
    <TextField
      label={label}
      type="date"
      condensed={condensed}
      htmlInputProps={{ min: '1900-01-01', max: today }}
      error={error || showBuiltInError}
      errorMessage={errorMessage ?? (showBuiltInError ? builtInError : undefined)}
      onChange={handleChange}
      onBlur={handleBlur}
      {...props}
    />
  );
}

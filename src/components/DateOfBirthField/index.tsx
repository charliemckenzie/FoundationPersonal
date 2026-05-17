import { TextField } from '../TextField';
import type { TextFieldSize } from '../TextField';
import type React from 'react';

export interface DateOfBirthFieldProps {
  label?: string;
  value?: string;
  defaultValue?: string;
  size?: TextFieldSize;
  condensed?: boolean;
  helperText?: string;
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
  ...props
}: DateOfBirthFieldProps) {
  return (
    <TextField
      label={label}
      type="date"
      condensed={condensed}
      htmlInputProps={{ min: '1900-01-01', max: today }}
      {...props}
    />
  );
}

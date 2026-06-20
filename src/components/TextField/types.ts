import type React from 'react';
import type { SelectAdornmentConfig } from '../InputSelect';

export type TextFieldType = 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search' | 'date';
export type TextFieldSize = 'small' | 'medium';

export interface TextFieldProps {
  label?: string;
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  type?: TextFieldType;
  size?: TextFieldSize;
  helperText?: string;
  errorMessage?: string;
  error?: boolean;
  success?: boolean;
  required?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  condensed?: boolean;
  multiline?: boolean;
  rows?: number;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  selectAdornment?: SelectAdornmentConfig;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  htmlInputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  id?: string;
  name?: string;
  autoComplete?: string;
}

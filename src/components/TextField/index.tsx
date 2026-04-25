import MuiTextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import type React from 'react';

export type TextFieldType = 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search';
export type TextFieldSize = 'small' | 'medium';

export interface TextFieldProps {
  label: string;
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  type?: TextFieldType;
  size?: TextFieldSize;
  helperText?: string;
  error?: boolean;
  required?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  multiline?: boolean;
  rows?: number;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  id?: string;
  name?: string;
  autoComplete?: string;
}

export function TextField({
  label,
  value,
  defaultValue,
  placeholder,
  type = 'text',
  size = 'medium',
  helperText,
  error = false,
  required = false,
  disabled = false,
  fullWidth = false,
  multiline = false,
  rows,
  startAdornment,
  endAdornment,
  onChange,
  onBlur,
  id,
  name,
  autoComplete,
}: TextFieldProps) {
  return (
    <MuiTextField
      label={label}
      value={value}
      defaultValue={defaultValue}
      placeholder={placeholder}
      type={type}
      size={size}
      helperText={helperText}
      error={error}
      required={required}
      disabled={disabled}
      fullWidth={fullWidth}
      multiline={multiline}
      rows={rows}
      onChange={onChange}
      onBlur={onBlur}
      id={id}
      name={name}
      autoComplete={autoComplete}
      slotProps={{
        formHelperText: error ? { role: 'alert' } : undefined,
        input: {
          startAdornment: startAdornment ? (
            <InputAdornment position="start">{startAdornment}</InputAdornment>
          ) : undefined,
          endAdornment: endAdornment ? (
            <InputAdornment position="end">{endAdornment}</InputAdornment>
          ) : undefined,
        },
      }}
    />
  );
}

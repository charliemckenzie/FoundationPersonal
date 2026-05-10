import { useId } from 'react';
import { alpha } from '@mui/material/styles';
import MuiTextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import FormLabel from '@mui/material/FormLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Box from '@mui/material/Box';
import type React from 'react';

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
  required?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  multiline?: boolean;
  rows?: number;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  htmlInputProps?: React.InputHTMLAttributes<HTMLInputElement>;
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
  errorMessage,
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
  onFocus,
  htmlInputProps,
  id,
  name,
  autoComplete,
}: TextFieldProps) {
  const generatedId = useId();
  const fieldId = id ?? generatedId;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, ...(fullWidth && { width: '100%' }) }}>
      {label && (
        <FormLabel
          htmlFor={fieldId}
          required={required}
          error={error}
          disabled={disabled}
          sx={{ fontWeight: 700, fontSize: '1rem', ...(!error && !disabled && { color: 'text.primary' }) }}
        >
          {label}
        </FormLabel>
      )}
      <MuiTextField
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
        onFocus={onFocus}
        id={fieldId}
        name={name}
        autoComplete={autoComplete}
        slotProps={{
          ...(htmlInputProps && { htmlInput: htmlInputProps }),
          formHelperText: { role: error && !errorMessage ? 'alert' : undefined, error: errorMessage ? false : undefined, sx: { mx: 0 } },
          input: {
            sx: (theme) => ({
              fontSize: '1rem',
              borderRadius: `${theme.shape.sm}px`,
              '& .MuiInputAdornment-root': {
                alignSelf: 'stretch',
                alignItems: 'center',
                maxHeight: 'none',
              },
              backgroundColor: theme.palette.background.paper,
              '&.Mui-disabled': {
                backgroundColor: alpha(theme.palette.background.default, 0.6),
              },
              '&&.Mui-disabled fieldset': {
                borderColor: alpha(theme.palette.border.input, 0.6),
              },
              ...(!multiline && {
                '& .MuiOutlinedInput-input': {
                  paddingTop: '12px',
                  paddingBottom: '12px',
                },
              }),
              '& fieldset': {
                borderColor: theme.palette.border.input,
                borderRadius: `${theme.shape.sm}px`,
              },
              '&:hover:not(.Mui-focused):not(.Mui-error):not(.Mui-disabled) fieldset': {
                borderColor: theme.palette.border.input,
              },
              '&.Mui-focused': {
                outline: `2px solid ${theme.palette.border.focus}`,
                outlineOffset: '2px',
              },
              '&&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderWidth: '1px',
                borderColor: theme.palette.border.input,
              },
              '&&.Mui-focused.Mui-error .MuiOutlinedInput-notchedOutline': {
                borderColor: theme.palette.error.main,
              },
            }),
            startAdornment: startAdornment ? (
              <InputAdornment position="start">{startAdornment}</InputAdornment>
            ) : undefined,
            endAdornment: endAdornment ? (
              <InputAdornment position="end">{endAdornment}</InputAdornment>
            ) : undefined,
          },
        }}
      />
      {error && errorMessage && (
        <FormHelperText error role="alert" sx={{ mx: 0, mt: 0 }}>
          {errorMessage}
        </FormHelperText>
      )}
    </Box>
  );
}

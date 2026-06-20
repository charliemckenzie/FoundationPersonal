import { useId, useState } from 'react';
import MuiTextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import FormLabel from '@mui/material/FormLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Box from '@mui/material/Box';
import type React from 'react';
import { InputSelectContainer } from '../InputSelect';
import type { TextFieldProps } from './types';
import { FORMAT_VALIDATORS, buildFieldInputSx } from './styles';

export type { TextFieldType, TextFieldSize, TextFieldProps } from './types';

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
  success = false,
  required = false,
  disabled = false,
  fullWidth = false,
  condensed = false,
  multiline = false,
  rows,
  startAdornment,
  endAdornment,
  selectAdornment,
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

  // Track focus for unified container (InputSelect mode)
  const [isFocused, setIsFocused] = useState(false);

  // Built-in format validation (email/tel). Runs on blur, re-checks on change
  // once the field has been touched. An externally supplied error always wins.
  const formatValidator = FORMAT_VALIDATORS[type];
  const [touched, setTouched] = useState(false);
  const [builtInError, setBuiltInError] = useState<string | null>(null);

  const handleBlur: React.FocusEventHandler<HTMLInputElement> = (e) => {
    setIsFocused(false);
    if (formatValidator) {
      setTouched(true);
      setBuiltInError(formatValidator(e.target.value));
    }
    onBlur?.(e);
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (formatValidator && touched) setBuiltInError(formatValidator(e.target.value));
    onChange?.(e);
  };

  const externalError = error || !!errorMessage;
  const showBuiltInError = !externalError && touched && builtInError != null;
  const effectiveError = error || showBuiltInError;
  const effectiveErrorMessage = errorMessage ?? (showBuiltInError ? builtInError : undefined);

  const errorId = effectiveError && effectiveErrorMessage ? `${fieldId}-error` : undefined;
  const helperId = helperText ? `${fieldId}-helper-text` : undefined;
  const selectDescId = selectAdornment ? `${fieldId}-select` : undefined;
  const describedBy = [selectDescId, errorId, helperId].filter(Boolean).join(' ') || undefined;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, ...(fullWidth && { width: '100%' }) }}>
      {label && (
        <FormLabel
          htmlFor={fieldId}
          required={required}
          error={effectiveError}
          disabled={disabled}
          sx={{ fontWeight: 700, fontSize: size === 'small' ? '0.875rem' : '1rem', ...(!effectiveError && !disabled && { color: success ? 'success.main' : 'text.primary' }) }}
        >
          {label}
        </FormLabel>
      )}
      {selectAdornment ? (
        <>
          <InputSelectContainer
            selectAdornment={selectAdornment}
            error={effectiveError}
            disabled={disabled}
            focused={isFocused}
            size={size}
            id={fieldId}
          >
            {renderMuiInput(true)}
          </InputSelectContainer>
          {helperText && !effectiveError && (
            <FormHelperText id={helperId} sx={{ mx: 0, mt: 0 }}>
              {helperText}
            </FormHelperText>
          )}
        </>
      ) : renderMuiInput(false)}
      {effectiveError && effectiveErrorMessage && (
        <FormHelperText error role="alert" id={errorId} sx={{ mx: 0, mt: 0 }}>
          {effectiveErrorMessage}
        </FormHelperText>
      )}
    </Box>
  );

  function renderMuiInput(borderless: boolean) {
    return (
      <MuiTextField
        value={value}
        defaultValue={defaultValue}
        placeholder={placeholder}
        type={type}
        size={size}
        helperText={borderless ? undefined : helperText}
        error={effectiveError}
        required={required}
        disabled={disabled}
        fullWidth={borderless || fullWidth}
        multiline={multiline}
        rows={rows}
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={(e) => { setIsFocused(true); onFocus?.(e as React.FocusEvent<HTMLInputElement>); }}
        id={fieldId}
        name={name}
        autoComplete={autoComplete}
        slotProps={{
          htmlInput: {
            ...htmlInputProps,
            'aria-invalid': effectiveError ? true : undefined,
            'aria-describedby': describedBy,
          },
          formHelperText: { id: helperId, role: effectiveError && !effectiveErrorMessage ? 'alert' : undefined, error: effectiveErrorMessage ? false : undefined, sx: { mx: 0 } },
          input: {
            sx: buildFieldInputSx({ size, condensed, multiline, hasLabel: !!label, borderless, success, error: effectiveError }),
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
}

import { useId } from 'react';
import MuiFormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import MuiSelect, { type SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import Box from '@mui/material/Box';
import type React from 'react';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export type SelectSize = 'small' | 'medium';

export interface SelectProps {
  label: string;
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  size?: SelectSize;
  helperText?: string;
  error?: boolean;
  required?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  onChange?: (value: string) => void;
  id?: string;
  name?: string;
}

export function Select({
  label,
  options,
  value,
  defaultValue,
  placeholder,
  size = 'medium',
  helperText,
  error = false,
  required = false,
  disabled = false,
  fullWidth = false,
  onChange,
  id,
  name,
}: SelectProps) {
  const generatedId = useId();
  const fieldId = id ?? generatedId;
  const labelId = `${fieldId}-label`;

  function handleChange(event: SelectChangeEvent) {
    onChange?.(event.target.value);
  }

  function renderValue(selected: unknown): React.ReactNode {
    if (!selected && placeholder) {
      return <Box component="span" sx={{ color: 'text.secondary' }}>{placeholder}</Box>;
    }
    return options.find(o => o.value === (selected as string))?.label ?? '';
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, ...(fullWidth && { width: '100%' }) }}>
      <FormLabel
        id={labelId}
        htmlFor={fieldId}
        required={required}
        error={error}
        disabled={disabled}
        sx={{ fontWeight: 700, ...(!error && !disabled && { color: 'text.primary' }) }}
      >
        {label}
      </FormLabel>
      <MuiFormControl size={size} error={error} required={required} disabled={disabled} fullWidth={fullWidth}>
        <MuiSelect
          labelId={labelId}
          displayEmpty={!!placeholder}
          value={value}
          defaultValue={defaultValue}
          onChange={handleChange}
          renderValue={placeholder ? renderValue : undefined}
          inputProps={{ id: fieldId, name }}
        >
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value} disabled={option.disabled}>
              {option.label}
            </MenuItem>
          ))}
        </MuiSelect>
        {helperText && <FormHelperText role={error ? 'alert' : undefined}>{helperText}</FormHelperText>}
      </MuiFormControl>
    </Box>
  );
}

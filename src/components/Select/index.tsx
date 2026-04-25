import MuiFormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MuiSelect, { type SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';

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
  const labelId = `${id ?? label.toLowerCase().replace(/\s+/g, '-')}-label`;

  function handleChange(event: SelectChangeEvent) {
    onChange?.(event.target.value);
  }

  return (
    <MuiFormControl size={size} error={error} required={required} disabled={disabled} fullWidth={fullWidth}>
      <InputLabel id={labelId}>{label}</InputLabel>
      <MuiSelect
        labelId={labelId}
        label={label}
        value={value}
        defaultValue={defaultValue}
        onChange={handleChange}
        inputProps={{ id, name }}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value} disabled={option.disabled}>
            {option.label}
          </MenuItem>
        ))}
      </MuiSelect>
      {helperText && <FormHelperText role={error ? 'alert' : undefined}>{helperText}</FormHelperText>}
    </MuiFormControl>
  );
}

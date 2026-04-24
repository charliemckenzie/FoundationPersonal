import MuiRadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormHelperText from '@mui/material/FormHelperText';

export interface RadioOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export type RadioGroupDirection = 'column' | 'row';
export type RadioColor = 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success' | 'default';
export type RadioSize = 'small' | 'medium';

export interface RadioGroupProps {
  legend: string;
  options: RadioOption[];
  value?: string;
  defaultValue?: string;
  direction?: RadioGroupDirection;
  color?: RadioColor;
  size?: RadioSize;
  helperText?: string;
  error?: boolean;
  disabled?: boolean;
  required?: boolean;
  onChange?: (value: string) => void;
  name?: string;
}

export function RadioGroup({
  legend,
  options,
  value,
  defaultValue,
  direction = 'column',
  color = 'primary',
  size = 'medium',
  helperText,
  error = false,
  disabled = false,
  required = false,
  onChange,
  name,
}: RadioGroupProps) {
  return (
    <FormControl error={error} disabled={disabled} required={required}>
      <FormLabel>{legend}</FormLabel>
      <MuiRadioGroup
        value={value}
        defaultValue={defaultValue}
        name={name}
        row={direction === 'row'}
        onChange={(e) => onChange?.(e.target.value)}
      >
        {options.map((option) => (
          <FormControlLabel
            key={option.value}
            value={option.value}
            label={option.label}
            disabled={option.disabled}
            control={<Radio color={color} size={size} />}
          />
        ))}
      </MuiRadioGroup>
      {helperText && <FormHelperText role={error ? 'alert' : undefined}>{helperText}</FormHelperText>}
    </FormControl>
  );
}

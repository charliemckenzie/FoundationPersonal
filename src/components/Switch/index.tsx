import { useId } from 'react';
import MuiSwitch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';

export type SwitchColor = 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success' | 'default';
export type SwitchSize = 'small' | 'medium';
export type LabelPlacement = 'end' | 'start' | 'top' | 'bottom';

export interface SwitchProps {
  label: string;
  checked?: boolean;
  defaultChecked?: boolean;
  color?: SwitchColor;
  size?: SwitchSize;
  labelPlacement?: LabelPlacement;
  helperText?: string;
  error?: boolean;
  disabled?: boolean;
  required?: boolean;
  onChange?: (checked: boolean) => void;
  id?: string;
  name?: string;
}

export function Switch({
  label,
  checked,
  defaultChecked,
  color = 'primary',
  size = 'medium',
  labelPlacement = 'end',
  helperText,
  error = false,
  disabled = false,
  required = false,
  onChange,
  id,
  name,
}: SwitchProps) {
  const generatedId = useId();
  const switchId = id ?? generatedId;
  const helperId = helperText ? `${switchId}-helper-text` : undefined;

  return (
    <FormControl error={error} disabled={disabled} required={required}>
      <FormControlLabel
        labelPlacement={labelPlacement}
        label={label}
        control={
          <MuiSwitch
            checked={checked}
            defaultChecked={defaultChecked}
            color={color}
            size={size}
            id={switchId}
            name={name}
            disableRipple
            onChange={(e) => onChange?.(e.target.checked)}
            slotProps={{ input: { 'aria-invalid': error ? true : undefined, 'aria-describedby': helperId } }}
          />
        }
      />
      {helperText && <FormHelperText id={helperId} role={error ? 'alert' : undefined}>{helperText}</FormHelperText>}
    </FormControl>
  );
}

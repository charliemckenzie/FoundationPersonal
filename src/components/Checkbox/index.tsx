import MuiCheckbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import { alpha } from '@mui/material/styles';
import { Icon } from '../Icon';

const CheckboxUncheckedIcon = ({ error, disabled }: { error?: boolean; disabled?: boolean }) => (
  <Box
    component="span"
    sx={(theme) => ({
      width: '1.5rem',
      height: '1.5rem',
      border: '1px solid',
      borderColor: disabled
        ? alpha(theme.palette.border.input, 0.6)
        : error
        ? 'error.main'
        : 'border.input',
      borderRadius: '0.25rem',
      display: 'inline-block',
      boxSizing: 'border-box',
      backgroundColor: disabled
        ? alpha(theme.palette.background.default, 0.6)
        : theme.palette.background.paper,
    })}
  />
);

const CheckboxIndeterminateIcon = () => (
  <Box
    component="span"
    sx={{
      width: '1.5rem',
      height: '1.5rem',
      bgcolor: 'currentColor',
      border: '1px solid currentColor',
      borderRadius: '0.25rem',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxSizing: 'border-box',
    }}
  >
    <Box component="span" sx={{ color: 'common.white', display: 'flex', lineHeight: 0, mt: '-0.0625rem' }}>
      <Icon icon="minus" size="lg" color="inherit" />
    </Box>
  </Box>
);

const CheckboxCheckedIcon = () => (
  <Box
    component="span"
    sx={{
      width: '1.5rem',
      height: '1.5rem',
      bgcolor: 'currentColor',
      border: '1px solid currentColor',
      borderRadius: '0.25rem',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxSizing: 'border-box',
    }}
  >
    <Box component="span" sx={{ color: 'common.white', display: 'flex', lineHeight: 0, mt: '-0.0625rem' }}>
      <Icon icon="check" size="lg" color="inherit" />
    </Box>
  </Box>
);

export type CheckboxColor = 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success' | 'default';
export type CheckboxSize = 'small' | 'medium';
export type LabelPlacement = 'end' | 'start' | 'top' | 'bottom';

export interface CheckboxProps {
  label: string;
  checked?: boolean;
  defaultChecked?: boolean;
  indeterminate?: boolean;
  color?: CheckboxColor;
  size?: CheckboxSize;
  labelPlacement?: LabelPlacement;
  helperText?: string;
  errorMessage?: string;
  error?: boolean;
  disabled?: boolean;
  required?: boolean;
  onChange?: (checked: boolean) => void;
  id?: string;
  name?: string;
}

export function Checkbox({
  label,
  checked,
  defaultChecked,
  indeterminate = false,
  color = 'primary',
  size = 'medium',
  labelPlacement = 'end',
  helperText,
  errorMessage,
  error = false,
  disabled = false,
  required = false,
  onChange,
  id,
  name,
}: CheckboxProps) {
  return (
    <FormControl error={error} disabled={disabled} required={required}>
      <FormControlLabel
        labelPlacement={labelPlacement}
        label={label}
        sx={{ ml: 0, gap: 1 }}
        control={
          <MuiCheckbox
            checked={checked}
            defaultChecked={defaultChecked}
            indeterminate={indeterminate}
            color={color}
            size={size}
            id={id}
            name={name}
            disableRipple
            icon={<CheckboxUncheckedIcon error={error} disabled={disabled} />}
            checkedIcon={<CheckboxCheckedIcon />}
            indeterminateIcon={<CheckboxIndeterminateIcon />}
            onChange={(e) => onChange?.(e.target.checked)}
            sx={{ p: 0, WebkitTapHighlightColor: 'transparent', '&:hover, &:active': { backgroundColor: 'transparent' } }}
          />
        }
      />
      {helperText && (
        <FormHelperText error={errorMessage ? false : undefined} role={error && !errorMessage ? 'alert' : undefined} sx={{ ml: 0 }}>
          {helperText}
        </FormHelperText>
      )}
      {error && errorMessage && (
        <FormHelperText error role="alert" sx={{ ml: 0, mt: 0 }}>
          {errorMessage}
        </FormHelperText>
      )}
    </FormControl>
  );
}

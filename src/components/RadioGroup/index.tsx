import MuiRadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Box from '@mui/material/Box';

const RadioUncheckedIcon = () => (
  <Box
    component="span"
    sx={{
      width: '1.5rem',
      height: '1.5rem',
      border: '1px solid',
      borderColor: 'border.input',
      borderRadius: '50%',
      display: 'inline-block',
      boxSizing: 'border-box',
    }}
  />
);

const RadioCheckedIcon = () => (
  <Box
    component="span"
    sx={{
      width: '1.5rem',
      height: '1.5rem',
      border: '1px solid currentColor',
      borderRadius: '50%',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxSizing: 'border-box',
    }}
  >
    <Box
      component="span"
      sx={{
        width: '0.875rem',
        height: '0.875rem',
        bgcolor: 'currentColor',
        borderRadius: '50%',
        display: 'block',
      }}
    />
  </Box>
);

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
  legendBold?: boolean;
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
  legendBold = true,
  onChange,
  name,
}: RadioGroupProps) {
  return (
    <FormControl error={error} disabled={disabled} required={required}>
      <FormLabel
        sx={{
          color: 'text.primary',
          fontSize: '1rem',
          fontWeight: legendBold ? 600 : 400,
          mb: 1,
          '&.Mui-focused': { color: 'text.primary' },
          '&.Mui-error': { color: 'error.main' },
          '&.Mui-disabled': { color: 'text.disabled' },
        }}
      >
        {legend}
      </FormLabel>
      <MuiRadioGroup
        value={value}
        defaultValue={defaultValue}
        name={name}
        row={direction === 'row'}
        onChange={(e) => onChange?.(e.target.value)}
        sx={{ gap: 1.5 }}
      >
        {options.map((option) => (
          <FormControlLabel
            key={option.value}
            value={option.value}
            label={option.label}
            disabled={option.disabled}
            sx={{ ml: 0, gap: 1 }}
            control={<Radio color={color} size={size} disableRipple icon={<RadioUncheckedIcon />} checkedIcon={<RadioCheckedIcon />} sx={{ p: 0, WebkitTapHighlightColor: 'transparent', '&:hover, &:active': { backgroundColor: 'transparent' } }} />}
          />
        ))}
      </MuiRadioGroup>
      {helperText && <FormHelperText role={error ? 'alert' : undefined} sx={{ ml: 0 }}>{helperText}</FormHelperText>}
    </FormControl>
  );
}

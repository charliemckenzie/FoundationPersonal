import React, { useId } from 'react';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Box from '@mui/material/Box';
import { Checkbox } from './index';

export interface CheckboxCardOption {
  value: string;
  label: string;
  description?: string;
  icon?: string;
  disabled?: boolean;
}

export interface CheckboxCardGroupProps {
  options: CheckboxCardOption[];
  legend?: string;
  value?: string[];
  defaultValue?: string[];
  /** Internal layout of each card. `column` stacks icon above label. `row` places icon left of label. Defaults to `column`. */
  cardDirection?: 'column' | 'row';
  /** Layout of the cards. `row` arranges cards horizontally. Defaults to `row`. */
  direction?: 'row' | 'column';
  helperText?: string;
  errorMessage?: string;
  error?: boolean;
  disabled?: boolean;
  required?: boolean;
  legendBold?: boolean;
  onChange?: (values: string[]) => void;
  name?: string;
}

export function CheckboxCardGroup({
  options,
  legend,
  value: valueProp,
  defaultValue,
  cardDirection = 'column',
  direction = 'row',
  helperText,
  errorMessage,
  error = false,
  disabled = false,
  required = false,
  legendBold = true,
  onChange,
  name,
}: CheckboxCardGroupProps) {
  const groupId = useId();
  const labelId = legend ? `${groupId}-label` : undefined;
  const errorId = error && errorMessage ? `${groupId}-error` : undefined;
  const helperId = helperText ? `${groupId}-helper-text` : undefined;

  const [internalValue, setInternalValue] = React.useState<string[]>(defaultValue ?? []);
  const resolvedValue = valueProp !== undefined ? valueProp : internalValue;

  function handleChange(optionValue: string, checked: boolean) {
    const next = checked
      ? [...resolvedValue, optionValue]
      : resolvedValue.filter((v) => v !== optionValue);
    if (valueProp === undefined) setInternalValue(next);
    onChange?.(next);
  }

  return (
    <FormControl
      component="fieldset"
      error={error}
      disabled={disabled}
      required={required}
      aria-describedby={[errorId, helperId].filter(Boolean).join(' ') || undefined}
      sx={{ display: 'flex', flexDirection: 'column', gap: 0, border: 'none', p: 0, m: 0, minWidth: 0 }}
    >
      {legend && (
        <FormLabel
          component="legend"
          id={labelId}
          sx={{
            color: 'text.primary',
            typography: 'body',
            fontWeight: legendBold ? 600 : 400,
            mb: 1,
            '&.Mui-focused': { color: 'text.primary' },
            '&.Mui-error': { color: 'error.main' },
            '&.Mui-disabled': { color: 'text.disabled' },
          }}
        >
          {legend}
        </FormLabel>
      )}
      <Box
        sx={{
          display: 'flex',
          flexDirection: direction,
          gap: direction === 'row' ? 1.5 : 1,
          flexWrap: direction === 'row' ? 'wrap' : undefined,
        }}
      >
        {options.map((opt) => (
          <Checkbox
            key={opt.value}
            variant="card"
            label={opt.label}
            description={opt.description}
            icon={opt.icon}
            cardDirection={cardDirection}
            checked={resolvedValue.includes(opt.value)}
            disabled={disabled || opt.disabled}
            error={error}
            name={name}
            onChange={(checked) => handleChange(opt.value, checked)}
          />
        ))}
      </Box>
      {helperText && (
        <FormHelperText id={helperId} error={errorMessage ? false : undefined} role={error && !errorMessage ? 'alert' : undefined} sx={{ ml: 0 }}>
          {helperText}
        </FormHelperText>
      )}
      {error && errorMessage && (
        <FormHelperText error role="alert" id={errorId} sx={{ ml: 0, mt: 0 }}>
          {errorMessage}
        </FormHelperText>
      )}
    </FormControl>
  );
}

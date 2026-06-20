import React, { useId } from 'react';
import MuiRadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormHelperText from '@mui/material/FormHelperText';
import { RadioOptionItem } from './RadioOptionItem';
import type { RadioGroupProps } from './types';

export type {
  RadioOption,
  RadioGroupVariant,
  RadioGroupDirection,
  RadioColor,
  RadioSize,
  RadioGroupProps,
} from './types';

export function RadioGroup({
  legend,
  options,
  variant = 'default',
  value,
  defaultValue,
  direction = 'column',
  color = 'primary',
  size = 'medium',
  helperText,
  helperTextPosition = 'bottom',
  errorMessage,
  error = false,
  disabled = false,
  required = false,
  legendBold = true,
  legendSx,
  cardDirection = 'column',
  onChange,
  name,
}: RadioGroupProps) {
  const groupId = useId();
  const labelId = legend ? `${groupId}-label` : undefined;
  const errorId = error && errorMessage ? `${groupId}-error` : undefined;
  const helperId = helperText ? `${groupId}-helper-text` : undefined;
  const describedBy = [errorId, helperId].filter(Boolean).join(' ') || undefined;

  const [internalValue, setInternalValue] = React.useState(defaultValue ?? '');
  const resolvedValue = value !== undefined ? value : internalValue;
  const isBoxedOrCard = variant === 'boxed' || variant === 'card';
  const isButton = variant === 'button';

  // Single helper-text node reused for both positions so the id (and therefore the
  // aria-describedby link) stays identical whether it renders above or below the control.
  const helperNode = helperText ? (
    <FormHelperText
      id={helperId}
      error={errorMessage ? false : undefined}
      role={error && !errorMessage ? 'alert' : undefined}
      sx={{ ml: 0, ...(helperTextPosition === 'top' && { mt: 0, mb: 2 }) }}
    >
      {helperText}
    </FormHelperText>
  ) : null;

  return (
    <FormControl
      error={error}
      disabled={disabled}
      required={required}
      sx={{ border: 'none', p: 0, m: 0, minWidth: 0 }}
    >
      {legend && (
        <FormLabel
          component="div"
          id={labelId}
          sx={[
            {
              color: 'text.primary',
              typography: 'body',
              // Match the TextField label weight (700) so a RadioGroup legend reads
              // as the same field label across forms.
              fontWeight: legendBold ? 700 : 400,
              mb: helperText && helperTextPosition === 'top' ? 0.25 : 1,
              '&.Mui-focused': { color: 'text.primary' },
              '&.Mui-error': { color: 'error.main' },
              '&.Mui-disabled': { color: 'text.disabled' },
            },
            ...(Array.isArray(legendSx) ? legendSx : legendSx ? [legendSx] : []),
          ]}
        >
          {legend}
        </FormLabel>
      )}
      {helperTextPosition === 'top' && helperNode}
      <MuiRadioGroup
        value={value}
        defaultValue={defaultValue}
        name={name}
        row={direction === 'row'}
        aria-labelledby={labelId}
        aria-describedby={describedBy}
        onChange={(e) => {
          if (value === undefined) setInternalValue(e.target.value);
          onChange?.(e.target.value);
        }}
        sx={{ gap: isBoxedOrCard || isButton ? 1 : 1.5 }}
      >
        {options.map((option) => (
          <RadioOptionItem
            key={option.value}
            option={option}
            variant={variant}
            color={color}
            size={size}
            cardDirection={cardDirection}
            groupDisabled={disabled}
            resolvedValue={resolvedValue}
          />
        ))}
      </MuiRadioGroup>
      {helperTextPosition === 'bottom' && helperNode}
      {error && errorMessage && (
        <FormHelperText error role="alert" id={errorId} sx={{ ml: 0, mt: 0 }}>
          {errorMessage}
        </FormHelperText>
      )}
    </FormControl>
  );
}

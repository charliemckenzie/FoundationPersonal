import React, { useId } from 'react';
import MuiCheckbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import { CheckboxUncheckedIcon, CheckboxIndeterminateIcon, CheckboxCheckedIcon } from './icons';
import { renderLabelContent } from './helpers';
import { buildContainerSx, buildCheckboxSx } from './styles';
import type { CheckboxProps } from './types';

export type {
  CheckboxVariant,
  CheckboxColor,
  CheckboxSize,
  LabelPlacement,
  CheckboxProps,
} from './types';

export function Checkbox({
  label,
  description,
  variant = 'default',
  icon,
  cardDirection = 'column',
  checked,
  defaultChecked,
  indeterminate = false,
  color = 'primary',
  size = 'medium',
  labelPlacement = 'end',
  helperText,
  helperTextPosition = 'bottom',
  errorMessage,
  error = false,
  disabled = false,
  required = false,
  onChange,
  id,
  name,
}: CheckboxProps) {
  const generatedId = useId();
  const checkboxId = id ?? generatedId;
  const errorId = error && errorMessage ? `${checkboxId}-error` : undefined;
  const helperId = helperText ? `${checkboxId}-helper-text` : undefined;
  const describedBy = [errorId, helperId].filter(Boolean).join(' ') || undefined;

  const [internalChecked, setInternalChecked] = React.useState(defaultChecked ?? false);
  const resolvedChecked = checked !== undefined ? checked : internalChecked;
  const isBoxedOrCard = variant === 'boxed' || variant === 'card';
  const isButton = variant === 'button';
  const isSelected = (isBoxedOrCard || isButton) && resolvedChecked;

  const handleChange = (_e: React.ChangeEvent<HTMLInputElement>, isChecked: boolean) => {
    if (checked === undefined) setInternalChecked(isChecked);
    onChange?.(isChecked);
  };

  const containerSx = buildContainerSx({
    variant,
    isButton,
    isBoxedOrCard,
    isSelected,
    error,
    disabled,
    description: !!description,
    cardDirection,
  });

  const checkboxSx = buildCheckboxSx(variant);

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
    <FormControl error={error} disabled={disabled} required={required}>
      {helperTextPosition === 'top' && helperNode}
      <FormControlLabel
        labelPlacement={labelPlacement}
        label={renderLabelContent({ label, description, variant, icon, cardDirection, isSelected, disabled })}
        sx={containerSx}
        control={
          <MuiCheckbox
            checked={checked}
            defaultChecked={defaultChecked}
            indeterminate={indeterminate}
            color={color}
            size={size}
            id={checkboxId}
            name={name}
            slotProps={{ input: { 'aria-invalid': error ? true : undefined, 'aria-describedby': describedBy } }}
            disableRipple
            icon={(variant === 'card' || variant === 'button') ? undefined : <CheckboxUncheckedIcon error={error} disabled={disabled} />}
            checkedIcon={(variant === 'card' || variant === 'button') ? undefined : <CheckboxCheckedIcon />}
            indeterminateIcon={(variant === 'card' || variant === 'button') ? undefined : <CheckboxIndeterminateIcon />}
            onChange={handleChange}
            sx={checkboxSx}
          />
        }
      />
      {helperTextPosition === 'bottom' && helperNode}
      {error && errorMessage && (
        <FormHelperText error role="alert" id={errorId} sx={{ ml: 0, mt: 0 }}>
          {errorMessage}
        </FormHelperText>
      )}
    </FormControl>
  );
}

import { useState, useId } from 'react';
import MuiToggleButton from '@mui/material/ToggleButton';
import MuiToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import FormHelperText from '@mui/material/FormHelperText';
import { alpha, type Theme } from '@mui/material/styles';

export type ToggleButtonSize = 'small' | 'medium' | 'large';
export type ToggleButtonColor = 'standard' | 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
export type ToggleButtonOrientation = 'horizontal' | 'vertical';
export type ToggleButtonVariant = 'separated' | 'connected';

export interface ToggleButtonOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface ToggleButtonGroupProps {
  options: ToggleButtonOption[];
  ariaLabel: string;
  value?: string | string[];
  defaultValue?: string | string[];
  exclusive?: boolean;
  color?: ToggleButtonColor;
  size?: ToggleButtonSize;
  orientation?: ToggleButtonOrientation;
  disabled?: boolean;
  fullWidth?: boolean;
  onChange?: (value: string | string[]) => void;
  label?: string;
  error?: boolean;
  errorMessage?: string;
  /** Layout variant. `separated` renders buttons with a gap and individual rounded corners.
   *  `connected` renders buttons as a joined group sharing borders. Defaults to `separated`. */
  variant?: ToggleButtonVariant;
}

export function ToggleButtonGroup({
  options,
  ariaLabel,
  value: valueProp,
  defaultValue,
  exclusive = true,
  color = 'primary',
  size = 'medium',
  orientation = 'horizontal',
  disabled = false,
  fullWidth = false,
  onChange,
  label,
  error = false,
  errorMessage,
  variant = 'separated',
}: ToggleButtonGroupProps) {
  const isControlled = valueProp !== undefined;
  const helperId = useId();
  const [internalValue, setInternalValue] = useState<string | string[]>(
    defaultValue ?? (exclusive ? '' : [])
  );

  const value = isControlled ? valueProp : internalValue;

  function handleChange(_e: React.MouseEvent, newValue: string | string[]) {
    if (!isControlled) setInternalValue(newValue);
    onChange?.(newValue);
  }

  return (
    <Box sx={{ display: fullWidth ? 'flex' : 'inline-flex', flexDirection: 'column', gap: 0.5, ...(fullWidth && { width: '100%' }) }}>
      {label && (
        <FormLabel
          error={error}
          sx={{ typography: 'body', fontWeight: 700, ...(!error && { color: 'text.primary' }) }}
        >
          {label}
        </FormLabel>
      )}
      <MuiToggleButtonGroup
        value={value}
        exclusive={exclusive}
        color={color}
        size={size}
        orientation={orientation}
        disabled={disabled}
        fullWidth={fullWidth}
        onChange={handleChange}
        aria-label={ariaLabel}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={error && errorMessage ? helperId : undefined}
        sx={(theme: Theme) => ({
          // Separated variant: gap layout with all-rounded corners and full borders on every side.
          // Applied via sx (injected after styleOverrides) so it wins over MUI's built-in
          // connected-layout rules without needing !important in the theme.
          ...(variant === 'separated' && {
            gap: '8px',
            '& .MuiToggleButtonGroup-firstButton, & .MuiToggleButtonGroup-middleButton, & .MuiToggleButtonGroup-lastButton': {
              borderRadius: `${theme.shape.sm}px !important`,
            },
            '&.MuiToggleButtonGroup-horizontal .MuiToggleButtonGroup-middleButton, &.MuiToggleButtonGroup-horizontal .MuiToggleButtonGroup-lastButton': {
              marginLeft: '0 !important',
              borderLeft: `1px solid ${theme.palette.border.input} !important`,
            },
            '&.MuiToggleButtonGroup-horizontal .MuiToggleButtonGroup-middleButton.Mui-selected, &.MuiToggleButtonGroup-horizontal .MuiToggleButtonGroup-lastButton.Mui-selected': {
              borderLeft: `1px solid ${theme.palette.primary.main} !important`,
            },
            '&.MuiToggleButtonGroup-horizontal .MuiToggleButtonGroup-middleButton.Mui-disabled, &.MuiToggleButtonGroup-horizontal .MuiToggleButtonGroup-lastButton.Mui-disabled': {
              borderLeft: `1px solid ${alpha(theme.palette.border.input, 0.6)} !important`,
            },
            '&.MuiToggleButtonGroup-horizontal .MuiToggleButtonGroup-grouped.Mui-selected + .MuiToggleButtonGroup-grouped.Mui-selected': {
              marginLeft: '0 !important',
              borderLeft: `1px solid ${theme.palette.primary.main} !important`,
            },
            '&.MuiToggleButtonGroup-vertical .MuiToggleButtonGroup-middleButton, &.MuiToggleButtonGroup-vertical .MuiToggleButtonGroup-lastButton': {
              marginTop: '0 !important',
              borderTop: `1px solid ${theme.palette.border.input} !important`,
            },
            '&.MuiToggleButtonGroup-vertical .MuiToggleButtonGroup-middleButton.Mui-selected, &.MuiToggleButtonGroup-vertical .MuiToggleButtonGroup-lastButton.Mui-selected': {
              borderTop: `1px solid ${theme.palette.primary.main} !important`,
            },
            '&.MuiToggleButtonGroup-vertical .MuiToggleButtonGroup-middleButton.Mui-disabled, &.MuiToggleButtonGroup-vertical .MuiToggleButtonGroup-lastButton.Mui-disabled': {
              borderTop: `1px solid ${alpha(theme.palette.border.input, 0.6)} !important`,
            },
          }),
          ...(error && {
            '& .MuiToggleButton-root': { borderColor: theme.palette.error.main },
            '& .MuiToggleButton-root.Mui-selected': { borderColor: theme.palette.error.main },
            '&.MuiToggleButtonGroup-horizontal .MuiToggleButtonGroup-middleButton, &.MuiToggleButtonGroup-horizontal .MuiToggleButtonGroup-lastButton': { borderLeftColor: theme.palette.error.main },
          }),
        })}
      >
        {options.map((opt) => (
          <MuiToggleButton key={opt.value} value={opt.value} disabled={opt.disabled} aria-label={opt.label} disableRipple>
            {opt.label}
          </MuiToggleButton>
        ))}
      </MuiToggleButtonGroup>
      {error && errorMessage && (
        <FormHelperText id={helperId} error sx={{ mx: 0 }}>
          {errorMessage}
        </FormHelperText>
      )}
    </Box>
  );
}

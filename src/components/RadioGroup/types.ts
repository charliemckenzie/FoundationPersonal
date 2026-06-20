import type React from 'react';
import type { SxProps, Theme } from '@mui/material/styles';

export interface RadioOption {
  value: string;
  label: string;
  description?: string;
  icon?: string;
  disabled?: boolean;
}

export type RadioGroupVariant = 'default' | 'boxed' | 'card' | 'button';
export type RadioGroupDirection = 'column' | 'row';
export type RadioColor = 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success' | 'default';
export type RadioSize = 'small' | 'medium';

export interface RadioGroupProps {
  legend?: string;
  options: RadioOption[];
  variant?: RadioGroupVariant;
  value?: string;
  defaultValue?: string;
  direction?: RadioGroupDirection;
  color?: RadioColor;
  size?: RadioSize;
  helperText?: React.ReactNode;
  /**
   * Where the helper text renders relative to the control.
   * `'bottom'` (default) keeps it below the options; `'top'` renders it between
   * the legend and the options, in DOM order before the control — useful for
   * descriptive guidance the member should read before answering.
   */
  helperTextPosition?: 'top' | 'bottom';
  errorMessage?: string;
  error?: boolean;
  disabled?: boolean;
  required?: boolean;
  legendBold?: boolean;
  legendSx?: SxProps<Theme>;
  cardDirection?: 'column' | 'row';
  onChange?: (value: string) => void;
  name?: string;
}

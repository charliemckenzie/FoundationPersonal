import type React from 'react';

export type CheckboxVariant = 'default' | 'boxed' | 'card' | 'button';
export type CheckboxColor = 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success' | 'default';
export type CheckboxSize = 'small' | 'medium';
export type LabelPlacement = 'end' | 'start' | 'top' | 'bottom';

export interface CheckboxProps {
  label: string;
  description?: string;
  variant?: CheckboxVariant;
  icon?: string;
  cardDirection?: 'column' | 'row';
  checked?: boolean;
  defaultChecked?: boolean;
  indeterminate?: boolean;
  color?: CheckboxColor;
  size?: CheckboxSize;
  labelPlacement?: LabelPlacement;
  helperText?: React.ReactNode;
  /**
   * Where the helper text renders relative to the control.
   * `'bottom'` (default) keeps it below the checkbox; `'top'` renders it above the
   * checkbox row, in DOM order before the control — useful for descriptive guidance
   * the member should read before ticking the box.
   */
  helperTextPosition?: 'top' | 'bottom';
  errorMessage?: string;
  error?: boolean;
  disabled?: boolean;
  required?: boolean;
  onChange?: (checked: boolean) => void;
  id?: string;
  name?: string;
}

import type React from 'react';
import type { SelectOption } from '../Select';

export type SelectAdornmentOption = SelectOption;

export interface SelectAdornmentConfig {
  options: SelectAdornmentOption[];
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  label?: string;
  onChange?: (value: string) => void;
}

export interface InputSelectContainerProps {
  selectAdornment: SelectAdornmentConfig;
  error?: boolean;
  disabled?: boolean;
  focused?: boolean;
  size?: 'small' | 'medium';
  children: React.ReactNode;
  id?: string;
}

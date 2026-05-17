import { TextField, type TextFieldProps } from '../TextField';
import type React from 'react';

export type TextAreaSize = 'small' | 'medium';

export interface TextAreaProps extends Omit<TextFieldProps,
  'type' | 'multiline' | 'condensed' | 'startAdornment' | 'endAdornment' |
  'onChange' | 'onBlur' | 'onFocus'
> {
  rows?: number;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
  onBlur?: React.FocusEventHandler<HTMLTextAreaElement>;
  onFocus?: React.FocusEventHandler<HTMLTextAreaElement>;
}

export function TextArea({ rows = 4, onChange, onBlur, onFocus, ...props }: TextAreaProps) {
  return (
    <TextField
      {...props}
      multiline
      rows={rows}
      onChange={onChange as React.ChangeEventHandler<HTMLInputElement> | undefined}
      onBlur={onBlur as React.FocusEventHandler<HTMLInputElement> | undefined}
      onFocus={onFocus as React.FocusEventHandler<HTMLInputElement> | undefined}
    />
  );
}

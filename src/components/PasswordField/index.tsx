import { useState } from 'react';
import Box from '@mui/material/Box';
import { TextField, type TextFieldProps } from '../TextField';

export type PasswordFieldSize = 'small' | 'medium';

export type PasswordFieldProps = Omit<TextFieldProps, 'type' | 'multiline' | 'rows' | 'endAdornment'>;

export function PasswordField(props: PasswordFieldProps) {
  const [showPassword, setShowPassword] = useState(false);

  const toggle = (
    <Box
      component="button"
      type="button"
      aria-label={showPassword ? 'Hide password' : 'Show password'}
      onClick={() => setShowPassword(v => !v)}
      sx={(t) => ({
        background: 'none',
        border: 'none',
        padding: '0 0.25rem',
        cursor: 'pointer',
        fontSize: t.typography.small.fontSize,
        fontWeight: 600,
        color: 'primary.main',
        lineHeight: 1,
        '&:hover': { opacity: 0.8 },
        '&:focus-visible': {
          outline: `2px solid ${t.palette.border.focus}`,
          outlineOffset: '2px',
          borderRadius: '2px',
        },
      })}
    >
      {showPassword ? 'Hide' : 'Show'}
    </Box>
  );

  return (
    <TextField
      {...props}
      type={showPassword ? 'text' : 'password'}
      endAdornment={toggle}
    />
  );
}

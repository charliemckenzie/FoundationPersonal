import MuiButton from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { alpha } from '@mui/material/styles';
import type { Theme } from '@mui/material/styles';
import { trueBlue } from '../../app/themes/primitives/colors';
import type { IconProps as TablerIconProps } from '@tabler/icons-react';
import { Icon } from '../Icon';
import type React from 'react';

export type ButtonVariant = 'contained' | 'outlined' | 'text' | 'soft';
export type ButtonSize = 'small' | 'medium' | 'large';
export type ButtonColor = 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';

export interface ButtonProps {
  label: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  color?: ButtonColor;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  reversed?: boolean;
  startIcon?: React.ComponentType<TablerIconProps>;
  endIcon?: React.ComponentType<TablerIconProps>;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: 'button' | 'submit' | 'reset';
}

export function Button({
  label,
  variant = 'contained',
  size = 'medium',
  color = 'primary',
  disabled = false,
  loading = false,
  fullWidth = false,
  reversed = false,
  startIcon,
  endIcon,
  onClick,
  type = 'button',
}: ButtonProps) {
  const muiVariant = variant === 'soft' ? 'text' : variant;
  
  const containedStyles = variant === 'contained' ? {
    boxShadow: 'none',
    '&:hover': {
      boxShadow: 'none',
    },
    '&:active': {
      boxShadow: 'none',
    },
  } : undefined;
  
  const softStyles = variant === 'soft' ? {
    backgroundColor: (theme: Theme) => theme.palette.mode === 'dark'
      ? alpha(trueBlue[500], 0.15)
      : alpha(theme.palette[color].main, 0.08),
    color: (theme: Theme) => theme.palette.mode === 'dark'
      ? trueBlue[300]
      : theme.palette[color].main,
    boxShadow: 'none',
    '&:hover': {
      backgroundColor: (theme: Theme) => theme.palette.mode === 'dark'
        ? alpha(trueBlue[500], 0.25)
        : alpha(theme.palette[color].main, 0.15),
    },
    '&:active': {
      backgroundColor: (theme: Theme) => theme.palette.mode === 'dark'
        ? alpha(trueBlue[500], 0.30)
        : alpha(theme.palette[color].main, 0.20),
    },
    '&.Mui-disabled': {
      backgroundColor: (theme: Theme) => theme.palette.action.disabledBackground,
      color: (theme: Theme) => theme.palette.action.disabled,
    },
  } : undefined;
  
  const reversedStyles = reversed ? {
    ...(variant === 'contained' && {
      backgroundColor: (theme: Theme) => theme.palette.common.white,
      // primary.main in dark mode (#3385ff) is 3.54:1 vs white — fails AA. primary.dark (#0051ff) = 5.80:1 ✅
      color: (theme: Theme) => theme.palette.mode === 'dark'
        ? theme.palette[color].dark
        : theme.palette[color].main,
      boxShadow: 'none',
      '&:hover': { backgroundColor: (theme: Theme) => alpha(theme.palette.common.white, 0.88), boxShadow: 'none' },
      '&:active': { backgroundColor: (theme: Theme) => alpha(theme.palette.common.white, 0.80), boxShadow: 'none' },
      '&.Mui-disabled': { backgroundColor: (theme: Theme) => alpha(theme.palette.common.white, 0.30), color: (theme: Theme) => alpha(theme.palette.common.white, 0.50) },
    }),
    ...(variant === 'outlined' && {
      borderColor: (theme: Theme) => theme.palette.common.white,
      color: (theme: Theme) => theme.palette.common.white,
      '&:hover': { backgroundColor: (theme: Theme) => alpha(theme.palette.common.white, 0.12), borderColor: (theme: Theme) => theme.palette.common.white },
      '&.Mui-disabled': { borderColor: (theme: Theme) => alpha(theme.palette.common.white, 0.30), color: (theme: Theme) => alpha(theme.palette.common.white, 0.30) },
    }),
    ...(variant === 'text' && {
      color: (theme: Theme) => theme.palette.common.white,
      '&:hover': { backgroundColor: (theme: Theme) => alpha(theme.palette.common.white, 0.12) },
      '&.Mui-disabled': { color: (theme: Theme) => alpha(theme.palette.common.white, 0.30) },
    }),
    ...(variant === 'soft' && {
      backgroundColor: (theme: Theme) => alpha(theme.palette.common.white, 0.15),
      color: (theme: Theme) => theme.palette.common.white,
      '&:hover': { backgroundColor: (theme: Theme) => alpha(theme.palette.common.white, 0.25) },
      '&:active': { backgroundColor: (theme: Theme) => alpha(theme.palette.common.white, 0.30) },
      '&.Mui-disabled': { backgroundColor: (theme: Theme) => alpha(theme.palette.common.white, 0.10), color: (theme: Theme) => alpha(theme.palette.common.white, 0.30) },
    }),
  } : undefined;

  const sizeStyles: Record<ButtonSize, { height: number; paddingLeft: string; paddingRight: string }> = {
    small:  { height: 36, paddingLeft: '16px', paddingRight: '16px' },
    medium: { height: 48, paddingLeft: '24px', paddingRight: '24px' },
    large:  { height: 56, paddingLeft: '28px', paddingRight: '28px' },
  };

  return (
    <MuiButton
      variant={muiVariant}
      size={size}
      color={color}
      disabled={disabled || loading}
      fullWidth={fullWidth}
      startIcon={loading ? <CircularProgress size={16} color="inherit" /> : startIcon ? <Icon icon={startIcon} size={size} color="inherit" /> : undefined}
      endIcon={loading ? undefined : endIcon ? <Icon icon={endIcon} size={size} color="inherit" /> : undefined}
      onClick={onClick}
      type={type}
      sx={(theme) => ({
        ...sizeStyles[size],
        ...(containedStyles ?? softStyles),
        ...reversedStyles,
        '&.Mui-focusVisible': {
          outline: `2px solid ${reversed ? theme.palette.common.white : ((theme.palette[color as keyof typeof theme.palette] as { main?: string })?.main ?? theme.palette.primary.main)}`,
          outlineOffset: '2px',
          boxShadow: 'none',
        },
      })}
    >
      {label}
    </MuiButton>
  );
}

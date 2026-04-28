import MuiIconButton from '@mui/material/IconButton';
import { alpha } from '@mui/material/styles';
import type { Theme } from '@mui/material/styles';
import type React from 'react';
import { Icon, type IconStyle } from '../Icon';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { Tooltip } from '../Tooltip';
import { Spinner } from '../Spinner';

export type IconButtonVariant = 'contained' | 'outlined' | 'ghost' | 'soft';
export type IconButtonSize = 'small' | 'medium' | 'large';
export type IconButtonColor = 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success' | 'default';

export interface IconButtonProps {
  icon: IconDefinition | string;
  iconStyle?: IconStyle;
  label: string;
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  color?: IconButtonColor;
  disabled?: boolean;
  loading?: boolean;
  reversed?: boolean;
  showTooltip?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: 'button' | 'submit' | 'reset';
}

const BUTTON_SIZE_TO_ICON_SIZE = {
  small: 'sm',
  medium: 'md',
  large: 'lg',
} as const;

const SIZE_STYLES: Record<IconButtonSize, { width: number; height: number }> = {
  small:  { width: 36, height: 36 },
  medium: { width: 48, height: 48 },
  large:  { width: 56, height: 56 },
};

const SPINNER_SIZE_MAP: Record<IconButtonSize, 'small' | 'medium' | 'large'> = {
  small: 'small',
  medium: 'small',
  large: 'medium',
};

export function IconButton({
  icon,
  iconStyle = 'solid',
  label,
  variant = 'contained',
  size = 'medium',
  color = 'primary',
  disabled = false,
  loading = false,
  reversed = false,
  showTooltip = true,
  onClick,
  type = 'button',
}: IconButtonProps) {
  const containedStyles = variant === 'contained' ? {
    backgroundColor: (theme: Theme) => theme.palette[color as keyof Theme['palette']].main,
    color: (theme: Theme) => theme.palette[color as keyof Theme['palette']].contrastText,
    boxShadow: 'none',
    '&:hover': {
      backgroundColor: (theme: Theme) => theme.palette[color as keyof Theme['palette']].dark,
      boxShadow: 'none',
    },
    '&:active': {
      backgroundColor: (theme: Theme) => theme.palette[color as keyof Theme['palette']].dark,
      boxShadow: 'none',
    },
    '&.Mui-disabled': {
      backgroundColor: (theme: Theme) => theme.palette.action.disabledBackground,
      color: (theme: Theme) => theme.palette.action.disabled,
    },
  } : undefined;

  const outlinedStyles = variant === 'outlined' ? {
    backgroundColor: 'transparent',
    border: '1px solid',
    borderColor: (theme: Theme) => theme.palette.mode === 'light' 
      ? alpha(theme.palette[color as keyof Theme['palette']].main, 0.5)
      : theme.palette[color as keyof Theme['palette']].main,
    color: (theme: Theme) => theme.palette[color as keyof Theme['palette']].main,
    boxShadow: 'none',
    '&:hover': {
      backgroundColor: (theme: Theme) => alpha(theme.palette[color as keyof Theme['palette']].main, 0.04),
      borderColor: (theme: Theme) => theme.palette[color as keyof Theme['palette']].main,
    },
    '&:active': {
      backgroundColor: (theme: Theme) => alpha(theme.palette[color as keyof Theme['palette']].main, 0.08),
    },
    '&.Mui-disabled': {
      backgroundColor: 'transparent',
      borderColor: (theme: Theme) => theme.palette.action.disabledBackground,
      color: (theme: Theme) => theme.palette.action.disabled,
    },
  } : undefined;
  
  const softStyles = variant === 'soft' ? {
    backgroundColor: (theme: Theme) => theme.palette.mode === 'dark'
      ? alpha(theme.palette[color as keyof Theme['palette']].main, 0.15)
      : alpha(theme.palette[color as keyof Theme['palette']].main, 0.08),
    color: (theme: Theme) => theme.palette.mode === 'dark'
      ? theme.palette[color as keyof Theme['palette']].main
      : theme.palette[color as keyof Theme['palette']].main,
    boxShadow: 'none',
    '&:hover': {
      backgroundColor: (theme: Theme) => theme.palette.mode === 'dark'
        ? alpha(theme.palette[color as keyof Theme['palette']].main, 0.25)
        : alpha(theme.palette[color as keyof Theme['palette']].main, 0.15),
    },
    '&:active': {
      backgroundColor: (theme: Theme) => theme.palette.mode === 'dark'
        ? alpha(theme.palette[color as keyof Theme['palette']].main, 0.30)
        : alpha(theme.palette[color as keyof Theme['palette']].main, 0.20),
    },
    '&.Mui-disabled': {
      backgroundColor: (theme: Theme) => theme.palette.action.disabledBackground,
      color: (theme: Theme) => theme.palette.action.disabled,
    },
  } : undefined;

  const ghostStyles = variant === 'ghost' ? {
    backgroundColor: 'transparent',
    color: (theme: Theme) => theme.palette[color as keyof Theme['palette']].main,
    boxShadow: 'none',
    '&:hover': {
      backgroundColor: (theme: Theme) => alpha(theme.palette[color as keyof Theme['palette']].main, 0.08),
    },
    '&:active': {
      backgroundColor: (theme: Theme) => alpha(theme.palette[color as keyof Theme['palette']].main, 0.12),
    },
    '&.Mui-disabled': {
      backgroundColor: 'transparent',
      color: (theme: Theme) => theme.palette.action.disabled,
    },
  } : undefined;

  const reversedStyles = reversed ? {
    ...(variant === 'contained' && {
      backgroundColor: (theme: Theme) => theme.palette.common.white,
      color: (theme: Theme) => theme.palette.mode === 'dark'
        ? theme.palette[color as keyof Theme['palette']].dark
        : theme.palette[color as keyof Theme['palette']].main,
      boxShadow: 'none',
      '&:hover': { backgroundColor: (theme: Theme) => alpha(theme.palette.common.white, 0.88), boxShadow: 'none' },
      '&:active': { backgroundColor: (theme: Theme) => alpha(theme.palette.common.white, 0.80), boxShadow: 'none' },
      '&.Mui-disabled': { backgroundColor: (theme: Theme) => alpha(theme.palette.common.white, 0.30), color: (theme: Theme) => alpha(theme.palette.common.white, 0.50) },
    }),
    ...(variant === 'outlined' && {
      backgroundColor: 'transparent',
      borderColor: (theme: Theme) => alpha(theme.palette.common.white, 0.5),
      color: (theme: Theme) => theme.palette.common.white,
      '&:hover': { backgroundColor: (theme: Theme) => alpha(theme.palette.common.white, 0.12), borderColor: (theme: Theme) => theme.palette.common.white },
      '&.Mui-disabled': { borderColor: (theme: Theme) => alpha(theme.palette.common.white, 0.30), color: (theme: Theme) => alpha(theme.palette.common.white, 0.30) },
    }),
    ...(variant === 'ghost' && {
      backgroundColor: 'transparent',
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

  const button = (
    <MuiIconButton
      aria-label={label}
      aria-busy={loading}
      size={size}
      color={color === 'default' ? 'default' : undefined}
      disabled={disabled}
      disableRipple
      onClick={loading ? undefined : onClick}
      type={type}
      sx={(theme) => ({
        ...SIZE_STYLES[size],
        ...(containedStyles ?? outlinedStyles ?? softStyles ?? ghostStyles),
        ...reversedStyles,
        ...(loading && {
          cursor: 'not-allowed !important',
          pointerEvents: 'none !important',
        }),
        '&.Mui-disabled, &:disabled': {
          cursor: 'not-allowed !important',
          pointerEvents: 'none !important',
        },
        '&.Mui-focusVisible': {
          outline: `2px solid ${reversed ? theme.palette.common.white : ((theme.palette[color as keyof typeof theme.palette] as { main?: string })?.main ?? theme.palette.primary.main)}`,
          outlineOffset: '2px',
          boxShadow: 'none',
        },
      })}
    >
      {loading ? (
        <Spinner 
          size={SPINNER_SIZE_MAP[size]} 
          color="inherit"
        />
      ) : (
        <Icon 
          icon={icon} 
          style={iconStyle}
          size={BUTTON_SIZE_TO_ICON_SIZE[size]}
          color="inherit"
        />
      )}
    </MuiIconButton>
  );

  return showTooltip ? (
    <Tooltip title={label} placement="top" arrow>
      {button}
    </Tooltip>
  ) : button;
}

import MuiIconButton from '@mui/material/IconButton';
import { alpha } from '@mui/material/styles';
import type { SxProps, Theme } from '@mui/material/styles';
import type React from 'react';
import { Icon } from '../Icon';

export type CloseButtonVariant = 'ghost' | 'soft';
export type CloseButtonSize = 'sm' | 'md';
export type CloseButtonColor = 'muted' | 'error' | 'warning' | 'info' | 'success';

export interface CloseButtonProps {
  onClick: () => void;
  label?: string;
  variant?: CloseButtonVariant;
  color?: CloseButtonColor;
  size?: CloseButtonSize;
  sx?: SxProps<Theme>;
}

const HOVER_ALPHA        = 0.15;
const ACTIVE_ALPHA       = 0.20;
const SOFT_REST_ALPHA    = 0.08;
const SOFT_HOVER_ALPHA   = 0.18;
const SOFT_ACTIVE_ALPHA  = 0.23;

const SIZE_MAP: Record<CloseButtonSize, { dimension: string; iconSize: 'md' | 'lg' }> = {
  sm: { dimension: '2.25rem', iconSize: 'lg' },
  md: { dimension: '2.75rem', iconSize: 'lg' },
};

function buildSx(theme: Theme, variant: CloseButtonVariant | undefined, color: CloseButtonColor) {
  const focusColor = color === 'muted' ? theme.palette.primary.main : theme.palette[color].main;
  const focus = {
    '&.Mui-focusVisible': {
      outline: `2px solid ${focusColor}`,
      outlineOffset: '2px',
      boxShadow: 'none',
    },
  };

  if (color === 'muted') {
    return {
      backgroundColor: variant === 'ghost' ? 'transparent' : theme.palette.background.elevated,
      color: theme.palette.text.muted,
      '&:hover': {
        backgroundColor: alpha(theme.palette.text.primary, HOVER_ALPHA),
        color: theme.palette.text.primary,
      },
      '&:active': {
        backgroundColor: alpha(theme.palette.text.primary, ACTIVE_ALPHA),
        color: theme.palette.text.primary,
      },
      '&.Mui-disabled': {
        backgroundColor: 'transparent',
        color: theme.palette.action.disabled,
      },
      ...focus,
    };
  }

  const iconColor = theme.palette[color].text ?? theme.palette[color].main;
  const isSoft = variant === 'soft';

  return {
    backgroundColor: isSoft ? alpha(theme.palette[color].main, SOFT_REST_ALPHA) : 'transparent',
    color: iconColor,
    '&:hover': {
      backgroundColor: alpha(theme.palette[color].main, isSoft ? SOFT_HOVER_ALPHA : HOVER_ALPHA),
      color: iconColor,
    },
    '&:active': {
      backgroundColor: alpha(theme.palette[color].main, isSoft ? SOFT_ACTIVE_ALPHA : ACTIVE_ALPHA),
      color: iconColor,
    },
    '&.Mui-disabled': {
      backgroundColor: isSoft ? theme.palette.action.disabledBackground : 'transparent',
      color: theme.palette.action.disabled,
    },
    ...focus,
  };
}

export function CloseButton({
  onClick,
  label = 'Close',
  variant,
  color = 'muted',
  size = 'md',
  sx,
}: CloseButtonProps) {
  const { dimension, iconSize } = SIZE_MAP[size];

  return (
    <MuiIconButton
      aria-label={label}
      onClick={onClick}
      disableRipple
      sx={[
        (theme) => ({
          width: dimension,
          height: dimension,
          borderRadius: '50%',
          boxShadow: 'none',
          ...buildSx(theme, variant, color),
        }),
        ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
      ]}
    >
      <Icon icon="xmark" size={iconSize} color="inherit" />
    </MuiIconButton>
  );
}

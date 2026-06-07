import MuiIconButton from '@mui/material/IconButton';
import type { SxProps, Theme } from '@mui/material/styles';
import type React from 'react';
import { Icon } from '../Icon';
import {
  buildSoftStyles,
  buildGhostStyles,
  buildMutedGhostStyles,
  buildMutedElevatedStyles,
  buildFocusStyles,
  type ButtonColorKeyResolved,
} from '../buttons/variantStyles';

export type CloseButtonVariant = 'ghost' | 'soft';
export type CloseButtonColor = 'muted' | 'error' | 'warning' | 'info' | 'success';

export interface CloseButtonProps {
  onClick: () => void;
  label?: string;
  variant?: CloseButtonVariant;
  color?: CloseButtonColor;
  sx?: SxProps<Theme>;
}

export function CloseButton({
  onClick,
  label = 'Close',
  variant,
  color = 'muted',
  sx,
}: CloseButtonProps) {
  const isMuted = color === 'muted';
  const resolvedColor: ButtonColorKeyResolved = isMuted ? 'primary' : color;
  const variantStyles = isMuted
    ? (variant === 'ghost' ? buildMutedGhostStyles() : buildMutedElevatedStyles())
    : (variant === 'soft' ? buildSoftStyles(resolvedColor) : buildGhostStyles(resolvedColor));

  return (
    <MuiIconButton
      aria-label={label}
      onClick={onClick}
      disableRipple
      sx={[
        {
          width: '2.75rem',
          height: '2.75rem',
          borderRadius: '50%',
          ...variantStyles,
          ...buildFocusStyles(false, resolvedColor),
        },
        ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
      ]}
    >
      <Icon icon="xmark" size="lg" color="inherit" />
    </MuiIconButton>
  );
}

import MuiIconButton from '@mui/material/IconButton';
import type { SxProps, Theme } from '@mui/material/styles';
import type React from 'react';
import { Icon, type IconStyle } from '../Icon';
import { Tooltip } from '../Tooltip';
import { Spinner } from '../Spinner';
import {
  buildContainedStyles,
  buildSoftStyles,
  buildGhostStyles,
  buildOutlinedStyles,
  buildReversedStyles,
  buildFocusStyles,
  type ButtonColorKey,
  type ButtonColorKeyResolved,
  type ButtonVariantKey,
} from '../buttons/variantStyles';

export type IconButtonVariant = ButtonVariantKey;
export type IconButtonSize = 'small' | 'medium' | 'large';
export type IconButtonColor = ButtonColorKey | 'default';

export interface IconButtonProps {
  icon: string;
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
  sx?: SxProps<Theme>;
}

const BUTTON_SIZE_TO_ICON_SIZE = {
  small: 'md',
  medium: 'lg',
  large: 'xl',
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
  sx,
}: IconButtonProps) {
  const resolvedColor: ButtonColorKeyResolved =
    color === 'default' || color === 'white' ? 'primary' : color;

  const variantStyles =
    variant === 'contained' ? buildContainedStyles(resolvedColor)
    : variant === 'soft'    ? buildSoftStyles(resolvedColor)
    : variant === 'ghost'   ? buildGhostStyles(resolvedColor)
    : buildOutlinedStyles(resolvedColor);

  const reversedStyles = reversed ? buildReversedStyles(variant, resolvedColor) : undefined;

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
      sx={{
        ...SIZE_STYLES[size],
        ...variantStyles,
        ...reversedStyles,
        ...(loading && {
          cursor: 'not-allowed !important',
          pointerEvents: 'none !important',
        }),
        '&.Mui-disabled, &:disabled': {
          cursor: 'not-allowed !important',
          pointerEvents: 'none !important',
        },
        ...buildFocusStyles(reversed || color === 'white', resolvedColor),
        ...(sx as object),
      }}
    >
      {loading ? (
        <Spinner size={SPINNER_SIZE_MAP[size]} color="inherit" />
      ) : (
        <Icon icon={icon} style={iconStyle} size={BUTTON_SIZE_TO_ICON_SIZE[size]} color="inherit" />
      )}
    </MuiIconButton>
  );

  return showTooltip ? (
    <Tooltip title={label} placement="top" arrow>
      {button}
    </Tooltip>
  ) : button;
}

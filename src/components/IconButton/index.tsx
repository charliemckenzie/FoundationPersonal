import MuiIconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
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
  condensed?: boolean;
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

// Sizes in rem so they scale with browser font size and user zoom preferences.
const SIZE_STYLES: Record<IconButtonSize, { width: string; height: string }> = {
  small:  { width: '2.25rem', height: '2.25rem' },
  medium: { width: '3rem',    height: '3rem' },
  large:  { width: '3.5rem',  height: '3.5rem' },
};

const CONDENSED_REDUCTION = '0.25rem';

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
  condensed = false,
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

  const condensedWidth = condensed
    ? `calc(${SIZE_STYLES[size].width} - ${CONDENSED_REDUCTION})`
    : SIZE_STYLES[size].width;
  const condensedHeight = condensed
    ? `calc(${SIZE_STYLES[size].height} - ${CONDENSED_REDUCTION})`
    : SIZE_STYLES[size].height;

  const button = (
    <MuiIconButton
      aria-label={label}
      aria-busy={loading}
      size={size}
      color={color === 'default' ? 'default' : undefined}
      disabled={disabled || loading}
      disableRipple
      onClick={onClick}
      type={type}
      sx={[
        {
          width: condensedWidth,
          height: condensedHeight,
          ...variantStyles,
          ...reversedStyles,
          // Belt-and-braces for href-style icon buttons where MUI disabled may not apply.
          '&.Mui-disabled, &:disabled': {
            cursor: 'not-allowed',
            pointerEvents: 'none',
          },
          ...buildFocusStyles(reversed || color === 'white', resolvedColor),
        },
        ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
      ]}
    >
      {loading ? (
        <Box component="span" role="status" aria-label="Loading" sx={{ display: 'inline-flex' }}>
          <Spinner size={SPINNER_SIZE_MAP[size]} color="inherit" />
        </Box>
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

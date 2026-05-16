import MuiButton from '@mui/material/Button';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { Icon, type IconSize } from '../Icon';
import React from 'react';
import type { SxProps, Theme } from '@mui/material/styles';
import {
  buildContainedStyles,
  buildSoftStyles,
  buildGhostStyles,
  buildOutlinedStyles,
  buildReversedStyles,
  buildWhiteStyles,
  type ButtonColorKey,
  type ButtonVariantKey,
} from '../buttons/variantStyles';

export type ButtonVariant = ButtonVariantKey;
export type ButtonSize = 'small' | 'medium' | 'large';
export type ButtonColor = ButtonColorKey;

export interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  label: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  color?: ButtonColor;
  disabled?: boolean;
  loading?: boolean;
  hideLoadingText?: boolean;
  fullWidth?: boolean;
  reversed?: boolean;
  condensed?: boolean;
  startIcon?: string;
  endIcon?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: 'button' | 'submit' | 'reset';
  sx?: SxProps<Theme>;
}

const iconSizeMap: Record<ButtonSize, IconSize> = {
  small: 'md',
  medium: 'lg',
  large: 'xl',
};

const sizeStyles: Record<ButtonSize, { height: number; px: number }> = {
  small:  { height: 40, px: 2 },
  medium: { height: 48, px: 3 },
  large:  { height: 56, px: 3.5 },
};

const CONDENSED_REDUCTION = 4;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button({
  label,
  variant = 'contained',
  size = 'medium',
  color = 'primary',
  disabled = false,
  loading = false,
  hideLoadingText = true,
  fullWidth = false,
  reversed = false,
  condensed = false,
  startIcon,
  endIcon,
  onClick,
  type = 'button',
  sx: sxProp,
  ...rest
}, ref) {
  const muiVariant = variant === 'soft' || variant === 'ghost' ? 'text' : variant;
  const spinnerSize = size === 'small' ? 14 : size === 'large' ? 18 : 16;
  const showSpinnerOnly = loading && hideLoadingText;
  const hasStartIcon = (!loading && !!startIcon) || (loading && !hideLoadingText);
  const hasEndIcon = !loading && !!endIcon;

  const resolvedColor = color === 'white' ? 'primary' : color;
  const variantStyles =
    color === 'white' && variant === 'contained' ? buildWhiteStyles()
    : variant === 'contained' ? buildContainedStyles(resolvedColor)
    : variant === 'soft'      ? buildSoftStyles(resolvedColor)
    : variant === 'ghost'     ? buildGhostStyles(resolvedColor)
    : buildOutlinedStyles(resolvedColor);

  const reversedStyles = reversed ? buildReversedStyles(variant, resolvedColor) : undefined;

  const startIconNode = (() => {
    if (loading && !hideLoadingText) return <CircularProgress size={spinnerSize} color="inherit" />;
    if (!loading && startIcon) return <Icon icon={startIcon} size={iconSizeMap[size]} color="inherit" />;
    return undefined;
  })();

  return (
    <MuiButton
      ref={ref}
      variant={muiVariant}
      size={size}
      color={resolvedColor}
      disabled={disabled}
      aria-busy={loading}
      fullWidth={fullWidth}
      startIcon={startIconNode}
      endIcon={loading ? undefined : endIcon ? <Icon icon={endIcon} size={iconSizeMap[size]} color="inherit" /> : undefined}
      onClick={loading ? undefined : onClick}
      type={type}
      {...rest}
      sx={[
        (theme) => ({
        ...sizeStyles[size],
        ...(condensed && { height: sizeStyles[size].height - CONDENSED_REDUCTION }),
        ...(hasStartIcon && { paddingRight: `calc(${theme.spacing(sizeStyles[size].px)} + 4px)` }),
        ...(hasEndIcon   && { paddingLeft:  `calc(${theme.spacing(sizeStyles[size].px)} + 4px)` }),
        ...variantStyles,
        ...reversedStyles,
        ...(showSpinnerOnly && { position: 'relative' }),
        ...(loading && {
          cursor: 'not-allowed !important',
          pointerEvents: 'none !important',
        }),
        '&.Mui-disabled, &:disabled': {
          cursor: 'not-allowed !important',
          pointerEvents: 'none !important',
        },
        '&.Mui-focusVisible': {
          outline: `2px solid ${reversed || color === 'white' ? theme.palette.common.white : ((theme.palette[resolvedColor as keyof typeof theme.palette] as { main?: string })?.main ?? theme.palette.primary.main)}`,
          outlineOffset: '2px',
          boxShadow: 'none',
        },
      }),
      ...(Array.isArray(sxProp) ? sxProp : sxProp ? [sxProp] : []),
      ]}
    >
      <Box component="span" sx={{ ...(showSpinnerOnly && { opacity: 0 }) }}>
        {label}
      </Box>
      {showSpinnerOnly && (
        <Box
          component="span"
          sx={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <CircularProgress size={spinnerSize} color="inherit" />
        </Box>
      )}
    </MuiButton>
  );
});

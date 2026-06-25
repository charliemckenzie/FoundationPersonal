import MuiButton from '@mui/material/Button';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { Icon, type IconSize } from '../Icon';
import React from 'react';
import type { SxProps, Theme } from '@mui/material/styles';
import {
  buildContainedStyles,
  buildGhostStyles,
  buildOutlinedStyles,
  buildReversedStyles,
  buildWhiteStyles,
  buildFocusStyles,
  type ButtonColorKey,
  type ButtonColorKeyResolved,
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
  startIconLabel?: string;
  endIcon?: string;
  endIconLabel?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: 'button' | 'submit' | 'reset';
  /** When set, MUI renders the button as a native `<a>` element. */
  href?: string;
  target?: string;
  sx?: SxProps<Theme>;
}

const iconSizeMap: Record<ButtonSize, IconSize> = {
  small: 'md',
  medium: 'lg',
  large: 'xl',
};

// Heights in rem so they scale with browser font size and user zoom preferences.
const sizeStyles: Record<ButtonSize, { height: string; px: number }> = {
  small:  { height: '2.5rem', px: 2 },
  medium: { height: '3rem',   px: 3 },
  large:  { height: '3.5rem', px: 3.5 },
};

// 0.25rem — equivalent to the previous 4px constant.
const CONDENSED_REDUCTION = '0.25rem';

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
  startIconLabel,
  endIcon,
  endIconLabel,
  onClick,
  type = 'button',
  sx: sxProp,
  ...rest
}, ref) {
  const isDisabled = disabled || loading;
  const muiVariant = variant === 'ghost' ? 'text' : variant;
  const spinnerSize = size === 'small' ? 14 : size === 'large' ? 18 : 16;
  const showSpinnerOnly = loading && hideLoadingText;
  const hasStartIcon = (!loading && !!startIcon) || (loading && !hideLoadingText);
  const hasEndIcon = !loading && !!endIcon;

  const resolvedColor: ButtonColorKeyResolved = color === 'white' ? 'primary' : color;
  const variantStyles =
    color === 'white' && variant === 'contained' ? buildWhiteStyles()
    : variant === 'contained' ? buildContainedStyles(resolvedColor)
    : variant === 'ghost'     ? buildGhostStyles(resolvedColor)
    : buildOutlinedStyles(resolvedColor);

  const reversedStyles = reversed ? buildReversedStyles(variant, resolvedColor) : undefined;

  const startIconNode = (() => {
    if (loading && !hideLoadingText) return <CircularProgress size={spinnerSize} color="inherit" />;
    if (!loading && startIcon) return <Icon icon={startIcon} size={iconSizeMap[size]} color="inherit" aria-label={startIconLabel} />;
    return undefined;
  })();

  return (
    <MuiButton
      ref={ref}
      variant={muiVariant}
      size={size}
      color={resolvedColor}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      fullWidth={fullWidth}
      startIcon={startIconNode}
      endIcon={loading ? undefined : endIcon ? <Icon icon={endIcon} size={iconSizeMap[size]} color="inherit" aria-label={endIconLabel} /> : undefined}
      onClick={onClick}
      type={type}
      {...rest}
      sx={[
        (theme) => ({
        height: condensed
          ? `calc(${sizeStyles[size].height} - ${CONDENSED_REDUCTION})`
          : sizeStyles[size].height,
        px: sizeStyles[size].px,
        textDecoration: 'none !important',
        textDecorationLine: 'none !important',
        ...(hasStartIcon && { paddingRight: `calc(${theme.spacing(sizeStyles[size].px)} + 0.25rem)` }),
        ...(hasEndIcon   && { paddingLeft:  `calc(${theme.spacing(sizeStyles[size].px)} + 0.25rem)` }),
        ...variantStyles,
        ...reversedStyles,
        ...(showSpinnerOnly && { position: 'relative' }),
        ...(loading && { pointerEvents: 'none' }),
        ...(loading && !hideLoadingText && { '& .MuiButton-startIcon': { marginRight: '0.75rem' } }),
        // Belt-and-braces for href buttons where MUI disabled may not apply.
        '&.Mui-disabled, &:disabled': {
          cursor: 'not-allowed',
          pointerEvents: 'none',
        },
        '&:hover, &:focus-visible, &:active': {
          textDecoration: 'none !important',
          textDecorationLine: 'none !important',
        },
        ...buildFocusStyles(reversed || color === 'white', resolvedColor),
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
          role="status"
          aria-label="Loading"
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

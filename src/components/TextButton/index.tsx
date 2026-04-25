import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import type { Theme } from '@mui/material/styles';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faArrowRight, faArrowLeft } from '@fortawesome/pro-solid-svg-icons';
import { Icon, type IconSize } from '../Icon';
import type React from 'react';

export type TextButtonSize = 'small' | 'medium' | 'large';
export type TextButtonColor = 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';

export interface TextButtonProps {
  label: string;
  size?: TextButtonSize;
  color?: TextButtonColor;
  disabled?: boolean;
  startIcon?: IconDefinition;
  endIcon?: IconDefinition;
  iconDirection?: 'left' | 'right';
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: 'button' | 'submit' | 'reset';
}

export function TextButton({
  label,
  size = 'medium',
  color = 'primary',
  disabled = false,
  startIcon,
  endIcon,
  iconDirection = 'right',
  onClick,
  type = 'button',
}: TextButtonProps) {
  // Map TextButton size to Icon size
  const iconSizeMap: Record<TextButtonSize, IconSize> = {
    small: 'sm',
    medium: 'md',
    large: 'lg',
  };
  const iconSize = iconSizeMap[size];
  
  // Default arrow icon when none specified
  const defaultIcon = iconDirection === 'left' ? faArrowLeft : faArrowRight;
  const effectiveStartIcon = startIcon || (iconDirection === 'left' && !endIcon ? defaultIcon : undefined);
  const effectiveEndIcon = endIcon || (iconDirection === 'right' && !startIcon ? defaultIcon : undefined);
  
  // Track whether we're using default icons (for hover animation)
  const isUsingDefaultIcon = !startIcon && !endIcon;

  // Font size mapping based on size
  const fontSizeMap: Record<TextButtonSize, string> = {
    small: '0.875rem',   // 14px
    medium: '1rem',      // 16px
    large: '1.125rem',   // 18px
  };

  // Line height mapping
  const lineHeightMap: Record<TextButtonSize, number> = {
    small: 1.43,
    medium: 1.5,
    large: 1.56,
  };

  // Icon wrapper styles (extracted to avoid duplication)
  const iconBoxStyles = (theme: Theme, isDefault: boolean) => ({
    display: 'inline-flex',
    ...(isDefault && {
      transition: theme.transitions.create(['transform'], {
        duration: theme.transitions.duration.short,
      }),
    }),
  });

  return (
    <ButtonBase
      disabled={disabled}
      onClick={onClick}
      type={type}
      sx={(theme: Theme) => ({
        display: 'inline-flex',
        alignItems: 'center',
        gap: theme.spacing(0.75),
        padding: theme.spacing(0.5, 0),
        color: disabled ? theme.palette.action.disabled : theme.palette[color].main,
        fontSize: fontSizeMap[size],
        fontWeight: 700,
        lineHeight: lineHeightMap[size],
        fontFamily: theme.typography.fontFamily,
        textAlign: 'left',
        cursor: disabled ? 'not-allowed' : 'pointer',
        borderRadius: theme.spacing(0.5),
        transition: theme.transitions.create(['color'], {
          duration: theme.transitions.duration.short,
        }),
        '&:hover:not(:disabled)': {
          color: theme.palette[color].dark,
          ...(isUsingDefaultIcon && {
            '& .text-button-icon': {
              transform: iconDirection === 'left' ? `translateX(-${theme.spacing(0.5)})` : `translateX(${theme.spacing(0.5)})`,
            },
          }),
        },
        '&:focus-visible': {
          outline: `2px solid ${theme.palette[color].main}`,
          outlineOffset: '2px',
        },
        '&:active:not(:disabled)': {
          color: theme.palette[color].dark,
        },
        '&:disabled': {
          pointerEvents: 'auto',
        },
      })}
    >
      {effectiveStartIcon && (
        <Box className="text-button-icon" sx={(theme: Theme) => iconBoxStyles(theme, isUsingDefaultIcon)}>
          <Icon icon={effectiveStartIcon} size={iconSize} color="inherit" />
        </Box>
      )}
      <Typography
        component="span"
        sx={{
          fontSize: 'inherit',
          fontWeight: 'inherit',
          lineHeight: 'inherit',
          color: 'inherit',
        }}
      >
        {label}
      </Typography>
      {effectiveEndIcon && (
        <Box className="text-button-icon" sx={(theme: Theme) => iconBoxStyles(theme, isUsingDefaultIcon)}>
          <Icon icon={effectiveEndIcon} size={iconSize} color="inherit" />
        </Box>
      )}
    </ButtonBase>
  );
}

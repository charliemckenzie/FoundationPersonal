import MuiChip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import type { Theme } from '@mui/material/styles';
import type { SxProps } from '@mui/system';
import { cloneElement, isValidElement, type ReactElement } from 'react';
import type React from 'react';

export type ChipVariant = 'filled' | 'outlined';
export type ChipColor = 'default' | 'primary' | 'white';
export type ChipSize = 'x-small' | 'small' | 'medium';
export type ChipSeverity = 'error' | 'warning' | 'info' | 'success';

const whiteSxFilled = {
  backgroundColor: 'background.paper',
  color: 'text.primary',
  '& .MuiChip-deleteIcon': { color: 'inherit' },
  '& .MuiChip-icon': { color: 'inherit' },
} as const;

const whiteSxOutlined = {
  color: 'background.paper',
  borderColor: 'background.paper',
  '& .MuiChip-deleteIcon': { color: 'inherit' },
  '& .MuiChip-icon': { color: 'inherit' },
} as const;

function alertSx(theme: Theme, severity: ChipSeverity, hasIcon: boolean) {
  return {
    '& .MuiChip-label': {
      paddingLeft: theme.spacing(hasIcon ? 0.5 : 1.25),
      paddingRight: theme.spacing(1.25),
    },
    '& .MuiChip-icon': {
      marginLeft: 0,
      marginRight: theme.spacing(-0.25),
    },
    '& .MuiChip-deleteIcon': { color: 'inherit' },
    backgroundColor: theme.palette[severity].background,
    color: theme.palette[severity].text,
    border: `1px solid ${theme.palette[severity].border}`,
  };
}

export interface ChipProps {
  label: string;
  variant?: ChipVariant;
  color?: ChipColor;
  size?: ChipSize;
  /** Always use a circle icon (e.g. circle-plus, circle-check, circle-info) — plain icons lack visual weight at chip scale. */
  icon?: React.ReactElement;
  avatar?: React.ReactElement;
  disabled?: boolean;
  clickable?: boolean;
  onDelete?: () => void;
  onClick?: () => void;
  /** Renders the chip in the alert colour scheme for the given severity. */
  severity?: ChipSeverity;
}

export function Chip({
  label,
  variant = 'filled',
  color = 'default',
  size = 'medium',
  icon,
  avatar,
  disabled = false,
  clickable,
  onDelete,
  onClick,
  severity,
}: ChipProps) {
  const theme = useTheme();
  const isSeverity = Boolean(severity);

  const iconSize = size === 'x-small' ? 'md' : size === 'small' ? 'lg' : 'xl';
  const resolvedIcon = icon && isValidElement(icon)
    ? <Box component="span" sx={{ ml: size === 'medium' ? 0.5 : 0.25, display: 'inline-flex' }}>{cloneElement(icon as ReactElement<{ size?: string; color?: string }>, isSeverity ? { size: iconSize, color: severity } : { size: iconSize, color: 'inherit' })}</Box>
    : icon;

  const smallPaddingSx = {
    '& .MuiChip-label': {
      paddingLeft: theme.spacing(1.5),
      paddingRight: theme.spacing(1.5),
    },
  };
  const xsmallPaddingSx = {
    height: '1.25rem',
    '& .MuiChip-label': {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
    },
  };
  const smallLabelSx = {
    '& .MuiChip-label': {
      fontSize: theme.typography.small.fontSize,
    },
  };
  const xsmallLabelSx = {
    '& .MuiChip-label': {
      fontSize: theme.typography.caption.fontSize,
      fontWeight: 700,
    },
  };
  const iconLabelSx = {
    '& .MuiChip-label': { paddingLeft: theme.spacing(1.25) },
  };

  const isWhite = !isSeverity && color === 'white';
  const muiColor = isSeverity ? severity : color === 'white' ? 'default' : color;
  const baseSx = isSeverity
    ? alertSx(theme, severity as ChipSeverity, Boolean(icon))
    : isWhite
      ? variant === 'outlined' ? whiteSxOutlined : whiteSxFilled
      : undefined;
  const chipSx: SxProps<Theme> = !isSeverity
    ? [baseSx ?? false, size === 'small' && smallPaddingSx, size === 'x-small' && xsmallPaddingSx, size === 'small' && smallLabelSx, size === 'x-small' && xsmallLabelSx, Boolean(icon) && iconLabelSx]
    : [baseSx ?? false, size === 'small' && smallLabelSx, size === 'x-small' && xsmallLabelSx];

  const muiSize = size === 'x-small' ? 'small' : size;

  return (
    <MuiChip
      label={label}
      variant={isSeverity ? 'filled' : variant}
      color={muiColor}
      size={muiSize}
      icon={resolvedIcon}
      avatar={avatar}
      disabled={disabled}
      clickable={clickable}
      onDelete={onDelete}
      onClick={onClick}
      sx={chipSx}
    />
  );
}

import MuiChip from '@mui/material/Chip';
import type { Theme } from '@mui/material/styles';
import type React from 'react';
import { red, amber, blue, green } from '../../app/themes/primitives/colors';

export type ChipVariant = 'filled' | 'outlined';
export type ChipColor = 'default' | 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
export type ChipSize = 'small' | 'medium';
export type ChipSeverity = 'error' | 'warning' | 'info' | 'success';

// Mirrors factory.ts MuiAlert standard-variant colour overrides exactly.
const ALERT_BG_LIGHT: Record<ChipSeverity, string> = {
  error:   red[50],
  warning: amber[50],
  info:    blue[50],
  success: green[50],
};
const ALERT_BG_DARK: Record<ChipSeverity, string> = {
  error:   red[950],
  warning: amber[950],
  info:    blue[950],
  success: green[950],
};

function alertSx(severity: ChipSeverity) {
  return {
    '& .MuiChip-label': {
      paddingLeft: '10px',
      paddingRight: '10px',
    },
    '& .MuiChip-icon': {
      color: 'inherit',
    },
    '& .MuiChip-deleteIcon': { color: 'inherit' },
    backgroundColor: (theme: Theme) =>
      theme.palette.mode === 'dark' ? ALERT_BG_DARK[severity] : ALERT_BG_LIGHT[severity],
    color: (theme: Theme) => theme.palette[severity].text,
  };
}

export interface ChipProps {
  label: string;
  variant?: ChipVariant;
  color?: ChipColor;
  size?: ChipSize;
  icon?: React.ReactElement;
  avatar?: React.ReactElement;
  disabled?: boolean;
  clickable?: boolean;
  onDelete?: () => void;
  onClick?: () => void;
  /** Renders the chip in the alert colour scheme for the given severity. Forces size="small". */
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
  const isSeverity = Boolean(severity);

  return (
    <MuiChip
      label={label}
      variant={isSeverity ? 'filled' : variant}
      color={isSeverity ? severity : color}
      size={isSeverity ? 'small' : size}
      icon={icon}
      avatar={avatar}
      disabled={disabled}
      clickable={clickable}
      onDelete={onDelete}
      onClick={onClick}
      sx={isSeverity ? alertSx(severity as ChipSeverity) : undefined}
    />
  );
}

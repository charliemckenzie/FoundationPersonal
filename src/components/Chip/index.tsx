import MuiChip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import { darken, lighten } from '@mui/material/styles';
import type { Theme } from '@mui/material/styles';
import type React from 'react';
import { Icon } from '../Icon';
import { red, amber, blue, green } from '../../app/themes/primitives/colors';

export type ChipVariant = 'filled' | 'outlined' | 'alert';
export type ChipColor = 'default' | 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
export type ChipSize = 'small' | 'medium';

type SemanticColor = Exclude<ChipColor, 'default'>;

const SEVERITY_ICON_MAP: Partial<Record<ChipColor, string>> = {
  error: 'xmark',
  warning: 'triangle-exclamation',
  info: 'circle-info',
  success: 'circle-check',
};

// Mirrors factory.ts MuiAlert standard-variant colour overrides exactly.
const ALERT_BG_LIGHT: Record<string, string> = {
  error:   red[50],
  warning: amber[50],
  info:    blue[50],
  success: green[50],
};
const ALERT_BG_DARK: Record<string, string> = {
  error:   red[950],
  warning: amber[950],
  info:    blue[950],
  success: green[950],
};

function alertSx(color: ChipColor) {
  const shared = {
    fontSize: '0.8125rem',
    '& .MuiChip-label, & .MuiChip-labelSmall': {
      paddingLeft: '10px',
      paddingRight: '10px',
    },
    '& .MuiChip-icon, & .MuiChip-iconSmall': {
      color: 'inherit',
      marginLeft: '8px',
      marginRight: '4px',
    },
    '& .MuiChip-icon ~ .MuiChip-label, & .MuiChip-icon ~ .MuiChip-labelSmall': {
      paddingLeft: '4px',
    },
    '& .MuiChip-deleteIcon': { color: 'inherit' },
  };
  if (color === 'default') {
    return {
      ...shared,
      backgroundColor: (theme: Theme) => theme.palette.action.hover,
      color: 'text.secondary',
    };
  }
  const c = color as SemanticColor;
  return {
    ...shared,
    backgroundColor: (theme: Theme) =>
      theme.palette.mode === 'dark' ? ALERT_BG_DARK[c] : ALERT_BG_LIGHT[c],
    // Use the exact CSS variable MUI computes for Alert text: darken(palette[c].light, 0.6)
    color: `var(--mui-palette-Alert-${c}Color)`,
  };
}

export interface ChipProps {
  label: string;
  variant?: ChipVariant;
  color?: ChipColor;
  size?: ChipSize;
  icon?: React.ReactElement;
  showSeverityIcon?: boolean;
  avatar?: React.ReactElement;
  disabled?: boolean;
  clickable?: boolean;
  onDelete?: () => void;
  onClick?: () => void;
}

export function Chip({
  label,
  variant = 'filled',
  color = 'default',
  size = 'medium',
  icon,
  showSeverityIcon = false,
  avatar,
  disabled = false,
  clickable,
  onDelete,
  onClick,
}: ChipProps) {
  const isAlert = variant === 'alert';
  const iconName = SEVERITY_ICON_MAP[color];
  const autoIcon = isAlert && showSeverityIcon && iconName;

  // Embed severity icon inside the label so it isn't subject to MUI's icon-slot
  // sizing and negative-margin hacks, which fight with our Box-based Icon component.
  const resolvedLabel: React.ReactNode = autoIcon ? (
    <Box component="span" sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
      <Icon icon={iconName} size="sm" color="inherit" />
      {label}
    </Box>
  ) : label;

  // Explicit icon prop still uses MUI's slot (works fine with plain SVG elements).
  const resolvedIcon = autoIcon ? undefined : icon;

  return (
    <MuiChip
      label={resolvedLabel}
      variant={isAlert ? 'filled' : variant}
      color={color}
      size={size}
      icon={resolvedIcon}
      avatar={avatar}
      disabled={disabled}
      clickable={clickable}
      onDelete={onDelete}
      onClick={onClick}
      sx={isAlert ? alertSx(color) : undefined}
    />
  );
}

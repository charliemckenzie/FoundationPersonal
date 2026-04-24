import type { IconProps as TablerIconProps } from '@tabler/icons-react';
import Box from '@mui/material/Box';
import type React from 'react';

export type IconSize = 'small' | 'medium' | 'large';
export type IconColor =
  | 'inherit'
  | 'primary'
  | 'secondary'
  | 'error'
  | 'warning'
  | 'info'
  | 'success'
  | 'text.primary'
  | 'text.muted'
  | 'text.disabled';

export interface IconProps {
  icon: React.ComponentType<TablerIconProps>;
  size?: IconSize;
  color?: IconColor;
  'aria-label'?: string;
}

const SIZE_MAP: Record<IconSize, number> = {
  small: 16,
  medium: 20,
  large: 24,
};

const COLOR_TO_SX: Record<IconColor, string> = {
  inherit: 'inherit',
  primary: 'primary.main',
  secondary: 'secondary.main',
  error: 'error.main',
  warning: 'warning.main',
  info: 'info.main',
  success: 'success.main',
  'text.primary': 'text.primary',
  'text.muted': 'text.muted',
  'text.disabled': 'text.disabled',
};

export function Icon({ icon: TablerIconComponent, size = 'medium', color = 'inherit', 'aria-label': ariaLabel }: IconProps) {
  return (
    <Box
      component="span"
      aria-label={ariaLabel}
      aria-hidden={ariaLabel ? undefined : true}
      sx={{ display: 'inline-flex', color: COLOR_TO_SX[color], lineHeight: 0 }}
    >
      <TablerIconComponent size={SIZE_MAP[size]} stroke={1.5} />
    </Box>
  );
}

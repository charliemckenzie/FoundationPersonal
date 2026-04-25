import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { IconDefinition, IconPrefix, IconName } from '@fortawesome/fontawesome-svg-core';
import Box from '@mui/material/Box';

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

export type IconStyle = 'solid' | 'regular' | 'light' | 'thin' | 'duotone' | 'sharp';

export interface IconProps {
  icon: IconDefinition | string;
  style?: IconStyle;
  size?: IconSize;
  color?: IconColor;
  'aria-label'?: string;
}

const SIZE_MAP: Record<IconSize, string> = {
  small: '0.875rem',
  medium: '1.25rem',
  large: '1.5rem',
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

const STYLE_TO_PREFIX: Record<IconStyle, IconPrefix> = {
  solid: 'fas',
  regular: 'far',
  light: 'fal',
  thin: 'fat',
  duotone: 'fad',
  sharp: 'fass',
};

export function Icon({ icon, style = 'solid', size = 'medium', color = 'inherit', 'aria-label': ariaLabel }: IconProps) {
  // If icon is a string, convert it to the icon array format [prefix, iconName]
  // Remove "fa-" prefix if present (e.g., "fa-bed-front" -> "bed-front")
  // Default to "house" if empty string provided
  let iconProp: IconDefinition | [IconPrefix, IconName];
  
  if (typeof icon === 'string') {
    const prefix = STYLE_TO_PREFIX[style];
    const iconName = icon.trim() || 'house'; // Default to 'house' if empty
    const name = iconName.replace(/^fa-/, '') as IconName;
    iconProp = [prefix, name];
  } else {
    iconProp = icon;
  }

  return (
    <Box
      component="span"
      aria-label={ariaLabel}
      aria-hidden={ariaLabel ? undefined : true}
      sx={{ display: 'inline-flex', color: COLOR_TO_SX[color], lineHeight: 0, fontSize: SIZE_MAP[size] }}
    >
      <FontAwesomeIcon icon={iconProp} />
    </Box>
  );
}

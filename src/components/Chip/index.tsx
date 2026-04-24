import MuiChip from '@mui/material/Chip';
import type React from 'react';

export type ChipVariant = 'filled' | 'outlined';
export type ChipColor = 'default' | 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
export type ChipSize = 'small' | 'medium';

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
}: ChipProps) {
  return (
    <MuiChip
      label={label}
      variant={variant}
      color={color}
      size={size}
      icon={icon}
      avatar={avatar}
      disabled={disabled}
      clickable={clickable}
      onDelete={onDelete}
      onClick={onClick}
    />
  );
}

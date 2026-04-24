import MuiIconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import type React from 'react';

export type IconButtonSize = 'small' | 'medium' | 'large';
export type IconButtonColor = 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success' | 'default';

export interface IconButtonProps {
  icon: React.ReactNode;
  label: string;
  size?: IconButtonSize;
  color?: IconButtonColor;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: 'button' | 'submit' | 'reset';
}

export function IconButton({
  icon,
  label,
  size = 'medium',
  color = 'default',
  disabled = false,
  onClick,
  type = 'button',
}: IconButtonProps) {
  return (
    <Tooltip title={label}>
      <span>
        <MuiIconButton
          aria-label={label}
          size={size}
          color={color}
          disabled={disabled}
          onClick={onClick}
          type={type}
        >
          {icon}
        </MuiIconButton>
      </span>
    </Tooltip>
  );
}

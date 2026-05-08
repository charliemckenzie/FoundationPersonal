import MuiChip from '@mui/material/Chip';
import type { Theme } from '@mui/material/styles';
import { cloneElement, isValidElement, type ReactElement } from 'react';
import type React from 'react';

export type ChipVariant = 'filled' | 'outlined';
export type ChipColor = 'default' | 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
export type ChipSize = 'small' | 'medium';
export type ChipSeverity = 'error' | 'warning' | 'info' | 'success';

function alertSx(severity: ChipSeverity, hasIcon: boolean) {
  return {
    '& .MuiChip-label': {
      paddingLeft: hasIcon ? '4px' : '10px',
      paddingRight: '10px',
    },
    '& .MuiChip-icon': {
      marginLeft: '0px',
      marginRight: '-2px',
    },
    '& .MuiChip-deleteIcon': { color: 'inherit' },
    backgroundColor: (theme: Theme) => theme.palette[severity].background,
    color: (theme: Theme) => theme.palette[severity].text,
    border: (theme: Theme) => `1px solid ${theme.palette[severity].border}`,
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
  const resolvedIcon = isSeverity && icon && isValidElement(icon)
    ? <span style={{ marginLeft: '2px', display: 'inline-flex' }}>{cloneElement(icon as ReactElement<{ size?: string; color?: string }>, { size: 'lg', color: severity })}</span>
    : icon;

  return (
    <MuiChip
      label={label}
      variant={isSeverity ? 'filled' : variant}
      color={isSeverity ? severity : color}
      size={isSeverity ? 'small' : size}
      icon={resolvedIcon}
      avatar={avatar}
      disabled={disabled}
      clickable={clickable}
      onDelete={onDelete}
      onClick={onClick}
      sx={isSeverity ? alertSx(severity as ChipSeverity, Boolean(icon)) : undefined}
    />
  );
}

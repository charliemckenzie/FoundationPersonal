import MuiBadge from '@mui/material/Badge';
import type React from 'react';

export type BadgeColor = 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success' | 'default';
export type BadgeVariant = 'standard' | 'dot';
export type BadgeAnchorVertical = 'top' | 'bottom';
export type BadgeAnchorHorizontal = 'left' | 'right';

export interface BadgeProps {
  children: React.ReactNode;
  count?: number;
  variant?: BadgeVariant;
  color?: BadgeColor;
  max?: number;
  showZero?: boolean;
  invisible?: boolean;
  anchorVertical?: BadgeAnchorVertical;
  anchorHorizontal?: BadgeAnchorHorizontal;
  ariaLabel?: string;
}

export function Badge({
  children,
  count,
  variant = 'standard',
  color = 'primary',
  max = 99,
  showZero = false,
  invisible = false,
  anchorVertical = 'top',
  anchorHorizontal = 'right',
  ariaLabel,
}: BadgeProps) {
  return (
    <MuiBadge
      badgeContent={variant === 'dot' ? undefined : count}
      variant={variant}
      color={color}
      max={max}
      showZero={showZero}
      invisible={invisible}
      anchorOrigin={{ vertical: anchorVertical, horizontal: anchorHorizontal }}
      slotProps={{ badge: ariaLabel ? { 'aria-label': ariaLabel } : undefined }}
    >
      {children}
    </MuiBadge>
  );
}

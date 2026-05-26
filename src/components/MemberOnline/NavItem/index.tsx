'use client';

import { forwardRef } from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import type { Theme } from '@mui/material/styles';
import { Icon } from '../../Icon';

export type NavItemSize = 'medium' | 'large';
export type NavItemVariant = 'primary' | 'secondary';

export interface NavItemProps {
  label: string;
  icon?: string;
  /** Highlights the item with the active treatment (filled background + accent bar on `primary`). */
  active?: boolean;
  /** Renders a trailing chevron — use for parent items that open a flyout / drill-down. */
  hasChildren?: boolean;
  /** Visual weight. `primary` is for top-level navigation, `secondary` is for compact lists (e.g. quick links). */
  variant?: NavItemVariant;
  size?: NavItemSize;
  /** Render as a Next.js `Link` (when href is provided), an anchor, or a button. Caller wires this. */
  href?: string;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  onMouseEnter?: (event: React.MouseEvent<HTMLElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLElement>) => void;
  /** Forwarded `aria-haspopup` for parent items that open a flyout/menu. */
  'aria-haspopup'?: boolean | 'menu';
  'aria-expanded'?: boolean;
  'aria-controls'?: string;
  /** Optional `component` override (e.g. Next.js Link). */
  component?: React.ElementType;
}

const HEIGHT_MAP: Record<NavItemSize, string> = {
  medium: '2.75rem',
  large: '3rem',
};

function rootSx(
  t: Theme,
  variant: NavItemVariant,
  size: NavItemSize,
  active: boolean,
) {
  const isPrimary = variant === 'primary';
  return {
    position: 'relative',
    width: '100%',
    boxSizing: 'border-box',
    textAlign: 'left',
    justifyContent: 'flex-start',
    minHeight: HEIGHT_MAP[size],
    px: 1.5,
    ...(isPrimary && { py: 1.5 }),
    borderRadius: `${t.shape.sm}px`,
    color: active ? t.palette.primary.main : t.palette.text.primary,
    fontWeight: 500,
    '& .MuiListItemText-primary': { fontWeight: 500 },
    textDecoration: 'none',
    transition: t.transitions.create(['background-color', 'color'], {
      duration: t.transitions.duration.shortest,
    }),
    '&:hover': {
      backgroundColor: t.palette.background.paper,
      color: t.palette.text.link,
      textDecoration: 'none',
    },
    '&:visited': { color: 'inherit' },
    '&.Mui-focusVisible': {
      outline: `2px solid ${t.palette.border.focus}`,
      outlineOffset: '-2px',
      backgroundColor: 'transparent',
    },
    ...(isPrimary && {
      '&::before': {
        content: '""',
        position: 'absolute',
        left: '-0.75rem',
        top: 0,
        bottom: 0,
        width: '0.25rem',
        borderTopRightRadius: `${t.shape.xs}px`,
        borderBottomRightRadius: `${t.shape.xs}px`,
        backgroundColor: active ? t.palette.primary.main : 'transparent',
      },
    }),
  };
}

export const NavItem = forwardRef<HTMLElement, NavItemProps>(function NavItem(
  {
    label,
    icon,
    active = false,
    hasChildren = false,
    variant = 'primary',
    size = 'medium',
    href,
    onClick,
    onMouseEnter,
    onFocus,
    component,
    ...aria
  },
  ref,
) {
  return (
    <ListItemButton
      ref={ref as React.Ref<HTMLDivElement>}
      component={component ?? (href ? 'a' : 'button')}
      href={href}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onFocus={onFocus}
      aria-current={active ? 'page' : undefined}
      aria-haspopup={aria['aria-haspopup']}
      aria-expanded={aria['aria-expanded']}
      aria-controls={aria['aria-controls']}
      disableRipple
      className="link-no-underline"
      sx={(t) => rootSx(t, variant, size, active)}
    >
      {icon !== undefined && (
        <ListItemIcon
          sx={{
            minWidth: '2.25rem',
            color: 'inherit',
          }}
        >
          <Icon
            icon={icon}
            style={active ? 'solid' : 'light'}
            size={variant === 'primary' ? 'xl' : 'lg'}
            color="inherit"
          />
        </ListItemIcon>
      )}
      <ListItemText
        primary={label}
        sx={{ my: 0 }}
        slotProps={{
          primary: {
            sx: {
              fontSize: variant === 'primary' ? '1.125rem' : '1rem',
              fontWeight: 500,
              lineHeight: variant === 'primary' ? 28 / 18 : 1.5,
            },
          },
        }}
      />
      {hasChildren && (
        <Box
          aria-hidden="true"
          sx={{ display: 'inline-flex', alignItems: 'center', color: 'inherit', ml: 1 }}
        >
          <Icon icon="chevron-right" style="solid" size="md" color="inherit" />
        </Box>
      )}
    </ListItemButton>
  );
});

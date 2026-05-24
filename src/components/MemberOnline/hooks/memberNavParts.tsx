'use client';

import Box from '@mui/material/Box';
import type { ReactNode, ForwardedRef } from 'react';
import { forwardRef } from 'react';
import { NavItem, type NavItemSize } from '../NavItem';
import type { LogoSlot, MemberNavItem } from '../types';

interface MemberNavLogoHeaderProps {
  logo: LogoSlot;
  homeHref?: string;
  homeLabel?: string;
  /** Click handler applied to the logo link only (used to close drawer on tap). */
  onClick?: () => void;
  /** Additional sx applied to the surrounding container. */
  containerSx?: import('@mui/material/styles').SxProps<import('@mui/material/styles').Theme>;
  /** Optional trailing slot (close button, etc.). */
  trailing?: ReactNode;
  /** Minimum container height — defaults to 4rem (desktop side nav). */
  minHeight?: string | number;
}

/**
 * The brand-tinted header bar at the top of the SideNav and MobileNavDrawer.
 * Renders the logo optionally wrapped in a focus-styled home link.
 */
export const MemberNavLogoHeader = forwardRef(function MemberNavLogoHeader(
  {
    logo,
    homeHref,
    homeLabel = 'Home',
    onClick,
    containerSx,
    trailing,
    minHeight = '4rem',
  }: MemberNavLogoHeaderProps,
  ref: ForwardedRef<HTMLDivElement>,
) {
  return (
    <Box
      ref={ref}
      sx={[
        (t) => ({
          borderBottom: trailing ? `1px solid ${t.palette.border.subtle}` : undefined,
          display: 'flex',
          alignItems: 'center',
          minHeight,
        }),
        ...(Array.isArray(containerSx) ? containerSx : [containerSx ?? false]),
      ]}
    >
      {homeHref !== undefined ? (
        <Box
          component="a"
          href={homeHref}
          aria-label={homeLabel}
          onClick={onClick}
          className="link-no-underline"
          sx={(t) => ({
            display: 'inline-flex',
            alignItems: 'center',
            borderRadius: `${t.shape.xs}px`,
            color: 'inherit',
            textDecoration: 'none',
            '&:focus-visible': {
              outline: `2px solid ${t.palette.border.focus}`,
              outlineOffset: '4px',
            },
          })}
        >
          {logo}
        </Box>
      ) : (
        logo
      )}
      {trailing && <Box sx={{ ml: 'auto' }}>{trailing}</Box>}
    </Box>
  );
});

interface MemberNavListProps {
  items: MemberNavItem[];
  activeItemId?: string;
  /** Called when any item is clicked. The hook handles the parent-vs-leaf branch. */
  onItemClick: (item: MemberNavItem) => void;
  /** Optional ref setter for each item — used by SideNav to track flyout anchors. */
  itemRef?: (id: string) => (el: HTMLElement | null) => void;
  /** Style variant. 'secondary' renders a quieter section. */
  variant?: 'primary' | 'secondary';
  /** Optional hover handler for parent items. */
  onParentHover?: (item: MemberNavItem) => void;
  /** When set, attaches `aria-expanded`/`aria-controls` for items with children. */
  openFlyoutId?: string | null;
  flyoutIdPrefix?: string;
  /** Override the size prop. 'medium' is the secondary-list default. */
  size?: NavItemSize;
}

/**
 * Renders a vertical list of NavItems. Used by both SideNav (with flyout anchoring)
 * and MobileNavDrawer (without). The component handles the parent-vs-leaf rendering
 * differences (hasChildren, href routing).
 */
export function MemberNavList({
  items,
  activeItemId,
  onItemClick,
  itemRef,
  variant = 'primary',
  onParentHover,
  openFlyoutId,
  flyoutIdPrefix,
  size,
}: MemberNavListProps) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: variant === 'primary' ? 0.25 : 0 }}>
      {items.map((item) => {
        const hasChildren = (item.children?.length ?? 0) > 0;
        const refSetter = itemRef ? itemRef(item.id) : undefined;
        return (
          <NavItem
            key={item.id}
            ref={refSetter}
            label={item.label}
            icon={item.icon}
            active={activeItemId === item.id}
            hasChildren={variant === 'primary' ? hasChildren : false}
            href={variant === 'secondary' ? item.href : hasChildren ? undefined : item.href}
            variant={variant}
            size={size}
            onClick={() => onItemClick(item)}
            onMouseEnter={
              variant === 'primary' && hasChildren && onParentHover
                ? () => onParentHover(item)
                : undefined
            }
            aria-haspopup={variant === 'primary' && hasChildren ? 'menu' : undefined}
            aria-expanded={
              variant === 'primary' && hasChildren ? openFlyoutId === item.id : undefined
            }
            aria-controls={
              variant === 'primary' && hasChildren && flyoutIdPrefix
                ? `${flyoutIdPrefix}-${item.id}`
                : undefined
            }
          />
        );
      })}
    </Box>
  );
}

'use client';

import { useCallback, useState } from 'react';
import type { MouseEvent } from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { BalanceCard } from '../BalanceCard';
import { NavFlyout } from '../NavFlyout';
import { MemberNavLogoHeader, MemberNavList } from '../hooks/memberNavParts';
import {
  DEFAULT_MEMBER_ONLINE_COPY,
  type LogoSlot,
  type MemberBalance,
  type MemberNavItem,
} from '../types';

export interface SideNavProps {
  logo: LogoSlot;
  /** When set, the logo becomes a link to this href (typically `'/'`). */
  homeHref?: string;
  /** Accessible label for the logo link. Defaults to `'Home'`. */
  homeLabel?: string;
  primaryItems: MemberNavItem[];
  secondaryItems?: MemberNavItem[];
  balance?: MemberBalance;
  /** Id of the currently active leaf item. */
  activeItemId?: string;
  /** Fires for leaf items only. Parent items with `children` open the flyout instead. */
  onItemClick?: (item: MemberNavItem) => void;
  lastLoggedIn?: string;
  /**
   * Custom width. When omitted, the SideNav uses responsive defaults:
   * `md` 296px, `lg` 320px, `xl` 352px.
   */
  width?: string | number | { md?: string | number; lg?: string | number; xl?: string | number };
  lastLoggedInLabel?: string;
}

const FLYOUT_ID_PREFIX = 'member-online-flyout';

export function SideNav({
  logo,
  homeHref,
  homeLabel = 'Home',
  primaryItems,
  secondaryItems,
  balance,
  activeItemId,
  onItemClick,
  lastLoggedIn,
  width = { md: '296px', lg: '320px', xl: '352px' },
  lastLoggedInLabel = DEFAULT_MEMBER_ONLINE_COPY.lastLoggedInLabel,
}: SideNavProps) {
  const [openFlyoutId, setOpenFlyoutId] = useState<string | null>(null);
  const [lastFlyoutItem, setLastFlyoutItem] = useState<MemberNavItem | null>(null);
  const [flyoutAnchorEl, setFlyoutAnchorEl] = useState<HTMLElement | null>(null);

  const handleItemClick = useCallback(
    (item: MemberNavItem, event?: MouseEvent<HTMLElement>) => {
      if (item.children !== undefined && item.children.length > 0) {
        if (openFlyoutId === item.id) {
          setOpenFlyoutId(null);
          setFlyoutAnchorEl(null);
          return;
        }
        setLastFlyoutItem(item);
        setFlyoutAnchorEl(event?.currentTarget ?? null);
        setOpenFlyoutId(item.id);
        return;
      }
      setOpenFlyoutId(null);
      setFlyoutAnchorEl(null);
      onItemClick?.(item);
    },
    [onItemClick, openFlyoutId],
  );

  const handleParentHover = useCallback(
    (item: MemberNavItem, event?: MouseEvent<HTMLElement>) => {
      if (openFlyoutId === null) return;
      if (item.children === undefined || item.children.length === 0) return;
      setLastFlyoutItem(item);
      setFlyoutAnchorEl(event?.currentTarget ?? null);
      setOpenFlyoutId(item.id);
    },
    [openFlyoutId],
  );

  const closeFlyout = useCallback(() => {
    setOpenFlyoutId(null);
    setFlyoutAnchorEl(null);
  }, []);

  const flyoutOpen = openFlyoutId !== null;

  return (
    <Box
      component="aside"
      aria-label="Member navigation"
      sx={(t) => ({
        width,
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'background.default',
        borderRight: `1px solid ${t.palette.border.subtle}`,
        height: '100%',
        minHeight: 0,
      })}
    >
      <MemberNavLogoHeader
        logo={logo}
        homeHref={homeHref}
        homeLabel={homeLabel}
        containerSx={{ pt: 3, px: 3, pb: 0.5 }}
      />

      <Box sx={{ flex: 1, overflowY: 'auto', minHeight: 0 }}>
        {balance !== undefined && (
          <Box sx={{ p: 1.5 }}>
            <BalanceCard balance={balance} />
          </Box>
        )}

        <Box component="nav" aria-label="Primary" sx={{ px: 1.5 }}>
          <MemberNavList
            items={primaryItems}
            activeItemId={activeItemId}
            onItemClick={handleItemClick}
            onParentHover={handleParentHover}
            openFlyoutId={openFlyoutId}
            flyoutIdPrefix={FLYOUT_ID_PREFIX}
          />

          {(secondaryItems !== undefined && secondaryItems.length > 0) || lastLoggedIn !== undefined ? (
            <>
              <Divider sx={{ my: 2, mx: 1, borderColor: 'border.subtle' }} />
              {secondaryItems !== undefined && secondaryItems.length > 0 && (
                <Box component="nav" aria-label="Secondary">
                  <MemberNavList
                    items={secondaryItems}
                    activeItemId={activeItemId}
                    onItemClick={handleItemClick}
                    variant="secondary"
                    size="medium"
                  />
                </Box>
              )}
              {lastLoggedIn !== undefined && (
                <>
                  <Divider sx={{ my: 2, mx: 1, borderColor: 'border.subtle' }} />
                  <Box sx={{ px: 1.5, pb: 1 }}>
                    <Typography variant="small" component="p" sx={{ color: 'text.muted', m: 0 }}>
                      {lastLoggedInLabel} {lastLoggedIn}
                    </Typography>
                  </Box>
                </>
              )}
            </>
          ) : null}
        </Box>
      </Box>

      {lastFlyoutItem !== null && flyoutAnchorEl !== null && (
        <NavFlyout
          id={`${FLYOUT_ID_PREFIX}-${lastFlyoutItem.id}`}
          open={flyoutOpen}
          anchorEl={flyoutAnchorEl}
          title={lastFlyoutItem.label}
          items={lastFlyoutItem.children ?? []}
          onClose={closeFlyout}
          onItemSelect={onItemClick}
        />
      )}
    </Box>
  );
}

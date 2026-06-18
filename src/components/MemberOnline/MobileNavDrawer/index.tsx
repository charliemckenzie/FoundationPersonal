'use client';

import { useCallback, useEffect, useId, useRef, useState } from 'react';
import type { MouseEvent } from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import MuiDrawer from '@mui/material/Drawer';
import { CloseButton } from '../../CloseButton';
import { TextButton } from '../../TextButton';
import { Button } from '../../Button';
import { NavItem } from '../NavItem';
import { MemberInfoCard } from '../MemberInfoCard';
import { ThemeSwitcher } from '../ThemeSwitcher';
import { MemberNavLogoHeader, MemberNavList } from '../hooks/memberNavParts';
import {
  DEFAULT_MEMBER_ONLINE_COPY,
  type LogoSlot,
  type MemberBalance,
  type MemberNavItem,
  type MemberUser,
} from '../types';
import type { ThemeMode } from '../../../app/themes/ThemeModeContext';

export interface MobileNavDrawerProps {
  /** Id applied to the drawer paper — used by the trigger's `aria-controls`. */
  id?: string;
  open: boolean;
  onClose: () => void;
  logo: LogoSlot;
  /** When set, the logo becomes a link to this href (typically `'/'`). */
  homeHref?: string;
  /** Accessible label for the logo link. Defaults to `'Home'`. */
  homeLabel?: string;
  user: MemberUser;
  balance: MemberBalance;
  primaryItems: MemberNavItem[];
  secondaryItems?: MemberNavItem[];
  mode: ThemeMode;
  onModeChange: (mode: ThemeMode) => void;
  activeItemId?: string;
  onItemClick?: (item: MemberNavItem) => void;
  onLogout?: () => void;
  lastLoggedIn?: string;
  width?: string | number;
  copy?: Partial<typeof DEFAULT_MEMBER_ONLINE_COPY>;
}

export function MobileNavDrawer({
  id,
  open,
  onClose,
  logo,
  homeHref,
  homeLabel = 'Home',
  user,
  balance,
  primaryItems,
  secondaryItems,
  mode,
  onModeChange,
  activeItemId,
  onItemClick,
  onLogout,
  lastLoggedIn,
  width = '90vw',
  copy = {},
}: MobileNavDrawerProps) {
  const labels = { ...DEFAULT_MEMBER_ONLINE_COPY, ...copy };
  const drillHeadingId = useId();
  const [drillItem, setDrillItem] = useState<MemberNavItem | null>(null);
  /** The parent NavItem element that opened the drill view — focus returns here on Back. */
  const drillTriggerRef = useRef<HTMLElement | null>(null);
  /** Drill-view heading — focused on entry so the new context is announced. */
  const drillHeadingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!open) setDrillItem(null);
  }, [open]);

  // Move focus into the drill view on entry; restore it to the trigger on Back.
  // preventScroll prevents iOS Safari from triggering scroll-into-view during the
  // translateX transition, which would cancel the animation and show a white panel.
  useEffect(() => {
    if (drillItem !== null) {
      drillHeadingRef.current?.focus({ preventScroll: true });
    } else if (drillTriggerRef.current) {
      drillTriggerRef.current.focus({ preventScroll: true });
      drillTriggerRef.current = null;
    }
  }, [drillItem]);

  const handleItemClick = useCallback(
    (item: MemberNavItem, event?: MouseEvent<HTMLElement>) => {
      if (item.children !== undefined && item.children.length > 0) {
        drillTriggerRef.current = event?.currentTarget ?? null;
        setDrillItem(item);
        return;
      }
      onItemClick?.(item);
      onClose();
    },
    [onClose, onItemClick],
  );

  const handleBack = useCallback(() => setDrillItem(null), []);

  return (
    <MuiDrawer
      open={open}
      onClose={onClose}
      anchor="left"
      slotProps={{
        paper: {
          id,
          'aria-label': 'Member navigation',
          sx: { width, maxWidth: '24rem', overflow: 'hidden', backgroundColor: 'background.paper', backgroundImage: 'none' },
        },
      }}
    >
      <MemberNavLogoHeader
        logo={logo}
        homeHref={homeHref}
        homeLabel={homeLabel}
        onClick={onClose}
        minHeight="4.25rem"
        containerSx={{ px: 2, py: 1.5, justifyContent: 'space-between' }}
        trailing={
          <CloseButton
            onClick={onClose}
            label={labels.closeMenuLabel}
            variant="ghost"
          />
        }
      />

      <Box sx={{ flex: 1, minHeight: 0, position: 'relative', overflow: 'hidden' }}>
        <Box
          sx={{
            display: 'flex',
            width: '200%',
            height: '100%',
            transform: drillItem !== null ? 'translateX(-50%)' : 'translateX(0)',
            transition: 'transform 280ms cubic-bezier(0.4, 0, 0.2, 1)',
            '@media (prefers-reduced-motion: reduce)': { transition: 'none' },
          }}
        >
          <Box
            inert={drillItem !== null || undefined}
            sx={{
              flex: '0 0 50%',
              minWidth: 0,
              display: 'flex',
              flexDirection: 'column',
              overflowY: 'auto',
              pt: 2,
              px: 2,
              pb: 5,
              gap: 2,
            }}
          >
            <MemberInfoCard
              user={user}
              balance={balance}
              totalBalanceLabel={labels.totalBalanceLabel}
              memberNumberLabel={labels.memberNumberLabel}
              copyLabel={labels.copyLabel}
              copiedLabel={labels.copiedLabel}
            />
            <Box component="nav" aria-label="Primary" sx={{ mx: -0.5 }}>
              <MemberNavList
                items={primaryItems}
                activeItemId={activeItemId}
                onItemClick={handleItemClick}
              />
            </Box>
            {secondaryItems !== undefined && secondaryItems.length > 0 && (
              <>
                <Divider sx={{ borderColor: 'border.subtle' }} />
                <Box component="nav" aria-label="Secondary">
                  <MemberNavList
                    items={secondaryItems}
                    activeItemId={activeItemId}
                    onItemClick={handleItemClick}
                    variant="secondary"
                  />
                </Box>
              </>
            )}
            <Divider sx={{ borderColor: 'border.subtle' }} />
            <Box sx={{ mt: 1 }}>
              <ThemeSwitcher
                mode={mode}
                onChange={onModeChange}
                size="medium"
                fullWidth
                lightLabel={labels.lightLabel}
                darkLabel={labels.darkLabel}
              />
            </Box>
            <Button
              label={labels.logoutLabel}
              variant="outlined"
              fullWidth
              onClick={onLogout}
              sx={{ mt: 1, flexShrink: 0 }}
            />
            {lastLoggedIn !== undefined && (
              <Typography variant="small" component="p" sx={{ color: 'text.muted', m: 0, mt: 1, textAlign: 'center' }}>
                {labels.lastLoggedInLabel} {lastLoggedIn}
              </Typography>
            )}
          </Box>

          <Box
            inert={drillItem === null || undefined}
            sx={{
              flex: '0 0 50%',
              minWidth: 0,
              display: 'flex',
              flexDirection: 'column',
              overflowY: 'auto',
              p: 2,
              gap: 2,
            }}
          >
            <Box sx={{ mx: -2 }}>
              <Box sx={{ px: 2, height: 48, display: 'flex', alignItems: 'center' }}>
                <TextButton
                  label={labels.backLabel}
                  startIcon="chevron-left"
                  iconDirection="left"
                  onClick={handleBack}
                />
              </Box>
              <Divider sx={{ borderColor: 'border.subtle' }} />
            </Box>
            <Typography
              id={drillHeadingId}
              ref={drillHeadingRef}
              variant="h5"
              component="h2"
              tabIndex={-1}
              sx={(t) => ({ color: 'text.heading', m: 0, mt: 1, fontSize: t.typography.body.fontSize, lineHeight: 1.5, outline: 'none' })}
            >
              {drillItem?.label}
            </Typography>
            <Box component="nav" aria-labelledby={drillHeadingId} sx={{ mx: -0.5 }}>
              <Box
                component="ul"
                role="list"
                sx={{ display: 'flex', flexDirection: 'column', listStyle: 'none', m: 0, p: 0 }}
              >
                {drillItem?.children?.map((child) => (
                  <Box component="li" key={child.id}>
                    <NavItem
                      label={child.label}
                      description={child.description}
                      icon={child.icon}
                      href={child.href}
                      active={activeItemId === child.id}
                      showAccentBar={false}
                      onClick={() => {
                        child.onClick?.();
                        onItemClick?.(child);
                        onClose();
                      }}
                    />
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </MuiDrawer>
  );
}

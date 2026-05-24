'use client';

import { useCallback, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import MuiDrawer from '@mui/material/Drawer';
import { IconButton } from '../../IconButton';
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
  width?: string | number;
  copy?: Partial<typeof DEFAULT_MEMBER_ONLINE_COPY>;
}

export function MobileNavDrawer({
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
  width = '90vw',
  copy = {},
}: MobileNavDrawerProps) {
  const labels = { ...DEFAULT_MEMBER_ONLINE_COPY, ...copy };
  const [drillItem, setDrillItem] = useState<MemberNavItem | null>(null);

  useEffect(() => {
    if (!open) setDrillItem(null);
  }, [open]);

  const handleItemClick = useCallback(
    (item: MemberNavItem) => {
      if (item.children !== undefined && item.children.length > 0) {
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
          <IconButton
            icon="xmark"
            iconStyle="light"
            label={labels.closeMenuLabel}
            variant="ghost"
            color="primary"
            size="medium"
            condensed
            onClick={onClose}
            showTooltip={false}
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
          }}
        >
          <Box
            aria-hidden={drillItem !== null}
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
            <MemberInfoCard
              user={user}
              balance={balance}
              totalBalanceLabel={labels.totalBalanceLabel}
              memberNumberLabel={labels.memberNumberLabel}
              copyLabel={labels.copyLabel}
              copiedLabel={labels.copiedLabel}
            />
            <ThemeSwitcher
              mode={mode}
              onChange={onModeChange}
              size="medium"
              lightLabel={labels.lightLabel}
              darkLabel={labels.darkLabel}
            />
            <Divider />
            <Box component="nav" aria-label="Primary">
              <MemberNavList
                items={primaryItems}
                activeItemId={activeItemId}
                onItemClick={handleItemClick}
              />
            </Box>
            {secondaryItems !== undefined && secondaryItems.length > 0 && (
              <>
                <Divider />
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
            <Button
              label={labels.logoutLabel}
              variant="outlined"
              fullWidth
              onClick={onLogout}
              sx={{ mt: 1, flexShrink: 0 }}
            />
          </Box>

          <Box
            aria-hidden={drillItem === null}
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
            <Typography variant="h5" sx={{ color: 'text.heading', m: 0, mt: 1, fontSize: '1rem', lineHeight: '1.5rem' }}>
              {drillItem?.label}
            </Typography>
            <Box
              component="nav"
              aria-label={drillItem?.label}
              sx={{ display: 'flex', flexDirection: 'column' }}
            >
              {drillItem?.children?.map((child) => (
                <NavItem
                  key={child.id}
                  label={child.label}
                  icon={child.icon}
                  href={child.href}
                  onClick={() => {
                    child.onClick?.();
                    onItemClick?.(child);
                    onClose();
                  }}
                />
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </MuiDrawer>
  );
}

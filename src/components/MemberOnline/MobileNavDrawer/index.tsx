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
          sx: { width, maxWidth: '24rem', overflow: 'hidden' },
        },
      }}
    >
      <Box
        sx={(t) => ({
          px: 2,
          py: 1.5,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: t.palette.primary.background,
          borderBottom: `1px solid ${t.palette.border.subtle}`,
          minHeight: '3.75rem',
        })}
      >
        {homeHref !== undefined ? (
          <Box
            component="a"
            href={homeHref}
            aria-label={homeLabel}
            onClick={onClose}
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
        <IconButton
          icon="xmark"
          iconStyle="light"
          label={labels.closeMenuLabel}
          variant="ghost"
          color="primary"
          size="small"
          onClick={onClose}
          showTooltip={false}
        />
      </Box>

      <Box
        sx={{
          flex: 1,
          minHeight: 0,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
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
            <Box
              component="nav"
              aria-label="Primary"
              sx={{ display: 'flex', flexDirection: 'column' }}
            >
              {primaryItems.map((item) => (
                <NavItem
                  key={item.id}
                  label={item.label}
                  icon={item.icon}
                  active={activeItemId === item.id}
                  hasChildren={(item.children?.length ?? 0) > 0}
                  href={item.children === undefined ? item.href : undefined}
                  onClick={() => handleItemClick(item)}
                />
              ))}
            </Box>
            {secondaryItems !== undefined && secondaryItems.length > 0 && (
              <>
                <Divider />
                <Box
                  component="nav"
                  aria-label="Secondary"
                  sx={{ display: 'flex', flexDirection: 'column' }}
                >
                  {secondaryItems.map((item) => (
                    <NavItem
                      key={item.id}
                      label={item.label}
                      active={activeItemId === item.id}
                      variant="secondary"
                      href={item.href}
                      onClick={() => handleItemClick(item)}
                    />
                  ))}
                </Box>
              </>
            )}
            <Button
              label={labels.logoutLabel}
              variant="outlined"
              fullWidth
              onClick={onLogout}
              sx={{ mt: 1 }}
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
            <TextButton
              label={labels.backLabel}
              startIcon="chevron-left"
              iconDirection="left"
              onClick={handleBack}
            />
            <Typography variant="h5" sx={{ color: 'text.heading', m: 0 }}>
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

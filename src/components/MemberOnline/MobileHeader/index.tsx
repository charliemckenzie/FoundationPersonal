'use client';

import Box from '@mui/material/Box';
import { IconButton } from '../../IconButton';
import { Button } from '../../Button';
import { DEFAULT_MEMBER_ONLINE_COPY, type LogoSlot } from '../types';

export interface MobileHeaderProps {
  logo: LogoSlot;
  /** When set, the logo becomes a link to this href (typically `'/'`). */
  homeHref?: string;
  /** Accessible label for the logo link. Defaults to `'Home'`. */
  homeLabel?: string;
  onMenuOpen: () => void;
  onSearchOpen?: () => void;
  onLogout?: () => void;
  openMenuLabel?: string;
  searchLabel?: string;
  logoutLabel?: string;
}

export function MobileHeader({
  logo,
  homeHref,
  homeLabel = 'Home',
  onMenuOpen,
  onSearchOpen,
  onLogout,
  openMenuLabel = DEFAULT_MEMBER_ONLINE_COPY.openMenuLabel,
  searchLabel = DEFAULT_MEMBER_ONLINE_COPY.searchPlaceholder,
  logoutLabel = DEFAULT_MEMBER_ONLINE_COPY.logoutLabel,
}: MobileHeaderProps) {
  const logoNode = homeHref !== undefined ? (
    <Box
      component="a"
      href={homeHref}
      aria-label={homeLabel}
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
  ) : logo;

  return (
    <Box
      component="header"
      sx={(t) => ({
        display: 'flex',
        alignItems: 'center',
        gap: 1.5,
        px: 2,
        height: '3.75rem',
        backgroundColor: t.palette.background.elevated,
        borderBottom: `1px solid ${t.palette.border.subtle}`,
      })}
    >
      <IconButton
        icon="bars"
        iconStyle="light"
        label={openMenuLabel}
        variant="ghost"
        color="default"
        size="medium"
        onClick={onMenuOpen}
        showTooltip={false}
      />
      {onSearchOpen !== undefined && (
        <IconButton
          icon="magnifying-glass"
          label={searchLabel}
          variant="soft"
          color="primary"
          size="small"
          onClick={onSearchOpen}
          showTooltip={false}
        />
      )}
      <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>{logoNode}</Box>
      <Button
        label={logoutLabel}
        variant="soft"
        size="small"
        onClick={onLogout}
      />
    </Box>
  );
}

'use client';

import Box from '@mui/material/Box';
import { IconButton } from '../../IconButton';
import { Button } from '../../Button';
import { DEFAULT_MEMBER_ONLINE_COPY, type LogoSlot } from '../types';

export interface MobileHeaderProps {
  logo: LogoSlot;
  /** Logo shown below the `sm` breakpoint. Falls back to `logo` when not set. */
  phoneLogo?: LogoSlot;
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
  phoneLogo,
  homeHref,
  homeLabel = 'Home',
  onMenuOpen,
  onSearchOpen,
  onLogout,
  openMenuLabel = DEFAULT_MEMBER_ONLINE_COPY.openMenuLabel,
  searchLabel = DEFAULT_MEMBER_ONLINE_COPY.searchPlaceholder,
  logoutLabel = DEFAULT_MEMBER_ONLINE_COPY.logoutLabel,
}: MobileHeaderProps) {
  const wrapWithLink = (node: React.ReactNode) => homeHref !== undefined ? (
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
      {node}
    </Box>
  ) : node;

  const logoNode = wrapWithLink(logo);
  const phoneLogoNode = phoneLogo !== undefined ? wrapWithLink(phoneLogo) : null;

  return (
    <Box
      component="header"
      sx={(t) => ({
        display: 'flex',
        alignItems: 'center',
        gap: 1.5,
        px: 2,
        height: '4.25rem',
        backgroundColor: t.palette.background.paper,
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
        condensed
        onClick={onMenuOpen}
        showTooltip={false}
      />
      {onSearchOpen !== undefined && (
        <IconButton
          icon="magnifying-glass"
          label={searchLabel}
          variant="soft"
          color="primary"
          size="medium"
          condensed
          onClick={onSearchOpen}
          showTooltip={false}
        />
      )}
      <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
        {phoneLogoNode !== null ? (
          <>
            <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>{logoNode}</Box>
            <Box sx={{ display: { xs: 'flex', sm: 'none' } }}>{phoneLogoNode}</Box>
          </>
        ) : logoNode}
      </Box>
      <Button
        label={logoutLabel}
        variant="soft"
        size="medium"
        condensed
        onClick={onLogout}
      />
    </Box>
  );
}

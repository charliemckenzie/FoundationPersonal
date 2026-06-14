'use client';

import { useState } from 'react';
import Box from '@mui/material/Box';
import { SideNav } from '../SideNav';
import { MemberHeader } from '../MemberHeader';
import { MobileHeader } from '../MobileHeader';
import { MobileNavDrawer } from '../MobileNavDrawer';
import { MemberFooter } from '../MemberFooter';
import { useThemeMode } from '../../../app/themes/ThemeModeContext';
import type {
  LogoSlot,
  MemberBalance,
  MemberFooterLink,
  MemberNavItem,
  MemberUser,
} from '../types';

export interface MemberOnlineLayoutProps {
  user: MemberUser;
  balance: MemberBalance;
  primaryItems: MemberNavItem[];
  secondaryItems?: MemberNavItem[];
  footerLinks: MemberFooterLink[];
  /** Slot for the brand logo. Used in both the desktop SideNav header and the mobile header / drawer. */
  logo: LogoSlot;
  /** Logo used in the mobile nav drawer. Falls back to `logo`. */
  drawerLogo?: LogoSlot;
  /** Compact mark / icon-only logo used in the mobile header strip. Falls back to `logo`. */
  mobileLogo?: LogoSlot;
  /** When set, the logo becomes a link to this href (typically `'/'`). Applied to SideNav, MobileHeader, and MobileNavDrawer. */
  homeHref?: string;
  /** Accessible label for the logo link. Defaults to `'Home'`. */
  homeLabel?: string;
  activeItemId?: string;
  onItemClick?: (item: MemberNavItem) => void;
  onLogout?: () => void;
  lastLoggedIn?: string;
  footerDisclaimer?: React.ReactNode;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  onSearchSubmit?: (value: string) => void;
  children: React.ReactNode;
}

export function MemberOnlineLayout({
  user,
  balance,
  primaryItems,
  secondaryItems,
  footerLinks,
  logo,
  drawerLogo,
  mobileLogo,
  homeHref,
  homeLabel,
  activeItemId,
  onItemClick,
  onLogout,
  lastLoggedIn,
  footerDisclaimer,
  searchValue,
  onSearchChange,
  onSearchSubmit,
  children,
}: MemberOnlineLayoutProps) {
  const { mode, setMode } = useThemeMode();
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <Box
      sx={(t) => ({
        display: 'flex',
        flexDirection: { xs: 'column', lg: 'row' },
        height: { xs: 'auto', lg: '100vh' },
        minHeight: { xs: '100vh', lg: 'unset' },
        overflow: { xs: 'visible', lg: 'hidden' },
        backgroundColor: t.palette.background.paper,
      })}
    >
      {/* Desktop sidenav — hidden on mobile via CSS */}
      <Box sx={{ display: { xs: 'none', lg: 'flex' } }}>
        <SideNav
          logo={logo}
          homeHref={homeHref}
          homeLabel={homeLabel}
          primaryItems={primaryItems}
          secondaryItems={secondaryItems}
          balance={balance}
          activeItemId={activeItemId}
          onItemClick={onItemClick}
          lastLoggedIn={lastLoggedIn}
        />
      </Box>

      {/* Main column — always the same React subtree */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, overflow: { lg: 'hidden' } }}>
        {/* Mobile header — hidden on desktop via CSS */}
        <Box sx={{ display: { xs: 'flex', lg: 'none' }, position: 'sticky', top: 0, zIndex: 'appBar' }}>
          <MobileHeader
            logo={drawerLogo ?? mobileLogo ?? logo}
            phoneLogo={mobileLogo}
            homeHref={homeHref}
            homeLabel={homeLabel}
            onMenuOpen={() => setDrawerOpen(true)}
            onLogout={onLogout}
          />
        </Box>

        {/* Mobile nav drawer — always mounted, portal-based, invisible when closed */}
        <MobileNavDrawer
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          logo={drawerLogo ?? logo}
          homeHref={homeHref}
          homeLabel={homeLabel}
          user={user}
          balance={balance}
          primaryItems={primaryItems}
          secondaryItems={secondaryItems}
          mode={mode}
          onModeChange={setMode}
          activeItemId={activeItemId}
          onItemClick={onItemClick}
          onLogout={onLogout}
          lastLoggedIn={lastLoggedIn}
        />

        {/* Desktop header — hidden on mobile via CSS */}
        <Box sx={{ display: { xs: 'none', lg: 'block' } }}>
          <MemberHeader
            user={user}
            mode={mode}
            onModeChange={setMode}
            searchValue={searchValue}
            onSearchChange={onSearchChange}
            onSearchSubmit={onSearchSubmit}
            onLogout={onLogout}
          />
        </Box>

        {/* Page content — stable tree position on every viewport */}
        <Box
          component="main"
          sx={{ flex: 1, minHeight: 0, overflowY: { lg: 'auto' } }}
        >
          <Box sx={{ minHeight: '100%', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ flex: 1 }}>
              {children}
            </Box>
            <MemberFooter links={footerLinks} disclaimer={footerDisclaimer} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

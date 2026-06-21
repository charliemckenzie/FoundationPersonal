'use client';

import type React from 'react';
import Box from '@mui/material/Box';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { PageTransition } from '../../components/PageTransition';
import { PAGE_TRANSITION_EXCLUDE } from '../pageTransition.config';
import {
  NAV_ITEMS,
  SECONDARY_NAV_ITEMS,
  PRIMARY_CTA,
  SECONDARY_CTA,
  UTILITY_LINKS,
} from './navData';

export default function PublicWebLayout({ children }: { children: React.ReactNode }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header
        navItems={NAV_ITEMS}
        secondaryNavItems={SECONDARY_NAV_ITEMS}
        primaryCta={PRIMARY_CTA}
        secondaryCta={SECONDARY_CTA}
        utilityLinks={UTILITY_LINKS}
        onSearch={() => {}}
      />
      <Box component="main" sx={{ flex: 1 }}>
        <PageTransition excludePaths={PAGE_TRANSITION_EXCLUDE}>
          {children}
        </PageTransition>
      </Box>
      <Footer />
    </Box>
  );
}

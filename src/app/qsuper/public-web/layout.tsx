'use client';

import type React from 'react';
import Box from '@mui/material/Box';
import { Header } from '../../../components/Header';
import { Footer } from '../../../components/Footer';
import { PageTransition } from '../../../components/PageTransition';
import { PAGE_TRANSITION_EXCLUDE } from '../../pageTransition.config';
import {
  NAV_ITEMS,
  AUDIENCE_LINKS,
  RESOURCE_LINKS,
  PRIMARY_CTA,
  SECONDARY_CTA,
} from './navData';

export default function QSuperPublicWebLayout({ children }: { children: React.ReactNode }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header
        navItems={NAV_ITEMS}
        audienceLinks={AUDIENCE_LINKS}
        resourceLinks={RESOURCE_LINKS}
        activeAudienceHref="/personal"
        primaryCta={PRIMARY_CTA}
        secondaryCta={SECONDARY_CTA}
        onSearch={() => {}}
        searchPlaceholder="Search QSuper"
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

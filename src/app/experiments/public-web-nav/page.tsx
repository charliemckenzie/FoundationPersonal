'use client';

import Box from '@mui/material/Box';
import { Header } from '../../../components/Header';
import { Footer } from '../../../components/Footer';
import { PublicWebExperimentThemeProvider } from '../../public-web/PublicWebExperimentThemeProvider';
import {
  NAV_ITEMS,
  SECONDARY_NAV_ITEMS,
  PRIMARY_CTA,
  SECONDARY_CTA,
  UTILITY_LINKS,
} from '../../public-web/navData';
import {
  HeroSection,
  QuickLinksSection,
  FeesSection,
  InvestmentStrategySection,
  AwardsSection,
  AppointmentsSection,
  MembershipBenefitsSection,
  MobileAppSection,
} from './home';

export default function PublicWebNavExperimentPage() {
  return (
    <PublicWebExperimentThemeProvider>
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header
          navItems={NAV_ITEMS}
          secondaryNavItems={SECONDARY_NAV_ITEMS}
          primaryCta={PRIMARY_CTA}
          secondaryCta={SECONDARY_CTA}
          utilityLinks={UTILITY_LINKS}
          homepageBlend
          onSearch={(query) => console.log('search:', query)}
        />

        <Box
          component="main"
          sx={{
            flex: 1,
            color: 'text.primary',
            '& a, & a:hover, & a:focus, & a:active': {
              textDecoration: 'none',
            },
          }}
        >
          <HeroSection />
          <QuickLinksSection />
          <FeesSection />
          <InvestmentStrategySection />
          <AwardsSection />
          <AppointmentsSection />
          <MembershipBenefitsSection />
          <MobileAppSection />
        </Box>

        <Footer />
      </Box>
    </PublicWebExperimentThemeProvider>
  );
}
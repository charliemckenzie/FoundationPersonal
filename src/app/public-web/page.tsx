import Box from '@mui/material/Box';
import { PublicWebExperimentThemeProvider } from './PublicWebExperimentThemeProvider';
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

export default function PublicWebPage() {
  return (
    <PublicWebExperimentThemeProvider>
      <Box
        sx={{
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
    </PublicWebExperimentThemeProvider>
  );
}

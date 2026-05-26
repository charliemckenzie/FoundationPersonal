'use client';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Alert } from '../../components/Alert';
import { Breadcrumb } from '../../components/Breadcrumb';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { Footer } from '../../components/Footer';
import { Header } from '../../components/Header';
import { HeroIcon } from '../../components/HeroIcon';
import { IconList, type IconListItem } from '../../components/IconList';
import { SkipLinks } from '../../components/SkipLinks';
import type { CtaAction, NavItem } from '../../components/Header/types';

const NAV_ITEMS: NavItem[] = [
  { type: 'link', label: 'Why ART?', href: '#' },
  { type: 'link', label: 'Super', href: '#' },
  { type: 'link', label: 'Retirement', href: '#' },
  { type: 'link', label: 'Investments', href: '#' },
];

const PRIMARY_CTA: CtaAction = { label: 'Log in', href: '#login' };
const SECONDARY_CTA: CtaAction = { label: 'Join', href: '#join' };

const STATS: { value: string; label: string }[] = [
  { value: '$16B', label: 'in unclaimed super held by the ATO' },
  { value: '6M+', label: 'accounts waiting to be claimed' },
  { value: '$3,800', label: 'average unclaimed amount per account' },
];

const STEPS: IconListItem[] = [
  {
    heading: 'Log in to myGov',
    headingComponent: 'h3',
    text: 'Sign in to myGov and link the ATO to access your super history.',
  },
  {
    heading: 'Run SuperMatch',
    headingComponent: 'h3',
    text: 'The ATO\'s free SuperMatch tool finds every super account registered in your name across Australia.',
  },
  {
    heading: 'Contact old employers',
    headingComponent: 'h3',
    text: 'Reach out to former employers if you think super was paid but doesn\'t show up in your search.',
  },
  {
    heading: 'Combine into ART',
    headingComponent: 'h3',
    text: 'Roll everything into your ART account — one balance, one set of fees, compounding together.',
  },
];

const BENEFITS: IconListItem[] = [
  { text: 'One balance working harder for your retirement' },
  { text: 'No duplicate administration fees eating into your savings' },
  { text: 'Easier to track and manage a single account' },
  { text: 'Every dollar consolidated compounds over time' },
];

export function LostSuperClient() {
  return (
    <>
      <SkipLinks />
      <Header
        navItems={NAV_ITEMS}
        primaryCta={PRIMARY_CTA}
        secondaryCta={SECONDARY_CTA}
      />

      <Box component="main" id="main-content">

        {/* Hero */}
        <Box sx={{ bgcolor: 'background.tintNeutralCool', pt: { xs: 3, md: 4 }, pb: { xs: 7, md: 12 } }}>
          <Container maxWidth="lg">
            <Breadcrumb
              items={[
                { label: 'Home', href: '#' },
                { label: 'Super', href: '#' },
                { label: 'Find lost super' },
              ]}
            />
            <Box
              sx={{
                mt: { xs: 4, md: 6 },
                display: { xs: 'block', md: 'grid' },
                gridTemplateColumns: '1fr auto',
                gap: 8,
                alignItems: 'center',
              }}
            >
              <Box>
                <Typography variant="display-4" component="h1" sx={{ mb: 2 }}>
                  Find your lost super
                </Typography>
                <Typography variant="lead" component="p" sx={{ color: 'text.secondary', mb: 4, maxWidth: '38rem' }}>
                  Billions of dollars in super are sitting unclaimed across Australia. Search for lost accounts
                  and combine them into your ART account — it's free and takes around 15 minutes.
                </Typography>
                <Stack sx={{ flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
                  <Button
                    label="Search with the ATO"
                    variant="contained"
                    size="large"
                    endIcon="arrow-up-right-from-square"
                  />
                  <Button label="Roll it into ART" variant="outlined" size="large" />
                </Stack>
              </Box>
              <Box sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
                <HeroIcon
                  name="Consolidate Icon"
                  brand="art"
                  size="3xl"
                  background="brand"
                  aria-label="Illustration of super accounts being combined"
                />
              </Box>
            </Box>
          </Container>
        </Box>

        {/* Stats */}
        <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>
          <Grid container spacing={3}>
            {STATS.map(({ value, label }) => (
              <Grid key={value} size={{ xs: 12, sm: 4 }}>
                <Card variant="contained">
                  <Typography variant="display-4" component="p" sx={{ color: 'primary.main', mb: 1 }}>
                    {value}
                  </Typography>
                  <Typography variant="body" component="p" sx={{ color: 'text.secondary' }}>
                    {label}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>

        {/* Steps */}
        <Box sx={{ bgcolor: 'background.tintNeutralCool', py: { xs: 6, md: 10 } }}>
          <Container maxWidth="lg">
            <Box sx={{ maxWidth: '44rem' }}>
              <Typography variant="h2" sx={{ mb: 1.5 }}>
                How to find your lost super
              </Typography>
              <Typography variant="body" component="p" sx={{ color: 'text.secondary', mb: 5 }}>
                The process takes around 15 minutes. You'll need a myGov account linked to the ATO.
              </Typography>
              <IconList items={STEPS} listType="ol" size="lg" />
              <Box sx={{ mt: 4 }}>
                <Alert
                  severity="info"
                  title="SuperMatch is free — always"
                  message="You don't need to pay anyone to find your lost super. If a third party charges you to search, that's a red flag. Use the ATO's official SuperMatch tool at my.gov.au."
                />
              </Box>
            </Box>
          </Container>
        </Box>

        {/* Benefits */}
        <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
          <Box sx={{ maxWidth: '44rem' }}>
            <Typography variant="h2" sx={{ mb: 1.5 }}>
              Why consolidate into ART?
            </Typography>
            <Typography variant="body" component="p" sx={{ color: 'text.secondary', mb: 4 }}>
              Every extra account costs you in fees and complexity. Combining means more of your money working for you.
            </Typography>
            <IconList items={BENEFITS} size="md" defaultIcon="circle-check" iconColor="success" />
          </Box>
        </Container>

        {/* CTA */}
        <Box sx={{ bgcolor: 'background.tintNeutralCool', py: { xs: 8, md: 12 } }}>
          <Container maxWidth="lg">
            <Box sx={{ maxWidth: '36rem' }}>
              <Typography variant="h2" sx={{ mb: 2 }}>
                Ready to roll it all in?
              </Typography>
              <Typography variant="body" component="p" sx={{ color: 'text.secondary', mb: 4 }}>
                Combining your super is straightforward. Log in to Member Online and we'll walk you through
                transferring other accounts into ART — usually done in under 5 minutes.
              </Typography>
              <Stack sx={{ flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
                <Button label="Log in to Member Online" variant="contained" size="large" />
                <Button
                  label="Search with the ATO"
                  variant="ghost"
                  size="large"
                  endIcon="arrow-up-right-from-square"
                />
              </Stack>
            </Box>
          </Container>
        </Box>

      </Box>
      <Footer />
    </>
  );
}

'use client';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Accordion, type AccordionItem } from '../../components/Accordion';
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
  { value: '15%', label: 'contributions tax rate — vs up to 47% at your marginal rate' },
  { value: '$30,000', label: 'annual concessional cap — includes your employer\'s SG contributions' },
  { value: 'Tax free', label: 'investment earnings in retirement phase' },
];

const STEPS: IconListItem[] = [
  {
    heading: 'Check your eligibility',
    headingComponent: 'h3',
    text: 'Most employees can salary sacrifice. Confirm your employer offers it — they\'re not legally required to, but most do.',
  },
  {
    heading: 'Decide how much',
    headingComponent: 'h3',
    text: 'Choose a fixed dollar amount or a percentage of your gross salary. Keep an eye on the $30,000 concessional cap.',
  },
  {
    heading: 'Complete an agreement with payroll',
    headingComponent: 'h3',
    text: 'Your employer will have a salary sacrifice form. Submit it to payroll and confirm when it takes effect.',
  },
  {
    heading: 'Contributions go straight into ART',
    headingComponent: 'h3',
    text: 'Your employer redirects the agreed amount to your ART account each pay cycle, taxed at just 15%.',
  },
];

const CONSIDERATIONS: IconListItem[] = [
  { text: 'Your employer\'s compulsory SG contributions count toward the $30,000 cap — factor this in.' },
  { text: 'High-income earners (income > $250k) pay an extra 15% Division 293 tax on concessional contributions.' },
  { text: 'Salary sacrifice may affect leave entitlements or overtime calculations — check your award or EBA.' },
  { text: 'Contributions are preserved in super until you meet a condition of release.' },
];

export function SalarySacrificeClient() {
  const FAQ_ITEMS: AccordionItem[] = [
    {
      id: 'part-time',
      title: 'Can I salary sacrifice if I\'m part-time or casual?',
      content: (
        <Typography variant="body" component="p">
          Yes, if your employer offers salary sacrifice arrangements. Part-time employees follow the same process
          as full-time — you choose an amount and your employer redirects it pre-tax. Casuals should confirm
          with their employer as arrangements may vary.
        </Typography>
      ),
    },
    {
      id: 'sg-contributions',
      title: 'Does salary sacrifice affect my employer\'s SG contributions?',
      content: (
        <Typography variant="body" component="p">
          From 1 January 2020, employers must calculate the Superannuation Guarantee on your ordinary time
          earnings — not your post-sacrifice salary. This means salary sacrificing should not reduce your
          employer's compulsory super contributions. If you're unsure, check with your payroll team.
        </Typography>
      ),
    },
    {
      id: 'change-or-stop',
      title: 'Can I change or stop my salary sacrifice at any time?',
      content: (
        <Typography variant="body" component="p">
          Yes. You can adjust or cancel your arrangement by notifying your employer. Changes typically take
          effect from the next pay cycle, though this depends on your employer's payroll schedule. Check your
          salary sacrifice agreement for the notice period.
        </Typography>
      ),
    },
    {
      id: 'exceed-cap',
      title: 'What happens if I exceed the $30,000 concessional cap?',
      content: (
        <Typography variant="body" component="p">
          Excess concessional contributions are included in your assessable income and taxed at your marginal
          rate — with a 15% offset to account for contributions tax already paid. The ATO will notify you
          if you've exceeded the cap. You can carry forward unused cap amounts from prior years if your
          super balance is under $500,000.
        </Typography>
      ),
    },
  ];

  return (
    <>
      <SkipLinks />
      <Header navItems={NAV_ITEMS} primaryCta={PRIMARY_CTA} secondaryCta={SECONDARY_CTA} />

      <Box component="main" id="main-content">

        {/* Hero */}
        <Box sx={{ bgcolor: 'background.tintNeutralCool', pt: { xs: 3, md: 4 }, pb: { xs: 7, md: 12 } }}>
          <Container maxWidth="lg">
            <Breadcrumb
              items={[
                { label: 'Home', href: '#' },
                { label: 'Super', href: '#' },
                { label: 'Salary sacrifice' },
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
                  Salary sacrifice into super
                </Typography>
                <Typography variant="lead" component="p" sx={{ color: 'text.secondary', mb: 4, maxWidth: '38rem' }}>
                  Redirect part of your pre-tax salary into super. Contributions are taxed at just 15% —
                  potentially saving you thousands compared to your marginal tax rate.
                </Typography>
                <Stack sx={{ flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
                  <Button label="Set it up" variant="contained" size="large" />
                  <Button label="Use our calculator" variant="outlined" size="large" endIcon="calculator" />
                </Stack>
              </Box>
              <Box sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
                <HeroIcon
                  name="Contributions Icon"
                  brand="art"
                  size="3xl"
                  background="brand"
                  aria-label="Illustration of super contributions growing"
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

        {/* How it works */}
        <Box sx={{ bgcolor: 'background.tintNeutralCool', py: { xs: 6, md: 10 } }}>
          <Container maxWidth="lg">
            <Box sx={{ maxWidth: '44rem' }}>
              <Typography variant="h2" sx={{ mb: 1.5 }}>
                How to set it up
              </Typography>
              <Typography variant="body" component="p" sx={{ color: 'text.secondary', mb: 5 }}>
                The process runs through your employer — ART doesn't need to be involved until contributions start flowing.
              </Typography>
              <IconList items={STEPS} listType="ol" size="lg" />
              <Box sx={{ mt: 4 }}>
                <Alert
                  severity="info"
                  title="Check your cap before you start"
                  message="Your employer's Superannuation Guarantee (SG) contributions count toward your $30,000 concessional cap. Make sure your salary sacrifice amount doesn't push you over."
                />
              </Box>
            </Box>
          </Container>
        </Box>

        {/* Key considerations */}
        <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
          <Box sx={{ maxWidth: '44rem' }}>
            <Typography variant="h2" sx={{ mb: 1.5 }}>
              Things to consider first
            </Typography>
            <Typography variant="body" component="p" sx={{ color: 'text.secondary', mb: 4 }}>
              Salary sacrifice suits most people but there are a few things worth knowing before you start.
            </Typography>
            <IconList
              items={CONSIDERATIONS}
              size="md"
              defaultIcon="circle-info"
              iconColor="info"
            />
          </Box>
        </Container>

        {/* FAQ */}
        <Box sx={{ bgcolor: 'background.tintNeutralCool', py: { xs: 6, md: 10 } }}>
          <Container maxWidth="lg">
            <Box sx={{ maxWidth: '44rem' }}>
              <Typography variant="h2" sx={{ mb: 1.5 }}>
                Common questions
              </Typography>
              <Typography variant="body" component="p" sx={{ color: 'text.secondary', mb: 4 }}>
                Quick answers to the most frequently asked salary sacrifice questions.
              </Typography>
              <Accordion items={FAQ_ITEMS} variant="default" />
            </Box>
          </Container>
        </Box>

        {/* CTA */}
        <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
          <Box sx={{ maxWidth: '36rem' }}>
            <Typography variant="h2" sx={{ mb: 2 }}>
              Ready to boost your super?
            </Typography>
            <Typography variant="body" component="p" sx={{ color: 'text.secondary', mb: 4 }}>
              Talk to your payroll team to get your salary sacrifice arrangement in place. If you need
              help working out how much to contribute, our financial advisers can guide you.
            </Typography>
            <Stack sx={{ flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
              <Button label="Log in to Member Online" variant="contained" size="large" />
              <Button label="Talk to a financial adviser" variant="outlined" size="large" />
            </Stack>
          </Box>
        </Container>

      </Box>
      <Footer />
    </>
  );
}

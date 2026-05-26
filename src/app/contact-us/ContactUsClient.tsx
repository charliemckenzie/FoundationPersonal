'use client';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Accordion, type AccordionItem } from '../../components/Accordion';
import { Alert } from '../../components/Alert';
import { Breadcrumb } from '../../components/Breadcrumb';
import { Card } from '../../components/Card';
import { Divider } from '../../components/Divider';
import { Footer } from '../../components/Footer';
import { Header } from '../../components/Header';
import { HeroIcon } from '../../components/HeroIcon';
import { SkipLinks } from '../../components/SkipLinks';
import { TextButton } from '../../components/TextButton';
import type { CtaAction, NavItem } from '../../components/Header/types';

const NAV_ITEMS: NavItem[] = [
  { type: 'link', label: 'Why ART?', href: '#' },
  { type: 'link', label: 'Super', href: '#' },
  { type: 'link', label: 'Retirement', href: '#' },
  { type: 'link', label: 'Investments', href: '#' },
];

const PRIMARY_CTA: CtaAction = { label: 'Log in', href: '#login' };
const SECONDARY_CTA: CtaAction = { label: 'Join', href: '#join' };

interface Channel {
  icon: string;
  heading: string;
  description: string;
  cta: string;
  ctaIcon: string;
}

const CHANNELS: Channel[] = [
  {
    icon: 'Call',
    heading: 'Call us',
    description: 'Speak with our team for account enquiries, insurance changes, complaints, and general support.',
    cta: '13 11 84',
    ctaIcon: 'phone',
  },
  {
    icon: 'Chat',
    heading: 'Live chat',
    description: 'Chat online with a team member during business hours via our website or the ART app.',
    cta: 'Start a chat',
    ctaIcon: 'message',
  },
  {
    icon: 'Email 1',
    heading: 'Secure message',
    description: 'Send a secure message through Member Online. We aim to respond within 2 business days.',
    cta: 'Log in to message us',
    ctaIcon: 'envelope',
  },
  {
    icon: 'Location',
    heading: 'Find a branch',
    description: 'Meet with a team member face-to-face. Appointments available at branches across Australia.',
    cta: 'Find your nearest branch',
    ctaIcon: 'location-dot',
  },
];

const HOURS: { day: string; time: string }[] = [
  { day: 'Monday – Friday', time: '8:00am – 7:00pm AEST' },
  { day: 'Saturday', time: '9:00am – 5:00pm AEST' },
  { day: 'Sunday', time: 'Closed' },
  { day: 'Public holidays', time: 'Closed' },
];

export function ContactUsClient() {
  const FAQ_ITEMS: AccordionItem[] = [
    {
      id: 'hours',
      title: 'What are your opening hours?',
      content: (
        <Typography variant="body" component="p">
          Our team is available Monday to Friday 8:00am – 7:00pm AEST and Saturday 9:00am – 5:00pm AEST.
          We're closed Sundays and public holidays. Live chat availability matches phone hours.
        </Typography>
      ),
    },
    {
      id: 'update-details',
      title: 'How do I update my personal details?',
      content: (
        <Typography variant="body" component="p">
          Log in to Member Online or the ART app to update your address, phone number, email, or tax file number.
          For name changes, you'll need to provide certified documentation — contact us and we'll guide you through it.
        </Typography>
      ),
    },
    {
      id: 'lost-super',
      title: 'I think I have super in another fund — what do I do?',
      content: (
        <Typography variant="body" component="p">
          Use the ATO's free SuperMatch tool at myGov to find all super accounts registered in your name.
          Once you've found them, you can roll them all into your ART account online. Visit our{' '}
          <Box component="a" href="/lost-super" sx={{ color: 'primary.main' }}>
            find lost super
          </Box>{' '}
          page for step-by-step instructions.
        </Typography>
      ),
    },
    {
      id: 'complaints',
      title: 'How do I make a complaint?',
      content: (
        <Typography variant="body" component="p">
          We take complaints seriously and aim to resolve them within 45 days. Call us on 13 11 84,
          send a secure message through Member Online, or write to us at GPO Box XXXX, Brisbane QLD 4001.
          If you're not satisfied with our response, you can escalate to the Australian Financial Complaints
          Authority (AFCA) at afca.org.au.
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
        <Box sx={{ bgcolor: 'background.tintNeutralCool', pt: { xs: 3, md: 4 }, pb: { xs: 7, md: 10 } }}>
          <Container maxWidth="lg">
            <Breadcrumb items={[{ label: 'Home', href: '#' }, { label: 'Contact us' }]} />
            <Box sx={{ mt: { xs: 4, md: 6 }, maxWidth: '42rem' }}>
              <Typography variant="display-4" component="h1" sx={{ mb: 2 }}>
                Contact us
              </Typography>
              <Typography variant="lead" component="p" sx={{ color: 'text.secondary', mb: 4 }}>
                We're here to help with your super, retirement, insurance, and account questions.
                Choose the channel that works best for you.
              </Typography>
              <Alert
                severity="info"
                message="Our phone lines are currently experiencing higher than usual wait times. Live chat and secure message are the fastest ways to reach us right now."
              />
            </Box>
          </Container>
        </Box>

        {/* Contact channels */}
        <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
          <Typography variant="h2" sx={{ mb: 1.5 }}>
            Ways to get in touch
          </Typography>
          <Typography variant="body" component="p" sx={{ color: 'text.secondary', mb: 5 }}>
            All channels are staffed by ART team members — no outsourced call centres.
          </Typography>
          <Grid container spacing={3}>
            {CHANNELS.map(({ icon, heading, description, cta, ctaIcon }) => (
              <Grid key={heading} size={{ xs: 12, sm: 6 }}>
                <Card variant="contained" sx={{ height: '100%' }}>
                  <Stack sx={{ gap: 2.5, height: '100%' }}>
                    <HeroIcon name={icon} brand="art" size="lg" background="brand" aria-hidden />
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="h4" component="h3" sx={{ mb: 1 }}>
                        {heading}
                      </Typography>
                      <Typography variant="body" component="p" sx={{ color: 'text.secondary' }}>
                        {description}
                      </Typography>
                    </Box>
                    <Divider />
                    <TextButton label={cta} endIcon={ctaIcon} size="medium" />
                  </Stack>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>

        {/* Hours */}
        <Box sx={{ bgcolor: 'background.tintNeutralCool', py: { xs: 6, md: 10 } }}>
          <Container maxWidth="lg">
            <Box sx={{ maxWidth: '32rem' }}>
              <Typography variant="h2" sx={{ mb: 4 }}>
                Business hours
              </Typography>
              <Stack
                component="dl"
                sx={{ gap: 0, margin: 0, padding: 0 }}
              >
                {HOURS.map(({ day, time }, index) => (
                  <Box key={day}>
                    <Box
                      sx={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        py: 2,
                      }}
                    >
                      <Typography variant="body" component="dt" sx={{ fontWeight: 600 }}>
                        {day}
                      </Typography>
                      <Typography
                        variant="body"
                        component="dd"
                        sx={{ margin: 0, color: time === 'Closed' ? 'text.secondary' : 'text.primary' }}
                      >
                        {time}
                      </Typography>
                    </Box>
                    {index < HOURS.length - 1 && <Divider />}
                  </Box>
                ))}
              </Stack>
            </Box>
          </Container>
        </Box>

        {/* FAQ */}
        <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
          <Box sx={{ maxWidth: '44rem' }}>
            <Typography variant="h2" sx={{ mb: 1.5 }}>
              Frequently asked questions
            </Typography>
            <Typography variant="body" component="p" sx={{ color: 'text.secondary', mb: 4 }}>
              Quick answers to the most common questions.
            </Typography>
            <Accordion items={FAQ_ITEMS} variant="default" />
          </Box>
        </Container>

      </Box>
      <Footer />
    </>
  );
}

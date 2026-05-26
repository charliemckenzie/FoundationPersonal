'use client';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Card } from '../components/Card';
import { Divider } from '../components/Divider';
import { HeroIcon } from '../components/HeroIcon';

interface PageEntry {
  href: string;
  icon: string;
  title: string;
  description: string;
}

const CONTENT_PAGES: PageEntry[] = [
  {
    href: '/lost-super',
    icon: 'Search',
    title: 'Find lost super',
    description: 'How to search for unclaimed super accounts and roll them into ART.',
  },
  {
    href: '/contact-us',
    icon: 'Call',
    title: 'Contact us',
    description: 'Phone, live chat, secure message, and branch options with business hours and FAQ.',
  },
  {
    href: '/salary-sacrifice',
    icon: 'Contributions Icon',
    title: 'Salary sacrifice',
    description: 'How pre-tax salary sacrifice contributions work, the cap, and how to set it up.',
  },
];

const DEMO_PAGES: PageEntry[] = [
  {
    href: '/member-online',
    icon: 'MO',
    title: 'Member Online',
    description: 'Member portal dashboard demo — balance, investments, quick actions, and nudges.',
  },
  {
    href: '/beneficiaries',
    icon: 'People',
    title: 'Beneficiaries',
    description: 'Nominated beneficiary management flow demo.',
  },
];

function PageGrid({ pages }: { pages: PageEntry[] }) {
  return (
    <Grid container spacing={3}>
      {pages.map(({ href, icon, title, description }) => (
        <Grid key={href} size={{ xs: 12, sm: 6, md: 4 }}>
          <Card variant="contained" href={href} sx={{ height: '100%' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <HeroIcon name={icon} brand="art" size="md" background="brand" aria-hidden />
              <Box>
                <Typography variant="h5" component="h3" sx={{ mb: 0.5 }}>
                  {title}
                </Typography>
                <Typography variant="body" component="p" sx={{ color: 'text.secondary' }}>
                  {description}
                </Typography>
              </Box>
            </Box>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default function Home() {
  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: { xs: 6, md: 10 } }}>
      <Container maxWidth="lg">
        <Typography variant="display-5" component="h1" sx={{ mb: 1 }}>
          Foundation
        </Typography>
        <Typography variant="lead" component="p" sx={{ color: 'text.secondary', mb: 8 }}>
          Page index — select a page to preview.
        </Typography>

        <Typography variant="h3" sx={{ mb: 3 }}>
          Content pages
        </Typography>
        <PageGrid pages={CONTENT_PAGES} />

        <Divider sx={{ my: 6 }} />

        <Typography variant="h3" sx={{ mb: 3 }}>
          Demo pages
        </Typography>
        <PageGrid pages={DEMO_PAGES} />
      </Container>
    </Box>
  );
}

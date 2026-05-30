'use client';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import NextLink from 'next/link';
import { Card } from '../components/Card';
import { Chip } from '../components/Chip';
import { Divider } from '../components/Divider';

interface PageLink {
  label: string;
  href: string;
}

interface Section {
  heading: string;
  pages: PageLink[];
}

interface Brand {
  name: string;
  sections: Section[];
}

const ART: Brand = {
  name: 'ART',
  sections: [
    {
      heading: 'Public Web',
      pages: [
        { label: 'Base', href: '/public-web' },
        { label: 'News Article', href: '#' },
        { label: 'Content Page', href: '#' },
        { label: 'Homepage', href: '#' },
      ],
    },
    {
      heading: 'Member Online',
      pages: [
        { label: 'Authentication', href: '/member-online/login' },
        { label: 'Portal', href: '/member-online' },
        { label: 'Stepped form', href: '/member-online/beneficiaries' },
      ],
    },
    {
      heading: 'Adviser Online',
      pages: [
        { label: 'Authentication', href: '/adviser-online/login' },
        { label: 'Portal', href: '/adviser-online' },
      ],
    },
    {
      heading: 'App',
      pages: [],
    },
  ],
};

const QSUPER: Brand = {
  name: 'QSuper',
  sections: [
    {
      heading: 'Public Web',
      pages: [
        { label: 'Base', href: '/qsuper/public-web' },
        { label: 'News Article', href: '#' },
        { label: 'Content Page', href: '#' },
        { label: 'Homepage', href: '#' },
      ],
    },
    {
      heading: 'Member Online',
      pages: [
        { label: 'Authentication', href: '/qsuper/member-online/login' },
        { label: 'Portal', href: '/qsuper/member-online' },
        { label: 'Stepped form', href: '/qsuper/member-online/beneficiaries' },
      ],
    },
    {
      heading: 'App',
      pages: [],
    },
  ],
};

const BRANDS = [ART, QSUPER];

const BRAND_ACCENT: Record<string, string> = {
  ART: 'primary.main',
  QSuper: 'tertiary.main',
};

interface SectionCardProps {
  section: Section;
}

function SectionCard({ section }: SectionCardProps) {
  return (
    <Card variant="contained">
      <Stack spacing={2}>
        <Typography variant="h6" component="h3" sx={{ color: 'text.muted' }}>
          {section.heading}
        </Typography>
        {section.pages.length === 0 ? (
          <Box>
            <Chip label="Coming soon" variant="filled" color="default" size="small" />
          </Box>
        ) : (
          <Stack component="ul" spacing={0.75} sx={{ m: 0, p: 0, listStyle: 'none' }}>
            {section.pages.map((page) => {
              const isDisabled = page.href === '#';
              return (
                <Box component="li" key={page.label}>
                  {isDisabled ? (
                    <Typography variant="body" component="span" sx={{ color: 'text.disabled' }}>
                      {page.label}
                    </Typography>
                  ) : (
                    <Typography
                      component={NextLink}
                      href={page.href}
                      variant="body"
                      sx={{
                        color: 'primary.main',
                        textDecoration: 'none',
                        '&:hover': { textDecoration: 'underline' },
                      }}
                    >
                      {page.label}
                    </Typography>
                  )}
                </Box>
              );
            })}
          </Stack>
        )}
      </Stack>
    </Card>
  );
}

interface BrandColumnProps {
  brand: Brand;
}

function BrandColumn({ brand }: BrandColumnProps) {
  const accent = BRAND_ACCENT[brand.name] ?? 'primary.main';
  return (
    <Stack spacing={3}>
      <Box
        sx={{
          borderLeft: '3px solid',
          borderColor: accent,
          pl: 2,
          py: 0.5,
        }}
      >
        <Typography variant="h3" component="h2">
          {brand.name}
        </Typography>
      </Box>
      {brand.sections.map((section) => (
        <SectionCard key={section.heading} section={section} />
      ))}
    </Stack>
  );
}

export default function Home() {
  return (
    <Box
      component="main"
      sx={{ bgcolor: 'background.default', minHeight: '100vh', py: { xs: 6, md: 10 } }}
    >
      <Container maxWidth="lg">
        <Box sx={{ mb: { xs: 6, md: 8 } }}>
          <Chip label="Design System" variant="outlined" color="default" size="small" />
          <Typography variant="display-5" component="h1" sx={{ mt: 2, mb: 1 }}>
            Foundation
          </Typography>
          <Typography variant="lead" component="p" sx={{ color: 'text.secondary', mb: 4 }}>
            A directory of the templates currently available in Foundation.
          </Typography>
          <Divider />
        </Box>

        <Grid container spacing={{ xs: 4, md: 6 }}>
          {BRANDS.map((brand, i) => (
            <Grid key={brand.name} size={{ xs: 12, md: 6 }}>
              {i > 0 && (
                <Box sx={{ display: { xs: 'block', md: 'none' }, mb: 4 }}>
                  <Divider />
                </Box>
              )}
              <BrandColumn brand={brand} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

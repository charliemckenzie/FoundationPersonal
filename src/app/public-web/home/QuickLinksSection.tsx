'use client';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { HomepageQuickLinks } from './HomepageQuickLinks';
import { HOMEPAGE_CONTAINER_SX } from './templateOverrides';

const QUICK_LINK_ITEMS = [
  {
    label: 'Join as a member',
    description: 'It takes less than 5 minutes to join.',
    href: '/join',
    icon: 'house-chimney-user',
  },
  {
    label: 'Investment returns',
    description: 'Over 13 options with a mix of diversified and asset classes',
    href: '/investments/returns',
    icon: 'chart-line-up',
  },
  {
    label: 'Fees',
    description: 'We pride ourselves on lower then average industry fees',
    href: '/fees',
    icon: 'circle-dollar',
  },
  {
    label: 'Insurance',
    description: 'Protect you and your loved ones from the unexpected.',
    href: '/insurance',
    icon: 'umbrella',
  },
  {
    label: 'Compare us',
    description: 'How do we stack up against other super funds?',
    href: '/why/compare',
    icon: 'award',
  },
];

export function QuickLinksSection() {
  return (
    <Box
      sx={{
        py: { xs: 5, md: 6 },
        bgcolor: '#145EFF',
        borderTop: '1px solid rgba(255,255,255,0.2)',
        boxShadow: '0 -12px 32px rgba(0,0,0,0.12)',
        position: 'relative',
        zIndex: 2,
      }}
    >
      <Container maxWidth={false} sx={HOMEPAGE_CONTAINER_SX}>
        <Typography
          component="p"
          variant="h5"
          sx={{
            display: { xs: 'block', md: 'none' },
            color: 'text.inverse',
            mb: 3,
          }}
        >
          Quick links
        </Typography>
        <HomepageQuickLinks items={QUICK_LINK_ITEMS} />
      </Container>
    </Box>
  );
}

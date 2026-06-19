'use client';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { HOMEPAGE_CONTAINER_SX } from './templateOverrides';

const AWARDS = [
  {
    src: '/images/homepage/award-money-magazine-2026.png',
    alt: 'Money Magazine Lifecycle product by MoneyMagazine',
    label: 'Best mysuper lifecycle product by\nMoneyMagazine',
  },
  {
    src: '/images/homepage/award-finder-2023.png',
    alt: '#1 for customer satisfaction by Canstar',
    label: '#1 for customer satisfaction by\nFinder',
  },
  {
    src: '/images/homepage/award-super-review-2025.png',
    alt: 'Super fund of the year by Super Review',
    label: 'Super fund of the year by Super\nReview',
  },
  {
    src: '/images/homepage/award-canstar-2025.png',
    alt: 'Outstanding value by Canstar',
    label: 'Outstanding value by Canstar',
  },
];

export function AwardsSection() {
  return (
    <Box sx={{ py: { xs: 6, md: 8 }, bgcolor: 'background.paper' }}>
      <Container maxWidth={false} sx={HOMEPAGE_CONTAINER_SX}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
            gap: { xs: 4, md: 6 },
            textAlign: 'center',
          }}
        >
          {AWARDS.map((award) => (
            <Box key={award.alt} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
              <Box
                component="img"
                src={award.src}
                alt={award.alt}
                sx={{ width: '100%', maxWidth: '7rem', height: 'auto', objectFit: 'contain' }}
              />
              <Typography variant="caption" sx={{ color: 'text.muted', whiteSpace: 'pre-line' }}>
                {award.label}
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}

'use client';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { HOMEPAGE_CONTAINER_SX } from './templateOverrides';

const AWARDS = [
  {
    src: '/images/homepage/award-money-magazine-2026.png',
    alt: 'Money Magazine Lifecycle product by MoneyMagazine',
    label: 'Best mysuper lifecycle product by MoneyMagazine',
    mobileImageWidth: '6.5rem',
    imageWidth: '8.75rem',
  },
  {
    src: '/images/homepage/award-finder-2023.png',
    alt: '#1 for customer satisfaction by Canstar',
    label: '#1 for customer satisfaction by Finder',
    mobileImageWidth: '6rem',
    imageWidth: '8rem',
  },
  {
    src: '/images/homepage/award-super-review-2025.png',
    alt: 'Super fund of the year by Super Review',
    label: 'Super fund of the year by Super Review',
    mobileImageWidth: '6.25rem',
    imageWidth: '8.25rem',
  },
  {
    src: '/images/homepage/award-canstar-2025.png',
    alt: 'Outstanding value by Canstar',
    label: 'Outstanding value by Canstar',
    mobileImageWidth: '5.75rem',
    imageWidth: '7.5rem',
  },
];

export function AwardsSection() {
  return (
    <Box
      sx={{
        py: '3.5rem',
        bgcolor: 'background.paper',
        borderBottom: '1px solid #DADEE5',
      }}
    >
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
                sx={{
                  width: '100%',
                  minHeight: { xs: '4.75rem', md: '5.5rem' },
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Box
                  component="img"
                  src={award.src}
                  alt={award.alt}
                  sx={{
                    width: '100%',
                    maxWidth: { xs: award.mobileImageWidth, md: award.imageWidth },
                    height: 'auto',
                    objectFit: 'contain',
                  }}
                />
              </Box>
              <Typography
                component="p"
                variant="body"
                sx={{
                  color: 'text.muted',
                  fontSize: { xs: '0.875rem', md: '1rem' },
                  maxWidth: '17.5rem',
                  mx: 'auto',
                }}
              >
                {award.label}
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}

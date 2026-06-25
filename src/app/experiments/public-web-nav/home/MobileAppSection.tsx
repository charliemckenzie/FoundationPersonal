'use client';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Button } from '../../../../components/Button';
import { HOMEPAGE_CONTAINER_SX } from './templateOverrides';

export function MobileAppSection() {
  return (
    <Box sx={{ bgcolor: 'background.default', pt: { xs: 6, md: 8 }, pb: { xs: 0, md: 0 }, overflow: 'hidden' }}>
      <Container maxWidth={false} sx={HOMEPAGE_CONTAINER_SX}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(12, minmax(0, 1fr))' },
            columnGap: { md: '1.5rem' },
            rowGap: { xs: '3rem', md: 0 },
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              gridColumn: { md: '1 / span 7', lg: '1 / span 7' },
              maxWidth: { md: '44rem' },
              pb: { md: 8 },
            }}
          >
            <Box sx={{ display: 'flex', gap: '1.25rem', alignItems: 'center', mb: '3rem' }}>
              <Box
                component="img"
                src="/images/homepage/apple-store-icon.png"
                alt="Apple App Store"
                sx={{ width: '1.75rem', height: '1.75rem', objectFit: 'contain' }}
              />
              <Box
                component="img"
                src="/images/homepage/Google_Play_2022_icon 1.png"
                alt="Get it on Google Play"
                sx={{ width: '1.75rem', height: '1.75rem', objectFit: 'contain' }}
              />
            </Box>

            <Typography variant="display-5" component="h2" sx={{ color: 'text.heading', mb: 2 }}>
              Take your super on the road with Australian Retirement Trust
            </Typography>
            <Typography variant="lead" sx={{ color: 'text.primary', mb: 3 }}>
              Whether you&apos;re checking your balance or reviewing your cover,{' '}
              <Box component="span" sx={{ color: 'primary.main' }}>
                our mobile app
              </Box>{' '}
              helps you stay connected to your super.
            </Typography>

            <Button
              label="Join today"
              variant="contained"
              size="large"
              fullWidth
              href="/join"
              sx={{ width: { md: 'auto' } }}
            />
          </Box>

          <Box
            sx={{
              gridColumn: { md: '8 / span 5', lg: '8 / span 5' },
              display: 'flex',
              justifyContent: { xs: 'center', md: 'flex-end' },
              alignSelf: 'end',
              pr: { md: '3.375rem' },
            }}
          >
            <Box sx={{ position: 'relative', width: 'fit-content', mb: { xs: '-8rem', md: '-1rem' } }}>
              <Box
                component="img"
                src="/images/homepage/mobile-app-phone.png"
                alt="ART mobile app"
                sx={{ maxWidth: { xs: '24rem', md: '24rem' }, width: '100%', height: 'auto', objectFit: 'contain' }}
              />
              <Box
                component="img"
                src="/images/homepage/mobile-app-qr.png"
                alt="QR code to download the app"
                sx={{
                  display: { xs: 'none', md: 'block' },
                  position: 'absolute',
                  right: { xs: '0.5rem', md: '-3.375rem' },
                  top: { xs: '1.25rem', md: '7.5rem' },
                  width: { xs: '8rem', md: '10rem' },
                  height: 'auto',
                  borderRadius: 'shape.2xl',
                }}
              />
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

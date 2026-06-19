'use client';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Button } from '../../../components/Button';
import { HOMEPAGE_CONTAINER_SX } from './templateOverrides';

export function MobileAppSection() {
  return (
    <Box sx={{ bgcolor: 'background.brandSecondary', py: { xs: 6, md: 10 }, overflow: 'hidden' }}>
      <Container maxWidth={false} sx={HOMEPAGE_CONTAINER_SX}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: { xs: 4, md: 8 },
            alignItems: 'center',
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 3 }}>
              <Box
                component="img"
                src="/images/homepage/apple-store-icon.png"
                alt="Apple App Store"
                sx={{ width: '1.5rem', height: '1.5rem', objectFit: 'contain' }}
              />
              <Box
                component="img"
                src="/images/homepage/Google_Play_2022_icon 1.png"
                alt="Get it on Google Play"
                sx={{ width: '6.5rem', height: 'auto', objectFit: 'contain' }}
              />
            </Box>

            <Typography variant="display-5" component="h2" sx={{ color: 'text.inverse', mb: 2 }}>
              Take your super on the road with Australian Retirement Trust
            </Typography>
            <Typography variant="body" sx={{ color: 'text.inverse', opacity: 0.85, mb: 3 }}>
              Whether you&apos;re checking your balance or reviewing your cover, our
              mobile app helps you stay connected to your super.
            </Typography>

            <Button
              label="Join today"
              variant="contained"
              reversed
              href="/join"
            />
          </Box>

          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', position: 'relative' }}>
            <Box
              component="img"
              src="/images/homepage/mobile-app-phone.png"
              alt="ART mobile app"
              sx={{ maxWidth: '22rem', width: '100%', height: 'auto', objectFit: 'contain' }}
            />
            <Box
              component="img"
              src="/images/homepage/mobile-app-qr.png"
              alt="QR code to download the app"
              sx={{
                position: 'absolute',
                right: { xs: '0.25rem', md: '-1.25rem' },
                top: { xs: '1.5rem', md: '2.5rem' },
                width: { xs: '8rem', md: '11rem' },
                height: 'auto',
                borderRadius: 'shape.2xl',
              }}
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

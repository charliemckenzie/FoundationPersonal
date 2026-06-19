'use client';

import { useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Button } from '../../../components/Button';
import { HOMEPAGE_CONTAINER_SX } from './templateOverrides';

export function AppointmentsSection() {
  const [videoFailed, setVideoFailed] = useState(false);

  return (
    <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: 'background.paper' }}>
      <Container maxWidth={false} sx={HOMEPAGE_CONTAINER_SX}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: { xs: 4, md: 8 },
            alignItems: 'center',
          }}
        >
          {/* Left content */}
          <Box sx={{ flex: 1 }}>
            <Typography variant="display-5" component="h2" sx={{ mb: 2 }}>
              Organise an appointment or come to one of our events
            </Typography>
            <Typography variant="body" sx={{ color: 'text.muted', mb: 3 }}>
              Book an online appointment to chat about your super with us via
              video call or use our online tools to check the health of your super. We
              also host regular webinars and podcasts, as well as in-person seminars
              and events.
            </Typography>
            <Button
              label="Learn about financial planning"
              variant="outlined"
              href="/financial-planning"
            />
          </Box>

          {/* Right looping video */}
          <Box sx={{ flex: 1 }}>
            {videoFailed ? (
              <Box
                component="img"
                src="/images/disclaimer-hero.png"
                alt="A financial adviser presenting at an ART event"
                sx={{
                  width: '100%',
                  borderRadius: 'shape.lg',
                  objectFit: 'cover',
                  aspectRatio: '4/3',
                }}
              />
            ) : (
              <Box
                component="video"
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                poster="/images/disclaimer-hero.png"
                aria-label="A financial adviser presenting at an ART event"
                onLoadedData={() => setVideoFailed(false)}
                onError={() => setVideoFailed(true)}
                sx={{
                  width: '100%',
                  borderRadius: 'shape.lg',
                  objectFit: 'cover',
                  aspectRatio: '4/3',
                }}
              >
                <source src="/videos/homepage/b-roll-compressed.webm" type="video/webm" />
                <source src="/videos/homepage/b-roll-compressed.mp4" type="video/mp4" />
              </Box>
            )}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

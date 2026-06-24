'use client';

import { useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Button } from '../../../../components/Button';
import { HOMEPAGE_CONTAINER_SX } from './templateOverrides';

export function AppointmentsSection() {
  const [videoFailed, setVideoFailed] = useState(false);

  return (
    <Box
      sx={{
        pt: { xs: 6, md: 10 },
        pb: { xs: 4, md: '2.1875rem' },
        bgcolor: 'background.paper',
      }}
    >
      <Container maxWidth={false} sx={HOMEPAGE_CONTAINER_SX}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(12, minmax(0, 1fr))' },
            rowGap: { xs: 4, md: 0 },
            columnGap: { md: '1.5rem' },
            alignItems: 'center',
          }}
        >
          {/* Left content */}
          <Box
            sx={{
              width: '100%',
              order: { xs: 2, md: 1 },
              gridColumn: {
                md: '1 / span 6',
                lg: '1 / span 5',
                xl: '1 / span 5',
              },
            }}
          >
            <Typography variant="display-5" component="h2" sx={{ mb: 2 }}>
              Organise an appointment or come to one of our events
            </Typography>
            <Typography variant="lead" sx={{ color: 'text.primary', mb: 3 }}>
              Book an online appointment to chat about your super with us via
              video call or use our online tools to check the health of your super. We
              also host regular webinars and podcasts, as well as in-person seminars
              and events.
            </Typography>
            <Button
              label="Learn about financial planning"
              variant="outlined"
              size="large"
              href="/financial-planning"
            />
          </Box>

          {/* Right looping video */}
          <Box
            sx={{
              width: '100%',
              order: { xs: 1, md: 2 },
              gridColumn: {
                md: '7 / span 6',
                lg: '7 / span 6',
                xl: '8 / span 5',
              },
            }}
          >
            {videoFailed ? (
              <Box
                component="img"
                src="/images/homepage/events-coverphoto.jpg"
                alt="A financial adviser presenting at an ART event"
                sx={{
                  width: '100%',
                  borderRadius: '2.5rem',
                  objectFit: 'cover',
                  height: { xs: '25rem', md: '37.5rem' },
                  aspectRatio: 'auto',
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
                poster="/images/homepage/events-coverphoto.jpg"
                aria-label="A financial adviser presenting at an ART event"
                onLoadedData={() => setVideoFailed(false)}
                onError={() => setVideoFailed(true)}
                sx={{
                  width: '100%',
                  borderRadius: '2.5rem',
                  objectFit: 'cover',
                  height: { xs: '25rem', md: '37.5rem' },
                  aspectRatio: 'auto',
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

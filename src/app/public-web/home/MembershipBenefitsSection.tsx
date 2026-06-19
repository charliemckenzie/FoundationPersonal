'use client';

import { useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Icon } from '../../../components/Icon';
import { HOMEPAGE_CONTAINER_SX } from './templateOverrides';

const BENEFITS = [
  {
    icon: 'gift',
    title: 'Member deals and discounts',
    description: 'Save money with over 3,000 offers from big brands.',
  },
  {
    icon: 'umbrella',
    title: 'Insurance',
    description: "We've got your covered for a rainy day.",
  },
  {
    icon: 'book-open-lines',
    title: 'Podcasts',
    description: 'Your guide to super, retirement, and investing.',
  },
  {
    icon: 'messages-dollar',
    title: 'Live chat',
    description: 'Available 8am–7:30pm AEST Monday to Friday.',
  },
];

export function MembershipBenefitsSection() {
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
          {/* Left looping video */}
          <Box sx={{ flex: 1 }}>
            {videoFailed ? (
              <Box
                component="img"
                src="/images/profile.svg"
                alt="A presenter recording a podcast session"
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
                poster="/images/profile.svg"
                aria-label="A presenter recording a podcast session"
                onLoadedData={() => setVideoFailed(false)}
                onError={() => setVideoFailed(true)}
                sx={{
                  width: '100%',
                  borderRadius: 'shape.lg',
                  objectFit: 'cover',
                  aspectRatio: '4/3',
                }}
              >
                <source src="/videos/homepage/podocast-compressed.webm" type="video/webm" />
                <source src="/videos/homepage/podcast-compressed.webm" type="video/webm" />
                <source src="/videos/homepage/podocast-compressed.mp4" type="video/mp4" />
                <source src="/videos/homepage/podcast-compressed.mp4" type="video/mp4" />
              </Box>
            )}
          </Box>

          {/* Right content */}
          <Box sx={{ flex: 1 }}>
            <Typography variant="display-5" component="h2" sx={{ mb: 4 }}>
              Make the most of your membership
            </Typography>

            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
                gap: 3,
              }}
            >
              {BENEFITS.map((benefit) => (
                <Box key={benefit.title} sx={{ display: 'flex', gap: 1.5 }}>
                  <Icon icon={benefit.icon} size="lg" color="primary" />
                  <Box>
                    <Typography variant="body" sx={{ fontWeight: 700, mb: 0.5 }}>
                      {benefit.title}
                    </Typography>
                    <Typography variant="small" sx={{ color: 'text.muted' }}>
                      {benefit.description}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

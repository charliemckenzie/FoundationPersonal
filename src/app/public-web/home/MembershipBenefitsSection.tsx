'use client';

import { useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';
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

const MEMBERSHIP_MEDIA_OVERLAY = {
  title: '5 easy ways to grow your super',
  subtitle: 'Marcus and Jackson',
};

export function MembershipBenefitsSection() {
  const [videoFailed, setVideoFailed] = useState(false);

  return (
    <Box
      sx={{
        pt: { xs: 6, md: '2.1875rem' },
        pb: { xs: 6, md: 10 },
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
          {/* Left looping video */}
          <Box
            sx={{
              width: '100%',
              gridColumn: {
                md: '1 / span 6',
                lg: '1 / span 5',
                xl: '1 / span 5',
              },
            }}
          >
            <Box sx={{ position: 'relative' }}>
              {videoFailed ? (
                <Box
                  component="img"
                  src="/images/homepage/podcasts-coverphoto.jpg"
                  alt="A presenter recording a podcast session"
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
                  poster="/images/homepage/podcasts-coverphoto.jpg"
                  aria-label="A presenter recording a podcast session"
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
                  <source src="/videos/homepage/podocast-compressed.webm" type="video/webm" />
                  <source src="/videos/homepage/podcast-compressed.webm" type="video/webm" />
                  <source src="/videos/homepage/podocast-compressed.mp4" type="video/mp4" />
                  <source src="/videos/homepage/podcast-compressed.mp4" type="video/mp4" />
                </Box>
              )}

              <Box
                component="button"
                type="button"
                aria-label={`Play video: ${MEMBERSHIP_MEDIA_OVERLAY.title} by ${MEMBERSHIP_MEDIA_OVERLAY.subtitle}`}
                sx={{
                  position: 'absolute',
                  left: { xs: '1rem', md: '2rem' },
                  right: { xs: '1rem', md: '2rem' },
                  bottom: { xs: '1rem', md: '2rem' },
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 2,
                  px: { xs: '1.5rem', md: '2rem' },
                  py: { xs: '1.25rem', md: '1.5rem' },
                  textAlign: 'left',
                  cursor: 'pointer',
                  appearance: 'none',
                  border: 0,
                  borderRadius: '1.75rem',
                  bgcolor: (theme) => alpha(theme.palette.common.white, 0.2),
                  backdropFilter: 'blur(18px)',
                  WebkitBackdropFilter: 'blur(18px)',
                  boxShadow: (theme) => `0 0.5rem 2rem ${alpha(theme.palette.primary.main, 0.2)}`,
                  outline: 'none',
                  transition: 'background-color 180ms ease, box-shadow 180ms ease, backdrop-filter 180ms ease',
                  '&:hover': {
                    bgcolor: (theme) => alpha(theme.palette.primary.main, 0.92),
                    backdropFilter: 'blur(6px)',
                    WebkitBackdropFilter: 'blur(6px)',
                    boxShadow: (theme) => `0 0.75rem 2.25rem ${alpha(theme.palette.primary.main, 0.3)}`,
                  },
                  '&:focus-visible': {
                    bgcolor: (theme) => alpha(theme.palette.primary.main, 0.92),
                    backdropFilter: 'blur(6px)',
                    WebkitBackdropFilter: 'blur(6px)',
                    boxShadow: (theme) => `0 0 0 0.1875rem ${alpha(theme.palette.common.white, 0.55)}`,
                  },
                }}
              >
                <Box sx={{ minWidth: 0 }}>
                  <Typography
                    variant="lead"
                    sx={{ color: 'common.white', fontWeight: 700, mb: 0.5 }}
                  >
                    {MEMBERSHIP_MEDIA_OVERLAY.title}
                  </Typography>
                  <Typography variant="lead" sx={{ color: 'common.white' }}>
                    {MEMBERSHIP_MEDIA_OVERLAY.subtitle}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    width: '3.75rem',
                    height: '3.75rem',
                    minWidth: '3.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'common.white',
                    fontSize: '3.75rem',
                  }}
                >
                  <Icon icon="circle-play" size="inherit" color="inherit" />
                </Box>
              </Box>
            </Box>
          </Box>

          {/* Right content */}
          <Box
            sx={{
              width: '100%',
              gridColumn: {
                md: '7 / span 6',
                lg: '7 / span 6',
                xl: '8 / span 5',
              },
            }}
          >
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

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
    icon: 'tag',
    style: 'regular' as const,
    title: 'Member deals and discounts',
    description: 'Save money with over 3,000 offers from big brands.',
  },
  {
    icon: 'umbrella',
    style: 'regular' as const,
    title: 'Insurance',
    description: "We've got your covered for a rainy day.",
  },
  {
    icon: 'podcast',
    style: 'solid' as const,
    title: 'Podcasts',
    description: 'Your guide to super, retirement, and investing.',
  },
  {
    icon: 'comment',
    style: 'regular' as const,
    title: 'Live chat',
    description: 'Available 7am–7:30pm AEST Monday to Friday.',
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
        pt: { xs: 4, md: '2.3125rem' },
        pb: { xs: 7, md: 10 },
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
                  bottom: { xs: '1.5rem', md: '2rem' },
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 2,
                  px: { xs: '1.5rem', md: '2rem' },
                  pt: { xs: '1.5rem', md: '1.5rem' },
                  pb: { xs: '1.75rem', md: '1.5rem' },
                  minHeight: { xs: '5.25rem', md: 'auto' },
                  textAlign: 'left',
                  color: 'common.white',
                  cursor: 'pointer',
                  appearance: 'none',
                  border: 0,
                  borderRadius: '1.75rem',
                  bgcolor: 'rgba(205, 212, 234, 0.38)',
                  backdropFilter: 'blur(18px)',
                  WebkitBackdropFilter: 'blur(18px)',
                  boxShadow: '0 0.5rem 2rem rgba(28, 53, 94, 0.12)',
                  outline: 'none',
                  transition: 'background-color 180ms ease, box-shadow 180ms ease, backdrop-filter 180ms ease',
                  '&:hover': {
                    bgcolor: (theme) => alpha(theme.palette.primary.main, 0.98),
                    boxShadow: (theme) => `0 0.75rem 2.25rem ${alpha(theme.palette.primary.main, 0.24)}`,
                  },
                  '&:focus-visible': {
                    bgcolor: (theme) => alpha(theme.palette.primary.main, 0.98),
                    boxShadow: (theme) => `0 0 0 0.1875rem ${alpha(theme.palette.common.white, 0.5)}`,
                  },
                }}
              >
                <Box sx={{ minWidth: 0, flex: '1 1 auto' }}>
                  <Typography
                    variant="lead"
                    sx={{ color: 'inherit', fontWeight: '700 !important', mb: 0.5, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'block' }}
                  >
                    {MEMBERSHIP_MEDIA_OVERLAY.title}
                  </Typography>
                  <Typography variant="lead" sx={{ color: 'inherit', fontWeight: 400, fontSize: { xs: '1rem', md: '1.25rem' }, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'block' }}>
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
            <Typography
              variant="display-5"
              component="h2"
              sx={{
                mb: { xs: '2.5rem', md: '4rem' },
              }}
            >
              Make the most of your membership
            </Typography>

            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: 'repeat(2, minmax(0, 1fr))' },
                rowGap: { xs: 4, md: 6 },
                columnGap: '1.5rem',
              }}
            >
              {BENEFITS.map((benefit) => (
                <Box key={benefit.title} sx={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem' }}>
                  <Box
                    sx={{
                      width: '3rem',
                      height: '3rem',
                      minWidth: '3rem',
                      borderRadius: '50%',
                      bgcolor: '#EDEFF2',
                      color: 'text.heading',
                      fontSize: '1.875rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Icon icon={benefit.icon} style={benefit.style} size="inherit" color="inherit" />
                  </Box>

                  <Box>
                    <Typography variant="h5" component="h3" sx={{ mb: 1 }}>
                      {benefit.title}
                    </Typography>
                    <Typography variant="lead" sx={{ maxWidth: '20rem', color: 'text.muted' }}>
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

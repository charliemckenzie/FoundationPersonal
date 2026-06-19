'use client';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Button } from '../../../components/Button';
import { HOMEPAGE_CONTAINER_SX } from './templateOverrides';

export function HeroSection() {
  return (
    <Box
      sx={{
        position: 'relative',
        bgcolor: '#0051FF',
        backgroundImage: 'linear-gradient(180deg, #1A62FF 0%, #0051FF 100%)',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        overflow: 'hidden',
        pt: { xs: 4, md: 0 },
        pb: 0,
        minHeight: { xs: 'auto', sm: '41rem', md: '37.5rem' },
        height: { md: '37.5rem' },
        maxHeight: { md: '37.5rem' },
        '&::after': {
          content: '""',
          display: { xs: 'none', md: 'block' },
          position: 'absolute',
          inset: 0,
          left: { md: '50%', lg: '52%' },
          bgcolor: 'primary.main',
          clipPath: 'polygon(12% 0, 100% 0, 100% 100%, 0 100%)',
          opacity: 0.98,
          zIndex: 0,
          '@media (min-width: 56.25rem) and (max-width: 87.49rem)': {
            left: '60%',
          },
        },
      }}
    >
      <Container
        maxWidth={false}
        sx={[
          HOMEPAGE_CONTAINER_SX,
          {
            position: 'relative',
            zIndex: 2,
            height: { md: '100%' },
            display: { md: 'flex' },
            alignItems: { md: 'center' },
          },
        ]}
      >
        {/* Right image viewport clips Artie so he can stay large without crossing into text. */}
        <Box
          sx={{
            display: { xs: 'none', md: 'block' },
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: { md: 'max(34.5rem, 56%)' },
            overflow: 'hidden',
            zIndex: 1,
            pointerEvents: 'none',
            '@media (min-width: 87.5rem)': {
              display: 'none',
            },
          }}
        >
          <Box
            component="img"
            src="/images/homepage/artie-tablet.png"
            alt=""
            sx={{
              position: 'absolute',
              display: { xs: 'none', md: 'block' },
              left: 0,
              top: 0,
              width: 'auto',
              height: '112%',
              minWidth: '32rem',
              maxWidth: 'none',
              objectFit: 'contain',
              objectPosition: 'left top',
              '@media (min-width: 87.5rem)': {
                display: 'none',
              },
            }}
          />
        </Box>

        {/* Wide desktop: normal uncropped rider scales down naturally. */}
        <Box
          component="img"
          src="/images/homepage/hero-monster-rider.png"
          alt=""
          sx={{
            display: 'none',
            position: 'absolute',
            right: 0,
            bottom: 0,
            height: '100%',
            width: 'auto',
            maxWidth: '54%',
            objectFit: 'contain',
            objectPosition: 'right bottom',
            zIndex: 1,
            pointerEvents: 'none',
            '@media (min-width: 87.5rem)': {
              display: 'block',
            },
          }}
        />

        <Box
          sx={{
            position: 'relative',
            zIndex: 2,
            width: { xs: '100%', md: 'clamp(34rem, 52%, 41rem)' },
            maxWidth: { xs: '40rem', md: '41rem' },
            minWidth: { md: '34rem' },
            pr: { md: 3 },
            py: { md: 4 },
            mx: { xs: 'auto', md: 0 },
            textAlign: { xs: 'center', md: 'left' },
          }}
        >
          <Typography
            variant="display-5"
            component="h1"
            sx={{ color: 'text.inverse', mb: 2, lineHeight: 1.1 }}
          >
            With over 10% returns across 10 years, your future is{' '}
            <Box component="em" sx={{ fontStyle: 'italic' }}>
              firmly
            </Box>{' '}
            on course.
          </Typography>

          <Typography
            variant="lead"
            sx={{ color: 'text.inverse', mb: 3, opacity: 0.92, maxWidth: '30rem', mx: { xs: 'auto', md: 0 } }}
          >
            Awaken your super with one of the top performers.
          </Typography>

          <Button
            label="Our performance"
            variant="contained"
            size="large"
            reversed
            href="/performance"
            fullWidth={true}
            sx={{ maxWidth: { xs: '38rem', md: 'fit-content' } }}
          />

          <Typography
            variant="caption"
            sx={{ color: 'text.inverse', mt: { xs: 6, md: 6 }, opacity: 0.72, display: 'block', maxWidth: '31rem', mx: { xs: 'auto', md: 0 } }}
          >
            Past performance is not a reliable indicator of future performance. High Growth option over 10 years to 30 September
            2024. SuperRatings Fund Crediting Rate survey.
          </Typography>

          {/* Mobile Artie sits in the content stack and anchors to the hero bottom edge. */}
          <Box
            component="img"
            src="/images/homepage/Artie-mobile.png"
            alt=""
            sx={{
              display: { xs: 'block', md: 'none' },
              mt: 4,
              width: '100%',
              maxWidth: '24rem',
              mx: 'auto',
              objectFit: 'contain',
              objectPosition: 'center bottom',
              pointerEvents: 'none',
            }}
          />
        </Box>
      </Container>
    </Box>
  );
}

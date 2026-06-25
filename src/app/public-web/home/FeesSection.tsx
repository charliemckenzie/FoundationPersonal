'use client';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Button } from '../../../components/Button';
import { HOMEPAGE_CONTAINER_SX } from './templateOverrides';

export function FeesSection() {
  const maxFeeValue = 550;

  return (
    <Box sx={{ bgcolor: '#145EFF' }}>
      <Box
        sx={{
          py: { xs: 8, md: 11, lg: 13 },
          bgcolor: 'background.paper',
          borderTopLeftRadius: { xs: '1.25rem', md: '3rem', xl: '5rem' },
          borderTopRightRadius: { xs: '1.25rem', md: '3rem', xl: '5rem' },
        }}
      >
        <Container maxWidth={false} sx={HOMEPAGE_CONTAINER_SX}>
          <Box
            sx={{
              width: '100%',
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                md: 'minmax(0, 1fr) minmax(0, 1fr)',
                xl: 'minmax(0, 1fr) minmax(0, 0.94fr)',
              },
              columnGap: { xs: 0, md: '2.5rem', lg: '3rem', xl: '9.375rem' },
              rowGap: { xs: 5, md: 0 },
              alignItems: { xs: 'start', md: 'center' },
            }}
          >
            <Box sx={{ width: '100%', pt: { xs: 0, md: 0 } }}>
              <Typography variant="display-5" component="h2" sx={{ mb: 3, color: 'text.heading' }}>
                Fees lower than the industry
              </Typography>

              <Typography variant="lead" sx={{ color: 'text.heading', mb: 5 }}>
                Our fees are below industry average, so you keep more of your savings invested for your future. They&apos;re
                made up of admin, investment and transactional fees and costs.
              </Typography>

              <Box
                sx={{
                  bgcolor: { xs: '#F4F5F7', md: 'transparent' },
                  borderRadius: { xs: '1.875rem', md: 0 },
                  px: { xs: 3, md: 0 },
                  py: { xs: 4, md: 0 },
                  mb: 4,
                }}
              >
                <Typography
                  variant="caption"
                  sx={{
                    color: 'text.muted',
                    display: 'block',
                    mb: 1,
                    fontSize: '0.875rem',
                    lineHeight: 1.4286,
                    fontWeight: 700,
                    letterSpacing: '0.08125rem',
                    textTransform: 'uppercase',
                  }}
                >
                  E.G. 0.5% LESS IN FEES COULD MEAN
                </Typography>

                <Typography
                  variant="display-4"
                  component="p"
                  sx={{
                    color: 'primary.main',
                    mb: 1,
                    lineHeight: 1,
                    fontFamily: 'var(--font-noto-sans), "Noto Sans", system-ui, sans-serif',
                  }}
                >
                  $100,000
                </Typography>

                <Typography variant="body" component="p" sx={{ color: 'text.heading' }}>
                  <Box component="span" sx={{ fontWeight: 700 }}>
                    more super
                  </Box>{' '}
                  at age 67
                </Typography>
                <Typography variant="small" component="p" sx={{ color: 'text.heading', mt: { xs: 1, md: '1.5rem' } }}>
                  Figures from the Productivity Commission.{' '}
                  <Box
                    component="a"
                    href="/fees/disclaimer"
                    sx={{
                      color: 'primary.main',
                      textDecoration: 'none !important',
                      '&:hover, &:focus-visible, &:active': {
                        textDecoration: 'none !important',
                      },
                    }}
                  >
                    Assumptions and illustrations.
                  </Box>
                </Typography>
              </Box>

              <Button label="Calculate your fees" variant="outlined" size="large" href="/fees/calculator" sx={{ width: { xs: '100%', md: 'auto' } }} />
            </Box>

            <Box sx={{ width: '100%', justifySelf: { xl: 'end' }, display: { xs: 'none', md: 'block' } }}>
            <Typography
              variant="h5"
              component="h2"
              sx={{
                mb: 1,
                textAlign: 'center',
              }}
            >
              How do our fees compare?
            </Typography>

            <Typography
              variant="small"
              sx={{
                color: 'text.muted',
                textAlign: 'center',
                mb: { xs: 4, md: 3.5 },
                width: '100%',
              }}
            >
              These returns are to 31 December 2025.{' '}
              <Box
                component="a"
                href="/fees/disclaimer"
                sx={{
                  color: 'primary.main',
                  textDecoration: 'none !important',
                  '&:hover, &:focus-visible, &:active': {
                    textDecoration: 'none !important',
                  },
                }}
              >
                Assumptions and disclaimers
              </Box>
            </Typography>

            <Box
              sx={{
                position: 'relative',
                width: '100%',
                mb: { xs: 3, md: 4 },
                px: { xs: 1, md: 0 },
              }}
            >
              {[0, 1, 2].map((line) => (
                <Box
                  key={line}
                  aria-hidden="true"
                  sx={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    bottom: `${line * 33.333}%`,
                    borderTop: '0.0625rem solid #C8D2E3',
                  }}
                />
              ))}

              <Box
                sx={{
                  position: 'relative',
                  zIndex: 1,
                  height: '100%',
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                  gap: { xs: 2, md: '2rem' },
                }}
              >
                {[
                  {
                    value: 485,
                    amount: '$485 p/a',
                    label: 'ART',
                    backgroundColor: 'primary.main',
                    color: 'common.white',
                  },
                  {
                    value: 550,
                    amount: '$550 p/a',
                    label: 'Industry\nAverage',
                    backgroundColor: '#D7DDE9',
                    color: 'text.heading',
                  },
                ].map((bar) => (
                  <Box
                    key={bar.label}
                    sx={{
                        width: { xs: '8.5rem', sm: '10rem' },
                        maxWidth: '10rem',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                    }}
                  >
                    <Typography
                      variant="body"
                      component="p"
                      sx={{
                        color: 'text.heading',
                        fontSize: '1rem',
                        lineHeight: 1.2,
                        mb: { xs: 1, md: 1.25 },
                        fontWeight: 700,
                        textAlign: 'center',
                      }}
                    >
                      {bar.amount}
                    </Typography>

                    <Box
                      sx={{
                        width: '100%',
                        height: {
                          xs: `calc(14.5rem * ${bar.value / maxFeeValue})`,
                          md: `calc(16.25rem * ${bar.value / maxFeeValue})`,
                        },
                        bgcolor: bar.backgroundColor,
                        borderRadius: { xs: '1.25rem 1.25rem 0 0', md: '1.5rem 1.5rem 0 0' },
                        display: 'flex',
                        alignItems: 'flex-end',
                        justifyContent: 'center',
                        pb: { xs: 1.75, md: 2.25 },
                      }}
                    >
                      <Typography
                        variant="body"
                        component="p"
                        sx={{
                          color: bar.color,
                          textAlign: 'center',
                          whiteSpace: 'pre-line',
                          fontSize: '1rem',
                          lineHeight: 1.35,
                          fontWeight: 700,
                        }}
                      >
                        {bar.label}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>

            <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button label="50k balance" variant="contained" size="small" />
              <Button
                label="250k balance"
                variant="ghost"
                size="small"
                sx={{
                  bgcolor: '#F4F5F7',
                  '&:hover': { bgcolor: '#F4F5F7' },
                }}
              />
              <Button
                label="500k balance"
                variant="ghost"
                size="small"
                sx={{
                  bgcolor: '#F4F5F7',
                  '&:hover': { bgcolor: '#F4F5F7' },
                }}
              />
            </Box>


            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}

'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import { useRouter } from 'next/navigation';
import { Tabs } from '../../../components/Tabs';
import { Tooltip } from '../../../components/Tooltip';
import { TextButton } from '../../../components/TextButton';
import { Icon } from '../../../components/Icon';
import { HOMEPAGE_CONTAINER_SX } from './templateOverrides';

interface Allocation {
  highGrowth: number;
  balanced: number;
  cash: number;
}

const AGE_MIN = 15;
const AGE_MAX = 65;
const BREAK_AGE = 51;
const BREAK_POS = 0.55;
const SLIDER_MAX = 1000;

const AGE_MARKS = [
  { value: 15, label: '15+' },
  { value: 51, label: '51' },
  { value: 55, label: '55' },
  { value: 59, label: '59' },
  { value: 63, label: '63' },
  { value: 65, label: '65+' },
];

const LIFECYCLE_BY_AGE: Record<number, Allocation> = {
  51: { cash: 1, balanced: 9, highGrowth: 90 },
  52: { cash: 2, balanced: 18, highGrowth: 80 },
  53: { cash: 3, balanced: 27, highGrowth: 70 },
  54: { cash: 4, balanced: 36, highGrowth: 60 },
  55: { cash: 5, balanced: 45, highGrowth: 50 },
  56: { cash: 6, balanced: 54, highGrowth: 40 },
  57: { cash: 7, balanced: 63, highGrowth: 30 },
  58: { cash: 8, balanced: 72, highGrowth: 20 },
  59: { cash: 9, balanced: 81, highGrowth: 10 },
  60: { cash: 10, balanced: 90, highGrowth: 0 },
  61: { cash: 12, balanced: 88, highGrowth: 0 },
  62: { cash: 14, balanced: 86, highGrowth: 0 },
  63: { cash: 16, balanced: 84, highGrowth: 0 },
  64: { cash: 18, balanced: 82, highGrowth: 0 },
  65: { cash: 20, balanced: 80, highGrowth: 0 },
};

function getAllocationForAge(age: number): Allocation {
  if (age < 51) {
    return { highGrowth: 100, balanced: 0, cash: 0 };
  }

  if (age >= 65) {
    return LIFECYCLE_BY_AGE[65];
  }

  return LIFECYCLE_BY_AGE[age] ?? { highGrowth: 0, balanced: 80, cash: 20 };
}

function ageToPos(age: number): number {
  if (age <= BREAK_AGE) {
    const t = (age - AGE_MIN) / (BREAK_AGE - AGE_MIN);
    return BREAK_POS * t;
  }
  const t = (age - BREAK_AGE) / (AGE_MAX - BREAK_AGE);
  return BREAK_POS + (1 - BREAK_POS) * t;
}

function posToAge(pos: number): number {
  if (pos <= BREAK_POS) {
    const t = pos / BREAK_POS;
    return AGE_MIN + t * (BREAK_AGE - AGE_MIN);
  }
  const t = (pos - BREAK_POS) / (1 - BREAK_POS);
  return BREAK_AGE + t * (AGE_MAX - BREAK_AGE);
}

function ageToSliderValue(age: number): number {
  return Math.round(ageToPos(age) * SLIDER_MAX);
}

function LifecycleStrategy() {
  const router = useRouter();
  const [age, setAge] = React.useState(30);
  const allocation = getAllocationForAge(age);
  const barRef = React.useRef<HTMLDivElement | null>(null);
  const [barWidth, setBarWidth] = React.useState(0);

  React.useEffect(() => {
    if (!barRef.current || typeof ResizeObserver === 'undefined') return;
    const observer = new ResizeObserver((entries) => {
      const width = entries[0]?.contentRect.width ?? 0;
      setBarWidth(width);
    });
    observer.observe(barRef.current);
    return () => observer.disconnect();
  }, []);

  const marks = React.useMemo(
    () => AGE_MARKS.map((mark) => ({ value: ageToSliderValue(mark.value), label: mark.label })),
    []
  );

  const sliderValue = ageToSliderValue(age);

  const getSegmentMode = (value: number): 'full' | 'percent' | 'none' => {
    if (!barWidth) return 'none';
    const segmentWidth = (barWidth * value) / 100;
    if (value <= 0 || segmentWidth < 42) return 'none';
    if (segmentWidth < 94) return 'percent';
    return 'full';
  };

  return (
    <Box sx={{ width: '100%', textAlign: 'center' }}>
      <Typography variant="h2" component="h2" sx={{ mb: 2, mt: 4 }}>
        See how we invest your money as you age
      </Typography>
      <Typography variant="body" sx={{ color: 'text.muted', maxWidth: 1000, mx: 'auto', mb: 10, lineHeight: 1.75 }}>
        Our award-winning{' '}
        <Box component="a" href="/investments/lifecycle" sx={{ color: 'text.link', textDecoration: 'none' }}>
          Lifecycle Investment Strategy
        </Box>{' '}
        is our default option for new members and a true &lsquo;
        <Box component="span" sx={{ fontStyle: 'italic', fontWeight: 700 }}>
          set and forget
        </Box>
        &rsquo; approach. It invests your super across the High Growth, Balanced and Cash pools, and the percentages
        shift automatically as you age. This gives you more growth when you&rsquo;re younger and more stability as you
        approach retirement.
      </Typography>

      <Box sx={{ width: '100%', maxWidth: 'none', alignSelf: 'stretch', mb: 5, pt: 3 }}>
        <Slider
          value={sliderValue}
          onChange={(_, value) => {
            const pos = (value as number) / SLIDER_MAX;
            const mappedAge = Math.round(posToAge(pos));
            setAge(Math.max(AGE_MIN, Math.min(AGE_MAX, mappedAge)));
          }}
          min={0}
          max={SLIDER_MAX}
          marks={marks}
          step={1}
          valueLabelDisplay="on"
          valueLabelFormat={() => `Age ${age}`}
          aria-label="Select age to see investment allocation"
          sx={{
            color: 'text.primary',
            px: 0,
            '& .MuiSlider-rail': {
              height: '0.625rem',
              opacity: 1,
              bgcolor: 'grey.300',
            },
            '& .MuiSlider-track': {
              height: '0.625rem',
              bgcolor: 'text.primary',
              border: 'none',
            },
            '& .MuiSlider-thumb': {
              width: '3rem',
              height: '3rem',
              bgcolor: 'common.white',
              border: '0.5rem solid',
              borderColor: 'text.primary',
              '&:focus-visible': {
                boxShadow: '0 0 0 0.1875rem rgba(0, 81, 255, 0.3)',
              },
            },
            '& .MuiSlider-valueLabel': {
              backgroundColor: '#fff !important',
              color: '#1b2f4a !important',
              border: '1px solid #d2d2d2 !important',
              borderRadius: '0.75rem',
              px: 1.25,
              py: 1.5,
              fontSize: '1rem',
              fontWeight: 700,
              lineHeight: 1,
              left: '50% !important',
              transform: 'translate(-50%, calc(-100% - 1rem)) scale(1) !important',
              '&:before': {
                content: '""',
                position: 'absolute',
                left: '50%',
                transform: 'translateX(-50%) rotate(45deg)',
                bottom: '-0.5rem',
                width: '0.75rem',
                height: '0.75rem',
                backgroundColor: '#fff !important',
                borderRight: '1px solid #d2d2d2 !important',
                borderBottom: '1px solid #d2d2d2 !important',
              },
              '& .MuiSlider-valueLabelLabel': {
                lineHeight: 1,
                color: '#1b2f4a !important',
              },
            },
            '& .MuiSlider-mark': {
              width: '0.125rem',
              height: '0.5rem',
              borderRadius: 1,
              bgcolor: 'transparent',
            },
            '& .MuiSlider-markLabel': {
              fontSize: '1rem',
              color: 'text.primary',
              mt: '0.75rem',
            },
          }}
        />
      </Box>

      <Box
        ref={barRef}
        sx={{
          width: '100%',
          maxWidth: 'none',
          alignSelf: 'stretch',
          mb: 3,
          mt: 5,
          position: 'relative',
          overflow: 'hidden',
          borderRadius: '1rem',
        }}
      >
        <Box sx={{ display: 'flex', width: '100%', height: '7rem', overflow: 'hidden' }}>
          {[
            { pool: 'highGrowth' as const, value: allocation.highGrowth, label: 'High Growth', bg: '#B9DCFB', color: '#173158' },
            { pool: 'balanced' as const, value: allocation.balanced, label: 'Balanced', bg: '#0051FF', color: 'common.white' },
            { pool: 'cash' as const, value: allocation.cash, label: 'Cash', bg: '#1C355E', color: 'common.white' },
          ]
            .filter((segment) => segment.value > 0)
            .map((segment) => {
              const mode = getSegmentMode(segment.value);
              return (
                <Box
                  key={segment.pool}
                  sx={{
                    width: `${segment.value}%`,
                    bgcolor: segment.bg,
                    minWidth: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    overflow: 'hidden',
                    px: 0.5,
                  }}
                >
                  {mode !== 'none' && (
                    <Typography variant="h4" sx={{ color: segment.color, lineHeight: 1.1 }}>
                      {segment.value}%
                    </Typography>
                  )}
                  {mode === 'full' && (
                    <Typography variant="body" sx={{ color: segment.color, lineHeight: 1.5, mt: 0.25, whiteSpace: 'nowrap', fontSize: '1rem' }}>
                      {segment.label}
                    </Typography>
                  )}
                </Box>
              );
            })}
        </Box>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, mt: 2, flexWrap: 'wrap', alignItems: 'center' }}>
        <Tooltip title="Invests mainly in Australian and global shares. Highest long-term return potential with the most short-term volatility. (10-year return: 10.11% p.a.)" placement="top" tooltipSx={{ bgcolor: '#1C355E', borderRadius: '0.75rem', px: 2, py: 1.5, maxWidth: 280, textAlign: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.625, cursor: 'default' }}>
            <Box sx={{ width: '0.625rem', height: '0.625rem', borderRadius: '50%', bgcolor: '#B9DCFB' }} />
            <Typography variant="small" sx={{ fontSize: '0.875rem', textDecoration: 'underline', textDecorationStyle: 'dotted', textUnderlineOffset: '4px' }}>High growth</Typography>
          </Box>
        </Tooltip>
        <Tooltip title="Invests across shares, property, bonds and cash. Moderate long-term returns with smoother performance than High Growth. (10-year return: 8.02% p.a.)" placement="top" tooltipSx={{ bgcolor: '#1C355E', borderRadius: '0.75rem', px: 2, py: 1.5, maxWidth: 280, textAlign: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.625, cursor: 'default' }}>
            <Box sx={{ width: '0.625rem', height: '0.625rem', borderRadius: '50%', bgcolor: '#0051FF' }} />
            <Typography variant="small" sx={{ fontSize: '0.875rem', textDecoration: 'underline', textDecorationStyle: 'dotted', textUnderlineOffset: '4px' }}>Balanced</Typography>
          </Box>
        </Tooltip>
        <Tooltip title="Invested in cash and cash-like securities. Low volatility and low expected long-term returns, this has been designed for stability. (10-year return: 2.20% p.a.)" placement="top" tooltipSx={{ bgcolor: '#1C355E', borderRadius: '0.75rem', px: 2, py: 1.5, maxWidth: 280, textAlign: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.625, cursor: 'default' }}>
            <Box sx={{ width: '0.625rem', height: '0.625rem', borderRadius: '50%', bgcolor: '#1C355E' }} />
            <Typography variant="small" sx={{ fontSize: '0.875rem', textDecoration: 'underline', textDecorationStyle: 'dotted', textUnderlineOffset: '4px' }}>Cash</Typography>
          </Box>
        </Tooltip>
      </Box>

      <Box sx={{ mt: 7 }}>
        <Box
          sx={{
            position: 'relative',
            py: 5,
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: '-100vw',
              right: '-100vw',
              borderTop: '1px solid',
              borderColor: 'border.default',
            },
          }}
        >
          <TextButton
            label="Learn all about the lifecycle investment strategies"
            size="medium"
            onClick={() => router.push('/investments/lifecycle')}
          />
        </Box>
      </Box>
    </Box>
  );
}

function FeeChooser() {
  const router = useRouter();

  const options = [
    {
      title: 'Lifecycle investment',
      description:
        "Our do-it-for-you option. We automatically adjust the investment mix from High Growth to a more conservative mix as you get closer to retirement. Because it's our default option when you join, you don't even have to think about it.",
      cta: 'Learn more',
      href: '/investments/lifecycle',
      icon: 'calendar',
      isDefault: true,
    },
    {
      title: 'Diversified options',
      description:
        'Pre-balanced portfolios set at different risk levels. It gives you a little more control over picking options that match your comfort zone for this stage of your life.',
      cta: 'View all 8 options',
      href: '/investments/diversified-options',
      icon: 'gift',
      isDefault: false,
    },
    {
      title: 'Asset class options',
      description:
        'Individual building blocks like shares, property, and bonds. Choose as many as you like, and build your own portfolio.',
      cta: 'View all 7 options',
      href: '/investments/asset-class-options',
      icon: 'umbrella',
      isDefault: false,
    },
  ] as const;

  return (
    <Box sx={{ width: '100%', pt: { xs: 3, md: 4 } }}>
      <Typography variant="h2" component="h3" sx={{ textAlign: 'center', mb: 2 }}>
        Choose from our wide array of options
      </Typography>
      <Typography variant="body" sx={{ color: 'text.muted', textAlign: 'center', maxWidth: '58rem', mx: 'auto', mb: 6, lineHeight: 1.75 }}>
        We have 15+ investment options that are set at different risk levels. By choosing one or
        more of these, you have more control over an investment strategy that suits your stage of life.
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(3, minmax(0, 1fr))' },
          gap: 3,
          mb: 6,
        }}
      >
        {options.map((option) => (
          <Box
            key={option.title}
            sx={{
              border: '1px solid',
              borderColor: 'border.default',
              borderRadius: '1.5rem',
              p: 4,
              minHeight: { xs: 'auto', md: '22.75rem' },
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
              <Box
                sx={{
                  width: '3rem',
                  height: '3rem',
                  borderRadius: '50%',
                  bgcolor: 'background.default',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'text.primary',
                }}
              >
                <Icon icon={option.icon} size="lg" color="inherit" />
              </Box>
              {option.isDefault && (
                <Box
                  component="span"
                  sx={{
                    px: 1.5,
                    py: 0.5,
                    borderRadius: '0.75rem',
                    bgcolor: 'primary.main',
                    color: 'common.white',
                    fontSize: '0.875rem',
                    fontWeight: 700,
                    lineHeight: 1.4,
                  }}
                >
                  Default
                </Box>
              )}
            </Box>

            <Typography variant="h5" component="h4" sx={{ mb: 2 }}>
              {option.title}
            </Typography>
            <Typography variant="body" sx={{ color: 'text.muted', lineHeight: 1.75, mb: 4 }}>
              {option.description}
            </Typography>

            <Box sx={{ mt: 'auto' }}>
              <TextButton
                label={option.cta}
                size="medium"
                onClick={() => router.push(option.href)}
              />
            </Box>
          </Box>
        ))}
      </Box>

      <Box
        sx={{
          position: 'relative',
          py: 5,
          display: 'flex',
          justifyContent: 'center',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: '-100vw',
            right: '-100vw',
            borderTop: '1px solid',
            borderColor: 'border.default',
          },
        }}
      >
        <TextButton
          label="Compare investment options"
          size="medium"
          onClick={() => router.push('/investments/compare')}
        />
      </Box>
    </Box>
  );
}

export function InvestmentStrategySection() {
  return (
    <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: '#F4F5F7' }}>
      <Container maxWidth={false} sx={HOMEPAGE_CONTAINER_SX}>
        <Typography
          variant="display-5"
          component="h2"
          sx={{ textAlign: 'center', mb: 1 }}
        >
          Where your money works harder
        </Typography>
        <Typography
          variant="body"
          sx={{ textAlign: 'center', color: 'text.muted', mb: 7 }}
        >
          We&apos;re backed by $375.7 billion under management and 2.44 million members*
        </Typography>

        <Box
          sx={{
            bgcolor: 'background.paper',
            borderRadius: { xs: '1.5rem', md: '2.5rem' },
            px: { xs: 2.5, md: 5 },
            pt: { xs: 4, md: 9 },
            pb: 0,
            width: '100%',
            maxWidth: '100rem',
            mx: 'auto',
            overflow: 'hidden',
          }}
        >
          <Box sx={{ width: '100%', maxWidth: '75rem', mx: 'auto' }}>
            <Tabs
              label="Investment strategy options"
              tabStyle="segmented"
              tabs={[
                { label: 'Set and forget', content: <LifecycleStrategy /> },
                { label: 'You choose', content: <FeeChooser /> },
              ]}
            />
          </Box>
        </Box>

        <Typography
          variant="small"
          sx={{ color: 'text.muted', display: 'block', textAlign: 'center', mt: 4.5, maxWidth: 900, mx: 'auto' }}
        >
          *calculated number of years of negative annual returns in any 20 years. To find this our 7.5% PA is based on the Sunsuper AAI Balanced (60) Returns shown are after investment fees and costs, transaction costs and tax; however net of admin fees and other fees and costs and investment delta between.
        </Typography>
      </Container>
    </Box>
  );
}

'use client';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Button } from '../../../components/Button';

interface StepWelcomeProps {
  onStart: () => void;
}

const STEPS = [
  { icon: '/images/step-1.svg', label: 'Step 1', description: 'Tell us your age, salary and current super balance.' },
  { icon: '/images/step-2.svg', label: 'Step 2', description: 'Review what\u2019s currently going into your super.' },
  { icon: '/images/step-3.svg', label: 'Step 3', description: 'Tell us how much extra you could contribute and your goals.' },
  { icon: '/images/step-4.svg', label: 'Step 4', description: 'See your personalised recommendation and tax savings.' },
];

export function StepWelcome({ onStart }: StepWelcomeProps) {
  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: { md: 670 },
      }}
    >
      {/* Right image — fills container height with 24px margin */}
      <Box
        sx={{
          display: { xs: 'none', md: 'block' },
          position: 'absolute',
          top: '1.5rem',
          right: '1.5rem',
          bottom: '1.5rem',
          width: 'calc(50% - 1.5rem)',
          borderRadius: '1rem',
          overflow: 'hidden',
        }}
      >
        <Box
          component="img"
          src="/images/welcome-hero.jpg"
          alt=""
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </Box>

      {/* Content layer */}
      <Box sx={{ position: 'relative', zIndex: 1, py: { xs: 3, md: 8 }, px: { xs: 2, md: 8 } }}>
        {/* Text — left 50% */}
        <Box sx={{ maxWidth: { xs: '100%', md: '50%' }, pr: { xs: 0, md: 5 } }}>
          <Stack spacing={2}>
            <Typography variant="h5" color="primary.main">
              Welcome!
            </Typography>
            <Typography variant="h2" component="h1">
              Could extra super contributions save you tax?
            </Typography>
            <Typography variant="body" color="text.muted" sx={{ lineHeight: 1.75 }}>
              This tool analyses your current super contributions against the annual caps, estimates how much tax you could save through salary sacrifice or personal deductible contributions, and recommends an optimal strategy based on your goals.
            </Typography>
            <Typography variant="body" color="text.muted" sx={{ lineHeight: 1.75 }}>
              It takes about 5 minutes. You&rsquo;ll need your latest payslip and your most recent super statement.
            </Typography>
          </Stack>
        </Box>

        {/* Step cards — full width, overlapping the image */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr 1fr' },
            gap: 2,
            mt: 5,
          }}
        >
          {STEPS.map((step) => (
            <Box
              key={step.label}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: 1.5,
                p: 3,
                borderRadius: '1rem',
                border: '1px solid',
                borderColor: 'border.default',
                backgroundColor: 'background.paper',
              }}
            >
              <Box component="img" src={step.icon} alt="" sx={{ width: '2rem', height: '2rem' }} />
              <Typography variant="h6" component="p">{step.label}</Typography>
              <Typography variant="small" color="text.muted">
                {step.description}
              </Typography>
            </Box>
          ))}
        </Box>

        <Box sx={{ mt: 4 }}>
          <Button label="Let&rsquo;s go" onClick={onStart} />
        </Box>
      </Box>
    </Box>
  );
}

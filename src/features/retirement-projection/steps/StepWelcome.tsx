'use client';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Button } from '../../../components/Button';

interface StepWelcomeProps {
  onStart: () => void;
}

const STEPS = [
  { icon: '/images/step-1.svg', label: 'Step 1', description: 'Tell us about your income, home, super and assets.' },
  { icon: '/images/step-2.svg', label: 'Step 2', description: "Choose the retirement lifestyle you'd like to plan for." },
  { icon: '/images/step-3.svg', label: 'Step 3', description: 'Review your projection and the assumptions behind it.' },
  { icon: '/images/step-4.svg', label: 'Step 4', description: 'View your advice and choose what to do next.' },
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

      {/* Content layer — restore the original padding */}
      <Box sx={{ position: 'relative', zIndex: 1, py: { xs: 3, md: 8 }, px: { xs: 2, md: 8 } }}>
        {/* Text — left 50% */}
        <Box sx={{ maxWidth: { xs: '100%', md: '50%' }, pr: { xs: 0, md: 5 } }}>
          <Stack spacing={2}>
            <Typography variant="h5" color="primary.main">
              Welcome!
            </Typography>
            <Typography variant="h2" component="h1">
              See if you&rsquo;re on track for the retirement you want
            </Typography>
            <Typography variant="body" color="text.secondary" sx={{ lineHeight: 1.75 }}>
              This tool gives you a retirement projection based on your income, super, assets, debts and planned retirement age.
            </Typography>
            <Typography variant="body" color="text.secondary" sx={{ lineHeight: 1.75 }}>
              We&rsquo;ll ask a few questions, then show an estimate of your future super balance and yearly retirement income. You can also explore small changes that may improve your projection.
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
              <Typography variant="body" sx={{ fontWeight: 700 }}>{step.label}</Typography>
              <Typography variant="small" color="text.secondary">
                {step.description}
              </Typography>
            </Box>
          ))}
        </Box>

        <Box sx={{ mt: 4 }}>
          <Button label="Let's go" onClick={onStart} />
        </Box>
      </Box>
    </Box>
  );
}

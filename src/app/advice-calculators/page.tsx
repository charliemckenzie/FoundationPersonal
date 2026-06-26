'use client';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { LinkRow } from '../../components/LinkRow';

interface Calculator {
  label: string;
  icon: string;
  href?: string;
  disabled?: boolean;
}

const calculators: Calculator[] = [
  {
    label: 'Pre-retirement projection',
    icon: 'bullseye-arrow',
    href: '/advice-calculators/retirement-projection',
  },
  {
    label: 'At or in retirement advice',
    icon: 'person-walking-arrow-right',
    disabled: true,
  },
  {
    label: 'Investment advice',
    icon: 'chart-pie',
    disabled: true,
  },
  {
    label: 'Contributions advice',
    icon: 'puzzle-piece',
    href: '/advice-calculators/contributions',
  },
  {
    label: 'Insurance advice',
    icon: 'umbrella',
    disabled: true,
  },
];

export default function AdviceCalculatorsPage() {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        px: 3,
        py: 6,
      }}
    >
      <Box sx={{ width: '100%', maxWidth: '52rem' }}>
        <Typography variant="h3" component="h1" sx={{ mb: 2 }}>
          Advice calculators
        </Typography>

        <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary' }}>
          Explore our range of calculators designed to help you make informed
          decisions about your super, investments, and retirement. Select a
          calculator below to get started.
        </Typography>

        <Stack spacing={2}>
          {calculators.map((calc) => (
            <Box
              key={calc.label}
              sx={calc.disabled ? { opacity: 0.45, pointerEvents: 'none' } : undefined}
              aria-disabled={calc.disabled || undefined}
            >
              <LinkRow
                label={calc.label}
                icon={calc.icon}
                href={calc.href ?? '#'}
              />
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}

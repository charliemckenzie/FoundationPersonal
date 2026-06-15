'use client';

import { useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Button } from '../../components/Button';
import { Icon } from '../../components/Icon';

interface InvestmentStrategySummaryProps {
  /** The current projected super balance (before strategy change). Used to calculate impact. */
  projectedBalance: number;
}

/** Mock recommended allocation from the investment journey */
const RECOMMENDED_MIX = [
  { option: 'High Growth', allocation: 60 },
  { option: 'Balanced', allocation: 25 },
  { option: 'Conservative', allocation: 15 },
];

/** Simulates the projected improvement from switching to the recommended mix */
function estimateImpact(currentBalance: number): { improvedBalance: number; difference: number } {
  // Simplified: recommended mix expected to yield ~0.8% p.a. more over the accumulation period
  const improvementFactor = 1.12; // ~12% more at retirement from better allocation
  const improvedBalance = Math.round(currentBalance * improvementFactor);
  return { improvedBalance, difference: improvedBalance - currentBalance };
}

function dollars(value: number): string {
  return `$${value.toLocaleString('en-AU', { maximumFractionDigits: 0 })}`;
}

/**
 * Shows a completed investment strategy summary tile on the results page.
 * This simulates what the user would see after completing the "Add investment strategy" journey
 * and returning to the projection results.
 */
export function InvestmentStrategySummary({ projectedBalance }: InvestmentStrategySummaryProps) {
  const [completed, setCompleted] = useState(false);
  const { improvedBalance, difference } = estimateImpact(projectedBalance);

  if (!completed) {
    return (
      <Box
        onClick={() => setCompleted(true)}
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          p: 2.5,
          mt: 2,
          borderRadius: '0.75rem',
          border: '1px dashed',
          borderColor: 'border.default',
          cursor: 'pointer',
          '&:hover': { borderColor: 'primary.main', backgroundColor: 'grey.50' },
        }}
      >
        <Box component="img" src="/images/Investment mix.svg" alt="" sx={{ width: '2rem', height: '2rem', flexShrink: 0 }} />
        <Box sx={{ flex: 1 }}>
          <Typography variant="body" sx={{ fontWeight: 700, mb: 0.5 }}>Add investment strategy</Typography>
          <Typography variant="small" color="text.secondary">Changing how your super is invested may affect your projected balance and the level of risk you take.</Typography>
        </Box>
        <Icon icon="plus" size="lg" color="primary" />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        mt: 2,
        borderRadius: '0.75rem',
        border: '1px solid',
        borderColor: 'success.border',
        overflow: 'hidden',
      }}
    >
      {/* Green header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          px: 2.5,
          py: 2,
          backgroundColor: 'success.background',
        }}
      >
        <Box
          sx={{
            width: '1.75rem',
            height: '1.75rem',
            borderRadius: '50%',
            backgroundColor: 'success.main',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            color: 'common.white',
          }}
        >
          <Icon icon="check" size="sm" color="inherit" />
        </Box>
        <Typography variant="body" sx={{ fontWeight: 700, color: 'success.dark' }}>
          Investment strategy updated
        </Typography>
      </Box>

      {/* White body */}
      <Box sx={{ px: 2.5, py: 2, backgroundColor: 'background.paper' }}>
        <Typography variant="small" color="text.secondary" sx={{ mb: 2, lineHeight: 1.6 }}>
          Based on your age, risk tolerance, and retirement timeline, here&rsquo;s your recommended mix:
        </Typography>

        {/* Allocation breakdown */}
        <Stack spacing={0} sx={{ mb: 2 }}>
          {RECOMMENDED_MIX.map((item) => (
            <Box key={item.option} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1.5, '&:not(:last-child)': { borderBottom: '1px solid', borderColor: 'divider' } }}>
              <Typography variant="small" sx={{ fontWeight: 500 }}>{item.option}</Typography>
              <Typography variant="small" sx={{ fontWeight: 700 }}>{item.allocation}%</Typography>
            </Box>
          ))}
        </Stack>

        {/* Allocation bar */}
        <Box sx={{ display: 'flex', height: '0.5rem', borderRadius: '0.25rem', overflow: 'hidden', mb: 2 }}>
          <Box sx={{ width: '60%', backgroundColor: 'primary.main' }} />
          <Box sx={{ width: '25%', backgroundColor: 'primary.light' }} />
          <Box sx={{ width: '15%', backgroundColor: 'grey.400' }} />
        </Box>

        {/* Impact summary */}
        <Box
          sx={{
            p: 2,
            borderRadius: '0.5rem',
            backgroundColor: '#F5F5F5',
            border: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Typography variant="small" color="text.secondary" sx={{ mb: 1 }}>
            Projected impact on your super balance
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', mb: 0.5 }}>
            <Typography variant="small">New projected balance</Typography>
            <Typography variant="small" sx={{ fontWeight: 700 }}>{dollars(improvedBalance)}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <Typography variant="small">Improvement</Typography>
            <Typography variant="small" sx={{ fontWeight: 700, color: 'success.main' }}>+{dollars(difference)}</Typography>
          </Box>
        </Box>

        {/* Actions */}
        <Box sx={{ display: 'flex', gap: 1.5, mt: 2 }}>
          <Button label="View details" size="small" variant="outlined" />
          <Button label="Undo" size="small" variant="ghost" onClick={() => setCompleted(false)} />
        </Box>
      </Box>
    </Box>
  );
}

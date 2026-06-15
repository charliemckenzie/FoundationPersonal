'use client';

import { useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Button } from '../../components/Button';
import { Icon } from '../../components/Icon';

interface ContributionsSummaryProps {
  /** Current projected balance used to calculate improvement. */
  projectedBalance: number;
}

/** Mock result of completing the "Add more to super" journey */
const CONTRIBUTION_CHANGES = {
  salarySacrifice: 150, // $ per fortnight
  afterTax: 50, // $ per fortnight
  additionalPerYear: 5200,
};

function dollars(value: number): string {
  return `$${value.toLocaleString('en-AU', { maximumFractionDigits: 0 })}`;
}

/**
 * Shows an "Add more to your super" tile that transitions to a completed summary
 * after the user finishes the contributions journey.
 */
export function ContributionsSummary({ projectedBalance }: ContributionsSummaryProps) {
  const [completed, setCompleted] = useState(false);

  // Simulated impact: extra contributions grow the balance by ~8%
  const improvement = Math.round(projectedBalance * 0.08);

  if (!completed) {
    return (
      <Box
        onClick={() => setCompleted(true)}
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          p: 2.5,
          borderRadius: '0.75rem',
          border: '1px dashed',
          borderColor: 'border.default',
          cursor: 'pointer',
          '&:hover': { borderColor: 'primary.main', backgroundColor: 'grey.50' },
        }}
      >
        <Box component="img" src="/images/Add to super.svg" alt="" sx={{ width: '2rem', height: '2rem', flexShrink: 0 }} />
        <Box sx={{ flex: 1 }}>
          <Typography variant="body" sx={{ fontWeight: 700, mb: 0.5 }}>Add more to your super</Typography>
          <Typography variant="small" color="text.secondary">Adding extra contributions may improve your projection, but it can also reduce your take-home pay.</Typography>
        </Box>
        <Icon icon="plus" size="lg" color="primary" />
      </Box>
    );
  }

  return (
    <Box
      sx={{
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
          Extra contributions added
        </Typography>
      </Box>

      {/* White body */}
      <Box sx={{ px: 2.5, py: 2, backgroundColor: 'background.paper' }}>
        {/* Contribution breakdown */}
        <Stack spacing={0} sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1.5, borderBottom: '1px solid', borderColor: 'divider' }}>
            <Typography variant="small" sx={{ fontWeight: 500 }}>Salary sacrifice</Typography>
            <Typography variant="small" sx={{ fontWeight: 700 }}>{dollars(CONTRIBUTION_CHANGES.salarySacrifice)}/fn</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1.5, borderBottom: '1px solid', borderColor: 'divider' }}>
            <Typography variant="small" sx={{ fontWeight: 500 }}>After-tax contributions</Typography>
            <Typography variant="small" sx={{ fontWeight: 700 }}>{dollars(CONTRIBUTION_CHANGES.afterTax)}/fn</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1.5 }}>
            <Typography variant="small" sx={{ fontWeight: 600 }}>Total extra per year</Typography>
            <Typography variant="small" sx={{ fontWeight: 700 }}>{dollars(CONTRIBUTION_CHANGES.additionalPerYear)}</Typography>
          </Box>
        </Stack>

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
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <Typography variant="small">Improvement</Typography>
            <Typography variant="small" sx={{ fontWeight: 700, color: 'success.main' }}>+{dollars(improvement)}</Typography>
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

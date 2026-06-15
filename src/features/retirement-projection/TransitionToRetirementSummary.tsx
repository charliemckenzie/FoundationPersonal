'use client';

import { useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Button } from '../../components/Button';
import { Icon } from '../../components/Icon';

interface TransitionToRetirementSummaryProps {
  retirementAge: string;
}

function dollars(value: number): string {
  return `$${value.toLocaleString('en-AU', { maximumFractionDigits: 0 })}`;
}

/** Mock result of completing the TTR journey */
const TTR_RESULT = {
  ttrStartAge: 60,
  ttrIncome: 25000, // annual TTR pension income
  taxSaving: 4200, // annual tax benefit
  additionalSuper: 8500, // extra going into super from salary sacrifice enabled by TTR
};

/**
 * Shows a "Plan your transition to retirement" tile that transitions to a completed summary
 * after the user finishes the TTR journey.
 */
export function TransitionToRetirementSummary({ retirementAge }: TransitionToRetirementSummaryProps) {
  const [completed, setCompleted] = useState(false);

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
        <Box component="img" src="/images/TTR.svg" alt="" sx={{ width: '2rem', height: '2rem', flexShrink: 0 }} />
        <Box sx={{ flex: 1 }}>
          <Typography variant="body" sx={{ fontWeight: 700, mb: 0.5 }}>Plan your transition to retirement</Typography>
          <Typography variant="small" color="text.secondary">If you&rsquo;re getting closer to retirement, you may be able to explore income and contribution strategies.</Typography>
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
          Transition to retirement plan added
        </Typography>
      </Box>

      {/* White body */}
      <Box sx={{ px: 2.5, py: 2, backgroundColor: 'background.paper' }}>
        {/* TTR breakdown */}
        <Stack spacing={0} sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1.5, borderBottom: '1px solid', borderColor: 'divider' }}>
            <Typography variant="small" sx={{ fontWeight: 500 }}>TTR start age</Typography>
            <Typography variant="small" sx={{ fontWeight: 700 }}>{TTR_RESULT.ttrStartAge}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1.5, borderBottom: '1px solid', borderColor: 'divider' }}>
            <Typography variant="small" sx={{ fontWeight: 500 }}>TTR pension income</Typography>
            <Typography variant="small" sx={{ fontWeight: 700 }}>{dollars(TTR_RESULT.ttrIncome)}/yr</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1.5, borderBottom: '1px solid', borderColor: 'divider' }}>
            <Typography variant="small" sx={{ fontWeight: 500 }}>Estimated tax saving</Typography>
            <Typography variant="small" sx={{ fontWeight: 700, color: 'success.main' }}>{dollars(TTR_RESULT.taxSaving)}/yr</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1.5 }}>
            <Typography variant="small" sx={{ fontWeight: 600 }}>Extra into super (salary sacrifice)</Typography>
            <Typography variant="small" sx={{ fontWeight: 700 }}>{dollars(TTR_RESULT.additionalSuper)}/yr</Typography>
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
            By combining TTR income with salary sacrifice, you maintain take-home pay while boosting your super before age {retirementAge || '67'}.
          </Typography>
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

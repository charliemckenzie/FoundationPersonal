'use client';

import { useState } from 'react';
import Box from '@mui/material/Box';
import { Button } from '../../components/Button';
import { JourneyTile } from './JourneyTile';
import { SuccessSummaryCard, SummaryRow, ImpactBox } from './SuccessSummaryCard';
import { formatCurrency } from './format';

interface TransitionToRetirementSummaryProps {
  retirementAge: string;
}

/** Mock result of completing the TTR journey */
const TTR_RESULT = {
  ttrStartAge: 60,
  ttrIncome: 25000, // annual TTR pension income
  taxSaving: 4200, // annual tax benefit
  additionalSuper: 8500, // extra going into super from salary sacrifice enabled by TTR
};

/**
 * "Plan your transition to retirement" journey — a call-to-action tile that
 * becomes a completed summary after the user finishes the TTR journey.
 */
export function TransitionToRetirementSummary({ retirementAge }: TransitionToRetirementSummaryProps) {
  const [completed, setCompleted] = useState(false);

  if (!completed) {
    return (
      <JourneyTile
        image="/images/ttr.svg"
        icon="plus"
        title="Plan your transition to retirement"
        description="If you’re getting closer to retirement, you may be able to explore income and contribution strategies."
        onActivate={() => setCompleted(true)}
      />
    );
  }

  return (
    <SuccessSummaryCard
      title="Transition to retirement plan added"
      actions={
        <>
          <Button label="View details" size="small" variant="outlined" />
          <Button label="Undo" size="small" variant="ghost" onClick={() => setCompleted(false)} />
        </>
      }
    >
      <Box sx={{ mb: 2 }}>
        <SummaryRow label="TTR start age" value={String(TTR_RESULT.ttrStartAge)} />
        <SummaryRow label="TTR pension income" value={formatCurrency(TTR_RESULT.ttrIncome, { perYear: true })} />
        <SummaryRow label="Estimated tax saving" value={formatCurrency(TTR_RESULT.taxSaving, { perYear: true })} tone="positive" />
        <SummaryRow
          label="Extra into super (salary sacrifice)"
          value={formatCurrency(TTR_RESULT.additionalSuper, { perYear: true })}
          strongLabel
          divider={false}
        />
      </Box>
      <ImpactBox
        label={`By combining TTR income with salary sacrifice, you maintain take-home pay while boosting your super before age ${retirementAge || '67'}.`}
      />
    </SuccessSummaryCard>
  );
}

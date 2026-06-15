'use client';

import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Button } from '../../components/Button';
import { JourneyTile } from './JourneyTile';
import { SuccessSummaryCard, SummaryRow, ImpactBox } from './SuccessSummaryCard';
import { formatCurrency } from './format';

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

/**
 * "Add more to your super" journey — a call-to-action tile that becomes a
 * completed summary after the user finishes the contributions journey.
 */
export function ContributionsSummary({ projectedBalance }: ContributionsSummaryProps) {
  const [completed, setCompleted] = useState(false);

  // Simulated impact: extra contributions grow the balance by ~8%
  const improvement = Math.round(projectedBalance * 0.08);

  if (!completed) {
    return (
      <JourneyTile
        image="/images/add-to-super.svg"
        icon="plus"
        title="Add more to your super"
        description="Adding extra contributions may improve your projection, but it can also reduce your take-home pay."
        onActivate={() => setCompleted(true)}
      />
    );
  }

  return (
    <SuccessSummaryCard
      title="Extra contributions added"
      actions={
        <>
          <Button label="View details" size="small" variant="outlined" />
          <Button label="Undo" size="small" variant="ghost" onClick={() => setCompleted(false)} />
        </>
      }
    >
      <Box sx={{ mb: 2 }}>
        <SummaryRow label="Salary sacrifice" value={`${formatCurrency(CONTRIBUTION_CHANGES.salarySacrifice)}/fn`} />
        <SummaryRow label="After-tax contributions" value={`${formatCurrency(CONTRIBUTION_CHANGES.afterTax)}/fn`} />
        <SummaryRow label="Total extra per year" value={formatCurrency(CONTRIBUTION_CHANGES.additionalPerYear)} strongLabel divider={false} />
      </Box>
      <ImpactBox label="Projected impact on your super balance">
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <Typography variant="small">Improvement</Typography>
          <Typography variant="small" sx={{ fontWeight: 700, color: 'success.main' }}>
            {formatCurrency(improvement, { signed: true })}
          </Typography>
        </Box>
      </ImpactBox>
    </SuccessSummaryCard>
  );
}

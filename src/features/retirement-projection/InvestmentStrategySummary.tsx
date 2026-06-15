'use client';

import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Button } from '../../components/Button';
import { JourneyTile } from './JourneyTile';
import { SuccessSummaryCard, SummaryRow, ImpactBox } from './SuccessSummaryCard';
import { formatCurrency } from './format';

interface InvestmentStrategySummaryProps {
  /** The current projected super balance (before strategy change). Used to calculate impact. */
  projectedBalance: number;
}

/** Mock recommended allocation from the investment journey */
const RECOMMENDED_MIX = [
  { option: 'High Growth', allocation: 60, color: 'primary.main' },
  { option: 'Balanced', allocation: 25, color: 'primary.light' },
  { option: 'Conservative', allocation: 15, color: 'secondary.main' },
];

/** Simulates the projected improvement from switching to the recommended mix */
function estimateImpact(currentBalance: number): { improvedBalance: number; difference: number } {
  // Simplified: recommended mix expected to yield ~0.8% p.a. more over the accumulation period
  const improvementFactor = 1.12; // ~12% more at retirement from better allocation
  const improvedBalance = Math.round(currentBalance * improvementFactor);
  return { improvedBalance, difference: improvedBalance - currentBalance };
}

/**
 * "Add investment strategy" journey — a call-to-action tile that becomes a
 * completed summary after the user finishes the investment journey.
 */
export function InvestmentStrategySummary({ projectedBalance }: InvestmentStrategySummaryProps) {
  const [completed, setCompleted] = useState(false);
  const { improvedBalance, difference } = estimateImpact(projectedBalance);

  return (
    <Box sx={{ mt: 2 }}>
      {!completed ? (
        <JourneyTile
          image="/images/investment-mix.svg"
          icon="plus"
          title="Add investment strategy"
          description="Changing how your super is invested may affect your projected balance and the level of risk you take."
          onActivate={() => setCompleted(true)}
        />
      ) : (
        <SuccessSummaryCard
          title="Investment strategy updated"
          actions={
            <>
              <Button label="View details" size="small" variant="outlined" />
              <Button label="Undo" size="small" variant="ghost" onClick={() => setCompleted(false)} />
            </>
          }
        >
          <Typography variant="small" color="text.muted" sx={{ mb: 2, lineHeight: 1.6 }}>
            Based on your age, risk tolerance, and retirement timeline, here’s your recommended mix:
          </Typography>

          <Box sx={{ mb: 2 }}>
            {RECOMMENDED_MIX.map((item, index) => (
              <SummaryRow
                key={item.option}
                label={item.option}
                value={`${item.allocation}%`}
                divider={index < RECOMMENDED_MIX.length - 1}
              />
            ))}
          </Box>

          {/* Allocation bar */}
          <Box sx={{ display: 'flex', height: '0.5rem', borderRadius: '0.25rem', overflow: 'hidden', mb: 2 }}>
            {RECOMMENDED_MIX.map((item) => (
              <Box key={item.option} sx={{ width: `${item.allocation}%`, backgroundColor: item.color }} />
            ))}
          </Box>

          <ImpactBox label="Projected impact on your super balance">
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', mb: 0.5 }}>
              <Typography variant="small">New projected balance</Typography>
              <Typography variant="small" sx={{ fontWeight: 700 }}>{formatCurrency(improvedBalance)}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <Typography variant="small">Improvement</Typography>
              <Typography variant="small" sx={{ fontWeight: 700, color: 'success.main' }}>
                {formatCurrency(difference, { signed: true })}
              </Typography>
            </Box>
          </ImpactBox>
        </SuccessSummaryCard>
      )}
    </Box>
  );
}

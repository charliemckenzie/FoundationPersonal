'use client';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { WorkedExample } from './WorkedExample';
import { ordinal } from '../utils';
import type { InvestmentOption } from '../types';

/** Lower-risk options are drawn from first in the default payment order. */
const RISK_ORDER: Record<string, number> = {
  'Very low': 0,
  'Low': 1,
  'Low to medium': 2,
  'Medium': 3,
  'Medium to high': 4,
  'High': 5,
  'Very high': 6,
  'Varies by age': 7,
};

function riskRank(riskLevel: string): number {
  return RISK_ORDER[riskLevel] ?? 99;
}

const GRID_COLUMNS = '1fr 6rem 8rem';

interface PaymentDefaultOrderProps {
  options: InvestmentOption[];
  allocations: Record<string, number>;
}

/** Read-only detail of the default payment order shown under "Choose for me". */
export function PaymentDefaultOrder({ options, allocations }: PaymentDefaultOrderProps) {
  const optionsByRisk = [...options].sort((a, b) => riskRank(a.riskLevel) - riskRank(b.riskLevel));
  const firstName = optionsByRisk[0]?.name;
  const lastName = optionsByRisk[optionsByRisk.length - 1]?.name;

  return (
    <Stack spacing={2}>
      <Typography variant="h6">The order we&apos;ll use</Typography>

      <Box
        sx={{
          border: '1px solid',
          borderColor: 'border.subtle',
          borderRadius: (t) => `${t.shape.sm}px`,
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: GRID_COLUMNS,
            gap: 2,
            px: 2.5,
            py: 2,
            bgcolor: 'background.default',
          }}
        >
          <Typography variant="small" sx={{ fontWeight: 700, color: 'text.muted' }}>
            Option
          </Typography>
          <Typography variant="small" sx={{ fontWeight: 700, color: 'text.muted', textAlign: 'right' }}>
            Invested
          </Typography>
          <Typography variant="small" sx={{ fontWeight: 700, color: 'text.muted', textAlign: 'right' }}>
            Payment order
          </Typography>
        </Box>
        <Divider />
        <Stack divider={<Divider />}>
          {optionsByRisk.map((option, index) => {
            const cue =
              index === 0 ? 'Drawn first' : index === optionsByRisk.length - 1 ? 'Drawn last' : null;
            return (
              <Box
                key={option.id}
                sx={{
                  display: 'grid',
                  gridTemplateColumns: GRID_COLUMNS,
                  gap: 2,
                  alignItems: 'center',
                  px: 2.5,
                  py: 1.5,
                }}
              >
                <Typography variant="body">{option.name}</Typography>
                <Typography variant="body" sx={{ textAlign: 'right', color: 'text.muted' }}>
                  {allocations[option.id] ?? 0}%
                </Typography>
                <Stack spacing={0} sx={{ alignItems: 'flex-end' }}>
                  <Typography variant="small" sx={{ fontWeight: 700, color: 'text.muted' }}>
                    {ordinal(index)}
                  </Typography>
                  {cue && (
                    <Typography variant="caption" sx={{ color: 'text.muted' }}>
                      {cue}
                    </Typography>
                  )}
                </Stack>
              </Box>
            );
          })}
        </Stack>
      </Box>

      {firstName && lastName && firstName !== lastName && (
        <WorkedExample>
          <Typography variant="body">
            Each withdrawal or payment will draw from {firstName} first, as it has the lowest risk.
            When it runs out, we move to the next, finishing with {lastName}, which has the highest
            risk.
          </Typography>
        </WorkedExample>
      )}
    </Stack>
  );
}

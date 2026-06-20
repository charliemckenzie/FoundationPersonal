'use client';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type { Theme } from '@mui/material/styles';
import { IconButton } from '../IconButton';
import { formatDate } from '../../lib/format';
import { CurrentMixSummary } from './CurrentMixSummary';
import type { InvestmentMixDial, InvestmentOption } from './InvestmentOverview.types';

interface DialItemProps {
  dial: InvestmentMixDial;
  options: InvestmentOption[];
}

/** A single investment dial card: title row with an edit button, optional subtitle, rebalancing status, and the mix. */
export function DialItem({ dial, options }: DialItemProps) {
  const rebalancingLine =
    dial.rebalancing === undefined
      ? null
      : dial.rebalancing.nextDate
        ? `Next rebalance ${formatDate(dial.rebalancing.nextDate)}`
        : 'No rebalancing on this mix';

  return (
    <Box
      component="li"
      sx={(t: Theme) => ({
        backgroundColor: 'background.paper',
        border: '1px solid',
        borderColor: 'border.default',
        borderRadius: `${t.shape.sm}px`,
        p: 2.5,
      })}
    >
      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5, mb: 2 }}>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography variant="h6">{dial.title}</Typography>
          {dial.subtitle && (
            <Typography variant="small" sx={{ color: 'text.muted' }}>
              {dial.subtitle}
            </Typography>
          )}
          {rebalancingLine !== null && (
            <Typography variant="small" sx={{ color: 'text.muted' }}>
              {rebalancingLine}
            </Typography>
          )}
        </Box>
        {dial.onEdit && (
          <IconButton
            icon="pen-to-square"
            iconStyle="regular"
            label={dial.editLabel ?? 'Edit investment mix'}
            variant="ghost"
            size="small"
            onClick={dial.onEdit}
          />
        )}
      </Box>

      <CurrentMixSummary options={options} allocations={dial.allocations} />
    </Box>
  );
}

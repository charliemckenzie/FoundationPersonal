'use client';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { Alert } from '../../../components/Alert';
import { PercentageField } from '../../../components/PercentageField';
import { PaymentWorkedExample } from './PaymentWorkedExample';
import { formatCurrency } from '../utils';
import type { InvestmentOption } from '../types';

/** Illustrative payment used to turn the percentage split into dollar amounts. */
const EXAMPLE_PAYMENT = 1500;

const GRID_COLUMNS = '1fr 6rem 7rem';

interface PaymentPercentageSplitProps {
  /** Allocated options the member can split payments across. */
  options: InvestmentOption[];
  /** Balance allocation per option, for the "Invested" context column and "Match my mix". */
  allocations: Record<string, number>;
  percentages: Record<string, number>;
  onChange: (percentages: Record<string, number>) => void;
  showError: boolean;
}

export function PaymentPercentageSplit({
  options,
  allocations,
  percentages,
  onChange,
  showError,
}: PaymentPercentageSplitProps) {
  const total = options.reduce((sum, o) => sum + (percentages[o.id] ?? 0), 0);
  const error = showError && total !== 100;
  const complete = total === 100;

  function setOne(optionId: string, value: number | null) {
    const clamped = value == null ? 0 : Math.min(100, Math.max(0, value));
    onChange({ ...percentages, [optionId]: clamped });
  }

  const splitRows = options
    .filter((o) => (percentages[o.id] ?? 0) > 0)
    .map((o) => ({
      name: o.name,
      pct: percentages[o.id],
      amount: (EXAMPLE_PAYMENT * percentages[o.id]) / 100,
    }));

  return (
    <Stack spacing={2}>
      <div>
        <Typography variant="h6" sx={{ mb: 0.5 }}>
          Set your split
        </Typography>
        <Typography variant="body">
          Set a percentage for each option. They must total 100%.
        </Typography>
      </div>

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
            Payment %
          </Typography>
        </Box>
        <Divider />
        <Stack divider={<Divider />}>
          {options.map((option) => (
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
              <Box sx={{ flexShrink: 0 }}>
                <PercentageField
                  aria-label={`Percentage for ${option.name}`}
                  value={percentages[option.id] ?? null}
                  size="small"
                  condensed
                  fullWidth
                  error={error}
                  onChange={(v) => setOne(option.id, v)}
                />
              </Box>
            </Box>
          ))}
        </Stack>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            gap: 1,
            px: 2.5,
            py: 1.5,
            bgcolor: error ? 'error.background' : complete ? 'success.background' : 'background.default',
          }}
        >
          <Typography variant="small" sx={{ color: 'text.muted' }}>
            Total
          </Typography>
          <Typography
            variant="body"
            sx={{
              fontWeight: 700,
              color: error ? 'error.text' : complete ? 'success.text' : 'text.primary',
              minWidth: '3rem',
              textAlign: 'right',
            }}
          >
            {total}%
          </Typography>
        </Box>
      </Box>

      {error && (
        <Alert
          severity="error"
          message={`Your total is ${total}%. Adjust the percentages to equal exactly 100%.`}
        />
      )}

      {splitRows.length > 0 && (
        <PaymentWorkedExample>
          <Typography variant="body">
            An example {formatCurrency(EXAMPLE_PAYMENT)} payment would be made up of:
          </Typography>
          <Stack spacing={0.25} sx={{ mt: 0.25 }}>
            {splitRows.map((row) => (
              <Box key={row.name} sx={{ display: 'grid', gridTemplateColumns: '8rem 1fr', gap: 1 }}>
                <Typography variant="body" sx={{ fontWeight: 700 }}>
                  {formatCurrency(row.amount)} ({row.pct}%)
                </Typography>
                <Typography variant="body">{row.name}</Typography>
              </Box>
            ))}
          </Stack>
          <Typography variant="body">
            We&apos;ll split every payment this way while each option has money in it. If one runs
            out, we&apos;ll take its share from your remaining options.
          </Typography>
        </PaymentWorkedExample>
      )}
    </Stack>
  );
}

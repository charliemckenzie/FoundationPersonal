'use client';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Alert } from '../../../components/Alert';
import { DataGrid } from '../../../components/DataGrid';
import type { DataGridColumn } from '../../../components/DataGrid';
import { PercentageField } from '../../../components/PercentageField';
import { WorkedExample } from './WorkedExample';
import { formatCurrency } from '../utils';
import type { InvestmentOption } from '../types';

/** Illustrative payment used to turn the percentage split into dollar amounts. */
const EXAMPLE_PAYMENT = 1500;

interface PaymentPercentageSplitProps {
  /** Allocated options the member can split payments across. */
  options: InvestmentOption[];
  /** Balance allocation per option, for the "Invested" context column. */
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

  const columns: DataGridColumn<InvestmentOption>[] = [
    {
      key: 'name',
      label: 'Option',
      width: '1fr',
      renderCell: (row) => (
        <Stack spacing={0}>
          <Typography variant="body">{row.name}</Typography>
          <Typography variant="small" sx={{ color: 'text.muted' }}>Risk: {row.riskLevel}</Typography>
          <Typography variant="small" sx={{ color: 'text.muted' }}>
            Invested: <Box component="span" sx={{ fontWeight: 700 }}>{allocations[row.id] ?? 0}%</Box>
          </Typography>
        </Stack>
      ),
    },
    {
      key: 'payment',
      label: 'Payment %',
      width: '7rem',
      align: 'right',
      renderCell: (row) => (
        <PercentageField
          aria-label={`Percentage for ${row.name}`}
          value={percentages[row.id] ?? null}
          size="medium"
          fullWidth
          error={error}
          onChange={(v) => setOne(row.id, v)}
        />
      ),
    },
  ];

  const summary = (
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
  );

  return (
    <Stack spacing={2}>
      <div>
        <Typography variant="h6" sx={{ mb: 0.5 }}>
          Set your split
        </Typography>
        <Typography variant="body">
          Each time a payment is made, it&apos;s split across your options using these percentages.
          Enter a share for each option. They must add up to 100%.
        </Typography>
      </div>

      <DataGrid label="Payment percentage split" columns={columns} rows={options} summaryRow={summary} />

      {error && (
        <Alert
          severity="error"
          message={`Your total is ${total}%. Adjust the percentages to equal exactly 100%.`}
        />
      )}

      {splitRows.length > 0 && (
        <WorkedExample>
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
        </WorkedExample>
      )}
    </Stack>
  );
}

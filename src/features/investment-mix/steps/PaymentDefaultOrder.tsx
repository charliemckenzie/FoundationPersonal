'use client';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { DataGrid } from '../../../components/DataGrid';
import type { DataGridColumn } from '../../../components/DataGrid';
import { WorkedExample } from './WorkedExample';
import { formatCurrency } from '../utils';
import type { InvestmentOption } from '../types';

interface PaymentDefaultOrderProps {
  options: InvestmentOption[];
  allocations: Record<string, number>;
}

/** Explains how proportional drawing works and shows the member's own split. */
export function PaymentDefaultOrder({ options, allocations }: PaymentDefaultOrderProps) {
  const optionsByAllocation = [...options].sort(
    (a, b) => (allocations[b.id] ?? 0) - (allocations[a.id] ?? 0),
  );

  const columns: DataGridColumn<InvestmentOption>[] = [
    {
      key: 'name',
      label: 'Option',
      width: '1fr',
      renderCell: (row) => (
        <Stack spacing={0}>
          <Typography variant="body">{row.name}</Typography>
          <Typography variant="small" sx={{ color: 'text.muted' }}>
            Risk: {row.riskLevel}
          </Typography>
        </Stack>
      ),
    },
    {
      key: 'share',
      label: 'Share of payment',
      header: (
        <>
          <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>Share of payment</Box>
          <Box component="span" sx={{ display: { xs: 'inline', sm: 'none' } }}>Share</Box>
        </>
      ),
      width: '8rem',
      align: 'right',
      renderCell: (row) => (
        <Typography variant="body" sx={{ fontWeight: 700 }}>
          {allocations[row.id] ?? 0}%
        </Typography>
      ),
    },
  ];

  const [first, second] = optionsByAllocation;
  const showExample = first !== undefined && second !== undefined;

  return (
    <Stack spacing={2}>
      <Typography variant="h6">How payments are drawn</Typography>

      <DataGrid label="Proportional payment shares" columns={columns} rows={optionsByAllocation} />

      {showExample && (
        <WorkedExample>
          <Typography variant="body">
            For a $1,000 payment, {formatCurrency((allocations[first.id] ?? 0) * 10)} would come
            from {first.name} and {formatCurrency((allocations[second.id] ?? 0) * 10)} from{' '}
            {second.name}
            {optionsByAllocation.length > 2 && ', and so on for your other options'} — keeping the
            same proportions as your investment mix.
          </Typography>
        </WorkedExample>
      )}
    </Stack>
  );
}

'use client';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { DataGrid } from '../../../components/DataGrid';
import type { DataGridColumn } from '../../../components/DataGrid';
import { WorkedExample } from './WorkedExample';
import { PaymentOrderCell, type PaymentOrderMeta } from './PaymentOrderCell';
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

interface PaymentDefaultOrderProps {
  options: InvestmentOption[];
  allocations: Record<string, number>;
}

/** Read-only detail of the default payment order shown under "Choose for me". */
export function PaymentDefaultOrder({ options, allocations }: PaymentDefaultOrderProps) {
  const optionsByRisk = [...options].sort((a, b) => riskRank(a.riskLevel) - riskRank(b.riskLevel));
  const lastIndex = optionsByRisk.length - 1;
  const orderMeta = new Map<string, PaymentOrderMeta>(
    optionsByRisk.map((o, i) => [o.id, { ord: ordinal(i) }]),
  );
  const firstName = optionsByRisk[0]?.name;
  const lastName = optionsByRisk[lastIndex]?.name;

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
      key: 'order',
      label: 'Payment order',
      header: (
        <>
          <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>Payment order</Box>
          <Box component="span" sx={{ display: { xs: 'inline', sm: 'none' } }}>Order</Box>
        </>
      ),
      width: '8rem',
      align: 'right',
      renderCell: (row) => <PaymentOrderCell meta={orderMeta.get(row.id)} />,
    },
  ];

  return (
    <Stack spacing={2}>
      <Typography variant="h6">The order we&apos;ll use</Typography>

      <DataGrid label="Default payment order" columns={columns} rows={optionsByRisk} />

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

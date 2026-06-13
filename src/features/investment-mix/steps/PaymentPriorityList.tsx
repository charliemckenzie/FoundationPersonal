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

interface PaymentPriorityListProps {
  /** Allocated options the member can order. */
  options: InvestmentOption[];
  /** Option IDs in priority order (drawn from index 0 first). */
  order: string[];
  /** Balance allocation per option, for the "Invested" context column. */
  allocations: Record<string, number>;
  onReorder: (order: string[]) => void;
}

export function PaymentPriorityList({ options, order, allocations, onReorder }: PaymentPriorityListProps) {
  const orderedOptions = order
    .map((id) => options.find((o) => o.id === id))
    .filter((o): o is InvestmentOption => o !== undefined);

  const lastIndex = orderedOptions.length - 1;
  const orderMeta = new Map<string, PaymentOrderMeta>(
    orderedOptions.map((o, i) => [o.id, { ord: ordinal(i) }]),
  );

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

  const firstName = orderedOptions[0]?.name;
  const lastName = orderedOptions[lastIndex]?.name;

  return (
    <Stack spacing={2}>
      <div>
        <Typography variant="h6" sx={{ mb: 0.5 }}>
          Set your order
        </Typography>
        <Typography variant="body">Drag to reorder, or use the arrows.</Typography>
      </div>

      <DataGrid
        label="Payment order"
        columns={columns}
        rows={orderedOptions}
        reorderable
        onReorder={(ids) => onReorder(ids.map(String))}
      />

      {firstName && lastName && firstName !== lastName && (
        <WorkedExample>
          <Typography variant="body">
            We&apos;ll take each payment from {firstName} first. Once it&apos;s used up, we&apos;ll
            start taking it from {lastName}. Over time this draws down {firstName} and leaves your
            other options invested for longer.
          </Typography>
        </WorkedExample>
      )}
    </Stack>
  );
}

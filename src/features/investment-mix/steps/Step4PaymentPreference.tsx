'use client';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { RadioGroup } from '../../../components/RadioGroup';
import { PaymentDefaultOrder } from './PaymentDefaultOrder';
import { PaymentPriorityList } from './PaymentPriorityList';
import { PaymentPercentageSplit } from './PaymentPercentageSplit';
import type { InvestmentOption, PaymentPreference } from '../types';

interface Step4PaymentPreferenceProps {
  /** Investment options the member has allocated to (non-zero). */
  allocatedOptions: InvestmentOption[];
  /** Current balance allocation percentages from the previous step. */
  allocations: Record<string, number>;
  preference: PaymentPreference | null;
  onChange: (preference: PaymentPreference) => void;
  showValidation: boolean;
  /** Brand name — kept for API compatibility. */
  brandName: string;
}

/**
 * Three peer methods, each with the official FO42/PDS term and a "Best if…" cue.
 * `brand-chooses` is order-of-priority with the order set for the member (lowest→highest risk).
 */
const METHOD_OPTIONS = [
  {
    value: 'brand-chooses',
    label: 'Automatically draw from lowest to highest risk',
    description: 'Best if you’d rather we manage it for you.',
  },
  {
    value: 'priority',
    label: 'Draw in an order you choose',
    description: 'Best if you want to keep some options invested for longer.',
  },
  {
    value: 'percentage',
    label: 'Take a set share from every option',
    description: 'Best if you want to keep your investment mix about the same over time.',
  },
];

export function Step4PaymentPreference({
  allocatedOptions,
  allocations,
  preference,
  onChange,
  showValidation,
  brandName: _brandName,
}: Step4PaymentPreferenceProps) {
  // No default — the member must actively choose a method. Empty string = nothing selected.
  const method: string = preference?.type ?? '';

  // Reconcile the saved priority order against the current allocated options: keep the saved
  // order for options still allocated, then append any newly-allocated options not yet ordered.
  const allocatedIds = allocatedOptions.map((o) => o.id);
  const savedOrder = preference?.priorityOrder ?? [];
  const order = [
    ...savedOrder.filter((id) => allocatedIds.includes(id)),
    ...allocatedIds.filter((id) => !savedOrder.includes(id)),
  ];
  const percentages = preference?.percentages ?? {};

  function handleMethodChange(value: string) {
    if (value === 'priority') onChange({ type: 'priority', priorityOrder: order });
    else if (value === 'percentage') onChange({ type: 'percentage', percentages });
    else onChange({ type: 'brand-chooses' });
  }

  return (
    <Stack spacing={3}>
      <div>
        <Typography variant="h5" sx={{ mb: 0.5 }}>
          Payment preferences
        </Typography>
        <Typography variant="body">
          Every time you make a withdrawal or receive a payment from your income account, that money
          is drawn from the options you&apos;re invested in. Decide how your withdrawals and payments
          will affect your investment mix over time.
        </Typography>
      </div>

      <RadioGroup
        legend="How should withdrawals and payments be drawn from your options?"
        options={METHOD_OPTIONS}
        variant="boxed"
        value={method}
        onChange={handleMethodChange}
      />

      {method !== '' && <Divider sx={{ borderColor: 'border.subtle' }} />}

      {method === 'brand-chooses' && (
        <PaymentDefaultOrder options={allocatedOptions} allocations={allocations} />
      )}

      {method === 'priority' && (
        <PaymentPriorityList
          options={allocatedOptions}
          order={order}
          allocations={allocations}
          onReorder={(next) => onChange({ type: 'priority', priorityOrder: next })}
        />
      )}

      {method === 'percentage' && (
        <PaymentPercentageSplit
          options={allocatedOptions}
          allocations={allocations}
          percentages={percentages}
          onChange={(next) => onChange({ type: 'percentage', percentages: next })}
          showError={showValidation}
        />
      )}
    </Stack>
  );
}

'use client';

import { useEffect } from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { RadioGroup } from '../../../components/RadioGroup';
import { PaymentDefaultOrder } from './PaymentDefaultOrder';
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
  /** Brand name -- kept for API compatibility. */
  brandName: string;
}

const METHOD_OPTIONS = [
  {
    value: 'proportional',
    label: 'Proportionally across my balance',
    description: 'Each payment is drawn from your options in the same proportion as your current balance at the time of payment.',
  },
  {
    value: 'percentage',
    label: 'From specific options by percentage',
    description: 'Set what share of each payment comes from each option. If one runs out, we draw the rest proportionally.',
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
  // Proportional is the form default -- pre-select it on mount if no preference is saved yet.
  useEffect(() => {
    if (preference === null) {
      onChange({ type: 'proportional' });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const method: string = preference?.type ?? 'proportional';
  const percentages = preference?.percentages ?? {};

  function handleMethodChange(value: string) {
    if (value === 'percentage') onChange({ type: 'percentage', percentages });
    else onChange({ type: 'proportional' });
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

      <Divider sx={{ borderColor: 'border.subtle' }} />

      {method === 'proportional' && (
        <PaymentDefaultOrder options={allocatedOptions} allocations={allocations} />
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

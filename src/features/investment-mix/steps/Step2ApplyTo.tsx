'use client';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { RadioGroup } from '../../../components/RadioGroup';
import type { ApplyTo } from '../types';

interface Step2ApplyToProps {
  applyTo: ApplyTo | null;
  isIncomeAccount: boolean;
  onChange: (value: ApplyTo) => void;
}

const INCOME_COMMON_OPTIONS = [
  {
    value: 'income-both' as ApplyTo,
    label: 'Change both balance and payments',
    description: 'Updates where your current balance is invested and which options your payments and withdrawals are taken from.',
  },
];

const INCOME_OTHER_OPTIONS = [
  {
    value: 'income-balance' as ApplyTo,
    label: 'Change current balance only',
    description: 'Updates where your balance is invested. Your payment and withdrawal options remain unchanged.',
  },
  {
    value: 'income-payments' as ApplyTo,
    label: 'Change payment/withdrawal options only',
    description: 'Updates which investment options your future payments and withdrawals are taken from. Your current balance stays invested as-is.',
  },
];

const ACCUM_COMMON_OPTIONS = [
  {
    value: 'all' as ApplyTo,
    label: 'Change both current balance and future contributions',
    description: 'Your entire account will be invested according to your new mix.',
  },
];

const ACCUM_OTHER_OPTIONS = [
  {
    value: 'balance' as ApplyTo,
    label: 'Change current balance only',
    description: 'Updates where your existing balance is invested. Future contributions remain unchanged.',
  },
  {
    value: 'future' as ApplyTo,
    label: 'Change future contributions only',
    description: 'Updates where new contributions are invested. Your current balance remains unchanged.',
  },
];

export function Step2ApplyTo({ applyTo, isIncomeAccount, onChange }: Step2ApplyToProps) {
  if (isIncomeAccount) {
    return (
      <Stack spacing={3}>
        <div>
          <Typography variant="h5" sx={{ mb: 0.5 }}>
            What do you want to change?
          </Typography>
          <Typography variant="body">
            Choose whether to update your balance investment, your payment options, or both.
          </Typography>
        </div>

        <Stack spacing={3}>
          <Stack spacing={1.5}>
            <Typography variant="h6">Most commonly used</Typography>
            <RadioGroup
              options={INCOME_COMMON_OPTIONS}
              variant="boxed"
              value={applyTo ?? ''}
              onChange={(v) => onChange(v as ApplyTo)}
            />
          </Stack>

          <Stack spacing={1.5}>
            <Stack spacing={0.5}>
              <Typography variant="h6">Other options</Typography>
              <Typography variant="body">
                Use these options to change only part of your investment mix.
              </Typography>
            </Stack>
            <RadioGroup
              options={INCOME_OTHER_OPTIONS}
              variant="boxed"
              value={applyTo ?? ''}
              onChange={(v) => onChange(v as ApplyTo)}
            />
          </Stack>
        </Stack>
      </Stack>
    );
  }

  return (
    <Stack spacing={3}>
      <div>
        <Typography variant="h5" sx={{ mb: 0.5 }}>
          What do you want to change?
        </Typography>
        <Typography variant="body">
          Choose whether this change applies to your current balance, future contributions, or both.
        </Typography>
      </div>

      <Stack spacing={3}>
        <Stack spacing={1.5}>
          <Typography variant="h6">
            Most commonly used
          </Typography>
          <RadioGroup
            options={ACCUM_COMMON_OPTIONS}
            variant="boxed"
            value={applyTo ?? ''}
            onChange={(v) => onChange(v as ApplyTo)}
          />
        </Stack>

        <Stack spacing={1.5}>
          <Stack spacing={0.5}>
            <Typography variant="h6">
              Other options
            </Typography>
            <Typography variant="body">
              Use these options to change only part of your investment mix.
            </Typography>
          </Stack>
          <RadioGroup
            options={ACCUM_OTHER_OPTIONS}
            variant="boxed"
            value={applyTo ?? ''}
            onChange={(v) => onChange(v as ApplyTo)}
          />
        </Stack>
      </Stack>
    </Stack>
  );
}


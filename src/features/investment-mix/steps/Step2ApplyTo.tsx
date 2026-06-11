'use client';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { RadioGroup } from '../../../components/RadioGroup';
import type { ApplyTo } from '../types';
import { APPLY_TO_OPTIONS, INCOME_APPLY_TO_OPTIONS } from '../types';

interface Step2ApplyToProps {
  applyTo: ApplyTo | null;
  isIncomeAccount: boolean;
  onChange: (value: ApplyTo) => void;
}

export function Step2ApplyTo({ applyTo, isIncomeAccount, onChange }: Step2ApplyToProps) {
  const options = isIncomeAccount ? INCOME_APPLY_TO_OPTIONS : APPLY_TO_OPTIONS;

  return (
    <Stack spacing={3}>
      <div>
        <Typography variant="h5" sx={{ mb: 0.5 }}>
          What do you want to change?
        </Typography>
        <Typography variant="body" sx={{ color: 'text.muted' }}>
          {isIncomeAccount
            ? 'Choose whether to update your balance investment, your payment options, or both.'
            : 'Choose whether this change applies to your current balance, future contributions, or both.'}
        </Typography>
      </div>

      <RadioGroup
        options={options.map((o) => ({
          value: o.value,
          label: o.label,
          description: o.description,
        }))}
        variant="boxed"
        value={applyTo ?? ''}
        onChange={(v) => onChange(v as ApplyTo)}
      />
    </Stack>
  );
}

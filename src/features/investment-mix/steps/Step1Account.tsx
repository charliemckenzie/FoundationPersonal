'use client';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { RadioGroup } from '../../../components/RadioGroup';
import type { InvestmentAccount } from '../types';
import { formatCurrency } from '../utils';

interface Step1AccountProps {
  accounts: InvestmentAccount[];
  selectedAccountId: string;
  onChange: (id: string) => void;
}

export function Step1Account({ accounts, selectedAccountId, onChange }: Step1AccountProps) {
  return (
    <Stack spacing={3}>
      <div>
        <Typography variant="h5" sx={{ mb: 0.5 }}>
          Select account
        </Typography>
        <Typography variant="body" sx={{ color: 'text.muted' }}>
          Choose the account you want to update.
        </Typography>
      </div>

      <RadioGroup
        options={accounts.map((a) => ({
          value: a.id,
          label: a.name,
          description: `${a.accountNumber} · ${formatCurrency(a.balance)}`,
        }))}
        variant="boxed"
        value={selectedAccountId}
        onChange={onChange}
      />
    </Stack>
  );
}

import Stack from '@mui/material/Stack';
import { RadioGroup } from '@/components/RadioGroup';
import { MoneyField } from '@/components/MoneyField';
import { AMOUNT_OPTIONS } from '../types';
import type { TransferAmount, TransferAmountType } from '../types';

export interface AmountChoiceProps {
  value: TransferAmount;
  onChange: (amount: TransferAmount) => void;
  error?: string;
}

export function AmountChoice({ value, onChange, error }: AmountChoiceProps) {
  return (
    <Stack spacing={2}>
      <RadioGroup
        legend="Amount to transfer"
        options={AMOUNT_OPTIONS}
        value={value.type}
        onChange={(type) => onChange({ type: type as TransferAmountType, amount: type === 'full' ? undefined : value.amount })}
        variant="card"
        error={!!error}
        errorMessage={error}
      />

      {value.type === 'partial' && (
        <MoneyField
          label="Enter amount"
          value={value.amount ?? 0}
          onChange={(amount) => onChange({ ...value, amount: amount ?? undefined })}
          required
          helperText="Enter the dollar amount you want to transfer."
        />
      )}
    </Stack>
  );
}

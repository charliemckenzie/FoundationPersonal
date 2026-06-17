import Stack from '@mui/material/Stack';
import { TextField } from '@/components/TextField';
import { Checkbox } from '@/components/Checkbox';
import { AmountChoice } from './AmountChoice';
import type { TransferAmount } from '../types';

export interface FundDetailFieldsProps {
  /** Fund name value. */
  fundName: string;
  /** ABN value. */
  abn: string;
  /** USI value — hidden when isSmsf is true. */
  usi: string;
  /** ESA value — shown only when isSmsf is true. */
  esa: string;
  /** Fund phone value — hidden when isSmsf is true. */
  fundPhone: string;
  /** Member/account number. */
  memberNumber: string;
  /** Transfer amount choice. */
  amount: TransferAmount;
  /** Whether this is an SMSF — changes visible fields. */
  isSmsf?: boolean;
  /** Bank verified attestation — shown only when isSmsf is true. */
  bankVerified?: boolean;
  /** Change handler for all fields. */
  onChange: (field: string, value: string | boolean | TransferAmount) => void;
  /** Field-level errors keyed by field name. */
  errors?: Record<string, string>;
}

export function FundDetailFields({
  fundName,
  abn,
  usi,
  esa,
  fundPhone,
  memberNumber,
  amount,
  isSmsf = false,
  bankVerified = false,
  onChange,
  errors = {},
}: FundDetailFieldsProps) {
  return (
    <Stack spacing={3}>
      <TextField
        label={isSmsf ? 'SMSF name' : 'Fund name'}
        value={fundName}
        onChange={(e) => onChange('fundName', e.target.value)}
        required
        error={!!errors.fundName}
        helperText={errors.fundName}
      />

      <TextField
        label="ABN"
        value={abn}
        onChange={(e) => onChange('abn', e.target.value)}
        required
        error={!!errors.abn}
        helperText={errors.abn || 'Australian Business Number'}
      />

      {isSmsf ? (
        <TextField
          label="ESA (Electronic Service Address)"
          value={esa}
          onChange={(e) => onChange('esa', e.target.value)}
          required
          error={!!errors.esa}
          helperText={
            errors.esa ||
            'Required for SMSF rollovers. Usually ends in .superstream.net.au'
          }
        />
      ) : (
        <TextField
          label="USI (Unique Superannuation Identifier)"
          value={usi}
          onChange={(e) => onChange('usi', e.target.value)}
          helperText="Enter USI if known, or 'N/A' for SMSF."
          error={!!errors.usi}
        />
      )}

      {!isSmsf && (
        <TextField
          label="Fund phone number"
          value={fundPhone}
          onChange={(e) => onChange('fundPhone', e.target.value)}
          type="tel"
          helperText="Optional — may help with processing."
          error={!!errors.fundPhone}
        />
      )}

      <TextField
        label={isSmsf ? 'Your member number with this SMSF' : 'Your member/account number'}
        value={memberNumber}
        onChange={(e) => onChange('memberNumber', e.target.value)}
        required
        error={!!errors.memberNumber}
        helperText={errors.memberNumber || 'As shown on your fund statement.'}
      />

      {isSmsf && (
        <Checkbox
          label="I confirm my SMSF's bank details are current with the ATO"
          checked={bankVerified}
          onChange={(checked) => onChange('bankVerified', checked)}
          error={!!errors.bankVerified}
          errorMessage={errors.bankVerified}
        />
      )}

      <AmountChoice
        value={amount}
        onChange={(val) => onChange('amount', val)}
        error={errors.amount}
      />
    </Stack>
  );
}

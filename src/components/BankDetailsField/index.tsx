import { useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { TextField } from '../TextField';
import { parseBsbDigits, formatBsb, lookupBsbBank } from './utils';
import type { BankDetailsValue } from './types';

export interface BankDetailsFieldProps {
  onChange?: (value: BankDetailsValue) => void;
  defaultValue?: BankDetailsValue;
  showValidation?: boolean;
  disabled?: boolean;
}

const DEFAULT_VALUE: BankDetailsValue = {
  bsb: '',
  accountNumber: '',
  accountName: '',
};

const visuallyHidden = {
  position: 'absolute',
  width: '1px',
  height: '1px',
  overflow: 'hidden',
  clip: 'rect(0,0,0,0)',
  whiteSpace: 'nowrap',
} as const;

export function BankDetailsField({
  onChange,
  defaultValue = DEFAULT_VALUE,
  showValidation = false,
  disabled = false,
}: BankDetailsFieldProps) {
  const [value, setValue] = useState<BankDetailsValue>(defaultValue);

  function updateField<K extends keyof BankDetailsValue>(key: K, next: BankDetailsValue[K]) {
    const updated = { ...value, [key]: next };
    setValue(updated);
    onChange?.(updated);
  }

  const bsbDigits = parseBsbDigits(value.bsb);
  const bsbBankName = lookupBsbBank(value.bsb);
  const bsbError = showValidation && bsbDigits.length < 6;
  const bsbStatusMessage = !bsbError && bsbBankName ? `BSB recognised: ${bsbBankName}` : '';

  return (
    <>
      <Box
        component="span"
        role="status"
        aria-live="polite"
        aria-atomic="true"
        sx={visuallyHidden}
      >
        {bsbStatusMessage}
      </Box>
      <Stack
        component="fieldset"
        spacing={2}
        sx={{ border: 'none', padding: 0, margin: 0, minWidth: 0 }}
      >
        <Box component="legend" sx={visuallyHidden}>
          Bank account details
        </Box>
        <TextField
          label="Account name"
          fullWidth
          required
          value={value.accountName}
          disabled={disabled}
          error={showValidation && !value.accountName.trim()}
          errorMessage={showValidation && !value.accountName.trim() ? 'Account name is required' : undefined}
          onChange={(event) => updateField('accountName', event.target.value)}
        />
        <TextField
          label="BSB"
          fullWidth
          required
          value={value.bsb}
          placeholder="000-000"
          disabled={disabled}
          error={bsbError}
          errorMessage={bsbError ? 'A valid 6-digit BSB is required' : undefined}
          helperText={bsbError ? undefined : (bsbBankName ?? undefined)}
          onChange={(event) => {
            const digits = parseBsbDigits(event.target.value);
            updateField('bsb', formatBsb(digits));
          }}
          htmlInputProps={{ inputMode: 'numeric', pattern: '[0-9\\-]*', maxLength: 7 }}
        />
        <TextField
          label="Account number"
          fullWidth
          required
          value={value.accountNumber}
          disabled={disabled}
          error={showValidation && !value.accountNumber.trim()}
          errorMessage={showValidation && !value.accountNumber.trim() ? 'Account number is required' : undefined}
          onChange={(event) => updateField('accountNumber', event.target.value)}
        />
      </Stack>
    </>
  );
}

export type { BankDetailsValue } from './types';


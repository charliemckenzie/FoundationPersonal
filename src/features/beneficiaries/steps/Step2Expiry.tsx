'use client';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { RadioGroup } from '../../../components/RadioGroup';
import type { ExpiryOption } from '../types';
import { EXPIRY_OPTIONS } from '../types';

interface Step2ExpiryProps {
  expiry: ExpiryOption;
  onChange: (expiry: ExpiryOption) => void;
}

export function Step2Expiry({ expiry, onChange }: Step2ExpiryProps) {
  return (
    <Stack spacing={3}>
      <div>
        <Typography variant="h5" sx={{ mb: 0.5 }}>Nomination expiry</Typography>
        <Typography variant="body" sx={{ color: 'text.muted' }}>
          Choose how long this nomination should remain active.
        </Typography>
      </div>

      <RadioGroup
        options={EXPIRY_OPTIONS.map((o) => ({ value: o.value, label: o.label, description: o.description }))}
        variant="boxed"
        value={expiry}
        onChange={(v) => onChange(v as ExpiryOption)}
      />
    </Stack>
  );
}

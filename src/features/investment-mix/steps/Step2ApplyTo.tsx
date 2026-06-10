'use client';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { RadioGroup } from '../../../components/RadioGroup';
import type { ApplyTo } from '../types';
import { APPLY_TO_OPTIONS } from '../types';

interface Step2ApplyToProps {
  applyTo: ApplyTo | null;
  onChange: (value: ApplyTo) => void;
}

export function Step2ApplyTo({ applyTo, onChange }: Step2ApplyToProps) {
  return (
    <Stack spacing={3}>
      <div>
        <Typography variant="h5" sx={{ mb: 0.5 }}>
          What do you want to change?
        </Typography>
        <Typography variant="body" sx={{ color: 'text.muted' }}>
          Choose whether this change applies to your current balance, future contributions, or both.
        </Typography>
      </div>

      <RadioGroup
        options={APPLY_TO_OPTIONS.map((o) => ({
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

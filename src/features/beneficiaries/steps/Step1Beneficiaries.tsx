'use client';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Alert } from '../../../components/Alert';
import { BeneficiaryRepeater } from '../BeneficiaryRepeater';
import { AllocationTotal } from '../AllocationTotal';
import type { BeneficiaryDraft } from '../types';
import { totalAllocation } from '../utils';

interface Step1BeneficiariesProps {
  beneficiaries: BeneficiaryDraft[];
  onChange: (updated: BeneficiaryDraft[]) => void;
  error: string | null;
  expandedId: string;
  onExpandedChange: (id: string) => void;
}

export function Step1Beneficiaries({ beneficiaries, onChange, error, expandedId, onExpandedChange }: Step1BeneficiariesProps) {
  const total = totalAllocation(beneficiaries);

  return (
    <Stack spacing={3}>
      <div>
        <Typography variant="h5" sx={{ mb: 0.5 }}>Nominate beneficiaries</Typography>
        <Typography variant="body" sx={{ color: 'text.muted' }}>
          Add the people you would like to receive your benefit and set their allocation percentages.
        </Typography>
      </div>

      <BeneficiaryRepeater beneficiaries={beneficiaries} onChange={onChange} expandedId={expandedId} onExpandedChange={onExpandedChange} />

      <AllocationTotal total={total} />

      {error && <Alert severity="error" message={error} />}
    </Stack>
  );
}

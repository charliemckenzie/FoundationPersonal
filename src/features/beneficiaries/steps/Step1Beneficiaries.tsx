'use client';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Alert } from '../../../components/Alert';
import { BeneficiaryRepeater } from '../BeneficiaryRepeater';
import { AllocationTotal } from '../AllocationTotal';
import type { BeneficiaryDraft } from '../types';
import type { Step1Validation } from '../utils';
import { totalAllocation } from '../utils';

interface Step1BeneficiariesProps {
  beneficiaries: BeneficiaryDraft[];
  onChange: (updated: BeneficiaryDraft[]) => void;
  validation: Step1Validation | null;
  expandedId: string;
  onExpandedChange: (id: string) => void;
}

export function Step1Beneficiaries({ beneficiaries, onChange, validation, expandedId, onExpandedChange }: Step1BeneficiariesProps) {
  const total = totalAllocation(beneficiaries);
  const hasFieldErrors = validation ? Object.keys(validation.fieldErrors).length > 0 : false;

  return (
    <Stack spacing={3}>
      <div>
        <Typography variant="h5" sx={{ mb: 0.5 }}>Nominate beneficiaries</Typography>
        <Typography variant="body" sx={{ color: 'text.muted' }}>
          Add the people you would like to receive your benefit and set their allocation percentages.
        </Typography>
      </div>

      <BeneficiaryRepeater
        beneficiaries={beneficiaries}
        onChange={onChange}
        expandedId={expandedId}
        onExpandedChange={onExpandedChange}
        fieldErrors={validation?.fieldErrors ?? {}}
      />

      <AllocationTotal total={total} attempted={validation !== null} />

      {hasFieldErrors && (
        <Alert severity="error" message="Please complete the highlighted fields before continuing." />
      )}
    </Stack>
  );
}

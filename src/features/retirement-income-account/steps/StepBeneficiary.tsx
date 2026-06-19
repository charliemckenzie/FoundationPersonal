'use client';

import { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { RadioGroup } from '../../../components/RadioGroup';
import { Select } from '../../../components/Select';
import { TextField } from '../../../components/TextField';
import { DateOfBirthField } from '../../../components/DateOfBirthField';
import { TextButton } from '../../../components/TextButton';
import { Dialog } from '../../../components/Dialog';
import type { BeneficiaryState } from '../types';

const RELATIONSHIP_OPTIONS = [
  { value: 'spouse', label: 'Spouse' },
  { value: 'de-facto', label: 'De facto' },
];

const RELATIONSHIP_INFO = [
  {
    value: 'spouse',
    label: 'Spouse',
    description: "A person you're legally married to.",
  },
  {
    value: 'de-facto',
    label: 'De facto',
    description: 'A person who, you live with on a genuine domestic basis in a relationship as a couple.',
  },
];

interface StepBeneficiaryProps {
  beneficiaryState: BeneficiaryState;
  onBeneficiaryStateChange: (next: BeneficiaryState) => void;
  showValidation: boolean;
}

export function StepBeneficiary({
  beneficiaryState,
  onBeneficiaryStateChange,
  showValidation,
}: StepBeneficiaryProps) {
  const [infoOpen, setInfoOpen] = useState(false);
  const { nominate, beneficiary: b } = beneficiaryState;

  function updateField(field: keyof typeof b, value: string) {
    onBeneficiaryStateChange({
      ...beneficiaryState,
      beneficiary: { ...b, [field]: value },
    });
  }

  const showForm = nominate === 'yes';

  const missingRelationship = showValidation && showForm && !b.relationship;
  const missingFirstName = showValidation && showForm && !b.firstName;
  const missingLastName = showValidation && showForm && !b.lastName;
  const missingDob = showValidation && showForm && !b.dateOfBirth;

  return (
    <Stack spacing={2}>
      <div>
        <Typography variant="h5" sx={{ mb: 0.5 }}>Reversionary beneficiary</Typography>
        <Stack spacing={1.5} sx={{ mt: 1 }}>
        <Typography variant="body" sx={{ color: 'text.primary' }}>
          A reversionary beneficiary will continue to receive your income payments if you die.
          You can nominate one dependent to continue to receive regular income payments from your
          account or withdraw your money as a lump sum.
        </Typography>
        <Typography variant="body" sx={{ color: 'text.primary' }}>
          Your reversionary beneficiary nomination will be taken into account over any binding
          death benefit nomination you have in place.
        </Typography>
        <Box>
          <TextButton
            label="Who can I nominate as a beneficiary"
            size="medium"
            startIcon="circle-info"
            onClick={() => setInfoOpen(true)}
          />
        </Box>
        </Stack>
      </div>

      <Box
        sx={{
          border: '1px solid',
          borderColor: 'border.default',
          borderRadius: (t) => `${t.shape.md}px`,
          backgroundColor: 'background.paper',
          p: 3,
        }}
      >
        <Stack spacing={3}>
          <RadioGroup
            legend="Do you want to nominate a reversionary beneficiary?"
            legendSx={{ typography: 'h6', color: 'text.heading', fontWeight: 700, mb: 2, '&.Mui-focused': { color: 'text.heading' } }}
            options={[
              { value: 'yes', label: 'Yes' },
              { value: 'no', label: 'No' },
            ]}
            value={nominate}
            direction="row"
            onChange={(v) =>
              onBeneficiaryStateChange({ ...beneficiaryState, nominate: v as 'yes' | 'no' })
            }
          />

          {showForm && (
            <Stack spacing={2.5}>
              <Select
                    label="Relationship"
                    options={RELATIONSHIP_OPTIONS}
                    value={b.relationship}
                    onChange={(v) => updateField('relationship', v)}
                    error={missingRelationship}
                    errorMessage={missingRelationship ? 'Relationship is required' : undefined}
                    helperText={!missingRelationship ? (RELATIONSHIP_INFO.find((r) => r.value === b.relationship)?.description ?? undefined) : undefined}
                    required
                    fullWidth
                    placeholder="Select relationship"
                  />

                {b.relationship && (
                  <>
                    <Grid container spacing={2}>
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                          label="First name"
                          value={b.firstName}
                          onChange={(e) => updateField('firstName', e.target.value)}
                          error={missingFirstName}
                          errorMessage={missingFirstName ? 'First name is required' : undefined}
                          required
                          fullWidth
                        />
                      </Grid>
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                          label="Last name"
                          value={b.lastName}
                          onChange={(e) => updateField('lastName', e.target.value)}
                          error={missingLastName}
                          errorMessage={missingLastName ? 'Last name is required' : undefined}
                          required
                          fullWidth
                        />
                      </Grid>
                    </Grid>
                    <TextField
                      label="Middle name (optional)"
                      helperText="If you don't have a middle name you can leave this field blank."
                      value={b.middleName}
                      onChange={(e) => updateField('middleName', e.target.value)}
                      fullWidth
                    />
                    <DateOfBirthField
                      label="Date of birth"
                      value={b.dateOfBirth}
                      onChange={(e) => updateField('dateOfBirth', e.target.value)}
                      error={missingDob}
                      errorMessage={missingDob ? 'Date of birth is required' : undefined}
                      required
                      fullWidth
                    />
                    <TextField
                      label="Phone number"
                      type="tel"
                      value={b.phone}
                      onChange={(e) => updateField('phone', e.target.value)}
                      fullWidth
                    />
                    <TextField
                      label="Email address"
                      type="email"
                      value={b.email}
                      onChange={(e) => updateField('email', e.target.value)}
                      fullWidth
                    />
                  </>
                )}
            </Stack>
          )}
        </Stack>
      </Box>

      <Dialog
        open={infoOpen}
        onClose={() => setInfoOpen(false)}
        title="Who can I nominate as a reversionary beneficiary?"
        size="medium"
        cancelLabel="Close"
      >
        <Stack spacing={2.5} sx={{ pt: 1 }}>
          {RELATIONSHIP_INFO.map(({ label, description }) => (
            <Box key={label}>
              <Typography variant="body" sx={{ fontWeight: 700, display: 'block', mb: 0.5 }}>
                {label}
              </Typography>
              <Typography variant="body">{description}</Typography>
            </Box>
          ))}
        </Stack>
      </Dialog>
    </Stack>
  );
}

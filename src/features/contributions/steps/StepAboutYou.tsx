'use client';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { TextField } from '../../../components/TextField';
import { MoneyField } from '../../../components/MoneyField';
import type { ContributionsState } from '../types';
import { SALARY_FREQUENCY_OPTIONS } from '../constants';

const NUMERIC_INPUT_PROPS = { inputMode: 'numeric', pattern: '[0-9]*' } as const;

function digitsOnly(value: string): string {
  return value.replace(/\D/g, '');
}

export interface StepAboutYouErrors {
  currentAge?: string;
  retirementAge?: string;
  salary?: string;
  superBalance?: string;
}

interface StepAboutYouProps {
  state: ContributionsState;
  errors?: StepAboutYouErrors;
  onChange: (patch: Partial<ContributionsState>) => void;
  clearError: (key: keyof StepAboutYouErrors) => void;
}

export function StepAboutYou({ state, errors, onChange, clearError }: StepAboutYouProps) {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: 'repeat(12, 1fr)' },
        columnGap: { xs: 0, md: 3 },
        rowGap: 3,
      }}
    >
      <Box sx={{ gridColumn: { md: '1 / 6' } }}>
        <Typography variant="h4" component="h2" sx={{ mb: 1 }}>
          About you
        </Typography>
        <Typography variant="body" color="text.muted">
          We need some basic information to calculate your contribution caps and
          estimate the tax benefit of additional contributions.
        </Typography>
      </Box>

      <Box sx={{ gridColumn: { md: '7 / 13' } }}>
        <Stack spacing={3}>
          <TextField
            label="How old are you?"
            placeholder="For example, 35"
            htmlInputProps={NUMERIC_INPUT_PROPS}
            value={state.currentAge}
            error={!!errors?.currentAge}
            errorMessage={errors?.currentAge}
            onChange={(e) => { onChange({ currentAge: digitsOnly(e.target.value) }); clearError('currentAge'); }}
          />

          <TextField
            label="When would you like to retire?"
            placeholder="For example, 67"
            htmlInputProps={NUMERIC_INPUT_PROPS}
            value={state.retirementAge}
            error={!!errors?.retirementAge}
            errorMessage={errors?.retirementAge}
            onChange={(e) => { onChange({ retirementAge: digitsOnly(e.target.value) }); clearError('retirementAge'); }}
          />

          <MoneyField
            label="What\u2019s your before-tax salary?"
            placeholder="For example, 95,000"
            value={state.salary ? Number(state.salary) : null}
            error={!!errors?.salary}
            errorMessage={errors?.salary}
            onChange={(value) => { onChange({ salary: value?.toString() ?? '' }); clearError('salary'); }}
            selectAdornment={{
              options: SALARY_FREQUENCY_OPTIONS,
              defaultValue: state.salaryFrequency,
              onChange: (freq) => onChange({ salaryFrequency: freq }),
            }}
          />

          <MoneyField
            label="What\u2019s your current ART super balance?"
            placeholder="For example, 180,000"
            value={state.superBalance ? Number(state.superBalance) : null}
            error={!!errors?.superBalance}
            errorMessage={errors?.superBalance}
            onChange={(value) => { onChange({ superBalance: value?.toString() ?? '' }); clearError('superBalance'); }}
          />
        </Stack>
      </Box>
    </Box>
  );
}

'use client';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { MoneyField } from '../../../components/MoneyField';
import { RadioGroup } from '../../../components/RadioGroup';
import type { ContributionsState, ContributionPreference, OptimisationGoal } from '../types';
import { CONTRIBUTION_FREQUENCY_OPTIONS } from '../constants';

export interface StepAffordabilityErrors {
  additionalAmount?: string;
  contributionPreference?: string;
  optimisationGoal?: string;
}

interface StepAffordabilityProps {
  state: ContributionsState;
  errors?: StepAffordabilityErrors;
  onChange: (patch: Partial<ContributionsState>) => void;
  clearError: (key: keyof StepAffordabilityErrors) => void;
}

export function StepAffordability({ state, errors, onChange, clearError }: StepAffordabilityProps) {
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
          Affordability
        </Typography>
        <Typography variant="body" color="text.muted">
          Tell us how much extra you could contribute and how you&rsquo;d like us to
          optimise the recommendation.
        </Typography>
        <Box sx={{ mt: 3, p: 2, borderRadius: '0.75rem', bgcolor: 'background.muted' }}>
          <Typography variant="small" sx={{ fontWeight: 600, display: 'block', mb: 0.5 }}>
            Before-tax vs after-tax
          </Typography>
          <Typography variant="small" color="text.muted">
            <strong>Before-tax</strong> (salary sacrifice or personal deductible) reduces your taxable
            income now and is taxed at 15% in the fund. <strong>After-tax</strong> contributions
            come from money you&rsquo;ve already paid tax on, so no further tax applies in the fund.
          </Typography>
        </Box>
      </Box>

      <Box sx={{ gridColumn: { md: '7 / 13' } }}>
        <Stack spacing={3}>
          <MoneyField
            label="How much extra could you contribute?"
            placeholder="For example, 200"
            value={state.additionalAmount ? Number(state.additionalAmount) : null}
            error={!!errors?.additionalAmount}
            errorMessage={errors?.additionalAmount}
            onChange={(value) => { onChange({ additionalAmount: value?.toString() ?? '' }); clearError('additionalAmount'); }}
            selectAdornment={{
              options: CONTRIBUTION_FREQUENCY_OPTIONS,
              defaultValue: state.additionalAmountFrequency,
              onChange: (freq) => onChange({ additionalAmountFrequency: freq }),
            }}
          />

          <RadioGroup
            legend="How would you prefer to contribute?"
            options={[
              { value: 'before-tax', label: 'Before tax (salary sacrifice)', description: 'Reduces your take-home pay but saves tax immediately' },
              { value: 'after-tax', label: 'After tax', description: 'No immediate tax benefit but flexible' },
              { value: 'mix', label: 'A mix of both', description: 'Fill concessional cap first, then after-tax' },
            ]}
            value={state.contributionPreference ?? ''}
            error={!!errors?.contributionPreference}
            errorMessage={errors?.contributionPreference}
            onChange={(value) => { onChange({ contributionPreference: value as ContributionPreference }); clearError('contributionPreference'); }}
          />

          <RadioGroup
            legend="What\u2019s most important to you?"
            options={[
              { value: 'tax-efficiency', label: 'Minimise tax', description: 'Maximise the tax benefit of contributions' },
              { value: 'balance-growth', label: 'Grow my balance', description: 'Get as much into super as possible' },
              { value: 'take-home-stability', label: 'Protect my take-home pay', description: 'Use personal deductible contributions so fortnightly pay stays the same' },
            ]}
            value={state.optimisationGoal ?? ''}
            error={!!errors?.optimisationGoal}
            errorMessage={errors?.optimisationGoal}
            onChange={(value) => { onChange({ optimisationGoal: value as OptimisationGoal }); clearError('optimisationGoal'); }}
          />
        </Stack>
      </Box>
    </Box>
  );
}

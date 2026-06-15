'use client';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { TextField } from '../../../components/TextField';
import { MoneyField } from '../../../components/MoneyField';
import { RadioGroup } from '../../../components/RadioGroup';
import type { RetirementProjectionState, PartnerDetails, HomeLoanDetails } from '../types';
import type { StepErrors } from '../RetirementProjectionFlow';
import { ThingsToConsider } from '../ThingsToConsider';
import { SALARY_FREQUENCY_OPTIONS, REPAYMENT_FREQUENCY_OPTIONS } from '../constants';

const NUMERIC_INPUT_PROPS = { inputMode: 'numeric', pattern: '[0-9]*' } as const;

/** Keep age inputs digits-only without number-spinner side effects. */
function digitsOnly(value: string): string {
  return value.replace(/\D/g, '');
}

interface StepIncomeProps {
  state: RetirementProjectionState;
  errors?: Pick<StepErrors, 'currentAge' | 'retirementAge'>;
  onCurrentAgeChange: (value: string) => void;
  onRetirementAgeChange: (value: string) => void;
  onSalaryChange: (value: number | null) => void;
  onSalaryFrequencyChange: (value: string) => void;
  onIncludePartnerChange: (value: string) => void;
  onPartnerChange: (partner: PartnerDetails) => void;
  onOwnHomeChange: (value: string) => void;
  onHomeLoanChange: (loan: HomeLoanDetails) => void;
  sectionLabel?: string;
}

export function StepIncome({
  state,
  errors,
  onCurrentAgeChange,
  onRetirementAgeChange,
  onSalaryChange,
  onSalaryFrequencyChange,
  onIncludePartnerChange,
  onPartnerChange,
  onOwnHomeChange,
  onHomeLoanChange,
  sectionLabel,
}: StepIncomeProps) {
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
        {sectionLabel && (
          <Typography variant="small" sx={{ display: 'block', fontWeight: 600, mb: 1, color: 'text.muted' }}>
            {sectionLabel}
          </Typography>
        )}
        <Typography variant="h4" component="h2" sx={{ mb: 1 }}>
          Tell us about you and your income
        </Typography>
        <Typography variant="body" color="text.muted">
          We&rsquo;ll use this to estimate your future super balance and retirement income.
        </Typography>
        <ThingsToConsider items={[
          'Preservation age (when you can access super) is currently 60',
          'Age Pension eligibility starts at 67',
        ]} />
      </Box>

      <Box sx={{ gridColumn: { md: '7 / 13' } }}>
        <Stack spacing={3}>
          <TextField
            label="How old are you?"
            placeholder="For example, 45"
            htmlInputProps={NUMERIC_INPUT_PROPS}
            value={state.currentAge}
            error={!!errors?.currentAge}
            errorMessage={errors?.currentAge}
            onChange={(e) => onCurrentAgeChange(digitsOnly(e.target.value))}
          />

          <TextField
            label="When would you like to retire?"
            placeholder="For example, 67"
            htmlInputProps={NUMERIC_INPUT_PROPS}
            value={state.retirementAge}
            error={!!errors?.retirementAge}
            errorMessage={errors?.retirementAge}
            onChange={(e) => onRetirementAgeChange(digitsOnly(e.target.value))}
          />

          <MoneyField
            label="What's your before-tax salary?"
            placeholder="For example, 95,000"
            onChange={onSalaryChange}
            value={state.salary ? Number(state.salary) : null}
            selectAdornment={{
              options: SALARY_FREQUENCY_OPTIONS,
              defaultValue: state.salaryFrequency,
              onChange: onSalaryFrequencyChange,
            }}
          />

          <RadioGroup
            legend="Do you want to include a partner in this projection?"
            options={[
              { value: 'yes', label: 'Yes' },
              { value: 'no', label: 'No' },
            ]}
            value={state.includePartner}
            direction="row"
            onChange={onIncludePartnerChange}
          />

          {state.includePartner === 'yes' && (
            <Box
              sx={{
                border: '1px solid',
                borderColor: 'border.default',
                borderRadius: '0.75rem',
                p: 3,
              }}
            >
              <Stack spacing={3}>
                <TextField
                  label="How old is your partner?"
                  placeholder="For example, 47"
                  htmlInputProps={NUMERIC_INPUT_PROPS}
                  value={state.partner.age}
                  onChange={(e) =>
                    onPartnerChange({ ...state.partner, age: digitsOnly(e.target.value) })
                  }
                />
                <TextField
                  label="What age does your partner plan to retire?"
                  placeholder="For example, 67"
                  htmlInputProps={NUMERIC_INPUT_PROPS}
                  value={state.partner.retirementAge}
                  onChange={(e) =>
                    onPartnerChange({ ...state.partner, retirementAge: digitsOnly(e.target.value) })
                  }
                />
                <MoneyField
                  label="What is your partner's salary before tax?"
                  placeholder="For example, 80,000"
                  value={state.partner.salary ? Number(state.partner.salary) : null}
                  onChange={(value) =>
                    onPartnerChange({ ...state.partner, salary: value?.toString() ?? '' })
                  }
                  selectAdornment={{
                    options: SALARY_FREQUENCY_OPTIONS,
                    defaultValue: state.partner.salaryFrequency,
                    onChange: (value) =>
                      onPartnerChange({ ...state.partner, salaryFrequency: value }),
                  }}
                />
              </Stack>
            </Box>
          )}

          <RadioGroup
            legend="Do you expect to own your home when you retire?"
            options={[
              { value: 'yes', label: 'Yes' },
              { value: 'no', label: 'No' },
            ]}
            value={state.ownHome}
            direction="row"
            onChange={onOwnHomeChange}
          />

          {state.ownHome === 'yes' && (
            <Box
              sx={{
                border: '1px solid',
                borderColor: 'border.default',
                borderRadius: '0.75rem',
                p: 3,
              }}
            >
              <Typography variant="h6" sx={{ mb: 2 }}>
                Home loan details
              </Typography>
              <Stack spacing={3}>
                <MoneyField
                  label="Current mortgage balance"
                  placeholder="For example, 250,000"
                  value={state.homeLoan.mortgageBalance ? Number(state.homeLoan.mortgageBalance) : null}
                  onChange={(value) =>
                    onHomeLoanChange({ ...state.homeLoan, mortgageBalance: value?.toString() ?? '' })
                  }
                />
                <MoneyField
                  label="Current mortgage repayments"
                  placeholder="For example, 2,000"
                  value={state.homeLoan.mortgageRepayments ? Number(state.homeLoan.mortgageRepayments) : null}
                  onChange={(value) =>
                    onHomeLoanChange({ ...state.homeLoan, mortgageRepayments: value?.toString() ?? '' })
                  }
                  selectAdornment={{
                    options: REPAYMENT_FREQUENCY_OPTIONS,
                    defaultValue: state.homeLoan.repaymentFrequency,
                    onChange: (value) =>
                      onHomeLoanChange({ ...state.homeLoan, repaymentFrequency: value }),
                  }}
                />
              </Stack>
            </Box>
          )}
        </Stack>
      </Box>
    </Box>
  );
}

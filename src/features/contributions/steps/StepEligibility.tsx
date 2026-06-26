'use client';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { MoneyField } from '../../../components/MoneyField';
import { RadioGroup } from '../../../components/RadioGroup';
import type { ContributionsState } from '../types';
import { CONTRIBUTION_FREQUENCY_OPTIONS, CARRY_FORWARD_BALANCE_THRESHOLD, CONCESSIONAL_CAP } from '../constants';

interface StepEligibilityProps {
  state: ContributionsState;
  onChange: (patch: Partial<ContributionsState>) => void;
}

export function StepEligibility({ state, onChange }: StepEligibilityProps) {
  const balance = Number(state.previousYearBalance) || Number(state.superBalance) || 0;
  const carryForwardEligible = balance < CARRY_FORWARD_BALANCE_THRESHOLD;

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
          Eligibility &amp; caps
        </Typography>
        <Typography variant="body" color="text.muted">
          These questions help us determine if you&rsquo;re eligible to use carry-forward
          unused cap amounts, and whether Division 293 tax applies to you.
        </Typography>
        <Box sx={{ mt: 3, p: 2, borderRadius: '0.75rem', bgcolor: 'background.muted' }}>
          <Typography variant="small" sx={{ fontWeight: 600, display: 'block', mb: 0.5 }}>
            Carry-forward contributions
          </Typography>
          <Typography variant="small" color="text.muted">
            If your total super balance was less than $500,000 on 30 June last year,
            you may be able to use unused concessional cap amounts from the previous
            5 financial years. This could allow you to contribute more than the standard
            ${CONCESSIONAL_CAP.toLocaleString()} cap.
          </Typography>
        </Box>
      </Box>

      <Box sx={{ gridColumn: { md: '7 / 13' } }}>
        <Stack spacing={3}>
          <MoneyField
            label="What was your total super balance on 30 June last year?"
            placeholder="For example, 180,000"
            value={state.previousYearBalance ? Number(state.previousYearBalance) : null}
            onChange={(value) => onChange({ previousYearBalance: value?.toString() ?? '' })}
          />

          {carryForwardEligible && (
            <>
              <RadioGroup
                legend="Do you have unused concessional cap amounts from previous years?"
                options={[
                  { value: 'yes', label: 'Yes' },
                  { value: 'no', label: 'No' },
                  { value: 'unsure', label: "I\u2019m not sure" },
                ]}
                value={state.hasUnusedCarryForward}
                onChange={(value) => onChange({ hasUnusedCarryForward: value })}
              />

              {state.hasUnusedCarryForward === 'yes' && (
                <MoneyField
                  label="Estimated unused carry-forward amount"
                  placeholder="For example, 15,000"
                  value={state.unusedCarryForwardAmount ? Number(state.unusedCarryForwardAmount) : null}
                  onChange={(value) => onChange({ unusedCarryForwardAmount: value?.toString() ?? '' })}
                />
              )}
            </>
          )}

          {!carryForwardEligible && (
            <Box sx={{ p: 2, borderRadius: '0.75rem', border: '1px solid', borderColor: 'border.default' }}>
              <Typography variant="small" color="text.muted">
                Your super balance exceeds $500,000, so carry-forward is not available.
                Your concessional cap is the standard ${CONCESSIONAL_CAP.toLocaleString()}.
              </Typography>
            </Box>
          )}

          <Box sx={{ borderTop: '1px solid', borderColor: 'divider', pt: 3 }}>
            <Typography variant="small" sx={{ fontWeight: 600, display: 'block', mb: 2 }}>
              Other income &amp; deductions
            </Typography>
            <Stack spacing={3}>
              <MoneyField
                label="Other taxable income (investments, rental, etc.)"
                placeholder="0"
                value={state.otherIncomeAmount ? Number(state.otherIncomeAmount) : null}
                onChange={(value) => onChange({ otherIncomeAmount: value?.toString() ?? '' })}
                selectAdornment={{
                  options: CONTRIBUTION_FREQUENCY_OPTIONS,
                  defaultValue: state.otherIncomeFrequency,
                  onChange: (freq) => onChange({ otherIncomeFrequency: freq }),
                }}
              />

              <MoneyField
                label="Tax deductions you plan to claim"
                placeholder="0"
                value={state.taxDeductionsAmount ? Number(state.taxDeductionsAmount) : null}
                onChange={(value) => onChange({ taxDeductionsAmount: value?.toString() ?? '' })}
                selectAdornment={{
                  options: CONTRIBUTION_FREQUENCY_OPTIONS,
                  defaultValue: state.taxDeductionsFrequency,
                  onChange: (freq) => onChange({ taxDeductionsFrequency: freq }),
                }}
              />
            </Stack>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}

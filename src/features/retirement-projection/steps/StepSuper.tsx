'use client';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { MoneyField } from '../../../components/MoneyField';
import { RadioGroup } from '../../../components/RadioGroup';
import { LinearProgress } from '../../../components/LinearProgress';
import type { SuperContributions, OtherFundDetails } from '../types';
import { ThingsToConsider } from '../ThingsToConsider';
import { AmountOrPercentField } from '../AmountOrPercentField';
import { toAnnual } from '../projection';
import { formatCurrency } from '../format';
import { CONTRIBUTION_FREQUENCY_OPTIONS, FUND_FREQUENCY_OPTIONS, YEARLY_MONTHLY_OPTIONS } from '../constants';

const CONCESSIONAL_CAP = 30000;

function calcConcessionalTotal(
  contributions: SuperContributions,
  otherFund: OtherFundDetails,
  annualSalary: number,
): number {
  // Employer
  let employer = 0;
  if (contributions.employerRateUnit === 'dollar') {
    employer = parseFloat(contributions.employerRate) || 0;
  } else {
    // An empty rate falls back to the 12% Super Guarantee, matching the projection.
    const pct = contributions.employerRate === '' ? 12 : parseFloat(contributions.employerRate);
    employer = annualSalary > 0 && pct > 0 ? (annualSalary * pct) / 100 : 0;
  }
  // Salary sacrifice
  const salarySacrifice = toAnnual(contributions.salarySacrifice, contributions.salarySacrificeFrequency);
  // Other fund before-tax
  const otherBeforeTax = contributions.contributingToOtherFund === 'yes'
    ? toAnnual(otherFund.beforeTaxContributions, otherFund.beforeTaxFrequency)
    : 0;
  return employer + salarySacrifice + otherBeforeTax;
}

interface StepSuperProps {
  balance: string;
  contributions: SuperContributions;
  otherFund: OtherFundDetails;
  salary: string;
  salaryFrequency: string;
  onBalanceChange: (value: string) => void;
  onContributionsChange: (contributions: SuperContributions) => void;
  onOtherFundChange: (fund: OtherFundDetails) => void;
  sectionLabel?: string;
}

export function StepSuper({
  balance,
  contributions,
  otherFund,
  salary,
  salaryFrequency,
  onBalanceChange,
  onContributionsChange,
  onOtherFundChange,
  sectionLabel,
}: StepSuperProps) {
  const annualSalary = toAnnual(salary, salaryFrequency);
  const concessionalTotal = calcConcessionalTotal(contributions, otherFund, annualSalary);
  const capPercent = Math.min(Math.round((concessionalTotal / CONCESSIONAL_CAP) * 100), 100);
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
        <Typography variant="h4" component="h2" sx={{ mb: 2 }}>
          What&rsquo;s currently going into your super?
        </Typography>
        <Typography variant="body" color="text.muted">
          We&rsquo;ll use these details to understand what you&rsquo;re already contributing and how much room you may have within the relevant contribution caps.
        </Typography>
        <ThingsToConsider items={[
          'The Super Guarantee rate is currently 12%',
          'Concessional (before-tax) contributions are capped at $30,000 per year',
          'Salary sacrifice counts toward the concessional contributions cap',
        ]} />
      </Box>

      <Box sx={{ gridColumn: { md: '7 / 13' } }}>
        <Stack spacing={3}>
          <MoneyField
            label="What's your current super balance?"
            placeholder="For example, 150,000"
            helperText="Your Australian Retirement Trust account balance"
            value={balance ? Number(balance) : null}
            onChange={(value) => onBalanceChange(value?.toString() ?? '')}
          />

          <AmountOrPercentField
            label="How much does your employer pay into super?"
            placeholder="For example, 12"
            helperText="Leave blank to use the 12% Super Guarantee"
            unit={contributions.employerRateUnit}
            value={contributions.employerRate}
            onValueChange={(value) =>
              onContributionsChange({ ...contributions, employerRate: value })
            }
            onUnitChange={(value) =>
              onContributionsChange({ ...contributions, employerRateUnit: value })
            }
          />

          <MoneyField
            label="How much do you salary sacrifice into super?"
            placeholder="For example, 100"
            helperText="Leave blank if you don't salary sacrifice"
            value={contributions.salarySacrifice ? Number(contributions.salarySacrifice) : null}
            onChange={(value) =>
              onContributionsChange({ ...contributions, salarySacrifice: value?.toString() ?? '' })
            }
            selectAdornment={{
              options: CONTRIBUTION_FREQUENCY_OPTIONS,
              defaultValue: contributions.salarySacrificeFrequency,
              onChange: (value) =>
                onContributionsChange({ ...contributions, salarySacrificeFrequency: value }),
            }}
          />

          <MoneyField
            label="How much after-tax money do you add to super?"
            placeholder="For example, 100"
            helperText="Leave blank if you don't make after-tax contributions"
            value={contributions.afterTaxContributions ? Number(contributions.afterTaxContributions) : null}
            onChange={(value) =>
              onContributionsChange({ ...contributions, afterTaxContributions: value?.toString() ?? '' })
            }
            selectAdornment={{
              options: CONTRIBUTION_FREQUENCY_OPTIONS,
              defaultValue: contributions.afterTaxFrequency,
              onChange: (value) =>
                onContributionsChange({ ...contributions, afterTaxFrequency: value }),
            }}
          />

          <RadioGroup
            legend="Do you have any other taxable income or tax deductions?"
            options={[
              { value: 'yes', label: 'Yes' },
              { value: 'no', label: 'No' },
            ]}
            value={contributions.otherTaxableIncome}
            direction="row"
            onChange={(value) =>
              onContributionsChange({ ...contributions, otherTaxableIncome: value })
            }
          />

          {contributions.otherTaxableIncome === 'yes' && (
            <Box
              sx={{
                border: '1px solid',
                borderColor: 'border.default',
                borderRadius: '0.75rem',
                p: 3,
              }}
            >
              <Stack spacing={3}>
                <MoneyField
                  label="Other taxable income"
                  placeholder="For example, 10,000"
                  value={contributions.otherTaxableIncomeAmount ? Number(contributions.otherTaxableIncomeAmount) : null}
                  onChange={(value) =>
                    onContributionsChange({ ...contributions, otherTaxableIncomeAmount: value?.toString() ?? '' })
                  }
                  selectAdornment={{
                    options: YEARLY_MONTHLY_OPTIONS,
                    defaultValue: contributions.otherTaxableIncomeFrequency,
                    onChange: (value) =>
                      onContributionsChange({ ...contributions, otherTaxableIncomeFrequency: value }),
                  }}
                />
                <MoneyField
                  label="Tax deductions"
                  placeholder="For example, 2,000"
                  value={contributions.taxDeductions ? Number(contributions.taxDeductions) : null}
                  onChange={(value) =>
                    onContributionsChange({ ...contributions, taxDeductions: value?.toString() ?? '' })
                  }
                  selectAdornment={{
                    options: YEARLY_MONTHLY_OPTIONS,
                    defaultValue: contributions.taxDeductionsFrequency,
                    onChange: (value) =>
                      onContributionsChange({ ...contributions, taxDeductionsFrequency: value }),
                  }}
                />
              </Stack>
            </Box>
          )}

          <RadioGroup
            legend="Are you making contributions to another super fund?"
            options={[
              { value: 'yes', label: 'Yes' },
              { value: 'no', label: 'No' },
            ]}
            value={contributions.contributingToOtherFund}
            direction="row"
            onChange={(value) =>
              onContributionsChange({ ...contributions, contributingToOtherFund: value })
            }
          />

          {contributions.contributingToOtherFund === 'yes' && (
            <Box
              sx={{
                border: '1px solid',
                borderColor: 'border.default',
                borderRadius: '0.75rem',
                p: 3,
              }}
            >
              <Typography variant="small" color="text.muted" sx={{ display: 'block', mb: 3 }}>
                Contribution caps apply across all your super funds, so including this helps us give you an accurate picture.
              </Typography>

              <Stack spacing={3}>
                <MoneyField
                  label="What's your other fund balance?"
                  placeholder="For example, 25,000"
                  value={otherFund.balance ? Number(otherFund.balance) : null}
                  onChange={(value) =>
                    onOtherFundChange({ ...otherFund, balance: value?.toString() ?? '' })
                  }
                />
                <MoneyField
                  label="How much before-tax money goes to that fund?"
                  placeholder="For example, 3,000"
                  value={otherFund.beforeTaxContributions ? Number(otherFund.beforeTaxContributions) : null}
                  onChange={(value) =>
                    onOtherFundChange({ ...otherFund, beforeTaxContributions: value?.toString() ?? '' })
                  }
                  selectAdornment={{
                    options: FUND_FREQUENCY_OPTIONS,
                    defaultValue: otherFund.beforeTaxFrequency,
                    onChange: (value) =>
                      onOtherFundChange({ ...otherFund, beforeTaxFrequency: value }),
                  }}
                />
                <MoneyField
                  label="How much after-tax money goes to that fund?"
                  placeholder="For example, 1,000"
                  value={otherFund.afterTaxContributions ? Number(otherFund.afterTaxContributions) : null}
                  onChange={(value) =>
                    onOtherFundChange({ ...otherFund, afterTaxContributions: value?.toString() ?? '' })
                  }
                  selectAdornment={{
                    options: FUND_FREQUENCY_OPTIONS,
                    defaultValue: otherFund.afterTaxFrequency,
                    onChange: (value) =>
                      onOtherFundChange({ ...otherFund, afterTaxFrequency: value }),
                  }}
                />
              </Stack>
            </Box>
          )}

          <Box
            sx={{
              border: '1px solid',
              borderColor: 'border.default',
              borderRadius: '0.75rem',
              p: 2.5,
            }}
          >
            <Typography variant="small" sx={{ display: 'block', fontWeight: 700, mb: 0.5 }}>
              Your before-tax contributions
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, mb: 1.5 }}>
              <Typography variant="h5" color="primary.main">
                {formatCurrency(concessionalTotal)}
                <Typography component="span" variant="small" color="text.muted" sx={{ ml: 0.5 }}>/ year</Typography>
              </Typography>
              <Typography variant="small" color={capPercent >= 100 ? 'error.main' : 'text.muted'}>
                {capPercent}% of your {formatCurrency(CONCESSIONAL_CAP)} cap
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={capPercent}
              label={`${capPercent}% of concessional cap used`}
            />
            {capPercent >= 100 && (
              <Typography variant="small" color="error.main" sx={{ display: 'block', mt: 1 }}>
                You&rsquo;ve reached or exceeded your concessional cap. Extra contributions may be taxed differently.
              </Typography>
            )}
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}

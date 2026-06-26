'use client';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { MoneyField } from '../../../components/MoneyField';
import { PercentageField } from '../../../components/PercentageField';
import { RadioGroup } from '../../../components/RadioGroup';
import type { ContributionsState } from '../types';
import { CONTRIBUTION_FREQUENCY_OPTIONS } from '../constants';

interface StepCurrentContributionsProps {
  state: ContributionsState;
  onChange: (patch: Partial<ContributionsState>) => void;
}

export function StepCurrentContributions({ state, onChange }: StepCurrentContributionsProps) {
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
          Your current contributions
        </Typography>
        <Typography variant="body" color="text.muted">
          Tell us what&rsquo;s currently going into your super so we can work out how
          much cap space you have remaining.
        </Typography>
        <Box sx={{ mt: 3, p: 2, borderRadius: '0.75rem', bgcolor: 'background.muted' }}>
          <Typography variant="small" sx={{ fontWeight: 600, display: 'block', mb: 0.5 }}>
            Concessional contributions
          </Typography>
          <Typography variant="small" color="text.muted">
            Include employer SG, additional employer contributions, salary sacrifice, and personal
            deductible contributions. These are taxed at 15% in the fund and count toward the
            $30,000 annual cap.
          </Typography>
        </Box>
      </Box>

      <Box sx={{ gridColumn: { md: '7 / 13' } }}>
        <Stack spacing={3}>
          <PercentageField
            label="Employer SG rate"
            placeholder="12"
            value={state.employerSgRate ? Number(state.employerSgRate) : null}
            onChange={(value) => onChange({ employerSgRate: value?.toString() ?? '' })}
          />

          <MoneyField
            label="Additional employer contributions (above SG)"
            placeholder="0"
            value={state.additionalEmployerContributions ? Number(state.additionalEmployerContributions) : null}
            onChange={(value) => onChange({ additionalEmployerContributions: value?.toString() ?? '' })}
            selectAdornment={{
              options: CONTRIBUTION_FREQUENCY_OPTIONS,
              defaultValue: state.additionalEmployerFrequency,
              onChange: (freq) => onChange({ additionalEmployerFrequency: freq }),
            }}
          />

          <MoneyField
            label="Salary sacrifice (before tax)"
            placeholder="0"
            value={state.salarySacrifice ? Number(state.salarySacrifice) : null}
            onChange={(value) => onChange({ salarySacrifice: value?.toString() ?? '' })}
            selectAdornment={{
              options: CONTRIBUTION_FREQUENCY_OPTIONS,
              defaultValue: state.salarySacrificeFrequency,
              onChange: (freq) => onChange({ salarySacrificeFrequency: freq }),
            }}
          />

          <MoneyField
            label="Personal deductible contributions"
            placeholder="0"
            value={state.personalDeductible ? Number(state.personalDeductible) : null}
            onChange={(value) => onChange({ personalDeductible: value?.toString() ?? '' })}
            selectAdornment={{
              options: CONTRIBUTION_FREQUENCY_OPTIONS,
              defaultValue: state.personalDeductibleFrequency,
              onChange: (freq) => onChange({ personalDeductibleFrequency: freq }),
            }}
          />

          <Box sx={{ borderTop: '1px solid', borderColor: 'divider', pt: 3 }}>
            <Typography variant="small" sx={{ fontWeight: 600, display: 'block', mb: 2 }}>
              Non-concessional (after-tax)
            </Typography>
            <MoneyField
              label="After-tax contributions"
              placeholder="0"
              value={state.afterTaxContributions ? Number(state.afterTaxContributions) : null}
              onChange={(value) => onChange({ afterTaxContributions: value?.toString() ?? '' })}
              selectAdornment={{
                options: CONTRIBUTION_FREQUENCY_OPTIONS,
                defaultValue: state.afterTaxFrequency,
                onChange: (freq) => onChange({ afterTaxFrequency: freq }),
              }}
            />
          </Box>

          <Box sx={{ borderTop: '1px solid', borderColor: 'divider', pt: 3 }}>
            <RadioGroup
              legend="Are you contributing to another super fund?"
              options={[
                { value: 'yes', label: 'Yes' },
                { value: 'no', label: 'No' },
              ]}
              value={state.contributingToOtherFund}
              direction="row"
              onChange={(value) => onChange({ contributingToOtherFund: value })}
            />
          </Box>

          {state.contributingToOtherFund === 'yes' && (
            <Box sx={{ border: '1px solid', borderColor: 'border.default', borderRadius: '0.75rem', p: 3 }}>
              <Stack spacing={3}>
                <Typography variant="small" sx={{ fontWeight: 600 }}>
                  Other fund contributions (these also count toward your caps)
                </Typography>
                <MoneyField
                  label="Before-tax contributions to other fund"
                  placeholder="0"
                  value={state.otherFundBeforeTax ? Number(state.otherFundBeforeTax) : null}
                  onChange={(value) => onChange({ otherFundBeforeTax: value?.toString() ?? '' })}
                  selectAdornment={{
                    options: CONTRIBUTION_FREQUENCY_OPTIONS,
                    defaultValue: state.otherFundBeforeTaxFrequency,
                    onChange: (freq) => onChange({ otherFundBeforeTaxFrequency: freq }),
                  }}
                />
                <MoneyField
                  label="After-tax contributions to other fund"
                  placeholder="0"
                  value={state.otherFundAfterTax ? Number(state.otherFundAfterTax) : null}
                  onChange={(value) => onChange({ otherFundAfterTax: value?.toString() ?? '' })}
                  selectAdornment={{
                    options: CONTRIBUTION_FREQUENCY_OPTIONS,
                    defaultValue: state.otherFundAfterTaxFrequency,
                    onChange: (freq) => onChange({ otherFundAfterTaxFrequency: freq }),
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

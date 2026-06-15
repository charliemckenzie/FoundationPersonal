'use client';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { MoneyField } from '../../../components/MoneyField';
import { AmountOrPercentField } from '../AmountOrPercentField';
import { ThingsToConsider } from '../ThingsToConsider';
import type { PartnerDetails } from '../types';
import { CONTRIBUTION_FREQUENCY_OPTIONS } from '../constants';

interface StepPartnerSuperProps {
  partner: PartnerDetails;
  onPartnerChange: (partner: PartnerDetails) => void;
}

export function StepPartnerSuper({ partner, onPartnerChange }: StepPartnerSuperProps) {
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
        <Typography variant="h4" component="h2" sx={{ mb: 2 }}>
          Your partner&rsquo;s super
        </Typography>
        <Typography variant="body" color="text.secondary">
          Including your partner&rsquo;s super helps us show a combined household retirement picture.
        </Typography>
        <ThingsToConsider items={[
          'We\u2019ll combine your partner\u2019s super with yours when projecting household retirement income',
          'The Super Guarantee rate is currently 12%',
          'If you don\u2019t know their exact contributions, leave them blank and we\u2019ll use defaults',
        ]} />
      </Box>

      <Box sx={{ gridColumn: { md: '7 / 13' } }}>
        <Stack spacing={3}>
          <MoneyField
            label="What is your partner's total super balance?"
            placeholder="For example, 120,000"
            value={partner.superBalance ? Number(partner.superBalance) : null}
            onChange={(value) =>
              onPartnerChange({ ...partner, superBalance: value?.toString() ?? '' })
            }
          />

          <AmountOrPercentField
            label="How much does their employer pay into super?"
            placeholder="For example, 12"
            helperText="Leave blank to use the 12% Super Guarantee"
            unit={partner.employerRateUnit || 'percent'}
            value={partner.employerRate ?? ''}
            onValueChange={(value) =>
              onPartnerChange({ ...partner, employerRate: value })
            }
            onUnitChange={(value) =>
              onPartnerChange({ ...partner, employerRateUnit: value })
            }
          />

          <MoneyField
            label="How much do they salary sacrifice into super?"
            placeholder="For example, 100"
            helperText="Leave blank if they don't salary sacrifice"
            value={partner.salarySacrifice ? Number(partner.salarySacrifice) : null}
            onChange={(value) =>
              onPartnerChange({ ...partner, salarySacrifice: value?.toString() ?? '' })
            }
            selectAdornment={{
              options: CONTRIBUTION_FREQUENCY_OPTIONS,
              defaultValue: partner.salarySacrificeFrequency || 'fortnightly',
              onChange: (value) =>
                onPartnerChange({ ...partner, salarySacrificeFrequency: value }),
            }}
          />

          <MoneyField
            label="How much after-tax money do they add to super?"
            placeholder="For example, 100"
            helperText="Leave blank if they don't make after-tax contributions"
            value={partner.afterTaxContributions ? Number(partner.afterTaxContributions) : null}
            onChange={(value) =>
              onPartnerChange({ ...partner, afterTaxContributions: value?.toString() ?? '' })
            }
            selectAdornment={{
              options: CONTRIBUTION_FREQUENCY_OPTIONS,
              defaultValue: partner.afterTaxFrequency || 'fortnightly',
              onChange: (value) =>
                onPartnerChange({ ...partner, afterTaxFrequency: value }),
            }}
          />
        </Stack>
      </Box>
    </Box>
  );
}

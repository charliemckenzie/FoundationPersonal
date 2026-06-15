'use client';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { RadioGroup } from '../../../components/RadioGroup';
import { MoneyField } from '../../../components/MoneyField';
import { PercentageField } from '../../../components/PercentageField';
import { AmountOrPercentField } from '../AmountOrPercentField';
import type {
  InvestmentPropertyDetails,
  SavingsDetails,
  ManagedFundsDetails,
  DebtsDetails,
} from '../types';
import { ThingsToConsider } from '../ThingsToConsider';

interface StepAssetsDebtsProps {
  ownProperty: string;
  property: InvestmentPropertyDetails;
  hasSavings: string;
  savings: SavingsDetails;
  hasManagedFunds: string;
  managedFunds: ManagedFundsDetails;
  debts: DebtsDetails;
  onOwnPropertyChange: (value: string) => void;
  onPropertyChange: (property: InvestmentPropertyDetails) => void;
  onHasSavingsChange: (value: string) => void;
  onSavingsChange: (savings: SavingsDetails) => void;
  onHasManagedFundsChange: (value: string) => void;
  onManagedFundsChange: (funds: ManagedFundsDetails) => void;
  onDebtsChange: (debts: DebtsDetails) => void;
  sectionLabel?: string;
}

export function StepAssetsDebts({
  ownProperty,
  property,
  hasSavings,
  savings,
  hasManagedFunds,
  managedFunds,
  debts,
  onOwnPropertyChange,
  onPropertyChange,
  onHasSavingsChange,
  onSavingsChange,
  onHasManagedFundsChange,
  onManagedFundsChange,
  onDebtsChange,
  sectionLabel,
}: StepAssetsDebtsProps) {
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
          Tell us about your other assets and debts
        </Typography>
        <Typography variant="body" color="text.secondary">
          Investment properties, savings, managed funds, and debts can all affect your retirement projection.
        </Typography>
        <ThingsToConsider items={[
          'Your family home is generally exempt from the Age Pension assets test',
        ]} />
      </Box>

      <Box sx={{ gridColumn: { md: '7 / 13' } }}>
        <Stack spacing={4}>
          {/* Investment Property */}
          <RadioGroup
            legend="Do you own an investment property?"
            options={[
              { value: 'yes', label: 'Yes' },
              { value: 'no', label: 'No' },
            ]}
            value={ownProperty}
            direction="row"
            onChange={onOwnPropertyChange}
          />

          {ownProperty === 'yes' && (
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
                  label="Current market value"
                  placeholder="For example, 750,000"
                  value={property.marketValue ? Number(property.marketValue) : null}
                  onChange={(value) =>
                    onPropertyChange({ ...property, marketValue: value?.toString() ?? '' })
                  }
                />
                <AmountOrPercentField
                  label="Net rental income each year"
                  placeholder="For example, 4"
                  unit={property.rentalIncomeUnit}
                  value={property.rentalIncome}
                  onValueChange={(value) =>
                    onPropertyChange({ ...property, rentalIncome: value })
                  }
                  onUnitChange={(value) =>
                    onPropertyChange({ ...property, rentalIncomeUnit: value })
                  }
                />
                <AmountOrPercentField
                  label="Expected capital growth each year"
                  placeholder="For example, 3"
                  unit={property.capitalGrowthUnit}
                  value={property.capitalGrowth}
                  onValueChange={(value) =>
                    onPropertyChange({ ...property, capitalGrowth: value })
                  }
                  onUnitChange={(value) =>
                    onPropertyChange({ ...property, capitalGrowthUnit: value })
                  }
                />
                <MoneyField
                  label="Current loans against investment properties"
                  placeholder="For example, 200,000"
                  value={property.currentLoans ? Number(property.currentLoans) : null}
                  onChange={(value) =>
                    onPropertyChange({ ...property, currentLoans: value?.toString() ?? '' })
                  }
                />
                <MoneyField
                  label="Expected monthly repayments in retirement"
                  placeholder="For example, 1,500"
                  value={property.monthlyRepayments ? Number(property.monthlyRepayments) : null}
                  onChange={(value) =>
                    onPropertyChange({ ...property, monthlyRepayments: value?.toString() ?? '' })
                  }
                />
              </Stack>
            </Box>
          )}

          {/* Savings */}
          <RadioGroup
            legend="Do you have any savings you want to include?"
            options={[
              { value: 'yes', label: 'Yes' },
              { value: 'no', label: 'No' },
            ]}
            value={hasSavings}
            direction="row"
            onChange={onHasSavingsChange}
          />

          {hasSavings === 'yes' && (
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
                  label="Total savings"
                  placeholder="For example, 40,000"
                  value={savings.totalSavings ? Number(savings.totalSavings) : null}
                  onChange={(value) =>
                    onSavingsChange({ ...savings, totalSavings: value?.toString() ?? '' })
                  }
                />
                <PercentageField
                  label="Expected interest each year"
                  placeholder="For example, 4"
                  value={savings.expectedInterest ? Number(savings.expectedInterest) : null}
                  onChange={(value) =>
                    onSavingsChange({ ...savings, expectedInterest: value?.toString() ?? '' })
                  }
                />
              </Stack>
            </Box>
          )}

          {/* Managed funds */}
          <RadioGroup
            legend="Do you have managed funds or other non-super investments?"
            options={[
              { value: 'yes', label: 'Yes' },
              { value: 'no', label: 'No' },
            ]}
            value={hasManagedFunds}
            direction="row"
            onChange={onHasManagedFundsChange}
          />

          {hasManagedFunds === 'yes' && (
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
                  label="Current market value"
                  placeholder="For example, 50,000"
                  value={managedFunds.marketValue ? Number(managedFunds.marketValue) : null}
                  onChange={(value) =>
                    onManagedFundsChange({ ...managedFunds, marketValue: value?.toString() ?? '' })
                  }
                />
                <AmountOrPercentField
                  label="Expected net income each year"
                  placeholder="For example, 4"
                  unit={managedFunds.netIncomeUnit}
                  value={managedFunds.netIncome}
                  onValueChange={(value) =>
                    onManagedFundsChange({ ...managedFunds, netIncome: value })
                  }
                  onUnitChange={(value) =>
                    onManagedFundsChange({ ...managedFunds, netIncomeUnit: value })
                  }
                />
                <AmountOrPercentField
                  label="Expected capital growth each year"
                  placeholder="For example, 3"
                  unit={managedFunds.capitalGrowthUnit}
                  value={managedFunds.capitalGrowth}
                  onValueChange={(value) =>
                    onManagedFundsChange({ ...managedFunds, capitalGrowth: value })
                  }
                  onUnitChange={(value) =>
                    onManagedFundsChange({ ...managedFunds, capitalGrowthUnit: value })
                  }
                />
                <MoneyField
                  label="Current loans against these investments"
                  placeholder="For example, 10,000"
                  value={managedFunds.loansAgainst ? Number(managedFunds.loansAgainst) : null}
                  onChange={(value) =>
                    onManagedFundsChange({ ...managedFunds, loansAgainst: value?.toString() ?? '' })
                  }
                />
                <MoneyField
                  label="Monthly repayments on those loans"
                  placeholder="For example, 200"
                  value={managedFunds.monthlyRepayments ? Number(managedFunds.monthlyRepayments) : null}
                  onChange={(value) =>
                    onManagedFundsChange({ ...managedFunds, monthlyRepayments: value?.toString() ?? '' })
                  }
                />
              </Stack>
            </Box>
          )}

          {/* Debts */}
          <MoneyField
            label="Current balance of any personal loans or credit card debts"
            placeholder="For example, 5,000"
            value={debts.personalLoansBalance ? Number(debts.personalLoansBalance) : null}
            onChange={(value) =>
              onDebtsChange({ ...debts, personalLoansBalance: value?.toString() ?? '' })
            }
          />

          {debts.personalLoansBalance && Number(debts.personalLoansBalance) > 0 && (
            <>
              <RadioGroup
                legend="Do you expect to pay off these credit card debts before retiring?"
                options={[
                  { value: 'yes', label: 'Yes' },
                  { value: 'no', label: 'No' },
                ]}
                value={debts.expectToPayOff}
                direction="row"
                onChange={(value) => onDebtsChange({ ...debts, expectToPayOff: value })}
              />
              <MoneyField
                label="Monthly repayments"
                placeholder="For example, 250"
                value={debts.monthlyRepayments ? Number(debts.monthlyRepayments) : null}
                onChange={(value) =>
                  onDebtsChange({ ...debts, monthlyRepayments: value?.toString() ?? '' })
                }
              />
            </>
          )}
        </Stack>
      </Box>
    </Box>
  );
}

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { Theme } from '@mui/material/styles';
import { useMemo } from 'react';
import { Alert } from '../../../components/Alert';
import { Checkbox } from '../../../components/Checkbox';
import { MoneyField } from '../../../components/MoneyField';
import { RadioCardGroup } from '../../../components/RadioGroup/RadioCardGroup';
import { Select } from '../../../components/Select';
import { TextButton } from '../../../components/TextButton';
import type { PaymentSchedule } from '../types';
import { formatCurrency } from '../utils';

// ATO minimum drawdown rate for age 65–74 bracket (2023–24 onwards)
const MIN_DRAWDOWN_RATE = 0.05;
// Mock upper bound: 2× minimum (common industry convention for prototypes)
const MAX_DRAWDOWN_RATE = 0.10;

const FREQUENCY_OPTIONS = [
  { value: 'fortnightly', label: 'Fortnightly' },
  { value: 'monthly', label: 'Monthly' },
  { value: 'quarterly', label: 'Quarterly' },
  { value: 'yearly', label: 'Yearly' },
];

const FREQUENCY_HELPER: Record<string, string> = {
  fortnightly: 'Payments will begin on the 11th of your chosen month and fortnightly thereafter.',
  monthly: 'Payments will begin on the 11th of your chosen month and monthly thereafter.',
  quarterly: 'Payments will begin on the 11th of your chosen month and quarterly thereafter.',
  yearly: 'Payments will begin on the 11th of your chosen month and annually thereafter.',
};

function buildMonthOptions() {
  const options = [];
  const now = new Date();
  for (let i = 1; i <= 12; i++) {
    const d = new Date(now.getFullYear(), now.getMonth() + i, 1);
    const value = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    const label = d.toLocaleDateString('en-AU', { month: 'long', year: 'numeric' });
    options.push({ value, label });
  }
  return options;
}

interface StepPaymentScheduleProps {
  purchaseAmount: number;
  paymentSchedule: PaymentSchedule;
  onPaymentScheduleChange: (next: PaymentSchedule) => void;
  showValidation: boolean;
}

export function StepPaymentSchedule({
  purchaseAmount,
  paymentSchedule,
  onPaymentScheduleChange,
  showValidation,
}: StepPaymentScheduleProps) {
  const monthOptions = useMemo(() => buildMonthOptions(), []);

  const minimumAnnual = purchaseAmount * MIN_DRAWDOWN_RATE;
  const maximumAnnual = purchaseAmount * MAX_DRAWDOWN_RATE;

  function update<K extends keyof PaymentSchedule>(key: K, value: PaymentSchedule[K]) {
    onPaymentScheduleChange({ ...paymentSchedule, [key]: value });
  }

  const paymentTypeOptions = [
    {
      value: 'minimum',
      label: 'Minimum',
      description: purchaseAmount > 0 ? `${formatCurrency(minimumAnnual)} per year` : 'Based on your account balance',
    },
    {
      value: 'specific',
      label: 'Specific amount',
      description: purchaseAmount > 0
        ? `Must be between ${formatCurrency(minimumAnnual)} and ${formatCurrency(maximumAnnual)}`
        : 'Enter an amount between the minimum and maximum',
    },
  ];

  const freqError = showValidation && !paymentSchedule.frequency;
  const monthError = showValidation && !paymentSchedule.firstPaymentMonth;
  const amountTypeError = showValidation && !paymentSchedule.amountType;
  const specificAmountError =
    showValidation &&
    paymentSchedule.amountType === 'specific' &&
    paymentSchedule.specificAmount <= 0;

  return (
    <Stack spacing={4}>
      <Stack spacing={1}>
        <Typography variant="h5" component="h2">Your payments</Typography>
        <Typography variant="body" sx={{ color: 'text.primary' }}>
          Choose how much income to receive from your Retirement Income account and when these payments
          are made. You can change this anytime in Member Online.
        </Typography>
      </Stack>

      {/* ── Payment schedule card ── */}
      <Box
        sx={(t: Theme) => ({
          border: '1px solid',
          borderColor: freqError || monthError ? 'error.main' : 'border.default',
          borderRadius: `${t.shape.lg}px`,
          bgcolor: 'background.paper',
          p: 3,
        })}
      >
        <Stack spacing={3}>
          <Typography variant="h6" component="h3">Payment schedule</Typography>

          <div>
            <Select
              label="Payment frequency"
              fullWidth
              placeholder="Please select"
              options={FREQUENCY_OPTIONS}
              value={paymentSchedule.frequency}
              onChange={(v) => update('frequency', v as PaymentSchedule['frequency'])}
              error={freqError}
              errorMessage={freqError ? 'Select a payment frequency to continue.' : undefined}
            />
            {paymentSchedule.frequency && (
              <Typography variant="small" sx={{ color: 'text.muted', display: 'block', mt: 0.75 }}>
                {FREQUENCY_HELPER[paymentSchedule.frequency]}
              </Typography>
            )}
          </div>

          <Select
            label="First payment date"
            fullWidth
            placeholder="Please select"
            options={monthOptions}
            value={paymentSchedule.firstPaymentMonth}
            onChange={(v) => update('firstPaymentMonth', v)}
            error={monthError}
            errorMessage={monthError ? 'Select a first payment date to continue.' : undefined}
          />
        </Stack>
      </Box>

      {/* ── Payment amount card ── */}
      <Box
        sx={(t: Theme) => ({
          border: '1px solid',
          borderColor: amountTypeError || specificAmountError ? 'error.main' : 'border.default',
          borderRadius: `${t.shape.lg}px`,
          bgcolor: 'background.paper',
          p: 3,
        })}
      >
        <Stack spacing={3}>
          <Typography variant="h6" component="h3">Payment amount</Typography>

          <Stack spacing={1.5}>
            <Typography variant="body" sx={{ color: 'text.primary' }}>
              The Australian Government sets a minimum amount you must receive from your income account
              each financial year. This is based on your age and how much super you have.
            </Typography>
            <TextButton
              label="View minimum rates"
              startIcon="circle-info"
              onClick={() => window.open('https://www.ato.gov.au/tax-rates-and-codes/key-superannuation-rates-and-thresholds/payments-from-super', '_blank', 'noopener,noreferrer')}
            />
          </Stack>

          <Box
            sx={{
              '& .MuiFormControl-root': { width: '100%' },
              '& .MuiFormGroup-root': { flexWrap: 'nowrap', width: '100%' },
              '& .MuiFormControlLabel-root': { flex: 1, minWidth: 0 },
            }}
          >
            <RadioCardGroup
              options={paymentTypeOptions}
              value={paymentSchedule.amountType}
              onChange={(v) => update('amountType', v as PaymentSchedule['amountType'])}
              direction="column"
            />
          </Box>

          {paymentSchedule.amountType === 'specific' && (
            <MoneyField
              label="Specific amount per year"
              value={paymentSchedule.specificAmount || null}
              fullWidth
              error={specificAmountError}
              helperText={specificAmountError ? 'Enter a specific payment amount to continue.' : ''}
              onChange={(v) => update('specificAmount', v ?? 0)}
            />
          )}

          {amountTypeError && (
            <Typography variant="small" sx={{ color: 'error.main' }}>
              Select a payment amount to continue.
            </Typography>
          )}

          <Typography variant="small" sx={{ color: 'text.muted' }}>
            The figures above are estimates and may vary due to daily price changes.
          </Typography>

          <Checkbox
            checked={paymentSchedule.adjustForCPI}
            onChange={(checked) => update('adjustForCPI', checked)}
            label="Adjust my income to cover increases in cost of living"
          />

          <Alert
            severity="info"
            message="If your payments drop below the legislated minimum in future, we will automatically update your payments to the minimum amount allowed and let you know in Member Online and on your annual statement."
          />
        </Stack>
      </Box>
    </Stack>
  );
}

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { Theme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useMemo } from 'react';
import { Alert } from '../../../components/Alert';
import { Checkbox } from '../../../components/Checkbox';
import { Icon } from '../../../components/Icon';
import { MoneyField } from '../../../components/MoneyField';
import { RadioCardGroup } from '../../../components/RadioGroup/RadioCardGroup';
import { Select } from '../../../components/Select';
import type { PaymentSchedule } from '../types';
import { formatCurrency } from '../utils';
import { PENSION_ESTIMATE_AGE } from '../constants';

// ATO minimum drawdown rate for age 65–74 bracket (2023–24 onwards)
const MIN_DRAWDOWN_RATE = 0.05;
// Mock upper bound: 2× minimum (common industry convention for prototypes)
const MAX_DRAWDOWN_RATE = 0.10;

const FREQUENCY_DIVISORS: Record<string, number> = {
  fortnightly: 26,
  monthly: 12,
  quarterly: 4,
  'half-yearly': 2,
  annually: 1,
};

const FREQUENCY_PERIOD_LABEL: Record<string, string> = {
  fortnightly: 'Fortnightly',
  monthly: 'Monthly',
  quarterly: 'Quarterly',
  'half-yearly': '6-monthly',
  annually: 'Annual',
};

const FREQUENCY_OPTIONS = [
  { value: 'fortnightly', label: 'Fortnightly' },
  { value: 'monthly', label: 'Monthly' },
  { value: 'quarterly', label: 'Quarterly' },
  { value: 'half-yearly', label: 'Every 6 months' },
  { value: 'annually', label: 'Annually' },
];

const FREQUENCY_HELPER: Record<string, string> = {
  fortnightly: 'Payments will be made fortnightly on a Wednesday.',
  monthly: 'Payments will begin on the 11th of your chosen month and monthly thereafter.',
  quarterly: 'Payments will begin on the 11th of your chosen month and every 3 months thereafter.',
  'half-yearly': 'Payments will begin on the 11th of your chosen month and every 6 months thereafter.',
  annually: 'Payments will begin on the 11th of your chosen month and annually thereafter.',
};

// Returns the next Wednesday on or after `from`
function nextWednesday(from: Date): Date {
  const d = new Date(from);
  d.setDate(d.getDate() + ((3 - d.getDay() + 7) % 7));
  return d;
}

function toDateString(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function buildDateOptions(frequency: string | null): { value: string; label: string }[] {
  const now = new Date();
  const minDate = new Date(now);
  minDate.setDate(minDate.getDate() + 14);

  if (frequency === 'fortnightly') {
    const options = [];
    let d = nextWednesday(minDate);
    for (let i = 0; i < 13; i++) {
      options.push({
        value: toDateString(d),
        label: d.toLocaleDateString('en-AU', { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' }),
      });
      d = new Date(d);
      d.setDate(d.getDate() + 14);
    }
    return options;
  }

  const monthCount = frequency === 'quarterly' ? 4 : frequency === 'half-yearly' ? 3 : frequency === 'annually' ? 3 : 12;
  const stepMonths = frequency === 'quarterly' ? 3 : frequency === 'half-yearly' ? 6 : frequency === 'annually' ? 12 : 1;
  const dayOfMonth = 11;
  const options = [];
  let year = minDate.getFullYear();
  let month = minDate.getMonth() + (minDate.getDate() > dayOfMonth ? 1 : 0);

  for (let i = 0; i < monthCount; i++) {
    const d = new Date(year, month, dayOfMonth);
    options.push({
      value: toDateString(d),
      label: d.toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' }),
    });
    month += stepMonths;
    if (month >= 12) { year += Math.floor(month / 12); month = month % 12; }
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
  const dateOptions = useMemo(() => buildDateOptions(paymentSchedule.frequency ?? null), [paymentSchedule.frequency]);

  const isMobile = useMediaQuery((t: Theme) => t.breakpoints.down('sm'));

  const minimumAnnual = purchaseAmount * MIN_DRAWDOWN_RATE;
  const maximumAnnual = purchaseAmount * MAX_DRAWDOWN_RATE;

  const effectiveAnnual =
    paymentSchedule.amountType === 'specific' && paymentSchedule.specificAmount > 0
      ? paymentSchedule.specificAmount
      : minimumAnnual;

  const perFrequency =
    paymentSchedule.frequency && purchaseAmount > 0
      ? effectiveAnnual / FREQUENCY_DIVISORS[paymentSchedule.frequency]
      : null;

  function update<K extends keyof PaymentSchedule>(key: K, value: PaymentSchedule[K]) {
    onPaymentScheduleChange({ ...paymentSchedule, [key]: value });
  }

  const paymentTypeOptions = [
    {
      value: 'minimum',
      label: 'Minimum',
      description: purchaseAmount > 0
        ? `${formatCurrency(minimumAnnual)} per year`
        : 'Based on your age and account balance',
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
  const specificAmountExceedsMax =
    paymentSchedule.amountType === 'specific' &&
    paymentSchedule.specificAmount > 0 &&
    purchaseAmount > 0 &&
    paymentSchedule.specificAmount > maximumAnnual;

  return (
    <Stack spacing={4}>
      <Stack spacing={1}>
        <Typography variant="h5" component="h2">Your payments</Typography>
        <Typography variant="body" sx={{ color: 'text.primary' }}>
          Choose how much income to receive from your Retirement Income account and when these payments
          are made. You can change this anytime in Member Online.
        </Typography>
      </Stack>

      {/* ── Combined payment card ── */}
      <Box
        sx={(t: Theme) => ({
          border: '1px solid',
          borderColor: freqError || monthError || amountTypeError || specificAmountError ? 'error.main' : 'border.default',
          borderRadius: `${t.shape.lg}px`,
          bgcolor: 'background.paper',
          overflow: 'hidden',
        })}
      >
        {/* Grey header — amount funded */}
        <Box sx={{ px: { xs: 3, sm: 4 }, pt: { xs: 3, sm: 4 }, pb: { xs: 3, sm: 4 }, bgcolor: 'background.default' }}>
          <Typography variant="small" sx={{ color: 'text.primary', display: 'block', mb: 0.5 }}>
            Amount transferred into your account
          </Typography>
          <Typography variant="h4">
            {purchaseAmount > 0 ? formatCurrency(purchaseAmount) : '—'}
          </Typography>
        </Box>

        {/* White body — all payment controls + stats */}
        <Box sx={{ position: 'relative', px: { xs: 3, sm: 4 }, pt: { xs: 4, sm: 5 }, pb: { xs: 3, sm: 4 }, borderTop: '1px solid', borderColor: 'border.subtle' }}>
          {/* Arrow icon straddling the seam */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: { xs: (t: Theme) => t.spacing(3), sm: (t: Theme) => t.spacing(4) },
              transform: 'translateY(-50%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '2.5rem',
              height: '2.5rem',
              borderRadius: '50%',
              border: '1px solid',
              borderColor: 'border.subtle',
              bgcolor: 'background.paper',
            }}
          >
            <Icon icon="arrow-down" size="lg" color="primary" />
          </Box>

          <Stack spacing={3}>
            {/* ── Payment amount ── */}
            <Stack spacing={1.5}>
              <Typography variant="body" sx={{ color: 'text.primary' }}>
                The Australian Government sets a minimum amount you must receive from your income account
                each financial year. This is based on your age and how much super you have.
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                <Icon icon="circle-info" size="md" color="info" />
                <Typography variant="body" sx={{ color: 'text.primary' }}>
                  Your minimum rate is <strong>{MIN_DRAWDOWN_RATE * 100}% per year</strong> (age {PENSION_ESTIMATE_AGE})
                </Typography>
              </Box>
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
                direction={isMobile ? 'column' : 'row'}
              />
            </Box>

            {paymentSchedule.amountType === 'specific' && (
              <Stack spacing={1.5}>
                <MoneyField
                  label="Specific amount"
                  value={paymentSchedule.specificAmount || null}
                  fullWidth
                  error={specificAmountError || specificAmountExceedsMax}
                  helperText={
                    specificAmountError
                      ? 'Enter a specific payment amount to continue.'
                      : `Enter an amount between ${purchaseAmount > 0 ? formatCurrency(minimumAnnual) : 'the minimum'} and ${purchaseAmount > 0 ? formatCurrency(maximumAnnual) : 'the maximum'} per year. For security reasons, online payments are limited to 10% of your account balance.`
                  }
                  onChange={(v) => update('specificAmount', v ?? 0)}
                />
                {specificAmountExceedsMax && (
                  <Alert
                    severity="error"
                    title="Amount exceeds online limit"
                    message={`For security reasons, your payment is limited to 10% of your account balance (${formatCurrency(maximumAnnual)} per year). If you require more than this amount, please call us on 13 11 84 after completing your application to increase the limit.`}
                  />
                )}
              </Stack>
            )}

            {amountTypeError && (
              <Typography variant="small" sx={{ color: 'error.main' }}>
                Select a payment amount to continue.
              </Typography>
            )}

            {/* ── Payment schedule ── */}
            <div>
              <Select
                label="Payment frequency"
                fullWidth
                placeholder="Please select"
                options={FREQUENCY_OPTIONS}
                value={paymentSchedule.frequency}
                onChange={(v) => {
                  onPaymentScheduleChange({ ...paymentSchedule, frequency: v as PaymentSchedule['frequency'], firstPaymentMonth: '' });
                }}
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
              options={dateOptions}
              value={paymentSchedule.firstPaymentMonth}
              onChange={(v) => update('firstPaymentMonth', v)}
              error={monthError}
              errorMessage={monthError ? 'Select a first payment date to continue.' : undefined}
              disabled={!paymentSchedule.frequency}
            />

            <Checkbox
              checked={paymentSchedule.adjustForCPI}
              onChange={(checked) => update('adjustForCPI', checked)}
              label="Adjust my income to cover increases in cost of living"
            />

            {/* Stats — year 1 income + per-frequency */}
            {purchaseAmount > 0 && paymentSchedule.amountType && (
              <Box sx={{ pt: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 3 }}>
                  <Box>
                    <Typography variant="h5" component="p">{formatCurrency(effectiveAnnual)}</Typography>
                    <Typography variant="small" sx={{ display: 'block' }}>Year 1 income</Typography>
                  </Box>
                  {perFrequency !== null && (
                    <>
                      <Box sx={{ alignSelf: 'stretch', width: '1px', bgcolor: 'border.subtle' }} />
                      <Box>
                        <Typography variant="h5" component="p">{formatCurrency(perFrequency)}</Typography>
                        <Typography variant="small" sx={{ display: 'block' }}>
                          {FREQUENCY_PERIOD_LABEL[paymentSchedule.frequency]} payments
                        </Typography>
                      </Box>
                    </>
                  )}
                </Box>
                <Typography variant="small" sx={{ color: 'text.muted', display: 'block', mt: 1.5, lineHeight: 1.5 }}>
                  The figures above are estimates and may vary due to daily price changes.
                </Typography>
              </Box>
            )}

            {paymentSchedule.adjustForCPI && (
              <Alert
                severity="info"
                message="If your payments drop below the legislated minimum in future, we will automatically update your payments to the minimum amount allowed and let you know in Member Online and on your annual statement."
              />
            )}
          </Stack>
        </Box>
      </Box>
    </Stack>
  );
}

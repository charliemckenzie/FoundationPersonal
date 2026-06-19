import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { DescriptionList } from '../../../components/DescriptionList';
import { Alert } from '../../../components/Alert';
import { TextField } from '../../../components/TextField';
import type { BankDetails, PaymentSchedule } from '../types';
import { formatCurrency, estimateRetirementBonus, estimatePension, parseBsbDigits, formatBsb, lookupBsbBank } from '../utils';
import { PENSION_ESTIMATE_AGE, PAYMENT_FREQUENCY_DIVISORS, PAYMENT_PERIOD_LABEL } from '../constants';

interface StepPaymentsProps {
  purchasePrice: number;
  paymentSchedule: PaymentSchedule;
  bankDetails: BankDetails;
  onBankDetailsChange: (next: BankDetails) => void;
  showValidation: boolean;
}

export function StepPayments({
  purchasePrice,
  paymentSchedule,
  bankDetails,
  onBankDetailsChange,
  showValidation,
}: StepPaymentsProps) {
  // Use the product rate estimate (same as the setup mode card) as the base annual amount.
  // If the user chose a specific amount on the payment schedule step, use that instead.
  const freq = paymentSchedule.frequency || 'fortnightly';
  const divisor = PAYMENT_FREQUENCY_DIVISORS[freq] ?? 26;
  const periodLabel = PAYMENT_PERIOD_LABEL[freq] ?? 'fortnight';

  const productEstimate = estimatePension(purchasePrice, PENSION_ESTIMATE_AGE, 'single');
  const baseAnnual = productEstimate?.annual ?? 0;

  const effectiveAnnual =
    paymentSchedule.amountType === 'specific' && paymentSchedule.specificAmount > 0
      ? paymentSchedule.specificAmount
      : baseAnnual;

  const perPeriod = effectiveAnnual > 0 ? effectiveAnnual / divisor : 0;

  function updateField<K extends keyof BankDetails>(key: K, value: BankDetails[K]) {
    onBankDetailsChange({ ...bankDetails, [key]: value });
  }

  const bsbDigits = parseBsbDigits(bankDetails.bsb);
  const bsbBankName = lookupBsbBank(bankDetails.bsb);

  return (
    <Stack spacing={4}>
      <Stack spacing={2}>
        <div>
          <Typography variant="h5" sx={{ mb: 0.5 }}>
            Bank details
          </Typography>
          <Typography variant="body" sx={{ color: 'text.primary' }}>
            Your actual payment may vary. These estimates are based on your selected purchase amount.
          </Typography>
        </div>

      <DescriptionList title="Payment summary" titleVariant="h6" valueAlign="right" density="condensed">
        <DescriptionList.Item label="Estimated retirement bonus" value={formatCurrency(estimateRetirementBonus(purchasePrice))} />
        <DescriptionList.Item label="Estimated annual amount" value={formatCurrency(effectiveAnnual)} />
        <DescriptionList.Item label="Estimated payment" value={`${formatCurrency(perPeriod)} / ${periodLabel}`} />
        <DescriptionList.Item label="First payment date" value="Tue, 03 Feb 2026" />
      </DescriptionList>

      <Box
        sx={{
          border: '1px solid',
          borderColor: 'border.default',
          borderRadius: (t) => `${t.shape.md}px`,
          backgroundColor: 'background.paper',
          p: 3,
        }}
      >
        <Stack spacing={2}>
          <Typography variant="h6">Bank details</Typography>
          <Alert
            severity="warning"
            message="Please check your BSB and account number carefully. Incorrect details may delay payments."
          />
          <TextField
            label="BSB"
            fullWidth
            value={bankDetails.bsb}
            placeholder="000-000"
            helperText={showValidation && bsbDigits.length < 6 ? undefined : (bsbBankName ?? undefined)}
            error={showValidation && bsbDigits.length < 6}
            errorMessage={showValidation && bsbDigits.length < 6 ? 'A valid 6-digit BSB is required' : undefined}
            onChange={(event) => {
              const digits = parseBsbDigits(event.target.value);
              updateField('bsb', formatBsb(digits));
            }}
            htmlInputProps={{ inputMode: 'numeric', pattern: '[0-9\\-]*', maxLength: 7 }}
          />
          <TextField
            label="Account number"
            fullWidth
            value={bankDetails.accountNumber}
            onChange={(event) => updateField('accountNumber', event.target.value)}
            error={showValidation && !bankDetails.accountNumber.trim()}
            errorMessage={showValidation && !bankDetails.accountNumber.trim() ? 'Account number is required' : undefined}
          />
          <TextField
            label="Account name"
            fullWidth
            value={bankDetails.accountName}
            onChange={(event) => updateField('accountName', event.target.value)}
            error={showValidation && !bankDetails.accountName.trim()}
            errorMessage={showValidation && !bankDetails.accountName.trim() ? 'Account name is required' : undefined}
          />
        </Stack>
      </Box>
      </Stack>
    </Stack>
  );
}

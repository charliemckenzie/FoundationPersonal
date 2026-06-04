import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Alert } from '../../../components/Alert';
import { DescriptionList } from '../../../components/DescriptionList';
import { TextField } from '../../../components/TextField';
import type { BankDetails } from '../types';
import { formatCurrency, parseBsbDigits, formatBsb, lookupBsbBank } from '../utils';

interface StepPaymentsProps {
  purchasePrice: number;
  bankDetails: BankDetails;
  onBankDetailsChange: (next: BankDetails) => void;
  showValidation: boolean;
}

export function StepPayments({
  purchasePrice,
  bankDetails,
  onBankDetailsChange,
  showValidation,
}: StepPaymentsProps) {
  const annualPayment = purchasePrice > 0 ? purchasePrice * 1.015 : 0;
  const fortnightlyPayment = annualPayment > 0 ? annualPayment / 26 : 0;

  function updateField<K extends keyof BankDetails>(key: K, value: BankDetails[K]) {
    onBankDetailsChange({ ...bankDetails, [key]: value });
  }

  const bsbDigits = parseBsbDigits(bankDetails.bsb);
  const bsbBankName = lookupBsbBank(bankDetails.bsb);
  const bankDetailsComplete = Boolean(
    bsbDigits.length === 6 && bankDetails.accountNumber.trim() && bankDetails.accountName.trim()
  );

  return (
    <Stack spacing={4}>
      <Typography component="h1" variant="h2">
        Payments
      </Typography>

      <Stack spacing={2}>
        <div>
          <Typography variant="h4" sx={{ mb: 1 }}>
            Estimated payments
          </Typography>
          <Typography variant="body" sx={{ color: 'text.primary' }}>
            Your actual payment may vary. These estimates are based on your selected purchase amount.
          </Typography>
        </div>

      <DescriptionList title="Payment amounts" valueAlign="right" density="condensed">
        <DescriptionList.Item label="Purchase price" value={formatCurrency(purchasePrice)} />
        <DescriptionList.Item label="Estimated retirement bonus" value={formatCurrency(982.25)} />
        <DescriptionList.Item label="Annual payment amount" value={formatCurrency(annualPayment)} />
        <DescriptionList.Item label="Estimated payment" value={`${formatCurrency(fortnightlyPayment)} / fortnight`} />
        <DescriptionList.Item label="First payment date" value="Tue, 03 Feb 2026" />
      </DescriptionList>

      <Box
        sx={{
          border: '1px solid',
          borderColor: 'border.default',
          borderRadius: (t) => `${t.shape.md}px`,
          backgroundColor: 'background.paper',
          p: 4,
        }}
      >
        <Stack spacing={2}>
          <Typography variant="h5">Bank details</Typography>
          <Alert
            severity="warning"
            message="Please check your BSB and account number carefully. Incorrect details may delay payments."
          />
          <TextField
            label="BSB"
            fullWidth
            value={bankDetails.bsb}
            placeholder="000-000"
            helperText={bsbBankName ?? undefined}
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
          />
          <TextField
            label="Account name"
            fullWidth
            value={bankDetails.accountName}
            onChange={(event) => updateField('accountName', event.target.value)}
          />
          {showValidation && !bankDetailsComplete && (
            <Alert
              severity="error"
              message="Complete all bank details before continuing."
            />
          )}
        </Stack>
      </Box>
      </Stack>
    </Stack>
  );
}

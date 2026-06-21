import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { DescriptionList } from '../../../components/DescriptionList';
import { TextField } from '../../../components/TextField';
import { PENSION_ESTIMATE_AGE } from '../constants';
import type { BankDetails, PensionOption } from '../types';
import { estimatePension, formatCurrency, estimateRetirementBonus, parseBsbDigits, formatBsb, lookupBsbBank } from '../utils';

interface StepPaymentsProps {
  purchasePrice: number;
  pensionOption: PensionOption;
  bankDetails: BankDetails;
  onBankDetailsChange: (next: BankDetails) => void;
  showValidation: boolean;
}

export function StepPayments({
  purchasePrice,
  pensionOption,
  bankDetails,
  onBankDetailsChange,
  showValidation,
}: StepPaymentsProps) {
  const estimate = estimatePension(purchasePrice, PENSION_ESTIMATE_AGE, pensionOption);
  const annualPayment = estimate?.annual ?? 0;
  const fortnightlyPayment = estimate?.fortnightly ?? 0;

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
            Estimated payments
          </Typography>
          <Typography variant="body" sx={{ color: 'text.primary' }}>
            Your actual payment may vary. These estimates are based on your selected purchase amount.
          </Typography>
        </div>

      <DescriptionList title="Payment amounts" titleVariant="h6" valueAlign="right" density="condensed">
        <DescriptionList.Item label="Purchase price" value={formatCurrency(purchasePrice)} />
        <DescriptionList.Item label="Fortnightly payments" value={`${formatCurrency(fortnightlyPayment)} / fortnight`} />
        <DescriptionList.Item label="First payment date" value="Tue, 03 Feb 2026" />
        <DescriptionList.Item label="First year's income" value={formatCurrency(annualPayment)} />
      </DescriptionList>

      <DescriptionList title="Retirement bonus" titleVariant="h6" valueAlign="right" density="condensed">
        <DescriptionList.Item label="Estimated retirement bonus" value={formatCurrency(estimateRetirementBonus(purchasePrice))} />
      </DescriptionList>

      <Box
        sx={{
          border: '1px solid',
          borderColor: 'border.default',
          borderRadius: (t) => `${t.shape.lg}px`,
          backgroundColor: 'background.paper',
          p: { xs: 3, sm: 4 },
        }}
      >
        <Stack spacing={2}>
          <Typography variant="h6">Bank details</Typography>
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

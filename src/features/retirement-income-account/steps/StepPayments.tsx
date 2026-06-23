import { useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { DescriptionList } from '../../../components/DescriptionList';
import type { BankDetails, PaymentSchedule, SavedBankAccount } from '../types';
import { formatCurrency, estimateRetirementBonus, estimatePension, lookupBsbBank } from '../utils';
import { PENSION_ESTIMATE_AGE, PAYMENT_FREQUENCY_DIVISORS, PAYMENT_PERIOD_LABEL, MOCK_SAVED_BANK_ACCOUNTS } from '../constants';
import { BankAccountSelector } from '../components/BankAccountSelector';

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
  // Mock saved accounts state (in production this would come from API)
  const [savedAccounts, setSavedAccounts] = useState<SavedBankAccount[]>(MOCK_SAVED_BANK_ACCOUNTS);

  // Payment calculations
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
  const freqLabel = `${freq.charAt(0).toUpperCase()}${freq.slice(1)} payments`;

  // Handle saved account selection
  function handleSelectAccount(account: SavedBankAccount) {
    onBankDetailsChange({
      bsb: account.bsb,
      accountNumber: account.accountNumber,
      accountName: account.accountName,
      savedAccountId: account.id,
      verified: true,
      resolvedName: account.accountName,
    });
  }

  // Handle new account verified
  function handleNewAccountVerified(details: { bsb: string; accountNumber: string; accountName: string; resolvedName: string; saveAccount: boolean }) {
    const bankName = lookupBsbBank(details.bsb) ?? 'Unknown Bank';
    const newAccount: SavedBankAccount = {
      id: `new-${Date.now()}`,
      bsb: details.bsb,
      accountNumber: details.accountNumber,
      accountName: details.accountName,
      bankName,
      maskedAccountNumber: `••• ${details.accountNumber.slice(-4)}`,
      lastUsed: new Date().toISOString(),
    };

    if (details.saveAccount) {
      setSavedAccounts((prev) => [...prev, newAccount]);
    }

    onBankDetailsChange({
      bsb: details.bsb,
      accountNumber: details.accountNumber,
      accountName: details.accountName,
      savedAccountId: newAccount.id,
      verified: true,
      resolvedName: details.resolvedName,
    });
  }

  return (
    <Stack spacing={4}>
      {/* Payment summary */}
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
          <DescriptionList.Item label="Opening balance" value={formatCurrency(purchasePrice)} />
          <DescriptionList.Item label={freqLabel} value={`${formatCurrency(perPeriod)} / ${periodLabel}`} />
          <DescriptionList.Item label="First payment date" value="Tue, 03 Feb 2026" />
          <DescriptionList.Item label="First year's income" value={formatCurrency(effectiveAnnual)} />
        </DescriptionList>

        <DescriptionList title="Retirement bonus" titleVariant="h6" valueAlign="right" density="condensed">
          <DescriptionList.Item label="Estimated retirement bonus" value={formatCurrency(estimateRetirementBonus(purchasePrice))} />
        </DescriptionList>
      </Stack>

      {/* Bank details section */}
      <Box
        sx={{
          border: '1px solid',
          borderColor: 'border.default',
          borderRadius: (t) => `${t.shape.lg}px`,
          backgroundColor: 'background.paper',
          p: { xs: 3, sm: 4 },
        }}
      >
        <Stack spacing={3}>
          <Typography variant="h6">Bank details</Typography>

          <BankAccountSelector
            savedAccounts={savedAccounts}
            onSelectAccount={handleSelectAccount}
            onNewAccountVerified={handleNewAccountVerified}
            showValidation={showValidation && !bankDetails.verified}
          />
        </Stack>
      </Box>
    </Stack>
  );
}

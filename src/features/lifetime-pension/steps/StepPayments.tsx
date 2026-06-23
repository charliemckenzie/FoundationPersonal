import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { DescriptionList } from '../../../components/DescriptionList';
import { BankAccountField } from '../../../components/BankAccountField';
import { MOCK_SAVED_ACCOUNTS, mockVerifyAndAdd } from '../../../components/BankAccountField/mockData';
import { PENSION_ESTIMATE_AGE } from '../constants';
import type { BankDetails, PensionOption } from '../types';
import { estimatePension, formatCurrency, estimateRetirementBonus } from '../utils';

export interface StepPaymentsProps {
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

  const selectedAccountId = MOCK_SAVED_ACCOUNTS.find(
    (a) => a.accountNumber === bankDetails.accountNumber && a.bsb === bankDetails.bsb
  )?.id;

  return (
    <Stack spacing={4}>
      {/* Estimated payments */}
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
      </Stack>

      <Divider sx={{ borderColor: 'border.subtle' }} />

      {/* Bank account selection */}
      <Stack spacing={2}>
        <div>
          <Typography variant="h5" sx={{ mb: 0.5 }}>
            Make payments to
          </Typography>
          <Typography variant="body" sx={{ color: 'text.primary' }}>
            Choose which bank account you'd like your payments deposited into.
          </Typography>
        </div>

        <BankAccountField
          savedAccounts={MOCK_SAVED_ACCOUNTS}
          selectedAccountId={selectedAccountId}
          onSelectAccount={(account) => {
            onBankDetailsChange({ bsb: account.bsb, accountNumber: account.accountNumber, accountName: account.accountName });
          }}
          onVerifyAndAdd={async (details) => {
            const result = await mockVerifyAndAdd(details);
            if (result.success) {
              onBankDetailsChange({ bsb: details.bsb, accountNumber: details.accountNumber, accountName: details.accountName });
            }
            return result;
          }}
        />
      </Stack>
    </Stack>
  );
}

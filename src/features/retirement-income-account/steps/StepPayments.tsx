import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Alert } from '../../../components/Alert';
import { DescriptionList } from '../../../components/DescriptionList';
import { BankAccountField } from '../../../components/BankAccountField';
import { MOCK_SAVED_ACCOUNTS, mockVerifyAndAdd } from '../../../components/BankAccountField/mockData';
import type { BankDetails, PaymentSchedule } from '../types';
import { formatCurrency, estimateRetirementBonus, estimatePension } from '../utils';
import { PENSION_ESTIMATE_AGE, PAYMENT_FREQUENCY_DIVISORS, PAYMENT_PERIOD_LABEL } from '../constants';

interface StepPaymentsProps {
  purchasePrice: number;
  paymentSchedule: PaymentSchedule;
  bankDetails: BankDetails;
  onBankDetailsChange: (next: BankDetails) => void;
  isFullBalance?: boolean;
}

export function StepPayments({
  purchasePrice,
  paymentSchedule,
  bankDetails,
  onBankDetailsChange,
  isFullBalance,
}: StepPaymentsProps) {
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

  const selectedAccountId = MOCK_SAVED_ACCOUNTS.find(
    (a) => a.accountNumber === bankDetails.accountNumber && a.bsb === bankDetails.bsb
  )?.id;

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
          <DescriptionList.Item label="Opening balance" value={isFullBalance ? 'Full balance' : formatCurrency(purchasePrice)} />
          <DescriptionList.Item label={freqLabel} value={`${formatCurrency(perPeriod)} / ${periodLabel}`} />
          <DescriptionList.Item label="First payment date" value="Tue, 03 Feb 2026" />
          <DescriptionList.Item label="First year's income" value={formatCurrency(effectiveAnnual)} />
        </DescriptionList>

        <DescriptionList title="Retirement bonus" titleVariant="h6" valueAlign="right" density="condensed">
          <DescriptionList.Item label="Estimated retirement bonus" value={formatCurrency(estimateRetirementBonus(purchasePrice))} />
        </DescriptionList>

        {isFullBalance && (
          <Alert
            severity="info"
            message={`Based on your current full account balance (${formatCurrency(purchasePrice)}). If your balance changes before your application is processed (within 10 business days), these figures may change.`}
          />
        )}
      </Stack>

      {/* Bank details section */}
      <Divider sx={{ borderColor: 'border.subtle' }} />

      <Stack spacing={2}>
        <div>
          <Typography variant="h5" sx={{ mb: 0.5 }}>
            Make payments to
          </Typography>
          <Typography variant="body" sx={{ color: 'text.primary' }}>
            Choose which bank account you&apos;d like your payments deposited into.
          </Typography>
        </div>

        <BankAccountField
          savedAccounts={MOCK_SAVED_ACCOUNTS}
          selectedAccountId={selectedAccountId}
          onSelectAccount={(account) => {
            onBankDetailsChange({
              bsb: account.bsb,
              accountNumber: account.accountNumber,
              accountName: account.accountName,
              savedAccountId: account.id,
            });
          }}
          onVerifyAndAdd={async (details) => {
            const result = await mockVerifyAndAdd(details);
            if (result.success) {
              onBankDetailsChange({
                bsb: details.bsb,
                accountNumber: details.accountNumber,
                accountName: details.accountName,
                verified: true,
              });
            }
            return result;
          }}
        />
      </Stack>
    </Stack>
  );
}

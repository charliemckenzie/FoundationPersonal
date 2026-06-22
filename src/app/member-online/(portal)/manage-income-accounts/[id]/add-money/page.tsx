'use client';

import { useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { Theme } from '@mui/material/styles';
import { useRouter, useParams } from 'next/navigation';
import { ContentContainer, MOBreadcrumb } from '../../../../../../components/MemberOnline';
import { FormProgress } from '../../../../../../components/FormProgress';
import { StepperActions } from '../../../../../../components/StepperActions';
import { StepTransition } from '../../../../../../components/StepTransition';
import { Alert, SEVERITY_ICONS } from '../../../../../../components/Alert';
import { Icon } from '../../../../../../components/Icon';
import { MoneyField } from '../../../../../../components/MoneyField';
import { TextButton } from '../../../../../../components/TextButton';
import { Button } from '../../../../../../components/Button';
import { MOCK_INCOME_ACCOUNTS } from '../../mockData';
import { formatCurrency } from '../../../../../../lib/format';
import { MIN_REMAINING_BALANCE, MIN_ACCUMULATION_BALANCE, PENSION_ESTIMATE_AGE } from '../../../../../../features/retirement-income-account/constants';
import { estimatePension } from '../../../../../../features/retirement-income-account/utils';

// Mock balances — replace with real data fetch
const MOCK_SUPER_SAVINGS_BALANCE: Record<string, number> = {
  'acc-ria':   4452.51,
  'acc-ria-2': 24750.00,
};
const DEFAULT_SUPER_SAVINGS_BALANCE = 4452.51;
const MOCK_RIA_BALANCE = 1289130.55;

const STEPS = [
  { id: 'transfer', label: 'Transfer details' },
  { id: 'review', label: 'Review' },
];

// ── Transfer details step — mirrors StepFunding's TransferPanel design ────────

function StepTransferDetails({
  superSavingsBalance,
  riaBalance,
  amount,
  onAmountChange,
  showValidation,
}: {
  superSavingsBalance: number;
  riaBalance: number;
  amount: number | null;
  onAmountChange: (v: number | null) => void;
  showValidation: boolean;
}) {
  const [liveAmount, setLiveAmount] = useState(amount ?? 0);
  const [today] = useState(() => new Date().toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' }));

  const belowMinimum = superSavingsBalance > 0 && superSavingsBalance < MIN_ACCUMULATION_BALANCE;
  const hasValue = liveAmount > 0;
  const remaining = superSavingsBalance - liveAmount;
  const overFunds = hasValue && remaining < 0;
  const alreadyLow = superSavingsBalance < MIN_REMAINING_BALANCE;
  const lowBalance = !alreadyLow && hasValue && remaining >= 0 && remaining < MIN_REMAINING_BALANCE;
  const remainingColor = overFunds ? 'error.text' : lowBalance ? 'warning.text' : undefined;

  const isEmpty = !amount || amount === 0;
  const fieldError = (showValidation && isEmpty) || overFunds;
  const fieldHelperText = showValidation && isEmpty ? 'Enter an amount to continue.' : '';

  return (
    <Stack spacing={4}>
      <Stack spacing={1}>
        <Typography variant="h5" component="h2">Funding your income account</Typography>
        <Typography variant="body" sx={{ color: 'text.primary' }}>
          Transfer money from your Super Savings (Accumulation) account into your Retirement Income account.
        </Typography>
      </Stack>

      {/* Transfer panel — same card as StepFunding */}
      <Box
        sx={(t: Theme) => ({
          borderRadius: `${t.shape.lg}px`,
          border: '1px solid',
          borderColor: 'border.default',
          bgcolor: 'background.paper',
          overflow: 'hidden',
        })}
      >
        {/* Grey header — shows remaining SS balance, updates live */}
        <Box sx={{ px: { xs: 3, sm: 4 }, pt: { xs: 3, sm: 4 }, pb: { xs: 3, sm: 4 }, bgcolor: 'background.default' }}>
          <Typography variant="small" sx={{ color: 'text.primary', display: 'block', mb: 0.5 }}>
            Available funds as at {today}
          </Typography>
          <Typography
            variant="h4"
            sx={{ color: 'text.heading', transition: 'color 200ms ease' }}
          >
            {formatCurrency(Math.max(0, hasValue ? remaining : superSavingsBalance))}
          </Typography>
        </Box>

        {/* White body — amount input */}
        <Box
          sx={{
            position: 'relative',
            px: { xs: 3, sm: 4 },
            pt: { xs: 4, sm: 5 },
            pb: { xs: 3, sm: 4 },
            borderTop: '1px solid',
            borderColor: 'border.subtle',
          }}
        >
          {/* Arrow icon straddling the grey/white seam */}
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
            {belowMinimum && (
              <Alert
                severity="warning"
                title="Minimum balance required"
                icon={<Icon icon={SEVERITY_ICONS.warning} color="inherit" size="lg" />}
                message={
                  <>
                    You need at least {formatCurrency(MIN_ACCUMULATION_BALANCE)} in Super Savings to make a transfer.{' '}
                    <Box
                      component="a"
                      href="/member-online/contributions"
                      sx={{ color: 'inherit', fontWeight: 600, textDecoration: 'underline', '&:hover': { textDecoration: 'none' } }}
                    >
                      Top up Super Savings
                    </Box>.
                  </>
                }
              />
            )}
            <Stack spacing={0.5}>
              <MoneyField
                label="Amount to transfer into your account"
                value={amount}
                fullWidth
                disabled={belowMinimum}
                error={fieldError}
                helperText={fieldHelperText}
                onInputChange={(v) => setLiveAmount(v ?? 0)}
                onChange={onAmountChange}
              />
            </Stack>

            {/* Current / new RIA balance estimate */}
            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 3 }}>
              <Box>
                <Typography variant="h5" component="p" sx={{ color: belowMinimum ? 'text.muted' : 'text.heading' }}>
                  {formatCurrency(riaBalance)}
                </Typography>
                <Typography variant="small" sx={{ display: 'block', color: 'text.muted' }}>Current balance</Typography>
              </Box>
              <Box sx={{ alignSelf: 'stretch', width: '1px', bgcolor: 'border.subtle' }} />
              <Box>
                <Typography
                  variant="h5"
                  component="p"
                  sx={{ color: hasValue ? 'text.heading' : 'text.muted', transition: 'color 200ms ease' }}
                >
                  {hasValue ? formatCurrency(riaBalance + (!overFunds ? liveAmount : 0)) : '–'}
                </Typography>
                <Typography variant="small" sx={{ display: 'block', color: 'text.muted' }}>New balance</Typography>
              </Box>
            </Box>

            {lowBalance && (
              <Alert
                severity="warning"
                title="Low Super Savings balance"
                message={`This transfer will leave less than ${formatCurrency(MIN_REMAINING_BALANCE)} in your Super Savings account. Keeping a balance below this threshold may affect your insurance cover.`}
              />
            )}
            {overFunds && (
              <Alert
                severity="error"
                message={`Amount exceeds your available Super Savings balance by ${formatCurrency(Math.abs(remaining))}.`}
              />
            )}

          </Stack>
        </Box>
      </Box>

    </Stack>
  );
}

// ── Zero-balance blocking screen ──────────────────────────────────────────────

function ZeroBalanceScreen({ onBack }: { onBack: () => void }) {
  return (
    <Stack spacing={4}>
      <Stack spacing={1}>
        <Typography variant="h5" component="h2">Funding your income account</Typography>
      </Stack>
      <Box
        sx={(t: Theme) => ({
          border: '1px solid',
          borderColor: 'warning.border',
          borderRadius: `${t.shape.lg}px`,
          bgcolor: 'warning.background',
          p: 4,
        })}
      >
        <Stack spacing={2}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Icon icon="circle-exclamation" size="lg" color="warning" />
            <Typography variant="h6" sx={{ color: 'warning.text' }}>No funds available in Super Savings</Typography>
          </Box>
          <Typography variant="body" sx={{ color: 'text.primary' }}>
            To add money to your Retirement Income account, you first need funds in your Super Savings (Accumulation) account.
          </Typography>
          <Typography variant="body" sx={{ color: 'text.primary' }}>
            You can add money to your Super Savings account by making a voluntary contribution or rolling over funds from another super fund.
          </Typography>
          <Box sx={{ pt: 1 }}>
            <TextButton label="Add money to Super Savings" href="/member-online/contributions" />
          </Box>
        </Stack>
      </Box>
      <Box>
        <Button variant="text" label="Back to account" onClick={onBack} />
      </Box>
    </Stack>
  );
}

// ── Review step ───────────────────────────────────────────────────────────────

function StepReview({
  accountName,
  amount,
  currentBalance,
}: {
  accountName: string;
  amount: number | null;
  currentBalance: number;
}) {
  const newBalance = currentBalance + (amount ?? 0);
  const currentEstimate = estimatePension(currentBalance, PENSION_ESTIMATE_AGE, 'single');
  const newEstimate = estimatePension(newBalance, PENSION_ESTIMATE_AGE, 'single');

  const reviewSectionSx = (t: Theme) => ({
    border: '1px solid',
    borderColor: 'border.default',
    borderRadius: `${t.shape.lg}px`,
    overflow: 'hidden',
  });

  const sectionHeaderSx = {
    px: 4,
    py: 2.5,
    mx: 4,
    borderBottom: '1px solid',
    borderColor: 'border.subtle',
    mx: 0,
    px: 4,
  };

  const rowSx = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    px: 4,
    py: 1.5,
    position: 'relative',
    '&:not(:last-child)::after': {
      content: '""',
      position: 'absolute',
      bottom: 0,
      left: 4 * 8,
      right: 4 * 8,
      height: '1px',
      bgcolor: 'border.subtle',
    },
  };

  return (
    <Stack spacing={4}>
      <Stack spacing={1}>
        <Typography variant="h5" component="h2">Review your transfer</Typography>
        <Typography variant="body" sx={{ color: 'text.primary' }}>
          Please review your transfer details before confirming.
        </Typography>
      </Stack>

      {/* Transfer details */}
      <Box sx={reviewSectionSx}>
        <Box sx={{ px: 4, py: 2.5 }}>
          <Typography variant="h6" component="h3">Transfer details</Typography>
        </Box>
        {[
          { label: 'From', value: 'Super Savings account' },
          { label: 'To', value: accountName },
          { label: 'Transfer amount', value: formatCurrency(amount ?? 0) },
        ].map(({ label, value }, i, arr) => (
          <Box key={label}>
            <Box sx={{ mx: 4, borderTop: '1px solid', borderColor: 'border.subtle' }} />
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', sm: 'center' }, gap: { xs: 0.5, sm: 0 }, px: 4, py: 2.5 }}>
              <Typography variant="body" sx={{ color: 'text.muted' }}>{label}</Typography>
              <Typography variant="body" sx={{ fontWeight: 600, color: 'text.primary' }}>{value}</Typography>
            </Box>
          </Box>
        ))}
      </Box>

      {/* Payment changes */}
      {currentEstimate && newEstimate && (
        <Box sx={reviewSectionSx}>
          <Box sx={{ px: 4, py: 2.5 }}>
            <Typography variant="h6" component="h3">Payment changes</Typography>
          </Box>
          {[
            {
              label: 'Fortnightly payments',
              before: formatCurrency(currentEstimate.fortnightly),
              after: formatCurrency(newEstimate.fortnightly),
            },
            {
              label: 'Annual income',
              before: formatCurrency(currentEstimate.annual),
              after: formatCurrency(newEstimate.annual),
            },
          ].map(({ label, before, after }) => (
            <Box key={label}>
              <Box sx={{ mx: 4, borderTop: '1px solid', borderColor: 'border.subtle' }} />
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row' },
                  justifyContent: 'space-between',
                  alignItems: { xs: 'flex-start', sm: 'center' },
                  gap: { xs: 1, sm: 0 },
                  px: 4,
                  py: 2.5,
                }}
              >
                <Typography variant="body" sx={{ color: 'text.muted' }}>{label}</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Typography variant="body" sx={{ color: 'text.muted' }}>{before}</Typography>
                  <Icon icon="arrow-right" size="xs" color="muted" />
                  <Typography variant="body" sx={{ fontWeight: 600, color: 'text.primary' }}>{after}</Typography>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      )}
    </Stack>
  );
}

// ── Success screen ────────────────────────────────────────────────────────────

function SuccessScreen({
  accountName,
  amount,
  onDone,
}: {
  accountName: string;
  amount: number | null;
  onDone: () => void;
}) {
  return (
    <Stack spacing={4} sx={{ textAlign: 'center', alignItems: 'center', py: 4 }}>
      <Box
        sx={{
          width: '4rem',
          height: '4rem',
          borderRadius: '50%',
          bgcolor: 'success.light',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Icon icon="circle-check" size="xl" color="success" />
      </Box>
      <Stack spacing={1} sx={{ maxWidth: '28rem' }}>
        <Typography variant="h4">Transfer submitted</Typography>
        <Typography variant="body" sx={{ color: 'text.muted' }}>
          {formatCurrency(amount ?? 0)} will be transferred from your Super Savings account to your{' '}
          {accountName}. This may take a few business days to process.
        </Typography>
      </Stack>
      <Button variant="contained" label="Back to account" onClick={onDone} />
    </Stack>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────

type Step = 'transfer' | 'review' | 'success';

export default function AddMoneyPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const id = params.id;

  const account = MOCK_INCOME_ACCOUNTS.find((a) => a.id === id);
  const backToManage = () => router.push(`/member-online/manage-income-accounts?account=${id}`);

  const superSavingsBalance = MOCK_SUPER_SAVINGS_BALANCE[id] ?? DEFAULT_SUPER_SAVINGS_BALANCE;
  const riaBalance = MOCK_RIA_BALANCE;
  const hasNoFunds = superSavingsBalance === 0;
  const belowMinimum = superSavingsBalance > 0 && superSavingsBalance < MIN_ACCUMULATION_BALANCE;

  const [step, setStep] = useState<Step>('transfer');
  const [amount, setAmount] = useState<number | null>(null);
  const [showValidation, setShowValidation] = useState(false);

  if (!account) {
    return (
      <>
        <Box sx={{ px: 3, pt: 2 }}>
          <MOBreadcrumb
            items={[{ label: 'Income accounts', href: '/member-online/manage-income-accounts' }, { label: 'Account not found' }]}
            onBack={backToManage}
          />
        </Box>
        <ContentContainer size="md">
          <Box sx={{ mt: 6, textAlign: 'center' }}>
            <Typography variant="h3">Account not found</Typography>
          </Box>
        </ContentContainer>
      </>
    );
  }

  const activeStep = step === 'transfer' ? 0 : 1;

  function handleNext() {
    if (step === 'transfer') {
      if (belowMinimum) return;
      const valid = amount && amount > 0 && amount <= superSavingsBalance;
      if (!valid) {
        setShowValidation(true);
        return;
      }
      setShowValidation(false);
      setStep('review');
    } else if (step === 'review') {
      setStep('success');
    }
  }

  function handleBack() {
    if (step === 'review') setStep('transfer');
    else backToManage();
  }

  if (step === 'success') {
    return (
      <>
        <Box sx={{ px: 3, pt: 2 }}>
          <MOBreadcrumb
            items={[
              { label: 'Income accounts', href: '/member-online/manage-income-accounts' },
              { label: account.name, href: `/member-online/manage-income-accounts?account=${id}` },
              { label: 'Add money' },
            ]}
            onBack={backToManage}
          />
        </Box>
        <ContentContainer size="md">
          <SuccessScreen accountName={account.name} amount={amount} onDone={backToManage} />
        </ContentContainer>
      </>
    );
  }

  return (
    <>
      <Box sx={{ px: 3, pt: 2 }}>
        <MOBreadcrumb
          items={[
            { label: 'Income accounts', href: '/member-online/manage-income-accounts' },
            { label: account.name, href: `/member-online/manage-income-accounts?account=${id}` },
            { label: 'Add money' },
          ]}
          onBack={handleBack}
        />
      </Box>

      <ContentContainer size="md">
        <Stack spacing={4}>
          <div>
            <Typography variant="h2" component="h1" sx={{ mb: 3 }}>
              Add money
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <FormProgress
                variant="simple"
                value={activeStep === 0 ? 0 : 100}
                steps={STEPS}
                activeStep={activeStep}
                showStepIndicator
                sx={{ flex: 1, minWidth: 0 }}
              />
            </Box>
          </div>

          <Box>
            <StepTransition step={activeStep}>
              {hasNoFunds ? (
                <ZeroBalanceScreen onBack={backToManage} />
              ) : step === 'transfer' ? (
                <StepTransferDetails
                  superSavingsBalance={superSavingsBalance}
                  riaBalance={riaBalance}
                  amount={amount}
                  onAmountChange={setAmount}
                  showValidation={showValidation}
                />
              ) : (
                <StepReview accountName={account.name} amount={amount} currentBalance={riaBalance} />
              )}
            </StepTransition>
          </Box>

          {!hasNoFunds && (
            <StepperActions
              step={activeStep + 1}
              isSubmitStep={step === 'review'}
              nextLabel={step === 'review' ? 'Confirm transfer' : 'Next'}
              onNext={handleNext}
              onBack={handleBack}
              onExit={backToManage}
              skipExitDialog
            />
          )}
        </Stack>
      </ContentContainer>
    </>
  );
}

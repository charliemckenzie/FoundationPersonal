'use client';

import { useState, useMemo } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useRouter, useSearchParams } from 'next/navigation';
import { FormProgress } from '../../components/FormProgress';
import { StepperActions } from '../../components/StepperActions';
import { Alert } from '../../components/Alert';
import { ContentContainer, MOBreadcrumb } from '../../components/MemberOnline';
import { StepTransition } from '../../components/StepTransition';
import { Step1Account } from './steps/Step1Account';
import { Step2ApplyTo } from './steps/Step2ApplyTo';
import { Step3Allocations } from './steps/Step3Allocations';
import { Step3bRebalance } from './steps/Step3bRebalance';
import { Step4PaymentPreference } from './steps/Step4PaymentPreference';
import { Step4Review } from './steps/Step4Review';
import { SubmissionSuccess } from './SubmissionSuccess';
import { useInvestmentMix } from './InvestmentMixContext';
import { Dialog } from '../../components/Dialog';
import { TextButton } from '../../components/TextButton';
import { MOCK_ACCOUNTS, MOCK_INVESTMENT_OPTIONS } from './mockData';
import type { ApplyTo, InvestmentMixChange, PaymentPreference, RebalanceSetting } from './types';
import { applyToIncludesPayments, applyToIncludesBalance } from './types';
import {
  validateStep1,
  validateStep2,
  validateStep3,
  validatePaymentPreference,
  validateRebalance,
  buildChange,
  formatCurrency,
  formatDate,
} from './utils';
import { detectAllocationWarning, type AllocationWarning } from './allocationWarnings';

const LIFECYCLE_ID = 'opt-lifecycle';

interface InvestmentMixFlowProps {
  overviewPath: string;
  /** Brand name shown in the payment preference step, e.g. "ART" or "QSuper". */
  brandName?: string;
  /** Filter which accounts are available in this journey. Defaults to 'all'. */
  accountFilter?: 'all' | 'accum' | 'income';
}

export function InvestmentMixFlow({ overviewPath, brandName = 'ART', accountFilter = 'all' }: InvestmentMixFlowProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { saveChange } = useInvestmentMix();

  const accountFromUrl = searchParams.get('account');
  const skipAccountStep = !!accountFromUrl;

  const accounts = useMemo(() => {
    if (accountFilter === 'accum') return MOCK_ACCOUNTS.filter((a) => !a.isIncomeAccount);
    if (accountFilter === 'income') return MOCK_ACCOUNTS.filter((a) => !!a.isIncomeAccount);
    return MOCK_ACCOUNTS;
  }, [accountFilter]);

  const [activeStep, setActiveStep] = useState(0);
  const [selectedAccountId, setSelectedAccountId] = useState(() => accountFromUrl ?? accounts[0]?.id ?? '');
  const [applyTo, setApplyTo] = useState<ApplyTo | null>(null);
  const [allocations, setAllocations] = useState<Record<string, number>>({});
  const [paymentPreference, setPaymentPreference] = useState<PaymentPreference | null>(null);
  const [rebalance, setRebalance] = useState<RebalanceSetting | null>(null);
  const [showStep3Validation, setShowStep3Validation] = useState(false);
  const [showPaymentValidation, setShowPaymentValidation] = useState(false);
  const [declarationChecked, setDeclarationChecked] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [speedBumpWarning, setSpeedBumpWarning] = useState<AllocationWarning | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [submittedChange, setSubmittedChange] = useState<InvestmentMixChange | null>(null);

  const selectedAccount = useMemo(
    () => accounts.find((a) => a.id === selectedAccountId),
    [accounts, selectedAccountId],
  );

  const isIncomeAccount = selectedAccount?.isIncomeAccount ?? false;
  const isTTRAccount = selectedAccount?.isTTRAccount ?? false;

  /** Lifecycle Investment Strategy is not available to income or TTR accounts. */
  const availableOptions = useMemo(
    () =>
      isIncomeAccount || isTTRAccount
        ? MOCK_INVESTMENT_OPTIONS.filter((o) => o.id !== LIFECYCLE_ID)
        : MOCK_INVESTMENT_OPTIONS,
    [isIncomeAccount, isTTRAccount],
  );

  const allocatedOptions = useMemo(
    () => availableOptions.filter((o) => (allocations[o.id] ?? 0) > 0),
    [allocations, availableOptions],
  );

  // Payment preferences decide which option withdrawals are drawn from (order, priority, or split).
  // With only one allocated option everything is drawn from it by definition, so the step is moot.
  const showPaymentStep =
    isIncomeAccount &&
    applyTo !== null &&
    applyToIncludesPayments(applyTo) &&
    allocatedOptions.length >= 2;

  /**
   * Rebalancing only applies when the current balance is being set to a target mix, and only
   * when there are 2+ non-Lifecycle options to keep in balance. Lifecycle itself is excluded from
   * the count (it self-adjusts by age); if other options are also held, a rebalance still restores
   * the full target mix, keeping those options on target while Lifecycle holds its share.
   */
  const rebalanceEligible =
    allocatedOptions.filter((o) => o.id !== LIFECYCLE_ID).length >= 2;
  const showRebalanceStep =
    applyTo !== null && applyToIncludesBalance(applyTo) && rebalanceEligible;

  /** Steps are composed dynamically; two of them (rebalance, payment) are conditional. */
  const steps = useMemo(() => {
    const list: { id: string; label: string }[] = [];
    if (!skipAccountStep) list.push({ id: 'account', label: 'Select account' });
    list.push({ id: 'apply-to', label: 'What to change' });
    list.push({ id: 'allocations', label: 'Allocate new mix' });
    if (showRebalanceStep) list.push({ id: 'rebalance', label: 'Keep on track' });
    if (showPaymentStep) list.push({ id: 'payment', label: 'Payment preferences' });
    list.push({ id: 'review', label: 'Review and confirm' });
    return list;
  }, [skipAccountStep, showRebalanceStep, showPaymentStep]);

  // A conditional step can only disappear while the member is on an earlier step (apply-to or
  // allocations), so activeStep never points past the list; review is always last. Stale rebalance
  // state is harmless — it is gated out of both the review screen and the submission below.
  const currentStepId = steps[activeStep]?.id ?? 'review';
  const isReviewStep = currentStepId === 'review';

  function advance(next: number) {
    setActiveStep(next);
    setError(null);
  }

  function goToStep(id: string) {
    const idx = steps.findIndex((s) => s.id === id);
    if (idx >= 0) advance(idx);
  }

  function handleAccountChange(id: string) {
    setSelectedAccountId(id);
    // Reset downstream state when account changes
    setApplyTo(null);
    setPaymentPreference(null);
    setRebalance(null);
    setActiveStep(0);
  }

  function handleApplyToChange(value: ApplyTo) {
    setApplyTo(value);
    // If payment step is no longer applicable, clear preference
    if (!applyToIncludesPayments(value)) {
      setPaymentPreference(null);
    }
  }

  function handleAllocationChange(optionId: string, value: number | null) {
    setAllocations((prev) => {
      if (value === null) {
        const next = { ...prev };
        delete next[optionId];
        return next;
      }
      return { ...prev, [optionId]: value };
    });
  }

  function handleDeclarationChange(checked: boolean) {
    setDeclarationChecked(checked);
    if (error && checked) setError(null);
  }

  function handleNext() {
    if (currentStepId === 'account' && !validateStep1(selectedAccountId)) {
      setError('Please select an account to continue.');
      return;
    }

    if (currentStepId === 'apply-to' && !validateStep2(applyTo)) {
      setError('Please select an option to continue.');
      return;
    }

    if (currentStepId === 'allocations') {
      const { valid, total } = validateStep3(allocations, availableOptions);
      if (!valid) {
        setShowStep3Validation(true);
        setError(`Your investment options must add up to 100%. They currently total ${total.toFixed(2)}%.`);
        return;
      }
      const warning = detectAllocationWarning(allocations, availableOptions);
      if (warning) {
        setSpeedBumpWarning(warning);
        return;
      }
    }

    if (currentStepId === 'rebalance' && !validateRebalance(rebalance)) {
      setError(
        rebalance?.enabled
          ? 'Please choose how often we should rebalance.'
          : 'Please choose whether you’d like us to keep your mix on track.',
      );
      return;
    }

    if (currentStepId === 'payment' && !validatePaymentPreference(paymentPreference, allocatedOptions)) {
      setShowPaymentValidation(true);
      setError(
        !paymentPreference
          ? 'Please choose how your payments will be drawn.'
          : 'Please make sure your payment percentages add up to 100%.',
      );
      return;
    }

    if (isReviewStep) {
      if (!declarationChecked) {
        setError('Please confirm the declaration before submitting.');
        return;
      }
      const change = buildChange(
        selectedAccountId,
        accounts,
        applyTo!,
        allocations,
        showPaymentStep ? (paymentPreference ?? undefined) : undefined,
        showRebalanceStep ? (rebalance ?? undefined) : undefined,
      );
      saveChange(change);
      setSubmittedChange(change);
      setSubmitted(true);
      return;
    }

    advance(activeStep + 1);
  }

  function handleBack() {
    setError(null);
    if (activeStep === 0 && skipAccountStep) {
      router.push(overviewPath);
      return;
    }
    setActiveStep((prev) => Math.max(0, prev - 1));
  }

  function handleExit() {
    router.push(overviewPath);
  }

  if (submitted && submittedChange) {
    return (
      <ContentContainer size="md">
        <SubmissionSuccess
          change={submittedChange}
          brandName={brandName}
          onBackToOverview={() => router.push(overviewPath)}
        />
      </ContentContainer>
    );
  }

  return (
    <>
      <Box sx={{ px: 3, pt: 2 }}>
        <MOBreadcrumb
          items={[
            { label: 'Investments', href: overviewPath },
            { label: 'Change investment mix' },
          ]}
          onBack={() => router.push(overviewPath)}
        />
      </Box>
      <ContentContainer size="md">
        <Stack spacing={4} sx={{ py: 4 }}>
          <div>
            <Typography variant="h2" component="h1" sx={{ mb: 0.5 }}>
              Change investment mix
            </Typography>
            {selectedAccount && (
              <Typography variant="body" sx={{ mb: 3 }}>
                For {selectedAccount.name}{' '}
                <Box component="span" sx={{ fontWeight: 700 }}>
                  {formatCurrency(selectedAccount.balance)}
                </Box>{' '}
                <Box component="span" sx={{ color: 'text.muted' }}>
                  as at {formatDate(new Date().toISOString())}
                </Box>
              </Typography>
            )}
            <FormProgress
              variant="simple"
              value={(activeStep / steps.length) * 100}
              steps={steps}
              activeStep={activeStep}
              showStepIndicator
              stepMenu
              onStepClick={(i) => advance(i)}
            />
          </div>

          <StepTransition step={activeStep}>
            {currentStepId === 'account' ? (
              <Step1Account
                accounts={accounts}
                selectedAccountId={selectedAccountId}
                onChange={handleAccountChange}
              />
            ) : currentStepId === 'apply-to' ? (
              <Step2ApplyTo
                applyTo={applyTo}
                isIncomeAccount={isIncomeAccount}
                onChange={handleApplyToChange}
              />
            ) : currentStepId === 'allocations' ? (
              <Step3Allocations
                options={availableOptions}
                allocations={allocations}
                onChange={handleAllocationChange}
                showValidation={showStep3Validation}
              />
            ) : currentStepId === 'rebalance' ? (
              <Step3bRebalance
                allocatedOptions={allocatedOptions}
                allocations={allocations}
                setting={rebalance}
                onChange={setRebalance}
              />
            ) : currentStepId === 'payment' ? (
              <Step4PaymentPreference
                allocatedOptions={allocatedOptions}
                allocations={allocations}
                preference={paymentPreference}
                onChange={setPaymentPreference}
                showValidation={showPaymentValidation}
                brandName={brandName}
              />
            ) : (
              <Step4Review
                accounts={accounts}
                selectedAccountId={selectedAccountId}
                applyTo={applyTo!}
                options={availableOptions}
                allocations={allocations}
                paymentPreference={showPaymentStep ? paymentPreference : null}
                rebalance={showRebalanceStep ? rebalance : null}
                declarationChecked={declarationChecked}
                onDeclarationChange={handleDeclarationChange}
                onEditAccount={skipAccountStep ? undefined : () => goToStep('account')}
                onEditApplyTo={() => goToStep('apply-to')}
                onEditAllocations={() => goToStep('allocations')}
                onEditRebalance={showRebalanceStep ? () => goToStep('rebalance') : undefined}
                onEditPaymentPreference={showPaymentStep ? () => goToStep('payment') : undefined}
              />
            )}
          </StepTransition>

          {/* Validation errors surface here, beside the action the user just clicked — not at the
              top of the page, where on a long step they would be scrolled out of view. */}
          {error && <Alert severity="error" message={error} />}

          <StepperActions
            step={activeStep + 1}
            isSubmitStep={isReviewStep}
            nextLabel={isReviewStep ? 'Submit request' : 'Next'}
            onNext={handleNext}
            onBack={handleBack}
            onExit={handleExit}
          />
        </Stack>
      </ContentContainer>

      <Dialog
        open={speedBumpWarning !== null}
        onClose={() => setSpeedBumpWarning(null)}
        title={speedBumpWarning?.title ?? ''}
        description={speedBumpWarning?.message}
        variant="neutral"
        confirmLabel="Continue"
        cancelLabel="Cancel"
        onConfirm={() => {
          setSpeedBumpWarning(null);
          advance(activeStep + 1);
        }}
      >
        <Box sx={{ mt: 1.5 }}>
          <TextButton
            label="Get personalised financial advice"
            endIcon="arrow-up-right-from-square"
            size="small"
            onClick={() => window.open('/advice', '_blank', 'noopener,noreferrer')}
          />
        </Box>
      </Dialog>
    </>
  );
}

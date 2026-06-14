'use client';

import { useState, useMemo, useEffect, useRef, Suspense } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { useRouter, useSearchParams } from 'next/navigation';
import { FormProgress } from '../../components/FormProgress';
import { StepperActions } from '../../components/StepperActions';
import { Spinner } from '../../components/Spinner';
import { Alert } from '../../components/Alert';
import { ContentContainer, MOBreadcrumb } from '../../components/MemberOnline';
import { StepTransition } from '../../components/StepTransition';
import { Step0BeforeYouStart } from './steps/Step0BeforeYouStart';
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

const ACCUM_APPLY_TO: ApplyTo[] = ['all', 'balance', 'future'];
const INCOME_APPLY_TO: ApplyTo[] = ['income-both', 'income-balance', 'income-payments'];

interface InvestmentMixFlowProps {
  overviewPath: string;
  /** Brand name shown in the payment preference step, e.g. "ART" or "QSuper". */
  brandName?: string;
  /** Filter which accounts are available in this journey. Defaults to 'all'. */
  accountFilter?: 'all' | 'accum' | 'income';
}

/**
 * Public entry point. Wraps the flow in a Suspense boundary because the inner
 * component reads `useSearchParams()`, which Next requires to be suspended for
 * static rendering. Keeps every consumer (and future ones) safe without each
 * page repeating the boundary.
 */
export function InvestmentMixFlow(props: InvestmentMixFlowProps) {
  return (
    <Suspense
      fallback={
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <Spinner label="Loading investment options" />
        </Box>
      }
    >
      <InvestmentMixFlowInner {...props} />
    </Suspense>
  );
}

function InvestmentMixFlowInner({ overviewPath, brandName = 'ART', accountFilter = 'all' }: InvestmentMixFlowProps) {
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

  // A dial's edit link pre-selects one apply-to option on the "what to change" step — the step
  // still shows, so the member can change the choice. Only honour a value valid for the account type.
  const initialAccount = accounts.find((a) => a.id === (accountFromUrl ?? accounts[0]?.id));
  const applyToFromUrl = useMemo(() => {
    const raw = searchParams.get('applyTo') as ApplyTo | null;
    if (!raw) return null;
    const valid = initialAccount?.isIncomeAccount ? INCOME_APPLY_TO : ACCUM_APPLY_TO;
    return valid.includes(raw) ? raw : null;
  }, [searchParams, initialAccount]);

  const [showIntro, setShowIntro] = useState(true);
  const [activeStep, setActiveStep] = useState(0);
  const [selectedAccountId, setSelectedAccountId] = useState(() => accountFromUrl ?? accounts[0]?.id ?? '');
  const [applyTo, setApplyTo] = useState<ApplyTo | null>(applyToFromUrl);
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

  const isFirstStepRender = useRef(true);
  const skipHistoryPush = useRef(false);

  // Mark the initial history entry so browser back/forward works within the form.
  // On each advance, push a new entry; on popstate, restore the step.
  //
  // The URL is updated with ?step=<step-id> on every navigation so GA4's Enhanced Measurement
  // "History changes" fires a page_view for each step. Existing params (account, applyTo) are
  // preserved so deep-link pre-population keeps working after the first step change.
  //
  // The intro screen is represented as historyStep -1 / ?step=before-you-start so it appears
  // as a distinct GA event and browser back restores it correctly.
  useEffect(() => {
    // steps is read from closure — intentionally not in deps. It only changes alongside
    // activeStep in this flow (conditional steps appear/disappear based on user choices made
    // before advancing), so the step ID is always correct when the effect fires.
    const stepId = showIntro ? 'before-you-start' : (steps[activeStep]?.id ?? 'account');
    const historyStepIndex = showIntro ? -1 : activeStep;
    const params = new URLSearchParams(window.location.search);
    params.set('step', stepId);
    const url = `?${params.toString()}`;

    if (isFirstStepRender.current) {
      isFirstStepRender.current = false;
      history.replaceState({ investmentMixStep: historyStepIndex }, '', url);
      return;
    }
    if (skipHistoryPush.current) {
      skipHistoryPush.current = false;
      // history.back() has already restored the URL for this entry — no push needed.
      return;
    }
    history.pushState({ investmentMixStep: historyStepIndex }, '', url);
  // showIntro and activeStep are the only dependencies — this intentionally runs on every change
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showIntro, activeStep]);

  useEffect(() => {
    const handlePopState = (e: PopStateEvent) => {
      const step = (e.state as { investmentMixStep?: number } | null)?.investmentMixStep;
      if (typeof step === 'number') {
        skipHistoryPush.current = true;
        if (step === -1) {
          setShowIntro(true);
          setActiveStep(0);
        } else {
          setShowIntro(false);
          setActiveStep(step);
        }
        setError(null);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  // setActiveStep and setError are stable useState setters — safe to omit from deps
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selectedAccount = useMemo(
    () => accounts.find((a) => a.id === selectedAccountId),
    [accounts, selectedAccountId],
  );

  const isIncomeAccount = selectedAccount?.isIncomeAccount ?? false;

  /** Lifecycle Investment Strategy is not available to income accounts. */
  const availableOptions = useMemo(
    () =>
      isIncomeAccount
        ? MOCK_INVESTMENT_OPTIONS.filter((o) => o.id !== LIFECYCLE_ID)
        : MOCK_INVESTMENT_OPTIONS,
    [isIncomeAccount],
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

  // Lifecycle cannot participate in rebalancing at all — the PDS explicitly excludes any mix that
  // contains Lifecycle, not just Lifecycle-only mixes.
  const hasLifecycleInMix = (allocations[LIFECYCLE_ID] ?? 0) > 0;
  const rebalanceEligible = !hasLifecycleInMix && allocatedOptions.length >= 2;
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
    if (showIntro) {
      setShowIntro(false);
      setError(null);
      return;
    }

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
      // Replace (not push) so the user cannot navigate back into a re-submit scenario.
      // GA4 picks this up as a page_view for the success step.
      const successParams = new URLSearchParams(window.location.search);
      successParams.set('step', 'success');
      history.replaceState({}, '', `?${successParams.toString()}`);
      window.scrollTo({ top: 0, behavior: 'instant' });
      setSubmitted(true);
      return;
    }

    advance(activeStep + 1);
  }

  function handleBack() {
    setError(null);
    if (showIntro) {
      router.push(overviewPath);
      return;
    }
    // history.back() restores the intro entry (investmentMixStep: -1) when on the first
    // form step, regardless of whether the account step was skipped via query param.
    history.back();
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
            { label: 'Manage investments', href: overviewPath },
            { label: 'Change investment mix' },
          ]}
          onBack={() => router.push(overviewPath)}
        />
      </Box>
      <ContentContainer size="md">
        <Stack spacing={4}>
          <div>
            <Typography variant="h2" component="h1" sx={{ mb: 0.5 }}>
              Change investment mix
            </Typography>
            {selectedAccount && (
              <Typography variant="body" sx={{ mb: 2 }}>
                For {selectedAccount.name}{' '}
                <Box component="span" sx={{ fontWeight: 700 }}>
                  {formatCurrency(selectedAccount.balance)}
                </Box>{' '}
                <Box component="span" sx={{ color: 'text.muted' }}>
                  as at {formatDate(new Date().toISOString())}
                </Box>
              </Typography>
            )}
            {!showIntro && (
              <FormProgress
                variant="simple"
                value={(activeStep / steps.length) * 100}
                steps={steps}
                activeStep={activeStep}
                showStepIndicator
                stepMenu
                onStepClick={(i) => advance(i)}
              />
            )}
            {showIntro && <Divider sx={{ mt: 0 }} />}
          </div>

          <StepTransition step={showIntro ? -1 : activeStep}>
            {showIntro ? (
              <Step0BeforeYouStart />
            ) : currentStepId === 'account' ? (
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
          {!showIntro && error && <Alert severity="error" message={error} />}

          <StepperActions
            step={showIntro ? 1 : activeStep + 2}
            isSubmitStep={!showIntro && isReviewStep}
            nextLabel={showIntro ? 'Get started' : isReviewStep ? 'Submit request' : 'Next'}
            skipExitDialog={showIntro}
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

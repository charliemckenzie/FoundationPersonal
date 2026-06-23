'use client';

import { useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/navigation';
import { FormProgress } from '../../components/FormProgress';
import { ContentContainer, MOBreadcrumb } from '../../components/MemberOnline';
import { Dialog } from '../../components/Dialog';
import { StepTransition } from '../../components/StepTransition';
import { StepperActions } from '../../components/StepperActions';
import { useSteppedFlow } from '../../lib/useSteppedFlow';
import { ResumeDraftDialog } from '../../lib/ResumeDraftDialog';
import { INITIAL_STATE, RETIREMENT_INCOME_ACCOUNT_STEPS, MOCK_USER_PROFILE, STEP_TITLES, TARGET_PERCENT, initialVerifyDetailsState } from './constants';
import { deleteDraft, loadDraft, saveDraft } from './draftService';
import { useIdvGate } from '../../features/idv';
import { StepAllocate } from './steps/StepAllocate';
import { StepFunding } from './steps/StepFunding';
import { StepIntro } from './steps/StepIntro';
import { StepPaymentSchedule } from './steps/StepPaymentSchedule';
import { StepPayments } from './steps/StepPayments';
import { StepInvestmentStrategy } from './steps/StepInvestmentStrategy';
import { InvestmentMixFlow } from '../../features/investment-mix/InvestmentMixFlow';
import { InvestmentMixProvider } from '../../features/investment-mix/InvestmentMixContext';
import { StepBeneficiary } from './steps/StepBeneficiary';
import { StepReview } from './steps/StepReview';
import { StepSetupMode } from './steps/StepSetupMode';
import { StepSuccess } from './steps/StepSuccess';
import type { RetirementIncomeAccountState, RetirementIncomeAccountStepId, VerifyDetailsState } from './types';
import {
  allocateStepValid,
  fundingStepValid,
  introStepValid,
  investmentStrategyStepValid,
  beneficiaryStepValid,
  paymentScheduleStepValid,
  paymentsStepValid,
  reviewStepValid,
  setupModeStepValid,
  totalSelectedAmount,
} from './utils';

const STEP_KEYS: RetirementIncomeAccountStepId[] = [
  'intro',
  'setup-mode',
  'funding',
  'allocate',
  'payment-schedule',
  'payments',
  'investment-strategy',
  'investment-mix',
  'beneficiary',
  'review',
];

const CONDITIONAL_STEPS: RetirementIncomeAccountStepId[] = [
  'funding',
  'allocate',
  'payment-schedule',
  'investment-strategy',
  'investment-mix',
  'investment-drawdown',
];

const INVESTMENT_STEPS: RetirementIncomeAccountStepId[] = ['investment-mix'];

export function RetirementIncomeAccountFlow() {
  const router = useRouter();

  const gate = useIdvGate();

  const [verifyDetailsState, setVerifyDetailsState] = useState<VerifyDetailsState>(initialVerifyDetailsState);

  // Step navigation + draft autosave/resume are shared with Lifetime Pension via useSteppedFlow.
  const flow = useSteppedFlow<RetirementIncomeAccountState>({
    initialState: INITIAL_STATE,
    loadDraft,
    saveDraft,
    deleteDraft,
    // Merge over INITIAL_STATE so any fields added after the draft was saved
    // always have a valid default (e.g. paymentSchedule added in a later version).
    reviveState: (saved) => ({ ...INITIAL_STATE, ...saved }),
  });
  const { state, setState, activeStep, showValidation, submitted } = flow;

  const [showInsuranceModal, setShowInsuranceModal] = useState(false);

  const purchaseTotal = useMemo(() => {
    // In simple (autopilot) mode the funding step is skipped, so transferAmount
    // is never set. Fall back to the full account balances, matching the review screen.
    if (state.setupMode === 'simple') {
      return state.accounts.reduce((sum, account) => sum + account.balance, 0);
    }
    return totalSelectedAmount(state);
  }, [state]);
  const eligible = useMemo(() => Boolean(state.eligibilityCompleted), [state]);

  const hasFullBalanceTransfer = useMemo(() => {
    return state.accounts.some(
      (account) => account.selected && account.balance > 0 && account.transferAmount >= account.balance
    );
  }, [state.accounts]);

  // Filter visible steps based on setup mode and investment strategy
  const visibleStepKeys = useMemo(() => {
    if (state.setupMode === 'simple') {
      return STEP_KEYS.filter((id) => !CONDITIONAL_STEPS.includes(id));
    }
    if (state.investmentStrategy === 'default') {
      return STEP_KEYS.filter((id) => !INVESTMENT_STEPS.includes(id));
    }
    return STEP_KEYS;
  }, [state.setupMode, state.investmentStrategy]);

  // Get current step ID from the visible steps
  const currentStepId = visibleStepKeys[activeStep];

  function stepIsValid(step: number): boolean {
    const stepId = visibleStepKeys[step];
    switch (stepId) {
      case 'intro':
        return introStepValid(state);
      case 'funding':
        return fundingStepValid(state);
      case 'allocate':
        return allocateStepValid(state);
      case 'setup-mode':
        return setupModeStepValid(state);
      case 'payment-schedule':
        return paymentScheduleStepValid(state);
      case 'payments':
        return paymentsStepValid(state);
      case 'investment-strategy':
        return investmentStrategyStepValid(state);
      case 'investment-mix':
        // Handled internally by InvestmentMixFlow — completion calls advance() directly.
        return true;
      case 'beneficiary':
        return beneficiaryStepValid(state);
      case 'review':
        return reviewStepValid(state);
      default:
        return false;
    }
  }

  function handleNext() {
    if (!stepIsValid(activeStep)) {
      flow.setShowValidation(true);
      return;
    }

    if (currentStepId === 'allocate' && hasFullBalanceTransfer) {
      setShowInsuranceModal(true);
      return;
    }

    if (activeStep === visibleStepKeys.length - 1) {
      flow.submit();
      return;
    }

    flow.advance(activeStep + 1);
  }

  function updateState(next: RetirementIncomeAccountState) {
    setState(next);
  }

  function updateStepFromReview(stepId: RetirementIncomeAccountStepId) {
    const stepIndex = visibleStepKeys.indexOf(stepId);
    if (stepIndex >= 0) flow.editStep(stepIndex);
  }

  // Success screen — IDV is handled inside StepSuccess as a modal.
  // Always start unverified: this is a fresh submission so IDV must be completed
  // regardless of any existing cache from a previous session.
  if (submitted) {
    return (
      <ContentContainer size="md">
        <StepSuccess
          onReturnDashboard={() => router.push('/member-online')}
          gate={{ ...gate, alreadyVerified: false }}
        />
      </ContentContainer>
    );
  }

  // IDV post-review gate removed — IDV is now a modal on the success screen

  return (
    <>
      <Box sx={{ px: 3, pt: 2 }}>
        <MOBreadcrumb
          items={[
            { label: 'Set up income accounts', href: '/member-online/income-accounts' },
            { label: 'Retirement Income Account' },
          ]}
          onBack={() => router.push('/member-online/income-accounts')}
        />
      </Box>

      <ContentContainer size="md">
        <Stack spacing={4}>
          <div>
            <Typography
              variant="h2"
              component="h1"
              sx={{ mb: activeStep === 0 ? 1 : 3 }}
            >
              {STEP_TITLES[activeStep]}
            </Typography>
            {activeStep === 0 && (
              <Divider sx={{ mt: 2 }} />
            )}
            {activeStep > 0 && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <FormProgress
                  variant="simple"
                  value={TARGET_PERCENT[activeStep - 1]}
                  steps={RETIREMENT_INCOME_ACCOUNT_STEPS.filter((s) => {
                    const id = s.id as RetirementIncomeAccountStepId;
                    if (state.setupMode === 'simple') return !CONDITIONAL_STEPS.includes(id);
                    if (state.investmentStrategy === 'default') return !INVESTMENT_STEPS.includes(id);
                    return true;
                  })}
                  activeStep={activeStep - 1}
                  showStepIndicator
                  stepMenu
                  onStepClick={(i) => {
                    const targetStepId = visibleStepKeys[i + 1];
                    if (targetStepId === 'review') return;
                    flow.advance(i + 1);
                  }}
                  disabledSteps={[visibleStepKeys.indexOf('review') - 1].filter((i) => i >= 0)}
                  sx={{ flex: 1, minWidth: 0 }}
                />
              </Box>
            )}
          </div>

          <Box>
          <StepTransition step={activeStep}>
            {currentStepId === 'intro' ? (
              <StepIntro
                onEligible={(answers) =>
                  updateState({ ...state, eligibilityCompleted: true, eligibilityAnswers: answers })
                }
                onEligibilityReset={() =>
                  updateState({
                    ...state,
                    eligibilityCompleted: false,
                    eligibilityAnswers: null,
                    introDeclarationRead: false,
                    introDeclarationPermanent: false,
                  })
                }
                defaultEligible={state.eligibilityCompleted}
                defaultAnswers={state.eligibilityAnswers ?? undefined}
                declarationRead={state.introDeclarationRead}
                showValidation={showValidation}
                onDeclarationReadChange={(checked) =>
                  updateState({ ...state, introDeclarationRead: checked })
                }
              />
            ) : currentStepId === 'funding' ? (
              <StepFunding
                purchaseAmount={state.purchaseAmount}
                onPurchaseAmountChange={(amount) => updateState({ ...state, purchaseAmount: amount })}
                pensionOption="single"
                accounts={state.accounts}
                showValidation={showValidation}
              />
            ) : currentStepId === 'allocate' ? (
              <StepAllocate
                purchaseAmount={state.purchaseAmount}
                accounts={state.accounts}
                totalAllocated={purchaseTotal}
                onTransferAmountChange={(id, amount) => {
                  updateState({
                    ...state,
                    accounts: state.accounts.map((account) =>
                      account.id === id ? { ...account, transferAmount: amount } : account
                    ),
                  });
                }}
                showValidation={showValidation}
              />
            ) : currentStepId === 'setup-mode' ? (
              <StepSetupMode
                setupMode={state.setupMode}
                onSetupModeChange={(value) => updateState({ ...state, setupMode: value })}
                accounts={state.accounts}
                showValidation={showValidation}
              />
            ) : currentStepId === 'payment-schedule' ? (
              <StepPaymentSchedule
                purchaseAmount={purchaseTotal}
                paymentSchedule={state.paymentSchedule}
                onPaymentScheduleChange={(next) => updateState({ ...state, paymentSchedule: next })}
                showValidation={showValidation}
              />
            ) : currentStepId === 'payments' ? (
              <StepPayments
                purchasePrice={purchaseTotal}
                paymentSchedule={state.paymentSchedule}
                bankDetails={state.bankDetails}
                onBankDetailsChange={(nextBankDetails) =>
                  updateState({ ...state, bankDetails: nextBankDetails })
                }
              />
            ) : currentStepId === 'investment-strategy' ? (
              <StepInvestmentStrategy
                investmentStrategy={state.investmentStrategy}
                onInvestmentStrategyChange={(value) => {
                  const isDefault = value === 'default';
                  updateState({
                    ...state,
                    investmentStrategy: value,
                    investmentMix: isDefault
                      ? { mode: 'default', allocations: { 'opt-balanced-risk-adjusted': 100 } }
                      : { mode: 'custom', allocations: {} },
                    drawdown: isDefault
                      ? { ...state.drawdown, mode: 'default' }
                      : { ...state.drawdown, mode: 'custom' },
                  });
                }}
                showValidation={showValidation}
              />
            ) : currentStepId === 'investment-mix' ? (
              <InvestmentMixProvider>
                <InvestmentMixFlow
                  overviewPath="/member-online/retirement-income-account"
                  accountFilter="income"
                  embedded
                  skipIntro
                  onComplete={() => flow.advance(activeStep + 1)}
                  onBack={flow.back}
                />
              </InvestmentMixProvider>
            ) : currentStepId === 'beneficiary' ? (
              <StepBeneficiary
                beneficiaryState={state.beneficiaryState ?? INITIAL_STATE.beneficiaryState}
                onBeneficiaryStateChange={(next) => updateState({ ...state, beneficiaryState: next })}
                showValidation={showValidation}
              />
            ) : (
              <StepReview
                state={state}
                onEditStep={updateStepFromReview}
                onDeclarationChange={(checked) =>
                  updateState({ ...state, reviewDeclarationChecked: checked })
                }
                showValidation={showValidation}
                verifyDetailsState={verifyDetailsState}
                onVerifyDetailsChange={setVerifyDetailsState}
                profile={MOCK_USER_PROFILE}
              />
            )}
          </StepTransition>
          </Box>

          {currentStepId !== 'investment-mix' && (
          <StepperActions
            step={activeStep + 1}
            isSubmitStep={activeStep === visibleStepKeys.length - 1}
            hideNext={currentStepId === 'intro' && !eligible}
            nextLabel={currentStepId === 'intro' ? 'Get started' : activeStep === visibleStepKeys.length - 1 ? 'Continue' : 'Next'}
            onNext={handleNext}
            onBack={flow.back}
            onExit={() => router.push('/member-online')}
            exitDialogDescription={
              flow.lastSavedAt !== null
                ? 'Your progress has been auto-saved. You can return to this application within 30 days.'
                : undefined
            }
          />
          )}
        </Stack>
      </ContentContainer>

      <ResumeDraftDialog
        open={flow.pendingResume !== null}
        savedAt={flow.pendingResume?.savedAt}
        noun="application"
        onContinue={flow.acceptResume}
        onStartFresh={flow.discardResume}
      />

      <Dialog
        open={showInsuranceModal}
        onClose={() => setShowInsuranceModal(false)}
        title="Your insurance cover may be affected"
        description="Transferring your full account balance will leave $0 remaining. This may result in the cancellation of your insurance cover. Do you want to continue?"
        variant="neutral"
        hideCloseButton
        confirmLabel="Continue anyway"
        cancelLabel="Go back"
        onConfirm={() => {
          setShowInsuranceModal(false);
          flow.advance(activeStep + 1);
        }}
      />

    </>
  );
}

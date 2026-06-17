'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
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
import { INITIAL_STATE, RETIREMENT_INCOME_ACCOUNT_STEPS, MOCK_USER_PROFILE, STEP_TITLES, TARGET_PERCENT, initialVerifyDetailsState } from './constants';
import { deleteDraft, loadDraft, saveDraft } from './draftService';
import { useIdvGate } from '../../features/idv';
import { StepAllocate } from './steps/StepAllocate';
import { StepEligibility } from './steps/StepEligibility';
import { StepFunding } from './steps/StepFunding';
import { StepIDV } from './steps/StepIDV';
import { StepIntro } from './steps/StepIntro';
import { StepOption } from './steps/StepOption';
import { StepPayments } from './steps/StepPayments';
import { StepReview } from './steps/StepReview';
import { StepSuccess } from './steps/StepSuccess';
import type { RetirementIncomeAccountDraft, RetirementIncomeAccountState, RetirementIncomeAccountStepId, VerifyDetailsState } from './types';
import {
  allocateStepValid,
  eligibilityStepValid,
  fundingStepValid,
  hasSelectedAccount,
  introStepValid,
  isEligible,
  optionStepValid,
  paymentsStepValid,
  reviewStepValid,
  totalSelectedAmount,
} from './utils';

const STEP_KEYS: RetirementIncomeAccountStepId[] = [
  'intro',
  'eligibility',
  'option',
  'funding',
  'allocate',
  'payments',
  'review',
];

export function RetirementIncomeAccountFlow() {
  const router = useRouter();

  const gate = useIdvGate();

  const [verifyDetailsState, setVerifyDetailsState] = useState<VerifyDetailsState>(initialVerifyDetailsState);

  const [state, setState] = useState<RetirementIncomeAccountState>(INITIAL_STATE);
  const [activeStep, setActiveStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [showValidation, setShowValidation] = useState(false);
  const [showInsuranceModal, setShowInsuranceModal] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(null);
  const [resumeDraft, setResumeDraft] = useState<RetirementIncomeAccountDraft | null>(null);
  const isReadyToAutoSaveRef = useRef(false);
  const saveDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const purchaseTotal = useMemo(() => totalSelectedAmount(state), [state]);
  const eligible = useMemo(() => isEligible(state), [state]);

  const hasFullBalanceTransfer = useMemo(() => {
    return state.accounts.some(
      (account) => account.selected && account.balance > 0 && account.transferAmount >= account.balance
    );
  }, [state.accounts]);

  function stepIsValid(step: number): boolean {
    if (step === 0) {
      return introStepValid(state);
    }
    if (step === 1) {
      return eligibilityStepValid(state);
    }
    if (step === 2) {
      return optionStepValid(state);
    }
    if (step === 3) {
      return fundingStepValid(state);
    }
    if (step === 4) {
      return allocateStepValid(state);
    }
    if (step === 5) {
      return paymentsStepValid(state);
    }
    return reviewStepValid(state);
  }

  function advance(nextStep: number) {
    if (nextStep > 0) setIsSaving(true);
    setActiveStep(nextStep);
    setShowValidation(false);
  }

  function handleBack() {
    setShowValidation(false);
    setActiveStep((prev) => Math.max(0, prev - 1));
  }

  function handleNext() {
    if (!stepIsValid(activeStep)) {
      setShowValidation(true);
      return;
    }

    if (activeStep === 4 && hasFullBalanceTransfer) {
      setShowInsuranceModal(true);
      return;
    }

    if (activeStep === STEP_KEYS.length - 1) {
      setSubmitted(true);
      return;
    }

    advance(activeStep + 1);
  }

  function updateState(next: RetirementIncomeAccountState) {
    setState(next);
  }

  function updateStepFromReview(stepId: RetirementIncomeAccountStepId) {
    const stepIndex = STEP_KEYS.indexOf(stepId);
    if (stepIndex >= 0) {
      setSubmitted(false);
      setActiveStep(stepIndex);
      setShowValidation(false);
    }
  }

  // Load any existing draft on mount
  useEffect(() => {
    loadDraft().then((draft) => {
      if (draft) {
        setResumeDraft(draft);
      } else {
        isReadyToAutoSaveRef.current = true;
      }
    });
  }, []);

  // Debounced auto-save on any state or step change (skip intro step)
  useEffect(() => {
    if (!isReadyToAutoSaveRef.current) return;
    if (activeStep === 0) return;
    if (saveDebounceRef.current) clearTimeout(saveDebounceRef.current);

    saveDebounceRef.current = setTimeout(() => {
      setIsSaving(true);
      saveDraft(state, activeStep).then(() => {
        setIsSaving(false);
        setLastSavedAt(new Date());
      });
    }, 500);

    return () => {
      if (saveDebounceRef.current) clearTimeout(saveDebounceRef.current);
    };
  }, [state, activeStep]);

  // Clean up draft after successful submission
  useEffect(() => {
    if (submitted) deleteDraft();
  }, [submitted]);

  function handleResumeConfirm() {
    if (resumeDraft) {
      setState(resumeDraft.state);
      setActiveStep(resumeDraft.activeStep);
      setLastSavedAt(new Date(resumeDraft.savedAt));
    }
    setResumeDraft(null);
    isReadyToAutoSaveRef.current = true;
  }

  function handleResumeDismiss() {
    deleteDraft();
    setResumeDraft(null);
    isReadyToAutoSaveRef.current = true;
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
              <>
                <Typography variant="body" sx={{ color: 'text.primary' }}>
                  A Retirement Income account allows people to receive regular tax free income from your super during
                  retirement. To learn more about this account you can download the Product Disclosure Statement.
                </Typography>
                <Divider sx={{ mt: 2 }} />
              </>
            )}
            {activeStep > 0 && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <FormProgress
                  variant="simple"
                  value={TARGET_PERCENT[activeStep - 1]}
                  steps={RETIREMENT_INCOME_ACCOUNT_STEPS}
                  activeStep={activeStep - 1}
                  showStepIndicator
                  stepMenu
                  onStepClick={(i) => advance(i + 1)}
                  sx={{ flex: 1, minWidth: 0 }}
                />
              </Box>
            )}
          </div>

          <Box>
          <StepTransition step={activeStep}>
            {activeStep === 0 ? (
              <StepIntro
                declarationRead={state.introDeclarationRead}
                declarationPermanent={state.introDeclarationPermanent}
                showValidation={showValidation}
                onDeclarationReadChange={(checked) =>
                  updateState({ ...state, introDeclarationRead: checked })
                }
                onDeclarationPermanentChange={(checked) =>
                  updateState({ ...state, introDeclarationPermanent: checked })
                }
              />
            ) : activeStep === 1 ? (
              <StepEligibility
                retiredFromWork={state.retiredFromWork}
                leftEmployerAfter60={state.leftEmployerAfter60}
                onRetiredFromWorkChange={(value) => updateState({ ...state, retiredFromWork: value })}
                onLeftEmployerAfter60Change={(value) => updateState({ ...state, leftEmployerAfter60: value })}
                eligible={eligible}
                showValidation={showValidation}
              />
            ) : activeStep === 2 ? (
              <StepOption
                pensionOption={state.pensionOption}
                spouseDetails={state.spouseDetails}
                onPensionOptionChange={(option) => updateState({ ...state, pensionOption: option })}
                onSpouseDetailsChange={(nextSpouseDetails) =>
                  updateState({ ...state, spouseDetails: nextSpouseDetails })
                }
                showValidation={showValidation}
              />
            ) : activeStep === 3 ? (
              <StepFunding
                purchaseAmount={state.purchaseAmount}
                onPurchaseAmountChange={(amount) => updateState({ ...state, purchaseAmount: amount })}
                pensionOption={state.pensionOption}
                accounts={state.accounts}
                showValidation={showValidation}
              />
            ) : activeStep === 4 ? (
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
            ) : activeStep === 5 ? (
              <StepPayments
                purchasePrice={purchaseTotal}
                bankDetails={state.bankDetails}
                onBankDetailsChange={(nextBankDetails) =>
                  updateState({ ...state, bankDetails: nextBankDetails })
                }
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

          <StepperActions
            step={activeStep + 1}
            isSubmitStep={activeStep === STEP_KEYS.length - 1}
            nextLabel={activeStep === STEP_KEYS.length - 1 ? 'Continue' : 'Next'}
            onNext={handleNext}
            onBack={handleBack}
            onExit={() => router.push('/member-online')}
            exitDialogDescription={
              lastSavedAt !== null
                ? 'Your progress has been auto-saved. You can return to this application within 30 days.'
                : undefined
            }
          />
        </Stack>
      </ContentContainer>

      {resumeDraft !== null && (
        <Dialog
          open
          onClose={handleResumeDismiss}
          title="Continue your application?"
          description={`You have a saved application from ${new Date(resumeDraft.savedAt).toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' })}. Would you like to continue where you left off?`}
          variant="neutral"
          hideCloseButton
          confirmLabel="Continue where I left off"
          cancelLabel="Start fresh"
          onConfirm={handleResumeConfirm}
        />
      )}

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
          advance(activeStep + 1);
        }}
      />

    </>
  );
}

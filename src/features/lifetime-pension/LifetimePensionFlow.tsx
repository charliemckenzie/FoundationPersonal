'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/navigation';
import { FormProgress } from '../../components/FormProgress';
import { ContentContainer, MOBreadcrumb } from '../../components/MemberOnline';
import { Dialog } from '../../components/Dialog';
import { StepTransition } from '../../components/StepTransition';
import { Icon } from '../../components/Icon';
import { Snackbar } from '../../components/Snackbar';
import { StepperActions } from '../../components/StepperActions';
import { INITIAL_STATE, LIFETIME_PENSION_STEPS, MOCK_USER_PROFILE, STEP_TITLES, TARGET_PERCENT, initialIDVState, initialVerifyDetailsState } from './constants';
import { deleteDraft, loadDraft, saveDraft } from './draftService';
import { checkIDVCache, setIDVCache, submitIDV } from './idvService';
import { StepEligibility } from './steps/StepEligibility';
import { StepFunding } from './steps/StepFunding';
import { StepIDV } from './steps/StepIDV';
import { StepIntro } from './steps/StepIntro';
import { StepOption } from './steps/StepOption';
import { StepPayments } from './steps/StepPayments';
import { StepReview } from './steps/StepReview';
import { StepSuccess } from './steps/StepSuccess';
import type { IDVState, LifetimePensionDraft, LifetimePensionState, LifetimePensionStepId, VerifyDetailsState } from './types';
import {
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

const STEP_KEYS: LifetimePensionStepId[] = [
  'intro',
  'eligibility',
  'option',
  'funding',
  'payments',
  'review',
];

export function LifetimePensionFlow() {
  const router = useRouter();

  const [verifyDetailsState, setVerifyDetailsState] = useState<VerifyDetailsState>(initialVerifyDetailsState);

  const [idvState, setIdvState] = useState<IDVState>(initialIDVState);
  const [idvLoading, setIdvLoading] = useState(false);
  const [idvError, setIdvError] = useState('');

  const [state, setState] = useState<LifetimePensionState>(INITIAL_STATE);
  const [activeStep, setActiveStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [showValidation, setShowValidation] = useState(false);
  const [showInsuranceModal, setShowInsuranceModal] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [resumeDraft, setResumeDraft] = useState<LifetimePensionDraft | null>(null);
  const isReadyToAutoSaveRef = useRef(false);
  const saveDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hasSavedOnceRef = useRef(false);

  const purchaseTotal = useMemo(() => totalSelectedAmount(state), [state]);
  const eligible = useMemo(() => isEligible(state), [state]);

  const hasInvalidTransferAmounts = useMemo(() => {
    return state.accounts.some(
      (account) => account.selected && (account.transferAmount <= 0 || account.transferAmount > account.balance)
    );
  }, [state.accounts]);

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
      return paymentsStepValid(state);
    }
    return reviewStepValid(state);
  }

  function advance(nextStep: number) {
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

    if (activeStep === 3 && hasFullBalanceTransfer) {
      setShowInsuranceModal(true);
      return;
    }

    if (activeStep === STEP_KEYS.length - 1) {
      setSubmitted(true);
      return;
    }

    advance(activeStep + 1);
  }

  function updateState(next: LifetimePensionState) {
    setState(next);
  }

  function updateStepFromReview(stepId: LifetimePensionStepId) {
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
        if (!hasSavedOnceRef.current) {
          hasSavedOnceRef.current = true;
          setSnackbarOpen(true);
        }
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

  // Success screen — IDV is handled inside StepSuccess as a modal
  if (submitted) {
    return (
      <ContentContainer size="md">
        <StepSuccess
          onReturnDashboard={() => router.push('/member-online')}
          idvState={idvState}
          onIdvChange={setIdvState}
          idvLoading={idvLoading}
          idvError={idvError}
          onIdvSubmit={async () => {
            setIdvLoading(true);
            setIdvError('');
            const result = await submitIDV(idvState.selectedDocument, idvState);
            setIdvLoading(false);
            if (result.success) {
              setIDVCache();
            } else {
              setIdvError(result.error ?? 'Verification failed. Please check your details and try again.');
            }
            return result.success;
          }}
          idvAlreadyVerified={false}
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
            { label: 'Investments', href: '#' },
            { label: 'Lifetime Pension' },
          ]}
          onBack={() => router.push('/member-online')}
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
              <Typography variant="body" sx={{ color: 'text.primary' }}>
                A Lifetime Pension account provides guaranteed, fortnightly tax-free income for life.
                It combines your contribution with others in a shared investment pool.
              </Typography>
            )}
            {activeStep > 0 && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <FormProgress
                  variant="simple"
                  value={TARGET_PERCENT[activeStep - 1]}
                  steps={LIFETIME_PENSION_STEPS}
                  activeStep={activeStep - 1}
                  showStepIndicator
                  stepMenu
                  onStepClick={(i) => advance(i + 1)}
                  sx={{ flex: 1, minWidth: 0 }}
                />
                {/* Always rendered so FormProgress never resizes when save status appears */}
                <Box
                  aria-live="polite"
                  aria-hidden={!(isSaving || lastSavedAt !== null)}
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 0.75,
                    flexShrink: 0,
                    width: '11rem',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    opacity: isSaving || lastSavedAt !== null ? 1 : 0,
                    transition: 'opacity 0.2s ease',
                    pointerEvents: isSaving || lastSavedAt !== null ? 'auto' : 'none',
                  }}
                >
                  {isSaving ? (
                    <CircularProgress size={12} color="primary" sx={{ display: 'block' }} />
                  ) : (
                    <Icon icon="circle-check" size="sm" color="success" />
                  )}
                  <Typography variant="caption" color="text.secondary" component="span">
                    {isSaving
                      ? 'Saving...'
                      : lastSavedAt
                      ? `Last saved at ${lastSavedAt.toLocaleTimeString('en-AU', { hour: 'numeric', minute: '2-digit' })}`
                      : '\u00A0'}
                  </Typography>
                </Box>
              </Box>
            )}
          </div>

          <Box sx={{ mt: activeStep === 0 ? '16px !important' : '32px !important' }}>
          <StepTransition step={activeStep}>
            {activeStep === 0 ? (
              <StepIntro
                ageScenario={state.ageScenario}
                declarationRead={state.introDeclarationRead}
                declarationPermanent={state.introDeclarationPermanent}
                showValidation={showValidation}
                onAgeScenarioChange={(scenario) =>
                  updateState({ ...state, ageScenario: scenario })
                }
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
                accounts={state.accounts}
                totalAmount={purchaseTotal}
                hasSelectedAccount={hasSelectedAccount(state)}
                hasEnoughFunds={purchaseTotal >= 10000}
                hasInvalidTransferAmounts={hasInvalidTransferAmounts}
                onToggleAccount={(id, checked) => {
                  updateState({
                    ...state,
                    accounts: state.accounts.map((account) =>
                      account.id === id
                        ? {
                            ...account,
                            selected: checked,
                            transferAmount: checked && account.transferAmount <= 0
                              ? Number(account.balance.toFixed(2))
                              : checked
                                ? account.transferAmount
                                : 0,
                          }
                        : account
                    ),
                  });
                }}
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
            ) : activeStep === 4 ? (
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

      <Snackbar
        open={snackbarOpen}
        message="Progress saved"
        severity="success"
        duration={3000}
        onClose={() => setSnackbarOpen(false)}
      />
    </>
  );
}

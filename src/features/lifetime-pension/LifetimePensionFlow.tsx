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
import { Alert } from '../../components/Alert';
import { RadioGroup } from '../../components/RadioGroup';
import { Checkbox } from '../../components/Checkbox';
import { useSteppedFlow } from '../../lib/useSteppedFlow';
import { ResumeDraftDialog } from '../../lib/ResumeDraftDialog';
import { INITIAL_STATE, LIFETIME_PENSION_STEPS, MOCK_USER_PROFILE, STEP_TITLES, TARGET_PERCENT, initialVerifyDetailsState } from './constants';
import { deleteDraft, loadDraft, saveDraft } from './draftService';
import { useIdvGate } from '../../features/idv';
import { StepAllocate } from './steps/StepAllocate';
import { StepDetails } from './steps/StepDetails';
import { StepFunding } from './steps/StepFunding';
import { StepIDV, canSubmitIDV, initialIDVState as idvInitialState } from '../../features/idv';
import type { IDVState as IdvModuleState } from '../../features/idv';
import { StepIntro } from './steps/StepIntro';
import { StepOption } from './steps/StepOption';
import { StepPayments } from './steps/StepPayments';
import { StepReview } from './steps/StepReview';
import { StepSuccess } from './steps/StepSuccess';
import type { LifetimePensionState, LifetimePensionStepId, VerifyDetailsState } from './types';
import {
  allocateStepValid,
  fundingStepValid,
  optionStepValid,
  paymentsStepValid,
  reviewStepValid,
  totalSelectedAmount,
} from './utils';

const STEP_KEYS: LifetimePensionStepId[] = [
  'intro',
  'option',
  'funding',
  'allocate',
  'payments',
  'details',
  'idv',
  'review',
];

export function LifetimePensionFlow() {
  const router = useRouter();

  const gate = useIdvGate();

  const [verifyDetailsState, setVerifyDetailsState] = useState<VerifyDetailsState>(initialVerifyDetailsState);
  const [detailsProfile, setDetailsProfile] = useState(MOCK_USER_PROFILE);
  const [idvState, setIdvState] = useState<IdvModuleState>(idvInitialState);
  const [idvLoading] = useState(false);
  const [idvError] = useState('');
  const [verifyMethod, setVerifyMethod] = useState<'online' | 'other'>('online');
  const [otherOptionsConfirmed, setOtherOptionsConfirmed] = useState(false);

  const [introEligible, setIntroEligible] = useState(false);

  // Step navigation + draft autosave/resume are shared with Retirement Income Account via useSteppedFlow.
  const flow = useSteppedFlow<LifetimePensionState>({
    initialState: INITIAL_STATE,
    loadDraft,
    saveDraft,
    deleteDraft,
  });
  const { state, setState, activeStep, showValidation, submitted } = flow;

  const [showInsuranceModal, setShowInsuranceModal] = useState(false);

  const purchaseTotal = useMemo(() => totalSelectedAmount(state), [state]);

  const hasFullBalanceTransfer = useMemo(() => {
    return state.accounts.some(
      (account) => account.selected && account.balance > 0 && account.transferAmount >= account.balance
    );
  }, [state.accounts]);

  function stepIsValid(step: number): boolean {
    if (step === 0) {
      return introEligible;
    }
    if (step === 1) {
      return optionStepValid(state);
    }
    if (step === 2) {
      return fundingStepValid(state);
    }
    if (step === 3) {
      return allocateStepValid(state);
    }
    if (step === 4) {
      return paymentsStepValid(state);
    }
    if (step === 5) {
      return true;
    }
    // IDV step (6) — document selected and form complete (online), or checkbox confirmed (other)
    if (step === 6) {
      if (verifyMethod === 'other') return otherOptionsConfirmed;
      return canSubmitIDV(idvState);
    }
    return reviewStepValid(state);
  }

  function handleNext() {
    if (!stepIsValid(activeStep)) {
      flow.setShowValidation(true);
      return;
    }

    if (activeStep === 3 && hasFullBalanceTransfer) {
      setShowInsuranceModal(true);
      return;
    }

    if (activeStep === STEP_KEYS.length - 1) {
      flow.submit();
      return;
    }

    flow.advance(activeStep + 1);
  }

  function updateState(next: LifetimePensionState) {
    setState(next);
  }

  function updateStepFromReview(stepId: LifetimePensionStepId) {
    const stepIndex = STEP_KEYS.indexOf(stepId);
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
            { label: 'Lifetime Pension' },
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
                  steps={LIFETIME_PENSION_STEPS}
                  activeStep={activeStep - 1}
                  showStepIndicator
                  stepMenu
                  onStepClick={(i) => flow.advance(i + 1)}
                  sx={{ flex: 1, minWidth: 0 }}
                />
              </Box>
            )}
          </div>

          <Box>
          <StepTransition step={activeStep}>
            {activeStep === 0 ? (
              <StepIntro onEligible={() => setIntroEligible(true)} />
            ) : activeStep === 1 ? (
              <StepOption
                pensionOption={state.pensionOption}
                spouseDetails={state.spouseDetails}
                onPensionOptionChange={(option) => updateState({ ...state, pensionOption: option })}
                onSpouseDetailsChange={(nextSpouseDetails) =>
                  updateState({ ...state, spouseDetails: nextSpouseDetails })
                }
                showValidation={showValidation}
              />
            ) : activeStep === 2 ? (
              <StepFunding
                purchaseAmount={state.purchaseAmount}
                onPurchaseAmountChange={(amount) => updateState({ ...state, purchaseAmount: amount })}
                pensionOption={state.pensionOption}
                accounts={state.accounts}
                showValidation={showValidation}
                declarationPermanent={state.introDeclarationPermanent}
                onDeclarationPermanentChange={(checked) =>
                  updateState({ ...state, introDeclarationPermanent: checked })
                }
              />
            ) : activeStep === 3 ? (
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
            ) : activeStep === 4 ? (
              <StepPayments
                purchasePrice={purchaseTotal}
                bankDetails={state.bankDetails}
                onBankDetailsChange={(nextBankDetails) =>
                  updateState({ ...state, bankDetails: nextBankDetails })
                }
                showValidation={showValidation}
              />
            ) : activeStep === 5 ? (
              <StepDetails
                profile={detailsProfile}
                onProfileUpdate={setDetailsProfile}
              />
            ) : activeStep === 6 ? (
              <Stack spacing={3}>
                <div>
                  <Typography variant="h5" component="h2" sx={{ mb: 1 }}>
                    Verify your identity
                  </Typography>
                  <Typography variant="body" sx={{ color: 'text.primary' }}>
                    To process your application, we need to verify your identity. Select one of the documents below to get started.
                  </Typography>
                </div>

                <RadioGroup
                  legend="How would you like to verify?"
                  value={verifyMethod}
                  options={[
                    { value: 'online', label: 'Online' },
                    { value: 'other', label: 'Other options' },
                  ]}
                  direction="column"
                  onChange={(value) => setVerifyMethod(value as 'online' | 'other')}
                />

                {verifyMethod === 'online' ? (
                  <Box
                    sx={(theme) => ({
                      borderRadius: `${theme.shape.lg}px`,
                      backgroundColor: 'background.paper',
                      border: '1px solid',
                      borderColor: 'border.default',
                      px: { xs: 3, sm: 4 },
                      pt: { xs: 3, sm: 4 },
                      pb: { xs: 3, sm: 4 },
                    })}
                  >
                    <StepIDV
                      state={idvState}
                      onChange={setIdvState}
                      onSubmit={handleNext}
                      loading={idvLoading}
                      error={idvError}
                      embedded
                    />
                  </Box>
                ) : (
                  <Box
                    sx={(theme) => ({
                      borderRadius: `${theme.shape.lg}px`,
                      backgroundColor: 'background.paper',
                      border: '1px solid',
                      borderColor: 'border.default',
                      px: { xs: 3, sm: 4 },
                      pt: { xs: 3, sm: 4 },
                      pb: { xs: 3, sm: 4 },
                    })}
                  >
                    <Stack spacing={2}>
                      <Typography variant="body" sx={{ color: 'text.primary' }}>
                        Please refer to the Proof of Identity factsheet for other options to prove your identity.
                      </Typography>
                      <Checkbox
                        label="I confirm that I will provide identity documents as described in the Proof of Identity factsheet."
                        checked={otherOptionsConfirmed}
                        onChange={setOtherOptionsConfirmed}
                      />
                    </Stack>
                  </Box>
                )}
              </Stack>
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
                profile={detailsProfile}
                verifyMethod={verifyMethod}
              />
            )}
          </StepTransition>
          </Box>

          {showValidation && activeStep === 6 && !stepIsValid(6) && (
            <Alert
              severity="error"
              message="To continue, please complete the online identity check or confirm you'll provide identity documents using another method."
            />
          )}

          <StepperActions
            step={activeStep + 1}
            isSubmitStep={activeStep === STEP_KEYS.length - 1}
            hideNext={activeStep === 0 && !introEligible}
            nextLabel={activeStep === 0 ? 'Get started' : activeStep === STEP_KEYS.length - 1 ? 'Continue' : 'Next'}
            onNext={handleNext}
            onBack={flow.back}
            onExit={() => router.push('/member-online')}
            exitDialogDescription={
              flow.lastSavedAt !== null
                ? 'Your progress has been auto-saved. You can return to this application within 30 days.'
                : undefined
            }
          />
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

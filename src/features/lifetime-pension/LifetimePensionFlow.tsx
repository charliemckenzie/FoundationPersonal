'use client';

import { useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { useRouter } from 'next/navigation';
import { FormProgress } from '../../components/FormProgress';
import { ContentContainer, MOBreadcrumb } from '../../components/MemberOnline';
import { Dialog } from '../../components/Dialog';
import { StepTransition } from '../../components/StepTransition';
import { StepperActions } from '../../components/StepperActions';
import { INITIAL_STATE, LIFETIME_PENSION_STEPS, TARGET_PERCENT } from './constants';
import { StepEligibility } from './steps/StepEligibility';
import { StepFunding } from './steps/StepFunding';
import { StepIntro } from './steps/StepIntro';
import { StepOption } from './steps/StepOption';
import { StepPayments } from './steps/StepPayments';
import { StepReview } from './steps/StepReview';
import { StepSuccess } from './steps/StepSuccess';
import type { LifetimePensionState, LifetimePensionStepId } from './types';
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

  const [state, setState] = useState<LifetimePensionState>(INITIAL_STATE);
  const [activeStep, setActiveStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [showValidation, setShowValidation] = useState(false);
  const [showInsuranceModal, setShowInsuranceModal] = useState(false);

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

  if (submitted) {
    return (
      <ContentContainer size="md">
        <StepSuccess onReturnDashboard={() => router.push('/member-online')} />
      </ContentContainer>
    );
  }

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
        <Stack spacing={4} sx={{ py: 4 }}>
          <FormProgress
            variant="simple"
            value={TARGET_PERCENT[activeStep]}
            steps={LIFETIME_PENSION_STEPS}
            activeStep={activeStep}
            showStepIndicator
          />

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
              />
            )}
          </StepTransition>

          <StepperActions
            step={activeStep + 1}
            isSubmitStep={activeStep === STEP_KEYS.length - 1}
            nextLabel={activeStep === STEP_KEYS.length - 1 ? 'Submit' : 'Next'}
            onNext={handleNext}
            onBack={handleBack}
            onExit={() => router.push('/member-online')}
          />
        </Stack>
      </ContentContainer>

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

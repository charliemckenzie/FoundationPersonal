'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { FormProgress } from '../../components/FormProgress';
import { Logo } from '../../components/Logo';
import { StepperActions } from '../../components/StepperActions';
import { StepTransition } from '../../components/StepTransition';
import { INITIAL_STATE, FORM_STEPS } from './constants';
import { StepWelcome } from './steps/StepWelcome';
import { StepDisclaimer } from './steps/StepDisclaimer';
import { StepIncome } from './steps/StepIncome';
import { StepLifestyle } from './steps/StepLifestyle';
import { StepSuper } from './steps/StepSuper';
import { StepPartnerSuper } from './steps/StepPartnerSuper';
import { StepAssetsDebts } from './steps/StepAssetsDebts';
import { StepResults } from './steps/StepResults';
import { StepNextSteps } from './steps/StepNextSteps';
import type { RetirementProjectionState } from './types';

type FlowPhase = 'welcome' | 'disclaimer' | 'form' | 'results' | 'next-steps';

/** Session-scoped persistence so a refresh or accidental navigation resumes the flow. */
const STORAGE_KEY = 'retirement-projection-v1';

interface PersistedFlow {
  state: RetirementProjectionState;
  phase: FlowPhase;
  formStep: number;
  maxStep: number;
}

export interface StepErrors {
  currentAge?: string;
  retirementAge?: string;
  lifestyle?: string;
  customTarget?: string;
}

function validateStep(step: number, state: RetirementProjectionState): StepErrors {
  const errors: StepErrors = {};
  if (step === 0) {
    const currentAge = Number(state.currentAge);
    const retirementAge = Number(state.retirementAge);
    if (!state.currentAge || !Number.isFinite(currentAge) || currentAge < 15 || currentAge > 99) {
      errors.currentAge = 'Enter an age between 15 and 99.';
    }
    if (!state.retirementAge || !Number.isFinite(retirementAge) || retirementAge > 99) {
      errors.retirementAge = 'Enter a retirement age up to 99.';
    } else if (!errors.currentAge && retirementAge <= currentAge) {
      errors.retirementAge = 'Retirement age must be later than your current age.';
    }
  }
  if (step === 1) {
    if (!state.lifestyle) {
      errors.lifestyle = 'Choose a lifestyle option to continue.';
    } else if (state.lifestyle === 'custom' && !(Number(state.customTarget) > 0)) {
      errors.customTarget = 'Enter your target retirement income.';
    }
  }
  return errors;
}

export function RetirementProjectionFlow() {
  const [state, setState] = useState<RetirementProjectionState>(INITIAL_STATE);
  const [phase, setPhase] = useState<FlowPhase>('welcome');
  const [formStep, setFormStep] = useState(0);
  const [maxStep, setMaxStep] = useState(0);
  const [errors, setErrors] = useState<StepErrors>({});
  const restored = useRef(false);

  // Dynamic steps — partner super step only appears when includePartner === 'yes'
  const hasPartner = state.includePartner === 'yes';
  const activeFormSteps = useMemo(
    () => FORM_STEPS.filter((s) => !s.conditional || (s.id === 'partner-super' && hasPartner)),
    [hasPartner],
  );
  const totalFormSteps = activeFormSteps.length - 1; // subtract the 'results' entry which is a marker, not a form step

  // Resume a session interrupted by a refresh or accidental navigation.
  // sessionStorage is only readable in the browser, so this must run after
  // mount — a lazy useState initializer would mismatch the server render.
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw) as PersistedFlow;
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setState({ ...INITIAL_STATE, ...saved.state });
        setPhase(saved.phase);
        setFormStep(saved.formStep);
        setMaxStep(saved.maxStep);
      }
    } catch {
      // Corrupted or unavailable storage — start fresh.
    }
    restored.current = true;
  }, []);

  useEffect(() => {
    if (!restored.current) return;
    try {
      const snapshot: PersistedFlow = { state, phase, formStep, maxStep };
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
    } catch {
      // Storage unavailable — the flow still works, it just won't survive a refresh.
    }
  }, [state, phase, formStep, maxStep]);

  function clearError(key: keyof StepErrors) {
    setErrors((prev) => (prev[key] ? { ...prev, [key]: undefined } : prev));
  }

  function handleWelcomeStart() {
    setPhase('disclaimer');
  }

  function handleDisclaimerStart() {
    setPhase('form');
    setFormStep(0);
  }

  function handleBack() {
    setErrors({});
    if (phase === 'disclaimer') {
      setPhase('welcome');
      return;
    }
    if (phase === 'results') {
      setPhase('form');
      setFormStep(totalFormSteps - 1);
      return;
    }
    if (phase === 'next-steps') {
      setPhase('results');
      return;
    }
    if (formStep > 0) {
      setFormStep(formStep - 1);
    } else {
      setPhase('disclaimer');
    }
  }

  function handleNext() {
    if (phase !== 'form') return;
    const stepErrors = validateStep(formStep, state);
    if (Object.values(stepErrors).some(Boolean)) {
      setErrors(stepErrors);
      return;
    }
    setErrors({});
    if (formStep < totalFormSteps - 1) {
      const nextStep = formStep + 1;
      setFormStep(nextStep);
      setMaxStep(Math.max(maxStep, nextStep));
    } else {
      setPhase('results');
      setMaxStep(Math.max(maxStep, totalFormSteps));
    }
  }

  function handleResultsNext() {
    setPhase('next-steps');
  }

  /** Full reset — only ever invoked after the user confirms (exit dialog / finish dialog). */
  function handleExit() {
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      // Storage unavailable — nothing to clear.
    }
    setState(INITIAL_STATE);
    setPhase('welcome');
    setFormStep(0);
    setMaxStep(0);
    setErrors({});
  }

  function getActiveFormStep(): number {
    if (phase === 'form') return formStep;
    if (phase === 'results') return totalFormSteps;
    // Next steps: past the final marker, so every step renders as completed.
    return totalFormSteps + 1;
  }

  const showFormProgress = phase === 'form' || phase === 'results' || phase === 'next-steps';

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'background.default' }}>
      {/* Header — 80px tall, transparent, 1200px max */}
      <Box
        component="header"
        sx={{
          height: '5rem',
          px: 3,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '100%',
            maxWidth: 1160,
            mx: 'auto',
          }}
        >
          <Logo variant="secondary" size="md" />
          <Typography variant="body" sx={{ fontWeight: 500 }}>
            Retirement projection
          </Typography>
        </Box>
      </Box>

      {/* White content container — 1200px max with padding */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          maxWidth: 1160,
          mx: 'auto',
          width: '100%',
          mt: 0,
          mb: 0,
          backgroundColor: 'background.paper',
          borderRadius: { xs: '0.75rem', md: '1.5rem' },
          overflow: 'hidden',
          minHeight: 670,
        }}
      >
        {/* Stepped progress bar */}
        {showFormProgress && (
          <Box sx={{ pt: 3, pb: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
            <Box sx={{ mx: 5 }}>
              <FormProgress
                variant="stepped"
                steps={activeFormSteps}
                activeStep={getActiveFormStep()}
                maxStep={maxStep}
                onStepClick={(index) => {
                  if (index > maxStep) return;
                  setErrors({});
                  if (index < totalFormSteps) {
                    setPhase('form');
                    setFormStep(index);
                  } else {
                    setPhase('results');
                  }
                }}
              />
            </Box>
          </Box>
        )}

        {/* Main content — 1200px max, 12-col grid applied per step */}
        <Box
          component="main"
          sx={{
            flex: phase === 'welcome' ? undefined : 1,
            display: 'flex',
            flexDirection: 'column',
            pt: phase === 'welcome' ? 0 : { xs: 3, md: 8 },
            pb: 0,
            px: phase === 'welcome' ? 0 : { xs: 2, md: 8 },
            width: '100%',
          }}
        >
          <StepTransition step={
            phase === 'welcome' ? 0
            : phase === 'disclaimer' ? 1
            : phase === 'form' ? 2 + formStep
            : phase === 'results' ? 100
            : 101
          }>
            {phase === 'welcome' && (
              <StepWelcome onStart={handleWelcomeStart} />
            )}

            {phase === 'disclaimer' && (
              <StepDisclaimer
                accepted={state.disclaimerAccepted}
                onAcceptedChange={(checked) => setState((prev) => ({ ...prev, disclaimerAccepted: checked }))}
                onBack={() => setPhase('welcome')}
                onExit={handleExit}
                onStart={handleDisclaimerStart}
              />
            )}

            {phase === 'form' && (
              <>
                {formStep === 0 && (
                  <StepIncome
                    state={state}
                    errors={errors}
                    onCurrentAgeChange={(value) => { setState((prev) => ({ ...prev, currentAge: value })); clearError('currentAge'); }}
                    onRetirementAgeChange={(value) => { setState((prev) => ({ ...prev, retirementAge: value })); clearError('retirementAge'); }}
                    onSalaryChange={(value) => setState((prev) => ({ ...prev, salary: value?.toString() ?? '' }))}
                    onSalaryFrequencyChange={(value) => setState((prev) => ({ ...prev, salaryFrequency: value }))}
                    onIncludePartnerChange={(value) => setState((prev) => ({ ...prev, includePartner: value }))}
                    onPartnerChange={(partner) => setState((prev) => ({ ...prev, partner }))}
                    onOwnHomeChange={(value) => setState((prev) => ({ ...prev, ownHome: value }))}
                    onHomeLoanChange={(loan) => setState((prev) => ({ ...prev, homeLoan: loan }))}
                  />
                )}
                {formStep === 1 && (
                  <StepLifestyle
                    lifestyle={state.lifestyle}
                    customTarget={state.customTarget}
                    couple={state.includePartner === 'yes'}
                    errors={errors}
                    onLifestyleChange={(value) => {
                      setState((prev) => ({ ...prev, lifestyle: value }));
                      clearError('lifestyle');
                      clearError('customTarget');
                    }}
                    onCustomTargetChange={(value) => {
                      setState((prev) => ({ ...prev, customTarget: value?.toString() ?? '' }));
                      clearError('customTarget');
                    }}
                  />
                )}
                {formStep === 2 && (
                  <StepSuper
                    balance={state.superBalance}
                    contributions={state.superContributions}
                    otherFund={state.otherFund}
                    salary={state.salary?.toString() ?? ''}
                    salaryFrequency={state.salaryFrequency}
                    onBalanceChange={(value) => setState((prev) => ({ ...prev, superBalance: value }))}
                    onContributionsChange={(contributions) => setState((prev) => ({ ...prev, superContributions: contributions }))}
                    onOtherFundChange={(fund) => setState((prev) => ({ ...prev, otherFund: fund }))}
                  />
                )}
                {hasPartner && formStep === 3 && (
                  <StepPartnerSuper
                    partner={state.partner}
                    onPartnerChange={(partner) => setState((prev) => ({ ...prev, partner }))}
                  />
                )}
                {formStep === (hasPartner ? 4 : 3) && (
                  <StepAssetsDebts
                    ownProperty={state.ownInvestmentProperty}
                    property={state.investmentProperty}
                    hasSavings={state.hasSavings}
                    savings={state.savings}
                    hasManagedFunds={state.hasManagedFunds}
                    managedFunds={state.managedFunds}
                    debts={state.debts}
                    onOwnPropertyChange={(value) => setState((prev) => ({ ...prev, ownInvestmentProperty: value }))}
                    onPropertyChange={(property) => setState((prev) => ({ ...prev, investmentProperty: property }))}
                    onHasSavingsChange={(value) => setState((prev) => ({ ...prev, hasSavings: value }))}
                    onSavingsChange={(savings) => setState((prev) => ({ ...prev, savings }))}
                    onHasManagedFundsChange={(value) => setState((prev) => ({ ...prev, hasManagedFunds: value }))}
                    onManagedFundsChange={(funds) => setState((prev) => ({ ...prev, managedFunds: funds }))}
                    onDebtsChange={(debts) => setState((prev) => ({ ...prev, debts }))}
                  />
                )}
              </>
            )}

            {phase === 'results' && (
              <StepResults
                state={state}
                onStateChange={(updates) => setState((prev) => ({ ...prev, ...updates }))}
                onBack={handleBack}
                onNext={handleResultsNext}
                onExit={handleExit}
              />
            )}

            {phase === 'next-steps' && (
              <StepNextSteps
                onBack={handleBack}
                onFinish={handleExit}
              />
            )}
          </StepTransition>

          {phase === 'form' && (
            <Box sx={{ mt: 'auto', pt: 5 }}>
              <StepperActions
                step={formStep + 2}
                isSubmitStep={formStep === totalFormSteps - 1}
                nextLabel={formStep === totalFormSteps - 1 ? 'See your results' : 'Next'}
                cancelLabel="Exit"
                exitDialogTitle="Exit the projection?"
                exitDialogDescription="This clears everything you've entered. You can come back and start again at any time."
                exitDialogConfirmLabel="Exit"
                onBack={handleBack}
                onNext={handleNext}
                onExit={handleExit}
              />
            </Box>
          )}
        </Box>
      </Box>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          py: 2,
        }}
      >
        <Box sx={{ maxWidth: 1160, mx: 'auto', width: '100%', px: { xs: 2, md: 7.5 } }}>
          <Box sx={{ display: 'flex', gap: 2, mb: 0.5 }}>
            <Typography
              component="a"
              href="#"
              variant="small"
              color="text.primary"
              sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
            >
              Terms and conditions
            </Typography>
            <Typography
              component="a"
              href="#"
              variant="small"
              color="text.primary"
              sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
            >
              Privacy policy
            </Typography>
            <Typography
              component="a"
              href="#"
              variant="small"
              color="text.primary"
              sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
            >
              Disclaimer
            </Typography>
          </Box>
          <Typography variant="caption" color="text.muted">
            Australian Retirement Trust Pty Ltd ABN 88 010 720 840 AFSL No. 228975 Trustee of the Australian Retirement Trust Superannuation Fund ABN 60 905 115 063
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { FormProgress } from '../../components/FormProgress';
import { Logo } from '../../components/Logo';
import { StepperActions } from '../../components/StepperActions';
import { StepTransition } from '../../components/StepTransition';
import { Alert } from '../../components/Alert';
import { INITIAL_STATE, FORM_STEPS } from './constants';
import { calculateContributions } from './engine';
import { StepWelcome } from './steps/StepWelcome';
import { StepDisclaimer } from './steps/StepDisclaimer';
import { StepAboutYou } from './steps/StepAboutYou';
import type { StepAboutYouErrors } from './steps/StepAboutYou';
import { StepCurrentContributions } from './steps/StepCurrentContributions';
import { StepEligibility } from './steps/StepEligibility';
import { StepAffordability } from './steps/StepAffordability';
import type { StepAffordabilityErrors } from './steps/StepAffordability';
import { StepResults } from './steps/StepResults';
import { StepNextSteps } from './steps/StepNextSteps';
import type { ContributionsState, ContributionsResult } from './types';

type FlowPhase = 'welcome' | 'disclaimer' | 'form' | 'results' | 'next-steps';

const STORAGE_KEY = 'contributions-calc-v1';

interface PersistedFlow {
  state: ContributionsState;
  phase: FlowPhase;
  formStep: number;
  maxStep: number;
}

export interface StepErrors extends StepAboutYouErrors, StepAffordabilityErrors {}

function validateStep(step: number, state: ContributionsState): StepErrors {
  const errors: StepErrors = {};

  if (step === 0) {
    const currentAge = Number(state.currentAge);
    const retirementAge = Number(state.retirementAge);
    if (!state.currentAge || !Number.isFinite(currentAge)) {
      errors.currentAge = 'Enter your age.';
    } else if (currentAge < 16 || currentAge > 75) {
      errors.currentAge = 'Age must be between 16 and 75.';
    }
    if (!state.retirementAge || !Number.isFinite(retirementAge)) {
      errors.retirementAge = 'Enter your retirement age.';
    } else if (!errors.currentAge && retirementAge <= currentAge) {
      errors.retirementAge = 'Retirement age must be later than your current age.';
    }
    if (!state.salary) {
      errors.salary = 'Enter your salary.';
    }
    if (!state.superBalance) {
      errors.superBalance = 'Enter your super balance.';
    }
  }

  if (step === 3) {
    if (!state.additionalAmount || Number(state.additionalAmount) <= 0) {
      errors.additionalAmount = 'Enter an amount you could contribute.';
    }
    if (!state.contributionPreference) {
      errors.contributionPreference = 'Choose how you\u2019d prefer to contribute.';
    }
    if (!state.optimisationGoal) {
      errors.optimisationGoal = 'Choose what\u2019s most important to you.';
    }
  }

  return errors;
}

export function ContributionsFlow() {
  const [state, setState] = useState<ContributionsState>(INITIAL_STATE);
  const [phase, setPhase] = useState<FlowPhase>('welcome');
  const [formStep, setFormStep] = useState(0);
  const [maxStep, setMaxStep] = useState(0);
  const [errors, setErrors] = useState<StepErrors>({});
  const [result, setResult] = useState<ContributionsResult | null>(null);
  const restored = useRef(false);

  const totalFormSteps = FORM_STEPS.length - 1; // subtract 'results' marker

  // Session persistence
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw) as PersistedFlow;
        setState({ ...INITIAL_STATE, ...saved.state });
        setPhase(saved.phase);
        setFormStep(saved.formStep);
        setMaxStep(saved.maxStep);
      }
    } catch {
      // Start fresh
    }
    restored.current = true;
  }, []);

  useEffect(() => {
    if (!restored.current) return;
    try {
      const snapshot: PersistedFlow = { state, phase, formStep, maxStep };
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
    } catch {
      // Storage unavailable
    }
  }, [state, phase, formStep, maxStep]);

  // Recalculate result when entering results phase
  useEffect(() => {
    if (phase === 'results') {
      setResult(calculateContributions(state));
    }
  }, [phase, state]);

  function clearError(key: keyof StepErrors) {
    setErrors((prev) => (prev[key] ? { ...prev, [key]: undefined } : prev));
  }

  function handleChange(patch: Partial<ContributionsState>) {
    setState((prev) => ({ ...prev, ...patch }));
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

  function handleExit() {
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      // Nothing to clear
    }
    setState(INITIAL_STATE);
    setPhase('welcome');
    setFormStep(0);
    setMaxStep(0);
    setErrors({});
    setResult(null);
  }

  function getActiveFormStep(): number {
    if (phase === 'form') return formStep;
    if (phase === 'results') return totalFormSteps;
    return totalFormSteps + 1;
  }

  const showFormProgress = phase === 'form' || phase === 'results' || phase === 'next-steps';
  const hasValidationErrors = Object.values(errors).some(Boolean);

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'background.default' }}>
      {/* Header */}
      <Box
        component="header"
        sx={{ height: '5rem', px: 3 }}
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
            Contributions calculator
          </Typography>
        </Box>
      </Box>

      {/* White content container */}
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
                steps={FORM_STEPS}
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

        {/* Main content */}
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
                  <StepAboutYou
                    state={state}
                    errors={errors}
                    onChange={handleChange}
                    clearError={clearError}
                  />
                )}

                {formStep === 1 && (
                  <StepCurrentContributions
                    state={state}
                    onChange={handleChange}
                  />
                )}

                {formStep === 2 && (
                  <StepEligibility
                    state={state}
                    onChange={handleChange}
                  />
                )}

                {formStep === 3 && (
                  <StepAffordability
                    state={state}
                    errors={errors}
                    onChange={handleChange}
                    clearError={clearError}
                  />
                )}
              </>
            )}

            {phase === 'results' && result && (
              <StepResults result={result} />
            )}

            {phase === 'next-steps' && (
              <StepNextSteps onStartOver={handleExit} />
            )}
          </StepTransition>
        </Box>

        {/* Stepper actions for form phase */}
        {phase === 'form' && (
          <Box sx={{ px: { xs: 2, md: 8 }, pb: 4, pt: 2 }}>
            {hasValidationErrors && (
              <Box sx={{ mb: 2 }}>
                <Alert severity="error" message="Please fix the errors above before continuing." />
              </Box>
            )}
            <StepperActions
              step={formStep + 1}
              onBack={handleBack}
              onNext={handleNext}
              onExit={handleExit}
              nextLabel={formStep === totalFormSteps - 1 ? 'Calculate' : 'Next'}
              cancelLabel="Exit"
              exitDialogTitle="Exit the calculator?"
              exitDialogDescription="You can come back and start the calculator again at any time."
              exitDialogConfirmLabel="Exit"
            />
          </Box>
        )}

        {/* Actions for results phase */}
        {phase === 'results' && (
          <Box sx={{ px: { xs: 2, md: 8 }, pb: 4, pt: 2 }}>
            <StepperActions
              step={totalFormSteps + 1}
              onBack={handleBack}
              onNext={handleResultsNext}
              onExit={handleExit}
              nextLabel="What to do next"
              backLabel="Back to form"
              cancelLabel="Exit"
              exitDialogTitle="Exit the calculator?"
              exitDialogDescription="You can come back and start the calculator again at any time."
              exitDialogConfirmLabel="Exit"
            />
          </Box>
        )}

        {/* Actions for next-steps phase */}
        {phase === 'next-steps' && (
          <Box sx={{ px: { xs: 2, md: 8 }, pb: 4, pt: 2 }}>
            <StepperActions
              step={totalFormSteps + 2}
              onBack={handleBack}
              onExit={handleExit}
              backLabel="Back to results"
              cancelLabel="Exit"
              exitDialogTitle="Exit the calculator?"
              exitDialogDescription="You can come back and start the calculator again at any time."
              exitDialogConfirmLabel="Exit"
            />
          </Box>
        )}
      </Box>
    </Box>
  );
}

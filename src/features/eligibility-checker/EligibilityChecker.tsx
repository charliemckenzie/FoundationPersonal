'use client';

import { useRef, useState } from 'react';
import Box from '@mui/material/Box';
import MuiDivider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import type { SxProps, Theme } from '@mui/material/styles';
import { Button } from '@/components/Button';
import { StepTransition } from '@/components/StepTransition';
import { EligibilityCheckerStep } from './EligibilityCheckerStep';
import type { Answers, EligibilityAnswer, EligibilityCheckerConfig, EligibilityOutcome } from './types';

const PILL_SX: SxProps<Theme> = {
  display: 'inline-flex',
  alignItems: 'center',
  px: 1.5,
  py: 0.5,
  borderRadius: '999px',
  bgcolor: 'primary.main',
  color: 'primary.contrastText',
};

const visuallyHiddenSx: SxProps<Theme> = {
  position: 'absolute',
  width: '1px',
  height: '1px',
  margin: '-1px',
  overflow: 'hidden',
  clip: 'rect(0,0,0,0)',
  whiteSpace: 'nowrap',
  border: 0,
};

interface EligibleViewProps {
  config: EligibilityCheckerConfig;
  onReset: () => void;
}

function EligibleView({ config, onReset }: EligibleViewProps) {
  return (
    <Box role="status" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2 }}>
      <Typography variant="h6" component="p" sx={{ color: 'success.text' }}>
        {config.eligibleTitle}
      </Typography>
      <Button
        label="Update answers"
        variant="outlined"
        color="success"
        size="small"
        onClick={onReset}
      />
    </Box>
  );
}

export interface EligibilityCheckerProps {
  config: EligibilityCheckerConfig;
  /** Initial step index (uncontrolled). Defaults to the first step. */
  defaultStep?: number;
  /** Initial answers (uncontrolled) — resume a draft or seed a specific state. */
  defaultAnswers?: Answers;
  /** Start in the eligible/success state (uncontrolled). */
  defaultEligible?: boolean;
  /** Called once when the checker transitions to the eligible/success state. Receives the answers at the time of completion. */
  onEligible?: (answers: Answers) => void;
  /** Called when the user clicks "Update answers" to restart the checker. */
  onReset?: () => void;
}

export function EligibilityChecker({
  config,
  defaultStep = 0,
  defaultAnswers,
  defaultEligible = false,
  onEligible,
  onReset: onResetProp,
}: EligibilityCheckerProps) {
  const { steps } = config;
  const [activeStep, setActiveStep] = useState(defaultStep);
  const [answers, setAnswers] = useState<Answers>(() => defaultAnswers ?? {});
  const [eligible, setEligible] = useState(defaultEligible);

  const shellSx: SxProps<Theme> = {
    border: '1px solid',
    borderColor: eligible ? 'success.border' : 'border.default',
    borderRadius: '1rem',
    backgroundColor: eligible ? 'success.background' : 'background.paper',
    p: { xs: 3, sm: 4 },
    transition: 'background-color 0.5s ease, border-color 0.5s ease',
  };

  // Focus moves here once each step (or the success state) has finished animating
  // in, so keyboard and screen-reader users land at the top of the new content.
  const focusRef = useRef<HTMLDivElement>(null);

  const currentStep = steps[activeStep];
  const currentOutcome = currentStep.getOutcome(answers);
  const isLastStep = activeStep === steps.length - 1;

  function advance(outcome: EligibilityOutcome) {
    if (!isLastStep) {
      setActiveStep((s) => s + 1);
    } else if (outcome === 'eligible') {
      setEligible(true);
      onEligible?.(answers);
    }
  }

  function handleChange(id: string, value: EligibilityAnswer) {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  }

  const canGoForward = currentOutcome === 'eligible' || currentOutcome === 'warning';

  function handleForward() {
    if (!canGoForward) return;
    advance(currentOutcome);
  }

  // Back preserves all answers — outcomes recompute from the stored answer set.
  function handleBack() {
    setActiveStep((s) => Math.max(0, s - 1));
  }

  function handleReset() {
    setEligible(false);
    setActiveStep(0);
    onResetProp?.();
  }

  return (
    <Box sx={{ position: 'relative', mt: 2 }}>
      {!eligible && (
        <Box sx={{ ...PILL_SX, position: 'absolute', top: 0, left: 24, transform: 'translateY(-50%)', zIndex: 1 }}>
          <Typography variant="small" component="span">
            <Box component="span" sx={visuallyHiddenSx}>Step </Box>
            {activeStep + 1} of {steps.length}
          </Typography>
        </Box>
      )}
    <Box sx={shellSx}>
      {!eligible && (
        <>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
            <Typography variant="h5" component="h2">
              Check your eligibility
            </Typography>
          </Box>
          <MuiDivider sx={{ borderColor: 'border.subtle', mb: 3 }} />
        </>
      )}

      <StepTransition step={eligible ? steps.length : activeStep} onEntered={() => focusRef.current?.focus()}>
        <Box ref={focusRef} tabIndex={-1} sx={{ outline: 'none' }}>
          {eligible ? (
            <EligibleView config={config} onReset={handleReset} />
          ) : (
            <EligibilityCheckerStep
              key={currentStep.id}
              step={currentStep}
              answers={answers}
              outcome={currentOutcome}
              onChange={handleChange}
              onForward={handleForward}
              onBack={activeStep > 0 ? handleBack : undefined}
            />
          )}
        </Box>
      </StepTransition>
    </Box>
    </Box>
  );
}

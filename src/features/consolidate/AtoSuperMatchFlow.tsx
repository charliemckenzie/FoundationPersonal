'use client';

import { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Alert } from '@/components/Alert';
import { ContentContainer, MOBreadcrumb } from '@/components/MemberOnline';
import { FormProgress } from '@/components/FormProgress';
import { StepTransition } from '@/components/StepTransition';
import { StepperActions } from '@/components/StepperActions';
import { useIdvGate, canSubmitIDV } from '@/components/idv';
import { AtoStep0Identity } from './steps/AtoStep0Identity';
import { AtoStep1Consent } from './steps/AtoStep1Consent';
import { AtoStep2Results } from './steps/AtoStep2Results';
import { AtoStep3Review } from './steps/AtoStep3Review';
import { SubmissionSuccess } from './SubmissionSuccess';
import { useConsolidate } from './ConsolidateContext';
import { buildSubmission } from './utils';
import { MOCK_FOUND_FUNDS } from './mockData';
import type { FoundFund } from './types';

const BASE_STEPS = [
  { id: 'consent', label: 'Consent' },
  { id: 'results', label: 'Find my super' },
  { id: 'review', label: 'Review' },
];

const IDV_STEP = { id: 'identity', label: 'Verify identity' };

export interface AtoSuperMatchFlowProps {
  basePath: string;
}

export function AtoSuperMatchFlow({ basePath }: AtoSuperMatchFlowProps) {
  const router = useRouter();
  const { saveRollover, submission } = useConsolidate();
  const gate = useIdvGate();

  const [activeStep, setActiveStep] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const [consentChecked, setConsentChecked] = useState(false);
  const [funds, setFunds] = useState<FoundFund[]>(
    MOCK_FOUND_FUNDS.map((f) => ({ ...f, selected: false })),
  );
  const [showEmpty, setShowEmpty] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchDone, setSearchDone] = useState(false);
  const [declarationChecked, setDeclarationChecked] = useState(false);

  const steps = useMemo(
    () => (gate.alreadyVerified ? BASE_STEPS : [IDV_STEP, ...BASE_STEPS]),
    [gate.alreadyVerified],
  );

  const currentStepId = steps[activeStep]?.id;

  useEffect(() => {
    if (currentStepId !== 'results' || searchDone) return;
    setSearchLoading(true);
    const timer = setTimeout(() => {
      setSearchLoading(false);
      setSearchDone(true);
      setFunds(
        showEmpty
          ? []
          : MOCK_FOUND_FUNDS.map((f) => ({ ...f, selected: false })),
      );
    }, 1500);
    return () => clearTimeout(timer);
  }, [currentStepId, searchDone, showEmpty]);

  function advance(next: number) {
    setActiveStep(next);
    setError(null);
  }

  function handleToggleEmpty() {
    setShowEmpty((prev) => !prev);
    setSearchDone(false);
    setFunds([]);
  }

  async function handleNext() {
    setError(null);

    if (currentStepId === 'identity') {
      if (!canSubmitIDV(gate.idvState)) {
        setError('Please complete all identity fields before continuing.');
        return;
      }
      const ok = await gate.submit();
      if (!ok) {
        setError(gate.error || 'Identity verification failed. Please check your details and try again.');
        return;
      }
      advance(activeStep + 1);
      return;
    }

    if (currentStepId === 'consent') {
      if (!consentChecked) {
        setError('Please provide consent before continuing.');
        return;
      }
      advance(activeStep + 1);
      return;
    }

    if (currentStepId === 'results') {
      if (!searchDone || searchLoading) {
        setError('Please wait for the search to complete.');
        return;
      }
      if (funds.length === 0) {
        setError('No accounts found. Use the back button or exit to try another method.');
        return;
      }
      if (!funds.some((f) => f.selected)) {
        setError('Please select at least one account to continue.');
        return;
      }
      advance(activeStep + 1);
      return;
    }

    if (currentStepId === 'review') {
      if (!declarationChecked) {
        setError('Please confirm the declaration before submitting.');
        return;
      }
      const selectedFunds = funds.filter((f) => f.selected);
      saveRollover(buildSubmission('ato', selectedFunds));
      return;
    }
  }

  function handleBack() {
    setError(null);
    setActiveStep((prev) => Math.max(0, prev - 1));
  }

  function handleExit() {
    router.push(basePath);
  }

  if (submission) {
    return (
      <ContentContainer size="md">
        <SubmissionSuccess submission={submission} onBackToHub={() => router.push(basePath)} />
      </ContentContainer>
    );
  }

  return (
    <>
      <Box sx={{ px: 3, pt: 2 }}>
        <MOBreadcrumb
          items={[
            { label: 'Consolidate super', href: basePath },
            { label: 'ATO SuperMatch' },
          ]}
          onBack={() => router.push(basePath)}
        />
      </Box>

      <ContentContainer size="md">
        <Stack spacing={4}>
          <div>
            <Typography variant="h2" component="h1" sx={{ mb: 3 }}>
              Find my super (ATO SuperMatch)
            </Typography>
            <FormProgress
              variant="simple"
              value={(activeStep / steps.length) * 100}
              steps={steps}
              activeStep={activeStep}
              showStepIndicator
            />
          </div>

          <StepTransition step={activeStep}>
            {currentStepId === 'identity' && (
              <AtoStep0Identity gate={gate} />
            )}
            {currentStepId === 'consent' && (
              <AtoStep1Consent checked={consentChecked} onChange={setConsentChecked} />
            )}
            {currentStepId === 'results' && (
              <AtoStep2Results
                loading={searchLoading}
                done={searchDone}
                funds={funds}
                onFundsChange={setFunds}
                showEmpty={showEmpty}
                onToggleEmpty={handleToggleEmpty}
              />
            )}
            {currentStepId === 'review' && (
              <AtoStep3Review
                funds={funds.filter((f) => f.selected)}
                declarationChecked={declarationChecked}
                onDeclarationChange={setDeclarationChecked}
                onEdit={() => advance(steps.findIndex((s) => s.id === 'results'))}
                error={error ?? undefined}
              />
            )}
          </StepTransition>

          {error && (
            <Alert severity="error" message={error} />
          )}

          <StepperActions
            step={activeStep + 1}
            isSubmitStep={currentStepId === 'review'}
            onNext={handleNext}
            onBack={handleBack}
            onExit={handleExit}
          />
        </Stack>
      </ContentContainer>
    </>
  );
}

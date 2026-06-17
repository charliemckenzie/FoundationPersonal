'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Alert } from '@/components/Alert';
import { ContentContainer, MOBreadcrumb } from '@/components/MemberOnline';
import { FormProgress } from '@/components/FormProgress';
import { StepTransition } from '@/components/StepTransition';
import { StepperActions } from '@/components/StepperActions';
import { ManualStep0BeforeYouStart } from '../steps/ManualStep0BeforeYouStart';
import { ManualStep1Funds } from '../steps/ManualStep1Funds';
import { ManualStep2Review } from '../steps/ManualStep2Review';
import { SubmissionSuccess } from '../SubmissionSuccess';
import { useConsolidate } from '../ConsolidateContext';
import { buildSubmission } from '../utils';
import type { ExternalFund } from '../types';

const STEPS = [
  { id: 'before-you-start', label: 'Before you start' },
  { id: 'funds', label: 'Fund details' },
  { id: 'review', label: 'Review' },
];

export interface ManualConsolidateFlowProps {
  basePath: string;
}

export function ManualConsolidateFlow({ basePath }: ManualConsolidateFlowProps) {
  const router = useRouter();
  const { saveRollover, submission } = useConsolidate();

  const [activeStep, setActiveStep] = useState(0);

  const [acknowledged, setAcknowledged] = useState(false);
  const [funds, setFunds] = useState<ExternalFund[]>([
    {
      id: `fund-${Date.now()}`,
      fundName: '',
      abn: '',
      usi: '',
      esa: '',
      fundPhone: '',
      memberNumber: '',
      amount: { type: 'full' },
    },
  ]);
  const [declarationChecked, setDeclarationChecked] = useState(false);

  const [error, setError] = useState<string | null>(null);
  const [fundErrors, setFundErrors] = useState<Record<string, Record<string, string>>>({});

  function advance(next: number) {
    setActiveStep(next);
    setError(null);
  }

  function handleNext() {
    if (activeStep === 0) {
      if (!acknowledged) {
        setError('Please acknowledge the information above before continuing.');
        return;
      }
    }

    if (activeStep === 1) {
      const errors: Record<string, Record<string, string>> = {};
      let hasError = false;

      funds.forEach((fund) => {
        const fundErr: Record<string, string> = {};
        if (!fund.fundName.trim()) {
          fundErr.fundName = 'Fund name is required';
          hasError = true;
        }
        if (!fund.memberNumber.trim()) {
          fundErr.memberNumber = 'Member number is required';
          hasError = true;
        }
        if (fund.amount.type === 'partial' && (!fund.amount.amount || fund.amount.amount <= 0)) {
          fundErr.amount = 'Enter a valid amount';
          hasError = true;
        }
        if (Object.keys(fundErr).length > 0) {
          errors[fund.id] = fundErr;
        }
      });

      if (hasError) {
        setFundErrors(errors);
        setError('Please complete all required fields before continuing.');
        return;
      }
      setFundErrors({});
    }

    if (activeStep === 2) {
      if (!declarationChecked) {
        setError('Please confirm the declaration before submitting.');
        return;
      }

      const rollover = buildSubmission('manual', funds);
      saveRollover(rollover);
      return;
    }

    advance(activeStep + 1);
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
            { label: 'Manual transfer' },
          ]}
          onBack={() => router.push(basePath)}
        />
      </Box>

      <ContentContainer size="md">
        <Stack spacing={4}>
          <div>
            <Typography variant="h2" component="h1" sx={{ mb: 3 }}>
              Enter your fund details
            </Typography>
            <FormProgress
              variant="simple"
              value={(activeStep / STEPS.length) * 100}
              steps={STEPS}
              activeStep={activeStep}
              showStepIndicator
            />
          </div>

          <StepTransition step={activeStep}>
            {activeStep === 0 ? (
              <ManualStep0BeforeYouStart
                acknowledged={acknowledged}
                onChange={setAcknowledged}
                error={error ?? undefined}
              />
            ) : activeStep === 1 ? (
              <ManualStep1Funds funds={funds} onChange={setFunds} errors={fundErrors} />
            ) : (
              <ManualStep2Review
                funds={funds}
                declarationChecked={declarationChecked}
                onDeclarationChange={setDeclarationChecked}
                onEdit={() => advance(1)}
                error={error ?? undefined}
              />
            )}
          </StepTransition>

          {error && (
            <Alert severity="error" message={error} />
          )}

          <StepperActions
            step={activeStep + 1}
            totalSteps={STEPS.length}
            isSubmitStep={activeStep === 2}
            onNext={handleNext}
            onBack={handleBack}
            onExit={handleExit}
          />
        </Stack>
      </ContentContainer>
    </>
  );
}

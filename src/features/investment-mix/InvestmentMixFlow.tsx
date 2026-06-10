'use client';

import { useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/navigation';
import { FormProgress } from '../../components/FormProgress';
import { StepperActions } from '../../components/StepperActions';
import { ContentContainer, MOBreadcrumb } from '../../components/MemberOnline';
import { StepTransition } from '../../components/StepTransition';
import { Step1Account } from './steps/Step1Account';
import { Step2ApplyTo } from './steps/Step2ApplyTo';
import { Step3Allocations } from './steps/Step3Allocations';
import { Step4Review } from './steps/Step4Review';
import { SubmissionSuccess } from './SubmissionSuccess';
import { useInvestmentMix } from './InvestmentMixContext';
import { MOCK_ACCOUNTS, MOCK_INVESTMENT_OPTIONS } from './mockData';
import type { ApplyTo, InvestmentMixChange } from './types';
import { validateStep1, validateStep2, validateStep3, buildChange } from './utils';

const STEPS = [
  { id: 'account', label: 'Select account' },
  { id: 'apply-to', label: 'What to change' },
  { id: 'allocations', label: 'Investment options' },
  { id: 'review', label: 'Review and confirm' },
];

interface InvestmentMixFlowProps {
  overviewPath: string;
}

export function InvestmentMixFlow({ overviewPath }: InvestmentMixFlowProps) {
  const router = useRouter();
  const { saveChange } = useInvestmentMix();

  const [activeStep, setActiveStep] = useState(0);
  const [selectedAccountId, setSelectedAccountId] = useState(MOCK_ACCOUNTS[0].id);
  const [applyTo, setApplyTo] = useState<ApplyTo | null>(null);
  const [allocations, setAllocations] = useState<Record<string, number>>({});
  const [showStep3Validation, setShowStep3Validation] = useState(false);
  const [declarationChecked, setDeclarationChecked] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [submittedChange, setSubmittedChange] = useState<InvestmentMixChange | null>(null);

  function advance(next: number) {
    setActiveStep(next);
    setError(null);
  }

  function handleAllocationChange(optionId: string, value: number | null) {
    setAllocations((prev) => {
      if (value === null) {
        const next = { ...prev };
        delete next[optionId];
        return next;
      }
      return { ...prev, [optionId]: value };
    });
  }

  function handleDeclarationChange(checked: boolean) {
    setDeclarationChecked(checked);
    if (error && checked) setError(null);
  }

  function handleNext() {
    if (activeStep === 0) {
      if (!validateStep1(selectedAccountId)) {
        setError('Please select an account to continue.');
        return;
      }
    }

    if (activeStep === 1) {
      if (!validateStep2(applyTo)) {
        setError('Please select an option to continue.');
        return;
      }
    }

    if (activeStep === 2) {
      const { valid } = validateStep3(allocations, MOCK_INVESTMENT_OPTIONS);
      if (!valid) {
        setShowStep3Validation(true);
        return;
      }
    }

    if (activeStep === 3) {
      if (!declarationChecked) {
        setError('Please confirm the declaration before submitting.');
        return;
      }
      // applyTo is guaranteed non-null — validated at step 1
      const change = buildChange(selectedAccountId, MOCK_ACCOUNTS, applyTo!, allocations);
      saveChange(change);
      setSubmittedChange(change);
      setSubmitted(true);
      return;
    }

    advance(activeStep + 1);
  }

  function handleBack() {
    setError(null);
    setActiveStep((prev) => Math.max(0, prev - 1));
  }

  function handleExit() {
    router.push(overviewPath);
  }

  if (submitted && submittedChange) {
    return (
      <ContentContainer size="md">
        <SubmissionSuccess
          change={submittedChange}
          onBackToOverview={() => router.push(overviewPath)}
        />
      </ContentContainer>
    );
  }

  return (
    <>
      <Box sx={{ px: 3, pt: 2 }}>
        <MOBreadcrumb
          items={[
            { label: 'Investments', href: overviewPath },
            { label: 'Change investment mix' },
          ]}
          onBack={() => router.push(overviewPath)}
        />
      </Box>
      <ContentContainer size="md">
        <Stack spacing={4} sx={{ py: 4 }}>
          <div>
            <Typography variant="h3" component="h1" sx={{ mb: 3 }}>
              Change investment mix
            </Typography>
            <FormProgress
              variant="simple"
              value={(activeStep / STEPS.length) * 100}
              steps={STEPS}
              activeStep={activeStep}
              showStepIndicator
              stepMenu
              onStepClick={(i) => advance(i)}
            />
          </div>

          <StepTransition step={activeStep}>
            {activeStep === 0 ? (
              <Step1Account
                accounts={MOCK_ACCOUNTS}
                selectedAccountId={selectedAccountId}
                onChange={setSelectedAccountId}
              />
            ) : activeStep === 1 ? (
              <Step2ApplyTo applyTo={applyTo} onChange={setApplyTo} />
            ) : activeStep === 2 ? (
              <Step3Allocations
                options={MOCK_INVESTMENT_OPTIONS}
                allocations={allocations}
                onChange={handleAllocationChange}
                showValidation={showStep3Validation}
              />
            ) : (
              <Step4Review
                accounts={MOCK_ACCOUNTS}
                selectedAccountId={selectedAccountId}
                applyTo={applyTo!}
                options={MOCK_INVESTMENT_OPTIONS}
                allocations={allocations}
                declarationChecked={declarationChecked}
                onDeclarationChange={handleDeclarationChange}
                onEditAccount={() => advance(0)}
                onEditApplyTo={() => advance(1)}
                onEditAllocations={() => advance(2)}
                error={error}
              />
            )}
          </StepTransition>

          <StepperActions
            step={activeStep + 1}
            isSubmitStep={activeStep === 3}
            nextLabel={activeStep === 3 ? 'Submit request' : 'Next'}
            onNext={handleNext}
            onBack={handleBack}
            onExit={handleExit}
          />
        </Stack>
      </ContentContainer>
    </>
  );
}

'use client';

import { useState, useMemo } from 'react';
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
import { Step4PaymentPreference } from './steps/Step4PaymentPreference';
import { Step4Review } from './steps/Step4Review';
import { SubmissionSuccess } from './SubmissionSuccess';
import { useInvestmentMix } from './InvestmentMixContext';
import { MOCK_ACCOUNTS, MOCK_INVESTMENT_OPTIONS } from './mockData';
import type { ApplyTo, InvestmentMixChange, PaymentPreference } from './types';
import { applyToIncludesPayments } from './types';
import { validateStep1, validateStep2, validateStep3, validatePaymentPreference, buildChange } from './utils';

const BASE_STEPS = [
  { id: 'account', label: 'Select account' },
  { id: 'apply-to', label: 'What to change' },
  { id: 'allocations', label: 'Investment options' },
  { id: 'review', label: 'Review and confirm' },
];

const STEPS_WITH_PAYMENT = [
  { id: 'account', label: 'Select account' },
  { id: 'apply-to', label: 'What to change' },
  { id: 'allocations', label: 'Investment options' },
  { id: 'payment', label: 'Future payments' },
  { id: 'review', label: 'Review and confirm' },
];

interface InvestmentMixFlowProps {
  overviewPath: string;
  /** Brand name shown in the payment preference step, e.g. "ART" or "QSuper". */
  brandName?: string;
}

export function InvestmentMixFlow({ overviewPath, brandName = 'ART' }: InvestmentMixFlowProps) {
  const router = useRouter();
  const { saveChange } = useInvestmentMix();

  const [activeStep, setActiveStep] = useState(0);
  const [selectedAccountId, setSelectedAccountId] = useState(MOCK_ACCOUNTS[0].id);
  const [applyTo, setApplyTo] = useState<ApplyTo | null>(null);
  const [allocations, setAllocations] = useState<Record<string, number>>({});
  const [paymentPreference, setPaymentPreference] = useState<PaymentPreference | null>(null);
  const [showStep3Validation, setShowStep3Validation] = useState(false);
  const [showPaymentValidation, setShowPaymentValidation] = useState(false);
  const [declarationChecked, setDeclarationChecked] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [submittedChange, setSubmittedChange] = useState<InvestmentMixChange | null>(null);

  const selectedAccount = useMemo(
    () => MOCK_ACCOUNTS.find((a) => a.id === selectedAccountId),
    [selectedAccountId],
  );

  const isIncomeAccount = selectedAccount?.isIncomeAccount ?? false;

  const showPaymentStep =
    isIncomeAccount && applyTo !== null && applyToIncludesPayments(applyTo);

  const steps = showPaymentStep ? STEPS_WITH_PAYMENT : BASE_STEPS;
  const reviewStepIndex = steps.length - 1;

  const allocatedOptions = useMemo(
    () => MOCK_INVESTMENT_OPTIONS.filter((o) => (allocations[o.id] ?? 0) > 0),
    [allocations],
  );

  function advance(next: number) {
    setActiveStep(next);
    setError(null);
  }

  function handleAccountChange(id: string) {
    setSelectedAccountId(id);
    // Reset downstream state when account changes
    setApplyTo(null);
    setPaymentPreference(null);
    setActiveStep(0);
  }

  function handleApplyToChange(value: ApplyTo) {
    setApplyTo(value);
    // If payment step is no longer applicable, clear preference
    if (!applyToIncludesPayments(value)) {
      setPaymentPreference(null);
    }
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

    if (showPaymentStep && activeStep === 3) {
      if (!validatePaymentPreference(paymentPreference, allocatedOptions)) {
        setShowPaymentValidation(true);
        return;
      }
    }

    if (activeStep === reviewStepIndex) {
      if (!declarationChecked) {
        setError('Please confirm the declaration before submitting.');
        return;
      }
      const change = buildChange(
        selectedAccountId,
        MOCK_ACCOUNTS,
        applyTo!,
        allocations,
        showPaymentStep ? (paymentPreference ?? undefined) : undefined,
      );
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
          brandName={brandName}
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
              value={(activeStep / steps.length) * 100}
              steps={steps}
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
                onChange={handleAccountChange}
              />
            ) : activeStep === 1 ? (
              <Step2ApplyTo
                applyTo={applyTo}
                isIncomeAccount={isIncomeAccount}
                onChange={handleApplyToChange}
              />
            ) : activeStep === 2 ? (
              <Step3Allocations
                options={MOCK_INVESTMENT_OPTIONS}
                allocations={allocations}
                onChange={handleAllocationChange}
                showValidation={showStep3Validation}
              />
            ) : showPaymentStep && activeStep === 3 ? (
              <Step4PaymentPreference
                allocatedOptions={allocatedOptions}
                preference={paymentPreference}
                onChange={setPaymentPreference}
                showValidation={showPaymentValidation}
                brandName={brandName}
              />
            ) : (
              <Step4Review
                accounts={MOCK_ACCOUNTS}
                selectedAccountId={selectedAccountId}
                applyTo={applyTo!}
                options={MOCK_INVESTMENT_OPTIONS}
                allocations={allocations}
                paymentPreference={showPaymentStep ? paymentPreference : null}
                declarationChecked={declarationChecked}
                onDeclarationChange={handleDeclarationChange}
                onEditAccount={() => advance(0)}
                onEditApplyTo={() => advance(1)}
                onEditAllocations={() => advance(2)}
                onEditPaymentPreference={showPaymentStep ? () => advance(3) : undefined}
                error={error}
              />
            )}
          </StepTransition>

          <StepperActions
            step={activeStep + 1}
            isSubmitStep={activeStep === reviewStepIndex}
            nextLabel={activeStep === reviewStepIndex ? 'Submit request' : 'Next'}
            onNext={handleNext}
            onBack={handleBack}
            onExit={handleExit}
          />
        </Stack>
      </ContentContainer>
    </>
  );
}

'use client';

import { useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/navigation';
import { FormProgress } from '../../components/FormProgress';
import { StepperActions } from '../../components/StepperActions';
import { ContentContainer, MOBreadcrumb } from '../../components/MemberOnline';
import { Step1Beneficiaries } from './steps/Step1Beneficiaries';
import { Step2Expiry } from './steps/Step2Expiry';
import { Step3Review } from './steps/Step3Review';
import { SubmissionSuccess } from './SubmissionSuccess';
import { useBeneficiaries } from './BeneficiariesContext';
import type { BeneficiaryDraft, ExpiryOption } from './types';
import { StepTransition } from '../../components/StepTransition';
import { validateStep1, buildNomination, createDraft } from './utils';
import type { Step1Validation } from './utils';

const STEPS = [
  { id: 'beneficiaries' },
  { id: 'expiry' },
  { id: 'review' },
];

interface NominationFlowProps {
  overviewPath: string;
}

export function NominationFlow({ overviewPath }: NominationFlowProps) {
  const router = useRouter();
  const { saveNomination } = useBeneficiaries();

  const [activeStep, setActiveStep] = useState(0);
  const [maxStep, setMaxStep] = useState(0);
  const [beneficiaries, setBeneficiaries] = useState<BeneficiaryDraft[]>([createDraft()]);
  const [expandedId, setExpandedId] = useState(beneficiaries[0]?.id ?? '');
  const collapseOnEnteredRef = useRef(false);
  const [expiry, setExpiry] = useState<ExpiryOption>('none');
  const [declarationChecked, setDeclarationChecked] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [step1Validation, setStep1Validation] = useState<Step1Validation | null>(null);
  const [submitted, setSubmitted] = useState(false);

  function advance(next: number) {
    setActiveStep(next);
    setMaxStep((prev) => Math.max(prev, next));
    setError(null);
  }

  function handleBeneficiariesChange(updated: BeneficiaryDraft[]) {
    setBeneficiaries(updated);
    if (step1Validation) setStep1Validation(validateStep1(updated));
  }

  function handleDeclarationChange(checked: boolean) {
    setDeclarationChecked(checked);
    if (error && checked) setError(null);
  }

  function handleNext() {
    if (activeStep === 0) {
      const validation = validateStep1(beneficiaries);
      if (validation.hasErrors) {
        setStep1Validation(validation);
        if (validation.firstInvalidId) setExpandedId(validation.firstInvalidId);
        return;
      }
      setStep1Validation(null);
      if (beneficiaries.length > 1) collapseOnEnteredRef.current = true;
    }
    if (activeStep === 2) {
      if (!declarationChecked) { setError('Please confirm the declaration before submitting.'); return; }
      const nomination = buildNomination(beneficiaries, expiry);
      saveNomination(nomination);
      setSubmitted(true);
      return;
    }
    advance(activeStep + 1);
  }

  function handleBack() {
    setError(null);
    setActiveStep((prev) => Math.max(0, prev - 1));
  }

  function handleStepEntered() {
    if (collapseOnEnteredRef.current) {
      collapseOnEnteredRef.current = false;
      setExpandedId('');
    }
  }

  function handleExit() {
    router.push(overviewPath);
  }

  if (submitted) {
    return (
      <ContentContainer size="md">
        <SubmissionSuccess onBackToOverview={() => router.push(overviewPath)} />
      </ContentContainer>
    );
  }

  return (
    <>
      <Box sx={{ px: 3, pt: 2 }}>
        <MOBreadcrumb
          items={[
            { label: 'Beneficiaries', href: overviewPath },
            { label: 'New binding nomination' },
          ]}
          onBack={() => router.push(overviewPath)}
        />
      </Box>
      <ContentContainer size="md">
        <Stack spacing={4}>
          <div>
            <Typography variant="h2" component="h1" sx={{ mb: 3 }}>New binding nomination</Typography>
            <FormProgress
              variant="responsive"
              steps={STEPS}
              activeStep={activeStep}
              maxStep={maxStep}
            />
          </div>

          <StepTransition step={activeStep} onEntered={handleStepEntered}>
            {activeStep === 0 ? (
              <Step1Beneficiaries beneficiaries={beneficiaries} onChange={handleBeneficiariesChange} validation={step1Validation} expandedId={expandedId} onExpandedChange={setExpandedId} />
            ) : activeStep === 1 ? (
              <Step2Expiry expiry={expiry} onChange={setExpiry} />
            ) : (
              <Step3Review
                beneficiaries={beneficiaries}
                expiry={expiry}
                declarationChecked={declarationChecked}
                onDeclarationChange={handleDeclarationChange}
                onEditBeneficiaries={() => advance(0)}
                onEditExpiry={() => advance(1)}
                error={error}
              />
            )}
          </StepTransition>

          <StepperActions
            step={activeStep + 1}
            isSubmitStep={activeStep === 2}
            nextLabel={activeStep === 2 ? 'Submit nomination' : 'Next'}
            onNext={handleNext}
            onBack={handleBack}
            onExit={handleExit}
          />
        </Stack>
      </ContentContainer>
    </>
  );
}

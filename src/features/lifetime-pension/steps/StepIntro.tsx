'use client';

import { useState } from 'react';
import Divider from '@mui/material/Divider';
import MuiLink from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Checkbox } from '../../../components/Checkbox';
import { IconList } from '../../../components/IconList';
import { EligibilityChecker, lifetimePensionConfig } from '@/features/eligibility-checker';
import type { Answers } from '@/features/eligibility-checker';

interface StepIntroProps {
  onEligible?: (answers: Answers) => void;
  onEligibilityReset?: () => void;
  defaultEligible?: boolean;
  defaultAnswers?: Answers;
  declarationPermanent: boolean;
  onDeclarationPermanentChange: (checked: boolean) => void;
  declarationRead: boolean;
  onDeclarationReadChange: (checked: boolean) => void;
  declarationTaxDeduction: boolean;
  onDeclarationTaxDeductionChange: (checked: boolean) => void;
  showValidation: boolean;
}

export function StepIntro({ onEligible, onEligibilityReset, defaultEligible = false, defaultAnswers, declarationPermanent, onDeclarationPermanentChange, declarationRead, onDeclarationReadChange, declarationTaxDeduction, onDeclarationTaxDeductionChange, showValidation }: StepIntroProps) {
  const [eligible, setEligible] = useState(defaultEligible);
  const [eligibilityAnswers, setEligibilityAnswers] = useState<Answers | undefined>(defaultAnswers);

  function handleEligible(answers: Answers) {
    setEligibilityAnswers(answers);
    setEligible(true);
    onEligible?.(answers);
  }

  const hasTaxDeductionWarning = eligible && eligibilityAnswers
    ? lifetimePensionConfig.steps[1].getOutcome(eligibilityAnswers) === 'warning'
    : false;

  return (
    <Stack spacing={4}>
      <Typography variant="body" sx={{ color: 'text.primary' }}>
        A Lifetime Pension gives you guaranteed, tax-free income paid fortnightly for life. Your
        contribution joins a shared investment pool, giving you certainty no matter how long you live.
      </Typography>

      <EligibilityChecker
        config={lifetimePensionConfig}
        defaultEligible={defaultEligible}
        defaultAnswers={defaultAnswers}
        onEligible={handleEligible}
        onReset={onEligibilityReset}
      />

      {eligible && (
        <Stack spacing={4}>
          <Stack spacing={2}>
            <div>
              <Typography variant="h5" sx={{ mb: 0.5 }}>
                Before you start
              </Typography>
              <Typography variant="body">
                Use this form to open a Lifetime Pension account. Here&rsquo;s what to expect.
              </Typography>
            </div>

            <IconList
              items={[
                { text: 'It takes about 10 minutes to complete' },
                { text: 'Have your driver\'s licence, Medicare card or passport handy as you may need to confirm your identity to process your application' },
                { text: 'Your payments will start from the next business day after processing' },
                { text: <>You have read and understood the <MuiLink href="#" sx={{ color: 'primary.main' }}>Super Savings Product Disclosure Statement for Income Account and Lifetime Pension (PDS)</MuiLink></> },
              ]}
            />
          </Stack>

          <Divider sx={{ borderColor: 'border.subtle' }} />

          {/* Declarations */}
          <Stack spacing={2}>
            <Typography variant="h6">Please confirm</Typography>
            <Checkbox
              variant="default"
              checked={declarationPermanent}
              onChange={onDeclarationPermanentChange}
              error={showValidation && !declarationPermanent}
              errorMessage={
                showValidation && !declarationPermanent
                  ? 'Please confirm you understand the permanent purchase terms.'
                  : undefined
              }
              label="I understand that after the 6-month cooling-off period my purchase is permanent, and I will not be able to withdraw these funds, except in the case of a terminal medical condition if money-back protection is payable."
            />
            <Checkbox
              variant="default"
              checked={declarationRead}
              onChange={onDeclarationReadChange}
              error={showValidation && !declarationRead}
              errorMessage={
                showValidation && !declarationRead
                  ? 'Please confirm you have read and understood the information above.'
                  : undefined
              }
              label="I have read and understood the information above and am ready to set up my Lifetime Pension account."
            />
            {hasTaxDeductionWarning && (
              <Checkbox
                variant="default"
                checked={declarationTaxDeduction}
                onChange={onDeclarationTaxDeductionChange}
                error={showValidation && !declarationTaxDeduction}
                errorMessage={
                  showValidation && !declarationTaxDeduction
                    ? 'Please confirm you understand the tax deduction requirement before proceeding.'
                    : undefined
                }
                label="I understand that by proceeding with a pending tax deduction claim, I must submit and receive confirmation of my Notice of Intent to claim a tax deduction before ART can process it. Failure to do so may affect my ability to claim the deduction."
              />
            )}
          </Stack>
        </Stack>
      )}
    </Stack>
  );
}

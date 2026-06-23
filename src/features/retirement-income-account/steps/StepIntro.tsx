'use client';

import { useState } from 'react';
import Divider from '@mui/material/Divider';
import MuiLink from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Checkbox } from '../../../components/Checkbox';
import { Dialog } from '../../../components/Dialog';
import { IconList } from '../../../components/IconList';
import { EligibilityChecker, retirementIncomeAccountConfig } from '@/features/eligibility-checker';
import type { Answers } from '@/features/eligibility-checker';

interface StepIntroProps {
  onEligible?: (answers: Answers) => void;
  onEligibilityReset?: () => void;
  defaultEligible?: boolean;
  defaultAnswers?: Answers;
  declarationRead: boolean;
  onDeclarationReadChange: (checked: boolean) => void;
  showValidation: boolean;
}

export function StepIntro({
  onEligible,
  onEligibilityReset,
  defaultEligible = false,
  defaultAnswers,
  declarationRead,
  onDeclarationReadChange,
  showValidation,
}: StepIntroProps) {
  const [eligible, setEligible] = useState(defaultEligible);
  const [insuranceDialogOpen, setInsuranceDialogOpen] = useState(false);

  function handleEligible(answers: Answers) {
    setEligible(true);
    onEligible?.(answers);
  }

  return (
    <Stack spacing={4}>
      <Typography variant="body" sx={{ color: 'text.primary' }}>
        A Retirement Income account allows you to receive regular tax-free income from your super
        during retirement.
      </Typography>

      <EligibilityChecker
        config={retirementIncomeAccountConfig}
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
                Use this form to open a Retirement Income account. Here&rsquo;s what to expect.
              </Typography>
            </div>

            <IconList
              items={[
                { text: 'It takes about 15 minutes to complete' },
                { text: "Have your driver's licence, Medicare card or passport handy as you may need to confirm your identity to process your application" },
                { text: <>
                  Understand how opening this account may affect your{' '}
                  <MuiLink component="button" onClick={() => setInsuranceDialogOpen(true)} sx={{ color: 'primary.main', cursor: 'pointer', verticalAlign: 'baseline' }}>insurance cover</MuiLink>.
                </> },
                { text: 'Your payments will start from the next business day after processing' },
                { text: <>You have read and understood the <MuiLink href="#" sx={{ color: 'primary.main' }}>Super Savings Product Disclosure Statement for Income Account and Retirement Income Account (PDS)</MuiLink></> },
              ]}
            />
          </Stack>

          <Divider sx={{ borderColor: 'border.subtle' }} />

          <Stack spacing={2}>
            <Typography variant="h6">Please confirm</Typography>
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
              label="I have read and understood the information above and am ready to set up my Retirement Income account."
            />
          </Stack>
        </Stack>
      )}
      <Dialog
        open={insuranceDialogOpen}
        onClose={() => setInsuranceDialogOpen(false)}
        title="Insurance cover and your accumulation account"
        size="medium"
        cancelLabel="Close"
      >
        <Stack spacing={2} sx={{ pt: 1 }}>
          <Typography variant="body">
            If you have insurance cover on your accumulation account, you need to leave at least{' '}
            <strong>$10,000</strong> in that account to keep your cover active.
          </Typography>
          <Typography variant="body">
            Transferring your full balance will reduce your accumulation account to $0, which will
            close that account and cancel any insurance cover attached to it.
          </Typography>
        </Stack>
      </Dialog>
    </Stack>
  );
}

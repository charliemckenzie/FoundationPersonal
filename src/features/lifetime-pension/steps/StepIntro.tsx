'use client';

import { useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import MuiLink from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { Checkbox } from '../../../components/Checkbox';
import { Icon } from '../../../components/Icon';
import { IconList } from '../../../components/IconList';
import { EligibilityChecker, lifetimePensionConfig } from '@/features/eligibility-checker';

interface StepIntroProps {
  onEligible?: () => void;
  declarationPermanent: boolean;
  onDeclarationPermanentChange: (checked: boolean) => void;
  showValidation: boolean;
}

export function StepIntro({ onEligible, declarationPermanent, onDeclarationPermanentChange, showValidation }: StepIntroProps) {
  const [eligible, setEligible] = useState(false);

  function handleEligible() {
    setEligible(true);
    onEligible?.();
  }

  return (
    <Stack spacing={3}>
      <Typography variant="body" sx={{ color: 'text.primary' }}>
        A Lifetime Pension gives you guaranteed, tax-free income paid fortnightly for life. Your
        contribution joins a shared investment pool, giving you certainty no matter how long you live.
      </Typography>

      <Box sx={{ mt: 5 }}>
        <EligibilityChecker config={lifetimePensionConfig} onEligible={handleEligible} />
      </Box>

      {eligible && (
        <>
          <Typography variant="h5">
            Before you start
          </Typography>

          <Stack spacing={1}>
            <IconList
              items={[
                { text: 'It takes about 10 minutes to complete' },
                { text: 'Have your drivers license, Medicare card or Passport handy as you may need to confirm your identity to process your application' },
                { text: 'Your payments will start from the next business day after processing' },
              ]}
            />
            {/* PDS item with inline link — matches IconList layout */}
            <Box
              component="li"
              sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5, listStyle: 'none' }}
            >
              <Box
                sx={(t) => ({
                  width: t.spacing(2.5),
                  height: `calc(${t.typography.body.fontSize} * ${t.typography.body.lineHeight})`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                })}
              >
                <Icon icon="circle-check" size="lg" color="primary" />
              </Box>
              <Typography variant="body">
                You have read and understood the{' '}
                <MuiLink href="#">
                  Super Savings Product Disclosure Statement for Income Account and Lifetime Pension (PDS)
                </MuiLink>
              </Typography>
            </Box>
          </Stack>

          {/* Designed to be a lifelong commitment */}
          <Stack spacing={2}>
            <Typography variant="h6" component="h3">Designed to be a lifelong commitment</Typography>
            <Checkbox
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
          </Stack>

          <Typography variant="small" sx={{ color: 'text.muted' }}>
            By continuing I acknowledge that I have reviewed the information above and am ready to set up my Lifetime Pension account.
          </Typography>
        </>
      )}
    </Stack>
  );
}

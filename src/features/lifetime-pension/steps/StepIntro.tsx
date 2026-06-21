'use client';

import { useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import MuiLink from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { Icon } from '../../../components/Icon';
import { IconList } from '../../../components/IconList';
import { EligibilityChecker, lifetimePensionConfig } from '@/features/eligibility-checker';

interface StepIntroProps {
  onEligible?: () => void;
}

export function StepIntro({ onEligible }: StepIntroProps) {
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

          <Typography variant="small" sx={{ color: 'text.muted' }}>
            By continuing I acknowledge that I have reviewed the information above and am ready to set up my Lifetime Pension account.
          </Typography>
        </>
      )}
    </Stack>
  );
}

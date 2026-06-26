'use client';

import { useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Checkbox } from '../../../components/Checkbox';
import { StepperActions } from '../../../components/StepperActions';

interface StepDisclaimerProps {
  accepted: boolean;
  onAcceptedChange: (checked: boolean) => void;
  onBack: () => void;
  onExit: () => void;
  onStart: () => void;
}

export function StepDisclaimer({
  accepted,
  onAcceptedChange,
  onBack,
  onExit,
  onStart,
}: StepDisclaimerProps) {
  const [showError, setShowError] = useState(false);

  function handleStart() {
    if (!accepted) {
      setShowError(true);
      return;
    }
    onStart();
  }

  return (
    <Box>
      <Stack spacing={3}>
          <Typography variant="h3" component="h1">
            Before you begin
          </Typography>
          <Typography variant="body" color="text.muted" sx={{ lineHeight: 1.75 }}>
            It&rsquo;s important to understand the nature of this tool before you start. Please review the information below.
          </Typography>

          <Box
            sx={{
              border: '1px solid',
              borderColor: 'border.default',
              borderRadius: '0.75rem',
              p: 3,
            }}
          >
            <Typography variant="h6" sx={{ mb: 1.5 }}>
              About this calculator
            </Typography>
            <Typography variant="body" color="text.muted" sx={{ mb: 2 }}>
              This tool provides general information only. It is not personal financial advice. The calculator:
            </Typography>
            <Box component="ul" sx={{ pl: 2.5, mb: 2 }}>
              <Typography component="li" variant="body" color="text.muted">
                Does not take into account your full financial situation, objectives, or needs
              </Typography>
              <Typography component="li" variant="body" color="text.muted">
                Uses the 2025–26 contribution caps and tax rates, which may change
              </Typography>
              <Typography component="li" variant="body" color="text.muted">
                Assumes a single employer and standard SG arrangements
              </Typography>
              <Typography component="li" variant="body" color="text.muted">
                Does not constitute a recommendation to change your contributions
              </Typography>
            </Box>

            <Typography variant="body" color="text.muted" sx={{ mb: 2 }}>
              Results are estimates only. Actual outcomes may differ based on:
            </Typography>
            <Box component="ul" sx={{ pl: 2.5, mb: 2 }}>
              <Typography component="li" variant="body" color="text.muted">
                Changes to tax legislation or contribution caps
              </Typography>
              <Typography component="li" variant="body" color="text.muted">
                Investment market performance
              </Typography>
              <Typography component="li" variant="body" color="text.muted">
                Changes to your personal circumstances
              </Typography>
            </Box>

            <Typography variant="body" color="text.muted">
              For personalised advice about your super contributions, consider speaking with a{' '}
              <Typography component="a" href="#" variant="body" color="primary.main" sx={{ textDecoration: 'underline' }}>
                financial adviser
              </Typography>
              .
            </Typography>

            <Typography variant="body" color="text.muted" sx={{ mt: 2 }}>
              If you feel this tool may not suit your needs, select Exit.
            </Typography>
          </Box>

          <Checkbox
            label="Please confirm you've read the information above"
            checked={accepted}
            error={showError && !accepted}
            errorMessage={showError && !accepted ? 'Confirm you have read the information above to continue.' : undefined}
            onChange={(checked) => {
              onAcceptedChange(checked);
              if (checked) setShowError(false);
            }}
          />

          <StepperActions
            step={2}
            nextLabel="Start"
            cancelLabel="Exit"
            exitDialogTitle="Exit the calculator?"
            exitDialogDescription="You can come back and start the calculator again at any time."
            exitDialogConfirmLabel="Exit"
            onBack={onBack}
            onNext={handleStart}
            onExit={onExit}
          />
      </Stack>
    </Box>
  );
}

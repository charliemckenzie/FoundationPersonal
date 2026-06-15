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
            It&rsquo;s important to determine if this service is appropriate for you. Before you start, please review the information below.
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
              About our advice
            </Typography>
            <Typography variant="body" color="text.muted" sx={{ mb: 2 }}>
              Our advice is limited to your ART accounts only. It doesn&rsquo;t include advice on:
            </Typography>
            <Box component="ul" sx={{ pl: 2.5, mb: 2 }}>
              <Typography component="li" variant="body" color="text.muted">
                Certain accounts you may have with ART (e.g. QSuper accounts, defined benefit accounts, lifetime pension accounts)
              </Typography>
              <Typography component="li" variant="body" color="text.muted">
                Other super you may have
              </Typography>
              <Typography component="li" variant="body" color="text.muted">
                Non-super investments you may have (e.g. managed funds or shares)
              </Typography>
              <Typography component="li" variant="body" color="text.muted">
                Your other financial commitments (e.g. debts).
              </Typography>
            </Box>

            <Typography variant="body" color="text.muted" sx={{ mb: 2 }}>
              Our investment advice doesn&rsquo;t consider the following ART investment options:
            </Typography>
            <Box component="ul" sx={{ pl: 2.5, mb: 2 }}>
              <Typography component="li" variant="body" color="text.muted">
                Balanced Risk-Adjusted option
              </Typography>
              <Typography component="li" variant="body" color="text.muted">
                Diversified Index options (e.g. Balanced Index)
              </Typography>
              <Typography component="li" variant="body" color="text.muted">
                Single Asset class options (excluding Cash option).
              </Typography>
            </Box>

            <Typography variant="body" color="text.muted">
              For more details about our advice services, see our{' '}
              <Typography component="a" href="#" variant="body" color="primary.main" sx={{ textDecoration: 'underline' }}>
                Financial Services Guide (FSG)
              </Typography>
              .
            </Typography>

            <Typography variant="body" color="text.muted" sx={{ mt: 2 }}>
              If you feel online advice may not suit your needs, select Exit.
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
            exitDialogTitle="Exit the projection?"
            exitDialogDescription="You can come back and start the projection again at any time."
            exitDialogConfirmLabel="Exit"
            onBack={onBack}
            onNext={handleStart}
            onExit={onExit}
          />
      </Stack>
    </Box>
  );
}

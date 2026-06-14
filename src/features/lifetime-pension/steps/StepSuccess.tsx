import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { Alert } from '../../../components/Alert';
import { Button } from '../../../components/Button';
import { Icon } from '../../../components/Icon';
import { Modal } from '../../../components/Modal';
import { TextButton } from '../../../components/TextButton';
import type { IDVState } from '../types';
import { StepIDV } from './StepIDV';

export interface StepSuccessProps {
  onReturnDashboard: () => void;
  idvState: IDVState;
  onIdvChange: (next: IDVState) => void;
  idvLoading: boolean;
  idvError: string;
  /** Returns true on success */
  onIdvSubmit: () => Promise<boolean>;
  idvAlreadyVerified: boolean;
}

interface ConfirmItemProps {
  children: React.ReactNode;
}

function ConfirmItem({ children }: ConfirmItemProps) {
  return (
    <Stack direction="row" sx={{ gap: 1.5, alignItems: 'flex-start' }}>
      <Box sx={{ flexShrink: 0, mt: '2px' }}>
        <Icon icon="circle-check" size="md" color="primary" />
      </Box>
      <Typography variant="body" sx={{ color: 'text.primary' }}>{children}</Typography>
    </Stack>
  );
}

export function StepSuccess({
  onReturnDashboard,
  idvState,
  onIdvChange,
  idvLoading,
  idvError,
  onIdvSubmit,
  idvAlreadyVerified,
}: StepSuccessProps) {
  const [idvModalOpen, setIdvModalOpen] = useState(false);
  const [idvVerified, setIdvVerified] = useState(idvAlreadyVerified);

  const verified = idvVerified;

  async function handleIdvSubmit() {
    const success = await onIdvSubmit();
    if (success) {
      setIdvVerified(true);
      setIdvModalOpen(false);
    }
  }

  return (
    <Stack spacing={4} sx={{ alignItems: 'center', textAlign: 'center' }}>

      {/* Status icon */}
      <Box
        sx={{
          width: '5rem',
          height: '5rem',
          borderRadius: '50%',
          border: '2px solid',
          borderColor: verified ? 'success.main' : 'warning.main',
          bgcolor: verified ? 'success.50' : 'warning.50',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Icon
          icon={verified ? 'check' : 'triangle-exclamation'}
          size="2xl"
          color={verified ? 'success' : 'warning'}
        />
      </Box>

      <Typography
        component="h1"
        variant="h4"
        sx={{
          color: 'text.heading',
          fontFamily: (t) => t.typography.fontFamily,
          maxWidth: '32rem',
        }}
      >
        {verified
          ? 'Your application is complete.'
          : 'Your application has been received — one more step to go.'}
      </Typography>

      {/* Confirmation card */}
      <Box
        sx={{
          width: '100%',
          maxWidth: '36rem',
          border: '1px solid',
          borderColor: 'border.default',
          borderRadius: (t) => `${t.shape.lg}px`,
          backgroundColor: 'background.paper',
          p: 4,
          textAlign: 'left',
        }}
      >
        <Stack spacing={3}>
          <Typography variant="h5">Application details</Typography>

          <Stack spacing={2}>
            <ConfirmItem>
              Your reference number is{' '}
              <Box component="a" href="#" sx={{ color: 'primary.main', textDecoration: 'none' }}>
                QS20930331M
              </Box>
            </ConfirmItem>
            <ConfirmItem>
              Submitted on 15/07/2025 at 4:01 PM AEST
            </ConfirmItem>
            <ConfirmItem>
              A confirmation has been sent to{' '}
              <Box component="span" sx={{ fontWeight: 700 }}>yourname@gmail.com</Box>
            </ConfirmItem>
          </Stack>

          {/* Pending IDV notice */}
          {!verified && (
            <Box
              sx={{
                borderRadius: (t) => `${t.shape.md}px`,
                p: 2.5,
                backgroundColor: 'action.hover',
              }}
            >
              <Stack spacing={1.5}>
                <Typography variant="h6" sx={{ color: 'text.heading' }}>
                  Identity verification required
                </Typography>
                <Typography variant="body" sx={{ color: 'text.primary' }}>
                  To fully process your Lifetime Pension account, we need to verify your
                  identity. This is a quick process — you&apos;ll need one of the following:
                  an Australian drivers licence, Medicare card, or passport.
                </Typography>
                <Typography variant="small" sx={{ color: 'text.secondary' }}>
                  Until your identity is verified, your application cannot be fully processed.
                  You can complete this now or return later from your dashboard.
                </Typography>
                <Box sx={{ pt: 0.5 }}>
                  <Button
                    label="Verify your identity"
                    onClick={() => setIdvModalOpen(true)}
                  />
                </Box>
              </Stack>
            </Box>
          )}

          {/* What happens next — only shown when fully verified */}
          {verified && (
            <Box
              sx={{
                backgroundColor: 'action.hover',
                borderRadius: (t) => `${t.shape.md}px`,
                p: 2.5,
              }}
            >
              <Typography variant="h5" sx={{ mb: 1 }}>What happens next?</Typography>
              <Typography variant="body" sx={{ color: 'text.primary' }}>
                Your Lifetime Pension account will be set up within 10 business days. We&apos;ll email you once it&apos;s ready and your first payment will begin on your selected start date.
              </Typography>
            </Box>
          )}

          <Stack spacing={1.5}>
            <Button
              variant={verified ? 'contained' : 'outlined'}
              label="Return to dashboard"
              fullWidth
              onClick={onReturnDashboard}
            />
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <TextButton label="Download application" startIcon="arrow-down-to-line" iconDirection="left" />
            </Box>
          </Stack>
        </Stack>
      </Box>

      {/* IDV modal */}
      <Modal
        open={idvModalOpen}
        onClose={() => setIdvModalOpen(false)}
        title="Verify your identity"
        size="medium"
      >
        <StepIDV
          state={idvState}
          onChange={onIdvChange}
          loading={idvLoading}
          error={idvError}
          onSubmit={handleIdvSubmit}
          embedded
        />
      </Modal>

    </Stack>
  );
}

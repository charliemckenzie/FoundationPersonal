import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Button } from '../../../components/Button';
import { Icon } from '../../../components/Icon';
import { TextButton } from '../../../components/TextButton';
import type { UseIdvGate } from '../../../features/idv';
import type { OtherIdMethod } from '../../../features/idv';

export interface StepSuccessProps {
  onReturnDashboard: () => void;
  gate: UseIdvGate;
  verifyMethod: 'online' | 'other';
  otherIdMethod: OtherIdMethod;
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

export function StepSuccess({ onReturnDashboard, gate, verifyMethod, otherIdMethod }: StepSuccessProps) {
  // For the 'other' path, the electronic IDV check is irrelevant — treat as pending.
  const verified = verifyMethod === 'online' && gate.alreadyVerified;

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
              {verifyMethod === 'other' ? (
                <Stack spacing={1.5}>
                  {otherIdMethod === 'later' ? (
                    <>
                      <Typography variant="h6" sx={{ color: 'text.heading' }}>
                        Identity documents still required
                      </Typography>
                      <Typography variant="body" sx={{ color: 'text.primary' }}>
                        Upload your identity documents via <strong>Upload files</strong> in Member Online. We&apos;ll send you email reminders. Your application can&apos;t be processed until we receive them.
                      </Typography>
                    </>
                  ) : (
                    <>
                      <Typography variant="h6" sx={{ color: 'text.heading' }}>
                        Identity documents received
                      </Typography>
                      <Typography variant="body" sx={{ color: 'text.primary' }}>
                        We&apos;ve received your identity documents and will review them. No further action is needed from you right now.
                      </Typography>
                    </>
                  )}
                </Stack>
              ) : (
                <Stack spacing={1.5}>
                  <Typography variant="h6" sx={{ color: 'text.heading' }}>
                    Identity verification required
                  </Typography>
                  <Typography variant="body" sx={{ color: 'text.primary' }}>
                    To fully process your Lifetime Pension account, we need to verify your
                    identity. This is a quick process &mdash; you&apos;ll need one of the following:
                    an Australian drivers licence, Medicare card, or passport.
                  </Typography>
                  <Typography variant="small" sx={{ color: 'text.secondary' }}>
                    Until your identity is verified, your application cannot be fully processed.
                    You can complete this now or return later from your dashboard.
                  </Typography>
                </Stack>
              )}
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

    </Stack>
  );
}

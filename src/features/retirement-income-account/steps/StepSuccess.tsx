import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Button } from '../../../components/Button';
import { Icon } from '../../../components/Icon';
import { TextButton } from '../../../components/TextButton';

export interface StepSuccessProps {
  onReturnDashboard: () => void;
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

export function StepSuccess({ onReturnDashboard }: StepSuccessProps) {
  return (
    <Stack spacing={4} sx={{ alignItems: 'center', textAlign: 'center' }}>

      {/* Status icon */}
      <Box
        sx={{
          width: '5rem',
          height: '5rem',
          borderRadius: '50%',
          border: '2px solid',
          borderColor: 'success.main',
          bgcolor: 'success.50',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Icon
          icon="check"
          size="2xl"
          color="success"
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
        Your application is complete.
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

          {/* What happens next */}
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

          <Stack spacing={1.5}>
            <Button
              variant="contained"
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

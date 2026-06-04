import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Alert } from '../../../components/Alert';
import { Button } from '../../../components/Button';
import { TextButton } from '../../../components/TextButton';

interface StepSuccessProps {
  onReturnDashboard: () => void;
}

export function StepSuccess({ onReturnDashboard }: StepSuccessProps) {
  return (
    <Stack spacing={4} sx={{ py: 4 }}>
      <Typography component="h1" variant="h2">
        Your Lifetime Pension account request has been submitted.
      </Typography>

      <Box
        sx={{
          border: '1px solid',
          borderColor: 'border.default',
          borderRadius: (t) => `${t.shape.lg}px`,
          backgroundColor: 'background.paper',
          p: 4,
        }}
      >
        <Stack spacing={2}>
          <Typography variant="h4">Confirmation details</Typography>
          <Alert severity="success" message="Your transaction reference is QS20930331M." />
          <Typography variant="body" sx={{ color: 'text.primary' }}>
            Submitted on 15/07/2025 at 4:01PM AEST (Queensland time).
          </Typography>
          <Typography variant="body" sx={{ color: 'text.primary' }}>
            A confirmation email has been sent to yourname@gmail.com.
          </Typography>

          <Box sx={{ pt: 1.5 }}>
            <Typography variant="h5" sx={{ mb: 1 }}>
              What&apos;s next?
            </Typography>
            <Typography variant="body" sx={{ color: 'text.primary' }}>
              Your request will generally be processed in 10 business days and we will notify you by email once your account is successfully set up.
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, pt: 1 }}>
            <Button
              variant="contained"
              label="Return to dashboard"
              onClick={onReturnDashboard}
            />
            <TextButton
              label="Download application"
              hideIcon
            />
          </Box>
        </Stack>
      </Box>
    </Stack>
  );
}

'use client';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Button } from '../../components/Button';
import { Icon } from '../../components/Icon';
import type { InvestmentMixChange } from './types';
import { formatDate, paymentPreferenceLabel, rebalanceLabel } from './utils';

interface SubmissionSuccessProps {
  change: InvestmentMixChange;
  brandName?: string;
  onBackToOverview: () => void;
}

export function SubmissionSuccess({ change, brandName, onBackToOverview }: SubmissionSuccessProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        py: { xs: 6, md: 10 },
        px: 2,
      }}
    >
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
          mb: 3,
        }}
      >
        <Icon icon="check" size="3xl" color="success" />
      </Box>

      <Stack spacing={2} sx={{ maxWidth: '28rem' }}>
        <Typography variant="h3" component="h1">
          Request submitted
        </Typography>
        <Typography variant="body" sx={{ color: 'text.muted', lineHeight: 1.75 }}>
          Your investment mix change has been submitted and will be processed by the end of business
          today.
        </Typography>

        <Box
          sx={{
            bgcolor: 'background.default',
            borderRadius: (t) => `${t.shape.sm}px`,
            px: 3,
            py: 2,
            textAlign: 'left',
          }}
        >
          <Stack spacing={0.5}>
            <Typography variant="small" sx={{ color: 'text.muted' }}>
              Reference number
            </Typography>
            <Typography variant="body" sx={{ fontWeight: 700 }}>
              {change.referenceNumber}
            </Typography>
            <Typography variant="small" sx={{ color: 'text.muted', mt: 0.5 }}>
              Submitted
            </Typography>
            <Typography variant="body">{formatDate(change.submittedAt)}</Typography>
            {change.paymentPreference && (
              <>
                <Typography variant="small" sx={{ color: 'text.muted', mt: 0.5 }}>
                  Future payments
                </Typography>
                <Typography variant="body">
                  {paymentPreferenceLabel(change.paymentPreference, brandName)}
                </Typography>
              </>
            )}
            {change.rebalance && (
              <>
                <Typography variant="small" sx={{ color: 'text.muted', mt: 0.5 }}>
                  Keeping on track
                </Typography>
                <Typography variant="body">{rebalanceLabel(change.rebalance)}</Typography>
              </>
            )}
          </Stack>
        </Box>

        <Box sx={{ pt: 1 }}>
          <Button label="Back to Investments" variant="contained" onClick={onBackToOverview} />
        </Box>
      </Stack>
    </Box>
  );
}

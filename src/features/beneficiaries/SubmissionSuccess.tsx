'use client';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Button } from '../../components/Button';
import { Icon } from '../../components/Icon';

interface SubmissionSuccessProps {
  onBackToOverview: () => void;
}

export function SubmissionSuccess({ onBackToOverview }: SubmissionSuccessProps) {
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
        <Typography variant="h3" component="h1">Nomination submitted</Typography>
        <Typography variant="body" sx={{ color: 'text.muted', lineHeight: 1.75 }}>
          Your binding death benefit nomination has been lodged. You can view or update it at any time from the Beneficiaries page.
        </Typography>
        <Box sx={{ pt: 1 }}>
          <Button label="Back to Beneficiaries" variant="contained" onClick={onBackToOverview} />
        </Box>
      </Stack>
    </Box>
  );
}

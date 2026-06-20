'use client';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Button } from '@/components/Button';
import { Icon } from '@/components/Icon';
import { DescriptionList } from '@/components/DescriptionList';
import type { ConsolidateSubmission } from './types';
import { formatDate, formatCurrency, calculateAtoTotal } from './utils';

export interface SubmissionSuccessProps {
  submission: ConsolidateSubmission;
  onBackToHub: () => void;
}

export function SubmissionSuccess({ submission, onBackToHub }: SubmissionSuccessProps) {
  let summary: { label: string; value: string }[] = [];

  if (submission.method === 'ato' && submission.selectedFunds) {
    const total = calculateAtoTotal(submission.selectedFunds);
    summary = [
      { label: 'Funds selected', value: `${submission.selectedFunds.length}` },
      { label: 'Total amount', value: formatCurrency(total) },
    ];
  } else if (submission.method === 'manual' && submission.funds) {
    summary = [{ label: 'Funds to transfer', value: `${submission.funds.length}` }];
  } else if (submission.method === 'smsf' && submission.smsf) {
    summary = [
      { label: 'SMSF name', value: submission.smsf.smsfName },
      {
        label: 'Amount',
        value:
          submission.smsf.amount.type === 'full'
            ? 'Full balance'
            : formatCurrency(submission.smsf.amount.amount ?? 0),
      },
    ];
  }

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

      <Stack spacing={3} sx={{ maxWidth: '32rem', width: '100%' }}>
        <Typography variant="h3" component="h1">
          Request submitted
        </Typography>

        <Typography variant="body" sx={{ color: 'text.muted', lineHeight: 1.75 }}>
          We&apos;ve received your consolidation request. Processing typically takes 3–5 business days.
          We&apos;ll notify you when the transfer is complete.
        </Typography>

        <Box
          sx={{
            bgcolor: 'surface.secondary',
            borderRadius: (t) => `${(t.shape as { md: number }).md}px`,
            p: 3,
            textAlign: 'left',
          }}
        >
          <DescriptionList>
            <DescriptionList.Item label="Reference number" value={submission.referenceNumber} />
            <DescriptionList.Item label="Submitted" value={formatDate(submission.submittedAt)} />
            {summary.map((item) => (
              <DescriptionList.Item key={item.label} label={item.label} value={item.value} />
            ))}
          </DescriptionList>
        </Box>

        <Button label="Back to Consolidate super" onClick={onBackToHub} fullWidth />
      </Stack>
    </Box>
  );
}

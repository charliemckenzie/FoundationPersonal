'use client';

import { ContentContainer, MOBreadcrumb } from '@/components/MemberOnline';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Alert } from '@/components/Alert';

export default function SmsfConsolidatePage() {
  return (
    <>
      <ContentContainer size="md">
        <MOBreadcrumb
          items={[
            { label: 'Consolidate super', href: '/member-online/consolidate' },
            { label: 'SMSF rollover' },
          ]}
        />
        <Stack spacing={3} sx={{ py: 4 }}>
          <Typography variant="h2" component="h1">
            Self-managed super fund (SMSF)
          </Typography>
          <Alert severity="info" message="This flow is under construction. Please use the manual transfer option for now." />
        </Stack>
      </ContentContainer>
    </>
  );
}

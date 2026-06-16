'use client';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ContentContainer } from '../../../../components/MemberOnline';
import { LinkRow } from '../../../../components/LinkRow';

export default function IncomeAccountsPage() {
  return (
    <ContentContainer size="md">
      <Stack spacing={1.5} sx={{ pb: 4 }}>
        <Typography variant="h1" component="h1">Set up income accounts</Typography>
        <Typography variant="lead">
          Open an income account to start receiving regular payments from your super.
          Choose the option that best suits your retirement needs.
        </Typography>
      </Stack>

      <Stack spacing={1.5}>
        <LinkRow
          label="Open a Transition to Retirement account"
          description="Access some of your super while you're still working."
          icon="arrow-right-from-bracket"
          href="#"
        />
        <LinkRow
          label="Open a Retirement Income Account"
          description="A flexible account that lets you draw down your super as regular income."
          icon="wallet"
          href="#"
        />
        <LinkRow
          label="Open a Retirement Income Account + Lifetime Pension"
          description="Combine flexible drawdowns with guaranteed income for life."
          icon="layer-plus"
          href="#"
        />
        <LinkRow
          label="Open a Lifetime Pension"
          description="Receive guaranteed, fortnightly tax-free income for life."
          icon="infinity"
          href="/member-online/lifetime-pension"
        />
      </Stack>
    </ContentContainer>
  );
}

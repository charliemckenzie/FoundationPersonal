'use client';

import Box from '@mui/material/Box';
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

      <Stack spacing={4}>
        <Stack spacing={1.5}>
          <Stack spacing={0.5}>
            <Typography variant="h5">In retirement</Typography>
            <Typography variant="body">You've retired and are ready to start drawing on your super as regular income.</Typography>
          </Stack>
          <Stack spacing={1.5}>
            <LinkRow
              label="Open a Retirement Income Account + Lifetime Pension"
              description="Combine flexible drawdowns with guaranteed income for life."
              icon="circle-dollar-to-slot"
              href="#"
            />
            <LinkRow
              label="Open a Retirement Income Account"
              description="A flexible account that lets you draw down your super as regular income."
              icon="money-simple-from-bracket"
              href="#"
            />
            <LinkRow
              label="Open a Lifetime Pension"
              description="Receive guaranteed, fortnightly tax-free income for life."
              icon="money-check-dollar"
              href="/member-online/lifetime-pension"
            />
          </Stack>
        </Stack>

        <Box sx={{ borderTop: '1px solid', borderColor: 'border.subtle' }} />

        <Stack spacing={2}>
          <Stack spacing={0.5}>
            <Typography variant="h5">Before retirement</Typography>
            <Typography variant="body">A Transition to Retirement (TTR) strategy lets you start drawing from your super while you're still working, so you can ease back on hours or grow your balance without affecting your income.</Typography>
          </Stack>
          <LinkRow
            label="Ease into retirement with a TTR income account"
            description="Access some of your super while you're still working."
            icon="briefcase"
            href="#"
          />
        </Stack>
      </Stack>
    </ContentContainer>
  );
}

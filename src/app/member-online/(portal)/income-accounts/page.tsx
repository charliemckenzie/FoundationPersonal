'use client';

import { useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ContentContainer } from '../../../../components/MemberOnline';
import { LinkRow } from '../../../../components/LinkRow';
import { ManagedList } from '../../../../components/ManagedList';
import { Dialog } from '../../../../components/Dialog';

export default function IncomeAccountsPage() {
  const [confirmOpen, setConfirmOpen] = useState(false);

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
        <Stack spacing={2}>
          <Stack spacing={0.5}>
            <Typography variant="h5">In retirement options</Typography>
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
              href="/member-online/retirement-income-account"
            />
            <ManagedList
              icon="money-check-dollar"
              iconStyle="light"
              title="Open a Lifetime Pension"
              description="Receive guaranteed, fortnightly tax-free income for life."
              items={[
                {
                  id: 'continue',
                  name: 'Continue where you left off',
                  metadata: ['Last modified 12 May 2024'],
                  href: '/member-online/lifetime-pension',
                },
                {
                  id: 'new-application',
                  name: 'Start a new application',
                  metadata: ['Important: This will override your incomplete application above'],
                  onClick: () => setConfirmOpen(true),
                },
              ]}
              itemVariant="card"
            />
          </Stack>
        </Stack>

        <Box sx={{ borderTop: '1px solid', borderColor: 'border.subtle' }} />

        <Stack spacing={2}>
          <Stack spacing={0.5}>
            <Typography variant="h5">Before retirement</Typography>
            <Typography variant="body">A Transition to Retirement (TTR) strategy lets you start drawing from your super while you&apos;re still working, so you can ease back on hours or grow your balance without affecting your income.</Typography>
          </Stack>
          <LinkRow
            label="Ease into retirement with a TTR income account"
            description="Access some of your super while you're still working."
            icon="briefcase"
            href="#"
          />
        </Stack>
      </Stack>

      <Dialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        variant="danger"
        hideIcon
        title="Start a new application?"
        description="This will override your incomplete application. This action cannot be undone."
        confirmLabel="Start new application"
        cancelLabel="Cancel"
        onConfirm={() => {
          setConfirmOpen(false);
          window.location.href = '/member-online/lifetime-pension/new';
        }}
      />
    </ContentContainer>
  );
}

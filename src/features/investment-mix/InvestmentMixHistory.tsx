'use client';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useRouter, useSearchParams } from 'next/navigation';
import { Chip } from '../../components/Chip';
import type { ChipSeverity } from '../../components/Chip';
import { ContentContainer, MOBreadcrumb } from '../../components/MemberOnline';
import { Table } from '../../components/Table';
import type { TableColumn } from '../../components/Table';
import { MOCK_ACCOUNTS, MOCK_INVESTMENT_OPTIONS, historyForAccount } from './mockData';
import type { InvestmentSwitchRecord, SwitchStatus } from './types';
import { applyToLabel, formatCurrency, formatDate } from './utils';

/** Chip label + severity per switch status. `superseded` uses the neutral default chip. */
const STATUS_META: Record<SwitchStatus, { label: string; severity?: ChipSeverity }> = {
  processing: { label: 'Processing', severity: 'info' },
  active: { label: 'Active', severity: 'success' },
  superseded: { label: 'Superseded' },
};

interface InvestmentMixHistoryProps {
  /** Path back to the Change your investments landing. */
  investmentsPath: string;
  /**
   * Override the account shown. Defaults to the `?account=` query param, then
   * the first account. Provide explicitly in stories/tests.
   */
  accountId?: string;
}

const columns: TableColumn<InvestmentSwitchRecord>[] = [
  { key: 'submittedAt', label: 'Date', render: (row) => formatDate(row.submittedAt) },
  { key: 'applyTo', label: 'Applies to', render: (row) => applyToLabel(row.applyTo) },
  {
    key: 'allocations',
    label: 'Mix',
    render: (row) => (
      <Stack spacing={0.25}>
        {MOCK_INVESTMENT_OPTIONS.filter((o) => (row.allocations[o.id] ?? 0) > 0).map((o) => (
          <Typography key={o.id} variant="body" component="span">
            {o.name} {row.allocations[o.id]}%
          </Typography>
        ))}
      </Stack>
    ),
  },
  {
    key: 'status',
    label: 'Status',
    render: (row) => (
      <Chip size="small" label={STATUS_META[row.status].label} severity={STATUS_META[row.status].severity} />
    ),
  },
];

export function InvestmentMixHistory({ accountId, investmentsPath }: InvestmentMixHistoryProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const resolvedAccountId = accountId ?? searchParams.get('account') ?? MOCK_ACCOUNTS[0].id;
  const account = MOCK_ACCOUNTS.find((a) => a.id === resolvedAccountId);
  const history = historyForAccount(resolvedAccountId);

  return (
    <>
      <Box sx={{ px: 3, pt: 2 }}>
        <MOBreadcrumb
          items={[
            { label: 'Change your investments', href: investmentsPath },
            { label: 'Investment mix history' },
          ]}
          onBack={() => router.push(investmentsPath)}
        />
      </Box>
      <ContentContainer size="md">
        <Stack spacing={3} sx={{ py: 4 }}>
          <div>
            <Typography variant="h2" component="h1">
              Investment mix history
            </Typography>
            {account && (
              <Typography variant="body" sx={{ mt: 1 }}>
                For {account.name}{' '}
                <Box component="span" sx={{ fontWeight: 700 }}>
                  {formatCurrency(account.balance)}
                </Box>{' '}
                <Box component="span" sx={{ color: 'text.muted' }}>
                  as at {formatDate(new Date().toISOString())}
                </Box>
              </Typography>
            )}
          </div>

          <Table
            columns={columns}
            rows={history}
            headerStyle="paper"
            emptyMessage="No investment switches recorded for this account yet."
          />

          <Typography variant="small" sx={{ color: 'text.muted' }}>
            Switches typically take 2–3 business days to process. A switch shows as Processing while
            it&apos;s being applied, Active once it&apos;s your current mix, and Superseded once a
            later change replaces it.
          </Typography>
        </Stack>
      </ContentContainer>
    </>
  );
}

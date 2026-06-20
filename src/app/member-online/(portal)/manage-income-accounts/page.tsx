'use client';

import { useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { Theme } from '@mui/material/styles';
import { useRouter } from 'next/navigation';
import { Tabs } from '../../../../components/Tabs';
import { ContentContainer } from '../../../../components/MemberOnline';
import { AccountListRow } from './AccountListRow';
import { AccountSelect } from './AccountSelect';
import { ApplicationRow } from './ApplicationRow';
import { AccountDetailView } from './AccountDetailView';
import { MOCK_APPLICATIONS, MOCK_INCOME_ACCOUNTS } from './mockData';

export default function ManageIncomeAccountsPage() {
  const router = useRouter();

  const [accountTypeFilter, setAccountTypeFilter] = useState('all');
  const [accountStatusTab, setAccountStatusTab] = useState(0); // 0=active, 1=closed

  const selectedAccount = accountTypeFilter !== 'all'
    ? MOCK_INCOME_ACCOUNTS.find((a) => a.id === accountTypeFilter)
    : null;

  const activeAccounts = MOCK_INCOME_ACCOUNTS.filter((a) => a.status === 'active');
  const closedAccounts = MOCK_INCOME_ACCOUNTS.filter((a) => a.status === 'closed');
  const displayedAccounts = accountStatusTab === 0 ? activeAccounts : closedAccounts;
  const pendingApps = MOCK_APPLICATIONS.filter((a) => a.status !== 'Submitted');

  return (
    <ContentContainer size="md">
      {/* Page heading */}
      <Stack spacing={0.75} sx={{ mb: 4 }}>
        <Typography variant="h1">Manage income accounts</Typography>
        <Typography variant="lead" sx={{ color: 'text.muted' }}>
          Select an account to view details and manage your payments.
        </Typography>
      </Stack>

      {/* Account selector */}
      <Box sx={{ mb: 4, width: { xs: '100%', sm: '66.666%' } }}>
        <AccountSelect
          value={accountTypeFilter}
          accounts={MOCK_INCOME_ACCOUNTS}
          onChange={setAccountTypeFilter}
        />
      </Box>

      {/* Content - Account Detail (specific) or All-accounts overview */}
      {selectedAccount ? (
        <AccountDetailView account={selectedAccount} />
      ) : (
        <Stack spacing={4}>
          {/* ── Your accounts ── */}
          <Box
            sx={(t: Theme) => ({
              border: '1px solid', borderColor: 'border.default',
              borderRadius: `${t.shape.lg}px`, overflow: 'hidden', bgcolor: 'background.paper',
            })}
          >
            <Box sx={{ px: 2.5, pt: 2, pb: 1.5, borderBottom: '1px solid', borderBottomColor: 'border.subtle' }}>
              <Typography variant="h6" sx={{ mb: 1.5 }}>Your accounts</Typography>
              <Tabs
                label="Filter accounts by status"
                tabStyle="default"
                size="small"
                onChange={setAccountStatusTab}
                tabs={[
                  { label: `Active (${activeAccounts.length})` },
                  { label: `Closed (${closedAccounts.length})` },
                ]}
              />
            </Box>
            <Box sx={{ bgcolor: 'background.default', p: 1.5, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {displayedAccounts.length === 0 ? (
                <Box sx={{ py: 3, textAlign: 'center' }}>
                  <Typography variant="body" sx={{ color: 'text.muted' }}>No accounts.</Typography>
                </Box>
              ) : (
                displayedAccounts.map((account) => (
                  <AccountListRow
                    key={account.id}
                    account={account}
                    onClick={() => setAccountTypeFilter(account.id)}
                  />
                ))
              )}
            </Box>
          </Box>

          {/* ── Applications ── */}
          <Box
            sx={(t: Theme) => ({
              border: '1px solid', borderColor: 'border.default',
              borderRadius: `${t.shape.lg}px`, overflow: 'hidden', bgcolor: 'background.paper',
            })}
          >
            <Box sx={{ px: 2.5, py: 2, borderBottom: '1px solid', borderBottomColor: 'border.subtle', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography variant="h6">Applications</Typography>
              {pendingApps.length > 0 && (
                <Box sx={(t: Theme) => ({
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  minWidth: '1.375rem', height: '1.375rem', px: 0.5,
                  borderRadius: '999px', bgcolor: 'warning.main',
                  fontSize: '0.6875rem', fontWeight: 700, color: 'warning.contrastText',
                })}>
                  {pendingApps.length}
                </Box>
              )}
            </Box>
            <Box sx={{ bgcolor: 'background.default', p: 1.5, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {MOCK_APPLICATIONS.length === 0 ? (
                <Box sx={{ py: 3, textAlign: 'center' }}>
                  <Typography variant="body" sx={{ color: 'text.muted' }}>No applications in progress.</Typography>
                </Box>
              ) : (
                MOCK_APPLICATIONS.map((app) => (
                  <ApplicationRow key={app.id} app={app} onClick={() => router.push(app.continuePath)} />
                ))
              )}
            </Box>
            <Box
              component="button" type="button"
              onClick={() => router.push('/member-online/income-accounts')}
              sx={(t: Theme) => ({
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                width: '100%', height: t.spacing(7),
                border: 'none', borderTop: '1px solid', borderTopColor: 'border.subtle',
                borderRadius: `0 0 ${t.shape.lg}px ${t.shape.lg}px`,
                bgcolor: 'transparent', cursor: 'pointer', fontFamily: 'inherit',
                transition: 'background-color 200ms ease',
                '&:hover': { bgcolor: t.palette.action.hover },
                '&:focus-visible': { outline: '2px solid', outlineColor: 'border.focus', outlineOffset: 2, position: 'relative', zIndex: 1 },
              })}
            >
              <Typography variant="body" sx={{ fontWeight: 700, color: 'primary.main' }}>Open a new account</Typography>
            </Box>
          </Box>

        </Stack>
      )}
    </ContentContainer>
  );
}

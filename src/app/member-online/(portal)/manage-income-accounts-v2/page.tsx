'use client';

import { useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { Theme } from '@mui/material/styles';
import { useRouter } from 'next/navigation';
import { TextButton } from '../../../../components/TextButton';
import { ManagedList } from '../../../../components/ManagedList';
import { ContentContainer } from '../../../../components/MemberOnline';
import { Icon } from '../../../../components/Icon';
import { Button } from '../../../../components/Button';
import { AccountListRow } from './AccountListRow';
import { AccountSelect } from './AccountSelect';
import { ApplicationRow } from './ApplicationRow';
import { AccountDetailView } from './AccountDetailView';
import { IncomeSummaryStrip } from './IncomeSummaryStrip';
import { QuickActionsSection } from './QuickActionsSection';
import { RecentPaymentsSection } from './RecentPaymentsSection';
import {
  MOCK_APPLICATIONS,
  MOCK_INCOME_ACCOUNTS,
  MOCK_RECENT_PAYMENTS,
} from './mockData';

export default function ManageIncomeAccountsPageV2() {
  const router = useRouter();

  const [accountTypeFilter, setAccountTypeFilter] = useState('all');
  const [showingClosed, setShowingClosed] = useState(false);
  const [previewEmpty, setPreviewEmpty] = useState(false);

  const selectedAccount =
    accountTypeFilter !== 'all'
      ? MOCK_INCOME_ACCOUNTS.find((a) => a.id === accountTypeFilter)
      : null;

  const activeAccounts = MOCK_INCOME_ACCOUNTS.filter((a) => a.status === 'active');
  const closedAccounts = MOCK_INCOME_ACCOUNTS.filter((a) => a.status === 'closed');
  const displayedAccounts = showingClosed ? closedAccounts : activeAccounts;

  // Split applications: action-required (needs user input) vs tracking (passive)
  const actionRequiredApps = MOCK_APPLICATIONS.filter(
    (a) => a.severity === 'warning' || a.severity === 'error',
  );
  const trackingApps = MOCK_APPLICATIONS.filter(
    (a) => a.severity !== 'warning' && a.severity !== 'error',
  );

  return (
    <ContentContainer size="lg">
      {/* Dev toggle */}
      <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
        <Box
          component="button"
          type="button"
          onClick={() => {
            setPreviewEmpty((v) => !v);
            setAccountTypeFilter('all');
          }}
          sx={(t: Theme) => ({
            display: 'inline-flex',
            alignItems: 'center',
            gap: 0.75,
            px: 1.25,
            py: 0.5,
            border: '1px dashed',
            borderColor: previewEmpty ? 'primary.main' : 'border.default',
            borderRadius: `${t.shape.full}px`,
            bgcolor: previewEmpty ? 'primary.softMain' : 'transparent',
            cursor: 'pointer',
            fontFamily: 'inherit',
            transition: 'all 150ms ease',
            '&:hover': { borderColor: 'primary.main', bgcolor: 'primary.softMain' },
            '&:focus-visible': {
              outline: '2px solid',
              outlineColor: 'border.focus',
              outlineOffset: 2,
            },
          })}
        >
          <Box
            sx={{
              width: '0.375rem',
              height: '0.375rem',
              borderRadius: '50%',
              bgcolor: previewEmpty ? 'primary.main' : 'text.disabled',
              flexShrink: 0,
            }}
          />
          <Typography
            variant="caption"
            sx={{ color: previewEmpty ? 'primary.main' : 'text.muted', fontWeight: 500 }}
          >
            {previewEmpty ? 'Previewing: empty state' : 'Preview empty state'}
          </Typography>
        </Box>
      </Box>

      {/* Page heading */}
      <Stack spacing={0.75} sx={{ mb: 1 }}>
        <Typography variant="h1">Manage income accounts</Typography>
      </Stack>
      <Typography variant="lead" sx={{ color: 'text.muted', mb: 4 }}>
        Select an account to view details and manage your payments.
      </Typography>

      {previewEmpty ? (
        <Stack spacing={4}>
          <ManagedList
            icon="money-simple-from-bracket"
            iconStyle="light"
            title="Your income accounts"
            description="No income accounts set up yet."
            items={[]}
            emptyMessage="No income accounts created yet"
            addLabel="Open an income account"
            onAdd={() => router.push('/member-online/income-accounts')}
          />
        </Stack>
      ) : (
        <>
          {/* Pending actions — above summary strip, only when action-required apps exist */}
          {actionRequiredApps.length > 0 && (
            <Box
              sx={(t: Theme) => ({
                borderRadius: `${t.shape.lg}px`,
                bgcolor: 'primary.softMain',
                px: 3,
                py: 2.5,
                mb: 4,
              })}
            >
              <Typography variant="h6" sx={{ color: 'primary.dark', mb: 2 }}>
                Pending actions
              </Typography>
              <Stack spacing={1.5}>
                {actionRequiredApps.map((app) => (
                  <Box
                    key={app.id}
                    sx={(t: Theme) => ({
                      display: 'flex',
                      alignItems: { xs: 'flex-start', sm: 'center' },
                      flexDirection: { xs: 'column', sm: 'row' },
                      gap: { xs: 2, sm: 3 },
                      px: 2.5,
                      py: 2,
                      borderRadius: `${t.shape.md}px`,
                      bgcolor: 'background.paper',
                    })}
                  >
                    {/* Icon */}
                    <Box
                      sx={(t: Theme) => ({
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '2.5rem',
                        height: '2.5rem',
                        borderRadius: '50%',
                        bgcolor: 'primary.softMain',
                        flexShrink: 0,
                      })}
                    >
                      <Icon icon="circle-exclamation" style="solid" size="md" color="primary" />
                    </Box>

                    {/* Text */}
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography variant="body" sx={{ fontWeight: 700, color: 'text.heading', display: 'block' }}>
                        {app.accountType}
                      </Typography>
                      <Typography variant="small" sx={{ color: 'text.muted', display: 'block', mt: 0.25 }}>
                        {app.status} · Started {app.startedAt}
                      </Typography>
                    </Box>

                    {/* CTA */}
                    <Button
                      variant="contained"
                      size="small"
                      label="Continue application"
                      onClick={() => router.push(app.continuePath)}
                    />
                  </Box>
                ))}
              </Stack>
            </Box>
          )}

          {/* Income summary strip */}
          <IncomeSummaryStrip accounts={MOCK_INCOME_ACCOUNTS} />

          {/* Account selector */}
          <Box sx={{ mb: 4, width: { xs: '100%', sm: '50%' } }}>
            <AccountSelect
              value={accountTypeFilter}
              accounts={MOCK_INCOME_ACCOUNTS}
              onChange={setAccountTypeFilter}
            />
          </Box>

          {/* Content — account detail (specific) or overview */}
          {selectedAccount ? (
            <AccountDetailView account={selectedAccount} />
          ) : (
            <Stack spacing={4}>
              {/* Your accounts */}
              <Box
                sx={(t: Theme) => ({
                  border: '1px solid',
                  borderColor: 'border.default',
                  borderRadius: `${t.shape.lg}px`,
                  overflow: 'hidden',
                  bgcolor: 'background.paper',
                })}
              >
                <Box
                  sx={{
                    px: 2.5,
                    py: 2,
                    borderBottom: '1px solid',
                    borderBottomColor: 'border.subtle',
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    alignItems: { xs: 'flex-start', sm: 'center' },
                    justifyContent: 'space-between',
                    gap: { xs: 0.5, sm: 2 },
                  }}
                >
                  <Typography variant="h6">
                    {showingClosed ? 'Your closed accounts' : 'Your active accounts'}
                  </Typography>
                  {(showingClosed || closedAccounts.length > 0) && (
                    <TextButton
                      size="small"
                      hideIcon
                      label={
                        showingClosed
                          ? `View active accounts (${activeAccounts.length})`
                          : `View closed accounts (${closedAccounts.length})`
                      }
                      onClick={() => setShowingClosed((v) => !v)}
                    />
                  )}
                </Box>
                <Box
                  sx={{
                    bgcolor: 'background.default',
                    p: 1.5,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1.5,
                  }}
                >
                  {displayedAccounts.length === 0 ? (
                    <Box sx={{ py: 3, textAlign: 'center' }}>
                      <Typography variant="body" sx={{ color: 'text.muted' }}>
                        No accounts.
                      </Typography>
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

              {/* Quick actions */}
              <QuickActionsSection />

              {/* Recent payments */}
              <RecentPaymentsSection payments={MOCK_RECENT_PAYMENTS} />

              {/* Applications (tracking only) */}
              <Box
                sx={(t: Theme) => ({
                  border: '1px solid',
                  borderColor: 'border.default',
                  borderRadius: `${t.shape.lg}px`,
                  overflow: 'hidden',
                  bgcolor: 'background.paper',
                })}
              >
                <Box
                  sx={{
                    px: 2.5,
                    py: 2,
                    borderBottom: '1px solid',
                    borderBottomColor: 'border.subtle',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <Typography variant="h6">Applications</Typography>
                </Box>
                <Box
                  sx={{
                    bgcolor: 'background.default',
                    p: 1.5,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1.5,
                  }}
                >
                  {trackingApps.length === 0 ? (
                    <Box sx={{ py: 3, textAlign: 'center' }}>
                      <Typography variant="body" sx={{ color: 'text.muted' }}>
                        No applications in progress.
                      </Typography>
                    </Box>
                  ) : (
                    trackingApps.map((app) => (
                      <ApplicationRow
                        key={app.id}
                        app={app}
                        onClick={() => router.push(app.continuePath)}
                      />
                    ))
                  )}
                </Box>
                <Box
                  component="button"
                  type="button"
                  onClick={() => router.push('/member-online/income-accounts')}
                  sx={(t: Theme) => ({
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    height: t.spacing(7),
                    border: 'none',
                    borderTop: '1px solid',
                    borderTopColor: 'border.subtle',
                    borderRadius: `0 0 ${t.shape.lg}px ${t.shape.lg}px`,
                    bgcolor: 'transparent',
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                    transition: 'background-color 200ms ease',
                    '&:hover': { bgcolor: t.palette.action.hover },
                    '&:focus-visible': {
                      outline: '2px solid',
                      outlineColor: 'border.focus',
                      outlineOffset: 2,
                      position: 'relative',
                      zIndex: 1,
                    },
                  })}
                >
                  <Typography variant="body" sx={{ fontWeight: 700, color: 'primary.main' }}>
                    Open a new account
                  </Typography>
                </Box>
              </Box>
            </Stack>
          )}
        </>
      )}
    </ContentContainer>
  );
}

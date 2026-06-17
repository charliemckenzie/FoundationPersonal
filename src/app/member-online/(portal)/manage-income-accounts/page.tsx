'use client';

import { useState } from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import MuiSelect from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { Theme } from '@mui/material/styles';
import { useRouter } from 'next/navigation';
import { Chip } from '../../../../components/Chip';
import type { ChipSeverity } from '../../../../components/Chip';
import { Icon } from '../../../../components/Icon';
import { Tabs } from '../../../../components/Tabs';
import { TextButton } from '../../../../components/TextButton';
import { buildInputStyles } from '../../../../components/inputs/variantStyles';
import { ContentContainer } from '../../../../components/MemberOnline';

// ─── Types ────────────────────────────────────────────────────────────────────

type AccountStatus = 'active' | 'closed';

interface IncomeAccount {
  id: string;
  name: string;
  memberNumber: string;
  balance: number;
  status: AccountStatus;
  nextPaymentAmount: string;
  nextPaymentDate: string;
  icon: string;
}

interface Application {
  id: string;
  accountType: string;
  status: string;
  severity: ChipSeverity;
  startedAt: string;
  continuePath: string;
}

// ─── Mock data ────────────────────────────────────────────────────────────────

const MOCK_INCOME_ACCOUNTS: IncomeAccount[] = [
  {
    id: 'acc-ria',
    name: 'Retirement Income Account',
    memberNumber: '235896',
    balance: 1289130.55,
    status: 'active',
    nextPaymentAmount: '$2,847.65',
    nextPaymentDate: '15 Oct 2025',
    icon: 'money-simple-from-bracket',
  },
  {
    id: 'acc-ria-2',
    name: 'Retirement Income Account',
    memberNumber: '235897',
    balance: 89130.55,
    status: 'active',
    nextPaymentAmount: '$2,847.65',
    nextPaymentDate: '15 Oct 2025',
    icon: 'money-simple-from-bracket',
  },
  {
    id: 'acc-lp',
    name: 'Lifetime Pension',
    memberNumber: '235898',
    balance: 180.99,
    status: 'active',
    nextPaymentAmount: '$3,021.15',
    nextPaymentDate: '30 Jun 2026',
    icon: 'money-check-dollar',
  },
  {
    id: 'acc-ttr',
    name: 'Retirement Income Account',
    memberNumber: '235899',
    balance: 0.77,
    status: 'active',
    nextPaymentAmount: '$500.00',
    nextPaymentDate: '1 Nov 2025',
    icon: 'money-simple-from-bracket',
  },
  {
    id: 'acc-closed-1',
    name: 'Retirement Income Account',
    memberNumber: '235900',
    balance: 0,
    status: 'closed',
    nextPaymentAmount: '—',
    nextPaymentDate: '—',
    icon: 'money-simple-from-bracket',
  },
  {
    id: 'acc-closed-2',
    name: 'Retirement Income Account',
    memberNumber: '235901',
    balance: 0,
    status: 'closed',
    nextPaymentAmount: '—',
    nextPaymentDate: '—',
    icon: 'money-simple-from-bracket',
  },
];

const MOCK_APPLICATIONS: Application[] = [
  {
    id: 'app-001',
    accountType: 'Retirement Income Account',
    status: 'In progress',
    severity: 'info',
    startedAt: '10 Jun 2026',
    continuePath: '#',
  },
  {
    id: 'app-002',
    accountType: 'Lifetime Pension',
    status: 'Verification required',
    severity: 'warning',
    startedAt: '12 Jun 2026',
    continuePath: '/member-online/lifetime-pension/submitted',
  },
  {
    id: 'app-003',
    accountType: 'Transition to Retirement account',
    status: 'Submitted',
    severity: 'success',
    startedAt: '8 Jun 2026',
    continuePath: '/member-online/lifetime-pension/view-application',
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatCurrency(n: number) {
  return new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD' }).format(n);
}

// ─── Account list row ─────────────────────────────────────────────────────────

function AccountListRow({ account, onClick }: { account: IncomeAccount; onClick: () => void }) {
  return (
    <Box
      component="button"
      type="button"
      onClick={onClick}
      sx={(t: Theme) => ({
        display: 'flex', alignItems: 'center', gap: 2,
        width: '100%', px: 2.5, py: 2,
        border: 'none',
        borderRadius: `${t.shape.sm}px`,
        bgcolor: 'background.paper', cursor: 'pointer', textAlign: 'left',
        transition: 'background-color 150ms ease',
        '&:hover': { bgcolor: t.palette.action.hover },
        '&:focus-visible': { outline: '2px solid', outlineColor: 'border.focus', outlineOffset: -2, zIndex: 1, position: 'relative' },
      })}
    >
      <Box sx={(t: Theme) => ({
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        width: '2.5rem', height: '2.5rem',
        borderRadius: '50%', bgcolor: 'primary.softMain', flexShrink: 0,
      })}>
        <Icon icon={account.icon} style="light" size="lg" color="primary" />
      </Box>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography variant="body" sx={{ fontWeight: 700, color: 'text.heading', display: 'block' }}>
          {account.name}
        </Typography>
        <Typography variant="small" sx={{ color: 'text.muted', display: 'block' }}>
          Member number: {account.memberNumber}
        </Typography>
      </Box>
      <Box sx={{ textAlign: 'right', flexShrink: 0 }}>
        <Typography variant="body" sx={{ fontWeight: 700, color: 'text.heading', display: 'block' }}>
          {account.nextPaymentAmount}
        </Typography>
        <Typography variant="small" sx={{ color: 'text.muted', display: 'block' }}>
          {account.nextPaymentDate}
        </Typography>
      </Box>
      <Icon icon="chevron-right" style="regular" size="sm" color="text.muted" />
    </Box>
  );
}

// ─── Account selector ────────────────────────────────────────────────────────

function AccountSelect({
  value,
  accounts,
  onChange,
}: {
  value: string;
  accounts: IncomeAccount[];
  onChange: (id: string) => void;
}) {
  return (
    <FormControl fullWidth>
      <MuiSelect
        value={value}
        onChange={(e) => onChange(e.target.value as string)}
        displayEmpty
        renderValue={(selected) => {
          if (!selected) return <Box component="span" sx={{ color: 'text.disabled' }}>Select an account</Box>;
          if (selected === 'all') return 'All accounts';
          const acct = accounts.find((a) => a.id === selected);
          return acct ? `${acct.name} · Member no: ${acct.memberNumber}` : '';
        }}
          sx={(t: Theme) => ({
            ...buildInputStyles(t),
            minHeight: '3rem',
            fontSize: t.typography.body.fontSize,
            '& div.MuiSelect-select': { lineHeight: 1.5, py: '0.6875rem' },
          })}
          MenuProps={{
            slotProps: {
              list: { sx: { py: '4px' } },
              paper: { sx: (t: Theme) => ({ borderRadius: `${t.shape.sm}px`, mt: 0.5 }) },
            },
          }}
        >
          <MenuItem
            value="all"
            disableRipple
            sx={(t: Theme) => ({ mx: '4px', borderRadius: `${t.shape.xs}px`, width: 'calc(100% - 8px)' })}
          >
            <ListItemText
              primary="All accounts"
              slotProps={{ primary: { sx: { typography: 'body', fontWeight: 700 } } }}
            />
          </MenuItem>
          {accounts.map((acct) => (
            <MenuItem
              key={acct.id}
              value={acct.id}
              disableRipple
              sx={(t: Theme) => ({
                mx: '4px',
                borderRadius: `${t.shape.xs}px`,
                width: 'calc(100% - 8px)',
                alignItems: 'flex-start',
                py: 1.25,
              })}
            >
              <ListItemText
                primary={acct.name}
                secondary={acct.status === 'closed'
                  ? `Member no: ${acct.memberNumber} · Closed`
                  : `Member no: ${acct.memberNumber} · Next: ${acct.nextPaymentAmount} on ${acct.nextPaymentDate}`}
                slotProps={{
                  primary: { sx: { typography: 'body', fontWeight: 700, lineHeight: 1.4, mb: 0.25 } },
                  secondary: { sx: { typography: 'small', color: 'text.muted', lineHeight: 1.4 } },
                }}
              />
            </MenuItem>
          ))}
        </MuiSelect>
    </FormControl>
  );
}

// ─── Application row (sidebar) ────────────────────────────────────────────────

function ApplicationRow({ app, onClick }: { app: Application; onClick: () => void }) {
  const isSubmitted = app.status === 'Submitted';
  return (
    <Box
      component="button"
      type="button"
      onClick={onClick}
      sx={(t: Theme) => ({
        display: 'flex',
        alignItems: 'flex-start',
        gap: 1.5,
        px: 2,
        py: 1.75,
        width: '100%',
        border: '1px solid',
        borderColor: 'border.default',
        borderRadius: `${t.shape.sm}px`,
        bgcolor: 'background.paper',
        cursor: 'pointer',
        textAlign: 'left',
        transition: 'background-color 150ms ease',
        '&:hover': { bgcolor: t.palette.action.hover },
        '&:focus-visible': { outline: '2px solid', outlineColor: 'border.focus', outlineOffset: -2, zIndex: 1, position: 'relative' },
      })}
    >
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography variant="body" sx={{ fontWeight: 700, color: 'text.heading', display: 'block', mb: 0.5 }}>
          {app.accountType}
        </Typography>
        <Chip label={app.status} severity={app.severity} size="small" />
        <Typography variant="small" sx={{ color: 'text.muted', display: 'block', mt: 0.75 }}>
          {isSubmitted ? `Submitted ${app.startedAt}` : `Started ${app.startedAt}`}
        </Typography>
      </Box>
      <Box sx={{ color: 'text.muted', flexShrink: 0, mt: 0.25 }}>
        <Icon icon="arrow-right" style="regular" size="sm" />
      </Box>
    </Box>
  );
}

// ─── Account detail section ───────────────────────────────────────────────────

interface DetailRowProps {
  label: string;
  value: React.ReactNode;
  note?: string;
}

function DetailRow({ label, value, note }: DetailRowProps) {
  return (
    <Box sx={{ display: 'flex', py: 1.5, borderBottom: '1px solid', borderBottomColor: 'border.subtle' }}>
      <Typography variant="body" sx={{ color: 'text.muted', width: '40%', flexShrink: 0 }}>
        {label}
      </Typography>
      <Box sx={{ flex: 1 }}>
        <Typography variant="body" sx={{ fontWeight: 600, color: 'text.primary' }}>
          {value}
        </Typography>
        {note && (
          <Typography variant="small" sx={{ color: 'text.muted', display: 'block', mt: 0.5 }}>
            {note}
          </Typography>
        )}
      </Box>
    </Box>
  );
}

interface SectionProps {
  title: string;
  children: React.ReactNode;
  action?: { label: string; href: string; icon?: string };
}

function Section({ title, children, action }: SectionProps) {
  const router = useRouter();
  return (
    <Box
      sx={(t: Theme) => ({
        border: '1px solid',
        borderColor: 'border.default',
        borderRadius: `${t.shape.lg}px`,
        bgcolor: 'background.paper',
        overflow: 'hidden',
      })}
    >
      <Box sx={{ p: 4 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>{title}</Typography>
        {children}
      </Box>
      {action && (
        <Box
          sx={{
            px: 4, py: 1.5,
            borderTop: '1px solid', borderTopColor: 'border.subtle',
            bgcolor: 'background.paper',
          }}
        >
          <TextButton
            label={action.label}
            onClick={() => router.push(action.href)}
            {...(action.icon ? { startIcon: action.icon } : {})}
          />
        </Box>
      )}
    </Box>
  );
}

function AccountDetailView({ account }: { account: IncomeAccount }) {
  const isLifetimePension = account.name === 'Lifetime Pension';

  return (
    <Stack spacing={3}>
      {/* Overview section - styled like purchase price card */}
      <Box
        sx={(t: Theme) => ({
          borderRadius: `${t.shape.lg}px`,
          border: '1px solid',
          borderColor: 'border.default',
          bgcolor: 'background.paper',
          overflow: 'hidden',
        })}
      >
        {/* Grey header — balance */}
        <Box sx={{ p: 4, bgcolor: 'background.default' }}>
          <Typography variant="small" sx={{ color: 'text.primary', display: 'block', mb: 0.5 }}>
            Account balance as at 17 June 2026
          </Typography>
          <Typography variant="h4" sx={{ color: 'text.heading', fontFamily: '"Noto Sans", sans-serif' }}>
            {formatCurrency(account.balance)}
          </Typography>
        </Box>

        {/* White body — details, with the arrow straddling the seam */}
        <Box sx={{ position: 'relative', px: 4, pt: 5, pb: 4, borderTop: '1px solid', borderColor: 'border.subtle' }}>
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: (t: Theme) => t.spacing(4),
              transform: 'translateY(-50%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '2.5rem',
              height: '2.5rem',
              borderRadius: '50%',
              border: '1px solid',
              borderColor: 'border.subtle',
              bgcolor: 'background.paper',
            }}
          >
            <Icon icon="arrow-down" size="lg" color="primary" />
          </Box>

          <Typography variant="h6" sx={{ mb: 2 }}>Overview</Typography>
          <DetailRow label="Next payment:" value={`${account.nextPaymentAmount}, ${account.nextPaymentDate}`} />
          <DetailRow label="Payment frequency:" value="Fortnightly" />
          <DetailRow label="Financial year to date:" value="$0.00" />
          <DetailRow
            label="Annual payment amount:"
            value="$55,444.87"
            note="For the complete 2025 to 2026 financial year. Your actual payment will be based on the portion of the year your account is open."
          />
          <DetailRow label="Start date" value="8 Sep 2020" />
          <DetailRow label="Original purchase price:" value="$682,704.35" />
          <DetailRow label="Total to date:" value="$0.00" />
          <DetailRow
            label="Money Back Protection:"
            value="$682,704.35"
            note="May be subject to legislative maximums and adjusted for negative returns. More information"
          />
          <DetailRow
            label="Cooling-off period:"
            value="Expired"
            note="Your 14 day and 6 month cooling-off periods have expired and are no longer active"
          />
          <DetailRow label="Product holder" value="H Rialto A Nse" />
        </Box>
      </Box>

      {/* Bank details section */}
      <Section title="Bank details" action={{ label: 'Edit bank details', href: '#' }}>
        <DetailRow label="Bank:" value="Commonwealth Bank of Australia" />
        <DetailRow label="BSB:" value="062-000" />
        <DetailRow label="Account number:" value="1234 5678" />
        <Box sx={{ display: 'flex', py: 1.5 }}>
          <Typography variant="body" sx={{ color: 'text.muted', width: '40%', flexShrink: 0 }}>
            Account name:
          </Typography>
          <Typography variant="body" sx={{ fontWeight: 600, color: 'text.primary' }}>
            H Rialto A Nse
          </Typography>
        </Box>
      </Section>

      {/* Centrelink schedule section */}
      <Section title="Centrelink schedule" action={{ label: 'Download Centrelink schedule', href: '#', icon: 'arrow-down-to-line' }}>
        <Typography variant="body" sx={{ color: 'text.primary', mb: 2 }}>
          Your eligibility for income support or an Age Pension from the government may be affected if you are receiving payments from a QSuper income account.
        </Typography>
        <Typography variant="body" sx={{ color: 'text.primary' }}>
          For a Lifetime Pension, Centrelink will send you a letter at the beginning of each financial year requesting you to provide details of your new annual adjusted pension payment. You can get this information either from the Lifetime Pension Member Benefit Statement that we will send you in July, or you can download a current version below.
        </Typography>
      </Section>

      {/* Beneficiary section */}
      <Section title="Beneficiaries" action={{ label: 'Manage beneficiaries', href: '/member-online/beneficiaries' }}>
        <DetailRow label="Option:" value="Spouse Protection" />
        <DetailRow label="Spouse:" value="Jane Rialto" />
        <DetailRow label="Phone:" value="0412 345 678" />
        <Box sx={{ display: 'flex', py: 1.5 }}>
          <Typography variant="body" sx={{ color: 'text.muted', width: '40%', flexShrink: 0 }}>
            Email:
          </Typography>
          <Typography variant="body" sx={{ fontWeight: 600, color: 'text.primary' }}>
            jane.rialto@email.com.au
          </Typography>
        </Box>
      </Section>
    </Stack>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

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


'use client';

import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { Theme } from '@mui/material/styles';
import { useRouter } from 'next/navigation';
import { Chip } from '../../../../components/Chip';
import type { ChipSeverity } from '../../../../components/Chip';
import { Icon } from '../../../../components/Icon';
import { TextButton } from '../../../../components/TextButton';
import { InvestmentOverviewSkeleton } from '../../../../components/InvestmentOverview';
import { CurrentMixSummary } from '../../../../components/InvestmentOverview/CurrentMixSummary';
import { ContentContainer } from '../../../../components/MemberOnline';
import { MOCK_ACCOUNTS, MOCK_INVESTMENT_OPTIONS, accountDials } from '../../../../features/investment-mix/mockData';
import type { InvestmentAccount } from '../../../../features/investment-mix/types';

interface IncomeAccountDetail {
  paymentAmount: string;
  frequency: string;
  nextPaymentDate: string;
  payFromLabel: string;
  payFromPercent: string;
  bankAccountName: string;
  bank: string;
  bsb: string;
  accountNumber: string;
  minimumPayment: string;
  paymentsToDate: string;
}

interface Application {
  id: string;
  accountType: string;
  status: string;
  severity: ChipSeverity;
  startedAt: string;
  continuePath: string;
}

const INCOME_ACCOUNT_DETAILS: Record<string, IncomeAccountDetail> = {
  'acc-lp': {
    paymentAmount: '$3,021.15',
    frequency: 'Fortnightly',
    nextPaymentDate: '30 Jun 2026',
    payFromLabel: 'Pooled Lifetime Pension',
    payFromPercent: '100%',
    bankAccountName: 'Z O Oeter',
    bank: 'ANZ-Merged',
    bsb: '012-290',
    accountNumber: '******210',
    minimumPayment: '—',
    paymentsToDate: '$3,021.15',
  },
  'acc-002': {
    paymentAmount: '$1,509.24',
    frequency: 'Fortnightly',
    nextPaymentDate: '30 Jun 2026',
    payFromLabel: 'Cash',
    payFromPercent: '100%',
    bankAccountName: 'Z O Oeter',
    bank: 'ANZ-Merged',
    bsb: '012-290',
    accountNumber: '******210',
    minimumPayment: '$39,240.00',
    paymentsToDate: '$34,712.52',
  },
};

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
    accountType: 'Transition to Retirement account',
    status: 'Submitted',
    severity: 'success',
    startedAt: '8 Jun 2026',
    continuePath: '/member-online/lifetime-pension/view-application',
  },
  {
    id: 'app-003',
    accountType: 'Lifetime Pension',
    status: 'Verification required',
    severity: 'warning',
    startedAt: '12 Jun 2026',
    continuePath: '/member-online/lifetime-pension/submitted',
  },
];

const LIFETIME_PENSION_ACCOUNT: InvestmentAccount = {
  id: 'acc-lp',
  name: 'Lifetime Pension',
  accountNumber: '555 123 456',
  balance: 250000.0,
  openedAt: '2026-06-01',
  isIncomeAccount: true,
};

const INCOME_ACCOUNTS = [
  ...MOCK_ACCOUNTS.filter((a) => a.isIncomeAccount),
  LIFETIME_PENSION_ACCOUNT,
];
const FORM_PATH = '/member-online/investments/manage-investments/change-mix';
const HISTORY_PATH = '/member-online/investments/manage-investments/history';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
function formatDate(iso: string) {
  const d = new Date(iso);
  return `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
}
function formatCurrency(n: number) {
  return new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD' }).format(n);
}

// A label/value row used inside the inline white cards
function DetailRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
        columnGap: 2,
        rowGap: { xs: 0.5, sm: 0 },
        alignItems: 'center',
        py: 1.5,
        borderTop: '1px solid',
        borderTopColor: 'border.subtle',
      }}
    >
      <Typography variant="body" component="dt" sx={{ color: 'text.primary' }}>
        {label}
      </Typography>
      <Typography variant="body" component="dd" sx={{ m: 0, color: 'text.primary' }}>
        {children}
      </Typography>
    </Box>
  );
}

// White card styled like a DialItem, used for Bank account & Payment limits
function InlineCard({ title, footnote, children }: { title: string; footnote?: string; children: React.ReactNode }) {
  return (
    <Stack spacing={1}>
      <Box
        sx={(t: Theme) => ({
          backgroundColor: 'background.paper',
          border: '1px solid',
          borderColor: 'border.default',
          borderRadius: `${t.shape.sm}px`,
          p: 2.5,
        })}
      >
        <Typography variant="h6" sx={{ mb: 0.5, color: 'text.heading' }}>{title}</Typography>
        <Box component="dl" sx={{ m: 0 }}>
          {children}
        </Box>
      </Box>
      {footnote && (
        <Typography variant="small" sx={{ color: 'text.muted', px: 0.5 }}>
          {footnote}
        </Typography>
      )}
    </Stack>
  );
}

function FooterAction({ label, onClick, position }: { label: string; onClick: () => void; position: 'left' | 'right' }) {
  return (
    <Box
      component="button"
      type="button"
      onClick={onClick}
      sx={(t: Theme) => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        border: 'none',
        backgroundColor: 'transparent',
        cursor: 'pointer',
        fontFamily: 'inherit',
        color: 'primary.main',
        outline: 'none',
        transition: 'background-color 200ms ease',
        ...(position === 'right' && {
          borderLeftWidth: '1px',
          borderLeftStyle: 'solid',
          borderLeftColor: 'border.subtle',
        }),
        borderRadius: position === 'left' ? `0 0 0 ${t.shape.lg}px` : `0 0 ${t.shape.lg}px 0`,
        '&:hover': { backgroundColor: t.palette.action.hover },
        '&:focus-visible': {
          outline: '2px solid',
          outlineColor: 'border.focus',
          outlineOffset: 2,
          position: 'relative',
          zIndex: 1,
        },
      })}
    >
      <Typography variant="body" sx={{ fontWeight: 700 }}>{label}</Typography>
    </Box>
  );
}

function IncomeAccountCard({
  account,
  detail,
  balanceDate,
  onEditPayments,
  onViewHistory,
}: {
  account: InvestmentAccount;
  detail: IncomeAccountDetail | undefined;
  balanceDate: string;
  onEditPayments: () => void;
  onViewHistory: () => void;
}) {
  const [expanded, setExpanded] = useState(true);
  const allDials = accountDials(account);
  const paymentsDial = allDials.find((d) => d.id === 'future') ?? allDials.find((d) => d.id === 'combined');

  const mappedDial = paymentsDial
    ? {
        id: paymentsDial.id as 'future' | 'combined',
        title: paymentsDial.id === 'combined' ? 'Payments' : paymentsDial.title,
        subtitle: paymentsDial.subtitle,
        allocations: paymentsDial.allocations,
        editLabel: paymentsDial.editLabel,
        onEdit: onEditPayments,
      }
    : null;

  return (
    <Box
      component="section"
      aria-label={`${account.name} summary`}
      sx={(t: Theme) => ({
        borderRadius: `${t.shape.lg}px`,
        backgroundColor: 'background.paper',
        border: '1px solid',
        borderColor: 'border.default',
        overflow: 'hidden',
      })}
    >
      <Box
        component="button"
        type="button"
        onClick={() => setExpanded((prev) => !prev)}
        aria-expanded={expanded}
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          px: 3,
          py: 2.5,
          width: '100%',
          border: 'none',
          bgcolor: 'transparent',
          cursor: 'pointer',
          textAlign: 'left',
          '&:focus-visible': { outline: '2px solid', outlineColor: 'border.focus', outlineOffset: -2 },
        }}
      >
        <Box
          sx={(t: Theme) => ({
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: t.spacing(6),
            height: t.spacing(6),
            borderRadius: '50%',
            backgroundColor: 'background.default',
            flexShrink: 0,
          })}
        >
          <Icon icon="money-simple-from-bracket" style="light" size="xl+" color="text.heading" />
        </Box>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography variant="h6">{account.name}</Typography>
          <Typography variant="small" sx={{ color: 'text.muted' }}>
            {'Total balance '}
            <Box component="span" sx={{ fontWeight: 700, color: 'text.primary' }}>
              {formatCurrency(account.balance)}
            </Box>
            {' · as at '}
            {formatDate(balanceDate)}
          </Typography>
        </Box>
        <Box
          sx={{
            ml: 'auto',
            flexShrink: 0,
            display: 'flex',
            color: 'text.muted',
            transition: 'transform 200ms ease',
            transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
        >
          <Icon icon="chevron-down" style="regular" size="md" />
        </Box>
      </Box>

      {expanded && mappedDial && (
        <Box
          sx={{
            borderTop: '1px solid',
            borderTopColor: 'border.subtle',
            backgroundColor: 'background.default',
            p: 1.5,
            display: 'flex',
            flexDirection: 'column',
            gap: 1.5,
          }}
        >
          {/* Payments card — dial + payment details combined */}
          <Box
            sx={(t: Theme) => ({
              backgroundColor: 'background.paper',
              border: '1px solid',
              borderColor: 'border.default',
              borderRadius: `${t.shape.sm}px`,
              p: 2.5,
            })}
          >
            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5, mb: 2 }}>
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography variant="h6">{mappedDial.title}</Typography>
                {mappedDial.subtitle && (
                  <Typography variant="small" sx={{ color: 'text.muted' }}>
                    {mappedDial.subtitle}
                  </Typography>
                )}
              </Box>
              {mappedDial.onEdit && (
                <Box
                  component="button"
                  type="button"
                  onClick={mappedDial.onEdit}
                  aria-label={mappedDial.editLabel ?? 'Edit payments'}
                  sx={(t: Theme) => ({
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: t.spacing(4),
                    height: t.spacing(4),
                    border: 'none',
                    bgcolor: 'transparent',
                    cursor: 'pointer',
                    color: 'primary.main',
                    borderRadius: `${t.shape.sm}px`,
                    flexShrink: 0,
                    '&:hover': { bgcolor: 'action.hover' },
                    '&:focus-visible': { outline: '2px solid', outlineColor: 'border.focus', outlineOffset: 2 },
                  })}
                >
                  <Icon icon="pen-to-square" style="regular" size="md" color="primary.main" />
                </Box>
              )}
            </Box>

            {Object.values(mappedDial.allocations).some((v) => v > 0) && (
              <CurrentMixSummary options={MOCK_INVESTMENT_OPTIONS} allocations={mappedDial.allocations} />
            )}

            {detail && (
              <>
                <Box component="dl" sx={{ m: 0, mt: 2 }}>
                  <DetailRow label="Payment Amount">{detail.paymentAmount}</DetailRow>
                  <DetailRow label="Frequency">{detail.frequency}</DetailRow>
                  <DetailRow label="Next Payment Date">{detail.nextPaymentDate}</DetailRow>
                </Box>
              </>
            )}
          </Box>

          {detail && (
            <>
              <InlineCard title="Bank account">
                <DetailRow label="Account Name">{detail.bankAccountName}</DetailRow>
                <DetailRow label="Bank">{detail.bank}</DetailRow>
                <DetailRow label="BSB">{detail.bsb}</DetailRow>
                <DetailRow label="Account Number">{detail.accountNumber}</DetailRow>
              </InlineCard>

              <InlineCard
                title="Payment limits"
                footnote="* Note lump sum withdrawals don't count towards your minimum and maximum payment limits."
              >
                <DetailRow label="Minimum payment">{detail.minimumPayment}</DetailRow>
                <DetailRow label="Payments to date">
                  <Box component="a" href="#" sx={{ color: 'primary.main', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                    {detail.paymentsToDate}
                  </Box>
                </DetailRow>
              </InlineCard>
            </>
          )}

        </Box>
      )}

      {expanded && <Box
        sx={(t: Theme) => ({
          borderTop: '1px solid',
          borderTopColor: 'border.subtle',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          height: t.spacing(7),
        })}
      >
        <FooterAction label="Edit payments" onClick={onEditPayments} position="left" />
        <FooterAction label="Withdraw" onClick={onViewHistory} position="right" />
      </Box>}
    </Box>
  );
}

export default function ManageIncomeAccountsPage() {
  const router = useRouter();
  const balanceDate = new Date().toISOString();

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ContentContainer size="md">
      <Stack spacing={1.5} sx={{ pb: 4 }}>
        <Typography variant="h1" component="h1">Manage income accounts</Typography>
        <Typography variant="lead">
          View and manage your active income accounts and any applications currently in progress.
        </Typography>
      </Stack>

      {MOCK_APPLICATIONS.length > 0 && (() => {
        const pending = MOCK_APPLICATIONS.filter((a) => a.status !== 'Submitted');
        const submitted = MOCK_APPLICATIONS.filter((a) => a.status === 'Submitted');
        const ordered = [...pending, ...submitted];

        return (
          <Box
            sx={(t: Theme) => ({
              mb: 5,
              border: '1px solid',
              borderColor: 'border.default',
              borderRadius: `${t.shape.lg}px`,
              overflow: 'hidden',
            })}
          >
            <Box sx={{ px: 3, py: 2, bgcolor: 'background.default', borderBottom: '1px solid', borderBottomColor: 'border.subtle' }}>
              <Typography variant="h5">My applications</Typography>
            </Box>
            <Stack spacing={0} sx={{ bgcolor: 'background.paper' }}>
              {ordered.map((app, i) => {
                const isSubmitted = app.status === 'Submitted';
                const isFirstSubmitted = isSubmitted && ordered[i - 1]?.status !== 'Submitted';
                return (
                  <Box
                    key={app.id}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: 2,
                      px: 3,
                      py: 2,
                      bgcolor: isSubmitted ? 'background.default' : 'background.paper',
                      borderTop: '1px solid',
                      borderTopColor: isFirstSubmitted ? 'border.default' : 'border.subtle',
                      ...(i === 0 && { borderTop: 'none' }),
                    }}
                  >
                    <Stack spacing={0.5}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                        <Typography variant="h6" sx={{ color: 'text.heading' }}>{app.accountType}</Typography>
                        <Chip label={app.status} severity={app.severity} size="small" />
                      </Box>
                      <Typography variant="small" sx={{ color: 'text.muted' }}>
                        {isSubmitted ? 'Submitted' : 'Started'} {app.startedAt}
                      </Typography>
                    </Stack>
                    <TextButton
                      label={isSubmitted ? 'View application' : 'Continue'}
                      endIcon="arrow-right"
                      onClick={() => router.push(app.continuePath)}
                    />
                  </Box>
                );
              })}
            </Stack>
          </Box>
        );
      })()}

      {INCOME_ACCOUNTS.length > 0 && (
        <Stack spacing={2}>
          <Typography variant="h5">Income accounts</Typography>
          <Stack spacing={3}>
            {loading
              ? INCOME_ACCOUNTS.map((account) => <InvestmentOverviewSkeleton key={account.id} />)
              : INCOME_ACCOUNTS.map((account) => (
                  <IncomeAccountCard
                    key={account.id}
                    account={account}
                    detail={INCOME_ACCOUNT_DETAILS[account.id]}
                    balanceDate={balanceDate}
                    onEditPayments={() => router.push(`${FORM_PATH}?account=${account.id}&applyTo=income-future`)}
                    onViewHistory={() => router.push(`${HISTORY_PATH}?account=${account.id}`)}
                  />
                ))}
          </Stack>
        </Stack>
      )}
    </ContentContainer>
  );
}

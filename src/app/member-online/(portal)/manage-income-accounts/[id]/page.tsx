'use client';

import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { Theme } from '@mui/material/styles';
import { useRouter, useParams } from 'next/navigation';
import { Icon } from '../../../../../components/Icon';
import { TextButton } from '../../../../../components/TextButton';
import { ContentContainer, MOBreadcrumb } from '../../../../../components/MemberOnline';
import { InvestmentOverview, InvestmentOverviewSkeleton } from '../../../../../components/InvestmentOverview';
import { MOCK_INVESTMENT_OPTIONS, accountDials } from '../../../../../features/investment-mix/mockData';
import type { InvestmentAccount } from '../../../../../features/investment-mix/types';

// ─── Types ────────────────────────────────────────────────────────────────────

interface Beneficiary {
  name: string;
  relationship: string;
  share: string;
  type: 'binding' | 'non-binding';
}

interface CentrelinkScheduleRow {
  date: string;
  grossAmount: string;
  taxFreeComponent: string;
  taxableComponent: string;
}

interface AccountDetail {
  id: string;
  name: string;
  memberNumber: string;
  balance: number;
  status: 'active' | 'closed';
  openedAt: string;
  paymentAmount: string;
  frequency: string;
  nextPaymentDate: string;
  bankAccountName: string;
  bank: string;
  bsb: string;
  accountNumber: string;
  minimumPayment: string;
  paymentsToDate: string;
  beneficiaries: Beneficiary[];
  centrelinkSchedule: CentrelinkScheduleRow[];
  investmentAccount: InvestmentAccount;
}

// ─── Mock data ────────────────────────────────────────────────────────────────

const MOCK_DETAILS: Record<string, AccountDetail> = {
  'acc-ria': {
    id: 'acc-ria',
    name: 'Retirement Income Account',
    memberNumber: '#ACC-235896',
    balance: 1289130.55,
    status: 'active',
    openedAt: '1 Jul 2024',
    paymentAmount: '$2,847.65',
    frequency: 'Fortnightly',
    nextPaymentDate: '15 Oct 2025',
    bankAccountName: 'Z O Oeter',
    bank: 'ANZ',
    bsb: '012-290',
    accountNumber: '******210',
    minimumPayment: '$39,240.00',
    paymentsToDate: '$34,712.52',
    beneficiaries: [
      { name: 'Janet Oeter', relationship: 'Spouse', share: '100%', type: 'binding' },
    ],
    centrelinkSchedule: [
      { date: '1 Jul 2025', grossAmount: '$34,171.80', taxFreeComponent: '$34,171.80', taxableComponent: '$0.00' },
      { date: '1 Jul 2026', grossAmount: '$35,025.60', taxFreeComponent: '$35,025.60', taxableComponent: '$0.00' },
      { date: '1 Jul 2027', grossAmount: '$35,901.24', taxFreeComponent: '$35,901.24', taxableComponent: '$0.00' },
    ],
    investmentAccount: {
      id: 'acc-002',
      name: 'Retirement Income account',
      accountNumber: '#ACC-235896',
      balance: 1289130.55,
      openedAt: '2024-07-01',
      isIncomeAccount: true,
    },
  },
  'acc-ria-2': {
    id: 'acc-ria-2',
    name: 'Retirement Income Account',
    memberNumber: '#ACC-235897',
    balance: 89130.55,
    status: 'active',
    openedAt: '15 Mar 2023',
    paymentAmount: '$1,509.24',
    frequency: 'Monthly',
    nextPaymentDate: '1 Nov 2025',
    bankAccountName: 'Z O Oeter',
    bank: 'Commonwealth Bank',
    bsb: '062-000',
    accountNumber: '******501',
    minimumPayment: '$18,600.00',
    paymentsToDate: '$12,480.00',
    beneficiaries: [
      { name: 'Samuel Oeter', relationship: 'Child', share: '50%', type: 'non-binding' },
      { name: 'Clara Oeter', relationship: 'Child', share: '50%', type: 'non-binding' },
    ],
    centrelinkSchedule: [
      { date: '1 Jul 2025', grossAmount: '$18,600.00', taxFreeComponent: '$18,600.00', taxableComponent: '$0.00' },
      { date: '1 Jul 2026', grossAmount: '$19,065.00', taxFreeComponent: '$19,065.00', taxableComponent: '$0.00' },
    ],
    investmentAccount: {
      id: 'acc-002',
      name: 'Retirement Income account',
      accountNumber: '#ACC-235897',
      balance: 89130.55,
      openedAt: '2023-03-15',
      isIncomeAccount: true,
    },
  },
  'acc-lp': {
    id: 'acc-lp',
    name: 'Lifetime Pension',
    memberNumber: '#ACC-235898',
    balance: 180.99,
    status: 'active',
    openedAt: '1 Jun 2026',
    paymentAmount: '$3,021.15',
    frequency: 'Fortnightly',
    nextPaymentDate: '30 Jun 2026',
    bankAccountName: 'Z O Oeter',
    bank: 'ANZ-Merged',
    bsb: '012-290',
    accountNumber: '******210',
    minimumPayment: '—',
    paymentsToDate: '$3,021.15',
    beneficiaries: [
      { name: 'Janet Oeter', relationship: 'Spouse', share: '100%', type: 'binding' },
    ],
    centrelinkSchedule: [
      { date: '1 Jul 2025', grossAmount: '$36,253.80', taxFreeComponent: '$36,253.80', taxableComponent: '$0.00' },
      { date: '1 Jul 2026', grossAmount: '$37,160.16', taxFreeComponent: '$37,160.16', taxableComponent: '$0.00' },
    ],
    investmentAccount: {
      id: 'acc-lp',
      name: 'Lifetime Pension',
      accountNumber: '#ACC-235898',
      balance: 180.99,
      openedAt: '2026-06-01',
      isIncomeAccount: true,
    },
  },
  'acc-ttr': {
    id: 'acc-ttr',
    name: 'Retirement Income Account',
    memberNumber: '#ACC-235899',
    balance: 0.77,
    status: 'active',
    openedAt: '12 Jan 2022',
    paymentAmount: '$500.00',
    frequency: 'Monthly',
    nextPaymentDate: '1 Nov 2025',
    bankAccountName: 'Z O Oeter',
    bank: 'Westpac',
    bsb: '032-000',
    accountNumber: '******789',
    minimumPayment: '$2,000.00',
    paymentsToDate: '$1,500.00',
    beneficiaries: [],
    centrelinkSchedule: [],
    investmentAccount: {
      id: 'acc-002',
      name: 'Retirement Income account',
      accountNumber: '#ACC-235899',
      balance: 0.77,
      openedAt: '2022-01-12',
      isIncomeAccount: true,
    },
  },
  'acc-closed-1': {
    id: 'acc-closed-1',
    name: 'Retirement Income Account',
    memberNumber: '#ACC-235900',
    balance: 0,
    status: 'closed',
    openedAt: '3 Feb 2018',
    paymentAmount: '$0.00',
    frequency: '—',
    nextPaymentDate: '—',
    bankAccountName: '—',
    bank: '—',
    bsb: '—',
    accountNumber: '—',
    minimumPayment: '—',
    paymentsToDate: '$0.00',
    beneficiaries: [],
    centrelinkSchedule: [],
    investmentAccount: {
      id: 'acc-closed-1',
      name: 'Retirement Income Account',
      accountNumber: '#ACC-235900',
      balance: 0,
      isIncomeAccount: true,
    },
  },
  'acc-closed-2': {
    id: 'acc-closed-2',
    name: 'Retirement Income Account',
    memberNumber: '#ACC-235901',
    balance: 0,
    status: 'closed',
    openedAt: '14 May 2015',
    paymentAmount: '$0.00',
    frequency: '—',
    nextPaymentDate: '—',
    bankAccountName: '—',
    bank: '—',
    bsb: '—',
    accountNumber: '—',
    minimumPayment: '—',
    paymentsToDate: '$0.00',
    beneficiaries: [],
    centrelinkSchedule: [],
    investmentAccount: {
      id: 'acc-closed-2',
      name: 'Retirement Income Account',
      accountNumber: '#ACC-235901',
      balance: 0,
      isIncomeAccount: true,
    },
  },
};

const FORM_PATH = '/member-online/investments/manage-investments/change-mix';
const HISTORY_PATH = '/member-online/investments/manage-investments/history';

// ─── Sub-components ───────────────────────────────────────────────────────────

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <Typography variant="h5" sx={{ mb: 2.5 }}>
      {children}
    </Typography>
  );
}

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
      <Typography variant="body" component="dt" sx={{ color: 'text.muted' }}>
        {label}
      </Typography>
      <Typography variant="body" component="dd" sx={{ m: 0, color: 'text.primary', fontWeight: 500 }}>
        {children}
      </Typography>
    </Box>
  );
}

function InlineCard({
  title,
  footnote,
  action,
  children,
}: {
  title: string;
  footnote?: string;
  action?: { label: string; onClick: () => void };
  children: React.ReactNode;
}) {
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
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 0.5 }}>
          <Typography variant="h6" sx={{ color: 'text.heading' }}>{title}</Typography>
          {action && (
            <TextButton label={action.label} onClick={action.onClick} size="small" />
          )}
        </Box>
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

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function IncomeAccountDetailPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const id = params.id;

  const detail = MOCK_DETAILS[id];

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const isClosed = detail?.status === 'closed';

  const dials = detail
    ? accountDials(detail.investmentAccount).map((d) =>
        d.id === 'combined'
          ? { id: d.id, title: d.title, subtitle: d.subtitle, allocations: d.allocations, rebalancing: d.rebalancing }
          : {
              id: d.id,
              title: d.title,
              subtitle: d.subtitle,
              allocations: d.allocations,
              editLabel: d.editLabel,
              onEdit: () => router.push(`${FORM_PATH}?account=${detail.investmentAccount.id}&applyTo=${d.applyTo}`),
              rebalancing: d.rebalancing,
            },
      )
    : [];

  // 404-style fallback
  if (!detail) {
    return (
      <ContentContainer size="md">
        <MOBreadcrumb
          items={[{ label: 'Income accounts', href: '/member-online/manage-income-accounts' }, { label: 'Account not found' }]}
          onBack={() => router.push('/member-online/manage-income-accounts')}
        />
        <Box sx={{ mt: 6, textAlign: 'center' }}>
          <Typography variant="h3">Account not found</Typography>
          <Typography variant="body" sx={{ color: 'text.muted', mt: 1, display: 'block' }}>
            This account could not be found. It may have been removed or the link is incorrect.
          </Typography>
        </Box>
      </ContentContainer>
    );
  }

  return (
    <ContentContainer size="md">
      {/* Breadcrumb */}
      <Box sx={{ mb: 4 }}>
        <MOBreadcrumb
          items={[
            { label: 'Income accounts', href: '/member-online/manage-income-accounts' },
            { label: detail.name },
          ]}
          onBack={() => router.push('/member-online/manage-income-accounts')}
        />
      </Box>

      {/* Page header */}
      <Stack spacing={1} sx={{ pb: 5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap' }}>
          <Typography variant="h1">{detail.name}</Typography>
          {isClosed && (
            <Typography
              variant="small"
              sx={{
                px: 1.5,
                py: 0.5,
                borderRadius: '999px',
                border: '1px solid',
                borderColor: 'border.default',
                color: 'text.muted',
                fontWeight: 600,
              }}
            >
              Closed
            </Typography>
          )}
        </Box>
        <Typography variant="body" sx={{ color: 'text.muted' }}>
          Member number: {detail.memberNumber} · Opened {detail.openedAt}
        </Typography>
        <Typography variant="display-5" sx={{ color: 'text.heading', fontWeight: 700, pt: 1 }}>
          {new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD' }).format(detail.balance)}
        </Typography>
        <Typography variant="small" sx={{ color: 'text.muted' }}>Total balance</Typography>
      </Stack>

      <Stack spacing={5} divider={<Divider />}>
        {/* Investment mix */}
        {!isClosed && (
          <Stack spacing={0}>
            <SectionHeading>Investments</SectionHeading>
            {loading ? (
              <InvestmentOverviewSkeleton />
            ) : (
              <InvestmentOverview
                accountName={detail.name}
                totalBalance={detail.balance}
                balanceDate={new Date().toISOString()}
                isIncomeAccount={detail.investmentAccount.isIncomeAccount}
                options={MOCK_INVESTMENT_OPTIONS}
                dials={dials}
                changeAllLabel={dials.length === 1 ? 'Change mix' : 'Change all'}
                onChangeAll={() => router.push(`${FORM_PATH}?account=${detail.investmentAccount.id}`)}
                onViewHistory={() => router.push(`${HISTORY_PATH}?account=${detail.investmentAccount.id}`)}
              />
            )}
          </Stack>
        )}

        {/* Payments */}
        {!isClosed && (
          <Stack spacing={2.5}>
            <SectionHeading>Payments</SectionHeading>
            <InlineCard
              title="Payment details"
              action={{ label: 'Edit payments', onClick: () => router.push(`${FORM_PATH}?account=${detail.investmentAccount.id}&applyTo=income-future`) }}
            >
              <DetailRow label="Payment amount">{detail.paymentAmount}</DetailRow>
              <DetailRow label="Frequency">{detail.frequency}</DetailRow>
              <DetailRow label="Next payment date">{detail.nextPaymentDate}</DetailRow>
            </InlineCard>
            <InlineCard
              title="Bank account"
              action={{ label: 'Edit', onClick: () => {} }}
            >
              <DetailRow label="Account name">{detail.bankAccountName}</DetailRow>
              <DetailRow label="Bank">{detail.bank}</DetailRow>
              <DetailRow label="BSB">{detail.bsb}</DetailRow>
              <DetailRow label="Account number">{detail.accountNumber}</DetailRow>
            </InlineCard>
            <InlineCard
              title="Payment limits"
              footnote="* Lump sum withdrawals don't count towards your minimum and maximum payment limits."
            >
              <DetailRow label="Minimum payment">{detail.minimumPayment}</DetailRow>
              <DetailRow label="Payments to date">
                <Box
                  component="a"
                  href="#"
                  sx={{ color: 'primary.main', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
                >
                  {detail.paymentsToDate}
                </Box>
              </DetailRow>
            </InlineCard>
          </Stack>
        )}

        {/* Beneficiaries */}
        <Stack spacing={2.5}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <SectionHeading>Beneficiaries</SectionHeading>
            {!isClosed && <TextButton label="Edit beneficiaries" onClick={() => {}} />}
          </Box>
          {detail.beneficiaries.length === 0 ? (
            <Box
              sx={(t: Theme) => ({
                border: '1px solid',
                borderColor: 'border.default',
                borderRadius: `${t.shape.sm}px`,
                p: 3,
                textAlign: 'center',
              })}
            >
              <Typography variant="body" sx={{ color: 'text.muted' }}>
                No beneficiaries have been nominated for this account.
              </Typography>
              {!isClosed && (
                <Box sx={{ mt: 1.5 }}>
                  <TextButton label="Add a beneficiary" endIcon="plus" onClick={() => {}} />
                </Box>
              )}
            </Box>
          ) : (
            <Box
              sx={(t: Theme) => ({
                border: '1px solid',
                borderColor: 'border.default',
                borderRadius: `${t.shape.sm}px`,
                overflow: 'hidden',
              })}
            >
              {detail.beneficiaries.map((b, i) => (
                <Box
                  key={i}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    px: 3,
                    py: 2,
                    borderBottom: i < detail.beneficiaries.length - 1 ? '1px solid' : 'none',
                    borderBottomColor: 'border.subtle',
                    bgcolor: 'background.paper',
                  }}
                >
                  <Box
                    sx={(t: Theme) => ({
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: t.spacing(5),
                      height: t.spacing(5),
                      borderRadius: '50%',
                      bgcolor: 'background.default',
                      flexShrink: 0,
                    })}
                  >
                    <Icon icon="user" style="light" size="md" color="text.muted" />
                  </Box>
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography variant="body" sx={{ fontWeight: 700, color: 'text.heading', display: 'block' }}>
                      {b.name}
                    </Typography>
                    <Typography variant="small" sx={{ color: 'text.muted' }}>
                      {b.relationship} · {b.type === 'binding' ? 'Binding nomination' : 'Non-binding nomination'}
                    </Typography>
                  </Box>
                  <Typography variant="body" sx={{ fontWeight: 700, color: 'text.heading', flexShrink: 0 }}>
                    {b.share}
                  </Typography>
                </Box>
              ))}
            </Box>
          )}
        </Stack>

        {/* Centrelink schedule */}
        <Stack spacing={2.5}>
          <SectionHeading>Centrelink schedule</SectionHeading>
          {detail.centrelinkSchedule.length === 0 ? (
            <Box
              sx={(t: Theme) => ({
                border: '1px solid',
                borderColor: 'border.default',
                borderRadius: `${t.shape.sm}px`,
                p: 3,
                textAlign: 'center',
              })}
            >
              <Typography variant="body" sx={{ color: 'text.muted' }}>
                No Centrelink schedule is available for this account.
              </Typography>
            </Box>
          ) : (
            <Box
              sx={(t: Theme) => ({
                border: '1px solid',
                borderColor: 'border.default',
                borderRadius: `${t.shape.sm}px`,
                overflow: 'hidden',
              })}
            >
              {/* Table header */}
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr 1fr', sm: '1fr 1fr 1fr 1fr' },
                  gap: 1,
                  px: 3,
                  py: 1.5,
                  bgcolor: 'background.default',
                  borderBottom: '1px solid',
                  borderBottomColor: 'border.default',
                }}
              >
                {['Date', 'Gross amount', 'Tax-free component', 'Taxable component'].map((h) => (
                  <Typography key={h} variant="small" sx={{ fontWeight: 700, color: 'text.muted' }}>
                    {h}
                  </Typography>
                ))}
              </Box>
              {/* Rows */}
              {detail.centrelinkSchedule.map((row, i) => (
                <Box
                  key={i}
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr 1fr', sm: '1fr 1fr 1fr 1fr' },
                    gap: 1,
                    px: 3,
                    py: 2,
                    borderBottom: i < detail.centrelinkSchedule.length - 1 ? '1px solid' : 'none',
                    borderBottomColor: 'border.subtle',
                    bgcolor: 'background.paper',
                  }}
                >
                  <Typography variant="body">{row.date}</Typography>
                  <Typography variant="body">{row.grossAmount}</Typography>
                  <Typography variant="body" sx={{ display: { xs: 'none', sm: 'block' } }}>{row.taxFreeComponent}</Typography>
                  <Typography variant="body" sx={{ display: { xs: 'none', sm: 'block' } }}>{row.taxableComponent}</Typography>
                </Box>
              ))}
            </Box>
          )}
        </Stack>
      </Stack>
    </ContentContainer>
  );
}

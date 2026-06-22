'use client';

import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useRouter, useParams } from 'next/navigation';
import { ContentContainer, MOBreadcrumb } from '../../../../../components/MemberOnline';
import { InvestmentOverview, InvestmentOverviewSkeleton } from '../../../../../components/InvestmentOverview';
import { MOCK_INVESTMENT_OPTIONS, accountDials } from '../../../../../features/investment-mix/mockData';
import { MOCK_DETAILS } from './mockData';
import { SectionHeading } from './parts';
import { PaymentsSection, BeneficiariesSection } from './sections';
import { CentrelinkScheduleSection } from './CentrelinkScheduleSection';

const FORM_PATH = '/member-online/investments/manage-investments/change-mix';
const HISTORY_PATH = '/member-online/investments/manage-investments/history';

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
          <PaymentsSection
            detail={detail}
            onEditPayments={() => router.push(`${FORM_PATH}?account=${detail.investmentAccount.id}&applyTo=income-future`)}
          />
        )}

        {/* Beneficiaries */}
        <BeneficiariesSection beneficiaries={detail.beneficiaries} isClosed={isClosed} />

        {/* Centrelink schedule */}
        <CentrelinkScheduleSection schedule={detail.centrelinkSchedule} />
      </Stack>
    </ContentContainer>
  );
}

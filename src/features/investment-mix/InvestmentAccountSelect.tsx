'use client';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ContentContainer } from '../../components/MemberOnline';
import { InvestmentOverview, InvestmentOverviewSkeleton } from '../../components/InvestmentOverview';
import type { InvestmentMixDial } from '../../components/InvestmentOverview';
import { MOCK_INVESTMENT_OPTIONS, accountDials } from './mockData';
import type { InvestmentAccount } from './types';

interface InvestmentAccountSelectProps {
  accounts: InvestmentAccount[];
  formPath: string;
  historyPath: string;
}

export function InvestmentAccountSelect({ accounts, formPath, historyPath }: InvestmentAccountSelectProps) {
  const router = useRouter();
  const balanceDate = new Date().toISOString();

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // The combined card has no per-card edit — the footer "Change mix" covers it.
  const buildDials = (account: InvestmentAccount): InvestmentMixDial[] =>
    accountDials(account).map((d) =>
      d.id === 'combined'
        ? { id: d.id, title: d.title, subtitle: d.subtitle, allocations: d.allocations, rebalancing: d.rebalancing }
        : {
            id: d.id,
            title: d.title,
            subtitle: d.subtitle,
            allocations: d.allocations,
            editLabel: d.editLabel,
            onEdit: () => router.push(`${formPath}?account=${account.id}&applyTo=${d.applyTo}`),
            rebalancing: d.rebalancing,
          },
    );

  return (
    <ContentContainer size="md">
      <Stack spacing={1.5} sx={{ pb: 4 }}>
        <Typography variant="h1" component="h1">
          Manage your investments
        </Typography>
        <Typography variant="lead">
          Review how your super is currently invested, keep an eye on your mix, and make changes
          whenever your goals or circumstances change.
        </Typography>
      </Stack>

      <Stack spacing={3}>
        {loading
          ? accounts.map((account) => <InvestmentOverviewSkeleton key={account.id} />)
          : accounts.map((account) => {
              const dials = buildDials(account);
              const combined = dials.length === 1;
              return (
                <InvestmentOverview
                  key={account.id}
                  accountName={account.name}
                  totalBalance={account.balance}
                  balanceDate={balanceDate}
                  isIncomeAccount={account.isIncomeAccount}
                  options={MOCK_INVESTMENT_OPTIONS}
                  dials={dials}
                  changeAllLabel={combined ? 'Change mix' : 'Change all'}
                  onChangeAll={() => router.push(`${formPath}?account=${account.id}`)}
                  onViewHistory={() => router.push(`${historyPath}?account=${account.id}`)}
                />
              );
            })}
      </Stack>
    </ContentContainer>
  );
}

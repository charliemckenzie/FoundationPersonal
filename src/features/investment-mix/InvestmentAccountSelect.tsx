'use client';

import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/navigation';
import { ContentContainer } from '../../components/MemberOnline';
import { TextButton } from '../../components/TextButton';
import { CurrentMixSummary } from './CurrentMixSummary';
import { MOCK_INVESTMENT_OPTIONS, currentMixForAccount } from './mockData';
import type { InvestmentAccount } from './types';
import { formatCurrency, formatDate } from './utils';

interface InvestmentAccountSelectProps {
  accounts: InvestmentAccount[];
  /** Base path for the change-mix form — each card links to `${formPath}?account={id}`. */
  formPath: string;
  /** Path to the investment mix history page — links as `${historyPath}?account={id}`. */
  historyPath: string;
}

export function InvestmentAccountSelect({ accounts, formPath, historyPath }: InvestmentAccountSelectProps) {
  const router = useRouter();
  const asAt = formatDate(new Date().toISOString());

  return (
    <ContentContainer size="md">
      <Box sx={{ py: 4 }}>
        <Stack spacing={1.5} sx={{ mb: 4 }}>
          <Typography variant="h1" component="h1" sx={{ pt: 2 }}>
            Manage your investments
          </Typography>
          <Typography variant="lead">
            Review how your super is currently invested, keep an eye on your mix, and make changes
            whenever your goals or circumstances change.
          </Typography>
        </Stack>

        <Stack spacing={3}>
          {accounts.map((account) => (
            <Box
              key={account.id}
              component="section"
              aria-labelledby={`mix-${account.id}`}
              sx={{
                border: '1px solid',
                borderColor: 'border.default',
                borderRadius: (t) => `${t.shape.xl}px`,
                p: 4,
              }}
            >
              <Stack spacing={2.5}>
                <div>
                  <Typography id={`mix-${account.id}`} variant="h5" component="h2">
                    {account.name}
                  </Typography>
                  <Typography variant="body" sx={{ mt: 0.5 }}>
                    Balance{' '}
                    <Box component="span" sx={{ fontWeight: 700 }}>
                      {formatCurrency(account.balance)}
                    </Box>{' '}
                    <Box component="span" sx={{ color: 'text.muted' }}>
                      as at {asAt}
                    </Box>
                  </Typography>
                </div>
                <CurrentMixSummary
                  options={MOCK_INVESTMENT_OPTIONS}
                  allocations={currentMixForAccount(account.id)}
                />
                <Stack direction="row" spacing={3} sx={{ flexWrap: 'wrap', rowGap: 1 }}>
                  <TextButton
                    label="Change investment mix"
                    endIcon="arrow-right"
                    onClick={() => router.push(`${formPath}?account=${account.id}`)}
                  />
                  <TextButton
                    label="View history"
                    endIcon="arrow-right"
                    onClick={() => router.push(`${historyPath}?account=${account.id}`)}
                  />
                </Stack>
              </Stack>
            </Box>
          ))}
        </Stack>
      </Box>
    </ContentContainer>
  );
}

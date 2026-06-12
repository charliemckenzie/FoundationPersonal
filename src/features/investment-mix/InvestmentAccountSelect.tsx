'use client';

import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/navigation';
import { LinkRow } from '../../components/LinkRow';
import { ContentContainer } from '../../components/MemberOnline';
import type { InvestmentAccount } from './types';
import { formatCurrency } from './utils';

interface InvestmentAccountSelectProps {
  accounts: InvestmentAccount[];
  /** Base path for the form page — each account links to `${formPath}?account={id}`. */
  formPath: string;
}

export function InvestmentAccountSelect({ accounts, formPath }: InvestmentAccountSelectProps) {
  const router = useRouter();

  const today = new Date();
  const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const asAt = `${today.getDate()} ${MONTHS[today.getMonth()]} ${today.getFullYear()}`;
  return (
    <ContentContainer size="md">
      <Box sx={{ py: 4 }}>
        <Stack spacing={1.5} sx={{ mb: 3 }}>
          <Typography variant="h1" component="h1" sx={{ pt: 2 }}>
            Change your investments
          </Typography>
          <Typography variant="lead">
            Updating your investment mix is straightforward and takes just a few minutes. You can
            revisit and adjust your choices at any time as your goals or circumstances change.
          </Typography>
        </Stack>

        <Box sx={{ borderBottom: '1px solid', borderColor: 'border.subtle', mb: 4 }} />

        <Stack spacing={2} sx={{ mb: 5, mt: 4 }}>
          <Stack spacing={0.5}>
            <Typography variant="h5" component="h2">
              Not sure where to start?
            </Typography>
            <Typography variant="body">
              Not sure what to choose? Get personal advice before you make any changes.
            </Typography>
          </Stack>
          <LinkRow
            icon="user-question"
            label="Online advice at no additional cost"
            description="Personal advice is available online at no additional cost for eligible members."
            href="#"
          />
        </Stack>

        <Stack spacing={2}>
          <Stack spacing={0.5}>
            <Typography variant="h5" component="h2">
              Ready to go?
            </Typography>
            <Typography variant="body">
              Select the account you would like to update and we will guide you through each step.
            </Typography>
          </Stack>
          <Stack spacing={2}>
            {accounts.map((account) => (
              <LinkRow
                key={account.id}
                icon={account.isIncomeAccount ? 'money-simple-from-bracket' : 'piggy-bank'}
                label={account.name}
                description={<>Account balance: <Box component="span" sx={{ fontWeight: 700 }}>{formatCurrency(account.balance)}</Box> <Box component="span" sx={{ color: 'text.muted' }}>As at {asAt}</Box></>}
                onClick={() => router.push(`${formPath}?account=${account.id}`)}
              />
            ))}
          </Stack>
        </Stack>
      </Box>
    </ContentContainer>
  );
}

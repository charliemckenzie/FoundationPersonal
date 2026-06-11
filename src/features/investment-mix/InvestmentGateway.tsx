'use client';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { LinkRow } from '../../components/LinkRow';
import { ContentContainer } from '../../components/MemberOnline';

interface InvestmentGatewayProps {
  basePath: string;
  /** Override the "I'm ready" link target. Defaults to `${basePath}/change-mix`. */
  introPath?: string;
}

export function InvestmentGateway({ basePath, introPath }: InvestmentGatewayProps) {
  return (
    <ContentContainer size="md">
      <Stack spacing={4} sx={{ py: 4 }}>
        <Typography variant="h2" component="h1">
          Change your investments
        </Typography>

<Stack spacing={1.5}>
          <Typography variant="body">
            Your investment mix determines how your super is invested — each option carries its own
            risk level, return profile, and fees, which can have a meaningful impact on your balance
            over time.
          </Typography>
          <Typography variant="body">
            Before making changes, make sure you understand what you're changing and why. If you're
            not sure, our online investment mix advice tool can help you find options that suit your
            goals and circumstances.
          </Typography>
        </Stack>

        <Stack spacing={2}>
          <LinkRow
            icon="arrow-pointer"
            label="I'm ready to change my investment mix"
            description="I know what I want and I'm ready to make the change."
            href={introPath ?? `${basePath}/change-mix`}
          />
          <LinkRow
            icon="magnifying-glass"
            label="I'd like some guidance first"
            description="Use our online investment mix advice tool to find options that suit you."
            href="#"
          />
        </Stack>
      </Stack>
    </ContentContainer>
  );
}

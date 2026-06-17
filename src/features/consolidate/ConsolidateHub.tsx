'use client';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Alert } from '@/components/Alert';
import { LinkRow } from '@/components/LinkRow';
import { ContentContainer } from '@/components/MemberOnline';
import { MOBreadcrumb } from '@/components/MemberOnline/MOBreadcrumb';

export interface ConsolidateHubProps {
  /** Base path for routing — e.g. '/member-online/consolidate' or '/qsuper/member-online/consolidate'. */
  basePath: string;
}

export function ConsolidateHub({ basePath }: ConsolidateHubProps) {
  return (
    <ContentContainer size="md">
      <MOBreadcrumb
        items={[
          { label: 'Member Online', href: `${basePath.replace('/consolidate', '')}` },
          { label: 'Consolidate your super' },
        ]}
      />

      <Stack spacing={3} sx={{ pb: 4 }}>
        <Stack spacing={1.5}>
          <Typography variant="h1" component="h1">
            Consolidate your super
          </Typography>
          <Typography variant="lead">
            Find and combine your super accounts into one place to reduce fees, simplify your
            finances, and keep better track of your retirement savings.
          </Typography>
        </Stack>

        <Alert severity="info" title="Before you consolidate">
          Consolidating your super may affect insurance cover or benefits with your other fund.
          Check your details before you proceed.
        </Alert>

        <Stack spacing={2} component="nav" aria-label="Consolidation options">
          <LinkRow
            label="Find my super (ATO SuperMatch)"
            description="We'll verify your identity, then search the ATO for super held in your name."
            icon="magnifying-glass-dollar"
            iconStyle="solid"
            href={`${basePath}/ato-supermatch`}
          />

          <LinkRow
            label="I know my fund details (Enter manually)"
            description="Enter your other fund's details and we'll arrange the transfer."
            icon="pen-to-square"
            iconStyle="solid"
            href={`${basePath}/manual`}
          />

          <LinkRow
            label="Self-managed super fund (SMSF)"
            description="Roll money from your SMSF. We'll check you're ready first."
            icon="building-columns"
            iconStyle="solid"
            href={`${basePath}/smsf`}
          />
        </Stack>
      </Stack>
    </ContentContainer>
  );
}

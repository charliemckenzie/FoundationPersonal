'use client';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/navigation';
import { ContentContainer } from '../../components/MemberOnline';
import { ManagedList } from '../../components/ManagedList';
import type { ManagedListItemProps } from '../../components/ManagedList/ManagedList.types';
import { useBeneficiaries } from './BeneficiariesContext';
import { formatDate, formatSubmittedAt, relationshipLabel, expiryLabel } from './utils';

interface BeneficiariesOverviewProps {
  basePath: string;
}

export function BeneficiariesOverview({ basePath }: BeneficiariesOverviewProps) {
  const router = useRouter();
  const { nomination, clearNomination } = useBeneficiaries();

  function handleUpdate() {
    router.push(`${basePath}/new`);
  }

  const items: ManagedListItemProps[] = nomination
    ? nomination.beneficiaries.map((b) => ({
        id: b.id,
        name: `${b.firstName} ${b.lastName}`,
        badge: `Allocation ${b.allocation}%`,
        metadata: [
          relationshipLabel(b.relationship),
          b.dateOfBirth ? formatDate(b.dateOfBirth) : '',
          [b.phone, b.email].filter((v): v is string => !!v).join(' · '),
        ].filter((v): v is string => !!v),
        metadataVariant: 'column' as const,
      }))
    : [];

  const panelDescription = nomination
    ? `Submitted ${formatSubmittedAt(nomination.submittedAt)} · ${expiryLabel(nomination.expiry)}`
    : 'No binding nominations submitted yet.';

  const addLabel = nomination ? 'Update nomination' : 'Add a binding nomination';

  return (
    <ContentContainer size="md">
      <Stack spacing={4} sx={{ py: 4 }}>
        <Typography variant="h2" component="h1">Beneficiaries</Typography>

        <Stack spacing={2}>
          <div>
            <Typography variant="h5" component="h2" sx={{ mb: 0.5 }}>Binding nominations</Typography>
            <Typography variant="body" sx={{ color: 'text.muted' }}>
              Review your nomination regularly and update them if your circumstances change.
            </Typography>
          </div>

          <ManagedList
            icon="circle-check"
            title="Your binding nominations"
            description={panelDescription}
            items={items}
            emptyMessage="No binding nominations on file"
            addLabel={addLabel}
            onAdd={handleUpdate}
            onRemoveAll={nomination ? clearNomination : undefined}
            itemVariant="list"
            metadataVariant="column"
          />
        </Stack>
      </Stack>
    </ContentContainer>
  );
}

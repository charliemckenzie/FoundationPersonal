'use client';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ContentContainer } from '../../components/MemberOnline';
import { Dialog } from '../../components/Dialog';
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

  const [confirmOpen, setConfirmOpen] = useState(false);

  // Mocked loading delay so the skeleton state can be tested in the running app.
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  function handleUpdate() {
    router.push(`${basePath}/new`);
  }

  function handleConfirmRemove() {
    clearNomination();
    setConfirmOpen(false);
  }

  const items: ManagedListItemProps[] = nomination
    ? nomination.beneficiaries.map((b) => {
        const isLPR = b.relationship === 'lpr';
        return {
          id: b.id,
          name: isLPR ? relationshipLabel(b.relationship) : `${b.firstName} ${b.lastName}`.trim(),
          allocation: { value: `${b.allocation}%` },
          metadata: [
            isLPR ? null : [relationshipLabel(b.relationship), b.dateOfBirth ? formatDate(b.dateOfBirth) : ''].filter(Boolean).join(' · '),
            [b.phone, b.email].filter((v): v is string => !!v).join(' · '),
          ].filter((v): v is string => !!v && v.length > 0),
          metadataVariant: 'column' as const,
        };
      })
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
            icon="flower-tulip"
            iconStyle="light"
            title="Your binding nominations"
            description={panelDescription}
            items={items}
            emptyMessage="No binding nominations on file"
            addLabel={addLabel}
            onAdd={handleUpdate}
            onRemoveAll={nomination ? () => setConfirmOpen(true) : undefined}
            itemVariant="list"
            metadataVariant="column"
            loading={loading}
            loadingItemCount={2}
          />
        </Stack>
      </Stack>

      <Dialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        variant="alert"
        title="Are you sure?"
        description="This will remove all beneficiaries that have been nominated."
        confirmLabel="Confirm"
        onConfirm={handleConfirmRemove}
      />
    </ContentContainer>
  );
}

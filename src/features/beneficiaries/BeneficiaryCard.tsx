'use client';

import { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Select } from '../../components/Select';
import { TextField } from '../../components/TextField';
import { DateOfBirthField } from '../../components/DateOfBirthField';
import { PercentageField } from '../../components/PercentageField';
import { TextButton } from '../../components/TextButton';
import { Dialog } from '../../components/Dialog';
import type { BeneficiaryDraft } from './types';
import type { BeneficiaryFieldErrors } from './utils';
import { RELATIONSHIP_OPTIONS } from './types';
import { formatDate, relationshipLabel } from './utils';

const RELATIONSHIP_INFO = [
  {
    label: 'Legal personal representative',
    description: 'The executor or administrator of your estate, or a person with legal authority to act on your behalf (e.g. power of attorney).',
  },
  {
    label: 'Spouse',
    description: 'Your legally married spouse or de facto partner at the time of your death.',
  },
  {
    label: 'Child',
    description: 'Your biological, adopted, or step-child of any age.',
  },
  {
    label: 'Interdependant',
    description: 'Someone who lives with you in a close personal relationship where you are financially and domestically interdependent.',
  },
  {
    label: 'Financial dependant',
    description: 'Someone who relies on you for regular financial support at the time of your death.',
  },
];

function buildOptions(lprTaken: boolean) {
  return RELATIONSHIP_OPTIONS.map((o) => ({
    value: o.value,
    label: o.value === 'lpr' && lprTaken ? `${o.label} (already nominated)` : o.label,
    disabled: o.value === 'lpr' && lprTaken,
  }));
}

function RelationshipInfoModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      title="Which relationship do I select?"
      size="medium"
      cancelLabel="Close"
    >
      <Stack spacing={2.5} sx={{ pt: 1 }}>
        {RELATIONSHIP_INFO.map(({ label, description }) => (
          <Box key={label}>
            <Typography variant="body" sx={{ fontWeight: 700, display: 'block', mb: 0.5 }}>{label}</Typography>
            <Typography variant="body">{description}</Typography>
          </Box>
        ))}
      </Stack>
    </Dialog>
  );
}

export function CollapsedHeader({ draft, index }: { draft: BeneficiaryDraft; index: number }) {
  const isLpr = draft.relationship === 'lpr';
  const name = isLpr
    ? 'Legal personal representative'
    : [draft.firstName, draft.lastName].filter(Boolean).join(' ') || `Beneficiary ${index + 1}`;
  const meta = isLpr
    ? null
    : [draft.relationship ? relationshipLabel(draft.relationship) : null, draft.dateOfBirth ? formatDate(draft.dateOfBirth) : null]
        .filter(Boolean).join(' · ');

  return (
    <Box component="span" sx={{ display: 'block', minWidth: 0 }}>
      <Typography component="span" variant="body" sx={{ fontWeight: 700, display: 'block' }}>{name}</Typography>
      {meta && <Typography component="span" variant="small" sx={{ color: 'text.muted', display: 'block' }}>{meta}</Typography>}
    </Box>
  );
}

export function BeneficiaryForm({
  draft,
  lprTaken,
  errors,
  onChange,
}: {
  draft: BeneficiaryDraft;
  lprTaken: boolean;
  errors?: BeneficiaryFieldErrors;
  onChange: (field: keyof BeneficiaryDraft, value: string | number | null) => void;
}) {
  const [infoOpen, setInfoOpen] = useState(false);
  const isLpr = draft.relationship === 'lpr';
  const hasRelationship = !!draft.relationship;
  const e = errors ?? {};

  return (
    <Stack spacing={2.5}>
      <Stack spacing={1}>
        <Select
          label="Relationship"
          options={buildOptions(lprTaken)}
          value={draft.relationship}
          onChange={(v) => onChange('relationship', v)}
          error={!!e.relationship}
          errorMessage={e.relationship}
          required
          fullWidth
          placeholder="Select relationship"
        />
        <Box>
          <TextButton label="Which relationship do I select?" size="small" hideIcon onClick={() => setInfoOpen(true)} />
        </Box>
      </Stack>

      {hasRelationship && !isLpr && (
        <>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField label="First name" value={draft.firstName} onChange={(ev) => onChange('firstName', ev.target.value)} error={!!e.firstName} errorMessage={e.firstName} required fullWidth />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField label="Last name" value={draft.lastName} onChange={(ev) => onChange('lastName', ev.target.value)} error={!!e.lastName} errorMessage={e.lastName} required fullWidth />
            </Grid>
          </Grid>
          <DateOfBirthField label="Date of birth" value={draft.dateOfBirth} onChange={(ev) => onChange('dateOfBirth', ev.target.value)} error={!!e.dateOfBirth} errorMessage={e.dateOfBirth} required fullWidth />
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField label="Contact number" value={draft.phone} onChange={(ev) => onChange('phone', ev.target.value)} error={!!e.phone} errorMessage={e.phone} type="tel" fullWidth />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField label="Email address" value={draft.email} onChange={(ev) => onChange('email', ev.target.value)} error={!!e.email} errorMessage={e.email} type="email" fullWidth />
            </Grid>
          </Grid>
        </>
      )}

      {hasRelationship && (
        <PercentageField
          label="Allocation %"
          value={draft.allocation}
          error={!!e.allocation}
          helperText={e.allocation ?? 'Percentage of your benefit to be paid to this person'}
          onChange={(v) => onChange('allocation', v)}
          required
          fullWidth
        />
      )}

      <RelationshipInfoModal open={infoOpen} onClose={() => setInfoOpen(false)} />
    </Stack>
  );
}

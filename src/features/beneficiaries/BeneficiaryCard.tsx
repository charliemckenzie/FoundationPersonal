'use client';

import { useState } from 'react';
import Collapse from '@mui/material/Collapse';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { Theme } from '@mui/material/styles';
import { Select } from '../../components/Select';
import { TextField } from '../../components/TextField';
import { DateOfBirthField } from '../../components/DateOfBirthField';
import { PercentageField } from '../../components/PercentageField';
import { IconButton } from '../../components/IconButton';
import { TextButton } from '../../components/TextButton';
import { Divider } from '../../components/Divider';
import { Dialog } from '../../components/Dialog';
import type { BeneficiaryDraft } from './types';
import { RELATIONSHIP_OPTIONS } from './types';
import { formatDate, relationshipLabel } from './utils';

interface BeneficiaryCardProps {
  draft: BeneficiaryDraft;
  index: number;
  expanded: boolean;
  showRemove: boolean;
  canCollapse: boolean;
  lprTaken: boolean;
  onExpand: () => void;
  onCollapse: () => void;
  onUpdate: (updated: BeneficiaryDraft) => void;
  onDelete: () => void;
}

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

function CollapsedHeader({ draft, index }: { draft: BeneficiaryDraft; index: number }) {
  const isLpr = draft.relationship === 'lpr';
  const name = isLpr
    ? 'Legal personal representative'
    : [draft.firstName, draft.lastName].filter(Boolean).join(' ') || `Beneficiary ${index + 1}`;
  const meta = isLpr
    ? null
    : [draft.relationship ? relationshipLabel(draft.relationship) : null, draft.dateOfBirth ? formatDate(draft.dateOfBirth) : null]
        .filter(Boolean).join(' · ');

  return (
    <Box sx={{ flex: 1, minWidth: 0 }}>
      <Typography variant="body" sx={{ fontWeight: 700, display: 'block' }}>{name}</Typography>
      {meta && <Typography variant="small" sx={{ color: 'text.muted' }}>{meta}</Typography>}
    </Box>
  );
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

function BeneficiaryForm({
  draft,
  lprTaken,
  onChange,
}: {
  draft: BeneficiaryDraft;
  lprTaken: boolean;
  onChange: (field: keyof BeneficiaryDraft, value: string | number | null) => void;
}) {
  const [infoOpen, setInfoOpen] = useState(false);
  const isLpr = draft.relationship === 'lpr';
  const hasRelationship = !!draft.relationship;

  return (
    <Stack spacing={2.5}>
      <Stack spacing={1}>
        <Select
          label="Relationship"
          options={buildOptions(lprTaken)}
          value={draft.relationship}
          onChange={(v) => onChange('relationship', v)}
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
              <TextField label="First name" value={draft.firstName} onChange={(e) => onChange('firstName', e.target.value)} required fullWidth />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField label="Last name" value={draft.lastName} onChange={(e) => onChange('lastName', e.target.value)} required fullWidth />
            </Grid>
          </Grid>
          <DateOfBirthField label="Date of birth" value={draft.dateOfBirth} onChange={(e) => onChange('dateOfBirth', e.target.value)} required fullWidth />
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField label="Contact number" value={draft.phone} onChange={(e) => onChange('phone', e.target.value)} type="tel" fullWidth />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField label="Email address" value={draft.email} onChange={(e) => onChange('email', e.target.value)} type="email" fullWidth />
            </Grid>
          </Grid>
        </>
      )}

      {hasRelationship && (
        <PercentageField
          label="Allocation %"
          defaultValue={draft.allocation ?? undefined}
          helperText="Percentage of your benefit to be paid to this person"
          onChange={(v) => onChange('allocation', v)}
          required
          fullWidth
        />
      )}

      <RelationshipInfoModal open={infoOpen} onClose={() => setInfoOpen(false)} />
    </Stack>
  );
}

export function BeneficiaryCard({
  draft, index, expanded, showRemove, canCollapse, lprTaken,
  onExpand, onCollapse, onUpdate, onDelete,
}: BeneficiaryCardProps) {
  function handleChange(field: keyof BeneficiaryDraft, value: string | number | null) {
    onUpdate({ ...draft, [field]: value });
  }

  return (
    <Box
      sx={(t: Theme) => ({
        borderRadius: `${t.shape.lg}px`,
        border: '1px solid',
        borderColor: 'border.default',
        bgcolor: 'background.paper',
        overflow: 'hidden',
      })}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, px: 4, py: 2.5 }}>
        {expanded
          ? <Typography variant="body" sx={{ fontWeight: 700, flex: 1 }}>Beneficiary {index + 1}</Typography>
          : <CollapsedHeader draft={draft} index={index} />
        }
        {!expanded && draft.allocation !== null && (
          <Typography variant="small" sx={{ color: 'text.muted', whiteSpace: 'nowrap' }}>
            Allocation{' '}
            <Typography component="span" variant="small" sx={{ fontWeight: 700, color: 'text.primary' }}>
              {draft.allocation}%
            </Typography>
          </Typography>
        )}
        <IconButton
          icon={expanded ? 'chevron-up' : 'chevron-down'}
          label={expanded ? 'Collapse' : 'Expand'}
          showTooltip
          variant="ghost"
          size="medium"
          disabled={expanded && !canCollapse}
          onClick={expanded ? onCollapse : onExpand}
        />
        {showRemove && (
          <IconButton icon="trash" label="Remove" showTooltip variant="ghost" size="medium" color="primary" onClick={onDelete} />
        )}
      </Box>

      <Collapse in={expanded} timeout="auto" unmountOnExit={false}>
        <Divider />
        <Box sx={{ px: 4, py: 3.5 }}>
          <BeneficiaryForm draft={draft} lprTaken={lprTaken} onChange={handleChange} />
        </Box>
      </Collapse>
    </Box>
  );
}

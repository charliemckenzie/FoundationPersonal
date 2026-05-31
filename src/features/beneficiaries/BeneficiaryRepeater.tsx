'use client';

import { useState } from 'react';
import Typography from '@mui/material/Typography';
import { ExpandableCardList } from '../../components/ExpandableCardList';
import type { ExpandableCardItem } from '../../components/ExpandableCardList';
import Box from '@mui/material/Box';
import { Alert } from '../../components/Alert';
import { Button } from '../../components/Button';
import { BeneficiaryForm, CollapsedHeader } from './BeneficiaryCard';
import type { BeneficiaryDraft } from './types';
import type { BeneficiaryFieldErrors } from './utils';
import { createDraft, totalAllocation, validateRequiredFields } from './utils';

interface BeneficiaryRepeaterProps {
  beneficiaries: BeneficiaryDraft[];
  onChange: (updated: BeneficiaryDraft[]) => void;
  expandedId: string;
  onExpandedChange: (id: string) => void;
  fieldErrors: Record<string, BeneficiaryFieldErrors>;
}

export function BeneficiaryRepeater({ beneficiaries, onChange, expandedId, onExpandedChange, fieldErrors }: BeneficiaryRepeaterProps) {
  const [addAttemptErrors, setAddAttemptErrors] = useState<Record<string, BeneficiaryFieldErrors>>({});

  function handleUpdate(index: number, updated: BeneficiaryDraft) {
    const next = [...beneficiaries];
    next[index] = updated;
    onChange(next);
    if (addAttemptErrors[updated.id]) {
      const errors = validateRequiredFields(updated);
      setAddAttemptErrors((prev) => ({ ...prev, [updated.id]: errors }));
    }
  }

  function handleDelete(index: number) {
    const removedId = beneficiaries[index]?.id;
    const next = beneficiaries.filter((_, i) => i !== index);
    onChange(next);
    if (expandedId === removedId) {
      onExpandedChange(next[Math.max(0, index - 1)]?.id ?? '');
    }
    if (removedId) {
      setAddAttemptErrors(({ [removedId]: _, ...rest }) => rest);
    }
  }

  function handleReset(index: number) {
    const next = [...beneficiaries];
    const id = beneficiaries[index].id;
    next[index] = { ...createDraft(), id };
    onChange(next);
    setAddAttemptErrors(({ [id]: _, ...rest }) => rest);
  }

  function handleAdd() {
    const errors: Record<string, BeneficiaryFieldErrors> = {};
    for (const b of beneficiaries) {
      const e = validateRequiredFields(b);
      if (Object.keys(e).length > 0) errors[b.id] = e;
    }
    if (Object.keys(errors).length > 0) {
      setAddAttemptErrors(errors);
      const firstInvalidId = beneficiaries.find((b) => errors[b.id])?.id;
      if (firstInvalidId) onExpandedChange(firstInvalidId);
      return;
    }
    setAddAttemptErrors({});
    const draft = createDraft();
    onChange([...beneficiaries, draft]);
    onExpandedChange(draft.id);
  }

  const canCollapse = beneficiaries.length > 1;
  const allocationFull = totalAllocation(beneficiaries) >= 100;
  const lprIndex = beneficiaries.findIndex((b) => b.relationship === 'lpr');
  const hasAddErrors = Object.values(addAttemptErrors).some((e) => Object.keys(e).length > 0);

  const items: ExpandableCardItem[] = beneficiaries.map((b, i) => {
    const isSingle = beneficiaries.length === 1;
    const showRemove = canCollapse || !!b.relationship;
    const onDelete = isSingle ? () => handleReset(i) : () => handleDelete(i);
    const mergedErrors = { ...addAttemptErrors[b.id], ...fieldErrors[b.id] };

    return {
      id: b.id,
      renderHeader: (isExpanded) =>
        isExpanded ? (
          <Typography component="span" variant="body" sx={{ fontWeight: 700, display: 'block' }}>Beneficiary {i + 1}</Typography>
        ) : (
          <CollapsedHeader draft={b} index={i} />
        ),
      renderAside: (isExpanded) =>
        !isExpanded && b.allocation !== null ? (
          <Typography component="span" variant="small" sx={{ color: 'text.muted', whiteSpace: 'nowrap' }}>
            Allocation{' '}
            <Typography component="span" variant="small" sx={{ fontWeight: 700, color: 'text.primary' }}>
              {b.allocation}%
            </Typography>
          </Typography>
        ) : null,
      content: (
        <BeneficiaryForm
          draft={b}
          lprTaken={lprIndex !== -1 && lprIndex !== i}
          errors={mergedErrors}
          onChange={(field, value) => handleUpdate(i, { ...b, [field]: value })}
        />
      ),
      action: showRemove ? { icon: 'trash', label: 'Remove', onClick: onDelete } : undefined,
    };
  });

  return (
    <>
      <ExpandableCardList
        items={items}
        expandedId={expandedId}
        onExpandedChange={(id) => {
          // Once there are multiple cards, keep one open at all times.
          if (id === '' && !canCollapse) return;
          onExpandedChange(id);
        }}
      />
      {!allocationFull && (
        <>
          {hasAddErrors && (
            <Box sx={{ mt: 2 }}>
              <Alert severity="error" message="To add another beneficiary, please complete the required fields." />
            </Box>
          )}
          <Button
            label="Add another beneficiary"
            variant="outlined"
            color="primary"
            startIcon="plus"
            fullWidth
            onClick={handleAdd}
            sx={{ mt: 2 }}
          />
        </>
      )}
    </>
  );
}

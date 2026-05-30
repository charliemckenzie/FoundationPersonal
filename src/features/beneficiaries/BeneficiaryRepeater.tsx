'use client';

import Stack from '@mui/material/Stack';
import { Button } from '../../components/Button';
import { BeneficiaryCard } from './BeneficiaryCard';
import type { BeneficiaryDraft } from './types';
import { createDraft, totalAllocation } from './utils';

interface BeneficiaryRepeaterProps {
  beneficiaries: BeneficiaryDraft[];
  onChange: (updated: BeneficiaryDraft[]) => void;
  expandedId: string;
  onExpandedChange: (id: string) => void;
}

export function BeneficiaryRepeater({ beneficiaries, onChange, expandedId, onExpandedChange }: BeneficiaryRepeaterProps) {
  function handleUpdate(index: number, updated: BeneficiaryDraft) {
    const next = [...beneficiaries];
    next[index] = updated;
    onChange(next);
  }

  function handleDelete(index: number) {
    const next = beneficiaries.filter((_, i) => i !== index);
    onChange(next);
    if (expandedId === beneficiaries[index]?.id) {
      onExpandedChange(next[Math.max(0, index - 1)]?.id ?? '');
    }
  }

  function handleReset(index: number) {
    const next = [...beneficiaries];
    next[index] = { ...createDraft(), id: beneficiaries[index].id };
    onChange(next);
  }

  function handleAdd() {
    const draft = createDraft();
    onChange([...beneficiaries, draft]);
    onExpandedChange(draft.id);
  }

  const canCollapse = beneficiaries.length > 1;
  const allocationFull = totalAllocation(beneficiaries) >= 100;
  const lprIndex = beneficiaries.findIndex((b) => b.relationship === 'lpr');

  return (
    <Stack spacing={2}>
      {beneficiaries.map((b, i) => {
        const isSingle = beneficiaries.length === 1;
        const showRemove = canCollapse || !!b.relationship;
        const onDelete = isSingle ? () => handleReset(i) : () => handleDelete(i);

        return (
          <BeneficiaryCard
            key={b.id}
            draft={b}
            index={i}
            expanded={b.id === expandedId}
            showRemove={showRemove}
            canCollapse={canCollapse}
            lprTaken={lprIndex !== -1 && lprIndex !== i}
            onExpand={() => onExpandedChange(b.id)}
            onCollapse={() => onExpandedChange('')}
            onUpdate={(updated) => handleUpdate(i, updated)}
            onDelete={onDelete}
          />
        );
      })}
      {!allocationFull && (
        <Button
          label="Add another beneficiary"
          variant="outlined"
          color="primary"
          startIcon="plus"
          fullWidth
          onClick={handleAdd}
        />
      )}
    </Stack>
  );
}

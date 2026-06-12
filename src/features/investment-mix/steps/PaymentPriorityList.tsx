'use client';

import React, { useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { IconButton } from '../../../components/IconButton';
import { Icon } from '../../../components/Icon';
import { PaymentWorkedExample } from './PaymentWorkedExample';
import { ordinal } from '../utils';
import type { InvestmentOption } from '../types';

const GRID_COLUMNS = 'auto 1fr 6rem 8rem';

interface PaymentPriorityListProps {
  /** Allocated options the member can order. */
  options: InvestmentOption[];
  /** Option IDs in priority order (drawn from index 0 first). */
  order: string[];
  /** Balance allocation per option, for the "Invested" context column. */
  allocations: Record<string, number>;
  onReorder: (order: string[]) => void;
}

export function PaymentPriorityList({ options, order, allocations, onReorder }: PaymentPriorityListProps) {
  const orderedOptions = order
    .map((id) => options.find((o) => o.id === id))
    .filter((o): o is InvestmentOption => o !== undefined);

  const dragSrcRef = useRef<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  function move(from: number, to: number) {
    if (to < 0 || to >= orderedOptions.length || from === to) return;
    const next = orderedOptions.map((o) => o.id);
    const [moved] = next.splice(from, 1);
    next.splice(to, 0, moved);
    onReorder(next);
  }

  function handleDragStart(index: number) {
    dragSrcRef.current = index;
  }

  function handleDragOver(e: React.DragEvent, index: number) {
    e.preventDefault();
    setDragOverIndex(index);
  }

  function handleDrop(index: number) {
    const src = dragSrcRef.current;
    dragSrcRef.current = null;
    setDragOverIndex(null);
    if (src === null) return;
    move(src, index);
  }

  function handleDragEnd() {
    dragSrcRef.current = null;
    setDragOverIndex(null);
  }

  const firstName = orderedOptions[0]?.name;
  const lastName = orderedOptions[orderedOptions.length - 1]?.name;

  return (
    <Stack spacing={2}>
      <div>
        <Typography variant="h6" sx={{ mb: 0.5 }}>
          Set your order
        </Typography>
        <Typography variant="body">
          Drag to reorder, or use the arrows.
        </Typography>
      </div>

      <Box
        sx={{
          border: '1px solid',
          borderColor: 'border.subtle',
          borderRadius: (t) => `${t.shape.sm}px`,
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: GRID_COLUMNS,
            gap: 2,
            px: 2.5,
            py: 2,
            bgcolor: 'background.default',
          }}
        >
          <Box />
          <Typography variant="small" sx={{ fontWeight: 700, color: 'text.muted' }}>
            Option
          </Typography>
          <Typography variant="small" sx={{ fontWeight: 700, color: 'text.muted', textAlign: 'right' }}>
            Invested
          </Typography>
          <Typography variant="small" sx={{ fontWeight: 700, color: 'text.muted', textAlign: 'right' }}>
            Payment order
          </Typography>
        </Box>
        <Divider />
        <Stack component="ol" divider={<Divider />} sx={{ m: 0, p: 0, listStyle: 'none' }}>
          {orderedOptions.map((option, index) => {
            const cue =
              index === 0 ? 'Drawn first' : index === orderedOptions.length - 1 ? 'Drawn last' : null;
            return (
              <Box
                key={option.id}
                component="li"
                draggable
                onDragStart={() => handleDragStart(index)}
                onDragOver={(e: React.DragEvent) => handleDragOver(e, index)}
                onDrop={() => handleDrop(index)}
                onDragEnd={handleDragEnd}
                sx={{
                  display: 'grid',
                  gridTemplateColumns: GRID_COLUMNS,
                  gap: 2,
                  alignItems: 'center',
                  px: 2.5,
                  py: 1.5,
                  cursor: 'grab',
                  userSelect: 'none',
                  transition: 'background-color 120ms ease',
                  bgcolor: dragOverIndex === index ? 'action.hover' : 'transparent',
                  '&:active': { cursor: 'grabbing' },
                }}
              >
                <Box sx={{ color: 'text.muted', display: 'flex', alignItems: 'center' }}>
                  <Icon icon="grip-dots-vertical" size="sm" color="inherit" />
                </Box>
                <Typography variant="body">{option.name}</Typography>
                <Typography variant="body" sx={{ textAlign: 'right', color: 'text.muted' }}>
                  {allocations[option.id] ?? 0}%
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 0.5 }}>
                  <Stack spacing={0} sx={{ alignItems: 'flex-end', mr: 0.5 }}>
                    <Typography variant="small" sx={{ fontWeight: 700, color: 'text.muted' }}>
                      {ordinal(index)}
                    </Typography>
                    {cue && (
                      <Typography variant="caption" sx={{ color: 'text.muted' }}>
                        {cue}
                      </Typography>
                    )}
                  </Stack>
                  <Stack direction="row" spacing={0.5}>
                    <IconButton
                      icon="arrow-up"
                      label={`Move ${option.name} up`}
                      variant="ghost"
                      size="small"
                      disabled={index === 0}
                      onClick={() => move(index, index - 1)}
                    />
                    <IconButton
                      icon="arrow-down"
                      label={`Move ${option.name} down`}
                      variant="ghost"
                      size="small"
                      disabled={index === orderedOptions.length - 1}
                      onClick={() => move(index, index + 1)}
                    />
                  </Stack>
                </Box>
              </Box>
            );
          })}
        </Stack>
      </Box>

      {firstName && lastName && firstName !== lastName && (
        <PaymentWorkedExample>
          <Typography variant="body">
            We&apos;ll take each payment from {firstName} first. Once it&apos;s used up, we&apos;ll
            start taking it from {lastName}. Over time this draws down {firstName} and leaves your
            other options invested for longer.
          </Typography>
        </PaymentWorkedExample>
      )}
    </Stack>
  );
}

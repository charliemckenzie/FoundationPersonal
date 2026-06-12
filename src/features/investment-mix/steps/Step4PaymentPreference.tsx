'use client';

import React, { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { Alert } from '../../../components/Alert';
import { RadioButtonGroup } from '../../../components/RadioGroup/RadioButtonGroup';
import { RadioGroup } from '../../../components/RadioGroup';
import { IconButton } from '../../../components/IconButton';
import { Icon } from '../../../components/Icon';
import { PercentageField } from '../../../components/PercentageField';
import type { InvestmentOption, PaymentPreference } from '../types';

interface Step4PaymentPreferenceProps {
  /** Investment options the member has allocated to (non-zero). */
  allocatedOptions: InvestmentOption[];
  /** Current allocation percentages from the previous step. */
  allocations: Record<string, number>;
  preference: PaymentPreference | null;
  onChange: (preference: PaymentPreference) => void;
  showValidation: boolean;
  /** Brand name — kept for API compatibility. */
  brandName: string;
}

const ORDINAL = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th'];

function ordinal(index: number): string {
  return ORDINAL[index] ?? `${index + 1}th`;
}

function validatePercentages(percentages: Record<string, number>): {
  valid: boolean;
  total: number;
} {
  const total = Object.values(percentages).reduce((s, v) => s + v, 0);
  const valid = total === 100;
  return { valid, total };
}

const RISK_ORDER: Record<string, number> = {
  'Very low': 0,
  'Low': 1,
  'Low to medium': 2,
  'Medium': 3,
  'Medium to high': 4,
  'High': 5,
  'Very high': 6,
  'Varies by age': 7,
};

function riskRank(riskLevel: string): number {
  return RISK_ORDER[riskLevel] ?? 99;
}

const fullWidthButtonSx = {
  '& .MuiFormControl-root': { width: '100%' },
  '& .MuiFormGroup-root': { width: '100%' },
  '& .MuiFormControlLabel-root': { flex: 1, justifyContent: 'center' },
};

export function Step4PaymentPreference({
  allocatedOptions,
  allocations,
  preference,
  onChange,
  showValidation,
  brandName: _brandName,
}: Step4PaymentPreferenceProps) {
  // Default to "Choose for me" on mount
  useEffect(() => {
    if (preference === null) {
      onChange({ type: 'brand-chooses' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const outerChoice =
    preference === null || preference.type === 'brand-chooses' ? 'choose-for-me' : 'ill-choose';

  const innerChoice: 'priority' | 'percentage' =
    preference?.type === 'percentage' ? 'percentage' : 'priority';

  function handleOuterChoiceChange(value: string) {
    if (value === 'choose-for-me') {
      onChange({ type: 'brand-chooses' });
    } else {
      const existing = preference?.priorityOrder ?? allocatedOptions.map((o) => o.id);
      onChange({ type: 'priority', priorityOrder: existing });
    }
  }

  function handleInnerChoiceChange(value: string) {
    if (value === 'percentage') {
      const existing = preference?.percentages ?? {};
      onChange({ type: 'percentage', percentages: existing });
    } else {
      const existing = preference?.priorityOrder ?? allocatedOptions.map((o) => o.id);
      onChange({ type: 'priority', priorityOrder: existing });
    }
  }

  function handlePercentageChange(optionId: string, value: number | null) {
    const clamped = value == null ? 0 : Math.min(100, Math.max(0, value));
    const percentages = { ...(preference?.percentages ?? {}), [optionId]: clamped };
    onChange({ type: 'percentage', percentages });
  }

  function handleMoveUp(index: number) {
    if (index === 0) return;
    const order = [...(preference?.priorityOrder ?? allocatedOptions.map((o) => o.id))];
    [order[index - 1], order[index]] = [order[index], order[index - 1]];
    onChange({ type: 'priority', priorityOrder: order });
  }

  function handleMoveDown(index: number) {
    const order = [...(preference?.priorityOrder ?? allocatedOptions.map((o) => o.id))];
    if (index >= order.length - 1) return;
    [order[index], order[index + 1]] = [order[index + 1], order[index]];
    onChange({ type: 'priority', priorityOrder: order });
  }

  const dragSrcRef = useRef<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  function handleDragStart(index: number) {
    dragSrcRef.current = index;
  }

  function handleDragOver(e: React.DragEvent, index: number) {
    e.preventDefault();
    setDragOverIndex(index);
  }

  function handleDrop(index: number) {
    const src = dragSrcRef.current;
    if (src === null || src === index) {
      dragSrcRef.current = null;
      setDragOverIndex(null);
      return;
    }
    const order = [...(preference?.priorityOrder ?? allocatedOptions.map((o) => o.id))];
    const [moved] = order.splice(src, 1);
    order.splice(index, 0, moved);
    onChange({ type: 'priority', priorityOrder: order });
    dragSrcRef.current = null;
    setDragOverIndex(null);
  }

  function handleDragEnd() {
    dragSrcRef.current = null;
    setDragOverIndex(null);
  }

  const percentageError =
    showValidation &&
    innerChoice === 'percentage' &&
    outerChoice === 'ill-choose' &&
    !validatePercentages(preference?.percentages ?? {}).valid;

  const percentageTotal = validatePercentages(preference?.percentages ?? {}).total;

  const priorityOrder =
    preference?.type === 'priority'
      ? preference.priorityOrder ?? allocatedOptions.map((o) => o.id)
      : allocatedOptions.map((o) => o.id);

  const orderedOptions = priorityOrder
    .map((id) => allocatedOptions.find((o) => o.id === id))
    .filter((o): o is InvestmentOption => o !== undefined);

  const optionsByRisk = [...allocatedOptions].sort(
    (a, b) => riskRank(a.riskLevel) - riskRank(b.riskLevel),
  );

  return (
    <Stack spacing={3}>
      <div>
        <Typography variant="h5" sx={{ mb: 0.5 }}>
          Payment preferences
        </Typography>
        <Typography variant="body" sx={{ color: 'text.primary' }}>
          You can only select the investment option/s you chose in the previous step.
        </Typography>
      </div>

      {showValidation && preference === null && (
        <Alert severity="error" message="Please select a payment preference to continue." />
      )}

      {/* Outer choice: Choose for me / I'll choose */}
      <Box sx={fullWidthButtonSx}>
        <RadioButtonGroup
          options={[
            { value: 'choose-for-me', label: 'Choose for me' },
            { value: 'ill-choose', label: "I'll choose" },
          ]}
          direction="row"
          value={outerChoice}
          onChange={handleOuterChoiceChange}
        />
      </Box>

      {/* Choose for me — default payment order */}
      {outerChoice === 'choose-for-me' && (
        <Stack spacing={1.5}>
          <Typography variant="body" sx={{ color: 'text.primary' }}>
            If you don&apos;t make a choice, we&apos;ll start drawing your payments from the options
            that you have your account invested in, in the default payment order as follows:
          </Typography>
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
                gridTemplateColumns: '1fr 8rem 7rem',
                gap: 2,
                px: 2.5,
                py: 2,
                bgcolor: 'background.default',
              }}
            >
              <Typography variant="small" sx={{ fontWeight: 700, color: 'text.muted' }}>
                Option
              </Typography>
              <Typography variant="small" sx={{ fontWeight: 700, color: 'text.muted', textAlign: 'right' }}>
                Account balance
              </Typography>
              <Typography variant="small" sx={{ fontWeight: 700, color: 'text.muted', textAlign: 'right' }}>
                Payment order
              </Typography>
            </Box>
            <Divider />
            <Stack divider={<Divider />}>
              {optionsByRisk.map((option, index) => (
                <Box
                  key={option.id}
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 8rem 7rem',
                    gap: 2,
                    alignItems: 'center',
                    px: 2.5,
                    py: 1.5,
                  }}
                >
                  <Typography variant="body">{option.name}</Typography>
                  <Typography variant="body" sx={{ textAlign: 'right', minWidth: '3.5rem' }}>
                    {allocations[option.id] ?? 0}%
                  </Typography>
                  <Typography variant="body" sx={{ fontWeight: 700, color: 'text.muted', textAlign: 'right', minWidth: '2rem' }}>
                    {index + 1}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Box>
        </Stack>
      )}

      {/* I'll choose — sub-choice + controls */}
      {outerChoice === 'ill-choose' && (
        <Stack spacing={3}>
          <RadioGroup
            options={[
              { value: 'priority', label: 'Order of priority' },
              { value: 'percentage', label: 'Percentage' },
            ]}
            value={innerChoice}
            onChange={handleInnerChoiceChange}
          />

          {/* Order of priority */}
          {innerChoice === 'priority' && (
            <Stack spacing={2}>
              <Typography variant="body" sx={{ color: 'text.primary' }}>
                We&apos;ll take money from your selected investment option first, and when
                there&apos;s no money left in that option, we&apos;ll move onto the next option
                you&apos;ve selected.
              </Typography>
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
                    gridTemplateColumns: 'auto 1fr 8rem 7rem',
                    gap: 2,
                    px: 2.5,
                    py: 2,
                    bgcolor: 'background.default',
                  }}
                >
                  {/* spacer for drag handle column */}
                  <Box />
                  <Typography variant="small" sx={{ fontWeight: 700, color: 'text.muted' }}>
                    Option
                  </Typography>
                  <Typography variant="small" sx={{ fontWeight: 700, color: 'text.muted', textAlign: 'right' }}>
                    Account balance
                  </Typography>
                  <Typography variant="small" sx={{ fontWeight: 700, color: 'text.muted', textAlign: 'right' }}>
                    Priority
                  </Typography>
                </Box>
                <Divider />
                <Stack component="ol" divider={<Divider />} sx={{ m: 0, p: 0, listStyle: 'none' }}>
                  {orderedOptions.map((option, index) => (
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
                        gridTemplateColumns: 'auto 1fr 8rem 7rem',
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
                      <Typography variant="body">
                        {option.name}
                      </Typography>
                      <Typography variant="body" sx={{ textAlign: 'right' }}>
                        {allocations[option.id] ?? 0}%
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 0.5 }}>
                        <Typography
                          variant="small"
                          sx={{ fontWeight: 700, color: 'text.muted', minWidth: '1.5rem', textAlign: 'right' }}
                        >
                          {ordinal(index)}
                        </Typography>
                        <Stack direction="row" spacing={0.5}>
                          <IconButton
                            icon="arrow-up"
                            label={`Move ${option.name} up`}
                            variant="ghost"
                            size="small"
                            disabled={index === 0}
                            onClick={() => handleMoveUp(index)}
                          />
                          <IconButton
                            icon="arrow-down"
                            label={`Move ${option.name} down`}
                            variant="ghost"
                            size="small"
                            disabled={index === orderedOptions.length - 1}
                            onClick={() => handleMoveDown(index)}
                          />
                        </Stack>
                      </Box>
                    </Box>
                  ))}
                </Stack>
              </Box>
            </Stack>
          )}

          {/* Percentage */}
          {innerChoice === 'percentage' && (
            <Stack spacing={2}>
              <Typography variant="body" sx={{ color: 'text.primary' }}>
                You can tell us to take a percentage from each of your investment options to make
                your payments and withdrawals. The total must equal 100%
              </Typography>
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
                    gridTemplateColumns: '1fr 8rem 7rem',
                    gap: 2,
                    px: 2.5,
                    py: 2,
                    bgcolor: 'background.default',
                  }}
                >
                  <Typography variant="small" sx={{ fontWeight: 700, color: 'text.muted' }}>
                    Option
                  </Typography>
                  <Typography variant="small" sx={{ fontWeight: 700, color: 'text.muted', textAlign: 'right' }}>
                    Account balance
                  </Typography>
                  <Typography variant="small" sx={{ fontWeight: 700, color: 'text.muted', textAlign: 'right' }}>
                    Payment %
                  </Typography>
                </Box>
                <Divider />
                <Stack divider={<Divider />}>
                  {allocatedOptions.map((option) => (
                    <Box
                      key={option.id}
                      sx={{ display: 'grid', gridTemplateColumns: '1fr 8rem 7rem', gap: 2, alignItems: 'center', px: 2.5, py: 1.5 }}
                    >
                      <Typography variant="body">
                        {option.name}
                      </Typography>
                      <Typography variant="body" sx={{ textAlign: 'right' }}>
                        {allocations[option.id] ?? 0}%
                      </Typography>
                      <Box sx={{ flexShrink: 0 }}>
                        <PercentageField
                          aria-label={`Percentage for ${option.name}`}
                          value={preference?.percentages?.[option.id] ?? null}
                          size="small"
                          condensed
                          fullWidth
                          error={percentageError}
                          onChange={(v) => handlePercentageChange(option.id, v)}
                        />
                      </Box>
                    </Box>
                  ))}
                </Stack>
                <Divider />
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    gap: 1,
                    px: 2.5,
                    py: 1.5,
                    bgcolor: percentageError
                      ? 'error.50'
                      : percentageTotal === 100
                        ? 'success.50'
                        : 'background.default',
                  }}
                >
                  <Typography variant="small" sx={{ color: 'text.muted' }}>
                    Total
                  </Typography>
                  <Typography
                    variant="body"
                    sx={{
                      fontWeight: 700,
                      color: percentageError
                        ? 'error.main'
                        : percentageTotal === 100
                          ? 'success.main'
                          : 'text.primary',
                      minWidth: '3rem',
                      textAlign: 'right',
                    }}
                  >
                    {percentageTotal}%
                  </Typography>
                </Box>
                {percentageError && (
                  <Box sx={{ px: 2.5, pb: 2 }}>
                    <Alert
                      severity="error"
                      message={`Your total is ${percentageTotal}%. Please adjust the percentages to equal exactly 100%.`}
                    />
                  </Box>
                )}
              </Box>
            </Stack>
          )}
        </Stack>
      )}
    </Stack>
  );
}

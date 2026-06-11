'use client';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { Alert } from '../../../components/Alert';
import { RadioGroup } from '../../../components/RadioGroup';
import { IconButton } from '../../../components/IconButton';
import { TextField } from '../../../components/TextField';
import type { InvestmentOption } from '../types';
import type { PaymentPreference, PaymentPreferenceType } from '../types';

interface Step4PaymentPreferenceProps {
  /** Investment options the member has allocated to (non-zero). */
  allocatedOptions: InvestmentOption[];
  preference: PaymentPreference | null;
  onChange: (preference: PaymentPreference) => void;
  showValidation: boolean;
  /** Brand name used in the "let brand choose" label, e.g. "QSuper" or "ART". */
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

export function Step4PaymentPreference({
  allocatedOptions,
  preference,
  onChange,
  showValidation,
  brandName,
}: Step4PaymentPreferenceProps) {
  const selectedType = preference?.type ?? null;

  function handleTypeChange(type: PaymentPreferenceType) {
    if (type === 'brand-chooses') {
      onChange({ type: 'brand-chooses' });
    } else if (type === 'percentage') {
      const existing = preference?.percentages ?? {};
      onChange({ type: 'percentage', percentages: existing });
    } else {
      const existing = preference?.priorityOrder ?? allocatedOptions.map((o) => o.id);
      onChange({ type: 'priority', priorityOrder: existing });
    }
  }

  function handlePercentageChange(optionId: string, raw: string) {
    const parsed = parseInt(raw, 10);
    const value = Number.isNaN(parsed) ? 0 : Math.min(100, Math.max(0, parsed));
    const percentages = { ...(preference?.percentages ?? {}), [optionId]: value };
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

  const percentageError =
    showValidation &&
    selectedType === 'percentage' &&
    !validatePercentages(preference?.percentages ?? {}).valid;

  const percentageTotal = validatePercentages(preference?.percentages ?? {}).total;

  const priorityOrder =
    preference?.type === 'priority'
      ? preference.priorityOrder ?? allocatedOptions.map((o) => o.id)
      : allocatedOptions.map((o) => o.id);

  const orderedOptions = priorityOrder
    .map((id) => allocatedOptions.find((o) => o.id === id))
    .filter((o): o is InvestmentOption => o !== undefined);

  return (
    <Stack spacing={3}>
      <div>
        <Typography variant="h5" sx={{ mb: 0.5 }}>
          Future payments
        </Typography>
        <Typography variant="body" sx={{ color: 'text.muted' }}>
          Which investment options should we take your future payments and withdrawals from?
        </Typography>
      </div>

      {showValidation && selectedType === null && (
        <Alert severity="error" message="Please select a payment preference to continue." />
      )}

      <RadioGroup
        options={[
          {
            value: 'brand-chooses',
            label: `Let ${brandName} choose`,
            description: `${brandName} will draw from your lowest-risk invested option first.`,
          },
          {
            value: 'percentage',
            label: 'Enter percentages',
            description:
              'Specify what percentage of each payment should come from each investment option.',
          },
          {
            value: 'priority',
            label: 'Set order of priority',
            description:
              'Rank your investment options. Payments will be taken from the first option until exhausted, then the next.',
          },
        ]}
        variant="boxed"
        value={selectedType ?? ''}
        onChange={(v) => handleTypeChange(v as PaymentPreferenceType)}
      />

      {/* Percentage inputs */}
      {selectedType === 'percentage' && (
        <Box
          sx={{
            border: '1px solid',
            borderColor: 'border.subtle',
            borderRadius: (t) => `${t.shape.sm}px`,
            overflow: 'hidden',
          }}
        >
          <Box sx={{ px: 2.5, py: 2, bgcolor: 'background.default' }}>
            <Typography variant="small" sx={{ fontWeight: 700, color: 'text.muted' }}>
              Percentage per option — must total 100%
            </Typography>
          </Box>
          <Divider />
          <Stack divider={<Divider />}>
            {allocatedOptions.map((option) => (
              <Box
                key={option.id}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  px: 2.5,
                  py: 1.5,
                }}
              >
                <Typography variant="body" sx={{ flex: 1 }}>
                  {option.name}
                </Typography>
                <Box sx={{ width: '6rem', flexShrink: 0 }}>
                  <TextField
                    type="number"
                    htmlInputProps={{ min: 0, max: 100, step: 1, 'aria-label': `Percentage for ${option.name}` }}
                    value={
                      preference?.percentages?.[option.id] != null
                        ? String(preference.percentages[option.id])
                        : ''
                    }
                    placeholder="0"
                    size="small"
                    condensed
                    endAdornment="%"
                    fullWidth
                    error={percentageError}
                    onChange={(e) => handlePercentageChange(option.id, e.target.value)}
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
              bgcolor: percentageError ? 'error.50' : percentageTotal === 100 ? 'success.50' : 'background.default',
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
      )}

      {/* Priority order */}
      {selectedType === 'priority' && (
        <Box
          sx={{
            border: '1px solid',
            borderColor: 'border.subtle',
            borderRadius: (t) => `${t.shape.sm}px`,
            overflow: 'hidden',
          }}
        >
          <Box sx={{ px: 2.5, py: 2, bgcolor: 'background.default' }}>
            <Typography variant="small" sx={{ fontWeight: 700, color: 'text.muted' }}>
              Drag to reorder — payments drawn from the top option first
            </Typography>
          </Box>
          <Divider />
          <Stack component="ol" divider={<Divider />} sx={{ m: 0, p: 0, listStyle: 'none' }}>
            {orderedOptions.map((option, index) => (
              <Box
                key={option.id}
                component="li"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  px: 2.5,
                  py: 1.5,
                }}
              >
                <Typography
                  variant="small"
                  sx={{
                    fontWeight: 700,
                    color: 'text.muted',
                    minWidth: '2.25rem',
                    flexShrink: 0,
                  }}
                >
                  {ordinal(index)}
                </Typography>
                <Typography variant="body" sx={{ flex: 1 }}>
                  {option.name}
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
            ))}
          </Stack>
        </Box>
      )}
    </Stack>
  );
}

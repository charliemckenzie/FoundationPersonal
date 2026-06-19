'use client';

import { useState } from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Alert } from '../../../components/Alert';
import { Checkbox } from '../../../components/Checkbox';
import { Dialog } from '../../../components/Dialog';
import { Icon } from '../../../components/Icon';
import { PercentageField } from '../../../components/PercentageField';
import { RadioCardGroup } from '../../../components/RadioGroup/RadioCardGroup';
import { Select } from '../../../components/Select';
import { AllocationTotal } from '../../beneficiaries/AllocationTotal';
import { validateStep3 } from '../../investment-mix/utils';
import type { DrawdownState, DrawdownCustomMethod } from '../types';

// ── Mock proportional snapshot of the user's current investment allocation ──
export const DRAWDOWN_OPTIONS = [
  { id: 'opt-high-growth', name: 'High Growth' },
  { id: 'opt-balanced', name: 'Balanced' },
  { id: 'opt-conservative-balanced', name: 'Conservative Balanced' },
];

export type DrawdownOption = { id: string; name: string };

const CUSTOM_METHOD_OPTIONS = [
  {
    value: 'order',
    label: 'Choose by order',
  },
  {
    value: 'percentage',
    label: 'Choose by percentage',
  },
];

export interface StepInvestmentDrawdownProps {
  drawdown: DrawdownState;
  allocatedOptions: DrawdownOption[];
  onDrawdownChange: (next: DrawdownState) => void;
  showValidation: boolean;
}

export function drawdownStepValid(drawdown: DrawdownState, allocatedOptions: DrawdownOption[]): boolean {
  if (!drawdown.customMethod) return false;
  if (drawdown.customMethod === 'order') {
    return allocatedOptions.every((o) => (drawdown.orderAllocations[o.id] ?? 0) > 0);
  }
  // percentage — must sum to 100
  const asInvestmentOptions = allocatedOptions.map((o) => ({
    id: o.id, name: o.name, category: 'Drawdown', riskLevel: '', returnProfile: '', currentAllocation: 0, annualFee: 0,
  }));
  const { valid } = validateStep3(drawdown.percentageAllocations, asInvestmentOptions);
  return valid;
}

export function StepInvestmentDrawdown({
  drawdown,
  allocatedOptions,
  onDrawdownChange,
  showValidation,
}: StepInvestmentDrawdownProps) {
  const options = allocatedOptions.length > 0 ? allocatedOptions : DRAWDOWN_OPTIONS;
  const asInvestmentOptions = options.map((o) => ({
    id: o.id, name: o.name, category: 'Drawdown', riskLevel: '', returnProfile: '', currentAllocation: 0, annualFee: 0,
  }));
  const { customMethod, orderAllocations, percentageAllocations, autoRebalance } = drawdown;
  const [rebalanceInfoOpen, setRebalanceInfoOpen] = useState(false);

  const methodError = showValidation && !customMethod;
  const orderError = showValidation && customMethod === 'order' &&
    !options.every((o) => (orderAllocations[o.id] ?? 0) > 0);
  const { total: pctTotal } = validateStep3(percentageAllocations, asInvestmentOptions);
  const percentageError = showValidation && customMethod === 'percentage' &&
    Math.abs(pctTotal - 100) > 0.01;

  function handleMethodChange(next: string) {
    onDrawdownChange({ ...drawdown, customMethod: next as DrawdownCustomMethod });
  }

  function handleOrderChange(optionId: string, position: string) {
    onDrawdownChange({
      ...drawdown,
      orderAllocations: { ...orderAllocations, [optionId]: parseInt(position, 10) },
    });
  }

  function handlePercentageChange(optionId: string, value: number | null) {
    onDrawdownChange({
      ...drawdown,
      percentageAllocations: { ...percentageAllocations, [optionId]: value ?? 0 },
    });
  }

  const positionOptions = options.map((_, i) => ({
    value: String(i + 1),
    label: String(i + 1),
  }));

  return (
    <Stack spacing={3}>
      <div>
        <Typography variant="h5" component="h2" sx={{ mb: 0.5 }}>
          Choose which investments we pay you from first
        </Typography>
        <Typography variant="body" sx={{ color: 'text.primary' }}>
          Decide how your income payments are drawn from your investments — you can prioritise specific
          options, use them evenly, or let us choose for you.
        </Typography>
      </div>

      <Stack spacing={2}>
        <Stack spacing={1.5}>
          <RadioCardGroup
            legend="Choose drawdown method"
            legendBold
            options={CUSTOM_METHOD_OPTIONS}
            value={customMethod}
            onChange={handleMethodChange}
            direction="column"
            cardDirection="row"
            error={methodError}
            errorMessage={methodError ? 'Select a method to continue.' : undefined}
          />

                {/* By order */}
                {customMethod === 'order' && (
                  <Stack spacing={1.5}>
                    <Typography variant="body" sx={{ color: 'text.primary' }}>
                      We&apos;ll use your chosen investments in order for payments — starting with the
                      first until it runs out, then moving to the next. If all are used up,
                      we&apos;ll follow the default method.
                    </Typography>

                    {orderError && (
                      <Alert severity="error" message="Assign an order position to every option." />
                    )}

                    <Stack component="ul" spacing={0} sx={{ m: 0, p: 0, listStyle: 'none' }}>
                      {DRAWDOWN_OPTIONS.map((option) => (
                        <Box
                          component="li"
                          key={option.id}
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 2,
                            py: 1.25,
                            borderBottom: '1px solid',
                            borderColor: 'border.subtle',
                            '&:last-child': { borderBottom: 'none' },
                          }}
                        >
                          <Typography variant="body" sx={{ flex: 1 }}>
                            {option.name}
                          </Typography>
                          <Box sx={{ width: '6rem', flexShrink: 0, '& .MuiFormLabel-root': { position: 'absolute', width: '1px', height: '1px', overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap' } }}>
                            <Select
                              label={`Order for ${option.name}`}
                              options={positionOptions}
                              value={orderAllocations[option.id] ? String(orderAllocations[option.id]) : ''}
                              onChange={(v) => handleOrderChange(option.id, v)}
                              size="medium"
                            />
                          </Box>
                        </Box>
                      ))}
                    </Stack>

                    <Alert
                      severity="info"
                      message="Options are ordered from most stable to most growth-oriented by default. This helps protect your income in volatile markets by drawing from your most conservative investments first."
                    />
                  </Stack>
                )}

                {/* By percentage */}
                {customMethod === 'percentage' && (
                  <Stack spacing={1.5}>
                    <Typography variant="body" sx={{ color: 'text.primary' }}>
                      Choose what percentage of each payment comes from each investment option.
                      Percentages must add up to 100%.
                    </Typography>

                    {percentageError && (
                      <Alert
                        severity="error"
                        message={`Allocations total ${pctTotal.toFixed(2)}% — they must add up to 100%.`}
                      />
                    )}

                    <Stack component="ul" spacing={0} sx={{ m: 0, p: 0, listStyle: 'none' }}>
                      {options.map((option) => (
                        <Box
                          component="li"
                          key={option.id}
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 2,
                            py: 1.25,
                            borderBottom: '1px solid',
                            borderColor: 'border.subtle',
                            '&:last-child': { borderBottom: 'none' },
                          }}
                        >
                          <Typography variant="body" sx={{ flex: 1 }}>
                            {option.name}
                          </Typography>
                          <Box sx={{ width: '9rem', flexShrink: 0 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Typography
                                component="label"
                                htmlFor={`drawdown-pct-${option.id}`}
                                variant="small"
                                sx={{ color: 'text.muted', whiteSpace: 'nowrap', cursor: 'default' }}
                              >
                                Allocate:
                              </Typography>
                              <PercentageField
                                id={`drawdown-pct-${option.id}`}
                                aria-label={`Allocate ${option.name} percent`}
                                value={percentageAllocations[option.id] ?? null}
                                size="medium"
                                onChange={(v) => handlePercentageChange(option.id, v)}
                              />
                            </Box>
                          </Box>
                        </Box>
                      ))}
                    </Stack>

                    <AllocationTotal total={parseFloat(pctTotal.toFixed(2))} attempted={showValidation} />
                  </Stack>
                )}
        </Stack>

        {/* ── Rebalancing ── */}
        <Divider />
        <Stack spacing={1}>
          <Typography variant="h6" component="h2">
            Keep your investment mix on track
          </Typography>
          <Typography variant="body" sx={{ color: 'text.primary' }}>
            Over time, your investments can shift away from the mix you chose. We can automatically
            adjust them to keep things balanced.
          </Typography>
          <Box
            component="button"
            onClick={() => setRebalanceInfoOpen(true)}
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 0.75,
              background: 'none',
              border: 'none',
              p: 0,
              cursor: 'pointer',
              color: 'primary.main',
            }}
          >
            <Icon icon="circle-info" size="sm" color="primary" />
            <Typography variant="body" sx={{ color: 'primary.main', fontWeight: 600 }}>
              How does this work exactly?
            </Typography>
          </Box>

          <Box sx={{ mt: 3 }}>
            <Checkbox
              label="Automatically keep my investments in the mix I selected"
              checked={autoRebalance}
              onChange={(checked) => onDrawdownChange({ ...drawdown, autoRebalance: checked })}
            />
          </Box>

          <Dialog
            open={rebalanceInfoOpen}
            onClose={() => setRebalanceInfoOpen(false)}
            title="How automatic rebalancing works"
            size="medium"
            confirmLabel="Got it"
            onConfirm={() => setRebalanceInfoOpen(false)}
          >
            <Stack spacing={2}>
              <Typography variant="body" sx={{ color: 'text.primary' }}>
                When you choose your investments, you&apos;re setting a mix — for example:
              </Typography>
              <Box component="ul" sx={{ m: 0, pl: 2.5 }}>
                <Typography component="li" variant="body" sx={{ color: 'text.primary' }}>70% Growth</Typography>
                <Typography component="li" variant="body" sx={{ color: 'text.primary' }}>30% Defensive</Typography>
              </Box>
              <Typography variant="body" sx={{ color: 'text.primary' }}>
                Over time, this mix can change as markets move. For example, it might become:
              </Typography>
              <Box component="ul" sx={{ m: 0, pl: 2.5 }}>
                <Typography component="li" variant="body" sx={{ color: 'text.primary' }}>80% Growth</Typography>
                <Typography component="li" variant="body" sx={{ color: 'text.primary' }}>20% Defensive</Typography>
              </Box>
              <Typography variant="body" sx={{ color: 'text.primary' }}>
                If automatic rebalancing is turned on, we&apos;ll adjust your investments to bring them back to your original mix.
              </Typography>
              <Typography variant="body" sx={{ color: 'text.primary' }}>This means we may:</Typography>
              <Box component="ul" sx={{ m: 0, pl: 2.5 }}>
                <Typography component="li" variant="body" sx={{ color: 'text.primary' }}>Move some money out of investments that have grown more</Typography>
                <Typography component="li" variant="body" sx={{ color: 'text.primary' }}>Move it into investments that have grown less</Typography>
              </Box>
              <Typography variant="body" sx={{ color: 'text.primary' }}>
                This helps keep your investment strategy and risk level consistent over time.
              </Typography>
            </Stack>
          </Dialog>
        </Stack>
      </Stack>
    </Stack>
  );
}

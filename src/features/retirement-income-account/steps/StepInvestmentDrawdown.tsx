'use client';

import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Alert } from '../../../components/Alert';
import { Checkbox } from '../../../components/Checkbox';
import { PercentageField } from '../../../components/PercentageField';
import { RadioCardGroup } from '../../../components/RadioGroup/RadioCardGroup';
import { Select } from '../../../components/Select';
import { validateStep3 } from '../../investment-mix/utils';
import type { DrawdownState, DrawdownMode, DrawdownCustomMethod } from '../types';

// ── Mock proportional snapshot of the user's current investment allocation ──
export const DRAWDOWN_OPTIONS = [
  { id: 'opt-high-growth', name: 'High Growth' },
  { id: 'opt-balanced', name: 'Balanced' },
  { id: 'opt-conservative-balanced', name: 'Conservative Balanced' },
];

const DEFAULT_PROPORTIONS: Record<string, number> = {
  'opt-high-growth': 12.5,
  'opt-balanced': 27.5,
  'opt-conservative-balanced': 60.0,
};

// Fake InvestmentOption shape needed by validateStep3
const DRAWDOWN_AS_INVESTMENT_OPTIONS = DRAWDOWN_OPTIONS.map((o) => ({
  id: o.id,
  name: o.name,
  category: 'Drawdown',
  riskLevel: '',
  returnProfile: '',
  currentAllocation: 0,
  annualFee: 0,
}));

const MODE_OPTIONS = [
  { value: 'default', label: 'Default', icon: 'chart-bar' },
  { value: 'custom', label: 'Choose your own', icon: 'pen' },
];

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
  onDrawdownChange: (next: DrawdownState) => void;
  showValidation: boolean;
}

export function drawdownStepValid(drawdown: DrawdownState): boolean {
  if (!drawdown.mode) return false;
  if (drawdown.mode === 'default') return true;
  if (!drawdown.customMethod) return false;
  if (drawdown.customMethod === 'order') {
    // every option must have a non-zero position assigned
    return DRAWDOWN_OPTIONS.every((o) => (drawdown.orderAllocations[o.id] ?? 0) > 0);
  }
  // percentage — must sum to 100
  const { valid } = validateStep3(drawdown.percentageAllocations, DRAWDOWN_AS_INVESTMENT_OPTIONS);
  return valid;
}

export function StepInvestmentDrawdown({
  drawdown,
  onDrawdownChange,
  showValidation,
}: StepInvestmentDrawdownProps) {
  const { mode, customMethod, orderAllocations, percentageAllocations, autoRebalance } = drawdown;

  const modeError = showValidation && !mode;
  const methodError = showValidation && mode === 'custom' && !customMethod;
  const orderError = showValidation && mode === 'custom' && customMethod === 'order' &&
    !DRAWDOWN_OPTIONS.every((o) => (orderAllocations[o.id] ?? 0) > 0);
  const { total: pctTotal } = validateStep3(percentageAllocations, DRAWDOWN_AS_INVESTMENT_OPTIONS);
  const percentageError = showValidation && mode === 'custom' && customMethod === 'percentage' &&
    Math.abs(pctTotal - 100) > 0.01;

  function handleModeChange(next: string) {
    onDrawdownChange({ ...drawdown, mode: next as DrawdownMode });
  }

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

  const positionOptions = DRAWDOWN_OPTIONS.map((_, i) => ({
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

      {/* ── Mode selector ── */}
      <Stack spacing={2}>
        <Box
          sx={{
            '& .MuiFormControl-root': { width: '100%' },
            '& .MuiFormGroup-root': { flexWrap: 'nowrap', width: '100%' },
            '& .MuiFormControlLabel-root': { flex: 1, minWidth: 0 },
          }}
        >
          <RadioCardGroup
            legend="Select drawdown option"
            legendBold
            options={MODE_OPTIONS}
            value={mode}
            onChange={handleModeChange}
            direction="row"
            cardDirection="column"
            error={modeError}
            errorMessage={modeError ? 'Select a drawdown option to continue.' : undefined}
          />
        </Box>

        <Box
          sx={{
            border: '1px solid',
            borderColor: 'border.default',
            borderRadius: (t) => `${t.shape.md}px`,
            backgroundColor: 'background.paper',
            p: 3,
          }}
        >
          <Stack spacing={2.5}>

            {/* ── Default: proportional summary ── */}
            {mode === 'default' && (
              <Stack spacing={1.5}>
                <Typography variant="body" sx={{ color: 'text.primary' }}>
                  Your payments are taken from each investment option in the same proportion as your
                  current balance across them. Most stable option first.
                </Typography>
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
                      <Box sx={{ width: '5rem', flexShrink: 0 }}>
                        <PercentageField
                          aria-label={`${option.name} allocation percent`}
                          value={DEFAULT_PROPORTIONS[option.id]}
                          size="medium"
                          disabled
                        />
                      </Box>
                    </Box>
                  ))}
                </Stack>
              </Stack>
            )}

            {/* ── Custom: method picker + form ── */}
            {mode === 'custom' && (
              <Stack spacing={1.5}>
                <RadioCardGroup
                  legend="Choose method"
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
                  </Stack>
                )}
              </Stack>
            )}

            {/* ── Rebalancing ── */}
            <Divider />
            <Stack spacing={1}>
              <Typography variant="h6" component="h2">
                Maintain your chosen investment balance?
              </Typography>
              <Typography variant="body" sx={{ color: 'text.primary' }}>
                Over time, your investments can get out of balance from your chosen strategy.
                Rebalancing helps keep your risk level and goals on track.
              </Typography>
              <Box sx={{ pt: 0.5 }}>
                <Checkbox
                  label="Automatically repeat this request and rebalance my investments"
                  checked={autoRebalance}
                  onChange={(checked) => onDrawdownChange({ ...drawdown, autoRebalance: checked })}
                />
              </Box>
            </Stack>

          </Stack>
        </Box>
        </Stack>
    </Stack>
  );
}

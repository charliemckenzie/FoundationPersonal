'use client';

import { useRef, useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { AllocationTotal } from '../../beneficiaries/AllocationTotal';
import { Alert } from '../../../components/Alert';
import { PercentageField } from '../../../components/PercentageField';
import { RadioCardGroup } from '../../../components/RadioGroup/RadioCardGroup';
import type { InvestmentOption } from '../../investment-mix/types';
import { validateStep3 } from '../../investment-mix/utils';
import { detectAllocationWarning } from '../../investment-mix/allocationWarnings';
import { MOCK_INVESTMENT_OPTIONS } from '../../investment-mix/mockData';

export { MOCK_INVESTMENT_OPTIONS };

// The default investment option for new Retirement Income accounts.
const DEFAULT_OPTION_ID = 'opt-balanced-risk-adjusted';
const DEFAULT_OPTION = MOCK_INVESTMENT_OPTIONS.find((o) => o.id === DEFAULT_OPTION_ID)!;
const DEFAULT_ALLOCATIONS: Record<string, number> = { [DEFAULT_OPTION_ID]: 100 };

export type InvestmentMode = 'default' | 'custom';

export interface InvestmentMixState {
  mode: InvestmentMode | '';
  allocations: Record<string, number>;
}

export const INITIAL_INVESTMENT_MIX: InvestmentMixState = {
  mode: '',
  allocations: {},
};

export function investmentMixStepValid(mix: InvestmentMixState): boolean {
  if (!mix.mode) return false;
  if (mix.mode === 'default') return true;
  const { valid } = validateStep3(mix.allocations ?? {}, MOCK_INVESTMENT_OPTIONS);
  return valid;
}

const MODE_OPTIONS = [
  { value: 'default', label: 'Default', icon: 'chart-bar' },
  { value: 'custom', label: 'Choose your own', icon: 'pen' },
];

interface StepInvestmentMixProps {
  investmentMix: InvestmentMixState;
  onInvestmentMixChange: (next: InvestmentMixState) => void;
  showValidation: boolean;
}

export function StepInvestmentMix({
  investmentMix,
  onInvestmentMixChange,
  showValidation,
}: StepInvestmentMixProps) {
  const options: InvestmentOption[] = MOCK_INVESTMENT_OPTIONS;
  const { mode, allocations } = investmentMix;
  const safeAllocations = allocations ?? {};
  const { total } = validateStep3(safeAllocations, options);
  const warning = detectAllocationWarning(safeAllocations, options);

  const barRef = useRef<HTMLDivElement>(null);
  const [isFloating, setIsFloating] = useState(false);

  useEffect(() => {
    const el = barRef.current;
    if (!el) return;

    function getScrollParent(node: HTMLElement | null): HTMLElement {
      while (node && node !== document.documentElement) {
        const { overflowY } = getComputedStyle(node);
        if (overflowY === 'auto' || overflowY === 'scroll') return node;
        node = node.parentElement;
      }
      return document.documentElement;
    }

    const container = getScrollParent(el.parentElement);
    const STUCK_OFFSET = 16;

    const update = () => {
      const barBottom = el.getBoundingClientRect().bottom;
      const containerBottom =
        container === document.documentElement
          ? window.innerHeight
          : Math.min(container.getBoundingClientRect().bottom, window.innerHeight);
      setIsFloating(barBottom >= containerBottom - STUCK_OFFSET - 0.5);
    };

    container.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);

    let rafId = 0;
    const start = performance.now();
    const settle = () => {
      update();
      if (performance.now() - start < 600) rafId = requestAnimationFrame(settle);
    };
    settle();

    return () => {
      container.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
      cancelAnimationFrame(rafId);
    };
  }, []);

  function handleModeChange(next: string) {
    const nextMode = next as InvestmentMode;
    onInvestmentMixChange({
      mode: nextMode,
      allocations: nextMode === 'default' ? DEFAULT_ALLOCATIONS : {},
    });
  }

  function handleAllocationChange(optionId: string, value: number | null) {
    onInvestmentMixChange({
      ...investmentMix,
      allocations: { ...safeAllocations, [optionId]: value ?? 0 },
    });
  }

  const grouped = options.reduce<Record<string, InvestmentOption[]>>((acc, opt) => {
    if (!acc[opt.category]) acc[opt.category] = [];
    acc[opt.category].push(opt);
    return acc;
  }, {});

  const modeError = showValidation && !mode;

  return (
    <Stack spacing={3}>
      <div>
        <Typography variant="h5" sx={{ mb: 0.5 }}>How do you want your account to be invested?</Typography>
        <Typography variant="body" sx={{ color: 'text.primary' }}>
          Take control of your Retirement Income account investment strategy and choose your own, or let us do it for you with our default option.
        </Typography>
      </div>

      {/* ── Mode selector ── */}
      <Stack spacing={1.5}>
        <Box
          sx={{
            '& .MuiFormControl-root': { width: '100%' },
            '& .MuiFormGroup-root': { flexWrap: 'nowrap', width: '100%' },
            '& .MuiFormControlLabel-root': { flex: 1, minWidth: 0 },
          }}
        >
          <RadioCardGroup
            legend="Select investment option"
            legendBold
            options={MODE_OPTIONS}
            value={mode}
            onChange={handleModeChange}
            direction="row"
            cardDirection="column"
            error={modeError}
            errorMessage={modeError ? 'Select an investment option to continue.' : undefined}
          />
        </Box>

        {/* Default option summary */}
        {mode === 'default' && DEFAULT_OPTION && (
          <Box
            sx={{
              border: '1px solid',
              borderColor: 'border.default',
              borderRadius: (t) => `${t.shape.md}px`,
              backgroundColor: 'background.paper',
              p: 3,
            }}
          >
          <Stack component="ul" spacing={0} sx={{ m: 0, p: 0, listStyle: 'none' }}>
            <Box component="li">
              <Typography
                variant="h6"
                sx={{
                  display: 'block',
                  pt: 1.5,
                  pb: 1.5,
                  borderBottom: '1px solid',
                  borderColor: 'border.input',
                }}
              >
                {DEFAULT_OPTION.category}
              </Typography>
              <Box
                component="ul"
                sx={{ m: 0, p: 0, listStyle: 'none' }}
              >
                <Box
                  component="li"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 3,
                    py: 1.5,
                    borderBottom: '1px solid',
                    borderColor: 'border.subtle',
                  }}
                >
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body" sx={{ fontWeight: 700 }}>
                      {DEFAULT_OPTION.name}
                    </Typography>
                    <Typography variant="small" sx={{ color: 'text.muted', display: 'block', mt: 0.25 }}>
                      {DEFAULT_OPTION.riskLevel} risk · {DEFAULT_OPTION.annualFee}% p.a.
                    </Typography>
                  </Box>
                  <Box sx={{ width: '9rem', flexShrink: 0 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography
                        component="label"
                        htmlFor={`alloc-${DEFAULT_OPTION.id}`}
                        variant="small"
                        sx={{ color: 'text.muted', whiteSpace: 'nowrap', cursor: 'default' }}
                      >
                        Allocate:
                      </Typography>
                      <PercentageField
                        id={`alloc-${DEFAULT_OPTION.id}`}
                        aria-label={`Allocate ${DEFAULT_OPTION.name} percent`}
                        value={100}
                        size="medium"
                        disabled
                        onChange={() => {}}
                      />
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Stack>
          </Box>
        )}
      </Stack>

      {/* ── Custom allocation list ── */}
      {mode === 'custom' && (
        <Box
          sx={{
            border: '1px solid',
            borderColor: 'border.default',
            borderRadius: (t) => `${t.shape.md}px`,
            backgroundColor: 'background.paper',
            p: 3,
          }}
        >
        <Stack spacing={3}>
          {warning && (
            <Alert severity="warning" title={warning.title} message={warning.message} />
          )}

          <Stack component="ul" spacing={0} sx={{ m: 0, p: 0, listStyle: 'none' }}>
            {Object.entries(grouped).map(([category, categoryOptions], index) => (
              <Box component="li" key={category}>
                <Typography
                  variant="h6"
                  sx={{
                    display: 'block',
                    pt: index === 0 ? 1.5 : 4,
                    pb: 1.5,
                    borderBottom: '1px solid',
                    borderColor: 'border.input',
                  }}
                >
                  {category}
                </Typography>
                <Box component="ul" sx={{ m: 0, p: 0, listStyle: 'none' }}>
                  {categoryOptions.map((option) => (
                    <Box
                      component="li"
                      key={option.id}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 3,
                        py: 1.5,
                        borderBottom: '1px solid',
                        borderColor: 'border.subtle',
                      }}
                    >
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="body" sx={{ fontWeight: 700 }}>
                          {option.name}
                        </Typography>
                        <Typography variant="small" sx={{ color: 'text.muted', display: 'block', mt: 0.25 }}>
                          {option.riskLevel} risk · {option.annualFee}% p.a.
                        </Typography>
                      </Box>
                      <Box sx={{ width: '9rem', flexShrink: 0 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography
                            component="label"
                            htmlFor={`alloc-${option.id}`}
                            variant="small"
                            sx={{ color: 'text.muted', whiteSpace: 'nowrap', cursor: 'default' }}
                          >
                            Allocate:
                          </Typography>
                          <PercentageField
                            id={`alloc-${option.id}`}
                            aria-label={`Allocate ${option.name} percent`}
                            value={safeAllocations[option.id] ?? null}
                            size="medium"
                            onChange={(v) => handleAllocationChange(option.id, v)}
                          />
                        </Box>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Box>
            ))}
          </Stack>

          <Box
            ref={barRef}
            sx={{
              position: 'sticky',
              bottom: '1rem',
              zIndex: 1,
              boxShadow: isFloating ? 16 : 0,
              borderRadius: (t) => `${t.shape.sm}px`,
              transition: 'box-shadow 300ms ease',
            }}
          >
            <AllocationTotal total={parseFloat(total.toFixed(2))} attempted={showValidation} />
          </Box>
        </Stack>
        </Box>
      )}
    </Stack>
  );
}

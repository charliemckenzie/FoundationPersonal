'use client';

import { useRef, useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { AllocationTotal } from '../../beneficiaries/AllocationTotal';
import { Alert } from '../../../components/Alert';
import { PercentageField } from '../../../components/PercentageField';
import type { InvestmentOption } from '../../investment-mix/types';
import { validateStep3 } from '../../investment-mix/utils';
import { detectAllocationWarning } from '../../investment-mix/allocationWarnings';
import { MOCK_INVESTMENT_OPTIONS } from '../../investment-mix/mockData';

export { MOCK_INVESTMENT_OPTIONS };

export type InvestmentMode = 'default' | 'custom';

export interface InvestmentMixState {
  mode: InvestmentMode | '';
  allocations: Record<string, number>;
}

export const INITIAL_INVESTMENT_MIX: InvestmentMixState = {
  mode: 'custom',
  allocations: {},
};

export function investmentMixStepValid(mix: InvestmentMixState): boolean {
  const { valid } = validateStep3(mix.allocations ?? {}, MOCK_INVESTMENT_OPTIONS);
  return valid;
}

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
  const { allocations } = investmentMix;
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

  return (
    <Stack spacing={3}>
      <div>
        <Typography variant="h5" sx={{ mb: 0.5 }}>Choose your investment mix</Typography>
        <Typography variant="body" sx={{ color: 'text.primary' }}>
          Allocate your account across one or more investment options. Your total must equal 100%.
        </Typography>
      </div>

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
    </Stack>
  );
}

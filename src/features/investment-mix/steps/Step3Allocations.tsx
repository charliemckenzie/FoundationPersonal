'use client';

import { useRef, useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { PercentageField } from '../../../components/PercentageField';
import { AllocationTotal } from '../../beneficiaries/AllocationTotal';
import type { InvestmentOption } from '../types';
import { validateStep3 } from '../utils';

interface Step3AllocationsProps {
  options: InvestmentOption[];
  allocations: Record<string, number>;
  onChange: (optionId: string, value: number | null) => void;
  showValidation: boolean;
}

export function Step3Allocations({
  options,
  allocations,
  onChange,
  showValidation,
}: Step3AllocationsProps) {
  const { total } = validateStep3(allocations, options);
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
    // Matches the bar's `bottom: 1rem` sticky offset.
    const STUCK_OFFSET = 16;

    const update = () => {
      const barBottom = el.getBoundingClientRect().bottom;
      // The bar pins 1rem above the bottom of whatever actually scrolls. A detected scroll parent
      // can report a bottom far below the fold when the real scroller is the window, so clamp to
      // the viewport — otherwise the shadow only "catches up" once you start scrolling.
      const containerBottom =
        container === document.documentElement
          ? window.innerHeight
          : Math.min(container.getBoundingClientRect().bottom, window.innerHeight);
      // While pinned, the bar's bottom sits exactly STUCK_OFFSET above that visible bottom. The
      // moment it lands in normal flow it rises above that line — so the shadow drops the instant
      // it stops floating, rather than after an arbitrary scroll threshold.
      setIsFloating(barBottom >= containerBottom - STUCK_OFFSET - 0.5);
    };

    container.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);

    // The step animates in via StepTransition, which briefly clips this content (overflow: hidden)
    // and tweens its height — so the bar isn't at its real sticky position when the effect first
    // runs, and nothing else re-measures once the shell settles. Re-measure each frame for the
    // entrance window so the shadow is correct on load, without waiting for the user to scroll.
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

  return (
    <Stack spacing={3}>
      <div>
        <Typography variant="h5" sx={{ mb: 0.5 }}>
          Allocate your investment mix
        </Typography>
        <Typography variant="body">
          Set the percentage for each option below. Your total must equal 100%.
        </Typography>
      </div>

      <Stack component="ul" spacing={0} sx={{ m: 0, p: 0, listStyle: 'none' }}>
        {Object.entries(
          options.reduce<Record<string, typeof options>>((acc, opt) => {
            if (!acc[opt.category]) acc[opt.category] = [];
            acc[opt.category].push(opt);
            return acc;
          }, {}),
        ).map(([category, categoryOptions], index) => (
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
                    {option.currentAllocation > 0 && (
                      <Typography variant="small" sx={{ mt: 0.25, display: { xs: 'block', sm: 'none' } }}>
                        Current: <Box component="span" sx={{ fontWeight: 700 }}>{option.currentAllocation}%</Box>
                      </Typography>
                    )}
                  </Box>
                  {option.currentAllocation > 0 && (
                    <>
                      <Typography
                        variant="small"
                        sx={{ minWidth: '5rem', textAlign: 'right', display: { xs: 'none', sm: 'block' } }}
                      >
                        Current: <Box component="span" sx={{ fontWeight: 700 }}>{option.currentAllocation}%</Box>
                      </Typography>
                      <Box
                        sx={{
                          width: '1px',
                          alignSelf: 'stretch',
                          bgcolor: 'border.subtle',
                          mx: -1,
                          display: { xs: 'none', sm: 'block' },
                        }}
                      />
                    </>
                  )}
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
                        value={allocations[option.id] ?? null}
                        size="medium"
                        onChange={(v) => onChange(option.id, v)}
                      />
                    </Box>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        ))}
      </Stack>

      {/* Sticky total bar — floats with shadow while scroll room remains */}
      <Box ref={barRef} sx={{
          position: 'sticky',
          bottom: '1rem',
          zIndex: 1,
          boxShadow: isFloating ? 16 : 0,
          borderRadius: (t) => `${t.shape.sm}px`,
          transition: 'box-shadow 300ms ease',
        }}>
        <AllocationTotal total={parseFloat(total.toFixed(2))} attempted={showValidation} />
      </Box>
    </Stack>
  );
}

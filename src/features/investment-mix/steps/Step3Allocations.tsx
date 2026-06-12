'use client';

import { useRef, useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Alert } from '../../../components/Alert';
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
  const { valid, total } = validateStep3(allocations, options);
  const showError = showValidation && !valid;
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

    const update = () => {
      const remaining = container.scrollHeight - container.scrollTop - container.clientHeight;
      // Start fading 80px before the bar lands so the transition completes by the time it settles
      setIsFloating(remaining > 80);
    };

    container.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();

    return () => {
      container.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <Stack spacing={3}>
      <div>
        <Typography variant="h5" sx={{ mb: 0.5 }}>
          Investment options
        </Typography>
        <Typography variant="body">
          Allocate your investment across the options below. Your total must equal 100%.
        </Typography>
      </div>

      {showError && (
        <Alert
          severity="error"
          message={`Your allocations total ${total.toFixed(2)}%. Please adjust them to equal exactly 100%.`}
        />
      )}

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
                    py: 2,
                    borderBottom: '1px solid',
                    borderColor: 'border.subtle',
                  }}
                >
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body" sx={{ fontWeight: 700 }}>
                      {option.name}
                    </Typography>
                  </Box>
                  <Typography
                    variant="small"
                    sx={{
                      color: option.currentAllocation > 0 ? 'text.primary' : 'text.muted',
                      minWidth: '5rem',
                      textAlign: 'right',
                    }}
                  >
                    <Box component="span" sx={{ display: { xs: 'block', sm: 'inline' } }}>
                      Current:
                    </Box>{' '}
                    <Box component="span" sx={{ fontWeight: option.currentAllocation > 0 ? 700 : 400 }}>
                      {option.currentAllocation}%
                    </Box>
                  </Typography>
                  <Box
                    sx={{
                      width: '1px',
                      alignSelf: 'stretch',
                      bgcolor: 'border.subtle',
                      mx: -1,
                    }}
                  />
                  <Box sx={{ width: '9rem', flexShrink: 0 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography
                        component="label"
                        htmlFor={`alloc-${option.id}`}
                        variant="small"
                        sx={{ color: 'text.muted', whiteSpace: 'nowrap', cursor: 'default' }}
                      >
                        New:
                      </Typography>
                      <PercentageField
                        id={`alloc-${option.id}`}
                        aria-label={`Allocate ${option.name} percent`}
                        value={allocations[option.id] ?? null}
                        size="small"
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

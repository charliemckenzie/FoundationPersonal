import type React from 'react';
import Box from '@mui/material/Box';
import { Icon } from '../Icon';
import { Button } from '../Button';
import { Menu } from '../Menu';
import { type FormProgressStep, type StepState, resolveState } from './shared';

function stepMenuIcon(state: StepState): React.ReactNode {
  if (state === 'completed') return <Icon icon="circle-check" style="solid" size="md" color="primary" />;
  if (state === 'visited')   return <Icon icon="circle-check" style="light" size="md" color="primary" />;
  if (state === 'upcoming')  return <Icon icon="circle-dashed" style="light" size="md" color="text.muted" />;
  // active
  return (
    <Box component="span" sx={{ width: '1rem', height: '1rem', borderRadius: '50%', border: '2px solid', borderColor: 'primary.main', display: 'inline-flex', flexShrink: 0 }} />
  );
}

export interface StepCounterProps {
  activeStep: number;
  maxStep: number;
  steps: FormProgressStep[];
  showMenu: boolean;
  onStepClick?: (stepIndex: number) => void;
  disabledSteps?: number[];
}

export function StepCounter({ activeStep, maxStep, steps, showMenu, onStepClick, disabledSteps = [] }: StepCounterProps) {
  const label = `${activeStep + 1} of ${steps.length}`;

  if (showMenu && onStepClick) {
    return (
      <Menu
        trigger={
          <Button
            label={label}
            variant="outlined"
            size="small"
            condensed
            endIcon="chevron-down"
            sx={{ '& .MuiButton-endIcon > span': { fontSize: '0.75rem !important' } }}
          />
        }
        items={steps.map((step, i) => {
          const state = resolveState(i, activeStep, maxStep);
          return {
            label: step.label ?? `Step ${i + 1}`,
            disabled: i === activeStep || disabledSteps.includes(i),
            onClick: () => onStepClick(i),
            icon: stepMenuIcon(state),
          };
        })}
      />
    );
  }

  return (
    <Box component="span" sx={{ pointerEvents: 'none' }}>
      <Button label={label} variant="outlined" size="small" condensed />
    </Box>
  );
}

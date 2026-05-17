import React from 'react';
import Box from '@mui/material/Box';
import type { SxProps, Theme } from '@mui/material/styles';
import { StepCounter } from './StepCounter';
import { SteppedTrack } from './SteppedTrack';
import { SimpleBar } from './SimpleBar';
import {
  STEPPED_MIN_STEPS,
  STEPPED_MAX_STEPS,
  STEPPED_MAX_STEPS_LABELLED,
  STEPPED_BAR_OFFSET,
  SIMPLE_BAR_OFFSET,
  type FormProgressStep,
} from './shared';

export {
  STEPPED_MIN_STEPS,
  STEPPED_MAX_STEPS,
  STEPPED_MAX_STEPS_LABELLED,
  type FormProgressStep,
};

interface BaseProps {
  sx?: SxProps<Theme>;
  'aria-label'?: string;
  /** Show a "Step X of Y" indicator to the left of the progress bar */
  showStepIndicator?: boolean;
  /** When true, the step indicator becomes a soft button that opens a step navigation menu */
  stepMenu?: boolean;
}

export interface SimpleFormProgressProps extends BaseProps {
  variant: 'simple';
  /** Progress value 0–100 */
  value: number;
  /** Step list — used only for the step indicator and menu; not rendered visually */
  steps?: FormProgressStep[];
  /** 0-based index of the currently active step — required when steps is provided */
  activeStep?: number;
  /** Fired when a step is selected from the menu */
  onStepClick?: (stepIndex: number) => void;
}

export interface SteppedFormProgressProps extends BaseProps {
  variant: 'stepped';
  steps: FormProgressStep[];
  /** 0-based index of the currently active step */
  activeStep: number;
  /** 0-based index of the furthest step ever reached. Defaults to activeStep. */
  maxStep?: number;
  /** Fired when a step marker is clicked */
  onStepClick?: (stepIndex: number) => void;
  /** Show step labels as tooltips on hover instead of permanent text below each marker */
  tooltipLabels?: boolean;
}

export interface ResponsiveFormProgressProps extends BaseProps {
  variant: 'responsive';
  steps: FormProgressStep[];
  /** 0-based index of the currently active step */
  activeStep: number;
  /** 0-based index of the furthest step ever reached. Defaults to activeStep. */
  maxStep?: number;
  /** Fired when a step marker is clicked */
  onStepClick?: (stepIndex: number) => void;
  /** Show step labels as tooltips on hover instead of permanent text — applies to the sm+ stepped view */
  tooltipLabels?: boolean;
}

export type FormProgressProps = SimpleFormProgressProps | SteppedFormProgressProps | ResponsiveFormProgressProps;

interface WithStepIndicatorProps {
  showStepIndicator?: boolean;
  stepMenu?: boolean;
  activeStep?: number;
  maxStep?: number;
  steps?: FormProgressStep[];
  onStepClick?: (i: number) => void;
  sx?: SxProps<Theme>;
  barOffset?: string;
}

function withStepIndicator(bar: React.ReactNode, props: WithStepIndicatorProps): React.ReactElement {
  const { showStepIndicator, stepMenu, activeStep, maxStep, steps, onStepClick, sx, barOffset } = props;
  if (!showStepIndicator || activeStep == null || !steps?.length) {
    return <Box sx={sx}>{bar}</Box>;
  }
  return (
    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5, ...sx }}>
      <StepCounter
        activeStep={activeStep}
        maxStep={maxStep ?? activeStep}
        steps={steps}
        showMenu={!!stepMenu}
        onStepClick={onStepClick}
      />
      <Box sx={{ flex: 1, minWidth: 0, pt: barOffset }}>{bar}</Box>
    </Box>
  );
}

function warnSteppedConfig(steps: FormProgressStep[]) {
  if (process.env.NODE_ENV === 'production') return;
  if (steps.length < STEPPED_MIN_STEPS) {
    console.warn(`FormProgress: stepped variant requires at least ${STEPPED_MIN_STEPS} steps (received ${steps.length}). Use the simple variant for single-step progress.`);
  }
  if (steps.length > STEPPED_MAX_STEPS) {
    console.warn(`FormProgress: stepped variant supports a maximum of ${STEPPED_MAX_STEPS} steps (received ${steps.length}). Use the responsive variant for flows that need to scale down on mobile.`);
  }
  const hasLabels = steps.some((s) => s.label != null);
  if (hasLabels && steps.length > STEPPED_MAX_STEPS_LABELLED) {
    console.warn(`FormProgress: stepped variant with labels supports a maximum of ${STEPPED_MAX_STEPS_LABELLED} steps (received ${steps.length}). Use tooltipLabels or remove labels for larger step counts.`);
  }
}

export function FormProgress(props: FormProgressProps) {
  const { showStepIndicator, stepMenu, sx } = props;

  if (props.variant === 'simple') {
    const { value, steps, activeStep, onStepClick, 'aria-label': ariaLabel } = props;
    const pct = Math.min(100, Math.max(0, value));
    const visualPct = 10 + pct * 0.8;
    const bar = <SimpleBar pct={pct} visualPct={visualPct} ariaLabel={ariaLabel} />;
    return withStepIndicator(bar, { showStepIndicator, stepMenu, activeStep, steps, onStepClick, sx, barOffset: SIMPLE_BAR_OFFSET });
  }

  const { steps, activeStep, maxStep = activeStep, onStepClick, tooltipLabels, 'aria-label': ariaLabel } = props;

  if (props.variant === 'responsive') {
    const mobilePct = steps.length <= 1 ? 0 : Math.round((activeStep / (steps.length - 1)) * 100);
    const mobileVisualPct = 10 + mobilePct * 0.8;
    const mobileBar = <SimpleBar pct={mobilePct} visualPct={mobileVisualPct} ariaLabel={ariaLabel ?? 'Form progress'} />;

    const mobileRow = showStepIndicator && activeStep != null && steps.length ? (
      <Box sx={{ display: { xs: 'flex', sm: 'none' }, alignItems: 'flex-start', gap: 1.5 }}>
        <StepCounter
          activeStep={activeStep}
          maxStep={maxStep}
          steps={steps}
          showMenu={!!stepMenu}
          onStepClick={onStepClick}
        />
        <Box sx={{ flex: 1, minWidth: 0, pt: SIMPLE_BAR_OFFSET }}>{mobileBar}</Box>
      </Box>
    ) : (
      <Box sx={{ display: { xs: 'block', sm: 'none' } }}>{mobileBar}</Box>
    );

    return (
      <Box sx={sx}>
        {mobileRow}
        <SteppedTrack
          steps={steps}
          activeStep={activeStep}
          maxStep={maxStep}
          onStepClick={onStepClick}
          tooltipLabels={tooltipLabels}
          ariaLabel={ariaLabel}
          sx={{ display: { xs: 'none', sm: 'block' } }}
        />
      </Box>
    );
  }

  // stepped variant
  warnSteppedConfig(steps);
  const bar = <SteppedTrack steps={steps} activeStep={activeStep} maxStep={maxStep} onStepClick={onStepClick} tooltipLabels={tooltipLabels} ariaLabel={ariaLabel} />;
  return withStepIndicator(bar, { showStepIndicator, stepMenu, activeStep, maxStep, steps, onStepClick, sx, barOffset: STEPPED_BAR_OFFSET });
}

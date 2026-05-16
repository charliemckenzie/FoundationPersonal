import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';
import type { SxProps, Theme } from '@mui/material/styles';
import { Icon } from '../Icon';
import { Tooltip } from '../Tooltip';
import { Button } from '../Button';
import { Menu } from '../Menu';

// ─── Constants ───────────────────────────────────────────────────────────────
const MARKER_SIZE = '1.5rem';
const MARKER_HALF = '0.75rem'; // MARKER_SIZE / 2
const THUMB_SIZE = '1.25rem';
const STEPPED_TRACK_H = 4;
const SIMPLE_TRACK_H = 4;
export const STEPPED_MIN_STEPS = 2;
export const STEPPED_MAX_STEPS = 6;
/** Maximum recommended steps when using visible labels — beyond this labels crowd on small screens */
export const STEPPED_MAX_STEPS_LABELLED = 4;

// ─── Types ───────────────────────────────────────────────────────────────────
export interface FormProgressStep {
  id: string | number;
  label?: string;
}

type StepState = 'upcoming' | 'active' | 'completed' | 'visited';

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

// ─── Helpers ─────────────────────────────────────────────────────────────────
function resolveState(i: number, activeStep: number, maxStep: number): StepState {
  if (i < activeStep) return 'completed';
  if (i === activeStep) return 'active';
  if (i <= maxStep) return 'visited';
  return 'upcoming';
}

const MARKER_BASE_SX: SxProps<Theme> = {
  width: MARKER_SIZE,
  height: MARKER_SIZE,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  position: 'relative',
  zIndex: 1,
  p: 0,
  border: 0,
  bgcolor: 'background.paper',
  cursor: 'default',
  fontFamily: 'inherit',
};

const MARKER_STATE_SX: Record<StepState, SxProps<Theme>> = {
  upcoming:  { bgcolor: 'transparent', border: 0, color: 'text.muted' },
  active:    { width: THUMB_SIZE, height: THUMB_SIZE, border: '3px solid', borderColor: 'primary.main', boxShadow: (t) => `0 0 0 2px ${t.palette.background.paper}, 0 0 0 6px ${alpha(t.palette.primary.main, 0.18)}` },
  completed: { bgcolor: 'transparent', border: 0, color: 'primary.main' },
  visited:   { bgcolor: 'transparent', border: 0, color: 'primary.main' },
};

const INTERACTIVE_SX: SxProps<Theme> = {
  cursor: 'pointer',
  '&:focus-visible': { outline: '2px solid', outlineColor: 'primary.main', outlineOffset: '2px' },
};

// ─── StepCounter ─────────────────────────────────────────────────────────────
function stepMenuIcon(state: StepState): React.ReactNode {
  if (state === 'completed') return <Icon icon="circle-check" style="solid" size="md" color="primary" />;
  if (state === 'visited')   return <Icon icon="circle-check" style="light" size="md" color="primary" />;
  if (state === 'upcoming')  return <Icon icon="circle-dashed" style="light" size="md" color="text.muted" />;
  // active
  return (
    <Box component="span" sx={{ width: '1rem', height: '1rem', borderRadius: '50%', border: '2px solid', borderColor: 'primary.main', display: 'inline-flex', flexShrink: 0 }} />
  );
}

interface StepCounterProps {
  activeStep: number;
  maxStep: number;
  steps: FormProgressStep[];
  showMenu: boolean;
  onStepClick?: (stepIndex: number) => void;
}

function StepCounter({ activeStep, maxStep, steps, showMenu, onStepClick }: StepCounterProps) {
  const label = `${activeStep + 1} of ${steps.length}`;

  if (showMenu && onStepClick) {
    return (
      <Menu
        trigger={
          <Button
            label={label}
            variant="soft"
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
            disabled: i === activeStep,
            onClick: () => onStepClick(i),
            icon: stepMenuIcon(state),
          };
        })}
      />
    );
  }

  return (
    <Box component="span" sx={{ pointerEvents: 'none' }}>
      <Button
        label={label}
        variant="soft"
        size="small"
        condensed
      />
    </Box>
  );
}

// ─── StepMarker ──────────────────────────────────────────────────────────────
interface StepMarkerProps {
  state: StepState;
  label?: string;
  showLabelAsTooltip?: boolean;
  onClick?: () => void;
  ariaLabel: string;
}

function StepMarker({ state, label, showLabelAsTooltip, onClick, ariaLabel }: StepMarkerProps) {
  const sharedSx = [MARKER_BASE_SX, MARKER_STATE_SX[state]];

  const icon =
    state === 'completed' ? <Box component="span" sx={{ fontSize: '1.5rem', display: 'flex', lineHeight: 0, bgcolor: 'background.paper', borderRadius: '50%', p: '1px', cursor: 'inherit' }}><Icon icon="circle-check" style="solid" size="inherit" color="inherit" /></Box> :
    state === 'visited'   ? <Box component="span" sx={{ fontSize: '1.5rem', display: 'flex', lineHeight: 0, bgcolor: 'background.paper', borderRadius: '50%', p: '1px', cursor: 'inherit' }}><Icon icon="circle-check" style="light" size="inherit" color="inherit" /></Box> :
    state === 'upcoming'  ? <Box component="span" sx={{ fontSize: '1.5rem', display: 'flex', lineHeight: 0, bgcolor: 'background.paper', borderRadius: '50%', p: '1px', cursor: 'inherit' }}><Icon icon="circle-dashed" style="light" size="inherit" color="inherit" /></Box> :
    null;

  const labelEl = label != null && !showLabelAsTooltip ? (
    <Typography variant="caption" className="fm-label" sx={{ lineHeight: 1.4, textAlign: 'center', px: 0.5, color: state === 'active' ? 'primary.main' : 'text.muted', transition: 'color 0.15s ease' }}>
      {label}
    </Typography>
  ) : null;

  const inner = (
    <>
      <Box sx={{ width: MARKER_SIZE, height: MARKER_SIZE, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Box
          component="span"
          className="fm-marker-icon"
          aria-current={state === 'active' ? 'step' : undefined}
          sx={[...sharedSx, { transition: 'transform 0.15s ease' }]}
        >
          {icon}
        </Box>
      </Box>
      {labelEl}
    </>
  );

  const el = onClick ? (
    <Box
      component="button"
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 0.5,
        width: '100%',
        background: 'none',
        border: 0,
        p: 0,
        cursor: 'pointer',
        fontFamily: 'inherit',
        '& .fm-marker-icon': { cursor: 'pointer' },
        '&:hover .fm-marker-icon': { transform: 'scale(1.15)', transition: 'transform 0.15s ease', color: 'primary.dark' },
        '&:hover .fm-label': { color: 'primary.dark' },
        '&:focus-visible': { outline: '2px solid', outlineColor: 'primary.main', outlineOffset: '2px', borderRadius: '4px' },
      }}
    >
      {inner}
    </Box>
  ) : (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5, width: '100%' }}>
      {inner}
    </Box>
  );

  if (showLabelAsTooltip && label) {
    return <Tooltip title={label} placement="top">{el}</Tooltip>;
  }
  return el;
}

// ─── SteppedTrack ─────────────────────────────────────────────────────────────
interface SteppedTrackProps {
  steps: FormProgressStep[];
  activeStep: number;
  maxStep: number;
  onStepClick?: (stepIndex: number) => void;
  tooltipLabels?: boolean;
  ariaLabel?: string;
  sx?: SxProps<Theme>;
}

function SteppedTrack({ steps, activeStep, maxStep, onStepClick, tooltipLabels, ariaLabel, sx }: SteppedTrackProps) {
  const fillPct = ((2 * activeStep + 1) / (2 * steps.length) * 100).toFixed(4);
  const trackTop = `calc(${MARKER_SIZE} / 2 - ${STEPPED_TRACK_H / 2}px)`;
  return (
    <Box role="list" aria-label={ariaLabel ?? 'Form progress'} sx={{ position: 'relative', ...sx }}>
      <Box aria-hidden="true" sx={{ position: 'absolute', top: trackTop, left: 0, right: 0, height: STEPPED_TRACK_H, borderRadius: '99px', bgcolor: 'border.subtle' }} />
      <Box aria-hidden="true" sx={{ position: 'absolute', top: trackTop, left: 0, width: `${fillPct}%`, height: STEPPED_TRACK_H, borderRadius: '99px', bgcolor: 'primary.main', transition: 'width 0.35s cubic-bezier(0.4, 0, 0.2, 1)' }} />
      <Box sx={{ display: 'flex', position: 'relative', zIndex: 1 }}>
        {steps.map((step, i) => (
          <Box key={step.id} role="listitem" sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <StepMarker
              state={resolveState(i, activeStep, maxStep)}
              label={step.label}
              showLabelAsTooltip={tooltipLabels}
              onClick={onStepClick && i !== activeStep && resolveState(i, activeStep, maxStep) !== 'upcoming' ? () => onStepClick(i) : undefined}
              ariaLabel={step.label ?? `Step ${i + 1}`}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
}

// Condensed small button half-height (40px - 4px = 36px → 2.25rem) minus the
// bar's visual centre. Pushes the bar down so its track aligns with the button.
const STEPPED_BAR_OFFSET = 'calc(1.125rem - 0.75rem)';  // marker centre = 0.75rem
const SIMPLE_BAR_OFFSET  = 'calc(1.125rem - 0.625rem)'; // thumb centre  = 0.625rem

// ─── FormProgress ────────────────────────────────────────────────────────────
function withStepIndicator(
  bar: React.ReactNode,
  props: { showStepIndicator?: boolean; stepMenu?: boolean; activeStep?: number; maxStep?: number; steps?: FormProgressStep[]; onStepClick?: (i: number) => void; sx?: SxProps<Theme>; barOffset?: string },
): React.ReactElement {
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

export function FormProgress(props: FormProgressProps) {
  const { showStepIndicator, stepMenu, sx } = props;

  if (props.variant === 'simple') {
    const { value, steps, activeStep, onStepClick, 'aria-label': ariaLabel } = props;
    const pct = Math.min(100, Math.max(0, value));
    const visualPct = 10 + pct * 0.8;

    const bar = (
      <Box
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={ariaLabel}
        sx={{ position: 'relative', height: THUMB_SIZE }}
      >
        <Box aria-hidden="true" sx={{ position: 'absolute', top: '50%', left: 0, right: 0, transform: 'translateY(-50%)', height: SIMPLE_TRACK_H, bgcolor: 'border.subtle', borderRadius: '99px' }} />
        <Box aria-hidden="true" sx={{ position: 'absolute', top: '50%', left: 0, width: `${visualPct}%`, transform: 'translateY(-50%)', height: SIMPLE_TRACK_H, bgcolor: 'primary.main', borderRadius: '99px' }} />
        <Box sx={{ position: 'absolute', top: '50%', left: `${visualPct}%`, transform: 'translate(-50%, -50%)', width: THUMB_SIZE, height: THUMB_SIZE, borderRadius: '50%', bgcolor: 'background.paper', border: '3px solid', borderColor: 'primary.main', boxShadow: (t) => `0 0 0 2px ${t.palette.background.paper}, 0 0 0 6px ${alpha(t.palette.primary.main, 0.18)}`, zIndex: 1 }} />
      </Box>
    );

    return withStepIndicator(bar, { showStepIndicator, stepMenu, activeStep, steps, onStepClick, sx, barOffset: SIMPLE_BAR_OFFSET });
  }

  const { steps, activeStep, maxStep = activeStep, onStepClick, tooltipLabels, 'aria-label': ariaLabel } = props;

  if (props.variant === 'responsive') {
    const mobilePct = steps.length <= 1 ? 0 : Math.round((activeStep / (steps.length - 1)) * 100);
    const mobileVisualPct = 10 + mobilePct * 0.8;

    const mobileBar = (
      <Box
        role="progressbar"
        aria-valuenow={mobilePct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={ariaLabel ?? 'Form progress'}
        sx={{ position: 'relative', height: THUMB_SIZE }}
      >
        <Box aria-hidden="true" sx={{ position: 'absolute', top: '50%', left: 0, right: 0, transform: 'translateY(-50%)', height: SIMPLE_TRACK_H, bgcolor: 'border.subtle', borderRadius: '99px' }} />
        <Box aria-hidden="true" sx={{ position: 'absolute', top: '50%', left: 0, width: `${mobileVisualPct}%`, transform: 'translateY(-50%)', height: SIMPLE_TRACK_H, bgcolor: 'primary.main', borderRadius: '99px' }} />
        <Box sx={{ position: 'absolute', top: '50%', left: `${mobileVisualPct}%`, transform: 'translate(-50%, -50%)', width: THUMB_SIZE, height: THUMB_SIZE, borderRadius: '50%', bgcolor: 'background.paper', border: '3px solid', borderColor: 'primary.main', boxShadow: (t) => `0 0 0 2px ${t.palette.background.paper}, 0 0 0 6px ${alpha(t.palette.primary.main, 0.18)}`, zIndex: 1 }} />
      </Box>
    );

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
  if (steps.length < STEPPED_MIN_STEPS && process.env.NODE_ENV !== 'production') {
    console.warn(`FormProgress: stepped variant requires at least ${STEPPED_MIN_STEPS} steps (received ${steps.length}). Use the simple variant for single-step progress.`);
  }
  if (steps.length > STEPPED_MAX_STEPS && process.env.NODE_ENV !== 'production') {
    console.warn(`FormProgress: stepped variant supports a maximum of ${STEPPED_MAX_STEPS} steps (received ${steps.length}). Use the responsive variant for flows that need to scale down on mobile.`);
  }
  const hasLabels = steps.some((s) => s.label != null);
  if (hasLabels && steps.length > STEPPED_MAX_STEPS_LABELLED && process.env.NODE_ENV !== 'production') {
    console.warn(`FormProgress: stepped variant with labels supports a maximum of ${STEPPED_MAX_STEPS_LABELLED} steps (received ${steps.length}). Use tooltipLabels or remove labels for larger step counts.`);
  }

  const bar = <SteppedTrack steps={steps} activeStep={activeStep} maxStep={maxStep} onStepClick={onStepClick} tooltipLabels={tooltipLabels} ariaLabel={ariaLabel} />;
  return withStepIndicator(bar, { showStepIndicator, stepMenu, activeStep, maxStep, steps, onStepClick, sx, barOffset: STEPPED_BAR_OFFSET });
}

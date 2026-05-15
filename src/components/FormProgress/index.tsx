import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';
import type { SxProps, Theme } from '@mui/material/styles';
import { Icon } from '../Icon';

// ─── Constants ───────────────────────────────────────────────────────────────
const MARKER_SIZE = '1.5rem';
const MARKER_HALF = '0.75rem'; // MARKER_SIZE / 2
const THUMB_SIZE = '1.25rem';
const STEPPED_TRACK_H = 3;
const SIMPLE_TRACK_H = 4;

// ─── Types ───────────────────────────────────────────────────────────────────
export interface FormProgressStep {
  id: string | number;
  label?: string;
}

type StepState = 'upcoming' | 'active' | 'completed' | 'visited';

interface BaseProps {
  sx?: SxProps<Theme>;
  'aria-label'?: string;
}

export interface SimpleFormProgressProps extends BaseProps {
  variant: 'simple';
  /** Progress value 0–100 */
  value: number;
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
}

export type FormProgressProps = SimpleFormProgressProps | SteppedFormProgressProps;

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

// ─── StepMarker ──────────────────────────────────────────────────────────────
interface StepMarkerProps {
  state: StepState;
  label?: string;
  onClick?: () => void;
  ariaLabel: string;
}

function StepMarker({ state, label, onClick, ariaLabel }: StepMarkerProps) {
  const sharedSx = [MARKER_BASE_SX, MARKER_STATE_SX[state]];

  const icon =
    state === 'completed' ? <Box component="span" sx={{ fontSize: '1.5rem', display: 'flex', lineHeight: 0, bgcolor: 'background.paper', borderRadius: '50%', p: '1px', cursor: 'inherit' }}><Icon icon="circle-check" style="solid" size="inherit" color="inherit" /></Box> :
    state === 'visited'   ? <Box component="span" sx={{ fontSize: '1.5rem', display: 'flex', lineHeight: 0, bgcolor: 'background.paper', borderRadius: '50%', p: '1px', cursor: 'inherit' }}><Icon icon="circle-check" style="light" size="inherit" color="inherit" /></Box> :
    state === 'upcoming'  ? <Box component="span" sx={{ fontSize: '1.5rem', display: 'flex', lineHeight: 0, bgcolor: 'background.paper', borderRadius: '50%', p: '1px', cursor: 'inherit' }}><Icon icon="circle-dashed" style="light" size="inherit" color="inherit" /></Box> :
    null;

  const labelEl = label != null ? (
    <Typography variant="caption" className="fm-label" sx={{ lineHeight: 1.4, textAlign: 'center', color: state === 'active' ? 'primary.main' : 'text.muted', transition: 'color 0.15s ease' }}>
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

  return onClick ? (
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
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5 }}>
      {inner}
    </Box>
  );
}

// ─── FormProgress ────────────────────────────────────────────────────────────
export function FormProgress(props: FormProgressProps) {
  if (props.variant === 'simple') {
    const { value, sx, 'aria-label': ariaLabel } = props;
    const pct = Math.min(100, Math.max(0, value));

    // Thumb travels between 10% and 90% of the track so there is always
    // visible track on both sides regardless of the current value.
    const visualPct = 10 + pct * 0.8;

    return (
      <Box
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={ariaLabel}
        sx={{ position: 'relative', height: THUMB_SIZE, ...sx }}
      >
        {/* Track — full width */}
        <Box
          aria-hidden="true"
          sx={{
            position: 'absolute',
            top: '50%',
            left: 0,
            right: 0,
            transform: 'translateY(-50%)',
            height: SIMPLE_TRACK_H,
            bgcolor: 'border.subtle',
            borderRadius: '99px',
          }}
        />
        {/* Fill — from left edge to thumb position */}
        <Box
          aria-hidden="true"
          sx={{
            position: 'absolute',
            top: '50%',
            left: 0,
            width: `${visualPct}%`,
            transform: 'translateY(-50%)',
            height: SIMPLE_TRACK_H,
            bgcolor: 'primary.main',
            borderRadius: '99px',
          }}
        />
        {/* Thumb */}
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: `${visualPct}%`,
            transform: 'translate(-50%, -50%)',
            width: THUMB_SIZE,
            height: THUMB_SIZE,
            borderRadius: '50%',
            bgcolor: 'background.paper',
            border: '3px solid',
            borderColor: 'primary.main',
            boxShadow: (t) => `0 0 0 2px ${t.palette.background.paper}, 0 0 0 6px ${alpha(t.palette.primary.main, 0.18)}`,
            zIndex: 1,
          }}
        />
      </Box>
    );
  }

  const { steps, activeStep, maxStep = activeStep, onStepClick, sx, 'aria-label': ariaLabel } = props;
  // Track runs full width. Fill reaches from the left edge to the centre of the active segment.
  // Centre of segment i (0-indexed) = (2i + 1) / (2 * N) * 100%
  const fillPct = ((2 * activeStep + 1) / (2 * steps.length) * 100).toFixed(4);
  const trackTop = `calc(${MARKER_SIZE} / 2 - ${STEPPED_TRACK_H / 2}px)`;

  return (
    <Box
      role="list"
      aria-label={ariaLabel ?? 'Form progress'}
      sx={{ position: 'relative', ...sx }}
    >
      <Box
        aria-hidden="true"
        sx={{
          position: 'absolute',
          top: trackTop,
          left: 0,
          right: 0,
          height: STEPPED_TRACK_H,
          borderRadius: '99px',
          bgcolor: 'border.subtle',
        }}
      />
      <Box
        aria-hidden="true"
        sx={{
          position: 'absolute',
          top: trackTop,
          left: 0,
          width: `${fillPct}%`,
          height: STEPPED_TRACK_H,
          borderRadius: '99px',
          bgcolor: 'primary.main',
          transition: 'width 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      />
      <Box sx={{ display: 'flex', position: 'relative', zIndex: 1 }}>
        {steps.map((step, i) => (
          <Box key={step.id} role="listitem" sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <StepMarker
              state={resolveState(i, activeStep, maxStep)}
              label={step.label}
              onClick={onStepClick && i !== activeStep && resolveState(i, activeStep, maxStep) !== 'upcoming' ? () => onStepClick(i) : undefined}
              ariaLabel={step.label ?? `Step ${i + 1}`}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
}

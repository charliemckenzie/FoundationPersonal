import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
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
  upcoming:  { border: '1.5px dashed', borderColor: 'border.default' },
  active:    { border: '2px solid',    borderColor: 'primary.main'   },
  completed: { bgcolor: 'primary.main' },
  visited:   { bgcolor: 'text.muted'   },
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
  const hasCheck = state === 'completed' || state === 'visited';
  const sharedSx = [MARKER_BASE_SX, MARKER_STATE_SX[state]];

  const icon = hasCheck ? (
    <Box component="span" sx={{ color: 'common.white', display: 'flex', lineHeight: 0 }}>
      <Icon icon="check" size="sm" color="inherit" />
    </Box>
  ) : null;

  const labelEl = label != null ? (
    <Typography variant="caption" color="text.muted" sx={{ lineHeight: 1.4, textAlign: 'center' }}>
      {label}
    </Typography>
  ) : null;

  const markerEl = onClick ? (
    <Box
      component="button"
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      aria-current={state === 'active' ? 'step' : undefined}
      sx={[...sharedSx, INTERACTIVE_SX]}
    >
      {icon}
    </Box>
  ) : (
    <Box
      component="span"
      aria-label={ariaLabel}
      aria-current={state === 'active' ? 'step' : undefined}
      sx={sharedSx}
    >
      {icon}
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5 }}>
      {markerEl}
      {labelEl}
    </Box>
  );
}

// ─── FormProgress ────────────────────────────────────────────────────────────
export function FormProgress(props: FormProgressProps) {
  if (props.variant === 'simple') {
    const { value, sx, 'aria-label': ariaLabel } = props;
    const pct = Math.min(100, Math.max(0, value));

    // Strategy: an inner "travel zone" container is inset by MARKER_HALF on each
    // side. The thumb uses simple `left: pct%` inside that container — no calc
    // multiplication needed. Fill is also in the travel zone but extends left
    // by MARKER_HALF to reach the outer left edge.
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
        {/* Travel zone — inset MARKER_HALF each side so thumb centre aligns
            with the stepped markers at 0 % and 100 % */}
        <Box
          aria-hidden="true"
          sx={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: MARKER_HALF,
            right: MARKER_HALF,
          }}
        >
          {/* Fill — sticks left back to the outer edge, width grows with pct */}
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: `-${MARKER_HALF}`,
              width: `calc(${MARKER_HALF} + ${pct}%)`,
              transform: 'translateY(-50%)',
              height: SIMPLE_TRACK_H,
              bgcolor: 'primary.main',
              borderRadius: '99px',
            }}
          />
          {/* Thumb — simple percentage of the travel zone */}
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: `${pct}%`,
              transform: 'translate(-50%, -50%)',
              width: THUMB_SIZE,
              height: THUMB_SIZE,
              borderRadius: '50%',
              bgcolor: 'background.paper',
              border: '2px solid',
              borderColor: 'primary.main',
              zIndex: 1,
            }}
          />
        </Box>
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
        }}
      />
      <Box sx={{ display: 'flex' }}>
        {steps.map((step, i) => (
          <Box key={step.id} role="listitem" sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <StepMarker
              state={resolveState(i, activeStep, maxStep)}
              label={step.label}
              onClick={onStepClick ? () => onStepClick(i) : undefined}
              ariaLabel={step.label ?? `Step ${i + 1}`}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
}

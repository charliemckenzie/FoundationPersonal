import { alpha, type Theme } from '@mui/material/styles';

export const MARKER_SIZE = '1.5rem';
export const THUMB_SIZE = '1.25rem';
export const STEPPED_TRACK_H = 4;
export const SIMPLE_TRACK_H = 4;
export const STEPPED_MIN_STEPS = 2;
export const STEPPED_MAX_STEPS = 6;
/** Maximum recommended steps when using visible labels — beyond this labels crowd on small screens */
export const STEPPED_MAX_STEPS_LABELLED = 4;

// Condensed small button half-height (40px - 4px = 36px → 2.25rem) minus the
// bar's visual centre. Pushes the bar down so its track aligns with the button.
export const STEPPED_BAR_OFFSET = 'calc(1.125rem - 0.75rem)';  // marker centre = 0.75rem
export const SIMPLE_BAR_OFFSET  = 'calc(1.125rem - 0.625rem)'; // thumb centre  = 0.625rem

export interface FormProgressStep {
  id: string | number;
  label?: string;
}

export type StepState = 'upcoming' | 'active' | 'completed' | 'visited';

export function resolveState(i: number, activeStep: number, maxStep: number): StepState {
  if (i < activeStep) return 'completed';
  if (i === activeStep) return 'active';
  if (i <= maxStep) return 'visited';
  return 'upcoming';
}

// Typed via inference (not SxProps<Theme>) so these can be spread into other sx
// arrays without producing a recursive array shape MUI v9 won't accept.
export const MARKER_BASE_SX = {
  width: MARKER_SIZE,
  height: MARKER_SIZE,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  position: 'relative' as const,
  zIndex: 1,
  p: 0,
  border: 0,
  bgcolor: 'background.paper',
  cursor: 'default',
  fontFamily: 'inherit',
};

export const MARKER_STATE_SX = {
  upcoming:  { bgcolor: 'transparent', border: 0, color: 'text.muted' },
  active:    { width: THUMB_SIZE, height: THUMB_SIZE, border: '3px solid', borderColor: 'primary.main', boxShadow: (t: Theme) => `0 0 0 2px ${t.palette.background.paper}, 0 0 0 6px ${alpha(t.palette.primary.main, 0.18)}` },
  completed: { bgcolor: 'transparent', border: 0, color: 'primary.main' },
  visited:   { bgcolor: 'transparent', border: 0, color: 'primary.main' },
} satisfies Record<StepState, object>;

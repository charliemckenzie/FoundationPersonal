import Box from '@mui/material/Box';
import type { SxProps, Theme } from '@mui/material/styles';
import { StepMarker } from './StepMarker';
import { type FormProgressStep, resolveState, MARKER_SIZE, STEPPED_TRACK_H } from './shared';

export interface SteppedTrackProps {
  steps: FormProgressStep[];
  activeStep: number;
  maxStep: number;
  onStepClick?: (stepIndex: number) => void;
  tooltipLabels?: boolean;
  ariaLabel?: string;
  sx?: SxProps<Theme>;
}

export function SteppedTrack({ steps, activeStep, maxStep, onStepClick, tooltipLabels, ariaLabel, sx }: SteppedTrackProps) {
  const rawPct = (2 * activeStep + 1) / (2 * steps.length) * 100;
  const fillPct = Math.min(rawPct, 100).toFixed(4);
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

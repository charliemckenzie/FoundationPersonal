import Box from '@mui/material/Box';
import { alpha } from '@mui/material/styles';
import { SIMPLE_TRACK_H, THUMB_SIZE } from './shared';

export interface SimpleBarProps {
  /** Percentage 0-100 of the underlying value */
  pct: number;
  /** Visual percentage for the thumb position (pct compressed inside a 10–90% display range) */
  visualPct: number;
  ariaLabel?: string;
}

/** The shared 0–100% bar with thumb. Used by the simple variant and by the responsive
 *  variant's mobile fallback. */
export function SimpleBar({ pct, visualPct, ariaLabel }: SimpleBarProps) {
  return (
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
}

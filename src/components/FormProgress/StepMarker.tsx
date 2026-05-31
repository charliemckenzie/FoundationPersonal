import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Icon } from '../Icon';
import { Tooltip } from '../Tooltip';
import { MARKER_SIZE, MARKER_BASE_SX, MARKER_STATE_SX, type StepState } from './shared';

export interface StepMarkerProps {
  state: StepState;
  label?: string;
  showLabelAsTooltip?: boolean;
  onClick?: () => void;
  ariaLabel: string;
}

const ICON_WRAPPER_SX = {
  fontSize: '1.5rem',
  display: 'flex',
  lineHeight: 0,
  bgcolor: 'background.paper',
  borderRadius: '50%',
  p: '1px',
  cursor: 'inherit',
};

function MarkerIcon({ state }: { state: StepState }) {
  if (state === 'completed') return <Box component="span" sx={ICON_WRAPPER_SX}><Icon icon="circle-check" style="solid" size="inherit" color="inherit" /></Box>;
  if (state === 'visited')   return <Box component="span" sx={ICON_WRAPPER_SX}><Icon icon="circle-check" style="light" size="inherit" color="inherit" /></Box>;
  if (state === 'upcoming')  return <Box component="span" sx={ICON_WRAPPER_SX}><Icon icon="circle-dashed" style="light" size="inherit" color="inherit" /></Box>;
  return null;
}

export function StepMarker({ state, label, showLabelAsTooltip, onClick, ariaLabel }: StepMarkerProps) {
  const sharedSx = [MARKER_BASE_SX, MARKER_STATE_SX[state]];

  const labelEl = label != null && !showLabelAsTooltip ? (
    <Typography variant="small" className="fm-label" sx={(t) => ({ fontSize: t.typography.caption.fontSize, lineHeight: 1.4, textAlign: 'center', px: 0.5, color: state === 'active' ? 'primary.main' : 'text.muted', transition: 'color 0.15s ease' })}>
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
          <MarkerIcon state={state} />
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

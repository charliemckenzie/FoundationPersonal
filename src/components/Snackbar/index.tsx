import MuiSnackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import type React from 'react';
import { Icon } from '../Icon';
import { SEVERITY_ICONS } from '../Alert';

export type SnackbarSeverity = 'success' | 'error' | 'warning' | 'info';

export interface SnackbarAnchorOrigin {
  vertical: 'top' | 'bottom';
  horizontal: 'left' | 'center' | 'right';
}

export interface SnackbarProps {
  open: boolean;
  message: string;
  severity?: SnackbarSeverity;
  /** Auto-hide duration in ms. Pass null to disable auto-hide. Defaults to 6000. */
  duration?: number | null;
  onClose?: () => void;
  action?: React.ReactNode;
  anchorOrigin?: SnackbarAnchorOrigin;
}

const ICON_MAPPING = {
  success: <Icon icon={SEVERITY_ICONS.success} style="solid" color="inherit" size="lg" />,
  error:   <Icon icon={SEVERITY_ICONS.error}   style="solid" color="inherit" size="lg" />,
  warning: <Icon icon={SEVERITY_ICONS.warning} style="solid" color="inherit" size="lg" />,
  info:    <Icon icon={SEVERITY_ICONS.info}    style="solid" color="inherit" size="lg" />,
};

export function Snackbar({
  open,
  message,
  severity,
  duration = 6000,
  onClose,
  action,
  anchorOrigin = { vertical: 'bottom', horizontal: 'center' },
}: SnackbarProps) {
  if (severity) {
    return (
      <MuiSnackbar
        open={open}
        autoHideDuration={duration}
        onClose={(_event, reason) => {
          if (reason === 'clickaway') return;
          onClose?.();
        }}
        anchorOrigin={anchorOrigin}
      >
        <MuiAlert
          onClose={onClose}
          severity={severity}
          variant="filled"
          iconMapping={ICON_MAPPING}
          sx={{ width: '100%' }}
        >
          {message}
        </MuiAlert>
      </MuiSnackbar>
    );
  }

  return (
    <MuiSnackbar
      open={open}
      autoHideDuration={duration}
      onClose={(_event, reason) => {
        if (reason === 'clickaway') return;
        onClose?.();
      }}
      anchorOrigin={anchorOrigin}
      message={message}
      action={action}
    />
  );
}

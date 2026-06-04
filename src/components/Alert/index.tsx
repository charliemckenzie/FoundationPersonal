import MuiAlert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Box from '@mui/material/Box';
import type React from 'react';
import { IconButton } from '../IconButton';

export type AlertSeverity = 'error' | 'warning' | 'info' | 'success';

export interface AlertProps {
  severity: AlertSeverity;
  message: React.ReactNode;
  title?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  onClose?: () => void;
}

export const SEVERITY_ICONS = {
  error: 'circle-exclamation',
  warning: 'circle-exclamation',
  info: 'circle-info',
  success: 'circle-check',
} as const;

const SEVERITY_LABELS: Record<AlertSeverity, string> = {
  error: 'Error',
  warning: 'Warning',
  info: 'Information',
  success: 'Success',
};

const visiblyHiddenSx = {
  position: 'absolute',
  width: '1px',
  height: '1px',
  margin: '-1px',
  overflow: 'hidden',
  clip: 'rect(0,0,0,0)',
  whiteSpace: 'nowrap',
  border: 0,
} as const;

export function Alert({
  severity,
  message,
  title,
  icon,
  action,
  onClose,
}: AlertProps) {
  const hasAction = Boolean(action || onClose);
  const role = severity === 'error' || severity === 'warning' ? 'alert' : 'status';

  return (
    <MuiAlert
      severity={severity}
      icon={false}
      role={role}
      sx={{ '& .MuiAlert-message': { width: '100%', py: 0 } }}
    >
      <Box sx={{
        display: 'flex',
        flexDirection: action ? { xs: 'column', sm: 'row' } : 'row',
        alignItems: { xs: 'flex-start', sm: 'center' },
        justifyContent: 'space-between',
        gap: action ? { xs: 1.5, sm: 2 } : 2,
      }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
          {icon && <Box sx={{ display: 'flex', mt: '2px', color: `${severity}.icon` }}>{icon}</Box>}
          <Box>
            {title && <AlertTitle component="h4" sx={{ typography: 'body', m: 0, fontWeight: 700 }}>{title}</AlertTitle>}
            <Box component="span" sx={visiblyHiddenSx}>{SEVERITY_LABELS[severity]}: </Box>
            {message}
          </Box>
        </Box>
        {hasAction && (
          <Box sx={{ display: 'flex', alignItems: 'center', flexShrink: 0, pl: action ? { xs: 4, sm: 0 } : 0 }}>
            {action}
            {onClose && (
              <IconButton
                icon="xmark"
                label={`Dismiss ${SEVERITY_LABELS[severity]} alert`}
                variant="soft"
                color={severity}
                size="small"
                showTooltip={false}
                onClick={onClose}
                sx={{ color: 'inherit' }}
              />
            )}
          </Box>
        )}
      </Box>
    </MuiAlert>
  );
}

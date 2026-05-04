import MuiAlert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import type React from 'react';
import { Icon } from '../Icon';
import { buildSoftStyles } from '../buttons/variantStyles';

export type AlertSeverity = 'error' | 'warning' | 'info' | 'success';
export type AlertVariant = 'standard' | 'filled' | 'outlined' | 'no-icon';

export interface AlertProps {
  severity: AlertSeverity;
  message: string;
  title?: string;
  variant?: AlertVariant;
  icon?: React.ReactNode | false;
  action?: React.ReactNode;
  onClose?: () => void;
}

const SEVERITY_ICONS = {
  error: 'alert_2',
  warning: 'alert_1',
  info: 'info_1',
  success: 'tick',
} as const;

export function Alert({
  severity,
  message,
  title,
  variant = 'standard',
  icon,
  action,
  onClose,
}: AlertProps) {
  const muiVariant = variant === 'no-icon' ? 'standard' : variant;
  const showIcon = variant !== 'no-icon' && icon !== false;
  const resolvedIcon = showIcon
    ? (icon !== undefined ? icon : <Icon icon={SEVERITY_ICONS[severity]} color={muiVariant === 'filled' ? 'inherit' : severity} size="lg" />)
    : null;

  const hasAction = Boolean(action || onClose);

  return (
    <MuiAlert
      severity={severity}
      variant={muiVariant}
      icon={false}
      sx={{ '& .MuiAlert-message': { width: '100%', py: 0 } }}
    >
      <Box sx={{
        display: 'flex',
        flexDirection: action ? { xs: 'column', sm: 'row' } : 'row',
        alignItems: onClose ? 'flex-start' : { xs: 'flex-start', sm: 'center' },
        justifyContent: 'space-between',
        gap: action ? { xs: 1.5, sm: 2 } : 2,
      }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
          {resolvedIcon && <Box sx={{ display: 'flex', mt: '2px' }}>{resolvedIcon}</Box>}
          <Box>
            {title && <AlertTitle>{title}</AlertTitle>}
            {message}
          </Box>
        </Box>
        {hasAction && (
          <Box sx={{ display: 'flex', alignItems: 'center', flexShrink: 0, pl: action ? { xs: 4, sm: 0 } : 0 }}>
            {action}
            {onClose && (
              <IconButton
                size="small"
                onClick={onClose}
                aria-label="Dismiss"
                sx={{ mt: '2px', width: 32, height: 32, borderRadius: '50%', '& .MuiTouchRipple-root': { display: 'none' }, ...buildSoftStyles(severity), color: 'inherit' }}
              >
                <Icon icon="xmark" size="md" />
              </IconButton>
            )}
          </Box>
        )}
      </Box>
    </MuiAlert>
  );
}

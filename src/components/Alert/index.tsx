import MuiAlert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { faCircleExclamation, faTriangleExclamation, faCircleInfo, faCircleCheck } from '@fortawesome/pro-solid-svg-icons';
import type React from 'react';
import { Icon } from '../Icon';

export type AlertSeverity = 'error' | 'warning' | 'info' | 'success';
export type AlertVariant = 'standard' | 'filled' | 'outlined';

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
  error: faCircleExclamation,
  warning: faTriangleExclamation,
  info: faCircleInfo,
  success: faCircleCheck,
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
  const resolvedIcon = icon !== undefined
    ? icon
    : <Icon icon={SEVERITY_ICONS[severity]} color={severity} size="medium" />;

  return (
    <MuiAlert
      severity={severity}
      variant={variant}
      icon={resolvedIcon}
      action={action}
      onClose={onClose}
    >
      {title && <AlertTitle>{title}</AlertTitle>}
      {message}
    </MuiAlert>
  );
}

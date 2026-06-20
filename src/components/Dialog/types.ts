import type React from 'react';

export type DialogVariant = 'neutral' | 'info' | 'warning' | 'danger' | 'alert';
export type DialogSize = 'small' | 'medium' | 'large';
export type AlertButtonLayout = 'row' | 'stack';
export type DialogMobileDisplay = 'drawer' | 'dialog';
export interface AlertAction { label: string; onClick: () => void }

export interface DialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children?: React.ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm?: () => void;
  /** Disables the confirm button — e.g. while a form in the body is incomplete. */
  confirmDisabled?: boolean;
  variant?: DialogVariant;
  size?: DialogSize;
  loading?: boolean;
  disableCloseOnBackdrop?: boolean;
  hideCloseButton?: boolean;
  hideCancel?: boolean;
  /** Suppresses the variant icon next to the dialog title. */
  hideIcon?: boolean;
  titleVariant?: 'h4' | 'h5' | 'h6';
  alertButtonLayout?: AlertButtonLayout;
  extraActions?: ReadonlyArray<AlertAction>;
  mobileDisplay?: DialogMobileDisplay;
}

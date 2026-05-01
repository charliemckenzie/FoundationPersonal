import MuiDialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import MuiIconButton from '@mui/material/IconButton';
import { Icon } from '../Icon';
import type React from 'react';

export type ModalSize = 'small' | 'medium' | 'large' | 'fullscreen';

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  ariaLabel?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
  size?: ModalSize;
  disableCloseOnBackdrop?: boolean;
}

const SIZE_MAP: Record<ModalSize, 'sm' | 'md' | 'lg' | false> = {
  small: 'sm',
  medium: 'md',
  large: 'lg',
  fullscreen: false,
};

export function Modal({
  open,
  onClose,
  title,
  ariaLabel,
  children,
  actions,
  size = 'medium',
  disableCloseOnBackdrop = false,
}: ModalProps) {
  return (
    <MuiDialog
      open={open}
      onClose={disableCloseOnBackdrop ? undefined : onClose}
      maxWidth={SIZE_MAP[size]}
      fullScreen={size === 'fullscreen'}
      fullWidth
      aria-labelledby={title ? 'modal-title' : undefined}
      aria-label={!title ? ariaLabel : undefined}
    >
      {title && (
        <DialogTitle id="modal-title" sx={{ pr: 6 }}>
          {title}
          <MuiIconButton
            aria-label="Close modal"
            onClick={onClose}
            size="small"
            sx={{
              position: 'absolute',
              top: (t) => t.spacing(1),
              right: (t) => t.spacing(1),
              color: 'text.muted',
            }}
          >
            <Icon icon="cross" size="sm" />
          </MuiIconButton>
        </DialogTitle>
      )}
      <DialogContent dividers>{children}</DialogContent>
      {actions && <DialogActions sx={{ px: 3, py: 2 }}>{actions}</DialogActions>}
    </MuiDialog>
  );
}

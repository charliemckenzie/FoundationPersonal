import MuiDialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Typography from '@mui/material/Typography';
import { CloseButton } from '../CloseButton';
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
        <DialogTitle
          id="modal-title"
          sx={(t) => ({
            display: 'flex',
            alignItems: 'center',
            py: t.spacing(1),
            pl: 3,
            pr: t.spacing(1),
          })}
        >
          <Typography variant="h4" component="span" sx={{ flex: 1 }}>
            {title}
          </Typography>
          <CloseButton
            onClick={onClose}
            label="Close"
            sx={{ ml: 1, flexShrink: 0 }}
          />
        </DialogTitle>
      )}
      <DialogContent dividers>{children}</DialogContent>
      {actions && <DialogActions sx={{ px: 3, py: 2 }}>{actions}</DialogActions>}
    </MuiDialog>
  );
}

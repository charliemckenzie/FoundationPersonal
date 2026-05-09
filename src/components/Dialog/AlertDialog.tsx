import React from 'react';
import MuiDialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import type { Theme } from '@mui/material/styles';
import { Button } from '../Button';
import type { AlertAction, AlertButtonLayout, DialogSize } from './index';

interface AlertDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children?: React.ReactNode;
  confirmLabel: string;
  cancelLabel: string;
  onConfirm?: () => void;
  loading: boolean;
  alertButtonLayout: AlertButtonLayout;
  extraActions?: ReadonlyArray<AlertAction>;
  size: DialogSize;
}

export function AlertDialog({
  open,
  onClose,
  title,
  description,
  children,
  confirmLabel,
  cancelLabel,
  onConfirm,
  loading,
  alertButtonLayout,
  extraActions,
}: AlertDialogProps) {
  return (
    <MuiDialog
      open={open}
      onClose={undefined}
      maxWidth={false}
      role="alertdialog"
      aria-labelledby="alert-dialog-title"
      aria-describedby={description ? 'alert-dialog-description' : undefined}
      slotProps={{
        paper: {
          sx: {
            width: 300,
            borderRadius: (t: Theme) => `${t.shape['xl']}px`,
            backgroundColor: 'background.paper',
            overflow: 'hidden',
            m: 2,
          },
        },
      }}
    >
      <Box sx={{ pt: 3.5, pb: 2.5, px: 2.5, textAlign: 'center' }}>
        <Typography
          id="alert-dialog-title"
          variant="body"
          component="h2"
          sx={{ fontWeight: 700, display: 'block', mb: description ? 0.25 : 0 }}
        >
          {title}
        </Typography>
        {description && (
          <Typography
            id="alert-dialog-description"
            variant="small"
            color="text.muted"
            sx={{ display: 'block' }}
          >
            {description}
          </Typography>
        )}
        {children}
      </Box>
      {alertButtonLayout === 'stack' ? (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, px: 2.5, pb: 2.5 }}>
          {onConfirm && (
            <Button label={confirmLabel} variant="contained" color="primary" fullWidth loading={loading} onClick={onConfirm} />
          )}
          {extraActions?.map((a) => (
            <Button key={a.label} label={a.label} variant="soft" color="primary" fullWidth onClick={a.onClick} />
          ))}
          <Button label={cancelLabel} variant="soft" color="primary" fullWidth onClick={onClose} />
        </Box>
      ) : (
        <Box sx={{ display: 'flex', gap: 1.5, px: 2.5, pb: 2.5 }}>
          {onConfirm ? (
            <>
              <Button label={cancelLabel} variant="soft" color="primary" fullWidth onClick={onClose} />
              <Button label={confirmLabel} variant="contained" color="primary" fullWidth loading={loading} onClick={onConfirm} />
            </>
          ) : (
            <Button label={cancelLabel} variant="contained" color="primary" fullWidth onClick={onClose} />
          )}
        </Box>
      )}
    </MuiDialog>
  );
}

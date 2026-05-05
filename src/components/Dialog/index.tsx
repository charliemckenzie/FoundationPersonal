import type { Theme } from '@mui/material/styles';
import MuiDialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { Button } from '../Button';
import { Icon, type IconColor } from '../Icon';
import { buildSoftStyles } from '../buttons/variantStyles';
import type React from 'react';

export type DialogVariant = 'neutral' | 'info' | 'warning' | 'danger' | 'alert';
export type DialogSize = 'small' | 'medium' | 'large';
export type AlertButtonLayout = 'row' | 'stack';
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
  variant?: DialogVariant;
  size?: DialogSize;
  loading?: boolean;
  disableCloseOnBackdrop?: boolean;
  alertButtonLayout?: AlertButtonLayout;
  extraActions?: ReadonlyArray<AlertAction>;
}

const SIZE_MAP: Record<DialogSize, 'xs' | 'sm' | 'md'> = {
  small: 'xs',
  medium: 'sm',
  large: 'md',
};

const VARIANT_ICONS: Record<Exclude<DialogVariant, 'neutral' | 'alert'>, string> = {
  info: 'info_1',
  warning: 'alert_1',
  danger: 'alert_2',
};

const VARIANT_ICON_COLOR: Record<Exclude<DialogVariant, 'neutral' | 'alert'>, IconColor> = {
  info: 'info',
  warning: 'warning',
  danger: 'error',
};

const VARIANT_BUTTON_COLOR: Record<Exclude<DialogVariant, 'alert'>, 'primary' | 'info' | 'warning' | 'error'> = {
  neutral: 'primary',
  info: 'info',
  warning: 'warning',
  danger: 'error',
};

export function Dialog({
  open,
  onClose,
  title,
  description,
  children,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  onConfirm,
  variant = 'neutral',
  size = 'small',
  loading = false,
  disableCloseOnBackdrop = false,
  alertButtonLayout = 'row',
  extraActions,
}: DialogProps) {
  const hasBody = Boolean(description ?? children);

  if (variant === 'alert') {
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

  return (
    <MuiDialog
      open={open}
      onClose={disableCloseOnBackdrop ? undefined : onClose}
      maxWidth={SIZE_MAP[size]}
      fullWidth
      aria-labelledby="dialog-title"
      aria-describedby={description ? 'dialog-description' : undefined}
      slotProps={{
        paper: {
          sx: { borderRadius: (t: Theme) => `${t.shape['xl']}px` },
        },
      }}
    >
      <DialogTitle
        id="dialog-title"
        sx={{ display: 'flex', alignItems: 'center', gap: 1.5, pr: 6 }}
      >
        {variant !== 'neutral' && (
          <Icon
            icon={VARIANT_ICONS[variant]}
            color={VARIANT_ICON_COLOR[variant]}
            size="lg"
          />
        )}
        {title}
        <IconButton
          size="small"
          onClick={onClose}
          aria-label="Close"
          sx={{
            position: 'absolute',
            top: 12,
            right: 12,
            width: 32,
            height: 32,
            borderRadius: '50%',
            '& .MuiTouchRipple-root': { display: 'none' },
            ...buildSoftStyles('secondary'),
            color: 'inherit',
          }}
        >
          <Icon icon="xmark" size="md" />
        </IconButton>
      </DialogTitle>
      {hasBody && (
        <DialogContent>
          {description && (
            <Typography id="dialog-description" variant="body" color="text.muted">
              {description}
            </Typography>
          )}
          {children}
        </DialogContent>
      )}
      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button
          label={cancelLabel}
          variant="ghost"
          color="primary"
          size="small"
          onClick={onClose}
        />
        {onConfirm && (
          <Button
            label={confirmLabel}
            variant="contained"
            color={VARIANT_BUTTON_COLOR[variant]}
            size="small"
            loading={loading}
            onClick={onConfirm}
          />
        )}
      </DialogActions>
    </MuiDialog>
  );
}

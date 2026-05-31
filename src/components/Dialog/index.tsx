import React from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Slide from '@mui/material/Slide';
import type { TransitionProps } from '@mui/material/transitions';
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
import { AlertDialog } from './AlertDialog';
import { useDrawerDrag } from './useDrawerDrag';

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
  variant?: DialogVariant;
  size?: DialogSize;
  loading?: boolean;
  disableCloseOnBackdrop?: boolean;
  alertButtonLayout?: AlertButtonLayout;
  extraActions?: ReadonlyArray<AlertAction>;
  mobileDisplay?: DialogMobileDisplay;
}

const SIZE_MAP: Record<DialogSize, 'xs' | 'sm' | 'md'> = { small: 'xs', medium: 'sm', large: 'md' };
const VARIANT_ICONS: Record<Exclude<DialogVariant, 'neutral' | 'alert'>, string> = { info: 'info_1', warning: 'alert_1', danger: 'alert_2' };
const VARIANT_ICON_COLOR: Record<Exclude<DialogVariant, 'neutral' | 'alert'>, IconColor> = { info: 'info', warning: 'warning', danger: 'error' };
const VARIANT_BUTTON_COLOR: Record<Exclude<DialogVariant, 'alert'>, 'primary' | 'info' | 'warning' | 'error'> = { neutral: 'primary', info: 'info', warning: 'warning', danger: 'error' };

const SlideUp = React.forwardRef<unknown, TransitionProps & { children: React.ReactElement }>(
  function SlideUp(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  }
);

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
  mobileDisplay = 'drawer',
}: DialogProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const showAsDrawer = isMobile && mobileDisplay !== 'dialog';
  const hasBody = Boolean(description ?? children);
  const { dragY, isDragging, handleDragStart, handleDragMove, handleDragEnd } = useDrawerDrag(open, onClose);

  if (variant === 'alert') {
    return (
      <AlertDialog
        open={open}
        onClose={onClose}
        title={title}
        description={description}
        confirmLabel={confirmLabel}
        cancelLabel={cancelLabel}
        onConfirm={onConfirm}
        loading={loading}
        alertButtonLayout={alertButtonLayout}
        extraActions={extraActions}
        size={size}
      >
        {children}
      </AlertDialog>
    );
  }

  return (
    <MuiDialog
      open={open}
      onClose={disableCloseOnBackdrop ? undefined : onClose}
      maxWidth={showAsDrawer ? false : SIZE_MAP[size]}
      fullWidth={!showAsDrawer}
      slots={showAsDrawer ? { transition: SlideUp } : undefined}
      aria-labelledby="dialog-title"
      aria-describedby={description ? 'dialog-description' : undefined}
      slotProps={{
        paper: {
          sx: showAsDrawer
            ? (t) => ({
                position: 'fixed',
                bottom: 0,
                left: 0,
                right: 0,
                m: 0,
                maxWidth: '100% !important',
                width: '100%',
                borderRadius: `${t.shape.xl}px ${t.shape.xl}px 0 0`,
                transform: `translateY(${dragY}px)`,
                transition: isDragging ? 'none' : 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                willChange: 'transform',
                backgroundImage: 'none',
              })
            : { borderRadius: (t) => `${t.shape['xl']}px`, backgroundImage: 'none' },
        },
      }}
    >
      {showAsDrawer && (
        <Box
          aria-hidden="true"
          onTouchStart={handleDragStart}
          onTouchMove={handleDragMove}
          onTouchEnd={handleDragEnd}
          sx={(t) => ({
            width: t.spacing(5),
            height: t.spacing(0.5),
            borderRadius: `${t.shape['xs']}px`,
            backgroundColor: 'divider',
            mx: 'auto',
            mt: 1.5,
            mb: 0,
            touchAction: 'none',
            cursor: 'grab',
            // Expand touch target without affecting visual size
            '&::before': {
              content: '""',
              position: 'absolute',
              top: -12,
              bottom: -12,
              left: -40,
              right: -40,
            },
            position: 'relative',
          })}
        />
      )}
      <DialogTitle
        component="div"
        sx={{ display: 'flex', alignItems: 'center', gap: 1.5, pt: 4, pl: 4, pr: 4, pb: 1 }}
      >
        {variant !== 'neutral' && (
          <Icon
            icon={VARIANT_ICONS[variant]}
            color={VARIANT_ICON_COLOR[variant]}
            size="lg"
          />
        )}
        <Typography id="dialog-title" variant="h5" component="h2" sx={{ color: 'text.heading' }}>
          {title}
        </Typography>
        <IconButton
          size="small"
          onClick={onClose}
          aria-label="Close"
          disableRipple
          sx={(t) => ({
            position: 'absolute',
            top: t.spacing(2),
            right: t.spacing(2),
            width: t.spacing(4),
            height: t.spacing(4),
            borderRadius: '50%',
            ...buildSoftStyles('secondary'),
            color: 'inherit',
          })}
        >
          <Icon icon="xmark" size="md" />
        </IconButton>
      </DialogTitle>
      {hasBody && (
        <DialogContent sx={{ px: 4 }}>
          {description && (
            <Typography id="dialog-description" variant="body" color="text.muted">
              {description}
            </Typography>
          )}
          {children}
        </DialogContent>
      )}
      <DialogActions sx={{ pl: 4, pr: 4, pb: 4, pt: 2 }}>
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

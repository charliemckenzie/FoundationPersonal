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
import { Button } from '../Button';
import { Icon, type IconColor } from '../Icon';
import { CloseButton } from '../CloseButton';
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

const SIZE_MAP: Record<DialogSize, 'xs' | 'sm' | 'md'> = { small: 'xs', medium: 'sm', large: 'md' };
const VARIANT_ICONS: Record<Exclude<DialogVariant, 'neutral' | 'alert'>, string> = { info: 'info_1', warning: 'alert_1', danger: 'alert_2' };
const VARIANT_ICON_COLOR: Record<Exclude<DialogVariant, 'neutral' | 'alert'>, IconColor> = { info: 'info', warning: 'warning', danger: 'error' };
const VARIANT_BUTTON_COLOR: Record<Exclude<DialogVariant, 'alert'>, 'primary'> = { neutral: 'primary', info: 'primary', warning: 'primary', danger: 'primary' };

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
  confirmDisabled = false,
  variant = 'neutral',
  size = 'small',
  loading = false,
  disableCloseOnBackdrop = false,
  hideCloseButton = false,
  hideCancel = false,
  hideIcon = false,
  titleVariant = 'h5',
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
        {variant !== 'neutral' && !hideIcon && (
          <Icon
            icon={VARIANT_ICONS[variant]}
            color={VARIANT_ICON_COLOR[variant]}
            size="lg"
          />
        )}
        <Typography id="dialog-title" variant={titleVariant} component="h2" sx={{ color: 'text.heading' }}>
          {title}
        </Typography>
        {!hideCloseButton && (
          <CloseButton
            onClick={onClose}
            size={showAsDrawer ? 'md' : 'sm'}
            sx={(t) => ({ position: 'absolute', top: t.spacing(1.5), right: t.spacing(1.5) })}
          />
        )}
      </DialogTitle>
      {hasBody && (
        <DialogContent sx={{ px: 4, pt: 3 }}>
          {description && (
            <Typography id="dialog-description" variant="body" color="text.muted">
              {description}
            </Typography>
          )}
          {children}
        </DialogContent>
      )}
      <DialogActions sx={{ pl: 4, pr: 4, pb: 4, pt: 2 }}>
        {!hideCancel && (
          <Button
            label={cancelLabel}
            variant="ghost"
            color="primary"
            size="small"
            onClick={onClose}
          />
        )}
        {onConfirm && (
          <Button
            label={confirmLabel}
            variant="contained"
            color={VARIANT_BUTTON_COLOR[variant]}
            size="small"
            loading={loading}
            disabled={confirmDisabled}
            onClick={onConfirm}
          />
        )}
      </DialogActions>
    </MuiDialog>
  );
}

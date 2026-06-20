import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import MuiDialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Typography from '@mui/material/Typography';
import { Button } from '../Button';
import { Icon } from '../Icon';
import { CloseButton } from '../CloseButton';
import { AlertDialog } from './AlertDialog';
import { useDrawerDrag } from './useDrawerDrag';
import { DrawerDragHandle } from './DrawerDragHandle';
import {
  SIZE_MAP,
  VARIANT_ICONS,
  VARIANT_ICON_COLOR,
  VARIANT_BUTTON_COLOR,
  SlideUp,
} from './constants';
import type { DialogProps } from './types';

export type {
  DialogVariant,
  DialogSize,
  AlertButtonLayout,
  DialogMobileDisplay,
  AlertAction,
  DialogProps,
} from './types';

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
        <DrawerDragHandle
          onTouchStart={handleDragStart}
          onTouchMove={handleDragMove}
          onTouchEnd={handleDragEnd}
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

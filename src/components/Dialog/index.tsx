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

  const [dragY, setDragY] = React.useState(0);
  const [isDragging, setIsDragging] = React.useState(false);
  const dragStartRef = React.useRef<number>(0);

  React.useEffect(() => {
    if (!open) {
      setDragY(0);
      setIsDragging(false);
    }
  }, [open]);

  const handleDragStart = (e: React.TouchEvent) => {
    dragStartRef.current = e.touches[0].clientY;
    setIsDragging(true);
  };

  const handleDragMove = (e: React.TouchEvent) => {
    const delta = e.touches[0].clientY - dragStartRef.current;
    if (delta > 0) setDragY(delta);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    if (dragY > 120) {
      setDragY(0);
      onClose();
    } else {
      setDragY(0);
    }
  };

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
      maxWidth={showAsDrawer ? false : SIZE_MAP[size]}
      fullWidth={!showAsDrawer}
      slots={showAsDrawer ? { transition: SlideUp } : undefined}
      aria-labelledby="dialog-title"
      aria-describedby={description ? 'dialog-description' : undefined}
      slotProps={{
        paper: {
          sx: showAsDrawer
            ? {
                position: 'fixed',
                bottom: 0,
                left: 0,
                right: 0,
                m: 0,
                maxWidth: '100% !important',
                width: '100%',
                borderRadius: '24px 24px 0 0',
                transform: `translateY(${dragY}px)`,
                transition: isDragging ? 'none' : 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                willChange: 'transform',
              }
            : { borderRadius: (t) => `${t.shape['xl']}px` },
        },
      }}
    >
      {showAsDrawer && (
        <Box
          aria-hidden="true"
          onTouchStart={handleDragStart}
          onTouchMove={handleDragMove}
          onTouchEnd={handleDragEnd}
          sx={{
            width: 40,
            height: 4,
            borderRadius: '2px',
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
          }}
        />
      )}
      <DialogTitle
        disableTypography
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
          sx={{
            position: 'absolute',
            top: 16,
            right: 16,
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

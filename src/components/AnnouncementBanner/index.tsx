import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { Button } from '../Button';
import { CloseButton } from '../CloseButton';
import type { AnnouncementBannerProps } from './types';
import {
  DISMISSED_VALUE,
  CONDENSED_REDUCTION,
  rootSxByVariant,
  sizePy,
  sizePx,
  sizeTitleVariant,
  sizeButtonSize,
  closeButtonSx,
  bgImageSx,
  noImagePrSx,
} from './styles';

export type {
  AnnouncementBannerAction,
  AnnouncementBannerImage,
  AnnouncementBannerSize,
  AnnouncementBannerProps,
} from './types';

export function AnnouncementBanner({
  title,
  description,
  action,
  image,
  storageKey,
  onClose,
  variant = 'light',
  size = 'medium',
  condensed = false,
  sx,
}: AnnouncementBannerProps) {
  const [dismissed, setDismissed] = useState<boolean>(() => {
    if (!storageKey) return false;
    try {
      return sessionStorage.getItem(storageKey) === DISMISSED_VALUE;
    } catch {
      // sessionStorage unavailable (e.g. private browsing with storage blocked)
      return false;
    }
  });

  const isInverse = variant === 'dark' || variant === 'primary';

  const handleClose = () => {
    if (storageKey) {
      try {
        sessionStorage.setItem(storageKey, DISMISSED_VALUE);
      } catch {
        // sessionStorage unavailable — dismiss is still applied in component state
      }
    }
    setDismissed(true);
    onClose?.();
  };

  if (dismissed) return null;

  const py = sizePy[size] - (condensed ? CONDENSED_REDUCTION : 0);
  const { xs: pxXs, sm: pxSm } = sizePx[size];
  const titleVariant = sizeTitleVariant[size];
  const buttonSize = sizeButtonSize[size];

  const imageMode = image?.display ?? 'background';
  const isBackground = Boolean(image && imageMode === 'background');
  const isInline     = Boolean(image && imageMode === 'inline');

  return (
    <Box
      component="section"
      aria-label={title}
      sx={[
        {
          position: 'relative',
          display: 'flex',
          flexDirection: { xs: 'column', sm: isInline ? 'row' : 'column' },
          alignItems: { xs: 'flex-start', sm: isInline ? 'center' : 'flex-start' },
          borderRadius: (t) => `${t.shape.lg}px`,
          overflow: 'hidden',
          gap: 3,
          px: { xs: pxXs, sm: pxSm },
          // Inline mode: extra right padding clears the close button on the content side.
          pr: isInline ? { xs: 7, sm: 7 } : undefined,
          py,
        },
        rootSxByVariant[variant],
        bgImageSx(image, isBackground),
        noImagePrSx(image),
        ...(Array.isArray(sx) ? sx : [sx ?? false]),
      ]}
    >
      {/* ── Content ──────────────────────────────────────────────────────────── */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minWidth: 0,
        }}
      >
        <Typography
          variant={titleVariant}
          component="h2"
          sx={{ color: isInverse ? 'text.inverse' : 'text.heading' }}
        >
          {title}
        </Typography>

        {description && (
          <Typography
            variant="body"
            sx={{ mt: 0.5, color: isInverse ? 'text.inverse' : 'text.body' }}
          >
            {description}
          </Typography>
        )}

        {action && (
          <Box sx={{ mt: 2 }}>
            <Button
              label={action.label}
              variant="contained"
              size={buttonSize}
              condensed
              reversed={isInverse}
              href={action.href}
              onClick={action.href ? undefined : action.onClick}
            />
          </Box>
        )}
      </Box>

      {/* ── Inline illustration (hidden on mobile) ───────────────────────────── */}
      {isInline && image && (
        <Box
          aria-hidden="true"
          sx={{
            flexShrink: 0,
            display: { xs: 'none', sm: 'flex' },
            alignItems: 'center',
            justifyContent: 'center',
            width: { sm: '160px', md: '200px' },
            // Margin right clears the absolute close button.
            mr: { sm: 5 },
          }}
        >
          <Box
            component="img"
            src={image.src}
            alt={image.alt ?? ''}
            sx={{
              width: '100%',
              height: 'auto',
              maxHeight: '140px',
              objectFit: 'contain',
              display: 'block',
            }}
          />
        </Box>
      )}

      {/* ── Close button (absolute — top-right corner) ───────────────────────── */}
      <Box
        sx={{
          position: 'absolute',
          top: (t) => t.spacing(1.5),
          right: (t) => t.spacing(1.5),
        }}
      >
        <CloseButton
          onClick={handleClose}
          label="Dismiss announcement"
          variant="ghost"
          color="muted"
          size="sm"
          sx={closeButtonSx(isInverse)}
        />
      </Box>
    </Box>
  );
}

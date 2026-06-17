import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type { SxProps, Theme } from '@mui/material/styles';
import React, { useState } from 'react';
import { Button } from '../Button';
import { CloseButton } from '../CloseButton';

// ── Types ──────────────────────────────────────────────────────────────────────

export interface AnnouncementBannerAction {
  label: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  /** If provided, wraps the button in a native anchor. */
  href?: string;
}

export interface AnnouncementBannerImage {
  src: string;
  /** Defaults to empty string (decorative). Provide a description if the image conveys meaning. */
  alt?: string;
  /**
   * `'background'` — illustration is applied as a CSS background-image on the banner surface.
   *                  Text reflows to avoid it via right padding. The image sits behind all content.
   * `'inline'`     — illustration is rendered as an `<img>` element in the flex row to the right
   *                  of the text content. Hidden on mobile (`xs`).
   * @default 'background'
   */
  display?: 'background' | 'inline';
}

export type AnnouncementBannerSize = 'small' | 'medium';

export interface AnnouncementBannerProps {
  /** Primary heading text. */
  title: string;
  /** Supporting body copy. Accepts a string or rich React content. */
  description?: React.ReactNode;
  /** Optional CTA button. */
  action?: AnnouncementBannerAction;
  /**
   * Optional decorative illustration displayed on the right (hidden on mobile).
   * Use `alt=""` (the default) when the image is purely decorative.
   */
  image?: AnnouncementBannerImage;
  /**
   * When provided, dismissed state is stored in `sessionStorage` under this key.
   * The banner will not re-render once dismissed until the session ends.
   * Use a unique, stable key per announcement (e.g. `'announcement-new-dashboard-2026'`).
   *
   * Omit to make visibility fully controlled by the caller.
   */
  storageKey?: string;
  /**
   * Called when the user dismisses the banner.
   * If `storageKey` is set, this fires after `sessionStorage` is written.
   */
  onClose?: () => void;
  /**
   * `'dark'`    — brand navy surface, inverse (white) text, reversed button.
   * `'primary'` — brand primary surface, inverse (white) text, reversed button.
   * `'light'`   — subtle tinted surface, standard text, primary button.
   * @default 'light'
   */
  variant?: 'dark' | 'light' | 'primary';
  /**
   * `'medium'` — default; larger padding, `h5` title, medium button.
   * `'small'`  — reduced padding, `h6` title, small button.
   * @default 'medium'
   */
  size?: AnnouncementBannerSize;
  /**
   * Reduces vertical padding by 4px, matching the visual rhythm of the condensed Button.
   * @default false
   */
  condensed?: boolean;
  sx?: SxProps<Theme>;
}

// ── Constants ──────────────────────────────────────────────────────────────────

const DISMISSED_VALUE = 'dismissed';

// ── Variant style maps (matches ActionBar conventions) ─────────────────────────

const rootSxByVariant: Record<'dark' | 'light' | 'primary', SxProps<Theme>> = {
  dark:    { backgroundColor: 'background.brandSecondary' },
  primary: { backgroundColor: 'background.brandPrimary' },
  light:   { backgroundColor: 'background.tintCool' },
};

// ── Size maps ──────────────────────────────────────────────────────────────────

const CONDENSED_REDUCTION = 0.5; // spacing units = 4px per side

const sizePy: Record<AnnouncementBannerSize, number> = {
  medium: 4,   // 32px
  small:  3,   // 24px
};

const sizePx: Record<AnnouncementBannerSize, { xs: number; sm: number }> = {
  medium: { xs: 3, sm: 4 },
  small:  { xs: 2.5, sm: 3 },
};

const sizeTitleVariant: Record<AnnouncementBannerSize, 'h5' | 'h6'> = {
  medium: 'h5',
  small:  'h6',
};

const sizeButtonSize: Record<AnnouncementBannerSize, 'medium' | 'small'> = {
  medium: 'medium',
  small:  'small',
};

// ── Component ──────────────────────────────────────────────────────────────────

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

  // On inverse variants, override CloseButton colours to stay visible on dark backgrounds.
  const closeButtonSx: SxProps<Theme> = isInverse
    ? {
        color: 'text.inverse',
        '&:hover':  { backgroundColor: 'rgba(255,255,255,0.15)', color: 'text.inverse' },
        '&:active': { backgroundColor: 'rgba(255,255,255,0.20)', color: 'text.inverse' },
        '&.Mui-focusVisible': {
          outline: '2px solid rgba(255,255,255,0.9)',
          outlineOffset: '2px',
        },
      }
    : {};

  const py = sizePy[size] - (condensed ? CONDENSED_REDUCTION : 0);
  const { xs: pxXs, sm: pxSm } = sizePx[size];
  const titleVariant = sizeTitleVariant[size];
  const buttonSize = sizeButtonSize[size];

  const imageMode = image?.display ?? 'background';
  const isBackground = image && imageMode === 'background';
  const isInline     = image && imageMode === 'inline';

  const bgImageSx: SxProps<Theme> = isBackground
    ? {
        backgroundImage: `url(${image.src})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: { xs: 'right -40px center', sm: 'right center' },
        backgroundSize: { xs: '180px auto', sm: '220px auto', md: '260px auto' },
        // Pad right so text never overlaps the illustration.
        pr: { xs: 7, sm: '260px', md: '300px' },
      }
    : {};

  // No-illustration fallback keeps content clear of the close button.
  const noImagePrSx: SxProps<Theme> = !image ? { pr: { xs: 7, sm: 7 } } : {};

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
        bgImageSx,
        noImagePrSx,
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
      {isInline && (
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
            src={image!.src}
            alt={image!.alt ?? ''}
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
          sx={closeButtonSx}
        />
      </Box>
    </Box>
  );
}

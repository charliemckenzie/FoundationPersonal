import type { SxProps, Theme } from '@mui/material/styles';
import type { AnnouncementBannerImage, AnnouncementBannerSize } from './types';

export const DISMISSED_VALUE = 'dismissed';

// ── Variant style maps (matches ActionBar conventions) ─────────────────────────

export const rootSxByVariant: Record<'dark' | 'light' | 'primary', SxProps<Theme>> = {
  dark:    { backgroundColor: 'background.brandSecondary' },
  primary: { backgroundColor: 'background.brandPrimary' },
  light:   { backgroundColor: 'background.tintCool' },
};

// ── Size maps ──────────────────────────────────────────────────────────────────

export const CONDENSED_REDUCTION = 0.5; // spacing units = 4px per side

export const sizePy: Record<AnnouncementBannerSize, number> = {
  medium: 4,   // 32px
  small:  3,   // 24px
};

export const sizePx: Record<AnnouncementBannerSize, { xs: number; sm: number }> = {
  medium: { xs: 3, sm: 4 },
  small:  { xs: 2.5, sm: 3 },
};

export const sizeTitleVariant: Record<AnnouncementBannerSize, 'h5' | 'h6'> = {
  medium: 'h5',
  small:  'h6',
};

export const sizeButtonSize: Record<AnnouncementBannerSize, 'medium' | 'small'> = {
  medium: 'medium',
  small:  'small',
};

// ── Derived sx helpers ─────────────────────────────────────────────────────────

// On inverse variants, override CloseButton colours to stay visible on dark backgrounds.
export const closeButtonSx = (isInverse: boolean): SxProps<Theme> =>
  isInverse
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

export const bgImageSx = (image: AnnouncementBannerImage | undefined, isBackground: boolean): SxProps<Theme> =>
  isBackground && image
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
export const noImagePrSx = (image: AnnouncementBannerImage | undefined): SxProps<Theme> =>
  !image ? { pr: { xs: 7, sm: 7 } } : {};

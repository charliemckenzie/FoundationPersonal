import type React from 'react';
import type { SxProps, Theme } from '@mui/material/styles';

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

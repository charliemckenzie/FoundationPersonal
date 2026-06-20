import type React from 'react';
import type { ElementType } from 'react';
import type { SxProps, Theme } from '@mui/material/styles';
import type { ButtonVariant, ButtonColor } from '../Button';

export type PosterPanelHeadingVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'display-1'
  | 'display-2'
  | 'display-3'
  | 'display-4'
  | 'display-5';

export type PosterPanelBodyVariant = 'lead' | 'body' | 'small';
export type PosterPanelGradientDirection = 'from-left' | 'from-right' | 'from-bottom';

export interface PosterPanelPrimaryCta {
  /** Button label. */
  label: string;
  /** Renders the button as an `<a>` element when set. */
  href?: string;
  onClick?: () => void;
  variant?: ButtonVariant;
  /** Defaults to `'white'` for contrast on dark/photo backgrounds. */
  color?: ButtonColor;
}

export interface PosterPanelSecondaryCta {
  /** Text button label. */
  label: string;
  onClick?: () => void;
}

export interface PosterPanelProps {
  /** URL of the background image. */
  imageSrc: string;
  /** Accessible description of the background image. Pass `''` only if the image is purely decorative with no informational value. */
  imageAlt: string;
  /** Which side the text content column sits on (desktop). Default: `'left'`. */
  contentPosition?: 'left' | 'right';
  /** Heading text. */
  headingText: string;
  /** Typography variant for the heading. Default: `'h2'`. */
  headingVariant?: PosterPanelHeadingVariant;
  /** Semantic HTML element rendered for the heading. Should match page heading hierarchy. Default: `'h2'`. */
  headingComponent?: ElementType;
  /** Body content — supports rich text (JSX, inline links, bold, etc.). */
  children?: React.ReactNode;
  /** Typography size variant for the body. Default: `'body'`. */
  bodyVariant?: PosterPanelBodyVariant;
  /** MUI palette path for all text colour (e.g. `'text.inverse'`, `'common.white'`). Default: `'text.inverse'`. */
  textColor?: string;
  /** Show the darkened gradient overlay on desktop. Default: `true`. */
  showGradient?: boolean;
  /** Direction the gradient fades toward. Default: `'from-left'`. */
  gradientDirection?: PosterPanelGradientDirection;
  /** CSS colour value for the opaque end of the gradient. Default: `'rgba(0,0,0,0.6)'`. */
  gradientColor?: string;
  /** Mobile stacking order. Default: `'image-first'` (image above text). */
  mobileOrder?: 'image-first' | 'content-first';
  /** Background colour for the content area on mobile (must contrast with `textColor`). Default: `'background.brandSecondary'`. */
  mobileBgColor?: string;
  /** Optional primary CTA button. */
  primaryCta?: PosterPanelPrimaryCta;
  /** Optional secondary text-link CTA (rendered with `TextButton`). */
  secondaryCta?: PosterPanelSecondaryCta;
  sx?: SxProps<Theme>;
}

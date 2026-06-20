import type { SxProps, Theme } from '@mui/material/styles';
import type React from 'react';

export type CardVariant = 'contained' | 'border' | 'open';
export type CardCtaKind = 'button' | 'textButton';
export type CardTopSectionPosition = 'top' | 'left';
export type CardTopSectionMobileBehavior = 'keep-left' | 'stack-top';
export type CardHeaderLevel = 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
export type CardHeaderVariant =
  | 'display-1'
  | 'display-2'
  | 'display-3'
  | 'display-4'
  | 'display-5'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6';
export type CardBodyVariant = 'lead' | 'body' | 'small';

export interface CardCta {
  label: string;
  kind?: CardCtaKind;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export interface CardCtas {
  primary?: CardCta;
  secondary?: CardCta;
}

export interface CardProps {
  /**
   * contained: bordered + surface background + 32px contained content.
   * border: bordered + transparent background + 32px contained content.
   * open: no border + no contained padding.
   */
  variant?: CardVariant;
  /** For contained/border variants, increases contained padding to 56px. Ignored by open. */
  expanded?: boolean;
  /** Optional top section (image, hero icon, or any custom node). */
  topSection?: React.ReactNode;
  /** Placement of the top section relative to content. Defaults to top. */
  topSectionPosition?: CardTopSectionPosition;
  /**
   * Mobile behavior when topSectionPosition is left.
   * - keep-left: keep row layout at all breakpoints.
   * - stack-top: switch to column on mobile so top section moves above content.
   */
  topSectionMobileBehavior?: CardTopSectionMobileBehavior;
  /** Optional header content rendered at the start of the content section. */
  header?: React.ReactNode;
  /** Semantic heading level when header is a text primitive. Defaults to h3. */
  headerLevel?: CardHeaderLevel;
  /** Header typography variant when header is a text primitive. Defaults to h5. */
  headerVariant?: CardHeaderVariant;
  /** Optional body content rendered below header in the content section. */
  body?: React.ReactNode;
  /** Body typography variant when body is a text primitive. Defaults to body. */
  bodyVariant?: CardBodyVariant;
  /** Additional custom content rendered inside the content section. */
  children?: React.ReactNode;
  /** Optional actions row rendered at the very bottom. */
  actions?: React.ReactNode;
  /** Optional structured CTA config for the bottom section. */
  ctas?: CardCtas;
  /** Additional sx overrides forwarded to the root card element. */
  sx?: SxProps<Theme>;
}

export interface CardGridProps {
  /** Card nodes rendered in the responsive layout grid. */
  children: React.ReactNode;
  /** Grid gap between cards. Defaults to 2 (theme spacing). */
  gap?: number;
  /** When true, cards stretch to equal row height. Content remains top-aligned. */
  equalHeight?: boolean;
  /** Additional sx overrides forwarded to the grid wrapper. */
  sx?: SxProps<Theme>;
}

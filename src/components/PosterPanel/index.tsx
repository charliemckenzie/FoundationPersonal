import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type { SxProps, Theme } from '@mui/material/styles';
import type { ElementType } from 'react';
import { Button } from '../Button';
import type { ButtonVariant, ButtonColor } from '../Button';
import { TextButton } from '../TextButton';

// ── Types ─────────────────────────────────────────────────────────────────────

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

// ── Gradient helper ───────────────────────────────────────────────────────────

const GRADIENT_CSS_DIRECTION: Record<PosterPanelGradientDirection, string> = {
  'from-left': 'to right',
  'from-right': 'to left',
  'from-bottom': 'to top',
};

function buildGradient(direction: PosterPanelGradientDirection, color: string): string {
  return `linear-gradient(${GRADIENT_CSS_DIRECTION[direction]}, ${color} 0%, transparent 70%)`;
}

// ── Component ─────────────────────────────────────────────────────────────────

export const PosterPanel = React.forwardRef<HTMLDivElement, PosterPanelProps>(
  function PosterPanel(
    {
      imageSrc,
      imageAlt,
      contentPosition = 'left',
      headingText,
      headingVariant = 'h2',
      headingComponent = 'h2',
      children,
      bodyVariant = 'body',
      textColor = 'text.inverse',
      showGradient = true,
      gradientDirection = 'from-left',
      gradientColor = 'rgba(0,0,0,0.6)',
      mobileOrder = 'image-first',
      mobileBgColor = 'background.brandSecondary',
      primaryCta,
      secondaryCta,
      sx,
    },
    ref
  ) {
    const hasCtas = Boolean(primaryCta ?? secondaryCta);

    // On mobile, order is driven by mobileOrder prop.
    // On desktop, content pinned left = order 0; pinned right = order 1 (spacer flips).
    const contentFlexOrder = {
      xs: mobileOrder === 'content-first' ? 0 : 1,
      md: contentPosition === 'left' ? 0 : 1,
    };
    const spacerFlexOrder = {
      xs: mobileOrder === 'content-first' ? 1 : 0,
      md: contentPosition === 'left' ? 1 : 0,
    };

    return (
      <Box
        ref={ref}
        sx={[
          {
            position: 'relative',
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            minHeight: { xs: 'auto', md: '31.25rem' },
            overflow: 'hidden',
          },
          ...(Array.isArray(sx) ? sx : sx != null ? [sx] : []),
        ]}
      >
        {/* ── Mobile: natural-flow image (stacks above or below content) ──── */}
        <Box
          component="img"
          src={imageSrc}
          alt={imageAlt}
          sx={{
            display: { xs: 'block', md: 'none' },
            width: '100%',
            height: '18.75rem',
            objectFit: 'cover',
            objectPosition: 'center',
            order: spacerFlexOrder.xs,
          }}
        />

        {/* ── Desktop: absolute full-bleed background image ──────────────── */}
        <Box
          aria-hidden="true"
          sx={{
            display: { xs: 'none', md: 'block' },
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${imageSrc})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            zIndex: 0,
          }}
        />

        {/* ── Desktop: gradient overlay ───────────────────────────────────── */}
        {showGradient && (
          <Box
            aria-hidden="true"
            sx={{
              display: { xs: 'none', md: 'block' },
              position: 'absolute',
              inset: 0,
              zIndex: 1,
              background: buildGradient(gradientDirection, gradientColor),
            }}
          />
        )}

        {/* ── Desktop: spacer fills the image-side 50% ───────────────────── */}
        <Box
          aria-hidden="true"
          sx={{
            display: { xs: 'none', md: 'flex' },
            flex: '1 1 50%',
            order: spacerFlexOrder.md,
          }}
        />

        {/* ── Content column ──────────────────────────────────────────────── */}
        <Box
          sx={{
            position: 'relative',
            zIndex: 2,
            flex: { xs: '1 1 auto', md: '1 1 50%' },
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            px: { xs: 3, md: 6 },
            py: { xs: 4, md: 8 },
            bgcolor: { xs: mobileBgColor, md: 'transparent' },
            order: { xs: contentFlexOrder.xs, md: contentFlexOrder.md },
          }}
        >
          <Typography
            variant={headingVariant}
            component={headingComponent}
            sx={{ color: textColor, mb: 2 }}
          >
            {headingText}
          </Typography>

          {children != null && (
            <Typography
              variant={bodyVariant}
              component="div"
              sx={{ color: textColor, mb: hasCtas ? 4 : 0 }}
            >
              {children}
            </Typography>
          )}

          {hasCtas && (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, alignItems: 'center' }}>
              {primaryCta != null && (
                <Button
                  label={primaryCta.label}
                  variant={primaryCta.variant ?? 'contained'}
                  color={primaryCta.color ?? 'white'}
                  href={primaryCta.href}
                  onClick={primaryCta.onClick}
                />
              )}
              {secondaryCta != null && (
                <TextButton
                  label={secondaryCta.label}
                  reversed
                  onClick={secondaryCta.onClick}
                />
              )}
            </Box>
          )}
        </Box>
      </Box>
    );
  }
);

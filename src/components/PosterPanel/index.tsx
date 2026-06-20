import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Button } from '../Button';
import { TextButton } from '../TextButton';
import type { PosterPanelProps } from './types';
import { buildGradient } from './styles';

export type {
  PosterPanelHeadingVariant,
  PosterPanelBodyVariant,
  PosterPanelGradientDirection,
  PosterPanelPrimaryCta,
  PosterPanelSecondaryCta,
  PosterPanelProps,
} from './types';

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

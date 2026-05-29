import MuiCard from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import type { SxProps, Theme } from '@mui/material/styles';
import type React from 'react';
import {
  CardBadgeOverlay,
  CardTitleBlock,
  CardCtaPair,
  CardInteractiveWrapper,
  OpenCardActions,
} from './cardParts';

export interface CardAction {
  label: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export interface CardProps {
  /** 'contained' = paper background with free-form children; 'open' = image + content + actions; 'promo' = horizontal image-left promotional layout */
  variant: 'contained' | 'open' | 'promo';
  children?: React.ReactNode;
  /** Makes the entire card interactive. Mutually exclusive with primaryAction/secondaryAction on the open variant. */
  onClick?: React.MouseEventHandler<HTMLElement>;
  href?: string;
  /** Open variant: path to image in /public */
  imageSrc?: string;
  imageAlt?: string;
  /** Open variant: card heading */
  title?: string;
  /** Open variant: secondary line below the title */
  subtitle?: string;
  /** Open variant: primary CTA button — ignored when card-level onClick/href is set */
  primaryAction?: CardAction;
  /** Open variant: secondary CTA button — ignored when card-level onClick/href is set */
  secondaryAction?: CardAction;
  /** Open and promo variants: optional pill label overlaid on the image (top-left) */
  badge?: string;
  /** Additional sx overrides forwarded to the root MuiCard element */
  sx?: SxProps<Theme>;
}

const cardBaseSx = (theme: Theme) => ({
  boxShadow: 'none',
  border: '1px solid',
  borderColor: theme.palette.border.default,
  borderRadius: `${theme.shape.lg}px`,
  backgroundColor: theme.palette.background.paper,
  overflow: 'hidden',
});

const contentPaddingSx = { p: { xs: 3, sm: 4 }, '&:last-child': { pb: { xs: 3, sm: 4 } } };

export function Card({
  variant,
  children,
  onClick,
  href,
  imageSrc,
  imageAlt = '',
  title,
  subtitle,
  primaryAction,
  secondaryAction,
  badge,
  sx,
}: CardProps) {
  const isCardInteractive = Boolean(onClick ?? href);
  const mergedSx: SxProps<Theme> = [cardBaseSx, ...(Array.isArray(sx) ? sx : [sx ?? false])];

  if (variant === 'contained') {
    return (
      <MuiCard sx={mergedSx}>
        <CardInteractiveWrapper isCardInteractive={isCardInteractive} onClick={onClick} href={href}>
          <CardContent sx={contentPaddingSx}>{children}</CardContent>
        </CardInteractiveWrapper>
      </MuiCard>
    );
  }

  if (variant === 'promo') {
    const showPromoActions = !isCardInteractive && (primaryAction ?? secondaryAction);
    return (
      <MuiCard sx={mergedSx}>
        <CardInteractiveWrapper
          isCardInteractive={isCardInteractive}
          onClick={onClick}
          href={href}
          ariaLabel={title}
        >
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'stretch' }}>
            {imageSrc && (
              <Box sx={{ position: 'relative', width: { xs: '100%', sm: '35%' }, flexShrink: 0, overflow: 'hidden' }}>
                <CardMedia
                  component="img"
                  src={imageSrc}
                  alt={imageAlt}
                  sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
                {badge && <CardBadgeOverlay text={badge} />}
              </Box>
            )}
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', p: { xs: 3, sm: 4 }, gap: 2 }}>
              <CardTitleBlock
                title={title}
                subtitle={subtitle}
                isCardInteractive={isCardInteractive}
                hasChildrenBelow={false}
              />
              {children}
              {showPromoActions && (
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  <CardCtaPair primaryAction={primaryAction} secondaryAction={secondaryAction} title={title} />
                </Box>
              )}
            </Box>
          </Box>
        </CardInteractiveWrapper>
      </MuiCard>
    );
  }

  // Open variant
  return (
    <MuiCard sx={mergedSx}>
      <CardInteractiveWrapper
        isCardInteractive={isCardInteractive}
        onClick={onClick}
        href={href}
        ariaLabel={title}
        flexColumn
      >
        {imageSrc && (
          <Box sx={{ position: 'relative' }}>
            <CardMedia
              component="img"
              src={imageSrc}
              alt={imageAlt}
              sx={{ aspectRatio: '16 / 7', objectFit: 'cover', display: 'block', width: '100%' }}
            />
            {badge && <CardBadgeOverlay text={badge} />}
          </Box>
        )}
        <CardContent sx={contentPaddingSx}>
          <CardTitleBlock
            title={title}
            subtitle={subtitle}
            isCardInteractive={isCardInteractive}
            hasChildrenBelow={Boolean(children)}
          />
          {children}
        </CardContent>
        {!isCardInteractive && (
          <OpenCardActions primaryAction={primaryAction} secondaryAction={secondaryAction} title={title} />
        )}
      </CardInteractiveWrapper>
    </MuiCard>
  );
}

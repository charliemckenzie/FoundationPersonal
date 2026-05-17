import MuiCard from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import CardActionArea from '@mui/material/CardActionArea';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import type { SxProps, Theme } from '@mui/material/styles';
import type React from 'react';
import { Button } from '../Button';

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
  borderColor: theme.palette.border.subtle,
  borderRadius: `${theme.shape.lg}px`,
  backgroundColor: theme.palette.background.paper,
  overflow: 'hidden',
});

function BadgeOverlay({ text }: { text: string }) {
  return (
    <Box
      sx={(t) => ({
        position: 'absolute',
        top: '1rem',
        left: '1rem',
        backgroundColor: 'background.paper',
        borderRadius: `${t.shape.full}px`,
        px: 2,
        py: 0.75,
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      })}
    >
      <Typography variant="small" component="span" sx={{ fontWeight: 600, color: 'text.heading', lineHeight: 1.5 }}>
        {text}
      </Typography>
    </Box>
  );
}

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
        {isCardInteractive ? (
          <CardActionArea
            onClick={onClick}
            {...(href ? { component: 'a', href } : {})}
            sx={{ height: '100%' }}
          >
            <CardContent sx={{ p: { xs: 3, sm: 4 }, '&:last-child': { pb: { xs: 3, sm: 4 } } }}>{children}</CardContent>
          </CardActionArea>
        ) : (
          <CardContent sx={{ p: { xs: 3, sm: 4 }, '&:last-child': { pb: { xs: 3, sm: 4 } } }}>{children}</CardContent>
        )}
      </MuiCard>
    );
  }

  // Headings (h3) inside interactive elements (button/a) are invalid HTML.
  // When the card is interactive, the title renders as a styled paragraph instead.
  const titleComponent = isCardInteractive ? 'p' : 'h3';

  // Promo variant — horizontal layout: image left, content right
  if (variant === 'promo') {
    const showPromoActions = !isCardInteractive && (primaryAction ?? secondaryAction);

    const promoContent = (
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'stretch' }}>
        {imageSrc && (
          <Box sx={{ position: 'relative', width: { xs: '100%', sm: '35%' }, flexShrink: 0, overflow: 'hidden' }}>
            <CardMedia
              component="img"
              src={imageSrc}
              alt={imageAlt}
              sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
            {badge && <BadgeOverlay text={badge} />}
          </Box>
        )}
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', p: { xs: 3, sm: 4 }, gap: 2 }}>
          {title && (
            <Typography variant="h5" component={titleComponent} sx={{ color: 'text.heading' }}>
              {title}
            </Typography>
          )}
          {subtitle && (
            <Typography variant="small" component="p" sx={{ color: 'text.primary' }}>
              {subtitle}
            </Typography>
          )}
          {children}
          {showPromoActions && (
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {primaryAction && (
                <Button
                  label={primaryAction.label}
                  aria-label={title ? `${primaryAction.label}: ${title}` : undefined}
                  onClick={primaryAction.onClick}
                  variant="contained"
                  size="medium"
                />
              )}
              {secondaryAction && (
                <Button
                  label={secondaryAction.label}
                  aria-label={title ? `${secondaryAction.label}: ${title}` : undefined}
                  onClick={secondaryAction.onClick}
                  variant="outlined"
                  size="medium"
                />
              )}
            </Box>
          )}
        </Box>
      </Box>
    );

    return (
      <MuiCard sx={mergedSx}>
        {isCardInteractive ? (
          <CardActionArea
            onClick={onClick}
            {...(href ? { component: 'a', href } : {})}
            aria-label={title}
            sx={{ height: '100%' }}
          >
            {promoContent}
          </CardActionArea>
        ) : (
          promoContent
        )}
      </MuiCard>
    );
  }

  // Open variant
  const showActions = !isCardInteractive && (primaryAction ?? secondaryAction);

  const innerContent = (
    <>
      {imageSrc && (
        <Box sx={{ position: 'relative' }}>
          <CardMedia
            component="img"
            src={imageSrc}
            alt={imageAlt}
            sx={{ aspectRatio: '16 / 7', objectFit: 'cover', display: 'block', width: '100%' }}
          />
          {badge && <BadgeOverlay text={badge} />}
        </Box>
      )}
      <CardContent sx={{ p: { xs: 3, sm: 4 }, '&:last-child': { pb: { xs: 3, sm: 4 } } }}>
        {title && (
          <Typography
            variant="h5"
            component={titleComponent}
            sx={{ color: 'text.heading', mb: subtitle ? 0.5 : children ? 1 : 0 }}
          >
            {title}
          </Typography>
        )}
        {subtitle && (
          <Typography
            variant="small"
            component="p"
            sx={{ color: 'text.primary', mb: children ? 1 : 0 }}
          >
            {subtitle}
          </Typography>
        )}
        {children}
      </CardContent>
      {showActions && (
        <CardActions sx={{ px: { xs: 3, sm: 4 }, pb: { xs: 3, sm: 4 }, pt: 0, gap: 1 }}>
          {primaryAction && (
            <Button
              label={primaryAction.label}
              aria-label={title ? `${primaryAction.label}: ${title}` : undefined}
              onClick={primaryAction.onClick}
              variant="contained"
              size="medium"
            />
          )}
          {secondaryAction && (
            <Button
              label={secondaryAction.label}
              aria-label={title ? `${secondaryAction.label}: ${title}` : undefined}
              onClick={secondaryAction.onClick}
              variant="outlined"
              size="medium"
            />
          )}
        </CardActions>
      )}
    </>
  );

  return (
    <MuiCard sx={mergedSx}>
      {isCardInteractive ? (
        <CardActionArea
          onClick={onClick}
          {...(href ? { component: 'a', href } : {})}
          aria-label={title}
          sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}
        >
          {innerContent}
        </CardActionArea>
      ) : (
        innerContent
      )}
    </MuiCard>
  );
}

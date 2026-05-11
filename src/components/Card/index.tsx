import MuiCard from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import CardActionArea from '@mui/material/CardActionArea';
import Typography from '@mui/material/Typography';
import type { SxProps, Theme } from '@mui/material/styles';
import type React from 'react';
import { Button } from '../Button';

export interface CardAction {
  label: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export interface CardProps {
  /** 'contained' = paper background with free-form children; 'open' = image + content + actions */
  variant: 'contained' | 'open';
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
  /** Additional sx overrides forwarded to the root MuiCard element */
  sx?: SxProps<Theme>;
}

const cardBaseSx = {
  boxShadow: 'none',
  border: '1px solid',
  borderColor: 'border.subtle',
  borderRadius: (theme: { shape: { lg: number } }) => `${theme.shape.lg}px`,
  backgroundColor: 'background.paper',
  overflow: 'hidden',
} as const;

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

  // Open variant
  const showActions = !isCardInteractive && (primaryAction ?? secondaryAction);

  const innerContent = (
    <>
      {imageSrc && (
        <CardMedia
          component="img"
          src={imageSrc}
          alt={imageAlt}
          sx={{ aspectRatio: '16 / 7', objectFit: 'cover', display: 'block', width: '100%' }}
        />
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
              onClick={primaryAction.onClick}
              variant="contained"
              size="medium"
            />
          )}
          {secondaryAction && (
            <Button
              label={secondaryAction.label}
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

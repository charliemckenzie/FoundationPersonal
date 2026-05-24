import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import CardActionArea from '@mui/material/CardActionArea';
import type { ReactNode } from 'react';
import { Button } from '../Button';
import type { CardAction } from './index';

/** Pill badge overlaid on the top-left of a card image. */
export function CardBadgeOverlay({ text }: { text: string }) {
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

interface CardTitleBlockProps {
  title?: string;
  subtitle?: string;
  /** When the card is interactive, headings inside the action area must render as <p>. */
  isCardInteractive: boolean;
  /** Whether body children follow — used to decide whether to add a bottom margin. */
  hasChildrenBelow: boolean;
}

/** Renders the title + optional subtitle with the right semantic element and spacing. */
export function CardTitleBlock({ title, subtitle, isCardInteractive, hasChildrenBelow }: CardTitleBlockProps) {
  if (!title && !subtitle) return null;
  const titleComponent = isCardInteractive ? 'p' : 'h3';
  return (
    <>
      {title && (
        <Typography
          variant="h5"
          component={titleComponent}
          sx={{ color: 'text.heading', mb: subtitle ? 0.5 : hasChildrenBelow ? 1 : 0 }}
        >
          {title}
        </Typography>
      )}
      {subtitle && (
        <Typography
          variant="small"
          component="p"
          sx={{ color: 'text.primary', mb: hasChildrenBelow ? 1 : 0 }}
        >
          {subtitle}
        </Typography>
      )}
    </>
  );
}

interface CardCtaPairProps {
  primaryAction?: CardAction;
  secondaryAction?: CardAction;
  /** Used to build the per-button aria-label when a title is present. */
  title?: string;
}

/** Pair of contained + outlined buttons used by the open and promo variants. */
export function CardCtaPair({ primaryAction, secondaryAction, title }: CardCtaPairProps) {
  return (
    <>
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
    </>
  );
}

interface InteractiveWrapperProps {
  isCardInteractive: boolean;
  onClick?: React.MouseEventHandler<HTMLElement>;
  href?: string;
  ariaLabel?: string;
  /** Open variant needs flex column layout inside the action area; promo doesn't. */
  flexColumn?: boolean;
  children: ReactNode;
}

/**
 * Wraps content in a CardActionArea when the card is interactive, otherwise renders
 * the content directly. Encapsulates the duplicated conditional across all three variants.
 */
export function CardInteractiveWrapper({
  isCardInteractive,
  onClick,
  href,
  ariaLabel,
  flexColumn,
  children,
}: InteractiveWrapperProps) {
  if (!isCardInteractive) return <>{children}</>;
  return (
    <CardActionArea
      onClick={onClick}
      {...(href ? { component: 'a', href } : {})}
      aria-label={ariaLabel}
      sx={flexColumn
        ? { height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'stretch' }
        : { height: '100%' }
      }
    >
      {children}
    </CardActionArea>
  );
}

/** CardActions wrapper with the open-variant padding. Returns null if no actions present. */
export function OpenCardActions({ primaryAction, secondaryAction, title }: CardCtaPairProps) {
  if (!primaryAction && !secondaryAction) return null;
  return (
    <CardActions sx={{ px: { xs: 3, sm: 4 }, pb: { xs: 3, sm: 4 }, pt: 0, gap: 1 }}>
      <CardCtaPair primaryAction={primaryAction} secondaryAction={secondaryAction} title={title} />
    </CardActions>
  );
}

'use client';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Icon } from '../../components/Icon';

interface JourneyTileProps {
  /** Decorative illustration shown at the start of the tile. */
  image: string;
  /** Font Awesome icon name for the trailing affordance (e.g. 'plus', 'pen-to-square'). */
  icon: string;
  title: string;
  description: string;
  /** Invoked on click or keyboard activation. */
  onActivate: () => void;
}

/**
 * Collapsed call-to-action tile used by the "ways to improve" journeys.
 * Renders as a real <button> so it is keyboard-operable and announced correctly —
 * child text uses <span> (phrasing content) to keep the button markup valid.
 */
export function JourneyTile({ image, icon, title, description, onActivate }: JourneyTileProps) {
  return (
    <Box
      component="button"
      type="button"
      onClick={onActivate}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        width: '100%',
        textAlign: 'left',
        p: 2.5,
        borderRadius: '0.75rem',
        border: '1px dashed',
        borderColor: 'border.default',
        backgroundColor: 'transparent',
        color: 'inherit',
        font: 'inherit',
        cursor: 'pointer',
        '&:hover': { borderColor: 'primary.main', backgroundColor: 'action.hover' },
        '&:focus-visible': { outline: '2px solid', outlineColor: 'border.focus', outlineOffset: '2px' },
      }}
    >
      <Box component="img" src={image} alt="" sx={{ width: '2rem', height: '2rem', flexShrink: 0 }} />
      <Box sx={{ flex: 1 }}>
        <Typography variant="h6" component="span" sx={{ display: 'block', mb: 0.5 }}>{title}</Typography>
        <Typography variant="small" component="span" color="text.muted" sx={{ display: 'block' }}>
          {description}
        </Typography>
      </Box>
      <Icon icon={icon} size="lg" color="primary" />
    </Box>
  );
}

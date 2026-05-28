import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type { SxProps, Theme } from '@mui/material/styles';
import React from 'react';
import { IconImage, ActionButton } from './actionBarParts';

export interface ActionBarAction {
  label: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  /** If provided, wraps the button in a native anchor. */
  href?: string;
}

export interface ActionBarImage {
  src?: string;
  alt?: string;
  /**
   * ReactNode rendered inside the circular icon container (e.g. a `HeroIcon`).
   * When provided, takes precedence over `src` for the `'icon'` variant.
   */
  icon?: React.ReactNode;
  /**
   * `'icon'` — small circular container on the left (e.g. a brand icon).
   * `'decorative'` — large bleed image on the left (e.g. a lifestyle photo).
   * Default: `'icon'`
   */
  variant?: 'icon' | 'decorative';
}

export interface ActionBarProps {
  /** Primary heading */
  title: string;
  /** Supporting body text */
  description: string;
  /** CTA configuration */
  action: ActionBarAction;
  /** Optional image */
  image?: ActionBarImage;
  /**
   * `'dark'` — brand navy surface with inverse text and white button.
   * `'light'` — subtle tinted surface with standard text and primary button.
   * `'primary'` — brand primary surface with inverse text and white button.
   * Default: `'light'`
   */
  variant?: 'dark' | 'light' | 'primary';
  sx?: SxProps<Theme>;
}

// ── Variant style maps ────────────────────────────────────────────────────────

const rootSxBase: SxProps<Theme> = {
  display: 'flex',
  borderRadius: (t) => `${t.shape.lg}px`,
  overflow: 'hidden',
};

// Colour only — layout spacing is applied per layout branch below.
const rootSxByVariant: Record<'dark' | 'light' | 'primary', SxProps<Theme>> = {
  dark:    { backgroundColor: 'background.brandSecondary' },
  primary: { backgroundColor: 'background.brandPrimary' },
  light:   { backgroundColor: 'background.elevated' },
};

// Icon / no-image layout: spaced row with padding on the root.
const iconLayoutRootSx: SxProps<Theme> = {
  flexDirection: { xs: 'column', sm: 'row' },
  alignItems: { xs: 'flex-start', sm: 'center' },
  gap: 3,
  px: { xs: 3, sm: 4 },
  py: 3,
};

// Decorative layout: edge-to-edge image, content box provides its own padding.
const decorativeLayoutRootSx: SxProps<Theme> = {
  flexDirection: { xs: 'column', sm: 'row' },
  alignItems: 'stretch',
};

// ── Main component ─────────────────────────────────────────────────────────────

export function ActionBar({
  title,
  description,
  action,
  image,
  variant = 'light',
  sx,
}: ActionBarProps) {
  const isDecorative = image?.variant === 'decorative';
  const isInverse = variant === 'dark' || variant === 'primary';

  const mergedDecorativeSx: SxProps<Theme> = [
    rootSxBase,
    rootSxByVariant[variant],
    decorativeLayoutRootSx,
    ...(Array.isArray(sx) ? sx : [sx ?? false]),
  ];

  const mergedIconSx: SxProps<Theme> = [
    rootSxBase,
    rootSxByVariant[variant],
    iconLayoutRootSx,
    ...(Array.isArray(sx) ? sx : [sx ?? false]),
  ];

  if (isDecorative) {
    return (
      <Box component="section" sx={mergedDecorativeSx}>
        <Box
          sx={{
            flexShrink: 0,
            width: { xs: '100%', sm: '38%' },
            maxHeight: { xs: '200px', sm: 'none' },
            overflow: 'hidden',
            alignSelf: 'stretch',
          }}
        >
          <Box
            component="img"
            src={image!.src}
            alt={image!.alt}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center bottom',
              display: 'block',
            }}
          />
        </Box>

        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: 2,
            px: { xs: 3, sm: 4 },
            py: 3,
          }}
        >
          <Typography
            variant="h2"
            component="h3"
            sx={{ color: isInverse ? 'text.inverse' : 'text.heading' }}
          >
            {title}
          </Typography>
          <Typography
            variant="body"
            component="p"
            sx={{ color: isInverse ? 'text.inverse' : 'text.primary' }}
          >
            {description}
          </Typography>
          <Box>
            <ActionButton action={action} reversed={isInverse} />
          </Box>
        </Box>
      </Box>
    );
  }

  // Icon or no-image layout — title + description centred, button on the right
  return (
    <Box component="section" sx={mergedIconSx}>
      {image?.variant === 'icon' && <IconImage src={image.src} alt={image.alt} icon={image.icon} />}

      <Box sx={{ flex: 1 }}>
        <Typography
          variant="h5"
          component="h3"
          sx={{ color: isInverse ? 'text.inverse' : 'text.heading', mb: 0.5 }}
        >
          {title}
        </Typography>
        <Typography
          variant="body"
          component="p"
          sx={{ color: isInverse ? 'text.inverse' : 'text.primary' }}
        >
          {description}
        </Typography>
      </Box>

      <ActionButton action={action} reversed={isInverse} />
    </Box>
  );
}

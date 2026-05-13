import Box from '@mui/material/Box';

export type HeroIconSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
/**
 * Background circle colour.
 * - `brand`  → ART: light blue (brandClear) / QSuper: brand blue (brandPrimary)
 * - `white`  → white (paper) — both brands
 * - `grey`   → neutral surface (elevated) — ART only
 */
export type HeroIconBackground = 'none' | 'brand' | 'white' | 'grey';
/**
 * Icon fill colour — only meaningful for QSuper (monochrome SVGs).
 * ART icons are full-colour illustrations; `iconColor` has no effect on them.
 * - `default`    → embedded colour (QSuper blue)
 * - `white`      → CSS filter to white
 * - `quaternary` → quaternary.main (QSuper only; use with background="none")
 */
export type HeroIconColor = 'default' | 'white' | 'quaternary';
export type HeroIconBrand = 'art' | 'qsuper';

export interface HeroIconProps {
  /** Icon name matching the filename in the brand icon set (e.g. "Alert", "alert") */
  name: string;
  /** Brand — determines which icon folder is used. Defaults to 'art'. */
  brand?: HeroIconBrand;
  size?: HeroIconSize;
  /** Circular background. Colour resolves per brand via semantic tokens. */
  background?: HeroIconBackground;
  /**
   * Icon fill colour. Only applies to QSuper (monochrome SVGs).
   * `default` shows the embedded colour; `white` inverts to white;
   * `quaternary` tints to quaternary.main — use with background="none" only.
   */
  iconColor?: HeroIconColor;
  /**
   * Override the icon image size. Must be a valid CSS length in `rem` units (e.g. `'2.75rem'`).
   * `px` values break browser zoom scaling and violate the rem-first sizing principle.
   * Always pass alongside `containerSizeOverride` — mixing one override with `size` will produce a mismatched icon-to-container ratio.
   * Takes precedence over `size`.
   */
  iconSizeOverride?: string;
  /**
   * Override the circular container size. Must be a valid CSS length in `rem` units (e.g. `'5.5rem'`).
   * `px` values break browser zoom scaling and violate the rem-first sizing principle.
   * Always pass alongside `iconSizeOverride` — mixing one override with `size` will produce a mismatched icon-to-container ratio.
   * Takes precedence over `size`.
   */
  containerSizeOverride?: string;
  'aria-label'?: string;
}

// rem units — scales with browser font size / zoom
const SIZE_MAP: Record<HeroIconSize, number> = {
  sm: 1.5,
  md: 2,
  lg: 3,
  xl: 4,
  '2xl': 5,
  '3xl': 6,
};

const CONTAINER_RATIO = 1.75;

const BG_COLOR: Record<HeroIconBrand, Record<HeroIconBackground, string | undefined>> = {
  art: {
    none:  undefined,
    brand: 'background.brandClear',
    white: 'background.paper',
    grey:  'background.elevated',
  },
  qsuper: {
    none:  undefined,
    brand: 'background.brandPrimary',
    white: 'background.paper',
    grey:  'background.elevated',
  },
};

export function HeroIcon({
  name,
  brand = 'art',
  size = 'md',
  background = 'none',
  iconColor = 'default',
  iconSizeOverride,
  containerSizeOverride,
  'aria-label': ariaLabel,
}: HeroIconProps) {
  const sizeRem = SIZE_MAP[size];
  const iconSize = iconSizeOverride || `${sizeRem}rem`;
  const containerSize = containerSizeOverride || `${sizeRem * CONTAINER_RATIO}rem`;
  const bgColor = BG_COLOR[brand][background];
  const iconSrc = `/icons/${brand}/${encodeURIComponent(name)}.svg`;

  // quaternary: CSS mask tints the monochrome SVG to quaternary.main;
  // only valid with background="none" (no container is rendered in that case anyway)
  const img = iconColor === 'quaternary' ? (
    <Box
      role={ariaLabel ? 'img' : undefined}
      aria-label={ariaLabel}
      aria-hidden={ariaLabel ? undefined : true}
      sx={{
        width: iconSize,
        height: iconSize,
        display: 'block',
        flexShrink: 0,
        bgcolor: 'quaternary.main',
        maskImage: `url(${iconSrc})`,
        WebkitMaskImage: `url(${iconSrc})`,
        maskSize: 'contain',
        WebkitMaskSize: 'contain',
        maskRepeat: 'no-repeat',
        WebkitMaskRepeat: 'no-repeat',
        maskPosition: 'center',
        WebkitMaskPosition: 'center',
      }}
    />
  ) : (
    <Box
      component="img"
      src={iconSrc}
      alt={ariaLabel ?? ''}
      aria-hidden={ariaLabel ? undefined : true}
      sx={{ width: iconSize, height: iconSize, objectFit: 'contain', display: 'block',
        filter: iconColor === 'white' ? 'brightness(0) invert(1)' : undefined }}
    />
  );

  if (!bgColor) return img;

  return (
    <Box
      sx={{
        width: containerSize,
        height: containerSize,
        borderRadius: '50%',
        bgcolor: bgColor,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      {img}
    </Box>
  );
}

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
 * - `default` → embedded colour (QSuper blue)
 * - `white`   → CSS filter to white
 */
export type HeroIconColor = 'default' | 'white';
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
   * `default` shows the embedded colour; `white` inverts to white.
   */
  iconColor?: HeroIconColor;
  'aria-label'?: string;
}

const SIZE_MAP: Record<HeroIconSize, number> = {
  sm: 24,
  md: 32,
  lg: 48,
  xl: 64,
  '2xl': 80,
  '3xl': 96,
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
  'aria-label': ariaLabel,
}: HeroIconProps) {
  const px = SIZE_MAP[size];
  const bgColor = BG_COLOR[brand][background];
  const containerSize = Math.round(px * CONTAINER_RATIO);
  const filter = iconColor === 'white' ? 'brightness(0) invert(1)' : undefined;

  const img = (
    <Box
      component="img"
      src={`/icons/${brand}/${encodeURIComponent(name)}.svg`}
      alt={ariaLabel ?? ''}
      aria-hidden={ariaLabel ? undefined : true}
      sx={{ width: px, height: px, objectFit: 'contain', display: 'block', filter }}
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

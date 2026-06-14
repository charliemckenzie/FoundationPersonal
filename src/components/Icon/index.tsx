import { useEffect, useMemo, useState } from 'react';
import Box from '@mui/material/Box';

export type IconSize = 'sm' | 'md' | 'lg' | 'xl' | 'xl+' | '2xl' | '3xl' | 'inherit';
export type IconColor =
  | 'inherit'
  | 'primary'
  | 'secondary'
  | 'error'
  | 'warning'
  | 'info'
  | 'success'
  | 'text.primary'
  | 'text.heading'
  | 'text.muted'
  | 'text.disabled';

export type IconStyle = 'solid' | 'regular' | 'light' | 'thin' | 'duotone' | 'sharp';

export interface IconProps {
  icon: string;
  style?: IconStyle;
  size?: IconSize;
  color?: IconColor;
  'aria-label'?: string;
}

const SIZE_MAP: Record<IconSize, string> = {
  sm: '0.875rem',
  md: '1rem',
  lg: '1.25rem',
  xl: '1.5rem',
  'xl+': '1.75rem',
  '2xl': '2rem',
  '3xl': '2.5rem',
  // CSS keyword — lets a parent set fontSize on a wrapper and have the icon scale to it.
  inherit: 'inherit',
};

const COLOR_TO_SX: Record<IconColor, string> = {
  inherit: 'inherit',
  primary: 'primary.main',
  secondary: 'secondary.main',
  error: 'error.main',
  warning: 'warning.main',
  info: 'info.main',
  success: 'success.main',
  'text.primary': 'text.primary',
  'text.heading': 'text.heading',
  'text.muted': 'text.muted',
  'text.disabled': 'text.disabled',
};

const FONT_AWESOME_ICON_ALIASES: Record<string, string> = {
  // Legacy qsuper/icon names mapped to local Font Awesome base names.
  chevron_down: 'chevron-down',
  chevron_left: 'chevron-left',
  chevron_right: 'chevron-right',
  chevron_up: 'chevron-up',
  home: 'house',
  info_1: 'circle-info',
  info: 'circle-info',
  'circle-info': 'circle-info',
  plus: 'plus',
};

function normalizeIconName(icon: string): string {
  const normalized = icon.trim().replace(/^fa-/, '').toLowerCase().replace(/\s+/g, '-');
  if (!normalized) return 'house';
  const aliasOrName = FONT_AWESOME_ICON_ALIASES[normalized] ?? normalized;
  return aliasOrName.replace(/_/g, '-');
}

function getStyleVariant(style: IconStyle): 'solid' | 'light' | 'regular' {
  if (style === 'light') return 'light';
  if (style === 'regular') return 'regular';
  return 'solid';
}

function resolveIconPaths(icon: string, style: IconStyle): { primary: string; fallback: string } {
  const variant = getStyleVariant(style);
  const fallbackVariant = 'solid';
  const normalized = normalizeIconName(icon).replace(/\.svg$/i, '');
  const withVariantSuffix = normalized.match(/-(solid|light|regular)-full$/)
    ? normalized.replace(/-(solid|light|regular)-full$/, `-${variant}-full`)
    : `${normalized}-${variant}-full`;

  const primary = `/icons/font-awesome/${variant}/${encodeURIComponent(withVariantSuffix)}.svg`;
  const fallbackSuffix = withVariantSuffix.replace(/-(solid|light|regular)-full$/, `-${fallbackVariant}-full`);
  const fallback = `/icons/font-awesome/${fallbackVariant}/${encodeURIComponent(fallbackSuffix)}.svg`;

  return { primary, fallback };
}

const FINAL_FALLBACK_SRC = '/icons/font-awesome/solid/house-solid-full.svg';

export function Icon({
  icon,
  style = 'solid',
  size = 'md',
  color = 'inherit',
  'aria-label': ariaLabel,
}: IconProps) {
  const paths = useMemo(() => resolveIconPaths(icon, style), [icon, style]);
  const [iconSrc, setIconSrc] = useState(paths.primary);
  const [didTryStyleFallback, setDidTryStyleFallback] = useState(false);

  useEffect(() => {
    setIconSrc(paths.primary);
    setDidTryStyleFallback(false);
  }, [paths.primary]);

  const handleLoadError = () => {
    if (!didTryStyleFallback && iconSrc !== paths.fallback) {
      setDidTryStyleFallback(true);
      setIconSrc(paths.fallback);
      return;
    }

    if (iconSrc !== FINAL_FALLBACK_SRC) {
      setIconSrc(FINAL_FALLBACK_SRC);
    }
  };

  return (
    <Box
      component="span"
      aria-label={ariaLabel}
      aria-hidden={ariaLabel ? undefined : true}
      sx={{ display: 'inline-flex', color: COLOR_TO_SX[color], lineHeight: 0, fontSize: SIZE_MAP[size] }}
    >
      <Box
        component="span"
        role={ariaLabel ? 'img' : undefined}
        aria-label={ariaLabel}
        sx={{
          width: '1em',
          height: '1em',
          display: 'block',
          bgcolor: 'currentColor',
          maskImage: `url(${iconSrc})`,
          WebkitMaskImage: `url(${iconSrc})`,
          maskSize: 'contain',
          WebkitMaskSize: 'contain',
          maskRepeat: 'no-repeat',
          WebkitMaskRepeat: 'no-repeat',
          maskPosition: 'center',
          WebkitMaskPosition: 'center',
        }}
      >
        <Box
          component="img"
          src={iconSrc}
          alt=""
          aria-hidden
          onError={handleLoadError}
          sx={{ width: 0, height: 0, opacity: 0, position: 'absolute', pointerEvents: 'none' }}
        />
      </Box>
    </Box>
  );
}

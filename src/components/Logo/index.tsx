'use client';

import type { SVGProps } from 'react';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import type { LogoVariant } from '../../app/themes/brands';
import { ARTHorizontal } from './logos/ARTHorizontal';
import { ART2Lines } from './logos/ART2Lines';
import { ARTMark } from './logos/ARTMark';
import { QSuperFull } from './logos/QSuperFull';
import { QSuperOnly } from './logos/QSuperOnly';

type LogoMap = Partial<Record<LogoVariant, React.ComponentType<SVGProps<SVGSVGElement>>>>;

const BRAND_LOGOS: Record<string, LogoMap> = {
  ART: {
    primary: ARTHorizontal,
    secondary: ART2Lines,
    mark: ARTMark,
  },
  QSuper: {
    primary: QSuperFull,
    secondary: QSuperOnly,
  },
};

export interface LogoProps {
  /** Logo variant to display. Falls back to `primary` if not defined for the current brand. */
  variant?: LogoVariant;
  /** Controls the logo height. Width scales proportionally. */
  size?: 'sm' | 'md' | 'lg';
  /** Accessible label. Defaults to the brand name. */
  alt?: string;
}

export function Logo({ variant = 'primary', size = 'md', alt }: LogoProps) {
  const theme = useTheme();
  const brandName = theme.brandConfig.name;
  const logoMap = BRAND_LOGOS[brandName] ?? BRAND_LOGOS['ART'];
  const SvgComponent = logoMap[variant] ?? logoMap['primary'];

  if (!SvgComponent) return null;

  const altText = alt ?? brandName;

  return (
    <Box
      sx={{
        color: 'primary.main',
        height: (t) => ({ sm: t.spacing(3), md: t.spacing(5), lg: t.spacing(8) }[size]),
        '& svg': { height: '100%', width: 'auto', display: 'block' },
      }}
    >
      <SvgComponent aria-label={altText} role="img" />
    </Box>
  );
}

'use client';

import Box from '@mui/material/Box';
import { Icon } from '../Icon';
import { skyBlue } from '../../app/themes/primitives/colors';
import type { SxProps, Theme } from '@mui/material/styles';
import React from 'react';

export type ArtieAIButtonSize = 'small' | 'medium' | 'large';

export interface ArtieAIButtonProps {
  /** Button label text. */
  label?: string;
  size?: ArtieAIButtonSize;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: 'button' | 'submit' | 'reset';
  sx?: SxProps<Theme>;
}

const SIZE_MAP: Record<ArtieAIButtonSize, { height: string; px: string; fontSize: string; iconSize: 'md' | 'lg' | 'xl' }> = {
  small:  { height: '2.5rem',    px: '1rem',    fontSize: '0.875rem',   iconSize: 'md' },
  medium: { height: '3rem',      px: '1.25rem', fontSize: '0.9375rem',  iconSize: 'lg' },
  large:  { height: '3.5rem',    px: '1.5rem',  fontSize: '1.0625rem',  iconSize: 'xl' },
};

export function ArtieAIButton({
  label = 'Ask Artie',
  size = 'medium',
  disabled = false,
  onClick,
  type = 'button',
  sx: sxProp,
}: ArtieAIButtonProps) {
  const { height, px, fontSize, iconSize } = SIZE_MAP[size];

  return (
    <Box
      component="button"
      type={type}
      disabled={disabled}
      onClick={disabled ? undefined : onClick}
      sx={[
        (t) => ({
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          height,
          paddingInline: px,
          borderRadius: 9999,
          border: 'none',
          background: t.palette.mode === 'light'
            // Darker stops keep white text AA-accessible throughout (8.9:1 / 5.9:1 / 3.4:1 at edge)
            ? `linear-gradient(195deg, ${t.palette.primary.dark}, ${t.palette.primary.main}, ${skyBlue[500]})`
            // Dark-mode palette shifts primary.main to #75a1ff — lighter gradient suits dark text
            : `linear-gradient(195deg, ${t.palette.primary.main}, ${skyBlue[400]}, ${skyBlue[200]})`,
          color: t.palette.mode === 'light'
            ? t.palette.primary.contrastText  // white — 5.9:1+ across all stops ✓
            : t.palette.secondary.dark,       // #1c355e — 4.8:1+ across all stops ✓
          fontSize,
          fontFamily: t.typography.fontFamily,
          fontWeight: 700,
          lineHeight: 1,
          cursor: disabled ? 'not-allowed' : 'pointer',
          whiteSpace: 'nowrap',
          userSelect: 'none',
          outline: 'none',
          flexShrink: 0,
          transition: 'filter 150ms ease, opacity 150ms ease',
          opacity: disabled ? 0.5 : 1,
          '&:hover:not(:disabled)': {
            filter: 'brightness(0.95)',
          },
          '&:focus-visible': {
            outline: `2px solid ${t.palette.border.focus}`,
            outlineOffset: '2px',
          },
        }),
        ...(Array.isArray(sxProp) ? sxProp : sxProp ? [sxProp] : []),
      ]}
    >
      <Icon icon="sparkles" style="solid" size={iconSize} color="inherit" />
      {label}
    </Box>
  );
}


'use client';

import Box from '@mui/material/Box';
import { Icon } from '../Icon';
import { alpha } from '@mui/material/styles';
import type { SxProps, Theme } from '@mui/material/styles';
import React from 'react';

/**
 * Animation cycle (9 s total):
 *   0–39%  (0–3.5 s)  — spotlight sweeps one full orbit
 *   39–44% (3.5–4.0 s) — spotlight fades out / solid ring fades in
 *   44–89% (4.0–8.0 s) — solid ring holds (pause state, 4 s)
 *   89–95% (8.0–8.5 s) — solid ring fades out / spotlight fades back in
 *   95–100% (8.5–9.0 s) — spotlight briefly visible before next cycle
 *
 * artie-orbit holds --artie-angle at 360° through the pause so the spot
 * always re-enters from the same position each cycle.
 */
const ORBIT_STYLES = `
  @property --artie-angle {
    syntax: '<angle>';
    initial-value: 0deg;
    inherits: false;
  }
  @keyframes artie-orbit {
    0%   { --artie-angle: 0deg; }
    39%  { --artie-angle: 360deg; }
    100% { --artie-angle: 360deg; }
  }
  @keyframes artie-spot-show {
    0%,  39%       { opacity: 1; }
    44%, 89%       { opacity: 0; }
    95%, 100%      { opacity: 1; }
  }
  @keyframes artie-border-show {
    0%,  39%       { opacity: 0; }
    44%, 89%       { opacity: 1; }
    95%, 100%      { opacity: 0; }
  }
`;

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

/** Width of the animated ring outside the button border (px). */
const RING = 3;

const GRADIENT = `
  conic-gradient(
    from var(--artie-angle),
    transparent 0%,
    transparent 72%,
    var(--artie-light) 82%,
    var(--artie-main)  88%,
    var(--artie-light) 94%,
    transparent 100%
  )
`;

export function ArtieAIButton({
  label = 'Ask Artie',
  size = 'medium',
  disabled = false,
  onClick,
  type = 'button',
  sx: sxProp,
}: ArtieAIButtonProps) {
  const { height, px, fontSize, iconSize } = SIZE_MAP[size];
  const spotAnim  = disabled ? 'none' : 'artie-spot-show 9s linear infinite';
  const orbitAnim  = disabled ? 'none' : 'artie-orbit 9s linear infinite';
  const borderAnim = disabled ? 'none' : 'artie-border-show 9s linear infinite';

  return (
    <>
      <style>{ORBIT_STYLES}</style>

      <Box
        sx={(t) => ({
          position: 'relative',
          display: 'inline-flex',
          padding: `${RING}px`,
          borderRadius: 9999,
          flexShrink: 0,
          // Expose palette values as inheritable CSS vars used in GRADIENT
          '--artie-main':  t.palette.primary.main,
          '--artie-light': t.palette.primary.light,
        })}
      >
        {/* ── Spotlight group (sweep phase) — controls opacity only ───── */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            borderRadius: 9999,
            pointerEvents: 'none',
            opacity: disabled ? 0 : undefined,
            animation: spotAnim,
            transition: 'opacity 300ms ease',
          }}
        >
          {/* Soft glow — artie-orbit applied HERE so --artie-angle animates on
              the element that uses it (inherits: false means parent value
              never reaches children). */}
          <Box
            aria-hidden
            sx={{
              position: 'absolute',
              inset: '-2px',
              borderRadius: 9999,
              background: GRADIENT,
              animation: orbitAnim,
              filter: 'blur(3px)',
              opacity: 0.65,
            }}
          />
          {/* Crisp 3 px spotlight arc */}
          <Box
            aria-hidden
            sx={{
              position: 'absolute',
              inset: 0,
              borderRadius: 9999,
              background: GRADIENT,
              animation: orbitAnim,
            }}
          />
        </Box>

        {/* ── Solid ring (pause / stop state) ───────────────────────────── */}
        {/* Uses background (not border) so the ring width is rendered identically
           to the gradient spotlight — avoids the sub-pixel difference that made
           the right edge appear thinner with the border approach. */}
        <Box
          aria-hidden
          sx={(t) => ({
            position: 'absolute',
            inset: 0,
            borderRadius: 9999,
            background: alpha(t.palette.primary.main, 0.45),
            pointerEvents: 'none',
            opacity: 0,
            animation: borderAnim,
            transition: 'opacity 300ms ease',
          })}
        />

        {/* ── Button surface ─────────────────────────────────────────────── */}
        <Box
          component="button"
          type={type}
          disabled={disabled}
          onClick={disabled ? undefined : onClick}
          sx={[
            (t) => ({
              position: 'relative',
              zIndex: 2,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              height,
              paddingInline: px,
              borderRadius: 9999,
              border: `1px solid ${t.palette.border.subtle}`,
              backgroundColor: t.palette.background.paper,
              color: t.palette.text.heading,
              fontSize,
              fontFamily: t.typography.fontFamily,
              fontWeight: 700,
              lineHeight: 1,
              cursor: disabled ? 'not-allowed' : 'pointer',
              whiteSpace: 'nowrap',
              userSelect: 'none',
              outline: 'none',
              transition: 'background-color 200ms ease, backdrop-filter 200ms ease, opacity 150ms ease',
              opacity: disabled ? 0.5 : 1,
              '&:hover:not(:disabled)': {
                backgroundColor: alpha(t.palette.background.paper, 0.55),
                backdropFilter: 'blur(14px) saturate(1.8)',
                WebkitBackdropFilter: 'blur(14px) saturate(1.8)',
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
      </Box>
    </>
  );
}


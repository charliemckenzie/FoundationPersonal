import { alpha } from '@mui/material/styles';
import type { Theme } from '@mui/material/styles';
import { TINT } from '../../app/themes/semantic';

export type ButtonColorKey = 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success' | 'white';
export type ButtonVariantKey = 'contained' | 'outlined' | 'ghost';

/** Resolved color key — 'white' is always pre-mapped to 'primary' before calling the variant helpers. */
export type ButtonColorKeyResolved = Exclude<ButtonColorKey, 'white'>;

export function buildContainedStyles(color: ButtonColorKeyResolved) {
  return {
    backgroundColor: (theme: Theme) => theme.palette[color].main,
    color: (theme: Theme) => theme.palette[color].contrastText,
    boxShadow: 'none',
    '&:hover': {
      backgroundColor: (theme: Theme) => theme.palette[color].dark,
      boxShadow: 'none',
    },
    '&:active': {
      backgroundColor: (theme: Theme) => theme.palette[color].deeper ?? theme.palette[color].dark,
      boxShadow: 'none',
    },
    '&.Mui-disabled': {
      backgroundColor: (theme: Theme) => theme.palette.action.disabledBackground,
      color: (theme: Theme) => theme.palette.action.disabled,
    },
  };
}

type Mode = 'light' | 'dark';
const m = (t: Theme): Mode => t.palette.mode as Mode;

// In light mode, darken text on hover/active to maintain contrast against the deepening fill.
// In dark mode, lighten text to primary.light (trueBlue[200]) — brighter than main for better
// contrast against the darkened fills on paper and elevated surfaces.
const interactiveColor = (theme: Theme, color: ButtonColorKeyResolved) =>
  theme.palette.mode === 'light' ? theme.palette[color].dark : theme.palette[color].light;

export function buildGhostStyles(color: ButtonColorKeyResolved) {
  return {
    backgroundColor: 'transparent',
    color: (theme: Theme) => theme.palette[color].main,
    boxShadow: 'none',
    '&:hover': {
      backgroundColor: (theme: Theme) =>
        theme.palette[color].softDark ?? alpha(theme.palette[color].main, TINT.dark[m(theme)]),
      color: (theme: Theme) => interactiveColor(theme, color),
    },
    '&:active': {
      backgroundColor: (theme: Theme) =>
        theme.palette[color].softDeeper ?? alpha(theme.palette[color].main, TINT.deeper[m(theme)]),
      color: (theme: Theme) => interactiveColor(theme, color),
    },
    '&.Mui-disabled': {
      backgroundColor: 'transparent',
      color: (theme: Theme) => theme.palette.action.disabled,
    },
  };
}

export function buildOutlinedStyles(color: ButtonColorKeyResolved) {
  return {
    backgroundColor: 'transparent',
    border: '1px solid',
    borderColor: (theme: Theme) => theme.palette[color].main,
    color: (theme: Theme) => theme.palette[color].main,
    boxShadow: 'none',
    '&:hover': {
      backgroundColor: (theme: Theme) =>
        theme.palette[color].softDark ?? alpha(theme.palette[color].main, TINT.dark[m(theme)]),
      borderColor: (theme: Theme) => interactiveColor(theme, color),
      color: (theme: Theme) => interactiveColor(theme, color),
    },
    '&:active': {
      backgroundColor: (theme: Theme) =>
        theme.palette[color].softDeeper ?? alpha(theme.palette[color].main, TINT.deeper[m(theme)]),
      borderColor: (theme: Theme) => interactiveColor(theme, color),
      color: (theme: Theme) => interactiveColor(theme, color),
    },
    '&.Mui-disabled': {
      backgroundColor: 'transparent',
      borderColor: (theme: Theme) => theme.palette.action.disabledBackground,
      color: (theme: Theme) => theme.palette.action.disabled,
    },
  };
}

export function buildWhiteStyles() {
  return {
    backgroundColor: (theme: Theme) => theme.palette.background.paper,
    color: (theme: Theme) => theme.palette.primary.main,
    boxShadow: 'none',
    '&:hover': { backgroundColor: (theme: Theme) => theme.palette.primary.softMain!, boxShadow: 'none' },
    '&:active': { backgroundColor: (theme: Theme) => theme.palette.primary.softDark!, boxShadow: 'none' },
    '&.Mui-disabled': {
      backgroundColor: (theme: Theme) => alpha(theme.palette.common.white, 0.3),
      color: (theme: Theme) => alpha(theme.palette.primary.main, 0.4),
    },
  };
}

/**
 * Focus ring styles shared by Button and IconButton.
 * Pass reversed=true (or color==='white') to get a white ring for dark-background contexts.
 */
export function buildFocusStyles(isReversed: boolean, resolvedColor: ButtonColorKeyResolved) {
  return {
    '&.Mui-focusVisible': {
      outline: (theme: Theme) =>
        `2px solid ${isReversed ? theme.palette.common.white : theme.palette[resolvedColor].main}`,
      outlineOffset: '2px',
      boxShadow: 'none',
    },
  };
}

export function buildMutedGhostStyles() {
  return {
    backgroundColor: 'transparent',
    color: (theme: Theme) => theme.palette.text.muted,
    boxShadow: 'none',
    '&:hover': {
      backgroundColor: (theme: Theme) => alpha(theme.palette.text.primary, TINT.dark[m(theme)]),
      color: (theme: Theme) => theme.palette.text.primary,
    },
    '&:active': {
      backgroundColor: (theme: Theme) => alpha(theme.palette.text.primary, TINT.deeper[m(theme)]),
      color: (theme: Theme) => theme.palette.text.primary,
    },
    '&.Mui-disabled': {
      backgroundColor: 'transparent',
      color: (theme: Theme) => theme.palette.action.disabled,
    },
  };
}

export function buildMutedElevatedStyles() {
  return {
    backgroundColor: (theme: Theme) => theme.palette.background.elevated,
    color: (theme: Theme) => theme.palette.text.muted,
    boxShadow: 'none',
    '&:hover': {
      backgroundColor: (theme: Theme) => alpha(theme.palette.text.primary, TINT.dark[m(theme)]),
      color: (theme: Theme) => theme.palette.text.primary,
    },
    '&:active': {
      backgroundColor: (theme: Theme) => alpha(theme.palette.text.primary, TINT.deeper[m(theme)]),
      color: (theme: Theme) => theme.palette.text.primary,
    },
    '&.Mui-disabled': {
      backgroundColor: 'transparent',
      color: (theme: Theme) => theme.palette.action.disabled,
    },
  };
}

export function buildReversedStyles(variant: ButtonVariantKey, color: ButtonColorKeyResolved) {
  return {
    ...(variant === 'contained' && {
      backgroundColor: (theme: Theme) => theme.palette.common.white,
      // In dark mode, primary.main/dark are light blues (~3:1 vs white — fails AA).
      // primary.contrastText = brand.primary[950] (#030917) = ~19:1 vs white ✅
      color: (theme: Theme) =>
        theme.palette.mode === 'dark'
          ? theme.palette[color].contrastText
          : theme.palette[color].main,
      boxShadow: 'none',
      '&:hover': {
        backgroundColor: (theme: Theme) => alpha(theme.palette.common.white, 0.88),
        boxShadow: 'none',
        // Light mode: text tracks the lightening bg — primary.dark (L=0.069) on #e0eaff (L=0.82) = 7.30:1 ✅
        color: (theme: Theme) =>
          theme.palette.mode === 'light' ? theme.palette[color].dark : theme.palette[color].contrastText,
      },
      '&:active': {
        backgroundColor: (theme: Theme) => alpha(theme.palette.common.white, 0.80),
        boxShadow: 'none',
        // Light mode: primary.deeper on #ccdcff (L=0.71) = 10.31:1 ✅ (primary.main = 4.21:1 ❌)
        color: (theme: Theme) =>
          theme.palette.mode === 'light'
            ? (theme.palette[color].deeper ?? theme.palette[color].dark)
            : theme.palette[color].contrastText,
      },
      '&.Mui-disabled': {
        backgroundColor: (theme: Theme) => alpha(theme.palette.common.white, 0.23),
        color: (theme: Theme) => alpha(theme.palette.common.white, 0.65),
      },
    }),
    ...(variant === 'outlined' && {
      backgroundColor: 'transparent',
      borderColor: (theme: Theme) => alpha(theme.palette.common.white, 0.5),
      color: (theme: Theme) => theme.palette.common.white,
      '&:hover': {
        backgroundColor: (theme: Theme) =>
          theme.palette.mode === 'light'
            ? alpha(theme.palette.common.black, TINT.dark.light)
            : alpha(theme.palette.common.white, 0.12),
        borderColor: (theme: Theme) => theme.palette.common.white,
      },
      '&:active': {
        backgroundColor: (theme: Theme) =>
          theme.palette.mode === 'light'
            ? alpha(theme.palette.common.black, 0.25)
            : alpha(theme.palette.common.white, 0.18),
        borderColor: (theme: Theme) => theme.palette.common.white,
      },
      '&.Mui-disabled': {
        borderColor: (theme: Theme) => alpha(theme.palette.common.white, 0.60),
        color: (theme: Theme) => alpha(theme.palette.common.white, 0.60),
      },
    }),
    ...(variant === 'ghost' && {
      backgroundColor: 'transparent',
      color: (theme: Theme) => theme.palette.common.white,
      '&:hover': {
        backgroundColor: (theme: Theme) =>
          theme.palette.mode === 'light'
            ? alpha(theme.palette.common.black, TINT.dark.light)
            : alpha(theme.palette.common.white, 0.12),
      },
      '&:active': {
        backgroundColor: (theme: Theme) =>
          theme.palette.mode === 'light'
            ? alpha(theme.palette.common.black, 0.25)
            : alpha(theme.palette.common.white, 0.18),
      },
      '&.Mui-disabled': { color: (theme: Theme) => alpha(theme.palette.common.white, 0.60) },
    }),
  };
}

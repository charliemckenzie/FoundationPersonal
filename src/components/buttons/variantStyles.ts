import { alpha } from '@mui/material/styles';
import type { Theme } from '@mui/material/styles';

export type ButtonColorKey = 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success' | 'white';
export type ButtonVariantKey = 'contained' | 'outlined' | 'ghost' | 'soft';

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
      backgroundColor: (theme: Theme) => theme.palette[color].dark,
      boxShadow: 'none',
    },
    '&.Mui-disabled': {
      backgroundColor: (theme: Theme) => theme.palette.action.disabledBackground,
      color: (theme: Theme) => theme.palette.action.disabled,
    },
  };
}

export function buildSoftStyles(color: ButtonColorKeyResolved) {
  return {
    backgroundColor: (theme: Theme) =>
      theme.palette.mode === 'dark'
        ? alpha(theme.palette[color].main, 0.15)
        : alpha(theme.palette[color].main, 0.08),
    color: (theme: Theme) => theme.palette[color].main,
    boxShadow: 'none',
    '&:hover': {
      backgroundColor: (theme: Theme) =>
        theme.palette.mode === 'dark'
          ? alpha(theme.palette[color].main, 0.25)
          : alpha(theme.palette[color].main, 0.15),
    },
    '&:active': {
      backgroundColor: (theme: Theme) =>
        theme.palette.mode === 'dark'
          ? alpha(theme.palette[color].main, 0.30)
          : alpha(theme.palette[color].main, 0.20),
    },
    '&.Mui-disabled': {
      backgroundColor: (theme: Theme) => theme.palette.action.disabledBackground,
      color: (theme: Theme) => theme.palette.action.disabled,
    },
  };
}

export function buildGhostStyles(color: ButtonColorKeyResolved) {
  return {
    backgroundColor: 'transparent',
    color: (theme: Theme) => theme.palette[color].main,
    boxShadow: 'none',
    '&:hover': {
      backgroundColor: (theme: Theme) => alpha(theme.palette[color].main, 0.08),
    },
    '&:active': {
      backgroundColor: (theme: Theme) => alpha(theme.palette[color].main, 0.12),
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
      backgroundColor: (theme: Theme) => alpha(theme.palette[color].main, 0.04),
      borderColor: (theme: Theme) => theme.palette[color].main,
    },
    '&:active': {
      backgroundColor: (theme: Theme) => alpha(theme.palette[color].main, 0.08),
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
    '&:hover': { backgroundColor: (theme: Theme) => alpha(theme.palette.primary.main, 0.08), boxShadow: 'none' },
    '&:active': { backgroundColor: (theme: Theme) => alpha(theme.palette.primary.main, 0.12), boxShadow: 'none' },
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
      '&:hover': { backgroundColor: (theme: Theme) => alpha(theme.palette.common.white, 0.88), boxShadow: 'none' },
      '&:active': { backgroundColor: (theme: Theme) => alpha(theme.palette.common.white, 0.80), boxShadow: 'none' },
      '&.Mui-disabled': {
        backgroundColor: (theme: Theme) => alpha(theme.palette.common.white, 0.30),
        color: (theme: Theme) => alpha(theme.palette.common.white, 0.50),
      },
    }),
    ...(variant === 'outlined' && {
      backgroundColor: 'transparent',
      borderColor: (theme: Theme) => alpha(theme.palette.common.white, 0.5),
      color: (theme: Theme) => theme.palette.common.white,
      '&:hover': {
        backgroundColor: (theme: Theme) => alpha(theme.palette.common.white, 0.12),
        borderColor: (theme: Theme) => theme.palette.common.white,
      },
      '&.Mui-disabled': {
        borderColor: (theme: Theme) => alpha(theme.palette.common.white, 0.30),
        color: (theme: Theme) => alpha(theme.palette.common.white, 0.30),
      },
    }),
    ...(variant === 'ghost' && {
      backgroundColor: 'transparent',
      color: (theme: Theme) => theme.palette.common.white,
      '&:hover': { backgroundColor: (theme: Theme) => alpha(theme.palette.common.white, 0.12) },
      '&.Mui-disabled': { color: (theme: Theme) => alpha(theme.palette.common.white, 0.30) },
    }),
    ...(variant === 'soft' && {
      backgroundColor: (theme: Theme) => alpha(theme.palette.common.white, 0.15),
      color: (theme: Theme) => theme.palette.common.white,
      '&:hover': { backgroundColor: (theme: Theme) => alpha(theme.palette.common.white, 0.25) },
      '&:active': { backgroundColor: (theme: Theme) => alpha(theme.palette.common.white, 0.30) },
      '&.Mui-disabled': {
        backgroundColor: (theme: Theme) => alpha(theme.palette.common.white, 0.10),
        color: (theme: Theme) => alpha(theme.palette.common.white, 0.30),
      },
    }),
  };
}

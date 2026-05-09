import { alpha } from '@mui/material/styles';
import type { Theme } from '@mui/material/styles';

export type ButtonColorKey = 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
export type ButtonVariantKey = 'contained' | 'outlined' | 'ghost' | 'soft';

export function buildContainedStyles(color: ButtonColorKey) {
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

export function buildSoftStyles(color: ButtonColorKey) {
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

export function buildGhostStyles(color: ButtonColorKey) {
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

export function buildOutlinedStyles(color: ButtonColorKey) {
  return {
    backgroundColor: 'transparent',
    border: '2px solid',
    borderColor: (theme: Theme) =>
      theme.palette.mode === 'light'
        ? alpha(theme.palette[color].main, 0.5)
        : theme.palette[color].main,
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

export function buildReversedStyles(variant: ButtonVariantKey, color: ButtonColorKey) {
  return {
    ...(variant === 'contained' && {
      backgroundColor: (theme: Theme) => theme.palette.common.white,
      // primary.main in dark mode (#3385ff) is 3.54:1 vs white — fails AA. primary.dark (#0051ff) = 5.80:1 ✅
      color: (theme: Theme) =>
        theme.palette.mode === 'dark'
          ? theme.palette[color].dark
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

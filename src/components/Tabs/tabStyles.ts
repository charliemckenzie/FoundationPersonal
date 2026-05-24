import { alpha, type Theme } from '@mui/material/styles';

export type TabSize = 'small' | 'medium' | 'large';
export type TabStyle = 'default' | 'white' | 'segmented';

export const SIZE_CONFIG = {
  small:  { height: 40, px: 2 },
  medium: { height: 44, px: 2.5 },
  large:  { height: 48, px: 3.5 },
} satisfies Record<TabSize, { height: number; px: number }>;

// Segmented style uses two visual sizes; 'large' visually maps to medium.
export const SEGMENTED_HEIGHT: Record<TabSize, number> = { small: 36, medium: 44, large: 44 };
export const SEGMENTED_PX:     Record<TabSize, number> = { small: 3,  medium: 3.5, large: 4.5 };
export const SEGMENTED_PADDING = 4;

// Indicator slide easing — matches the spring easing in theme.transitions.easing.spring.
export const SLIDE_TRANSITION =
  'left 450ms cubic-bezier(0.25, 1, 0.5, 1), width 450ms cubic-bezier(0.25, 1, 0.5, 1)';

export function tabFontSize(theme: Theme, size: TabSize) {
  if (size === 'small')  return theme.typography.small.fontSize;
  if (size === 'medium') return theme.typography.body.fontSize;
  return theme.typography.body.fontSize;
}

interface SegmentedColors {
  inactive: string;
  active:   string;
  hoverBg:  string;
}

function segmentedColors(theme: Theme, reversed: boolean): SegmentedColors {
  return {
    inactive: reversed ? theme.palette.common.white : theme.palette.primary.main,
    active:   reversed
      ? (theme.palette.mode === 'dark' ? theme.palette.primary.contrastText : theme.palette.primary.main)
      : theme.palette.primary.contrastText,
    hoverBg:  reversed
      ? alpha(theme.palette.common.white, 0.12)
      : alpha(theme.palette.primary.main, 0.08),
  };
}

function buildSegmentedSx(theme: Theme, size: TabSize, reversed: boolean, equalWidth?: number) {
  const h = SEGMENTED_HEIGHT[size];
  const { inactive, active, hoverBg } = segmentedColors(theme, reversed);
  return {
    borderRadius: `${theme.shape.button}px`,
    border: 'none',
    textTransform: 'none' as const,
    fontWeight: 700,
    fontSize: tabFontSize(theme, size),
    px: SEGMENTED_PX[size],
    py: 0,
    height: h,
    minHeight: h,
    bgcolor: 'transparent',
    color: inactive,
    whiteSpace: 'nowrap' as const,
    position: 'relative' as const,
    zIndex: 1,
    ...(equalWidth !== undefined && { width: equalWidth, minWidth: equalWidth }),
    '&.Mui-selected': { bgcolor: 'transparent', color: active },
    '&:hover': { bgcolor: hoverBg },
    '&.Mui-selected:hover': { bgcolor: 'transparent' },
    '&.Mui-focusVisible': {
      outline: '2px solid',
      outlineColor: reversed ? theme.palette.common.white : 'primary.main',
      outlineOffset: 2,
      zIndex: 2,
    },
    '&.Mui-disabled': {
      color: reversed
        ? alpha(theme.palette.common.white, 0.4)
        : theme.palette.text.disabled,
    },
  };
}

function buildDefaultSx(theme: Theme, size: TabSize) {
  const { height, px } = SIZE_CONFIG[size];
  return {
    borderRadius: `${theme.shape.button}px`,
    border: 'none',
    textTransform: 'none' as const,
    fontWeight: 700,
    fontSize: tabFontSize(theme, size),
    whiteSpace: 'nowrap' as const,
    px,
    py: 0,
    height,
    minHeight: height,
    bgcolor: theme.palette.mode === 'dark'
      ? alpha(theme.palette.primary.main, 0.15)
      : alpha(theme.palette.primary.main, 0.08),
    color: theme.palette.primary.main,
    '&:hover': {
      bgcolor: theme.palette.mode === 'dark'
        ? alpha(theme.palette.primary.main, 0.25)
        : alpha(theme.palette.primary.main, 0.15),
    },
    '&.Mui-selected': {
      bgcolor: 'primary.main',
      color: 'primary.contrastText',
      '&:hover': { bgcolor: theme.palette.primary.dark },
    },
    '&.Mui-focusVisible': {
      outline: '2px solid',
      outlineColor: 'primary.main',
      outlineOffset: 2,
    },
    '&.Mui-disabled': {
      border: 'none',
      color: 'text.disabled',
      bgcolor: 'action.disabledBackground',
    },
  };
}

function buildReversedSx(theme: Theme, size: TabSize) {
  const { height, px } = SIZE_CONFIG[size];
  return {
    borderRadius: `${theme.shape.button}px`,
    border: 'none',
    textTransform: 'none' as const,
    fontWeight: 700,
    fontSize: tabFontSize(theme, size),
    whiteSpace: 'nowrap' as const,
    px,
    py: 0,
    height,
    minHeight: height,
    bgcolor: alpha(theme.palette.common.white, 0.15),
    color: theme.palette.common.white,
    '&:hover': { bgcolor: alpha(theme.palette.common.white, 0.25) },
    '&.Mui-selected': {
      bgcolor: theme.palette.common.white,
      color: theme.palette.mode === 'dark'
        ? theme.palette.primary.contrastText
        : theme.palette.primary.main,
      '&:hover': { bgcolor: alpha(theme.palette.common.white, 0.88) },
    },
    '&.Mui-focusVisible': {
      outline: '2px solid',
      outlineColor: theme.palette.common.white,
      outlineOffset: 2,
    },
    '&.Mui-disabled': {
      border: 'none',
      color: alpha(theme.palette.common.white, 0.4),
      bgcolor: alpha(theme.palette.common.white, 0.08),
    },
  };
}

export function buildTabSx(theme: Theme, size: TabSize, tabStyle: TabStyle, reversed: boolean, equalWidth?: number) {
  if (tabStyle === 'segmented') return buildSegmentedSx(theme, size, reversed, equalWidth);
  // 'white' is a pre-baked reversed treatment; 'default' + reversed flag follows the same path.
  if (reversed || tabStyle === 'white') return buildReversedSx(theme, size);
  return buildDefaultSx(theme, size);
}

// Only invoked when isSegmented is true; the caller spreads the sx conditionally.
export function buildSegmentedContainerSx(theme: Theme, fullWidth: boolean, reversed: boolean) {
  return {
    display: fullWidth ? 'flex' : 'inline-flex',
    width: fullWidth ? '100%' : 'auto',
    bgcolor: reversed
      ? alpha(theme.palette.common.white, 0.15)
      : alpha(theme.palette.primary.main, 0.1),
    borderRadius: `${theme.shape.button}px`,
    padding: `${SEGMENTED_PADDING}px`,
  };
}

export function buildMuiTabsSx(theme: Theme, isSegmented: boolean, size: TabSize, fullWidth: boolean, reversed: boolean) {
  if (isSegmented) {
    return {
      minHeight: SEGMENTED_HEIGHT[size],
      ...(fullWidth && { flex: 1 }),
      '& .MuiTabs-scroller': { overflow: 'visible !important' },
      '& .MuiTabs-flexContainer': {
        gap: 0,
        ...(fullWidth && { width: '100%' }),
      },
      '& .MuiTabs-indicator': {
        top: 0,
        bottom: 0,
        height: '100%',
        borderRadius: `${theme.shape.button}px`,
        bgcolor: reversed ? theme.palette.common.white : 'primary.main',
        zIndex: 0,
        transition: SLIDE_TRANSITION,
        '@media (prefers-reduced-motion: reduce)': { transition: 'none' },
      },
      '& .MuiTab-root': { ...(fullWidth && { flex: 1 }) },
    };
  }
  return {
    overflow: 'visible',
    '& .MuiTabs-scroller': { overflow: 'visible !important' },
    '& .MuiTabs-flexContainer': { gap: 0 },
    '& .MuiTabs-indicator': { display: 'none' },
    '& .MuiTab-root': { marginRight: '8px' },
    '& .MuiTab-root:last-of-type': { marginRight: 0 },
    minHeight: SIZE_CONFIG[size].height,
  };
}

import MuiTabs from '@mui/material/Tabs';
import MuiTab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { alpha, type Theme } from '@mui/material/styles';
import React from 'react';

export type TabSize = 'small' | 'medium' | 'large';
export type TabStyle = 'default' | 'white' | 'segmented';

export interface TabItem {
  label: string;
  content?: React.ReactNode;
  disabled?: boolean;
}

export interface TabsProps {
  /** Accessible label for the tablist — shown to screen readers. Make it descriptive, e.g. "Account settings". */
  label: string;
  tabs: TabItem[];
  size?: TabSize;
  tabStyle?: TabStyle;
  defaultTab?: number;
  /** Segmented style only — stretch the tab group to fill its container. */
  fullWidth?: boolean;
  /** Place on dark or brand-coloured backgrounds — flips all styles to white-based. */
  reversed?: boolean;
  onChange?: (index: number) => void;
}

const SIZE_CONFIG = {
  small:  { height: 40, px: 2 },
  medium: { height: 44, px: 2.5 },
  large:  { height: 48, px: 3.5 },
} satisfies Record<TabSize, { height: number; px: number }>;

// Segmented style uses two sizes; 'large' maps to medium.
const SEGMENTED_HEIGHT: Record<TabSize, number> = { small: 36, medium: 44, large: 44 };
const SEGMENTED_PX: Record<TabSize, number> = { small: 3, medium: 3.5, large: 4.5 };
const SEGMENTED_PADDING = 4;
const SLIDE_TRANSITION =
  'left 450ms cubic-bezier(0.25, 1, 0.5, 1), width 450ms cubic-bezier(0.25, 1, 0.5, 1)';

function tabFontSize(theme: Theme, size: TabSize) {
  if (size === 'small') return '0.875rem';
  if (size === 'medium') return '1rem';
  return theme.typography.body.fontSize;
}

function buildTabSx(theme: Theme, size: TabSize, tabStyle: TabStyle, reversed: boolean, equalWidth?: number) {
  if (tabStyle === 'segmented') {
    const h = SEGMENTED_HEIGHT[size];
    const inactiveColor = reversed ? theme.palette.common.white : theme.palette.primary.main;
    const activeColor   = reversed
      ? (theme.palette.mode === 'dark' ? theme.palette.primary.contrastText : theme.palette.primary.main)
      : theme.palette.primary.contrastText;
    const hoverBg       = reversed
      ? alpha(theme.palette.common.white, 0.12)
      : alpha(theme.palette.primary.main, 0.08);
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
      color: inactiveColor,
      whiteSpace: 'nowrap' as const,
      position: 'relative' as const,
      zIndex: 1,
      ...(equalWidth !== undefined && { width: equalWidth, minWidth: equalWidth }),
      '&.Mui-selected': {
        bgcolor: 'transparent',
        color: activeColor,
      },
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

  const { height, px } = SIZE_CONFIG[size];
  const shared = {
    borderRadius: `${theme.shape.button}px`,
    border: '1px solid',
    textTransform: 'none' as const,
    fontWeight: 700,
    fontSize: tabFontSize(theme, size),
    whiteSpace: 'nowrap' as const,
    px,
    py: 0,
    height,
    minHeight: height,
  };

  // For 'default' + reversed, and 'white' (which is already a reversed style) — same white-based treatment.
  const isReversed = reversed || tabStyle === 'white';

  if (!isReversed) {
    // default style on light backgrounds
    return {
      ...shared,
      border: 'none',
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
        '&:hover': {
          bgcolor: theme.palette.primary.dark,
        },
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

  // Reversed / white — sits on dark or brand-coloured backgrounds.
  return {
    ...shared,
    border: 'none',
    bgcolor: alpha(theme.palette.common.white, 0.15),
    color: theme.palette.common.white,
    '&:hover': {
      bgcolor: alpha(theme.palette.common.white, 0.25),
    },
    '&.Mui-selected': {
      bgcolor: theme.palette.common.white,
      color: theme.palette.mode === 'dark'
        ? theme.palette.primary.contrastText
        : theme.palette.primary.main,
      '&:hover': {
        bgcolor: alpha(theme.palette.common.white, 0.88),
      },
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

export function Tabs({
  label,
  tabs,
  size = 'medium',
  tabStyle = 'default',
  defaultTab = 0,
  fullWidth = false,
  reversed = false,
  onChange,
}: TabsProps) {
  const [active, setActive] = React.useState(defaultTab);
  const uid = React.useId();
  const tabsRef = React.useRef<HTMLDivElement>(null);
  const [equalTabWidth, setEqualTabWidth] = React.useState<number | undefined>(undefined);

  // Phase 1 — reset measurement whenever inputs that affect tab size change.
  React.useLayoutEffect(() => {
    if (tabStyle !== 'segmented' || fullWidth) {
      setEqualTabWidth(undefined);
      return;
    }
    setEqualTabWidth(undefined);
  }, [tabs, size, tabStyle, fullWidth]);

  // Phase 2 — measure natural tab widths and apply the widest to all tabs.
  // Runs synchronously after phase 1 (before paint), so no visible flash.
  React.useLayoutEffect(() => {
    if (tabStyle !== 'segmented' || fullWidth || equalTabWidth !== undefined) return;
    const el = tabsRef.current;
    if (!el) return;
    const buttons = Array.from(el.querySelectorAll<HTMLElement>('.MuiTab-root'));
    const max = Math.max(...buttons.map(b => b.offsetWidth));
    if (max > 0) setEqualTabWidth(max);
  }, [equalTabWidth, tabs, size, tabStyle, fullWidth]);

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setActive(newValue);
    onChange?.(newValue);
  };

  const isSegmented = tabStyle === 'segmented';

  return (
    <Box ref={tabsRef}>
      <Box
        {...(isSegmented && {
          sx: (theme: Theme) => ({
            display: fullWidth ? 'flex' : 'inline-flex',
            width: fullWidth ? '100%' : 'auto',
            bgcolor: reversed
              ? alpha(theme.palette.common.white, 0.15)
              : alpha(theme.palette.primary.main, 0.1),
            borderRadius: `${theme.shape.button}px`,
            padding: `${SEGMENTED_PADDING}px`,
          }),
        })}
      >
        <MuiTabs
          value={active}
          onChange={handleChange}
          aria-label={label}
          selectionFollowsFocus
          sx={isSegmented
            ? (theme) => ({
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
              })
            : (theme) => ({
                overflow: 'visible',
                '& .MuiTabs-scroller': { overflow: 'visible !important' },
                '& .MuiTabs-flexContainer': { gap: 0 },
                '& .MuiTabs-indicator': { display: 'none' },
                '& .MuiTab-root': { marginRight: '8px' },
                '& .MuiTab-root:last-of-type': { marginRight: 0 },
                minHeight: SIZE_CONFIG[size].height,
              })
          }
        >
          {tabs.map((tab, i) => (
            <MuiTab
              key={i}
              label={tab.label}
              disabled={tab.disabled}
              disableRipple
              id={`${uid}-tab-${i}`}
              aria-controls={`${uid}-tabpanel-${i}`}
              sx={(theme) => buildTabSx(theme, size, tabStyle, reversed, isSegmented ? equalTabWidth : undefined)}
            />
          ))}
        </MuiTabs>
      </Box>
      {tabs.map((tab, i) =>
        tab.content !== undefined ? (
          <Box
            key={i}
            role="tabpanel"
            hidden={active !== i}
            tabIndex={active === i ? 0 : -1}
            id={`${uid}-tabpanel-${i}`}
            aria-labelledby={`${uid}-tab-${i}`}
            sx={{ pt: 3 }}
          >
            {tab.content}
          </Box>
        ) : null,
      )}
    </Box>
  );
}

import MuiTabs from '@mui/material/Tabs';
import MuiTab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { alpha, type Theme } from '@mui/material/styles';
import React from 'react';

export type TabSize = 'small' | 'medium' | 'large';
export type TabStyle = 'default' | 'white';

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
  onChange?: (index: number) => void;
}

const SIZE_CONFIG = {
  small:  { py: 0.5, px: 1.5, spacing: 4 },
  medium: { py: 1,   px: 2,   spacing: 5 },
  large:  { py: 1,   px: 3,   spacing: 6 },
} satisfies Record<TabSize, { py: number; px: number; spacing: number }>;

// '0.75rem' is intentionally below the 'small' typography variant for compact tab labels.
function tabFontSize(theme: Theme, size: TabSize) {
  if (size === 'small') return '0.75rem';
  if (size === 'medium') return theme.typography.small.fontSize;
  return theme.typography.body.fontSize;
}

function buildTabSx(theme: Theme, size: TabSize, tabStyle: TabStyle) {
  const { py, px, spacing } = SIZE_CONFIG[size];
  const shared = {
    borderRadius: `${theme.shape.button}px`,
    border: '1px solid',
    textTransform: 'none' as const,
    fontWeight: 500,
    fontSize: tabFontSize(theme, size),
    py,
    px,
    minHeight: theme.spacing(spacing),
  };

  if (tabStyle === 'default') {
    return {
      ...shared,
      borderColor: 'border.subtle',
      bgcolor: 'action.selected',
      color: 'text.primary',
      '&:hover': {
        bgcolor: 'action.hover',
        borderColor: 'border.default',
      },
      '&.Mui-selected': {
        bgcolor: 'primary.main',
        color: 'primary.contrastText',
        borderColor: 'primary.main',
        '&:hover': {
          bgcolor: 'primary.dark',
          borderColor: 'primary.dark',
        },
      },
      '&.Mui-focusVisible': {
        outline: '2px solid',
        outlineColor: 'primary.main',
        outlineOffset: 2,
      },
      '&.Mui-disabled': {
        borderColor: 'action.disabledBackground',
        color: 'text.disabled',
        bgcolor: 'action.disabledBackground',
      },
    };
  }

  // 'white' tabStyle — sits on inverted (dark) backgrounds. Disabled/hover use alpha
  // on text.inverse to maintain contrast where action.disabled* tokens would fail.
  return {
    ...shared,
    borderColor: alpha(theme.palette.text.inverse, 0.5),
    bgcolor: alpha(theme.palette.text.inverse, 0.15),
    color: 'text.inverse',
    '&:hover': {
      bgcolor: alpha(theme.palette.text.inverse, 0.25),
    },
    '&.Mui-selected': {
      bgcolor: 'background.paper',
      color: 'primary.main',
      borderColor: 'background.paper',
      '&:hover': {
        bgcolor: 'background.elevated',
      },
    },
    '&.Mui-focusVisible': {
      outline: '2px solid',
      outlineColor: 'text.inverse',
      outlineOffset: 2,
    },
    '&.Mui-disabled': {
      borderColor: alpha(theme.palette.text.inverse, 0.3),
      color: alpha(theme.palette.text.inverse, 0.4),
      bgcolor: 'transparent',
    },
  };
}

export function Tabs({
  label,
  tabs,
  size = 'medium',
  tabStyle = 'default',
  defaultTab = 0,
  onChange,
}: TabsProps) {
  const [active, setActive] = React.useState(defaultTab);
  const uid = React.useId();

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setActive(newValue);
    onChange?.(newValue);
  };

  return (
    <Box>
      <Box>
        <MuiTabs
          value={active}
          onChange={handleChange}
          aria-label={label}
          selectionFollowsFocus
          sx={(theme) => ({
            overflow: 'visible',
            '& .MuiTabs-scroller': { overflow: 'visible !important' },
            '& .MuiTabs-flexContainer': { gap: 0 },
            '& .MuiTabs-indicator': { display: 'none' },
            '& .MuiTab-root': { marginRight: 0.5 },
            '& .MuiTab-root:last-of-type': { marginRight: 0 },
            minHeight: theme.spacing(SIZE_CONFIG[size].spacing),
          })}
        >
          {tabs.map((tab, i) => (
            <MuiTab
              key={i}
              label={tab.label}
              disabled={tab.disabled}
              id={`${uid}-tab-${i}`}
              aria-controls={`${uid}-tabpanel-${i}`}
              sx={(theme) => buildTabSx(theme, size, tabStyle)}
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

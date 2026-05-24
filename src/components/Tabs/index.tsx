import MuiTabs from '@mui/material/Tabs';
import MuiTab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import type { Theme } from '@mui/material/styles';
import React from 'react';
import {
  buildMuiTabsSx,
  buildTabSx,
  buildSegmentedContainerSx,
  SEGMENTED_HEIGHT,
  type TabSize,
  type TabStyle,
} from './tabStyles';

export type { TabSize, TabStyle } from './tabStyles';

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

  // Reset measurement whenever inputs that affect tab size change.
  React.useLayoutEffect(() => {
    setEqualTabWidth(undefined);
  }, [tabs, size, tabStyle, fullWidth]);

  // Measure natural tab widths and apply the widest to all tabs.
  // Runs synchronously before paint, so no visible flash.
  React.useLayoutEffect(() => {
    if (tabStyle !== 'segmented' || fullWidth || equalTabWidth !== undefined) return;
    const el = tabsRef.current;
    if (!el) return;
    const buttons = Array.from(el.querySelectorAll<HTMLElement>('.MuiTab-root'));
    const max = Math.max(...buttons.map((b) => b.offsetWidth));
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
          sx: (theme: Theme) => buildSegmentedContainerSx(theme, fullWidth, reversed),
        })}
      >
        <MuiTabs
          value={active}
          onChange={handleChange}
          aria-label={label}
          selectionFollowsFocus
          sx={(theme) => buildMuiTabsSx(theme, isSegmented, size, fullWidth, reversed)}
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

// Re-export for stories that import the constant directly.
export { SEGMENTED_HEIGHT };

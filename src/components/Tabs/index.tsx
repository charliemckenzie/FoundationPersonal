import MuiTabs from '@mui/material/Tabs';
import MuiTab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { alpha } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import React from 'react';

export type TabVariant = 'pill' | 'nav';
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
  variant?: TabVariant;
  size?: TabSize;
  tabStyle?: TabStyle;
  defaultTab?: number;
  onChange?: (index: number) => void;
}

const SIZE_CONFIG = {
  small:  { fontSize: '0.75rem',  py: 0.5,  px: 1.5, minHeight: 32 },
  medium: { fontSize: '0.875rem', py: 1,    px: 2,   minHeight: 40 },
  large:  { fontSize: '1rem',     py: 1,    px: 3,   minHeight: 48 },
} satisfies Record<TabSize, { fontSize: string; py: number; px: number; minHeight: number }>;

export function Tabs({
  label,
  tabs,
  variant = 'pill',
  size = 'medium',
  tabStyle = 'default',
  defaultTab = 0,
  onChange,
}: TabsProps) {
  const [active, setActive] = React.useState(defaultTab);
  const uid = React.useId();
  const theme = useTheme();
  const { fontSize, py, px, minHeight } = SIZE_CONFIG[size];
  const radius = `${theme.shape.button}px`;

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setActive(newValue);
    onChange?.(newValue);
  };

  const pillTabSx =
    tabStyle === 'default'
      ? {
          borderRadius: radius,
          border: '1px solid',
          borderColor: 'border.subtle',
          bgcolor: 'action.selected',
          textTransform: 'none' as const,
          fontWeight: 500,
          fontSize,
          py,
          px,
          minHeight,
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
        }
      : {
          borderRadius: radius,
          border: '1px solid',
          borderColor: alpha(theme.palette.text.inverse, 0.5),
          bgcolor: alpha(theme.palette.text.inverse, 0.15),
          textTransform: 'none' as const,
          fontWeight: 500,
          fontSize,
          py,
          px,
          minHeight,
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

  const navTabSx = {
    textTransform: 'none' as const,
    fontWeight: 500,
    fontSize,
    py,
    px,
    minHeight,
    color: 'text.primary',
    '&:hover': {
      color: 'primary.main',
      bgcolor: 'action.hover',
    },
    '&.Mui-selected': {
      color: 'primary.main',
      fontWeight: 700,
    },
    '&.Mui-focusVisible': {
      outline: '2px solid',
      outlineColor: 'primary.main',
      outlineOffset: 2,
    },
  };

  const tabSx = variant === 'pill' ? pillTabSx : navTabSx;

  return (
    <Box>
      <Box sx={variant === 'nav' ? { borderBottom: 1, borderColor: 'divider' } : undefined}>
        <MuiTabs
          value={active}
          onChange={handleChange}
          aria-label={label}
          sx={
            variant === 'pill'
              ? {
                  '& .MuiTabs-flexContainer': { gap: 1 },
                  '& .MuiTabs-indicator': { display: 'none' },
                  minHeight,
                }
              : { minHeight }
          }
        >
          {tabs.map((tab, i) => (
            <MuiTab
              key={i}
              label={tab.label}
              disabled={tab.disabled}
              id={`${uid}-tab-${i}`}
              aria-controls={`${uid}-tabpanel-${i}`}
              sx={tabSx}
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

'use client';

import MuiTabs from '@mui/material/Tabs';
import MuiTab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { alpha } from '@mui/material/styles';
import { Icon } from '../../Icon';
import { DEFAULT_MEMBER_ONLINE_COPY } from '../types';
import type { ThemeMode } from '../../../app/themes/ThemeModeContext';

export interface ThemeSwitcherProps {
  mode: ThemeMode;
  onChange: (mode: ThemeMode) => void;
  size?: 'small' | 'medium';
  fullWidth?: boolean;
  lightLabel?: string;
  darkLabel?: string;
}

const SEGMENTED_HEIGHT: Record<'small' | 'medium', number> = { small: 32, medium: 44 };
const SEGMENTED_PADDING = 4;
const SLIDE_TRANSITION =
  'left 450ms cubic-bezier(0.25, 1, 0.5, 1), width 450ms cubic-bezier(0.25, 1, 0.5, 1)';



export function ThemeSwitcher({
  mode,
  onChange,
  size = 'small',
  fullWidth = false,
  lightLabel = DEFAULT_MEMBER_ONLINE_COPY.lightLabel,
  darkLabel = DEFAULT_MEMBER_ONLINE_COPY.darkLabel,
}: ThemeSwitcherProps) {
  const h = SEGMENTED_HEIGHT[size];
  const activeIndex = mode === 'dark' ? 1 : 0;

  return (
    <Box
      sx={(t) => ({
        display: fullWidth ? 'flex' : 'inline-flex',
        width: fullWidth ? '100%' : undefined,
        bgcolor: alpha(t.palette.primary.main, 0.1),
        borderRadius: `${t.shape.button}px`,
        padding: `${SEGMENTED_PADDING}px`,
      })}
    >
      <MuiTabs
        value={activeIndex}
        onChange={(_, next: number) => onChange(next === 0 ? 'light' : 'dark')}
        aria-label="Colour mode"
        selectionFollowsFocus
        {...(fullWidth && { variant: 'fullWidth' })}
        sx={(t) => ({
          minHeight: h,
          flex: fullWidth ? 1 : undefined,
          '& .MuiTabs-scroller': { overflow: 'visible !important' },
          '& .MuiTabs-flexContainer': { gap: 0 },
          '& .MuiTabs-indicator': {
            top: 0,
            bottom: 0,
            height: '100%',
            borderRadius: `${t.shape.button}px`,
            bgcolor: 'primary.main',
            zIndex: 0,
            transition: SLIDE_TRANSITION,
            '@media (prefers-reduced-motion: reduce)': { transition: 'none' },
          },
          '& .MuiTab-root': {
            minWidth: fullWidth ? 0 : h,
            width: fullWidth ? undefined : h,
            flex: fullWidth ? 1 : undefined,
            height: h,
            minHeight: h,
            padding: fullWidth ? '0 1rem' : 0,
            gap: '0.375rem',
            borderRadius: `${t.shape.button}px`,
            border: 'none',
            bgcolor: 'transparent',
            color: 'primary.main',
            position: 'relative',
            zIndex: 1,
            fontSize: t.typography.body.fontSize,
            lineHeight: 1.5,
            fontWeight: 700,
            textTransform: 'none',
            letterSpacing: 0,
            '&.Mui-selected': { color: 'primary.contrastText' },
            '&:hover': { bgcolor: alpha(t.palette.primary.main, 0.08) },
            '&.Mui-selected:hover': { bgcolor: 'transparent' },
            '&.Mui-focusVisible': {
              outline: `2px solid ${t.palette.border.focus}`,
              outlineOffset: 2,
              zIndex: 2,
            },
          },
        })}
      >
        <MuiTab
          icon={<Icon icon="sun-bright" size="md" />}
          iconPosition="start"
          label={fullWidth ? lightLabel : undefined}
          aria-label={fullWidth ? undefined : lightLabel}
          disableRipple
        />
        <MuiTab
          icon={<Icon icon="moon" size="md" />}
          iconPosition="start"
          label={fullWidth ? darkLabel : undefined}
          aria-label={fullWidth ? undefined : darkLabel}
          disableRipple
        />
      </MuiTabs>
    </Box>
  );
}

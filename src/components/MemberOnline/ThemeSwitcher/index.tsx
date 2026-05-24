'use client';

import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Box from '@mui/material/Box';
import { DEFAULT_MEMBER_ONLINE_COPY } from '../types';
import type { ThemeMode } from '../../../app/themes/ThemeModeContext';

export interface ThemeSwitcherProps {
  mode: ThemeMode;
  onChange: (mode: ThemeMode) => void;
  size?: 'small' | 'medium';
  /** Hide labels and render icons only — useful for compact headers. */
  iconOnly?: boolean;
  lightLabel?: string;
  darkLabel?: string;
}

function SunIcon() {
  return (
    <Box
      component="svg"
      viewBox="0 0 24 24"
      aria-hidden="true"
      sx={{ width: '1.125rem', height: '1.125rem', color: 'inherit' }}
    >
      <circle cx="12" cy="12" r="4" fill="currentColor" />
      <g stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
        <line x1="12" y1="2.5" x2="12" y2="5" />
        <line x1="12" y1="19" x2="12" y2="21.5" />
        <line x1="2.5" y1="12" x2="5" y2="12" />
        <line x1="19" y1="12" x2="21.5" y2="12" />
        <line x1="5.2" y1="5.2" x2="6.9" y2="6.9" />
        <line x1="17.1" y1="17.1" x2="18.8" y2="18.8" />
        <line x1="5.2" y1="18.8" x2="6.9" y2="17.1" />
        <line x1="17.1" y1="6.9" x2="18.8" y2="5.2" />
      </g>
    </Box>
  );
}

function MoonIcon() {
  return (
    <Box
      component="svg"
      viewBox="0 0 24 24"
      aria-hidden="true"
      sx={{ width: '1.125rem', height: '1.125rem', color: 'inherit' }}
    >
      <path
        d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"
        fill="currentColor"
      />
    </Box>
  );
}

export function ThemeSwitcher({
  mode,
  onChange,
  size = 'small',
  iconOnly = false,
  lightLabel = DEFAULT_MEMBER_ONLINE_COPY.lightLabel,
  darkLabel = DEFAULT_MEMBER_ONLINE_COPY.darkLabel,
}: ThemeSwitcherProps) {
  return (
    <ToggleButtonGroup
      value={mode}
      exclusive
      size={size}
      onChange={(_, next) => {
        if (next === 'light' || next === 'dark') onChange(next);
      }}
      aria-label="Colour mode"
      sx={{ '& .MuiToggleButton-root': { px: iconOnly ? 1 : 1.5, gap: 0.75 } }}
    >
      <ToggleButton value="light" aria-label={lightLabel}>
        <SunIcon />
        {!iconOnly && lightLabel}
      </ToggleButton>
      <ToggleButton value="dark" aria-label={darkLabel}>
        <MoonIcon />
        {!iconOnly && darkLabel}
      </ToggleButton>
    </ToggleButtonGroup>
  );
}

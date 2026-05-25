'use client';

import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import { useThemeMode } from '../themes/ThemeModeContext';

export function ModeToggle() {
  const { mode, toggleMode } = useThemeMode();

  return (
    <Box
      sx={{
        position:   'fixed',
        top:        16,
        right:      16,
        display:    'flex',
        alignItems: 'center',
        gap:        0.75,
        px:         1.5,
        py:         0.75,
        borderRadius: 2,
        bgcolor:    'background.paper',
        border:     '1px solid',
        borderColor: 'divider',
        boxShadow:  2,
        zIndex:     'tooltip',
      }}
    >
      <Typography variant="caption" sx={{ color: 'text.muted', userSelect: 'none' }}>
        {mode === 'light' ? 'Light' : 'Dark'}
      </Typography>
      <Switch
        checked={mode === 'dark'}
        onChange={toggleMode}
        size="small"
        slotProps={{ input: { 'aria-label': 'Toggle dark mode' } }}
      />
    </Box>
  );
}

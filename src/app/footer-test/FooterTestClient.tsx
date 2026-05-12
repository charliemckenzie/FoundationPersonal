'use client';

import { useState, useMemo } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { createBrandTheme } from '../themes/factory';
import { foundation } from '../themes/brands/foundation';
import { Footer } from '../../components/Footer';

export function FooterTestClient() {
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  const theme = useMemo(() => createBrandTheme(foundation, mode), [mode]);

  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', bgcolor: 'background.default' }}>
          {/* Header bar with toggle */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              px: 4,
              py: 2,
              borderBottom: '1px solid',
              borderColor: 'border.subtle',
              bgcolor: 'background.paper',
            }}
          >
            <Typography variant="body" component="p" sx={{ color: 'text.heading', fontWeight: 700 }}>
              Footer test page
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography component="span" sx={{ color: 'text.muted', fontSize: '0.875rem' }}>
                {mode === 'light' ? 'Light' : 'Dark'}
              </Typography>
              <Box
                component="button"
                onClick={() => setMode((m) => (m === 'light' ? 'dark' : 'light'))}
                aria-label={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`}
                sx={{
                  background: 'none',
                  border: '1px solid',
                  borderColor: 'border.default',
                  borderRadius: '0.5rem',
                  cursor: 'pointer',
                  px: 1.5,
                  py: 0.5,
                  color: 'text.primary',
                  fontSize: '0.875rem',
                  lineHeight: 1.5,
                }}
              >
                {mode === 'light' ? 'Dark mode' : 'Light mode'}
              </Box>
            </Box>
          </Box>

          {/* Page body spacer */}
          <Box sx={{ flex: 1, p: 4 }}>
            <Typography variant="body" component="p" sx={{ color: 'text.muted' }}>
              Resize below 960px to see the accordion layout.
            </Typography>
          </Box>

          <Footer />
        </Box>
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}

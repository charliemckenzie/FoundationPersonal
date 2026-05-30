'use client';

import type React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { PageTransition } from '../../../components/PageTransition';
import { PAGE_TRANSITION_EXCLUDE } from '../../pageTransition.config';

export default function AdviserOnlineLayout({ children }: { children: React.ReactNode }) {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Box
        component="header"
        sx={{
          px: 4,
          py: 2,
          borderBottom: '1px solid',
          borderColor: 'border.subtle',
          bgcolor: 'background.paper',
        }}
      >
        <Typography variant="small" color="text.muted">
          Adviser Online — layout placeholder
        </Typography>
      </Box>
      <Box component="main">
        <PageTransition excludePaths={PAGE_TRANSITION_EXCLUDE}>
          {children}
        </PageTransition>
      </Box>
    </Box>
  );
}

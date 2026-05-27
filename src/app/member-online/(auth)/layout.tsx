import type React from 'react';
import Box from '@mui/material/Box';

export default function MemberAuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
      }}
    >
      {children}
    </Box>
  );
}

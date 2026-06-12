'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

interface PaymentWorkedExampleProps {
  children: React.ReactNode;
}

/**
 * Tinted explanatory panel that turns the chosen payment method into a concrete,
 * member-specific example — the single biggest comprehension aid for this step.
 */
export function PaymentWorkedExample({ children }: PaymentWorkedExampleProps) {
  return (
    <Box
      sx={{
        bgcolor: 'info.background',
        border: '1px solid',
        borderColor: 'info.border',
        borderRadius: (t) => `${t.shape.sm}px`,
        px: 2.5,
        py: 2,
      }}
    >
      <Stack spacing={0.75}>
        <Typography variant="body" sx={{ fontWeight: 700 }}>
          How this works for you
        </Typography>
        {children}
      </Stack>
    </Box>
  );
}

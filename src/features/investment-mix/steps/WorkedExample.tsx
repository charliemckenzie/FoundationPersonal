'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

interface WorkedExampleProps {
  children: React.ReactNode;
  /** Panel heading. Defaults to a generic, reassuring framing. */
  title?: string;
}

/**
 * Tinted explanatory panel that turns an abstract choice into a concrete,
 * member-specific example — the single biggest comprehension aid in this journey.
 */
export function WorkedExample({ children, title = 'How this works for you' }: WorkedExampleProps) {
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
          {title}
        </Typography>
        {children}
      </Stack>
    </Box>
  );
}

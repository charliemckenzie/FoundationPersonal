'use client';

import { useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ContentContainer } from '../../../components/MemberOnline';
import type { ContentContainerSize } from '../../../components/MemberOnline';
import { Select } from '../../../components/Select';

const SIZE_OPTIONS = [
  { value: 'xs',  label: 'xs — 512px' },
  { value: 'sm',  label: 'sm — 648px' },
  { value: 'md',  label: 'md — 768px' },
  { value: 'lg',  label: 'lg — 960px' },
  { value: 'xl',  label: 'xl — 1200px' },
  { value: '2xl', label: '2xl — 1440px' },
];

export default function MemberOnlinePage() {
  const [containerSize, setContainerSize] = useState<ContentContainerSize>('lg');

  return (
    <ContentContainer size={containerSize}>
      <Stack spacing={3}>
        <Box sx={{ maxWidth: '12rem' }}>
          <Select
            label="Container size"
            options={SIZE_OPTIONS}
            value={containerSize}
            onChange={(v) => setContainerSize(v as ContentContainerSize)}
          />
        </Box>
        <Box
          sx={{
            bgcolor: 'action.hover',
            borderRadius: 2,
            height: '24rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant="body" color="text.secondary">
            Content area — {containerSize}
          </Typography>
        </Box>
      </Stack>
    </ContentContainer>
  );
}

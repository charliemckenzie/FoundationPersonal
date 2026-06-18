'use client';

import { useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ContentContainer, MOBreadcrumb } from '../../../components/MemberOnline';
import type { ContentContainerSize } from '../../../components/MemberOnline';
import { Select } from '../../../components/Select';
import { Switch } from '../../../components/Switch';
import { useNavConfig } from './NavConfigContext';
import { NAV_CONFIG_OPTIONS } from './navConfigs';
import type { NavConfigKey } from './navConfigs';

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
  const [showBreadcrumb, setShowBreadcrumb] = useState(true);
  const { navConfig, setNavConfig } = useNavConfig();

  return (
    <>
      {showBreadcrumb && (
        <Box sx={{ px: 3, pt: 2 }}>
          <MOBreadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Dashboard' },
            ]}
          />
        </Box>
      )}
      <ContentContainer size={containerSize}>
      <Typography variant="h1" sx={{ mb: 1.5 }}>Dashboard</Typography>
      <Box
        sx={{
          bgcolor: 'action.hover',
          borderRadius: 2,
          height: '24rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Stack spacing={2} sx={{ alignItems: 'center' }}>
          <Box sx={{ width: '12rem' }}>
            <Select
              label="Navigation config"
              options={NAV_CONFIG_OPTIONS}
              value={navConfig}
              onChange={(v) => setNavConfig(v as NavConfigKey)}
            />
          </Box>
          <Box sx={{ width: '12rem' }}>
            <Select
              label="Container size"
              options={SIZE_OPTIONS}
              value={containerSize}
              onChange={(v) => setContainerSize(v as ContentContainerSize)}
            />
          </Box>
          <Typography variant="body" sx={{ color: 'text.muted' }}>
            Content area — {containerSize}
          </Typography>
          <Switch
            label="Show breadcrumb"
            checked={showBreadcrumb}
            onChange={setShowBreadcrumb}
          />
        </Stack>
      </Box>
    </ContentContainer>
    </>
  );
}

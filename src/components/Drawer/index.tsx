import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { IconButton } from '../IconButton';
import type React from 'react';

export type DrawerAnchor = 'left' | 'right' | 'top' | 'bottom';

export interface DrawerProps {
  open: boolean;
  onClose: () => void;
  anchor?: DrawerAnchor;
  title?: string;
  children: React.ReactNode;
  width?: number;
  actions?: React.ReactNode;
}

const DEFAULT_WIDTH = 320;

export function Drawer({
  open,
  onClose,
  anchor = 'right',
  title,
  children,
  width = DEFAULT_WIDTH,
  actions,
}: DrawerProps) {
  const isVertical = anchor === 'top' || anchor === 'bottom';

  return (
    <MuiDrawer
      open={open}
      onClose={onClose}
      anchor={anchor}
      slotProps={{
        paper: {
          'aria-labelledby': title ? 'drawer-title' : undefined,
          sx: isVertical ? undefined : { width },
        },
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        {title && (
          <>
            <Box
              sx={{
                px: 3,
                py: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Typography
                id="drawer-title"
                variant="h6"
                sx={{ color: 'text.heading' }}
              >
                {title}
              </Typography>
              <IconButton
                icon="xmark"
                label="Close drawer"
                variant="ghost"
                color="primary"
                size="small"
                showTooltip={false}
                onClick={onClose}
              />
            </Box>
            <Divider />
          </>
        )}
        <Box sx={{ flex: 1, overflow: 'auto', p: 3 }}>
          {children}
        </Box>
        {actions && (
          <>
            <Divider />
            <Box sx={{ px: 3, py: 2 }}>
              {actions}
            </Box>
          </>
        )}
      </Box>
    </MuiDrawer>
  );
}

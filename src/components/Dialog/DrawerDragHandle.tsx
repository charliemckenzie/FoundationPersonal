import Box from '@mui/material/Box';
import type React from 'react';

interface DrawerDragHandleProps {
  onTouchStart: React.TouchEventHandler;
  onTouchMove: React.TouchEventHandler;
  onTouchEnd: React.TouchEventHandler;
}

export function DrawerDragHandle({ onTouchStart, onTouchMove, onTouchEnd }: DrawerDragHandleProps) {
  return (
    <Box
      aria-hidden="true"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      sx={(t) => ({
        width: t.spacing(5),
        height: t.spacing(0.5),
        borderRadius: `${t.shape['xs']}px`,
        backgroundColor: 'divider',
        mx: 'auto',
        mt: 1.5,
        mb: 0,
        touchAction: 'none',
        cursor: 'grab',
        // Expand touch target without affecting visual size
        '&::before': {
          content: '""',
          position: 'absolute',
          top: -12,
          bottom: -12,
          left: -40,
          right: -40,
        },
        position: 'relative',
      })}
    />
  );
}

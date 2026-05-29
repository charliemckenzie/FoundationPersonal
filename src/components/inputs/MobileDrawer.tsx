'use client';

import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import { useDrawerDrag } from '../Dialog/useDrawerDrag';
import type React from 'react';

export interface MobileDrawerProps {
  /** Whether the drawer is visible. */
  open: boolean;
  /** Called when the drawer should close (swipe-down threshold or backdrop tap). */
  onClose: () => void;
  /** Content rendered below the drag handle. */
  children: React.ReactNode;
}

/**
 * Bottom-sheet style drawer for mobile with drag-to-dismiss and a rounded top.
 * Replaces the duplicated Drawer + drag-handle pattern in Select, Menu, and Dialog.
 */
export function MobileDrawer({ open, onClose, children }: MobileDrawerProps) {
  const { dragY, isDragging, handleDragStart, handleDragMove, handleDragEnd } = useDrawerDrag(open, onClose);

  return (
    <Drawer
      anchor="bottom"
      open={open}
      onClose={onClose}
      slotProps={{
        paper: {
          sx: (t) => ({
            borderRadius: `${t.shape.xl}px ${t.shape.xl}px 0 0`,
            maxHeight: '80vh',
            ...(dragY > 0 && {
              transform: `translateY(${dragY}px)`,
              transition: isDragging ? 'none' : 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              willChange: 'transform',
            }),
          }),
        },
      }}
    >
      <DragHandle
        onTouchStart={handleDragStart}
        onTouchMove={handleDragMove}
        onTouchEnd={handleDragEnd}
      />
      {children}
    </Drawer>
  );
}

interface DragHandleProps {
  onTouchStart: (e: React.TouchEvent) => void;
  onTouchMove: (e: React.TouchEvent) => void;
  onTouchEnd: () => void;
}

function DragHandle({ onTouchStart, onTouchMove, onTouchEnd }: DragHandleProps) {
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
        position: 'relative',
        touchAction: 'none',
        cursor: 'grab',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: -12,
          bottom: -12,
          left: -40,
          right: -40,
        },
      })}
    />
  );
}

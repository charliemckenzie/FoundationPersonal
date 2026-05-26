'use client';

import { useEffect, useRef } from 'react';
import Popper from '@mui/material/Popper';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Typography from '@mui/material/Typography';
import { Icon } from '../../Icon';
import type { MemberNavItem } from '../types';

export interface NavFlyoutProps {
  /** Whether the panel is visible. */
  open: boolean;
  /** Element next to which the panel anchors (typically the clicked parent NavItem). */
  anchorEl: HTMLElement | null;
  /** Sub-items shown inside the panel. */
  items: MemberNavItem[];
  /** Accessible name for the menu (used as `aria-label` on the panel). Not rendered visually. */
  title?: string;
  onClose: () => void;
  /** Fired when a leaf item is selected. Panel closes automatically afterwards. */
  onItemSelect?: (item: MemberNavItem) => void;
  /** Optional id used for `aria-controls` on the triggering NavItem. */
  id?: string;
}

export function NavFlyout({
  open,
  anchorEl,
  items,
  title,
  onClose,
  onItemSelect,
  id,
}: NavFlyoutProps) {
  const firstItemRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(() => firstItemRef.current?.focus(), 0);
    return () => window.clearTimeout(t);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  return (
    <Popper
      open={open}
      anchorEl={anchorEl}
      placement="right-start"
      transition
      modifiers={[{ name: 'offset', options: { offset: [0, 12] } }]}
      sx={{ zIndex: (t) => t.zIndex.modal }}
    >
      {({ TransitionProps }) => (
        <Grow
          {...TransitionProps}
          timeout={{ enter: 200, exit: 160 }}
          style={{ transformOrigin: 'left top' }}
        >
          <Box>
            <ClickAwayListener onClickAway={onClose}>
              <Paper
                id={id}
                role="menu"
                aria-label={title}
                elevation={16}
                sx={(t) => ({
                  width: '362px',
                  minWidth: '128px',
                  p: 1.5,
                  borderRadius: '12px',
                  border: `1px solid ${t.palette.border.subtle}`,
                  backgroundColor: t.palette.background.paper,
                  backgroundImage: 'none',
                })}
              >
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  {items.map((item, index) => (
                    <Box
                      key={item.id}
                      ref={index === 0 ? firstItemRef : undefined}
                      component="button"
                      role="menuitem"
                      type="button"
                      onClick={() => {
                        item.onClick?.();
                        onItemSelect?.(item);
                        onClose();
                      }}
                      sx={(t) => ({
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 1.5,
                        width: '100%',
                        px: 1.5,
                        py: 1.25,
                        textAlign: 'left',
                        cursor: 'pointer',
                        border: 0,
                        background: 'transparent',
                        color: t.palette.text.primary,
                        borderRadius: `${t.shape.sm}px`,
                        font: 'inherit',
                        '&:hover': { backgroundColor: t.palette.action.hover },
                        '&:focus-visible': {
                          outline: `2px solid ${t.palette.border.focus}`,
                          outlineOffset: '-2px',
                          backgroundColor: 'transparent',
                        },
                      })}
                    >
                      {item.icon !== undefined && (
                        <Box
                          sx={{
                            display: 'inline-flex',
                            color: 'inherit',
                            mt: '0.125rem',
                          }}
                        >
                          <Icon icon={item.icon} style="light" size="lg" color="inherit" />
                        </Box>
                      )}
                      <Box sx={{ flex: 1 }}>
                        <Typography
                          variant="small"
                          sx={{ color: 'inherit', fontWeight: 500, fontSize: '1rem', lineHeight: 1.5, m: 0 }}
                        >
                          {item.label}
                        </Typography>
                        {item.description !== undefined && (
                          <Typography
                            variant="small"
                            sx={{ color: 'text.muted', fontSize: '0.875rem', lineHeight: 20 / 14, m: 0, mt: 0.25 }}
                          >
                            {item.description}
                          </Typography>
                        )}
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Paper>
            </ClickAwayListener>
          </Box>
        </Grow>
      )}
    </Popper>
  );
}

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
  const menuRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(() => firstItemRef.current?.focus(), 0);
    return () => window.clearTimeout(t);
  }, [open]);

  // Menu keyboard model (ARIA APG): Escape returns focus to the trigger;
  // Tab/Shift+Tab close the menu and move focus in the sidebar;
  // Arrow/Home/End roving moves focus between the menu items.
  function handleMenuKeyDown(e: React.KeyboardEvent<HTMLElement>) {
    if (e.key === 'Escape') {
      e.preventDefault();
      anchorEl?.focus();
      onClose();
      return;
    }
    if (e.key === 'Tab') {
      e.preventDefault();
      onClose();
      if (e.shiftKey) {
        anchorEl?.focus();
      } else {
        // Move to the next focusable element in the sidebar after the trigger.
        // The Popper is portalled outside `aside`, so this query is safe.
        const sidebar = anchorEl?.closest('aside') ?? document.body;
        const focusable = Array.from(
          sidebar.querySelectorAll<HTMLElement>(
            'a[href]:not([disabled]), button:not([disabled]), [tabindex]:not([tabindex="-1"])',
          ),
        );
        const triggerIdx = focusable.indexOf(anchorEl as HTMLElement);
        (focusable[triggerIdx + 1] ?? anchorEl)?.focus();
      }
      return;
    }
    if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(e.key)) return;
    const menuItems = Array.from(
      menuRef.current?.querySelectorAll<HTMLElement>('[role="menuitem"]') ?? [],
    );
    if (menuItems.length === 0) return;
    e.preventDefault();
    const currentIndex = menuItems.indexOf(document.activeElement as HTMLElement);
    const lastIndex = menuItems.length - 1;
    let nextIndex: number;
    switch (e.key) {
      case 'ArrowDown': nextIndex = currentIndex < lastIndex ? currentIndex + 1 : 0; break;
      case 'ArrowUp': nextIndex = currentIndex > 0 ? currentIndex - 1 : lastIndex; break;
      case 'Home': nextIndex = 0; break;
      case 'End': nextIndex = lastIndex; break;
      default: return;
    }
    menuItems[nextIndex]?.focus();
  }

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
                elevation={16}
                sx={(t) => ({
                  width: '362px',
                  minWidth: '128px',
                  p: 1.5,
                  borderRadius: '12px',
                  border: `1px solid ${t.palette.border.subtle}`,
                  backgroundColor: 'background.paper',
                  backgroundImage: 'none',
                })}
              >
                <Box
                  ref={menuRef}
                  component="ul"
                  role="menu"
                  aria-label={title}
                  onKeyDown={handleMenuKeyDown}
                  sx={{ display: 'flex', flexDirection: 'column', listStyle: 'none', m: 0, p: 0 }}
                >
                  {items.map((item, index) => (
                    <Box component="li" key={item.id} role="none">
                      <Box
                        ref={index === 0 ? firstItemRef : undefined}
                        component="button"
                        role="menuitem"
                        type="button"
                        tabIndex={-1}
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
                          color: 'text.primary',
                          borderRadius: `${t.shape.sm}px`,
                          font: 'inherit',
                          '&:hover': { backgroundColor: 'action.hover' },
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
                            sx={{ color: 'inherit', typography: 'body', fontWeight: 500, m: 0 }}
                          >
                            {item.label}
                          </Typography>
                          {item.description !== undefined && (
                            <Typography
                              variant="small"
                              sx={{ color: 'text.muted', lineHeight: 20 / 14, m: 0, mt: 0.25 }}
                            >
                              {item.description}
                            </Typography>
                          )}
                        </Box>
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

import { useState, useId, cloneElement, Fragment } from 'react';
import MuiMenu from '@mui/material/Menu';
import MuiMenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import type { Theme } from '@mui/material/styles';
import type React from 'react';
import { useDrawerDrag } from '../Dialog/useDrawerDrag';

export interface MenuItemConfig {
  /** Display label for the item. */
  label: string;
  /** Called when the item is clicked. Menu closes automatically. */
  onClick?: () => void;
  /** Prevents interaction and dims the item. */
  disabled?: boolean;
  /** Optional leading icon node (e.g. `<Icon icon="user" size="md" />`). */
  icon?: React.ReactNode;
  /** Renders a divider below this item (not shown after the last item). */
  dividerAfter?: boolean;
  /** `'error'` renders the label and icon in the error palette — use for destructive actions. */
  color?: 'default' | 'error';
}

export interface MenuProps {
  /**
   * The element that opens the menu on click.
   * Its `onClick`, `aria-haspopup`, `aria-expanded`, and `aria-controls` props
   * are injected automatically — do not set them on the trigger.
   */
  trigger: React.ReactElement;
  /** Ordered list of menu items. */
  items: MenuItemConfig[];
  /** Optional id for the `<ul role="menu">` element. Defaults to a generated id. */
  id?: string;
  /** Called whenever the menu opens or closes. Useful for syncing external state (e.g. a rotating chevron). */
  onOpenChange?: (open: boolean) => void;
}

function itemSx(t: Theme, color: MenuItemConfig['color'] = 'default') {
  return {
    fontSize: '1rem',
    mx: '4px',
    borderRadius: `${t.shape.xs}px`,
    width: 'calc(100% - 8px)',
    color: color === 'error' ? t.palette.error.main : t.palette.text.primary,
    '& .MuiListItemIcon-root': {
      minWidth: '2rem',
      color: color === 'error' ? t.palette.error.main : t.palette.text.muted,
    },
  };
}

export function Menu({ trigger, items, id, onOpenChange }: MenuProps) {
  const generatedId = useId();
  const menuId = id ?? generatedId;
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [drawerOpen, setDrawerOpen] = useState(false);
  const { dragY, isDragging, handleDragStart, handleDragMove, handleDragEnd } = useDrawerDrag(
    drawerOpen,
    () => setDrawerOpen(false),
  );

  function handleOpen(event: React.MouseEvent<HTMLElement>) {
    if (isMobile) {
      setDrawerOpen(true);
    } else {
      setAnchorEl(event.currentTarget);
    }
    onOpenChange?.(true);
  }

  function handleClose() {
    setAnchorEl(null);
    onOpenChange?.(false);
  }

  function handleDrawerClose() {
    setDrawerOpen(false);
    onOpenChange?.(false);
  }

  const isAnyOpen = open || drawerOpen;

  const triggerWithProps = cloneElement(trigger, {
    onClick: handleOpen,
    'aria-haspopup': 'true',
    'aria-expanded': isAnyOpen || undefined,
    'aria-controls': open ? menuId : undefined,
  });

  return (
    <>
      {triggerWithProps}
      <MuiMenu
        id={menuId}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          list: { sx: { py: '4px' } },
          paper: {
            sx: (t) => ({
              minWidth: '16rem',
              borderRadius: `${t.shape.sm}px`,
              border: `1px solid ${t.palette.border.subtle}`,
            }),
          },
        }}
      >
        {items.flatMap((item, index) => {
          const key = `${item.label}-${index}`;
          const menuItem = (
            <MuiMenuItem
              key={key}
              disabled={item.disabled}
              disableRipple
              onClick={() => { item.onClick?.(); handleClose(); }}
              sx={(t) => itemSx(t, item.color)}
            >
              {item.icon !== undefined && <ListItemIcon>{item.icon}</ListItemIcon>}
              <ListItemText
                primary={item.label}
                slotProps={{ primary: { sx: { fontSize: '1rem' } } }}
              />
            </MuiMenuItem>
          );
          if (item.dividerAfter === true && index < items.length - 1) {
            return [menuItem, <Divider key={`${key}-divider`} sx={{ my: '4px' }} />];
          }
          return [menuItem];
        })}
      </MuiMenu>

      <Drawer
        anchor="bottom"
        open={drawerOpen}
        onClose={handleDrawerClose}
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
        <Box
          aria-hidden="true"
          onTouchStart={handleDragStart}
          onTouchMove={handleDragMove}
          onTouchEnd={handleDragEnd}
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
        <List sx={{ pt: 1, pb: 2, px: 1, overflowY: 'auto' }}>
          {items.map((item, index) => {
            const key = `${item.label}-${index}`;
            const isLast = index === items.length - 1;
            return (
              <Fragment key={key}>
                <ListItemButton
                  disabled={item.disabled}
                  onClick={() => { item.onClick?.(); handleDrawerClose(); }}
                  sx={(t) => ({
                    borderRadius: `${t.shape['xs']}px`,
                    color: item.color === 'error' ? t.palette.error.main : t.palette.text.primary,
                  })}
                >
                  {item.icon !== undefined && (
                    <ListItemIcon
                      sx={(t) => ({
                        minWidth: '2rem',
                        color: item.color === 'error' ? t.palette.error.main : t.palette.text.muted,
                      })}
                    >
                      {item.icon}
                    </ListItemIcon>
                  )}
                  <ListItemText
                    primary={item.label}
                    slotProps={{ primary: { sx: { fontSize: '1rem' } } }}
                  />
                </ListItemButton>
                {item.dividerAfter === true && !isLast && <Divider sx={{ my: '4px' }} />}
              </Fragment>
            );
          })}
        </List>
      </Drawer>
    </>
  );
}

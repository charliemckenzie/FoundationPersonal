import { useState, useId, cloneElement } from 'react';
import MuiMenu from '@mui/material/Menu';
import MuiMenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import type { Theme } from '@mui/material/styles';
import type React from 'react';

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

  function handleOpen(event: React.MouseEvent<HTMLElement>) {
    setAnchorEl(event.currentTarget);
    onOpenChange?.(true);
  }

  function handleClose() {
    setAnchorEl(null);
    onOpenChange?.(false);
  }

  const triggerWithProps = cloneElement(trigger, {
    onClick: handleOpen,
    'aria-haspopup': 'true',
    'aria-expanded': open || undefined,
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
    </>
  );
}

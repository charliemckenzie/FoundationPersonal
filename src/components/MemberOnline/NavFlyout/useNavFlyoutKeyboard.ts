import type React from 'react';
import type { RefObject } from 'react';

interface UseNavFlyoutKeyboardArgs {
  anchorEl: HTMLElement | null;
  menuRef: RefObject<HTMLElement | null>;
  onClose: () => void;
}

/**
 * Menu keyboard model (ARIA APG) for {@link NavFlyout}: Escape returns focus to the
 * trigger; Tab/Shift+Tab close the menu and move focus in the sidebar; Arrow/Home/End
 * roving moves focus between the menu items. Extracted to keep the component file under
 * the size limit; behaviour is unchanged.
 */
export function useNavFlyoutKeyboard({ anchorEl, menuRef, onClose }: UseNavFlyoutKeyboardArgs) {
  return function handleMenuKeyDown(e: React.KeyboardEvent<HTMLElement>) {
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
  };
}

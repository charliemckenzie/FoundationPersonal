import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Menu, type MenuItemConfig } from '../../components/Menu';
import { Button } from '../../components/Button';
import { IconButton } from '../../components/IconButton';
import { Icon } from '../../components/Icon';

interface MenuStoryArgs {
  showIcons: boolean;
  showDividers: boolean;
}

const meta: Meta<MenuStoryArgs> = {
  title: 'Components / Menu',
  // MenuStoryArgs (showIcons/showDividers) differs from MenuProps so Storybook's
  // strict ComponentType<CustomArgs> check rejects the real component.
  component: Menu as never,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `A menu reveals a list of actions on demand. Use it when actions are secondary — important enough to offer, but not important enough to take up permanent space in the UI.

**When to use**
- Overflow actions that apply to a single item (edit, duplicate, delete)
- User account or profile actions triggered from an avatar or name
- A set of related actions that would clutter the layout if shown as individual buttons

**When not to use**
- Primary actions — if users need to do it most of the time, make it a button
- Navigation — use a nav component instead
- More than 8 items — long menus are hard to scan; consider a different layout

**Trigger conventions**
- A text button works when the context is clear (e.g. "Actions")
- An icon button with the ellipsis icon (⋯) works for per-row actions in a table
- A button with a trailing chevron signals a dropdown and suits toolbar-style triggers

**Grouping and order**
- Put the most-used actions first
- Group related actions with a divider
- Always place destructive actions (delete, remove) last, after a divider`,
      },
    },
  },
  argTypes: {
    showIcons: { control: 'boolean', name: 'Icons' },
    showDividers: { control: 'boolean', name: 'Dividers' },
  },
};

export default meta;
type Story = StoryObj<MenuStoryArgs>;

// ---------------------------------------------------------------------------
// Shared item sets
// ---------------------------------------------------------------------------

const BASIC_ITEMS: MenuItemConfig[] = [
  { label: 'View profile', onClick: () => {} },
  { label: 'Account settings', onClick: () => {} },
  { label: 'Sign out', onClick: () => {} },
];

const ICON_ITEMS: MenuItemConfig[] = [
  { label: 'Edit', icon: <Icon icon="pencil" size="md" />, onClick: () => {} },
  { label: 'Duplicate', icon: <Icon icon="copy" size="md" />, onClick: () => {} },
  { label: 'Share', icon: <Icon icon="share" size="md" />, onClick: () => {} },
];

const DIVIDED_ITEMS: MenuItemConfig[] = [
  { label: 'Edit', icon: <Icon icon="pencil" size="md" />, onClick: () => {} },
  { label: 'Duplicate', icon: <Icon icon="copy" size="md" />, onClick: () => {}, dividerAfter: true },
  { label: 'Archive', icon: <Icon icon="box-archive" size="md" />, onClick: () => {} },
  { label: 'Move to…', icon: <Icon icon="folder-arrow-down" size="md" />, onClick: () => {}, dividerAfter: true },
  { label: 'Delete', icon: <Icon icon="trash" size="md" />, onClick: () => {}, color: 'error' },
];

const WITH_DISABLED: MenuItemConfig[] = [
  { label: 'Edit', onClick: () => {} },
  { label: 'Duplicate', onClick: () => {}, disabled: true },
  { label: 'Delete', onClick: () => {} },
];

// ---------------------------------------------------------------------------
// Stories
// ---------------------------------------------------------------------------

/**
 * A menu reveals a list of actions when triggered. Use it for overflow actions that don't need permanent space in the UI.
 * Toggle the controls to preview common variations.
 */
export const Default: Story = {
  args: { showIcons: false, showDividers: false },
  render: ({ showIcons, showDividers }) => {
    const items: MenuItemConfig[] = [
      { label: 'Edit', icon: showIcons ? <Icon icon="pencil" size="md" /> : undefined, onClick: () => {} },
      {
        label: 'Duplicate',
        icon: showIcons ? <Icon icon="copy" size="md" /> : undefined,
        onClick: () => {},
        dividerAfter: showDividers,
      },
      { label: 'Share', icon: showIcons ? <Icon icon="share" size="md" /> : undefined, onClick: () => {} },
    ];
    return (
      <Menu trigger={<Button label="Open menu" variant="outlined" />} items={items} />
    );
  },
};

/**
 * Add icons to help users scan and identify actions quickly. Use icons consistently — either all items have one, or none do.
 */
export const WithIcons: Story = {
  render: () => (
    <Menu
      trigger={<Button label="Actions" variant="outlined" />}
      items={ICON_ITEMS}
    />
  ),
};

/**
 * Use dividers to group related actions. Keep groups small — if you need more than two groups, consider a different pattern.
 */
export const WithDividers: Story = {
  render: () => (
    <Menu
      trigger={<Button label="More actions" variant="outlined" />}
      items={DIVIDED_ITEMS}
    />
  ),
};

/**
 * Disable items that are unavailable in the current context. Prefer hiding actions that will never be available over disabling them.
 */
export const WithDisabledItem: Story = {
  render: () => (
    <Menu
      trigger={<Button label="Options" variant="outlined" />}
      items={WITH_DISABLED}
    />
  ),
};

/**
 * Use an icon button trigger for compact layouts where a text label isn't needed. The three-dot (ellipsis) icon is the conventional choice.
 */
export const WithIconButtonTrigger: Story = {
  render: () => (
    <Menu
      trigger={<IconButton icon="ellipsis" label="More options" variant="outlined" />}
      items={BASIC_ITEMS}
    />
  ),
};

const LONG_LIST_ITEMS: MenuItemConfig[] = [
  { label: 'Dashboard', icon: <Icon icon="house" size="md" />, onClick: () => {} },
  { label: 'My profile', icon: <Icon icon="user" size="md" />, onClick: () => {} },
  { label: 'Account settings', icon: <Icon icon="gear" size="md" />, onClick: () => {} },
  { label: 'Notifications', icon: <Icon icon="bell" size="md" />, onClick: () => {} },
  { label: 'Privacy', icon: <Icon icon="shield" size="md" />, onClick: () => {} },
  { label: 'Security', icon: <Icon icon="lock" size="md" />, onClick: () => {}, dividerAfter: true },
  { label: 'Help centre', icon: <Icon icon="circle-question" size="md" />, onClick: () => {} },
  { label: 'Contact support', icon: <Icon icon="headset" size="md" />, onClick: () => {} },
  { label: 'Send feedback', icon: <Icon icon="message" size="md" />, onClick: () => {}, dividerAfter: true },
  { label: 'Sign out', icon: <Icon icon="arrow-right-from-bracket" size="md" />, onClick: () => {}, color: 'error' },
];

/**
 * Long lists demonstrate the scrollable drawer on mobile and how the min-width keeps the dropdown readable at any content length.
 * Use dividers to create clear groups when a menu has more than five items.
 */
export const LongList: Story = {
  render: () => (
    <Menu
      trigger={<Button label="Account" variant="outlined" />}
      items={LONG_LIST_ITEMS}
    />
  ),
};

/**
 * A chevron on the trigger signals to users that a dropdown will appear. The chevron rotates when the menu is open.
 */
export const WithChevron: Story = {
  render: () => {
    function ChevronMenuDemo() {
      const [open, setOpen] = useState(false);
      return (
        <Menu
          trigger={
            <Button
              label="Options"
              variant="outlined"
              endIcon="chevron-down"
              sx={{
                '& .MuiButton-endIcon': {
                  transition: 'transform 0.2s ease',
                  transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
                },
              }}
            />
          }
          items={BASIC_ITEMS}
          onOpenChange={setOpen}
        />
      );
    }
    return <ChevronMenuDemo />;
  },
};

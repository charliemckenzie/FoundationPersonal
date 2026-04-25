import type { Meta, StoryObj } from '@storybook/react';
import { faPlus, faTrash } from '@fortawesome/pro-solid-svg-icons';
import Box from '@mui/material/Box';
import { TextButton } from '../../components/TextButton';
import { Icon } from '../../components/Icon';

const meta: Meta<typeof TextButton> = {
  title: 'Components / TextButton',
  component: TextButton,
  tags: ['autodocs'],
  parameters: { 
    layout: 'centered',
    docs: {
      description: {
        component: `
**Icon Position Rule:**

- **Icon left** — User stays on the current page (add, delete, download)
- **Icon right** — User leaves the current page (external links, navigation)
        `,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const bgType = context.globals.backgroundColor || 'default';
      return (
        <Box sx={{ bgcolor: `background.${bgType}`, p: 3, minWidth: 200 }}>
          <Story />
        </Box>
      );
    },
  ],
  argTypes: {
    size: { control: 'select', options: ['small', 'medium', 'large'] },
    color: { control: 'select', options: ['primary', 'secondary', 'error', 'warning', 'info', 'success'] },
    iconDirection: { control: 'select', options: ['left', 'right'] },
    disabled: { control: 'boolean' },
    type: { table: { disable: true } },
    onClick: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof TextButton>;

export const Default: Story = {
  args: { label: 'Learn more' },
};

export const Sizes: Story = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'flex-start' }}>
      <TextButton label="Small text button" size="small" />
      <TextButton label="Medium text button" size="medium" />
      <TextButton label="Large text button" size="large" />
    </Box>
  ),
};

export const IconDirection: Story = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'flex-start' }}>
      <TextButton label="Default (arrow right)" iconDirection="right" />
      <TextButton label="Arrow on left" iconDirection="left" />
    </Box>
  ),
};

export const CommonIcons: Story = {
  parameters: {
    docs: {
      description: {
        story: `
**Open External** — Icon right. Used for external links that leave the website.

**Download** — Icon left. Used for downloading files or documents.

**Add Item** — Icon left. Used for adding items to a list or element.

**Delete** — Icon left. Used for deleting elements.

**Open Modal** — Icon left. Used for opening modal popups or detail views.
        `,
      },
    },
  },
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'flex-start' }}>
      <TextButton label="Open external link" endIcon="arrow-up-right" />
      <TextButton label="Download file" startIcon="arrow-down-to-line" />
      <TextButton label="Add item" startIcon={faPlus} />
      <TextButton label="Delete" startIcon={faTrash} color="error" />
      <TextButton label="View details" startIcon="clone" />
    </Box>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'flex-start' }}>
      <TextButton label="Disabled primary" disabled />
      <TextButton label="Disabled with icon" disabled startIcon={faPlus} />
      <TextButton label="Disabled error" disabled color="error" />
    </Box>
  ),
};

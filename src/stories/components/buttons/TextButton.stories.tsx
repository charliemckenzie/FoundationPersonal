import type { Meta, StoryObj } from '@storybook/react';
import { faPlus, faTrash } from '@fortawesome/pro-solid-svg-icons';
import Box from '@mui/material/Box';
import { TextButton } from '../../../components/TextButton';
import { Icon } from '../../../components/Icon';
import { useState } from 'react';

const meta: Meta<typeof TextButton> = {
  title: 'Components / Buttons / TextButton',
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
    loading: { control: 'boolean' },
    reversed: { control: 'boolean' },
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

export const Loading: Story = {
  render: () => {
    const LoadingExample = () => {
      const [loadingLeft, setLoadingLeft] = useState(false);
      const [loadingRight, setLoadingRight] = useState(false);

      return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Box>
            <Box sx={{ mb: 1, fontWeight: 600 }}>Click to toggle loading state</Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'flex-start' }}>
              <TextButton 
                label="Click me (icon left)" 
                loading={loadingLeft}
                iconDirection="left"
                onClick={() => setLoadingLeft(!loadingLeft)}
              />
              <TextButton 
                label="Click me (icon right)" 
                loading={loadingRight}
                iconDirection="right"
                onClick={() => setLoadingRight(!loadingRight)}
              />
            </Box>
          </Box>
        </Box>
      );
    };

    return <LoadingExample />;
  },
};

function ReversedShowcase() {
  const [loadingLeft, setLoadingLeft] = useState(false);
  const [loadingRight, setLoadingRight] = useState(false);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
        p: 6,
        bgcolor: 'background.brandPrimary',
      }}
    >
      <Box>
        <Box sx={{ mb: 1, fontWeight: 600, color: 'common.white' }}>Default</Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'flex-start' }}>
          <TextButton label="Learn more" reversed />
          <TextButton label="View details" reversed startIcon="clone" />
          <TextButton label="Open external link" reversed endIcon="arrow-up-right" />
        </Box>
      </Box>
      <Box>
        <Box sx={{ mb: 1, fontWeight: 600, color: 'common.white' }}>Sizes</Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'flex-start' }}>
          <TextButton label="Small text button" size="small" reversed />
          <TextButton label="Medium text button" size="medium" reversed />
          <TextButton label="Large text button" size="large" reversed />
        </Box>
      </Box>
      <Box>
        <Box sx={{ mb: 1, fontWeight: 600, color: 'common.white' }}>Icon Direction</Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'flex-start' }}>
          <TextButton label="Default (arrow right)" iconDirection="right" reversed />
          <TextButton label="Arrow on left" iconDirection="left" reversed />
        </Box>
      </Box>
      <Box>
        <Box sx={{ mb: 1, fontWeight: 600, color: 'common.white' }}>Disabled</Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'flex-start' }}>
          <TextButton label="Disabled primary" disabled reversed />
          <TextButton label="Disabled with icon" disabled startIcon={faPlus} reversed />
        </Box>
      </Box>
      <Box>
        <Box sx={{ mb: 1, fontWeight: 600, color: 'common.white' }}>Loading — Click to toggle</Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'flex-start' }}>
          <TextButton 
            label="Click me (icon left)" 
            loading={loadingLeft}
            reversed
            iconDirection="left"
            onClick={() => setLoadingLeft(!loadingLeft)}
          />
          <TextButton 
            label="Click me (icon right)" 
            loading={loadingRight}
            reversed
            iconDirection="right"
            onClick={() => setLoadingRight(!loadingRight)}
          />
        </Box>
      </Box>
    </Box>
  );
}

export const OnPrimaryBackground: Story = {
  name: 'Reversed — On Primary Background',
  parameters: { layout: 'fullscreen' },
  render: () => <ReversedShowcase />,
};

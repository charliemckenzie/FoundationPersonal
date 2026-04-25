import type { Meta, StoryObj } from '@storybook/react';
import { faPlus, faTrash, faDownload, faArrowUpRightFromSquare } from '@fortawesome/pro-solid-svg-icons';
import Box from '@mui/material/Box';
import { TextButton } from '../../components/TextButton';

const meta: Meta<typeof TextButton> = {
  title: 'Components / TextButton',
  component: TextButton,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
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

export const CustomIcons: Story = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'flex-start' }}>
      <TextButton label="Download file" startIcon={faDownload} />
      <TextButton label="Add item" startIcon={faPlus} />
      <TextButton label="Open external" endIcon={faArrowUpRightFromSquare} />
      <TextButton label="Delete" endIcon={faTrash} color="error" />
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

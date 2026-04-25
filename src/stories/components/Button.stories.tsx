import type { Meta, StoryObj } from '@storybook/react';
import { IconPlus, IconTrash } from '@tabler/icons-react';
import Box from '@mui/material/Box';
import { Button } from '../../components/Button';

const meta: Meta<typeof Button> = {
  title: 'Components / Button',
  component: Button,
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
    variant: { control: 'select', options: ['contained', 'outlined', 'text', 'soft'] },
    size: { control: 'select', options: ['small', 'medium', 'large'] },
    color: { control: 'select', options: ['primary', 'error'] },
    reversed: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: { label: 'Button' },
};

export const Variants: Story = {
  render: () => (
    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
      <Button label="Contained" variant="contained" />
      <Button label="Soft" variant="soft" />
      <Button label="Outlined" variant="outlined" />
      <Button label="Text" variant="text" />
    </Box>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
      <Button label="Small" size="small" />
      <Button label="Medium" size="medium" />
      <Button label="Large" size="large" />
    </Box>
  ),
};

export const Colors: Story = {
  render: () => (
    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
      <Button label="Primary" color="primary" />
      <Button label="Error" color="error" />
    </Box>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
      <Button label="Add Item" startIcon={IconPlus} />
      <Button label="Delete" endIcon={IconTrash} color="error" variant="outlined" />
    </Box>
  ),
};

export const Loading: Story = {
  args: { label: 'Saving…', loading: true },
};

export const Disabled: Story = {
  render: () => (
    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
      <Button label="Contained" variant="contained" disabled />
      <Button label="Soft" variant="soft" disabled />
      <Button label="Outlined" variant="outlined" disabled />
      <Button label="Text" variant="text" disabled />
    </Box>
  ),
};

export const FullWidth: Story = {
  render: () => (
    <Box sx={{ width: 320 }}>
      <Button label="Full Width Button" fullWidth />
    </Box>
  ),
};

function ReversedShowcase() {
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
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
        <Button label="Contained" variant="contained" reversed />
        <Button label="Soft" variant="soft" reversed />
        <Button label="Outlined" variant="outlined" reversed />
        <Button label="Text" variant="text" reversed />
      </Box>
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
        <Button label="Small" variant="contained" size="small" reversed />
        <Button label="Medium" variant="contained" size="medium" reversed />
        <Button label="Large" variant="contained" size="large" reversed />
      </Box>
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
        <Button label="Contained" variant="contained" reversed disabled />
        <Button label="Soft" variant="soft" reversed disabled />
        <Button label="Outlined" variant="outlined" reversed disabled />
        <Button label="Text" variant="text" reversed disabled />
      </Box>
    </Box>
  );
}

export const OnPrimaryBackground: Story = {
  name: 'Reversed — On Primary Background',
  parameters: { layout: 'fullscreen' },
  render: () => <ReversedShowcase />,
};

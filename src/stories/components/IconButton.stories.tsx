import type { Meta, StoryObj } from '@storybook/react';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { IconButton } from '../../components/IconButton';

const meta: Meta<typeof IconButton> = {
  title: 'Components / IconButton',
  component: IconButton,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    size: { control: 'select', options: ['small', 'medium', 'large'] },
    color: { control: 'select', options: ['default', 'primary', 'secondary', 'error', 'warning', 'info', 'success'] },
  },
};

export default meta;
type Story = StoryObj<typeof IconButton>;

export const Default: Story = {
  args: { icon: <EditIcon />, label: 'Edit' },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <IconButton icon={<EditIcon />} label="Edit small" size="small" color="primary" />
      <IconButton icon={<EditIcon />} label="Edit medium" size="medium" color="primary" />
      <IconButton icon={<EditIcon />} label="Edit large" size="large" color="primary" />
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <IconButton icon={<AddIcon />} label="Add (primary)" color="primary" />
      <IconButton icon={<SearchIcon />} label="Search (secondary)" color="secondary" />
      <IconButton icon={<DeleteIcon />} label="Delete (error)" color="error" />
      <IconButton icon={<FavoriteIcon />} label="Favourite (success)" color="success" />
    </div>
  ),
};

export const Disabled: Story = {
  args: { icon: <EditIcon />, label: 'Edit (disabled)', disabled: true, color: 'primary' },
};

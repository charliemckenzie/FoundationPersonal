import type { Meta, StoryObj } from '@storybook/react';
import { Icon } from '../../components/Icon';
import {
  IconHome,
  IconSearch,
  IconSettings,
  IconUser,
  IconBell,
  IconCheck,
  IconAlertCircle,
  IconInfoCircle,
  IconX,
} from '@tabler/icons-react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const meta: Meta<typeof Icon> = {
  title: 'Components / Icon',
  component: Icon,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    size: { control: 'select', options: ['small', 'medium', 'large'] },
    color: {
      control: 'select',
      options: ['inherit', 'primary', 'secondary', 'error', 'warning', 'info', 'success', 'text.primary', 'text.muted', 'text.disabled'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Icon>;

export const Default: Story = {
  args: { icon: IconHome, size: 'medium', color: 'inherit' },
};

export const Sizes: Story = {
  render: () => (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
        <Icon icon={IconSearch} size="small" />
        <Typography variant="small">small</Typography>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
        <Icon icon={IconSearch} size="medium" />
        <Typography variant="small">medium</Typography>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
        <Icon icon={IconSearch} size="large" />
        <Typography variant="small">large</Typography>
      </Box>
    </Box>
  ),
};

export const Colors: Story = {
  render: () => (
    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
      {(['primary', 'secondary', 'error', 'warning', 'info', 'success', 'text.primary', 'text.muted', 'text.disabled'] as const).map(
        (color) => (
          <Box key={color} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5 }}>
            <Icon icon={IconBell} color={color} />
            <Typography variant="small">{color}</Typography>
          </Box>
        )
      )}
    </Box>
  ),
};

export const CommonIcons: Story = {
  render: () => (
    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
      {[
        { icon: IconHome, name: 'Home' },
        { icon: IconSearch, name: 'Search' },
        { icon: IconSettings, name: 'Settings' },
        { icon: IconUser, name: 'User' },
        { icon: IconBell, name: 'Bell' },
        { icon: IconCheck, name: 'Check' },
        { icon: IconAlertCircle, name: 'AlertCircle' },
        { icon: IconInfoCircle, name: 'InfoCircle' },
        { icon: IconX, name: 'X' },
      ].map(({ icon, name }) => (
        <Box key={name} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5 }}>
          <Icon icon={icon} color="text.primary" />
          <Typography variant="small">{name}</Typography>
        </Box>
      ))}
    </Box>
  ),
};

export const WithAriaLabel: Story = {
  args: { icon: IconBell, 'aria-label': 'Notifications' },
};

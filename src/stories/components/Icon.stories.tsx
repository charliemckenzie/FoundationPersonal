import type { Meta, StoryObj } from '@storybook/react';
import { Icon } from '../../components/Icon';
import {
  faHome,
  faSearch,
  faGear,
  faUser,
  faBell,
  faCheck,
  faCircleExclamation,
  faCircleInfo,
  faXmark,
} from '@fortawesome/pro-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/pro-regular-svg-icons';
import { faHeart as faHeartLight } from '@fortawesome/pro-light-svg-icons';
import { faHeart as faHeartThin } from '@fortawesome/pro-thin-svg-icons';
import { faHeart as faHeartSolid } from '@fortawesome/pro-solid-svg-icons';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const meta: Meta<typeof Icon> = {
  title: 'Components / Icon',
  component: Icon,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    icon: { control: 'text', description: 'Icon name (e.g., "bed-front") or IconDefinition object. Defaults to "house" if empty.' },
    style: { control: 'select', options: ['solid', 'regular', 'light', 'thin', 'duotone', 'sharp'], description: 'Icon style (only applies when using icon names)' },
    size: { control: 'select', options: ['sm', 'md', 'lg', 'xl', '2xl', '3xl'] },
    color: {
      control: 'select',
      options: ['inherit', 'primary', 'secondary', 'error', 'warning', 'info', 'success', 'text.primary', 'text.muted', 'text.disabled'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Icon>;

export const Default: Story = {
  args: { icon: faHome, size: 'md', color: 'inherit' },
};

export const Sizes: Story = {
  render: () => (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
        <Icon icon={faSearch} size="sm" />
        <Typography variant="small">sm (14px)</Typography>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
        <Icon icon={faSearch} size="md" />
        <Typography variant="small">md (16px)</Typography>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
        <Icon icon={faSearch} size="lg" />
        <Typography variant="small">lg (20px)</Typography>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
        <Icon icon={faSearch} size="xl" />
        <Typography variant="small">xl (24px)</Typography>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
        <Icon icon={faSearch} size="2xl" />
        <Typography variant="small">2xl (32px)</Typography>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
        <Icon icon={faSearch} size="3xl" />
        <Typography variant="small">3xl (40px)</Typography>
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
            <Icon icon={faBell} color={color} />
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
        { icon: faHome, name: 'Home' },
        { icon: faSearch, name: 'Search' },
        { icon: faGear, name: 'Settings' },
        { icon: faUser, name: 'User' },
        { icon: faBell, name: 'Bell' },
        { icon: faCheck, name: 'Check' },
        { icon: faCircleExclamation, name: 'Alert' },
        { icon: faCircleInfo, name: 'Info' },
        { icon: faXmark, name: 'Close' },
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
  args: { icon: faBell, 'aria-label': 'Notifications' },
};

export const ProStyles: Story = {
  render: () => (
    <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
      {[
        { icon: faHeartSolid, name: 'Solid' },
        { icon: faHeartRegular, name: 'Regular' },
        { icon: faHeartLight, name: 'Light' },
        { icon: faHeartThin, name: 'Thin' },
      ].map(({ icon, name }) => (
        <Box key={name} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5 }}>
          <Icon icon={icon} color="error" size="large" />
          <Typography variant="small">{name}</Typography>
        </Box>
      ))}
    </Box>
  ),
};

export const UsingIconNames: Story = {
  render: () => (
    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
      {[
        { name: 'bed-front', label: 'Bed' },
        { name: 'coffee', label: 'Coffee' },
        { name: 'plane', label: 'Plane' },
        { name: 'car', label: 'Car' },
        { name: 'house', label: 'House' },
        { name: 'heart', label: 'Heart' },
        { name: 'star', label: 'Star' },
        { name: 'moon', label: 'Moon' },
      ].map(({ name, label }) => (
        <Box key={name} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5 }}>
          <Icon icon={name} color="primary" />
          <Typography variant="small">{label}</Typography>
        </Box>
      ))}
    </Box>
  ),
};

export const IconNameWithStyles: Story = {
  render: () => (
    <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
      {[
        { style: 'solid' as const, label: 'Solid' },
        { style: 'regular' as const, label: 'Regular' },
        { style: 'light' as const, label: 'Light' },
        { style: 'thin' as const, label: 'Thin' },
      ].map(({ style, label }) => (
        <Box key={style} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5 }}>
          <Icon icon="star" style={style} color="warning" size="large" />
          <Typography variant="small">{label}</Typography>
        </Box>
      ))}
    </Box>
  ),
};

export const IconNameExample: Story = {
  args: { 
    icon: 'bed-front',
    style: 'solid',
    size: 'medium',
    color: 'primary',
  },
};

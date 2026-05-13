import type { Meta, StoryObj } from '@storybook/react';
import { Icon } from '../../components/Icon';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import MuiTextField from '@mui/material/TextField';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useState } from 'react';

const FONT_AWESOME_ICONS = [
  'arrow-down-to-line',
  'arrow-left',
  'arrow-left-arrow-right',
  'arrow-right',
  'arrow-right-to-bracket',
  'arrow-up-from-line',
  'arrow-up-right',
  'bars',
  'chart-column',
  'chart-line',
  'chart-pie',
  'chart-pie-simple',
  'check',
  'copy',
  'chevron-down',
  'chevron-left',
  'chevron-right',
  'chevron-up',
  'circle-check',
  'circle-dollar',
  'circle-exclamation',
  'circle-info',
  'circle-minus',
  'circle-plus',
  'circle-question',
  'ellipsis',
  'facebook-f-brands',
  'gift',
  'house',
  'instagram-brands',
  'key',
  'linkedin-in-brands',
  'lock',
  'magnifying-glass',
  'magnifying-glass-dollar',
  'minus',
  'piggy-bank',
  'plus',
  'question',
  'triangle-exclamation',
  'umbrella',
  'xmark',
  'youtube-brands',
  'no0',
  'no1',
  'no2',
  'no3',
  'no4',
  'no5',
  'no6',
  'no7',
  'no8',
  'no9',
] as const;

const meta: Meta<typeof Icon> = {
  title: 'Components / Icons / Icon',
  component: Icon,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    icon: { control: 'text', description: 'Local icon name without .svg extension.' },
    style: { control: 'select', options: ['solid', 'regular', 'light', 'thin', 'duotone', 'sharp'], description: 'Uses Font Awesome local icons. Solid and light map to distinct assets.' },
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
  args: { icon: 'house', size: 'md', color: 'inherit' },
};

export const Sizes: Story = {
  render: () => (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
        <Icon icon="plus" size="sm" />
        <Typography variant="small">sm (14px)</Typography>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
        <Icon icon="plus" size="md" />
        <Typography variant="small">md (16px)</Typography>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
        <Icon icon="plus" size="lg" />
        <Typography variant="small">lg (20px)</Typography>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
        <Icon icon="plus" size="xl" />
        <Typography variant="small">xl (24px)</Typography>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
        <Icon icon="plus" size="2xl" />
        <Typography variant="small">2xl (32px)</Typography>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
        <Icon icon="plus" size="3xl" />
        <Typography variant="small">3xl (40px)</Typography>
      </Box>
    </Box>
  ),
};

export const WithAriaLabel: Story = {
  args: { icon: 'circle-info', 'aria-label': 'Information' },
};

function GalleryRender({ style }: { style: 'solid' | 'light' }) {
  const [search, setSearch] = useState('');
  const [iconStyle, setIconStyle] = useState<'solid' | 'light'>(style);

  const filtered = search.trim()
    ? FONT_AWESOME_ICONS.filter(name => name.toLowerCase().includes(search.toLowerCase()))
    : FONT_AWESOME_ICONS;

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2, mb: 2, flexWrap: 'wrap' }}>
        <MuiTextField
          placeholder="Search icons..."
          size="small"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          sx={{ width: 280, maxWidth: '100%' }}
          slotProps={{ input: { 'aria-label': 'Search icons' } }}
        />
        <ToggleButtonGroup
          exclusive
          value={iconStyle}
          onChange={(_event, nextStyle: 'solid' | 'light' | null) => {
            if (nextStyle) setIconStyle(nextStyle);
          }}
          aria-label="Icon style"
          sx={{ ml: 'auto' }}
        >
          <ToggleButton value="solid" aria-label="Solid icons">Solid</ToggleButton>
          <ToggleButton value="light" aria-label="Light icons">Light</ToggleButton>
        </ToggleButtonGroup>
      </Box>
      <Typography variant="body" sx={{ mb: 3, color: 'text.secondary' }}>
        {filtered.length} of {FONT_AWESOME_ICONS.length} icons
      </Typography>
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: 2 }}>
        {filtered.map((name) => (
          <Box
            key={name}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 1,
              p: 2,
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 1,
              textAlign: 'center',
            }}
          >
            <Icon icon={name} style={iconStyle} size="lg" />
            <Typography variant="small" sx={{ wordBreak: 'break-word', lineHeight: 1.3, color: 'text.secondary' }}>
              {name}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export const Gallery: Story = {
  args: {
    style: 'solid',
  },
  render: (args) => <GalleryRender style={args.style === 'light' ? 'light' : 'solid'} />,
  parameters: { controls: { include: ['style'] } },
};

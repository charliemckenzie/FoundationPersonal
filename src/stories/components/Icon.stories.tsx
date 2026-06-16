import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Icon } from '../../components/Icon';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import MuiTextField from '@mui/material/TextField';
import { RadioGroup } from '@/components/RadioGroup';
import { useState } from 'react';

/** Icons available in both solid and light styles. */
const FONT_AWESOME_ICONS = [
  'arrow-down',
  'arrow-down-to-line',
  'arrow-left',
  'arrow-left-arrow-right',
  'arrow-right',
  'arrow-right-to-bracket',
  'arrow-rotate-right',
  'arrow-up',
  'arrow-up-from-line',
  'arrow-up-right',
  'arrow-up-to-line',
  'arrows-rotate',
  'arrows-up-down',
  'badge-percent',
  'bars',
  'bell',
  'book-open',
  'book-open-lines',
  'briefcase',
  'bullseye-arrow',
  'calculator',
  'calendar',
  'car',
  'chart-column',
  'chart-line',
  'chart-pie',
  'chart-pie-simple',
  'chart-pie-simple-circle-dollar',
  'check',
  'chevron-down',
  'chevron-left',
  'chevron-right',
  'chevron-up',
  'circle-check',
  'circle-dashed',
  'circle-dollar',
  'circle-dollar-to-slot',
  'circle-exclamation',
  'circle-info',
  'circle-minus',
  'circle-plus',
  'circle-question',
  'cloud-arrow-up',
  'copy',
  'credit-card-front',
  'ellipsis',
  'envelope',
  'facebook-f-brands',
  'file-circle-plus',
  'file-lines',
  'file-pdf',
  'file-signature',
  'flower-tulip',
  'gear',
  'gift',
  'grip-dots-vertical',
  'hand-holding-circle-dollar',
  'house',
  'instagram-brands',
  'key',
  'linkedin-in-brands',
  'list-check',
  'lock',
  'lock-open',
  'magnifying-glass',
  'magnifying-glass-dollar',
  'memo-circle-info',
  'messages-dollar',
  'minus',
  'mobile',
  'money-bills-simple',
  'money-check-dollar',
  'money-in',
  'money-out',
  'money-simple-from-bracket',
  'moon',
  'passport',
  'pen-to-square',
  'phone',
  'piggy-bank',
  'plus',
  'print',
  'question',
  'signature',
  'sparkles',
  'sun-bright',
  'trash',
  'tree-palm',
  'triangle-exclamation',
  'umbrella',
  'user',
  'user-gear',
  'user-group',
  'user-question',
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

/** Icons available in the regular style. */
const FONT_AWESOME_REGULAR_ICONS = [
  'arrow-down',
  'arrow-down-to-line',
  'arrow-left',
  'arrow-left-arrow-right',
  'arrow-right',
  'arrow-right-to-bracket',
  'arrow-rotate-right',
  'arrow-up',
  'arrow-up-from-line',
  'arrow-up-right',
  'arrow-up-to-line',
  'arrows-rotate',
  'arrows-up-down',
  'badge-percent',
  'bars',
  'bell',
  'book-open-lines',
  'briefcase',
  'bullseye-arrow',
  'calculator',
  'calendar',
  'car',
  'chart-column',
  'chart-line',
  'chart-pie',
  'chart-pie-simple',
  'chart-pie-simple-circle-dollar',
  'check',
  'chevron-down',
  'chevron-left',
  'chevron-right',
  'chevron-up',
  'circle-check',
  'circle-dashed',
  'circle-dollar',
  'circle-dollar-to-slot',
  'circle-exclamation',
  'circle-info',
  'circle-minus',
  'circle-plus',
  'circle-question',
  'cloud-arrow-up',
  'copy',
  'credit-card-front',
  'ellipsis',
  'envelope',
  'file-circle-plus',
  'file-lines',
  'file-pdf',
  'file-signature',
  'flower-tulip',
  'gear',
  'gift',
  'grip-dots-vertical',
  'hand-holding-circle-dollar',
  'house',
  'key',
  'list-check',
  'lock',
  'lock-open',
  'magnifying-glass',
  'magnifying-glass-dollar',
  'memo-circle-info',
  'messages-dollar',
  'minus',
  'mobile',
  'money-bills-simple',
  'money-check-dollar',
  'money-in',
  'money-out',
  'money-simple-from-bracket',
  'moon',
  'passport',
  'pen-to-square',
  'phone',
  'piggy-bank',
  'plus',
  'print',
  'question',
  'signature',
  'sparkles',
  'sun-bright',
  'trash',
  'tree-palm',
  'triangle-exclamation',
  'umbrella',
  'user',
  'user-gear',
  'user-group',
  'user-question',
  'xmark',
] as const;

const meta: Meta<typeof Icon> = {
  title: 'Atomic Components / Icons / Icon',
  component: Icon,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    icon: { control: 'text', description: 'Local icon name without .svg extension.' },
    style: { control: 'select', options: ['solid', 'regular', 'light', 'thin', 'duotone', 'sharp'], description: 'Uses Font Awesome local icons. Solid and light map to distinct assets.' },
    size: { control: 'select', options: ['sm', 'md', 'lg', 'xl', 'xl+', '2xl', '3xl'] },
    color: {
      control: 'select',
      options: ['inherit', 'primary', 'secondary', 'error', 'warning', 'info', 'success', 'text.primary', 'text.heading', 'text.muted', 'text.disabled'],
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
        <Icon icon="plus" size="xl+" />
        <Typography variant="small">xl+ (28px)</Typography>
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

function GalleryRender({ style }: { style: 'solid' | 'light' | 'regular' }) {
  const [search, setSearch] = useState('');
  const [iconStyle, setIconStyle] = useState<'solid' | 'light' | 'regular'>(style);

  const iconList = iconStyle === 'regular' ? FONT_AWESOME_REGULAR_ICONS : FONT_AWESOME_ICONS;

  const filtered = search.trim()
    ? iconList.filter(name => name.toLowerCase().includes(search.toLowerCase()))
    : iconList;

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
        <RadioGroup
          legend="Icon style"
          variant="button"
          direction="row"
          value={iconStyle}
          options={[
            { value: 'solid', label: 'Solid' },
            { value: 'regular', label: 'Regular' },
            { value: 'light', label: 'Light' },
          ]}
          onChange={(value) => setIconStyle(value as 'solid' | 'light' | 'regular')}
        />
      </Box>
      <Typography variant="body" sx={{ mb: 3, color: 'text.secondary' }}>
        {filtered.length} of {iconList.length} icons
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
  render: (args) => {
    const style = args.style === 'light' ? 'light' : args.style === 'regular' ? 'regular' : 'solid';
    return <GalleryRender style={style} />;
  },
  parameters: { controls: { include: ['style'] } },
};

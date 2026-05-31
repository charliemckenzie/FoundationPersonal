import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import MuiTextField from '@mui/material/TextField';
import { useState } from 'react';
import { HeroIcon } from '../../components/HeroIcon';
import type { HeroIconBackground, HeroIconBrand } from '../../components/HeroIcon';
import artIconList from '../../assets/icon-list-art.json';
import qsuperIconList from '../../assets/icon-list-qsuper.json';

// Maps Storybook brand global → HeroIconBrand + icon list + a representative icon
const BRAND_MAP: Record<string, { brand: HeroIconBrand; icons: string[]; sampleIcon: string }> = {
  foundation: { brand: 'art',    icons: artIconList,    sampleIcon: 'Goals' },
  'theme-b':  { brand: 'qsuper', icons: qsuperIconList, sampleIcon: 'alert' },
};

function getBrand(globalBrand: string) {
  return BRAND_MAP[globalBrand] ?? BRAND_MAP['foundation'];
}

const SIZES = ['sm', 'md', 'lg', 'xl', '2xl', '3xl'] as const;
const SIZE_LABELS: Record<string, string> = {
  sm:    'sm — 24px',
  md:    'md — 32px',
  lg:    'lg — 48px',
  xl:    'xl — 64px',
  '2xl': '2xl — 80px',
  '3xl': '3xl — 96px',
};

const ART_BACKGROUNDS: HeroIconBackground[]    = ['none', 'brand', 'white', 'grey'];
const QSUPER_BACKGROUNDS: HeroIconBackground[] = ['none', 'brand', 'white'];

const BG_LABELS: Record<string, Record<HeroIconBackground, string>> = {
  art: {
    none:  'None',
    brand: 'Light blue (tintNeutralCool)',
    white: 'White (paper)',
    grey:  'Grey (elevated)',
  },
  qsuper: {
    none:  'None',
    brand: 'QSuper blue (brandPrimary)',
    white: 'White (paper)',
    grey:  'Grey (elevated)',
  },
};

const meta: Meta<typeof HeroIcon> = {
  title: 'Atomic Components / Icons / Hero Icon',
  component: HeroIcon,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  args: {
    name: 'Goals',
    brand: 'art',
    size: 'md',
    background: 'none',
    iconColor: 'default',
  },
  argTypes: {
    name: {
      control: 'text',
      description: 'Icon name from the active brand icon set.',
    },
    brand: {
      control: 'select',
      options: ['art', 'qsuper'],
      description: 'Brand — determines which icon folder is used.',
    },
    size: {
      control: 'select',
      options: SIZES,
      description: 'Rendered size.',
    },
    background: {
      control: 'select',
      options: ['none', 'brand', 'white', 'grey'] satisfies HeroIconBackground[],
      description: 'Circular background. Colour resolves per brand via semantic tokens.',
    },
    iconColor: {
      control: 'radio',
      options: ['default', 'white', 'quaternary'],
      description: 'Icon fill colour. Only applies to QSuper (monochrome SVGs). `default` shows the embedded colour; `white` inverts to white; `quaternary` tints to quaternary.main — use with background="none" only.',
    },
    'aria-label': {
      control: 'text',
      description: 'Accessible label. Omit for decorative icons.',
    },
  },
};

export default meta;
type Story = StoryObj<typeof HeroIcon>;

export const Default: Story = {
  render: (args, context) => {
    const { brand: globalBrand, sampleIcon } = getBrand((context.globals['brand'] as string) || 'foundation');
    return (
      <HeroIcon
        name={args.name || sampleIcon}
        brand={args.brand ?? globalBrand}
        size={args.size ?? 'md'}
        background={args.background ?? 'none'}
        iconColor={args.iconColor}
        aria-label={args['aria-label']}
      />
    );
  },
};

export const Sizes: Story = {
  render: (_args, context) => {
    const { brand, sampleIcon } = getBrand((context.globals['brand'] as string) || 'foundation');
    return (
      <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 4, flexWrap: 'wrap' }}>
        {SIZES.map(size => (
          <Box key={size} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
            <HeroIcon name={sampleIcon} brand={brand} size={size} />
            <Typography variant="small" sx={{ color: 'text.secondary' }}>
              {SIZE_LABELS[size]}
            </Typography>
          </Box>
        ))}
      </Box>
    );
  },
};

export const WithAriaLabel: Story = {
  render: (_args, context) => {
    const { brand, sampleIcon } = getBrand((context.globals['brand'] as string) || 'foundation');
    return <HeroIcon name={sampleIcon} brand={brand} size="lg" aria-label={`${sampleIcon} icon`} />;
  },
};

export const Backgrounds: Story = {
  render: (_args, context) => {
    const { brand, sampleIcon } = getBrand((context.globals['brand'] as string) || 'foundation');
    const bgList = brand === 'art' ? ART_BACKGROUNDS : QSUPER_BACKGROUNDS;
    const labels = BG_LABELS[brand];
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 4, flexWrap: 'wrap' }}>
        {bgList.map(bg => (
          <Box key={bg} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1.5 }}>
            <Box
              sx={{
                p: 3,
                bgcolor: bg === 'white' ? 'background.default' : 'background.paper',
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 2,
                display: 'inline-flex',
              }}
            >
              <HeroIcon
                name={sampleIcon}
                brand={brand}
                size="xl"
                background={bg}
                iconColor={brand === 'qsuper' && bg === 'brand' ? 'white' : 'default'}
              />
            </Box>
            <Typography variant="small" sx={{ color: 'text.secondary', textAlign: 'center' }}>
              {labels[bg]}
            </Typography>
          </Box>
        ))}
      </Box>
    );
  },
};

function GalleryRender({ globalBrand }: { globalBrand: string }) {
  const [search, setSearch] = useState('');
  const { brand, icons } = getBrand(globalBrand);

  const filtered = search.trim()
    ? icons.filter(name => name.toLowerCase().includes(search.toLowerCase()))
    : icons;

  return (
    <Box>
      <MuiTextField
        placeholder="Search icons…"
        size="small"
        value={search}
        onChange={e => setSearch(e.target.value)}
        sx={{ mb: 2, width: 280 }}
        slotProps={{ input: { 'aria-label': 'Search icons' } }}
      />
      <Typography variant="body" sx={{ mb: 3, color: 'text.secondary' }}>
        {filtered.length} of {icons.length} icons
      </Typography>
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: 2 }}>
        {filtered.map(name => (
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
            <HeroIcon name={name} brand={brand} size="lg" />
            <Typography variant="small" sx={{ wordBreak: 'break-word', lineHeight: 1.3, color: 'text.secondary' }}>
              {name}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export const QSuperColours: Story = {
  name: 'Colours — QSuper only',
  render: () => (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1.5 }}>
        <HeroIcon name="alert" brand="qsuper" size="xl" iconColor="default" />
        <Typography variant="small" sx={{ color: 'text.secondary' }}>Default (QSuper blue)</Typography>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1.5 }}>
        <Box sx={{ p: 2, bgcolor: 'background.brandPrimary', borderRadius: 2, display: 'inline-flex' }}>
          <HeroIcon name="alert" brand="qsuper" size="xl" iconColor="white" />
        </Box>
        <Typography variant="small" sx={{ color: 'text.secondary' }}>White (on blue)</Typography>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1.5 }}>
        <HeroIcon name="alert" brand="qsuper" size="xl" iconColor="quaternary" />
        <Typography variant="small" sx={{ color: 'text.secondary' }}>Quaternary (Light Blue)</Typography>
      </Box>
    </Box>
  ),
};

export const Gallery: Story = {
  render: (_args, context) => (
    <GalleryRender globalBrand={(context.globals['brand'] as string) || 'foundation'} />
  ),
  parameters: { controls: { disable: true } },
};

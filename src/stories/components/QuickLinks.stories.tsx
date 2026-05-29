import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { QuickLinks } from '../../components/QuickLinks';
import type { QuickLinksProps } from '../../components/QuickLinks';
import type { HeroIconBrand } from '../../components/HeroIcon';

const ART_ITEMS = [
  { label: 'Join ART',          href: '#join',         icon: 'Add to super' },
  { label: 'View performance',  href: '#performance',  icon: 'Achievement' },
  { label: 'Fees & costs',      href: '#fees',         icon: 'Calculator with money' },
  { label: 'Forms & resources', href: '#forms',        icon: 'Annual report' },
  { label: 'Mobile app',        href: '#mobile',       icon: 'App Icon' },
  { label: 'Contact us',        href: '#contact',      icon: 'Call' },
];

const QSUPER_ITEMS = [
  { label: 'Join QSuper',       href: '#join',         icon: 'join' },
  { label: 'View performance',  href: '#performance',  icon: 'performance_1' },
  { label: 'Fees & costs',      href: '#fees',         icon: 'dollar' },
  { label: 'Forms & resources', href: '#forms',        icon: 'checklist' },
  { label: 'Mobile app',        href: '#mobile',       icon: 'devices' },
  { label: 'Contact us',        href: '#contact',      icon: 'contact_centre' },
];

const BRAND_MAP: Record<string, { brand: HeroIconBrand; items: typeof ART_ITEMS }> = {
  foundation: { brand: 'art',    items: ART_ITEMS },
  'theme-b':  { brand: 'qsuper', items: QSUPER_ITEMS },
};

type SectionNavStoryArgs = Omit<QuickLinksProps, 'items' | 'brand'> & {
  itemCount: number;
  activeIndex: number;
};

const meta: Meta<SectionNavStoryArgs> = {
  title: 'Public web / Section navigation tab',
  // Custom story args differ from QuickLinksProps (we generate items via itemCount/activeIndex)
  // so Storybook's strict ComponentType<CustomArgs> check rejects the real component.
  component: QuickLinks as never,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Tab-style section navigation with hero icons and an active underline indicator. Supports 3–6 items. Icons and colours follow the active brand.',
      },
    },
  },
  argTypes: {
    itemCount: {
      control: 'select',
      options: [3, 4, 5, 6],
      description: 'Number of items to display (3–6).',
    },
    activeIndex: {
      control: 'select',
      options: [0, 1, 2, 3, 4, 5],
      description: 'Index of the currently active item.',
    },
    iconSize: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Size of the hero icon.',
    },
    activeHref: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<SectionNavStoryArgs>;

export const Default: Story = {
  render: ({ itemCount, iconSize, activeIndex }, context) => {
    const { brand, items } = BRAND_MAP[context.globals.brand ?? 'foundation'] ?? BRAND_MAP['foundation'];
    const sliced = items.slice(0, itemCount);
    return (
      <QuickLinks
        items={sliced}
        brand={brand}
        iconSize={iconSize}
        activeHref={sliced[activeIndex]?.href}
      />
    );
  },
  args: {
    itemCount: 6,
    activeIndex: 0,
    iconSize: 'md',
  },
};

export const ThreeItems: Story = {
  name: 'Three items (minimum)',
  render: (_, context) => {
    const { brand, items } = BRAND_MAP[context.globals.brand ?? 'foundation'] ?? BRAND_MAP['foundation'];
    const sliced = items.slice(0, 3);
    return <QuickLinks items={sliced} brand={brand} iconSize="md" activeHref={sliced[0].href} />;
  },
};

export const SixItems: Story = {
  name: 'Six items (maximum)',
  render: (_, context) => {
    const { brand, items } = BRAND_MAP[context.globals.brand ?? 'foundation'] ?? BRAND_MAP['foundation'];
    return <QuickLinks items={items} brand={brand} iconSize="md" activeHref={items[2].href} />;
  },
};

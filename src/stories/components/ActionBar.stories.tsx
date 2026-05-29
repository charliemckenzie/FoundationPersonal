import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ActionBar } from '../../components/ActionBar';
import type { ActionBarProps } from '../../components/ActionBar';
import { HeroIcon } from '../../components/HeroIcon';
import artIconList from '../../assets/icon-list-art.json';

// Placeholder for the decorative image slot — no external dependency required.
const DECORATIVE_PLACEHOLDER =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect width='400' height='300' fill='%23e2e8f0'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='18' fill='%2394a3b8'%3EDecorative image%3C/text%3E%3C/svg%3E";

const meta: Meta<typeof ActionBar> = {
  title: 'Components / Action Bar',
  component: ActionBar,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A promotional banner placed after a section of content. Combines a heading, supporting text, and a single CTA button.\n\nThree colour variants: `dark` (brand navy), `primary` (brand blue), and `light` (neutral tinted surface). Dark and primary use inverse (white) text and a reversed button. Light uses standard text and a primary button.\n\nThe image slot is optional. Provide an icon for compact placements, a decorative image for brand-led or lifestyle placements, or omit it entirely for text-only use.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['dark', 'primary', 'light'],
      description: '`dark` — brand navy. `primary` — brand primary blue. `light` — neutral tinted surface.',
    },
    title: { control: 'text' },
    description: { control: 'text' },
    image: { table: { disable: true } },
    action: { table: { disable: true } },
    sx: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof ActionBar>;

// ── Default (playground with icon + colour controls) ──────────────────────────

type DefaultArgs = ActionBarProps & { iconName: string; actionLabel: string };

export const ContainedIcon: StoryObj<DefaultArgs> = {
  name: 'Contained - Icon',
  parameters: {
    docs: {
      description: {
        story:
          'Use this layout when a brand icon adds visual weight to the message — for example, a product feature, a programme benefit, or a service category.\n\nThe icon sits to the left of the heading and copy. The CTA button anchors to the right on wider screens and stacks below on mobile.\n\nPick a **variant** to set the surface colour. Use `dark` or `primary` for high-contrast promotional placements. Use `light` for softer, embedded placements that sit within a white or grey page.',
      },
    },
  },
  args: {
    variant: 'dark',
    title: 'Title',
    description: 'Supporting description text goes here.',
    iconName: 'Goals',
    actionLabel: 'Label',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['dark', 'primary', 'light'],
      description: 'Background colour variant.',
    },
    iconName: {
      name: 'Icon',
      control: 'select',
      options: artIconList,
      description: 'Icon from the ART icon library.',
    },
    actionLabel: {
      name: 'Button label',
      control: 'text',
      description: 'CTA button label.',
    },
    image: { table: { disable: true } },
    action: { table: { disable: true } },
    sx: { table: { disable: true } },
  },
  render: ({ variant, title, description, iconName, actionLabel }) => (
    <ActionBar
      variant={variant}
      title={title}
      description={description}
      image={{
        icon: <HeroIcon name={iconName} size="xl" background="white" />,
        variant: 'icon',
      }}
      action={{ label: actionLabel ?? 'Label', onClick: () => {} }}
    />
  ),
};

// ── Contained with image ──────────────────────────────────────────────────────

type DecorativeArgs = ActionBarProps & { actionLabel: string };

export const ContainedWithImage: StoryObj<DecorativeArgs> = {
  name: 'Contained with image',
  parameters: {
    docs: {
      description: {
        story:
          'Use this layout for brand-led or lifestyle placements where a photograph or illustration adds emotional impact.\n\nThe image fills the left column — portrait aspect on wider screens, capped height on mobile. On small screens the image sits above the content and the layout stacks vertically.\n\nKeep the heading short and direct. The CTA button sits below the description.',
      },
    },
  },
  args: {
    variant: 'light',
    title: 'Title',
    description: 'Supporting description text goes here.',
    actionLabel: 'Label',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['dark', 'primary', 'light'],
      description: 'Background colour variant.',
    },
    actionLabel: {
      name: 'Button label',
      control: 'text',
      description: 'CTA button label.',
    },
    image: { table: { disable: true } },
    action: { table: { disable: true } },
    sx: { table: { disable: true } },
  },
  render: ({ variant, title, description, actionLabel }) => (
    <ActionBar
      variant={variant}
      title={title}
      description={description}
      image={{
        src: DECORATIVE_PLACEHOLDER,
        alt: 'Decorative image',
        variant: 'decorative',
      }}
      action={{ label: actionLabel ?? 'Label', onClick: () => {} }}
    />
  ),
};

// ── Contained - No Icon ────────────────────────────────────────────────────────

type NoIconArgs = ActionBarProps & { actionLabel: string };

export const ContainedNoIcon: StoryObj<NoIconArgs> = {
  name: 'Contained - No Icon',
  parameters: {
    docs: {
      description: {
        story: 'Icon is optional. Use this layout when supporting imagery isn\'t available or when a leaner, text-focused presentation suits the context. The heading and description fill the full available width. The CTA button anchors to the right on wider screens and stacks below on mobile.',
      },
    },
  },
  args: {
    variant: 'dark',
    title: 'Title',
    description: 'Supporting description text goes here.',
    actionLabel: 'Label',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['dark', 'primary', 'light'],
      description: 'Background colour variant.',
    },
    actionLabel: {
      name: 'Button label',
      control: 'text',
      description: 'CTA button label.',
    },
    image: { table: { disable: true } },
    action: { table: { disable: true } },
    sx: { table: { disable: true } },
  },
  render: ({ variant, title, description, actionLabel }) => (
    <ActionBar
      variant={variant}
      title={title}
      description={description}
      action={{ label: actionLabel ?? 'Label', onClick: () => {} }}
    />
  ),
};

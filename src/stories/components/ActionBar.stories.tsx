import type { Meta, StoryObj } from '@storybook/react';
import Box from '@mui/material/Box';
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
          'A promotional banner placed after a section of content. Combines a title, supporting text, and a CTA button. Supports an optional icon or decorative image. Three colour variants: `dark` (brand navy), `primary` (brand primary), and `light` (neutral tinted surface).',
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

// ── With icon image ────────────────────────────────────────────────────────────

export const WithIcon: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Icon image variant. The icon renders in a circular white container on the left; the CTA button sits on the right. Use for brand-coloured CTAs at the end of a content section.',
      },
    },
  },
  args: {
    variant: 'dark',
    title: 'Title',
    description: 'Supporting description text goes here.',
    image: { icon: <HeroIcon name="Goals" size="xl" background="white" />, variant: 'icon' },
    action: { label: 'Label', onClick: () => {} },
  },
};

// ── With decorative image ──────────────────────────────────────────────────────

export const WithDecorative: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Decorative image variant. The image fills the left column; the CTA button renders below the text. Use for lifestyle or brand storytelling placements.',
      },
    },
  },
  args: {
    variant: 'light',
    title: 'Title',
    description: 'Supporting description text goes here.',
    image: {
      src: DECORATIVE_PLACEHOLDER,
      alt: 'Decorative image',
      variant: 'decorative',
    },
    action: { label: 'Label', onClick: () => {} },
  },
};

// ── No image ───────────────────────────────────────────────────────────────────

export const NoImage: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Image is optional. Title and description fill the available space.',
      },
    },
  },
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, maxWidth: 800 }}>
      <ActionBar
        variant="dark"
        title="Title"
        description="Supporting description text goes here."
        action={{ label: 'Label', onClick: () => {} }}
      />
      <ActionBar
        variant="light"
        title="Title"
        description="Supporting description text goes here."
        action={{ label: 'Label', onClick: () => {} }}
      />
    </Box>
  ),
};

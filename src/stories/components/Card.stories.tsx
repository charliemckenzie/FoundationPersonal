import type { Meta, StoryObj } from '@storybook/react';
import Typography from '@mui/material/Typography';
import { Card } from '../../components/Card';

// A self-contained placeholder image — no external dependency required.
const PLACEHOLDER_IMAGE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='640' height='360'%3E%3Crect width='640' height='360' fill='%23e2e8f0'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='20' fill='%2394a3b8'%3ECard image%3C/text%3E%3C/svg%3E";

const meta: Meta<typeof Card> = {
  title: 'Components / Card',
  component: Card,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    variant: {
      control: 'select',
      options: ['contained', 'open'],
      description: '`contained` — paper background with free-form children. `open` — image + content + actions.',
    },
    title: { control: 'text', description: 'Open variant only. Card heading.' },
    subtitle: { control: 'text', description: 'Open variant only. Line below the title.' },
    imageSrc: { control: 'text', description: 'Open variant only. Path to image in /public.' },
    imageAlt: { control: 'text', description: 'Alt text for the image. Leave empty for decorative images.' },
    href: { control: 'text', description: 'Makes the whole card a link. Ignores action buttons.' },
    onClick: { table: { disable: true } },
    primaryAction: { table: { disable: true } },
    secondaryAction: { table: { disable: true } },
    children: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

// --- Contained ---

export const Contained: Story = {
  args: { variant: 'contained' },
  render: (args) => (
    <Card {...args} sx={{ maxWidth: 368 }}>
      <Typography variant="h5" component="h3" sx={{ color: 'text.heading', mb: 1 }}>
        Card title
      </Typography>
      <Typography variant="body" component="p" sx={{ color: 'text.primary' }}>
        Free-form content lives here. Drop in any combination of text, lists, or other components.
      </Typography>
    </Card>
  ),
};

export const ContainedInteractive: Story = {
  name: 'Contained — interactive (whole card)',
  args: { variant: 'contained' },
  render: (args) => (
    <Card {...args} onClick={() => alert('Card clicked')} style={{ maxWidth: 400 }}>
      <Typography variant="h5" component="h3" sx={{ color: 'text.heading', mb: 1 }}>
        Clickable card
      </Typography>
      <Typography variant="body" component="p" sx={{ color: 'text.primary' }}>
        The entire card surface is interactive. Hover to see the ripple effect.
      </Typography>
    </Card>
  ),
};

// --- Open ---

export const OpenWithActions: Story = {
  name: 'Open — image + actions',
  args: {
    variant: 'open',
    imageSrc: PLACEHOLDER_IMAGE,
    imageAlt: '',
    title: 'Card heading',
    subtitle: 'Supporting detail line',
  },
  render: (args) => (
    <Card
      {...args}
      primaryAction={{ label: 'Get started', onClick: () => {} }}
      secondaryAction={{ label: 'Learn more', onClick: () => {} }}
      sx={{ maxWidth: 368 }}
    >
      <Typography variant="body" component="p" sx={{ color: 'text.primary' }}>
        Body content sits between the subtitle and the action buttons.
      </Typography>
    </Card>
  ),
};

export const OpenNoImage: Story = {
  name: 'Open — no image',
  args: {
    variant: 'open',
    title: 'No image variant',
    subtitle: 'Use when imagery is unavailable or unnecessary.',
  },
  render: (args) => (
    <Card
      {...args}
      primaryAction={{ label: 'Get started', onClick: () => {} }}
      sx={{ maxWidth: 368 }}
    >
      <Typography variant="body" component="p" sx={{ color: 'text.primary' }}>
        The image slot is optional — the card still works without it.
      </Typography>
    </Card>
  ),
};

export const OpenInteractive: Story = {
  name: 'Open — interactive (whole card)',
  args: {
    variant: 'open',
    imageSrc: PLACEHOLDER_IMAGE,
    imageAlt: '',
    title: 'Clickable card',
    subtitle: 'The entire card is the call-to-action. No action buttons shown.',
  },
  render: (args) => (
    <Card {...args} onClick={() => alert('Card clicked')} sx={{ maxWidth: 368 }}>
      <Typography variant="body" component="p" sx={{ color: 'text.primary' }}>
        When the card has an onClick or href, action buttons are suppressed automatically.
      </Typography>
    </Card>
  ),
};

export const OpenAsLink: Story = {
  name: 'Open — href link card',
  args: {
    variant: 'open',
    imageSrc: PLACEHOLDER_IMAGE,
    imageAlt: '',
    title: 'Link card',
    subtitle: 'Renders the whole card as an anchor element.',
    href: '#',
  },
  render: (args) => (
    <Card {...args} sx={{ maxWidth: 368 }}>
      <Typography variant="body" component="p" sx={{ color: 'text.primary' }}>
        Pass an href to turn the entire card into a semantic link.
      </Typography>
    </Card>
  ),
};

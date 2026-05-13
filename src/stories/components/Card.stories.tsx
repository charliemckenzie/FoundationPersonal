import type { ComponentProps } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Typography from '@mui/material/Typography';
import { Card } from '../../components/Card';
import { HeroIcon } from '../../components/HeroIcon';
import type { HeroIconBackground } from '../../components/HeroIcon';
import { TextButton } from '../../components/TextButton';
import artIcons from '../../assets/icon-list-art.json';

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

// --- Contained — icon feature ---

type OpenIconArgs = ComponentProps<typeof Card> & {
  iconName: string;
  iconBackground: HeroIconBackground;
};

export const OpenIcon: StoryObj<OpenIconArgs> = {
  name: 'Contained — icon feature',
  parameters: {
    docs: {
      description: {
        story:
          '`variant="contained"` card with a **HeroIcon** (5.5rem container, 2.75rem icon) in place of an image. The icon is **decorative** — do not pass `aria-label`; the heading communicates the topic. The 50% icon-to-container ratio is intentionally more open than the standard HeroIcon ratio (57%) — the larger circle benefits from extra breathing room. Use the **Icon** and **Icon background** controls to preview combinations; set the `component` prop on the heading to match the surrounding page hierarchy.',
      },
    },
  },
  argTypes: {
    iconName: {
      control: 'select',
      options: artIcons,
      description: 'Icon from the ART icon set.',
    },
    iconBackground: {
      control: 'select',
      options: ['none', 'brand', 'white', 'grey'] satisfies HeroIconBackground[],
      description: 'Circular background colour behind the icon.',
    },
  },
  args: {
    variant: 'contained',
    iconName: 'Calculator',
    iconBackground: 'brand',
  },
  render: ({ iconName, iconBackground, ...args }) => (
    <Card {...args} sx={{ maxWidth: 368 }}>
      <HeroIcon
        name={iconName}
        brand="art"
        iconSizeOverride="2.75rem"
        containerSizeOverride="5.5rem"
        background={iconBackground}
      />
      <Typography variant="h5" component="h3" sx={{ color: 'text.heading', mt: 3, mb: 1 }}>
        Card heading
      </Typography>
      <Typography variant="body" component="p" sx={{ color: 'text.primary', mb: { xs: 3, sm: 4 } }}>
        Supporting body copy sits here. Use it to describe the feature or topic this card represents.
      </Typography>
      <TextButton label="Learn more about this feature" endIcon="arrow-right" />
    </Card>
  ),
};

// --- Open ---

type OpenWithActionsArgs = ComponentProps<typeof Card> & { showSubtitle: boolean };

export const OpenWithActions: StoryObj<OpenWithActionsArgs> = {
  name: 'Open — image + actions',
  parameters: {
    docs: {
      description: {
        story:
          'The standard open card with image, copy, and action buttons. Use the **Show subtitle** toggle to show or hide the supporting detail line — useful for testing layouts where a subtitle is not always available. Action buttons carry contextual `aria-label` attributes (e.g. "Get started: Card heading") so screen reader users can distinguish buttons across multiple cards on the same page.',
      },
    },
  },
  argTypes: {
    showSubtitle: { control: 'boolean', description: 'Show or hide the supporting detail line.' },
    subtitle: { table: { disable: true } },
  },
  args: {
    variant: 'open',
    imageSrc: PLACEHOLDER_IMAGE,
    imageAlt: '',
    title: 'Card heading',
    showSubtitle: true,
  },
  render: ({ showSubtitle, ...args }) => (
    <Card
      {...args}
      subtitle={showSubtitle ? 'Supporting detail line' : undefined}
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

type OpenNoImageArgs = ComponentProps<typeof Card> & { showSubtitle: boolean };

export const OpenNoImage: StoryObj<OpenNoImageArgs> = {
  name: 'Open — no image',
  parameters: {
    docs: {
      description: {
        story:
          'Open card variant without an image. Use when imagery is unavailable or unnecessary — layout adapts to fill the space. Use the **Show subtitle** toggle to test single-line versus two-line copy configurations.',
      },
    },
  },
  argTypes: {
    showSubtitle: { control: 'boolean', description: 'Show or hide the supporting detail line.' },
    subtitle: { table: { disable: true } },
  },
  args: {
    variant: 'open',
    title: 'No image variant',
    showSubtitle: true,
  },
  render: ({ showSubtitle, ...args }) => (
    <Card
      {...args}
      subtitle={showSubtitle ? 'Use when imagery is unavailable or unnecessary.' : undefined}
      primaryAction={{ label: 'Get started', onClick: () => {} }}
      sx={{ maxWidth: 368 }}
    >
      <Typography variant="body" component="p" sx={{ color: 'text.primary' }}>
        The image slot is optional — the card still works without it.
      </Typography>
    </Card>
  ),
};

type OpenInteractiveArgs = ComponentProps<typeof Card> & { showSubtitle: boolean };

export const OpenInteractive: StoryObj<OpenInteractiveArgs> = {
  name: 'Open — interactive (whole card)',
  parameters: {
    docs: {
      description: {
        story:
          'Open card where the entire surface is a clickable button. Action buttons are suppressed automatically — they cannot coexist with a card-level interaction. The `CardActionArea` carries `aria-label={title}` so screen readers announce the card by its heading regardless of **Show subtitle** state.',
      },
    },
  },
  argTypes: {
    showSubtitle: { control: 'boolean', description: 'Show or hide the supporting detail line.' },
    subtitle: { table: { disable: true } },
  },
  args: {
    variant: 'open',
    imageSrc: PLACEHOLDER_IMAGE,
    imageAlt: '',
    title: 'Clickable card',
    showSubtitle: true,
  },
  render: ({ showSubtitle, ...args }) => (
    <Card
      {...args}
      subtitle={showSubtitle ? 'The entire card is the call-to-action. No action buttons shown.' : undefined}
      onClick={() => alert('Card clicked')}
      sx={{ maxWidth: 368 }}
    >
      <Typography variant="body" component="p" sx={{ color: 'text.primary' }}>
        When the card has an onClick or href, action buttons are suppressed automatically.
      </Typography>
    </Card>
  ),
};

type OpenAsLinkArgs = ComponentProps<typeof Card> & { showSubtitle: boolean };

export const OpenAsLink: StoryObj<OpenAsLinkArgs> = {
  name: 'Open — href link card',
  parameters: {
    docs: {
      description: {
        story:
          'Open card rendered as an anchor element via `href`. No action buttons — the whole card is the link target. Use the **Show subtitle** toggle to verify the accessible name stays stable; `aria-label={title}` is applied to the `CardActionArea` so the linked label never includes subtitle text.',
      },
    },
  },
  argTypes: {
    showSubtitle: { control: 'boolean', description: 'Show or hide the supporting detail line.' },
    subtitle: { table: { disable: true } },
  },
  args: {
    variant: 'open',
    imageSrc: PLACEHOLDER_IMAGE,
    imageAlt: '',
    title: 'Link card',
    showSubtitle: true,
    href: '#',
  },
  render: ({ showSubtitle, ...args }) => (
    <Card
      {...args}
      subtitle={showSubtitle ? 'Renders the whole card as an anchor element.' : undefined}
      sx={{ maxWidth: 368 }}
    >
      <Typography variant="body" component="p" sx={{ color: 'text.primary' }}>
        Pass an href to turn the entire card into a semantic link.
      </Typography>
    </Card>
  ),
};

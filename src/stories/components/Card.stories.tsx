import type { ComponentProps } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
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
      options: ['contained', 'open', 'promo'],
      description: '`contained` — paper background with free-form children. `open` — image + content + actions. `promo` — horizontal layout with image on the left.',
    },
    title: { table: { disable: true } },
    imageSrc: { table: { disable: true } },
    imageAlt: { table: { disable: true } },
    badge: { table: { disable: true } },
    sx: { table: { disable: true } },
    primaryAction: { table: { disable: true } },
    secondaryAction: { table: { disable: true } },
    children: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

// --- Playground ---

type PlaygroundVariant =
  | 'Contained'
  | 'Contained — icon feature'
  | 'Open — image + actions'
  | 'Open — no image';

interface PlaygroundArgs {
  storyVariant: PlaygroundVariant;
}

const PLAYGROUND_VARIANTS: PlaygroundVariant[] = [
  'Contained',
  'Contained — icon feature',
  'Open — image + actions',
  'Open — no image',
];

function PlaygroundCard({ storyVariant }: PlaygroundArgs) {
  if (storyVariant === 'Contained') {
    return (
      <Card variant="contained" sx={{ maxWidth: 368 }}>
        <Typography variant="h5" component="h3" sx={{ color: 'text.heading', mb: 1 }}>
          Card title
        </Typography>
        <Typography variant="body" component="p" sx={{ color: 'text.primary' }}>
          Free-form content lives here. Drop in any combination of text, lists, or other components.
        </Typography>
      </Card>
    );
  }

  if (storyVariant === 'Contained — icon feature') {
    return (
      <Card variant="contained" sx={{ maxWidth: 368 }}>
        <HeroIcon name="Calculator" brand="art" iconSizeOverride="2.75rem" containerSizeOverride="5.5rem" background="brand" />
        <Typography variant="h5" component="h3" sx={{ color: 'text.heading', mt: 3, mb: 1 }}>
          Card heading
        </Typography>
        <Typography variant="body" component="p" sx={{ color: 'text.primary', mb: { xs: 3, sm: 4 } }}>
          Supporting body copy sits here. Use it to describe the feature or topic this card represents.
        </Typography>
        <TextButton label="Learn more about this feature" endIcon="arrow-right" />
      </Card>
    );
  }

  if (storyVariant === 'Open — image + actions') {
    return (
      <Card
        variant="open"
        imageSrc={PLACEHOLDER_IMAGE}
        imageAlt=""
        title="Card heading"
        primaryAction={{ label: 'Get started', onClick: () => {} }}
        secondaryAction={{ label: 'Learn more', onClick: () => {} }}
        sx={{ maxWidth: 368 }}
      >
        <Typography variant="body" component="p" sx={{ color: 'text.primary' }}>
          Body content sits here.
        </Typography>
      </Card>
    );
  }

  if (storyVariant === 'Open — no image') {
    return (
      <Card
        variant="open"
        title="No image variant"
        primaryAction={{ label: 'Get started', onClick: () => {} }}
        sx={{ maxWidth: 368 }}
      >
        <Typography variant="body" component="p" sx={{ color: 'text.primary' }}>
          The image slot is optional — the card still works without it.
        </Typography>
      </Card>
    );
  }

  return null;
}

export const Playground: StoryObj<PlaygroundArgs> = {
  name: 'Playground',
  parameters: {
    docs: {
      description: {
        story: 'Explore all Card layouts in one place. Use the **Variant** dropdown to switch between them.',
      },
    },
  },
  argTypes: {
    storyVariant: {
      name: 'Variant',
      control: 'select',
      options: PLAYGROUND_VARIANTS,
      description: 'Switch between all available Card layouts.',
    },
  },
  args: {
    storyVariant: 'Contained',
  },
  render: (args) => <PlaygroundCard {...args} />,
};

// --- Contained ---

export const Contained: StoryObj<ComponentProps<typeof Card>> = {
  name: 'Contained',
  parameters: {
    docs: {
      description: {
        story:
          'The contained card is a flexible surface for grouping related content. Use it when the content doesn\'t follow a fixed layout — for example, a mix of text, data, or other components.\n\nThere are no fixed slots. Anything placed inside the card is laid out top to bottom. Keep content focused on a single topic.',
      },
    },
  },
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
          'Use this layout when a feature or topic is better represented by an icon than a photograph — for example, services, categories, or tools.\n\n**Icon background** sets the visual tone. Choose **brand** for primary features, **grey** for neutral content, and **white** when the card sits on a coloured surface.\n\nPair with a short, clear heading and one or two lines of supporting copy. The text button is optional — only include it when there is a clear next step for the user.',
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

type OpenWithActionsArgs = ComponentProps<typeof Card> & { showBadge: boolean; badgeLabel: string };

export const OpenWithActions: StoryObj<OpenWithActionsArgs> = {
  name: 'Open — image + actions',
  parameters: {
    docs: {
      description: {
        story:
          'Use this layout for a compact, scannable row — icon on the left, heading and supporting copy in the centre, and an action on the right.\n\nA good fit for feature lists, service tiles, or any content where multiple items sit in a vertical stack and need to stay visually consistent.\n\n**Icon background** sets the visual tone. Choose **brand** for primary features, **grey** for neutral content, and **white** when the card sits on a coloured surface.\n\nKeep the heading short — one line where possible. If a row needs more than two lines of supporting copy, consider the vertical icon variant instead.',
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
    showPrimaryAction: { control: 'boolean', description: 'Show or hide the primary action button.' },
    showSecondaryAction: { control: 'boolean', description: 'Show or hide the secondary action button.' },
    showTextButton: { control: 'boolean', description: 'Show or hide the text button.' },
  },
  args: {
    variant: 'contained',
    iconName: 'Calculator',
    iconBackground: 'brand',
    showPrimaryAction: true,
    showSecondaryAction: false,
    showTextButton: false,
  },
  render: ({ iconName, iconBackground, showPrimaryAction, showSecondaryAction, showTextButton, ...args }) => (
    <Card {...args}>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: { xs: 'flex-start', sm: 'center' }, gap: { xs: 2, sm: 3 } }}>
        <Box sx={{ flexShrink: 0 }}>
          <HeroIcon
            name={iconName}
            brand="art"
            iconSizeOverride="2rem"
            containerSizeOverride="4rem"
            background={iconBackground}
          />
        </Box>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography variant="h5" component="h3" sx={{ color: 'text.heading', mb: 1 }}>
            Card heading
          </Typography>
          <Typography variant="body" component="p" sx={{ color: 'text.primary' }}>
            Supporting copy sits here. Keep it short — one or two sentences.
          </Typography>
        </Box>
        {(showPrimaryAction || showSecondaryAction || showTextButton) && (
          <Box sx={{ display: 'flex', flexDirection: { xs: 'row', sm: 'column', md: 'row' }, gap: 1, flexShrink: 0, flexWrap: 'wrap' }}>
            {showPrimaryAction && (
              <Button label="Learn more" variant="contained" size="medium" onClick={() => {}} />
            )}
            {showSecondaryAction && (
              <Button label="Learn more" variant="outlined" size="medium" onClick={() => {}} />
            )}
            {showTextButton && (
              <TextButton label="Learn more" endIcon="arrow-right" />
            )}
          </Box>
        )}
      </Box>
    </Card>
  ),
};

// --- Open ---

type OpenWithActionsArgs = ComponentProps<typeof Card> & { showBadge: boolean; badgeLabel: string };

export const OpenWithActions: StoryObj<OpenWithActionsArgs> = {
  name: 'Open — image + actions',
  parameters: {
    docs: {
      description: {
        story:
          'The standard card layout — image at the top, heading, supporting copy, and action buttons below.\n\nUse a **primary action** for the main next step and a **secondary action** for an alternative — for example, "Get started" and "Learn more". Avoid using two actions of equal weight.\n\nUse the **Show badge** toggle to overlay a pill label on the image — for example, an audience label or content category.',
      },
    },
  },
  argTypes: {
    showBadge: { control: 'boolean', description: 'Show or hide the image pill.' },
    badgeLabel: { control: 'text', description: 'Text displayed inside the image pill.' },
  },
  args: {
    variant: 'open',
    imageSrc: PLACEHOLDER_IMAGE,
    imageAlt: '',
    title: 'Card heading',
    showBadge: false,
    badgeLabel: 'New members',
  },
  render: ({ showBadge, badgeLabel, ...args }) => (
    <Card
      {...args}
      badge={showBadge ? badgeLabel : undefined}
      primaryAction={{ label: 'Get started', onClick: () => {} }}
      secondaryAction={{ label: 'Learn more', onClick: () => {} }}
      sx={{ maxWidth: 368 }}
    >
      <Typography variant="body" component="p" sx={{ color: 'text.primary' }}>
        Body content sits here.
      </Typography>
    </Card>
  ),
};

export const OpenNoImage: Story = {
  name: 'Open — no image',
  parameters: {
    docs: {
      description: {
        story:
          'Use this layout when imagery isn\'t available or would add visual clutter. The card still works — the content fills the space cleanly without the image.\n\nA good fit for text-heavy content like notifications, summaries, or plain informational cards.',
      },
    },
  },
  args: {
    variant: 'open',
    title: 'No image variant',
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

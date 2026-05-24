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

// Portrait placeholder for the promo variant's left-hand image slot.
const PROMO_PLACEHOLDER_IMAGE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='480'%3E%3Crect width='400' height='480' fill='%23e2e8f0'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='18' fill='%2394a3b8'%3EPromo image%3C/text%3E%3C/svg%3E";

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
    subtitle: { table: { disable: true } },
    imageSrc: { table: { disable: true } },
    imageAlt: { table: { disable: true } },
    href: { table: { disable: true } },
    badge: { table: { disable: true } },
    sx: { table: { disable: true } },
    onClick: { table: { disable: true } },
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
  | 'Contained — interactive (whole card)'
  | 'Contained — icon feature'
  | 'Contained — horizontal + icon'
  | 'Open — image + actions'
  | 'Open — no image'
  | 'Open — interactive (whole card)'
  | 'Open — href link card'
  | 'Open — horizontal image + actions';

interface PlaygroundArgs {
  storyVariant: PlaygroundVariant;
  showSubtitle: boolean;
}

const PLAYGROUND_VARIANTS: PlaygroundVariant[] = [
  'Contained',
  'Contained — interactive (whole card)',
  'Contained — icon feature',
  'Contained — horizontal + icon',
  'Open — image + actions',
  'Open — no image',
  'Open — interactive (whole card)',
  'Open — href link card',
  'Open — horizontal image + actions',
];

function PlaygroundCard({ storyVariant, showSubtitle }: PlaygroundArgs) {
  if (storyVariant === 'Contained') {
    return (
      <Card variant="contained" sx={{ maxWidth: 368 }}>
        <Typography variant="h5" component="h3" sx={{ color: 'text.heading', mb: showSubtitle ? 0.5 : 1 }}>
          Card title
        </Typography>
        {showSubtitle && (
          <Typography variant="body" component="p" sx={{ color: 'text.secondary', mb: 1 }}>
            Supporting detail line
          </Typography>
        )}
        <Typography variant="body" component="p" sx={{ color: 'text.primary' }}>
          Free-form content lives here. Drop in any combination of text, lists, or other components.
        </Typography>
      </Card>
    );
  }

  if (storyVariant === 'Contained — interactive (whole card)') {
    return (
      <Card variant="contained" onClick={() => {}} sx={{ maxWidth: 368 }}>
        <Typography variant="h5" component="h3" sx={{ color: 'text.heading', mb: showSubtitle ? 0.5 : 1 }}>
          Clickable card
        </Typography>
        {showSubtitle && (
          <Typography variant="body" component="p" sx={{ color: 'text.secondary', mb: 1 }}>
            Supporting detail line
          </Typography>
        )}
        <Typography variant="body" component="p" sx={{ color: 'text.primary' }}>
          The entire card surface is interactive. Hover to see the ripple effect.
        </Typography>
      </Card>
    );
  }

  if (storyVariant === 'Contained — icon feature') {
    return (
      <Card variant="contained" sx={{ maxWidth: 368 }}>
        <HeroIcon name="Calculator" brand="art" iconSizeOverride="2.75rem" containerSizeOverride="5.5rem" background="brand" />
        <Typography variant="h5" component="h3" sx={{ color: 'text.heading', mt: 3, mb: showSubtitle ? 0.5 : 1 }}>
          Card heading
        </Typography>
        {showSubtitle && (
          <Typography variant="body" component="p" sx={{ color: 'text.secondary', mb: 1 }}>
            Supporting detail line
          </Typography>
        )}
        <Typography variant="body" component="p" sx={{ color: 'text.primary', mb: { xs: 3, sm: 4 } }}>
          Supporting body copy sits here. Use it to describe the feature or topic this card represents.
        </Typography>
        <TextButton label="Learn more about this feature" endIcon="arrow-right" />
      </Card>
    );
  }

  if (storyVariant === 'Contained — horizontal + icon') {
    return (
      <Card variant="contained">
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: { xs: 'flex-start', sm: 'center' }, gap: { xs: 2, sm: 3 } }}>
          <Box sx={{ flexShrink: 0 }}>
            <HeroIcon name="Calculator" brand="art" iconSizeOverride="2rem" containerSizeOverride="4rem" background="brand" />
          </Box>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography variant="h5" component="h3" sx={{ color: 'text.heading', mb: 1 }}>
              Card heading
            </Typography>
            {showSubtitle && (
              <Typography variant="small" component="p" sx={{ color: 'text.primary', mb: 1 }}>
                Supporting detail line
              </Typography>
            )}
            <Typography variant="body" component="p" sx={{ color: 'text.primary' }}>
              Supporting copy sits here. Keep it short — one or two sentences.
            </Typography>
          </Box>
          <Box sx={{ flexShrink: 0 }}>
            <Button label="Learn more" variant="contained" size="medium" onClick={() => {}} />
          </Box>
        </Box>
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
        subtitle={showSubtitle ? 'Supporting detail line' : undefined}
        primaryAction={{ label: 'Get started', onClick: () => {} }}
        secondaryAction={{ label: 'Learn more', onClick: () => {} }}
        sx={{ maxWidth: 368 }}
      >
        <Typography variant="body" component="p" sx={{ color: 'text.primary' }}>
          Body content sits between the subtitle and the action buttons.
        </Typography>
      </Card>
    );
  }

  if (storyVariant === 'Open — no image') {
    return (
      <Card
        variant="open"
        title="No image variant"
        subtitle={showSubtitle ? 'Use when imagery is unavailable or unnecessary.' : undefined}
        primaryAction={{ label: 'Get started', onClick: () => {} }}
        sx={{ maxWidth: 368 }}
      >
        <Typography variant="body" component="p" sx={{ color: 'text.primary' }}>
          The image slot is optional — the card still works without it.
        </Typography>
      </Card>
    );
  }

  if (storyVariant === 'Open — interactive (whole card)') {
    return (
      <Card
        variant="open"
        imageSrc={PLACEHOLDER_IMAGE}
        imageAlt=""
        title="Clickable card"
        subtitle={showSubtitle ? 'The entire card is the call-to-action. No action buttons shown.' : undefined}
        onClick={() => {}}
        sx={{ maxWidth: 368 }}
      >
        <Typography variant="body" component="p" sx={{ color: 'text.primary' }}>
          When the card has an onClick or href, action buttons are suppressed automatically.
        </Typography>
      </Card>
    );
  }

  if (storyVariant === 'Open — href link card') {
    return (
      <Card
        variant="open"
        imageSrc={PLACEHOLDER_IMAGE}
        imageAlt=""
        title="Link card"
        subtitle={showSubtitle ? 'Renders the whole card as an anchor element.' : undefined}
        href="#"
        sx={{ maxWidth: 368 }}
      >
        <Typography variant="body" component="p" sx={{ color: 'text.primary' }}>
          Pass an href to turn the entire card into a semantic link.
        </Typography>
      </Card>
    );
  }

  // Open — horizontal image + actions
  return (
    <Card
      variant="promo"
      imageSrc={PROMO_PLACEHOLDER_IMAGE}
      imageAlt=""
      title="Card heading"
      subtitle={showSubtitle ? 'Supporting detail line' : undefined}
      primaryAction={{ label: 'Primary action', onClick: () => {} }}
    >
      <Typography variant="body" component="p" sx={{ color: 'text.primary' }}>
        Supporting copy sits here. Keep it short — one or two sentences that build on the heading.
      </Typography>
    </Card>
  );
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
    showSubtitle: {
      name: 'Show subtitle',
      control: 'boolean',
      description: 'Show or hide the supporting detail line.',
    },
  },
  args: {
    storyVariant: 'Contained',
    showSubtitle: false,
  },
  render: (args) => <PlaygroundCard {...args} />,
};

// --- Contained ---

type ContainedArgs = ComponentProps<typeof Card> & { showSubtitle: boolean };

export const Contained: StoryObj<ContainedArgs> = {
  name: 'Contained',
  parameters: {
    docs: {
      description: {
        story:
          'The contained card is a flexible surface for grouping related content. Use it when the content doesn\'t follow a fixed layout — for example, a mix of text, data, or other components.\n\nThere are no fixed slots. Anything placed inside the card is laid out top to bottom. Keep content focused on a single topic.',
      },
    },
  },
  argTypes: {
    showSubtitle: { control: 'boolean', description: 'Show or hide the supporting detail line.' },
  },
  args: { variant: 'contained', showSubtitle: false },
  render: ({ showSubtitle, ...args }) => (
    <Card {...args} sx={{ maxWidth: 368 }}>
      <Typography variant="h5" component="h3" sx={{ color: 'text.heading', mb: showSubtitle ? 0.5 : 1 }}>
        Card title
      </Typography>
      {showSubtitle && (
        <Typography variant="body" component="p" sx={{ color: 'text.secondary', mb: 1 }}>
          Supporting detail line
        </Typography>
      )}
      <Typography variant="body" component="p" sx={{ color: 'text.primary' }}>
        Free-form content lives here. Drop in any combination of text, lists, or other components.
      </Typography>
    </Card>
  ),
};

type ContainedInteractiveArgs = ComponentProps<typeof Card> & { showSubtitle: boolean };

export const ContainedInteractive: StoryObj<ContainedInteractiveArgs> = {
  name: 'Contained — interactive (whole card)',
  parameters: {
    docs: {
      description: {
        story:
          'Use this when the entire card is the call-to-action — for example, a navigation tile or a selectable option.\n\nHovering or focusing the card reveals a subtle highlight. There are no separate action buttons; the card itself is the interaction.\n\nKeep the heading clear and specific — it becomes the label for the action.',
      },
    },
  },
  argTypes: {
    showSubtitle: { control: 'boolean', description: 'Show or hide the supporting detail line.' },
  },
  args: { variant: 'contained', showSubtitle: false },
  render: ({ showSubtitle, ...args }) => (
    <Card {...args} onClick={() => alert('Card clicked')} sx={{ maxWidth: 400 }}>
      <Typography variant="h5" component="h3" sx={{ color: 'text.heading', mb: showSubtitle ? 0.5 : 1 }}>
        Clickable card
      </Typography>
      {showSubtitle && (
        <Typography variant="body" component="p" sx={{ color: 'text.secondary', mb: 1 }}>
          Supporting detail line
        </Typography>
      )}
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
  showSubtitle: boolean;
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
    showSubtitle: { control: 'boolean', description: 'Show or hide the supporting detail line.' },
  },
  args: {
    variant: 'contained',
    iconName: 'Calculator',
    iconBackground: 'brand',
    showSubtitle: false,
  },
  render: ({ iconName, iconBackground, showSubtitle, ...args }) => (
    <Card {...args} sx={{ maxWidth: 368 }}>
      <HeroIcon
        name={iconName}
        brand="art"
        iconSizeOverride="2.75rem"
        containerSizeOverride="5.5rem"
        background={iconBackground}
      />
      <Typography variant="h5" component="h3" sx={{ color: 'text.heading', mt: 3, mb: showSubtitle ? 0.5 : 1 }}>
        Card heading
      </Typography>
      {showSubtitle && (
        <Typography variant="body" component="p" sx={{ color: 'text.secondary', mb: 1 }}>
          Supporting detail line
        </Typography>
      )}
      <Typography variant="body" component="p" sx={{ color: 'text.primary', mb: { xs: 3, sm: 4 } }}>
        Supporting body copy sits here. Use it to describe the feature or topic this card represents.
      </Typography>
      <TextButton label="Learn more about this feature" endIcon="arrow-right" />
    </Card>
  ),
};

// --- Contained — horizontal + icon ---

type ContainedHorizontalIconArgs = ComponentProps<typeof Card> & {
  iconName: string;
  iconBackground: HeroIconBackground;
  showSubtitle: boolean;
  showPrimaryAction: boolean;
  showSecondaryAction: boolean;
  showTextButton: boolean;
};

export const ContainedHorizontalIcon: StoryObj<ContainedHorizontalIconArgs> = {
  name: 'Contained — horizontal + icon',
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
    showSubtitle: { control: 'boolean', description: 'Show or hide the supporting detail line.' },
    showPrimaryAction: { control: 'boolean', description: 'Show or hide the primary action button.' },
    showSecondaryAction: { control: 'boolean', description: 'Show or hide the secondary action button.' },
    showTextButton: { control: 'boolean', description: 'Show or hide the text button.' },
  },
  args: {
    variant: 'contained',
    iconName: 'Calculator',
    iconBackground: 'brand',
    showSubtitle: false,
    showPrimaryAction: true,
    showSecondaryAction: false,
    showTextButton: false,
  },
  render: ({ iconName, iconBackground, showSubtitle, showPrimaryAction, showSecondaryAction, showTextButton, ...args }) => (
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
          {showSubtitle && (
            <Typography variant="small" component="p" sx={{ color: 'text.primary', mb: 1 }}>
              Supporting detail line
            </Typography>
          )}
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

type OpenWithActionsArgs = ComponentProps<typeof Card> & { showSubtitle: boolean; showBadge: boolean; badgeLabel: string };

export const OpenWithActions: StoryObj<OpenWithActionsArgs> = {
  name: 'Open — image + actions',
  parameters: {
    docs: {
      description: {
        story:
          'The standard card layout — image at the top, heading, supporting copy, and action buttons below.\n\nUse the **Show subtitle** toggle to preview the layout with and without a supporting detail line. Not every card needs one; only include it when it adds meaningful context to the heading.\n\nUse a **primary action** for the main next step and a **secondary action** for an alternative — for example, "Get started" and "Learn more". Avoid using two actions of equal weight.\n\nUse the **Show badge** toggle to overlay a pill label on the image — for example, an audience label or content category.',
      },
    },
  },
  argTypes: {
    showSubtitle: { control: 'boolean', description: 'Show or hide the supporting detail line.' },
    showBadge: { control: 'boolean', description: 'Show or hide the image pill.' },
    badgeLabel: { control: 'text', description: 'Text displayed inside the image pill.' },
    subtitle: { table: { disable: true } },
  },
  args: {
    variant: 'open',
    imageSrc: PLACEHOLDER_IMAGE,
    imageAlt: '',
    title: 'Card heading',
    showSubtitle: true,
    showBadge: false,
    badgeLabel: 'New members',
  },
  render: ({ showSubtitle, showBadge, badgeLabel, ...args }) => (
    <Card
      {...args}
      subtitle={showSubtitle ? 'Supporting detail line' : undefined}
      badge={showBadge ? badgeLabel : undefined}
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
          'Use this layout when imagery isn\'t available or would add visual clutter. The card still works — the content fills the space cleanly without the image.\n\nA good fit for text-heavy content like notifications, summaries, or plain informational cards.\n\nToggle the subtitle to check how the layout holds up with and without the supporting line.',
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

type OpenInteractiveArgs = ComponentProps<typeof Card> & { showSubtitle: boolean; showBadge: boolean; badgeLabel: string };

export const OpenInteractive: StoryObj<OpenInteractiveArgs> = {
  name: 'Open — interactive (whole card)',
  parameters: {
    docs: {
      description: {
        story:
          'Use this when the whole card is a single call-to-action — for example, navigating to a detail page or selecting an option.\n\nAction buttons are not shown when the card itself is interactive. The entire surface — image, heading, and copy — responds to hover and click.\n\nAvoid placing unrelated links or interactive elements inside an interactive card.',
      },
    },
  },
  argTypes: {
    showSubtitle: { control: 'boolean', description: 'Show or hide the supporting detail line.' },
    showBadge: { control: 'boolean', description: 'Show or hide the image pill.' },
    badgeLabel: { control: 'text', description: 'Text displayed inside the image pill.' },
    subtitle: { table: { disable: true } },
  },
  args: {
    variant: 'open',
    imageSrc: PLACEHOLDER_IMAGE,
    imageAlt: '',
    title: 'Clickable card',
    showSubtitle: true,
    showBadge: false,
    badgeLabel: 'New members',
  },
  render: ({ showSubtitle, showBadge, badgeLabel, ...args }) => (
    <Card
      {...args}
      subtitle={showSubtitle ? 'The entire card is the call-to-action. No action buttons shown.' : undefined}
      badge={showBadge ? badgeLabel : undefined}
      onClick={() => alert('Card clicked')}
      sx={{ maxWidth: 368 }}
    >
      <Typography variant="body" component="p" sx={{ color: 'text.primary' }}>
        When the card has an onClick or href, action buttons are suppressed automatically.
      </Typography>
    </Card>
  ),
};

type OpenAsLinkArgs = ComponentProps<typeof Card> & { showSubtitle: boolean; showBadge: boolean; badgeLabel: string };

export const OpenAsLink: StoryObj<OpenAsLinkArgs> = {
  name: 'Open — href link card',
  parameters: {
    docs: {
      description: {
        story:
          'Use this when the card should navigate to another page. The whole card is the link — there are no separate action buttons.\n\nBest for content hubs, article listings, or anywhere users expect to click a card to go somewhere.\n\nKeep the heading descriptive — it tells users where the link goes.',
      },
    },
  },
  argTypes: {
    showSubtitle: { control: 'boolean', description: 'Show or hide the supporting detail line.' },
    showBadge: { control: 'boolean', description: 'Show or hide the image pill.' },
    badgeLabel: { control: 'text', description: 'Text displayed inside the image pill.' },
    subtitle: { table: { disable: true } },
  },
  args: {
    variant: 'open',
    imageSrc: PLACEHOLDER_IMAGE,
    imageAlt: '',
    title: 'Link card',
    showSubtitle: true,
    showBadge: false,
    badgeLabel: 'New members',
    href: '#',
  },
  render: ({ showSubtitle, showBadge, badgeLabel, ...args }) => (
    <Card
      {...args}
      subtitle={showSubtitle ? 'Renders the whole card as an anchor element.' : undefined}
      badge={showBadge ? badgeLabel : undefined}
      sx={{ maxWidth: 368 }}
    >
      <Typography variant="body" component="p" sx={{ color: 'text.primary' }}>
        Pass an href to turn the entire card into a semantic link.
      </Typography>
    </Card>
  ),
};

// --- Promo ---

type PromoArgs = ComponentProps<typeof Card> & {
  showSubtitle: boolean;
  showPrimaryAction: boolean;
  showSecondaryAction: boolean;
  showTextButton: boolean;
  showBadge: boolean;
  badgeLabel: string;
  backgroundColor: 'white' | 'grey' | 'light blue';
};

const bgTokenMap: Record<'white' | 'grey' | 'light blue', string> = {
  white: 'background.paper',
  grey: 'background.default',
  'light blue': 'background.tintNeutralCool',
};

export const PromoWithActions: StoryObj<PromoArgs> = {
  name: 'Open — horizontal image + actions',
  parameters: {
    docs: {
      description: {
        story:
          'Use this layout for high-impact promotional content — for example, membership sign-up, product highlights, or campaign features.\n\nThe image fills the left-hand side. Content — heading, copy, and actions — sits to the right. On small screens the layout stacks vertically with the image on top.\n\n**Background colour** sets the tone of the surface. White keeps it neutral, grey softens it against a white page, and light blue adds a branded warmth.\n\nUse **primary** and **secondary** buttons for main conversion moments. Use a **text button** for lower-priority or contextual prompts. Avoid mixing buttons and a text button in the same card.\n\nKeep the heading bold and direct. Supporting copy should be one or two sentences at most.',
      },
    },
  },
  argTypes: {
    showSubtitle: { control: 'boolean', description: 'Show or hide the supporting detail line.' },
    showPrimaryAction: { control: 'boolean', description: 'Show or hide the primary action button.' },
    showSecondaryAction: { control: 'boolean', description: 'Show or hide the secondary action button.' },
    showTextButton: { control: 'boolean', description: 'Show or hide the text button.' },
    showBadge: { control: 'boolean', description: 'Show or hide the image pill.' },
    badgeLabel: { control: 'text', description: 'Text displayed inside the image pill.' },
    backgroundColor: {
      control: 'select',
      options: ['white', 'grey', 'light blue'],
      description: 'Card background colour.',
    },
    subtitle: { table: { disable: true } },
    primaryAction: { table: { disable: true } },
    secondaryAction: { table: { disable: true } },
  },
  args: {
    variant: 'promo',
    imageSrc: PROMO_PLACEHOLDER_IMAGE,
    imageAlt: '',
    title: 'Card heading',
    showSubtitle: false,
    showPrimaryAction: true,
    showSecondaryAction: false,
    showTextButton: false,
    showBadge: false,
    badgeLabel: 'New members',
    backgroundColor: 'white',
  },
  render: ({ showSubtitle, showPrimaryAction, showSecondaryAction, showTextButton, showBadge, badgeLabel, backgroundColor, ...args }) => (
    <Card
      {...args}
      subtitle={showSubtitle ? 'Supporting detail line' : undefined}
      badge={showBadge ? badgeLabel : undefined}
      primaryAction={showPrimaryAction ? { label: 'Primary action', onClick: () => {} } : undefined}
      secondaryAction={showSecondaryAction ? { label: 'Secondary action', onClick: () => {} } : undefined}
      sx={{ backgroundColor: bgTokenMap[backgroundColor] }}
    >
      <Typography variant="body" component="p" sx={{ color: 'text.primary' }}>
        Supporting copy sits here. Keep it short — one or two sentences that build on the heading.
      </Typography>
      {showTextButton && (
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <TextButton label="Text button action" endIcon="arrow-right" />
        </Box>
      )}
    </Card>
  ),
};

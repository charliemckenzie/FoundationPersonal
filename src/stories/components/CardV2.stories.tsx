import type { ArgTypes, Meta, StoryObj } from '@storybook/nextjs-vite';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { CardV2, CardV2Grid } from '../../components/CardV2';
import { HeroIcon } from '../../components/HeroIcon';
import { Icon } from '../../components/Icon';
import { Button } from '../../components/Button';

const PLACEHOLDER_IMAGE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='640' height='360'%3E%3Crect width='640' height='360' fill='%23e2e8f0'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='20' fill='%2394a3b8'%3ECard image%3C/text%3E%3C/svg%3E";

const meta: Meta<typeof CardV2> = {
  title: 'Components / Card V2',
  component: CardV2,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    variant: {
      control: 'select',
      options: ['contained', 'border', 'open'],
      description: 'contained = surface card, border = transparent bordered card, open = borderless and no contained padding.',
    },
    expanded: {
      control: 'boolean',
      description: 'For contained and border variants, increases contained padding to 56px. Ignored by open.',
    },
    topSection: { table: { disable: true } },
    header: { table: { disable: true } },
    body: { table: { disable: true } },
    actions: { table: { disable: true } },
    children: { table: { disable: true } },
    sx: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof CardV2>;
type TopSectionMode = 'image' | 'heroIcon' | 'fontAwesomeIcon' | 'none';
type CardBackgroundOption = 'white' | 'neutral' | 'cool';
type HeroIconBackgroundOption = 'none' | 'white' | 'neutral' | 'cool';
type CtaCount = 'none' | 'single' | 'double';
type CtaType = 'button' | 'textButton';

interface ControlsArgs {
  variant: 'contained' | 'border' | 'open';
  expanded: boolean;
  headerVariant: 'display-1' | 'display-2' | 'display-3' | 'display-4' | 'display-5' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  bodyVariant: 'lead' | 'body' | 'small';
  topSectionPosition: 'top' | 'left';
  topSectionMobileBehavior: 'keep-left' | 'stack-top';
  topSectionMode: TopSectionMode;
  cardBackground: CardBackgroundOption;
  heroIconBackground: HeroIconBackgroundOption;
  ctaCount: CtaCount;
  primaryCtaType: CtaType;
  secondaryCtaType: CtaType;
  useLongCtaLabels: boolean;
}

const CONTROLS_ARG_TYPES: Partial<ArgTypes<ControlsArgs>> = {
  // — Card style —
  variant: {
    control: 'select',
    options: ['contained', 'border', 'open'],
  },
  cardBackground: {
    control: 'select',
    options: ['white', 'neutral', 'cool'],
    description: 'Card surface colour: white = background.paper, neutral = background.tintNeutral, cool = background.tintNeutralCool.',
  },
  expanded: { control: 'boolean' },

  // — Top section —
  topSectionMode: {
    control: 'select',
    options: ['heroIcon', 'fontAwesomeIcon', 'image', 'none'],
  },
  topSectionPosition: {
    control: 'select',
    options: ['left', 'top'],
    description: 'Only applies to heroIcon and fontAwesomeIcon modes.',
  },
  topSectionMobileBehavior: {
    control: 'select',
    options: ['keep-left', 'stack-top'],
    description: 'When topSectionPosition is left — keep row on mobile or stack icon above content.',
  },
  heroIconBackground: {
    control: 'select',
    options: ['cool', 'neutral', 'white', 'none'],
    description: 'Hero icon background. Only applies to heroIcon mode.',
  },

  // — Content —
  headerVariant: {
    control: 'select',
    options: ['display-1', 'display-2', 'display-3', 'display-4', 'display-5', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
  },
  bodyVariant: {
    control: 'select',
    options: ['lead', 'body', 'small'],
  },

  // — CTAs —
  ctaCount: {
    control: 'select',
    options: ['double', 'single', 'none'],
  },
  primaryCtaType: {
    control: 'select',
    options: ['button', 'textButton'],
  },
  secondaryCtaType: {
    control: 'select',
    options: ['button', 'textButton'],
  },
  useLongCtaLabels: { control: 'boolean' },
};

const CONTROLS_DEFAULT_ARGS: ControlsArgs = {
  variant: 'contained',
  cardBackground: 'white',
  expanded: false,
  topSectionMode: 'heroIcon',
  topSectionPosition: 'top',
  topSectionMobileBehavior: 'keep-left',
  heroIconBackground: 'cool',
  headerVariant: 'h5',
  bodyVariant: 'body',
  ctaCount: 'double',
  primaryCtaType: 'button',
  secondaryCtaType: 'button',
  useLongCtaLabels: false,
};

const CARD_BACKGROUND_TOKEN_MAP: Record<CardBackgroundOption, 'background.paper' | 'background.tintNeutral' | 'background.tintNeutralCool'> = {
  white: 'background.paper',
  neutral: 'background.tintNeutral',
  cool: 'background.tintNeutralCool',
};

const HERO_ICON_BG_TOKEN_MAP: Record<Exclude<HeroIconBackgroundOption, 'none'>, 'white' | 'grey' | 'brand'> = {
  white: 'white',
  neutral: 'grey',
  cool: 'brand',
};

function resolveAllowedHeroBackground(
  cardBackground: CardBackgroundOption,
  requested: HeroIconBackgroundOption,
): HeroIconBackgroundOption {
  if (cardBackground === 'white') {
    return requested;
  }

  if (cardBackground === 'neutral' || cardBackground === 'cool') {
    return requested === 'none' || requested === 'white' ? requested : 'none';
  }

  return requested;
}

function iconTopSectionPadding(variant: ControlsArgs['variant'], expanded: boolean) {
  if (variant === 'open') {
    return { px: 0, pt: '1.5rem', pb: 0 };
  }

  const padding = expanded ? '3.5rem' : '2rem';
  return { px: padding, pt: padding, pb: 0 };
}

function BaseContent() {
  return (
    <>
      <Typography variant="h5" component="h3" sx={{ color: 'text.heading', mb: 1 }}>
        Card heading
      </Typography>
      <Typography variant="body" component="p" sx={{ color: 'text.primary' }}>
        Body content sits in the middle section and remains separate from the top section and bottom actions.
      </Typography>
    </>
  );
}

function BaseActions() {
  return (
    <Stack direction="row" spacing={1}>
      <Button label="Primary" variant="contained" onClick={() => {}} />
      <Button label="Secondary" variant="outlined" onClick={() => {}} />
    </Stack>
  );
}

function buildCtas({
  ctaCount,
  primaryCtaType,
  secondaryCtaType,
  useLongCtaLabels,
}: Pick<ControlsArgs, 'ctaCount' | 'primaryCtaType' | 'secondaryCtaType' | 'useLongCtaLabels'>) {
  if (ctaCount === 'none') {
    return undefined;
  }

  const primaryLabel = useLongCtaLabels ? 'Start your application and continue to next step' : 'Get started';
  const secondaryLabel = useLongCtaLabels ? 'Read more detailed information before deciding' : 'Learn more';

  if (ctaCount === 'single') {
    return {
      primary: {
        label: primaryLabel,
        kind: primaryCtaType,
        onClick: () => {},
      },
    };
  }

  return {
    primary: {
      label: primaryLabel,
      kind: primaryCtaType,
      onClick: () => {},
    },
    secondary: {
      label: secondaryLabel,
      kind: secondaryCtaType,
      onClick: () => {},
    },
  };
}

function renderInteractiveCard({
  topSectionMode,
  topSectionPosition,
  topSectionMobileBehavior,
  cardBackground,
  heroIconBackground,
  ctaCount,
  primaryCtaType,
  secondaryCtaType,
  useLongCtaLabels,
  ...args
}: ControlsArgs) {
  const isIconMode = topSectionMode === 'heroIcon' || topSectionMode === 'fontAwesomeIcon';
  const effectiveTopSectionPosition = isIconMode ? topSectionPosition : 'top';
  const iconOnLeft = effectiveTopSectionPosition === 'left';
  const effectiveHeroBackground = resolveAllowedHeroBackground(cardBackground, heroIconBackground);
  const heroBackgroundProp = effectiveHeroBackground === 'none' ? 'none' : HERO_ICON_BG_TOKEN_MAP[effectiveHeroBackground];
  const isHeroBackgroundNone = effectiveHeroBackground === 'none';
  const iconPaddingSx = iconOnLeft ? {} : iconTopSectionPadding(args.variant, args.expanded);
  const iconAlignmentSx = {
    ...iconPaddingSx,
    display: 'flex',
    justifyContent: 'flex-start',
  };
  const cardSx =
    topSectionMode === 'fontAwesomeIcon'
      ? {
          maxWidth: 420,
          '& .MuiCardContent-root': {
            pt: '1rem',
          },
        }
      : { maxWidth: 420 };

  const cardSurfaceSx = {
    backgroundColor: CARD_BACKGROUND_TOKEN_MAP[cardBackground],
  };

  const topSection =
    topSectionMode === 'image'
      ? (
          <Box
            component="img"
            src={PLACEHOLDER_IMAGE}
            alt=""
            sx={{ display: 'block', width: '100%', aspectRatio: '16 / 7', objectFit: 'cover' }}
          />
        )
      : topSectionMode === 'heroIcon'
        ? (
            <Box sx={iconAlignmentSx}>
              <HeroIcon
                name="Calculator"
                brand="art"
                background={heroBackgroundProp}
                containerSizeOverride={isHeroBackgroundNone ? undefined : (iconOnLeft ? '5rem' : '5.5rem')}
                iconSizeOverride={isHeroBackgroundNone ? '3rem' : (iconOnLeft ? '2.5rem' : '2.75rem')}
              />
            </Box>
          )
        : topSectionMode === 'fontAwesomeIcon'
          ? (
              <Box sx={{ ...iconAlignmentSx, fontSize: '2.25rem' }}>
                <Icon icon="house" size="inherit" color="primary" />
              </Box>
            )
        : undefined;

  const ctas = buildCtas({
    ctaCount,
    primaryCtaType,
    secondaryCtaType,
    useLongCtaLabels,
  });

  return (
    <CardV2
      {...args}
      topSection={topSection}
      topSectionPosition={effectiveTopSectionPosition}
      topSectionMobileBehavior={topSectionMobileBehavior}
      header="Card heading"
      body="Body content sits in the middle section and remains separate from the top section and bottom actions."
      ctas={ctas}
      sx={[cardSx, cardSurfaceSx]}
    />
  );
}

export const Playground: StoryObj<ControlsArgs> = {
  parameters: {
    docs: {
      description: {
        story: 'Primary interactive playground with single-select top section options: image, hero icon, Font Awesome icon, or none.',
      },
    },
  },
  argTypes: CONTROLS_ARG_TYPES,
  args: CONTROLS_DEFAULT_ARGS,
  render: renderInteractiveCard,
};

export const Controls: StoryObj<ControlsArgs> = {
  parameters: {
    docs: {
      description: {
        story: 'Use Controls to switch variant, toggle expanded, pick a single top section option, and configure CTA behavior: none/single/double, per-CTA type (button/textButton), and long labels to test wrapping/stacking.',
      },
    },
  },
  argTypes: CONTROLS_ARG_TYPES,
  args: CONTROLS_DEFAULT_ARGS,
  render: renderInteractiveCard,
};

export const Variants: Story = {
  render: () => (
    <Stack spacing={3} sx={{ maxWidth: 420 }}>
      <CardV2 variant="contained" header={<BaseContent />} actions={<BaseActions />} />
      <CardV2 variant="border" header={<BaseContent />} actions={<BaseActions />} />
      <CardV2 variant="open" header={<BaseContent />} actions={<BaseActions />} />
      <CardV2 variant="contained" expanded header={<BaseContent />} actions={<BaseActions />} />
    </Stack>
  ),
};

export const TopSectionModes: Story = {
  render: () => (
    <Stack spacing={3} sx={{ maxWidth: 420 }}>
      <CardV2
        variant="contained"
        topSection={
          <Box
            component="img"
            src={PLACEHOLDER_IMAGE}
            alt=""
            sx={{ display: 'block', width: '100%', aspectRatio: '16 / 7', objectFit: 'cover' }}
          />
        }
        header={<BaseContent />}
        actions={<BaseActions />}
      />

      <CardV2
        variant="contained"
        topSection={
          <Box sx={{ px: '2rem', pt: '2rem', display: 'flex', justifyContent: 'flex-start' }}>
            <HeroIcon name="Calculator" brand="art" background="brand" containerSizeOverride="5.5rem" iconSizeOverride="2.75rem" />
          </Box>
        }
        header={<BaseContent />}
        actions={<BaseActions />}
      />

      <CardV2 variant="contained" header={<BaseContent />} actions={<BaseActions />} />
    </Stack>
  ),
};

export const ResponsiveGrid: Story = {
  name: 'Responsive Grid',
  parameters: {
    docs: {
      description: {
        story: '### Responsive Grid\nResponsive card layout: cards stack below tablet, render two-up at tablet (6-column equivalent), and cap at four cards per row on desktop.',
      },
    },
  },
  render: () => (
    <CardV2Grid>
      <CardV2 variant="contained" header="Card heading" body="Body content for card one." ctas={{ primary: { label: 'Get started' } }} />
      <CardV2 variant="contained" header="Card heading" body="Body content for card two." ctas={{ primary: { label: 'Get started' } }} />
      <CardV2 variant="contained" header="Card heading" body="Body content for card three." ctas={{ primary: { label: 'Get started' } }} />
      <CardV2 variant="contained" header="Card heading" body="Body content for card four." ctas={{ primary: { label: 'Get started' } }} />
      <CardV2 variant="contained" header="Card heading" body="Body content for card five." ctas={{ primary: { label: 'Get started' } }} />
      <CardV2 variant="contained" header="Card heading" body="Body content for card six." ctas={{ primary: { label: 'Get started' } }} />
    </CardV2Grid>
  ),
};

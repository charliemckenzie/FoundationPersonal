import type { ArgTypes, Meta, StoryObj } from '@storybook/nextjs-vite';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { Card, CardGrid } from '../../components/Card';
import { HeroIcon } from '../../components/HeroIcon';
import { Icon } from '../../components/Icon';
import { Button } from '../../components/Button';

const PLACEHOLDER_IMAGE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='640' height='360'%3E%3Crect width='640' height='360' fill='%23e2e8f0'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='20' fill='%2394a3b8'%3ECard image%3C/text%3E%3C/svg%3E";

const meta: Meta<typeof Card> = {
  title: 'Components / Card',
  component: Card,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Flexible card primitive with contained, border, and open variants. Supports optional top sections (image, hero icon, Font Awesome icon, or none), semantic heading levels, visual heading styles, and configurable CTA layouts. Use CardGrid for responsive multi-card layouts, including equal-height alignment when content length differs between cards.',
      },
    },
  },
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
type Story = StoryObj<typeof Card>;
type TopSectionMode = 'image' | 'heroIcon' | 'fontAwesomeIcon' | 'none';
type CardBackgroundOption = 'white' | 'neutral' | 'cool';
type HeroIconBackgroundOption = 'none' | 'white' | 'neutral' | 'cool';
type CtaCount = 'none' | 'single' | 'double';
type CtaType = 'button' | 'textButton';

interface ControlsArgs {
  variant: 'contained' | 'border' | 'open';
  cardBackground: CardBackgroundOption;
  expanded: boolean;
  headerLevel: 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  headerVariant: 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  bodyVariant: 'lead' | 'body' | 'small';
  topSectionMode: TopSectionMode;
  topSectionPosition: 'top' | 'left';
  topSectionMobileBehavior: 'keep-left' | 'stack-top';
  heroIconBackground: HeroIconBackgroundOption;
  ctaCount: CtaCount;
  primaryCtaType: CtaType;
  secondaryCtaType: CtaType;
  useLongCtaLabels: boolean;
  equalHeight: boolean;
}

const CONTROLS_ARG_TYPES: Partial<ArgTypes<ControlsArgs>> = {
  // — Card style —
  variant: {
    control: 'select',
    options: ['contained', 'border', 'open'],
    description: 'Visual card style. contained = filled surface with border and spacing, border = transparent background with border, open = borderless minimal style with no contained padding.',
  },
  cardBackground: {
    control: 'select',
    options: ['white', 'neutral', 'cool'],
    description: 'Card surface colour token for contained cards only: white = background.paper, neutral = background.tintNeutral, cool = background.tintNeutralCool. border and open stay transparent.',
  },
  expanded: {
    control: 'boolean',
    description: 'Increases internal spacing for contained and border variants (from 2rem to 3.5rem). Ignored by open variant.',
  },

  // — Top section —
  topSectionMode: {
    control: 'select',
    options: ['heroIcon', 'fontAwesomeIcon', 'image', 'none'],
    description: 'Top section content type: heroIcon, Font Awesome icon, full-width image, or no top section.',
  },
  topSectionPosition: {
    control: 'select',
    options: ['left', 'top'],
    description: 'Placement of icon-based top sections: left = beside content, top = above content. Only applies to heroIcon and fontAwesomeIcon modes.',
  },
  topSectionMobileBehavior: {
    control: 'select',
    options: ['keep-left', 'stack-top'],
    description: 'Mobile behavior when topSectionPosition is left: keep-left keeps row layout; stack-top moves icon above content on small screens.',
  },
  heroIconBackground: {
    control: 'select',
    options: ['none', 'white', 'neutral', 'cool'],
    description: 'Background treatment for heroIcon mode. none = icon only, white/neutral/cool = background badge. Some combinations are normalized based on selected card background.',
  },

  // — Content —
  headerLevel: {
    control: 'select',
    options: ['h2', 'h3', 'h4', 'h5', 'h6'],
    description: 'Semantic HTML heading level for accessibility and document structure (h2-h6). Independent from visual typography style.',
  },
  headerVariant: {
    control: 'select',
    options: ['h2', 'h3', 'h4', 'h5', 'h6'],
    description: 'Visual heading typography style. Use with headerLevel to separate semantic hierarchy from presentation.',
  },
  bodyVariant: {
    control: 'select',
    options: ['lead', 'body', 'small'],
    description: 'Body copy typography variant: lead (emphasis), body (default), small (compact supporting text).',
  },

  // — CTAs —
  ctaCount: {
    control: 'select',
    options: ['double', 'single', 'none'],
    description: 'Number of bottom CTAs: none, single primary action, or double primary + secondary actions.',
  },
  primaryCtaType: {
    control: 'select',
    options: ['button', 'textButton'],
    description: 'Primary action presentation: button (contained/filled) or textButton (lighter link-style action).',
  },
  secondaryCtaType: {
    control: 'select',
    options: ['button', 'textButton'],
    description: 'Secondary action presentation when two CTAs are shown: button or textButton.',
  },
  useLongCtaLabels: {
    control: 'boolean',
    description: 'Switches CTA labels to long text to test wrapping, spacing, and responsive action layout behavior.',
  },
  equalHeight: {
    control: 'boolean',
    description: 'Renders cards inside CardGrid with equal-height behavior so cards in the same row match tallest-card height while content remains top-aligned.',
  },
};

const CONTROLS_DEFAULT_ARGS: ControlsArgs = {
  variant: 'contained',
  cardBackground: 'white',
  expanded: false,
  topSectionMode: 'heroIcon',
  topSectionPosition: 'top',
  topSectionMobileBehavior: 'keep-left',
  heroIconBackground: 'none',
  headerLevel: 'h3',
  headerVariant: 'h5',
  bodyVariant: 'body',
  ctaCount: 'double',
  primaryCtaType: 'button',
  secondaryCtaType: 'button',
  useLongCtaLabels: false,
  equalHeight: false,
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
    return requested === 'white' ? 'none' : requested;
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
  equalHeight,
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

  const cardSurfaceSx = args.variant === 'contained'
    ? { backgroundColor: CARD_BACKGROUND_TOKEN_MAP[cardBackground] }
    : { backgroundColor: 'transparent' };

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

  const primaryCard = (
    <Card
      {...args}
      topSection={topSection}
      topSectionPosition={effectiveTopSectionPosition}
      topSectionMobileBehavior={topSectionMobileBehavior}
      headerLevel={args.headerLevel}
      header="Card heading"
      body="Body content sits in the middle section and remains separate from the top section and bottom actions."
      ctas={ctas}
      sx={[cardSx, cardSurfaceSx]}
    />
  );

  if (!equalHeight) {
    return primaryCard;
  }

  return (
    <CardGrid equalHeight sx={{ maxWidth: 920 }}>
      {primaryCard}
      <Card
        variant={args.variant}
        expanded={args.expanded}
        topSection={topSection}
        topSectionPosition={effectiveTopSectionPosition}
        topSectionMobileBehavior={topSectionMobileBehavior}
        headerLevel={args.headerLevel}
        headerVariant={args.headerVariant}
        bodyVariant={args.bodyVariant}
        header="Comparison card with longer content"
        body="This card intentionally uses longer body copy so you can verify equal-height behavior side by side. When equalHeight is enabled, both cards align to the tallest card while content remains top-aligned and actions sit consistently near the bottom."
        ctas={ctas}
        sx={[cardSx, cardSurfaceSx]}
      />
    </CardGrid>
  );
}

export const Playground: StoryObj<ControlsArgs> = {
  parameters: {
    docs: {
      description: {
        story: [
          'Primary interactive playground for Card.',
          '',
          'Use Controls to explore variant styling, top section modes, heading semantics vs heading visuals, CTA configurations, and equal-height behavior.',
          '',
          'This story is best for validating one configuration at a time before creating dedicated examples.',
        ].join('\n'),
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
        story: [
          'Full controls surface for behavior verification.',
          '',
          'Test top section placement and mobile behavior, background interactions by variant, semantic heading levels, visual typography, and CTA combinations.',
          '',
          'Enable equalHeight to compare side-by-side cards with different content lengths and confirm vertical alignment.',
        ].join('\n'),
      },
    },
  },
  argTypes: CONTROLS_ARG_TYPES,
  args: CONTROLS_DEFAULT_ARGS,
  render: renderInteractiveCard,
};

export const Variants: Story = {
  parameters: {
    docs: {
      description: {
        story: [
          '**Contained**: full surface card with border, radius, and contained spacing.',
          '',
          '**Border**: transparent background with border and contained spacing.',
          '',
          '**Open**: borderless style with no contained spacing.',
          '',
          'Includes an expanded contained example to show the increased internal spacing option.',
        ].join('\n'),
      },
    },
  },
  render: () => (
    <Stack spacing={3} sx={{ maxWidth: 420 }}>
      <Card variant="contained" header={<BaseContent />} actions={<BaseActions />} />
      <Card variant="border" header={<BaseContent />} actions={<BaseActions />} />
      <Card variant="open" header={<BaseContent />} actions={<BaseActions />} />
      <Card variant="contained" expanded header={<BaseContent />} actions={<BaseActions />} />
    </Stack>
  ),
};

export const TopSectionModes: Story = {
  parameters: {
    docs: {
      description: {
        story: [
          'Demonstrates top section content options.',
          '',
          '**Image** mode uses a 16:7 full-width image treatment.',
          '',
          '**HeroIcon** mode supports icon badge background control and icon alignment behavior.',
          '',
          '**None** mode shows content-first cards without a top section.',
        ].join('\n'),
      },
    },
  },
  render: () => (
    <Stack spacing={3} sx={{ maxWidth: 420 }}>
      <Card
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

      <Card
        variant="contained"
        topSection={
          <Box sx={{ px: '2rem', pt: '2rem', display: 'flex', justifyContent: 'flex-start' }}>
            <HeroIcon name="Calculator" brand="art" background="none" iconSizeOverride="3rem" />
          </Box>
        }
        header={<BaseContent />}
        actions={<BaseActions />}
      />

      <Card variant="contained" header={<BaseContent />} actions={<BaseActions />} />
    </Stack>
  ),
};

export const ResponsiveGrid: Story = {
  parameters: {
    docs: {
      description: {
        story: [
          'Responsive CardGrid behavior by breakpoint:',
          '',
          '- Mobile: single-column stack',
          '- Tablet: two cards per row (6-column equivalent)',
          '- Desktop: up to four cards per row depending on card count',
          '',
          'Use for feature grids or card collections that need predictable responsive rhythm.',
        ].join('\n'),
      },
    },
  },
  render: () => (
    <CardGrid>
      <Card variant="contained" header="Card heading" body="Body content for card one." ctas={{ primary: { label: 'Get started' } }} />
      <Card variant="contained" header="Card heading" body="Body content for card two." ctas={{ primary: { label: 'Get started' } }} />
      <Card variant="contained" header="Card heading" body="Body content for card three." ctas={{ primary: { label: 'Get started' } }} />
      <Card variant="contained" header="Card heading" body="Body content for card four." ctas={{ primary: { label: 'Get started' } }} />
      <Card variant="contained" header="Card heading" body="Body content for card five." ctas={{ primary: { label: 'Get started' } }} />
      <Card variant="contained" header="Card heading" body="Body content for card six." ctas={{ primary: { label: 'Get started' } }} />
    </CardGrid>
  ),
};

export const EqualHeightGrid: Story = {
  parameters: {
    docs: {
      description: {
        story: [
          'Equal-height grid mode keeps cards visually aligned when content lengths vary.',
          '',
          'Cards in the same row stretch to the height of the tallest card while content starts at the top and actions remain consistently positioned near the bottom.',
          '',
          'Use this mode for comparison layouts and multi-card marketing sections.',
        ].join('\n'),
      },
    },
  },
  render: () => (
    <CardGrid equalHeight>
      <Card
        variant="contained"
        header="Short heading"
        body="Short content."
        ctas={{ primary: { label: 'Get started' } }}
      />
      <Card
        variant="contained"
        header="Longer card heading with extra content"
        body="Longer content for this card to demonstrate that cards can still align to equal heights across the row while text remains top aligned and actions stay at the bottom."
        ctas={{ primary: { label: 'Get started' }, secondary: { label: 'Learn more' } }}
      />
      <Card
        variant="contained"
        header="Medium heading"
        body="Medium length content for visual comparison."
        ctas={{ primary: { label: 'Get started' } }}
      />
    </CardGrid>
  ),
};

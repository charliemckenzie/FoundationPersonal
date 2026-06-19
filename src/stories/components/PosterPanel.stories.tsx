import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import {
  PosterPanel,
  type PosterPanelProps,
  type PosterPanelHeadingVariant,
  type PosterPanelBodyVariant,
  type PosterPanelGradientDirection,
} from '../../components/PosterPanel';

// Placeholder image — no external dependency required.
const PLACEHOLDER_IMAGE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1200' height='600'%3E%3Crect width='1200' height='600' fill='%234a6741'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='32' fill='%23ffffff' opacity='0.4'%3EBackground image%3C/text%3E%3C/svg%3E";

const HEADING_VARIANTS: PosterPanelHeadingVariant[] = [
  'display-1', 'display-2', 'display-3', 'display-4', 'display-5',
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
];

const BODY_VARIANTS: PosterPanelBodyVariant[] = ['lead', 'body', 'small'];

const GRADIENT_DIRECTIONS: PosterPanelGradientDirection[] = [
  'from-left', 'from-right', 'from-bottom',
];

const TEXT_COLOR_OPTIONS = [
  'text.inverse',
  'common.white',
  'text.primary',
  'text.heading',
  'primary.main',
  'secondary.main',
];

const meta: Meta<typeof PosterPanel> = {
  title: 'Components / Poster Panel',
  component: PosterPanel,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Full-width panel with a background image, optional gradient overlay, and a text content column.\n\nThe content column (heading, body, and optional CTAs) sits on the left or right on desktop, occupying ~50% of the panel width. On mobile the panel stacks vertically — the image and content block are separate elements whose order is configurable.\n\nA configurable gradient overlay darkens the image to ensure text legibility. All text colours, gradient colours, and mobile backgrounds use theme tokens or CSS colour values — no hardcoded values.',
      },
    },
  },
  argTypes: {
    imageSrc: {
      control: 'text',
      description: 'URL of the background image.',
    },
    imageAlt: {
      control: 'text',
      description: 'Accessible description of the image. Pass an empty string only if the image is purely decorative.',
    },
    contentPosition: {
      control: 'radio',
      options: ['left', 'right'],
      description: 'Which side the text content column sits on (desktop only).',
    },
    headingText: {
      control: 'text',
      description: 'Heading text.',
    },
    headingVariant: {
      control: 'select',
      options: HEADING_VARIANTS,
      description: 'Typography variant for the heading.',
    },
    headingComponent: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
      description: 'Semantic HTML element for the heading. Match to your page heading hierarchy.',
    },
    bodyVariant: {
      control: 'radio',
      options: BODY_VARIANTS,
      description: 'Typography size variant for the body content.',
    },
    textColor: {
      control: 'select',
      options: TEXT_COLOR_OPTIONS,
      description: 'MUI palette path for all text (heading, body, CTA text link).',
    },
    showGradient: {
      control: 'boolean',
      description: 'Show the darkened gradient overlay on desktop.',
    },
    gradientDirection: {
      control: 'radio',
      options: GRADIENT_DIRECTIONS,
      description: 'Direction the gradient fades toward. `from-left` fades left→right (use with left-aligned content).',
    },
    gradientColor: {
      control: 'color',
      description: 'Opaque colour at the start of the gradient. Use rgba for opacity control.',
    },
    mobileOrder: {
      control: 'radio',
      options: ['image-first', 'content-first'],
      description: 'Mobile stacking order.',
    },
    mobileBgColor: {
      control: 'text',
      description: 'MUI palette path for the mobile content block background. Must contrast with `textColor`.',
    },
    children: { table: { disable: true } },
    primaryCta: { table: { disable: true } },
    secondaryCta: { table: { disable: true } },
    sx: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<PosterPanelProps>;

// ── Default (content left, gradient on) ──────────────────────────────────────

export const Default: Story = {
  name: 'Default — Content Left',
  parameters: {
    docs: {
      description: {
        story:
          'Content column pinned left on desktop, gradient fading left to right. The gradient darkens the image behind the text for legibility.\n\nOn mobile the image fills the full width above the content block.',
      },
    },
  },
  args: {
    imageSrc: PLACEHOLDER_IMAGE,
    imageAlt: 'Smiling man in a light blue shirt standing outdoors in front of trees and a building',
    contentPosition: 'left',
    headingText: 'Can I join?',
    headingVariant: 'h2',
    headingComponent: 'h2',
    bodyVariant: 'body',
    textColor: 'text.inverse',
    showGradient: true,
    gradientDirection: 'from-left',
    gradientColor: 'rgba(0,0,0,0.6)',
    mobileOrder: 'image-first',
    mobileBgColor: 'background.brandSecondary',
  },
  render: (args) => (
    <PosterPanel {...args}>
      <p>
        If you&apos;re employed by the Queensland Government (or a business with us as their chosen
        super product), or the spouse or child (under 25 years old) of an existing QSuper
        member, <a href="#">you can open an account with us</a>.
      </p>
      <p>
        If not, don&apos;t worry! You can still join{' '}
        <a href="#">Australian Retirement Trust</a> and access the same support you&apos;d get as a
        QSuper account holder.
      </p>
    </PosterPanel>
  ),
};

// ── Content right ─────────────────────────────────────────────────────────────

export const ContentRight: Story = {
  name: 'Content Right',
  parameters: {
    docs: {
      description: {
        story:
          'Content column pinned to the right on desktop. Gradient direction switches to `from-right` to maintain text legibility.',
      },
    },
  },
  args: {
    imageSrc: PLACEHOLDER_IMAGE,
    imageAlt: 'Background lifestyle image',
    contentPosition: 'right',
    headingText: 'Can I join?',
    headingVariant: 'h2',
    headingComponent: 'h2',
    bodyVariant: 'body',
    textColor: 'text.inverse',
    showGradient: true,
    gradientDirection: 'from-right',
    gradientColor: 'rgba(0,0,0,0.6)',
    mobileOrder: 'image-first',
    mobileBgColor: 'background.brandSecondary',
  },
  render: (args) => (
    <PosterPanel {...args}>
      <p>
        If you&apos;re employed by the Queensland Government (or a business with us as their chosen
        super product), or the spouse or child (under 25 years old) of an existing QSuper
        member, <a href="#">you can open an account with us</a>.
      </p>
    </PosterPanel>
  ),
};

// ── No gradient ───────────────────────────────────────────────────────────────

export const NoGradient: Story = {
  name: 'No Gradient',
  parameters: {
    docs: {
      description: {
        story:
          'Gradient overlay disabled. Only suitable when the image naturally has a dark area behind the content. Ensure text contrast still meets WCAG AA (4.5:1 for body, 3:1 for large text).',
      },
    },
  },
  args: {
    imageSrc: PLACEHOLDER_IMAGE,
    imageAlt: 'Background lifestyle image',
    contentPosition: 'left',
    headingText: 'Can I join?',
    headingVariant: 'h2',
    headingComponent: 'h2',
    bodyVariant: 'body',
    textColor: 'common.white',
    showGradient: false,
    mobileOrder: 'image-first',
    mobileBgColor: 'background.brandSecondary',
  },
  render: (args) => (
    <PosterPanel {...args}>
      <p>Supporting body content goes here.</p>
    </PosterPanel>
  ),
};

// ── With CTAs ─────────────────────────────────────────────────────────────────

export const WithCTAs: Story = {
  name: 'With CTAs',
  parameters: {
    docs: {
      description: {
        story:
          'Primary CTA button and a secondary text-link CTA. The primary button defaults to `color="white"` so it contrasts on dark backgrounds. The secondary uses `TextButton` with `reversed` for white text on dark.',
      },
    },
  },
  render: () => (
    <PosterPanel
      imageSrc={PLACEHOLDER_IMAGE}
      imageAlt="Background lifestyle image"
      contentPosition="left"
      headingText="Start your QSuper journey"
      headingVariant="h2"
      bodyVariant="lead"
      textColor="text.inverse"
      showGradient
      gradientDirection="from-left"
      gradientColor="rgba(0,0,0,0.65)"
      mobileOrder="image-first"
      mobileBgColor="background.brandSecondary"
      primaryCta={{ label: 'Join QSuper', href: '#' }}
      secondaryCta={{ label: 'Learn more', onClick: () => {} }}
    >
      <p>Open a QSuper account online in minutes.</p>
    </PosterPanel>
  ),
};

// ── Mobile content first ──────────────────────────────────────────────────────

export const MobileContentFirst: Story = {
  name: 'Mobile — Content First',
  parameters: {
    docs: {
      description: {
        story:
          'On mobile, the content block renders above the image. Resize the viewport to see the stacking change. Desktop layout is unaffected.',
      },
    },
  },
  args: {
    imageSrc: PLACEHOLDER_IMAGE,
    imageAlt: 'Background lifestyle image',
    contentPosition: 'left',
    headingText: 'Can I join?',
    headingVariant: 'h2',
    headingComponent: 'h2',
    bodyVariant: 'body',
    textColor: 'text.inverse',
    showGradient: true,
    gradientDirection: 'from-left',
    gradientColor: 'rgba(0,0,0,0.6)',
    mobileOrder: 'content-first',
    mobileBgColor: 'background.brandSecondary',
  },
  render: (args) => (
    <PosterPanel {...args}>
      <p>
        If you&apos;re employed by the Queensland Government (or a business with us as their chosen
        super product), or the spouse or child (under 25 years old) of an existing QSuper member,{' '}
        <a href="#">you can open an account with us</a>.
      </p>
    </PosterPanel>
  ),
};

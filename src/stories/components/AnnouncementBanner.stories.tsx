import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { AnnouncementBanner } from '../../components/AnnouncementBanner';
import type { AnnouncementBannerProps } from '../../components/AnnouncementBanner';

// Placeholder illustration — no external dependency required.
const ILLUSTRATION_PLACEHOLDER =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='140'%3E%3Crect width='200' height='140' fill='%23e2e8f0' rx='8'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='13' fill='%2394a3b8'%3EIllustration%3C/text%3E%3C/svg%3E";

const meta: Meta<typeof AnnouncementBanner> = {
  title: 'Components / Announcement Banner',
  component: AnnouncementBanner,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A dismissible page-level banner for feature announcements, promotions, or tips. Pairs a heading, optional supporting copy, and an optional CTA button. An optional decorative illustration appears on the right at wider breakpoints.\n\nUse `storageKey` to persist the dismissed state for the browser session so the banner stays hidden after the user closes it. Without a key, visibility is fully controlled by the caller.\n\nThree colour variants: `dark` (brand navy), `primary` (brand blue), and `light` (neutral tinted surface).',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['light', 'primary', 'dark'],
      description: '`light` — neutral tinted surface. `primary` — brand blue. `dark` — brand navy.',
    },
    size: {
      control: 'select',
      options: ['medium', 'small'],
      description: '`medium` (default) — larger padding, h5 title, medium button. `small` — reduced padding, h6 title, small button.',
    },
    condensed: {
      control: 'boolean',
      description: 'Reduces vertical padding by 4px, matching the condensed Button rhythm.',
    },
    title: { control: 'text' },
    description: { control: 'text' },
    image: { table: { disable: true } },
    action: { table: { disable: true } },
    storageKey: { table: { disable: true } },
    sx: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof AnnouncementBanner>;

// ── Default (playground) ──────────────────────────────────────────────────────

type DefaultArgs = AnnouncementBannerProps & { actionLabel: string };

export const Default: StoryObj<DefaultArgs> = {
  parameters: {
    docs: {
      description: {
        story:
          'The most common usage: title, description, and a CTA button. Use the `size` and `condensed` controls to compare banner densities.',
      },
    },
  },
  args: {
    variant: 'light',
    size: 'medium',
    condensed: false,
    title: 'New feature available',
    description: 'You can now manage your investment options directly from your dashboard.',
    actionLabel: 'Learn more',
  },
  argTypes: {
    variant: { control: 'select', options: ['light', 'primary', 'dark'] },
    size: { control: 'select', options: ['medium', 'small'] },
    condensed: { control: 'boolean' },
    actionLabel: { name: 'Button label', control: 'text' },
    image: { table: { disable: true } },
    action: { table: { disable: true } },
    storageKey: { table: { disable: true } },
    sx: { table: { disable: true } },
  },
  render: ({ variant, size, condensed, title, description, actionLabel }) => (
    <AnnouncementBanner
      variant={variant}
      size={size}
      condensed={condensed}
      title={title}
      description={description}
      action={{ label: actionLabel ?? 'Learn more', onClick: () => {} }}
    />
  ),
};

// ── With illustration — background ──────────────────────────────────────────

export const WithIllustrationBackground: Story = {
  name: 'With Illustration — Background',
  parameters: {
    docs: {
      description: {
        story:
          'Set `image.display` to `\'background\'` (the default) to use the illustration as a CSS background-image on the banner surface. Text reflows via right padding so content never overlaps it.',
      },
    },
  },
  args: {
    variant: 'primary',
    title: 'Discover your retirement options',
    description: 'Use our new retirement planner to model different scenarios and see how small changes today can make a big difference.',
    action: { label: 'Get started', onClick: () => {} },
    image: { src: ILLUSTRATION_PLACEHOLDER, alt: '', display: 'background' },
  },
};

// ── With illustration — inline ────────────────────────────────────────────────

export const WithIllustrationInline: Story = {
  name: 'With Illustration — Inline',
  parameters: {
    docs: {
      description: {
        story:
          'Set `image.display` to `\'inline\'` to render the illustration as an `<img>` element in the flex row to the right of the content. Hidden on mobile.',
      },
    },
  },
  args: {
    variant: 'primary',
    title: 'Discover your retirement options',
    description: 'Use our new retirement planner to model different scenarios and see how small changes today can make a big difference.',
    action: { label: 'Get started', onClick: () => {} },
    image: { src: ILLUSTRATION_PLACEHOLDER, alt: '', display: 'inline' },
  },
};

// ── Text only (no CTA) ────────────────────────────────────────────────────────

export const TextOnly: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Omit `action` for a read-only announcement. Useful for informational notices that require no user action.',
      },
    },
  },
  args: {
    variant: 'dark',
    title: 'Scheduled maintenance — Sunday 6am to 8am',
    description: 'Member Online will be unavailable for a short period while we apply system updates.',
  },
};

// ── Variants ──────────────────────────────────────────────────────────────────

export const LightVariant: Story = {
  args: {
    variant: 'light',
    title: 'Tip: keep your details up to date',
    description: 'Ensure your contact details and beneficiaries are current so we can reach you when it matters.',
    action: { label: 'Update details', onClick: () => {} },
    image: { src: ILLUSTRATION_PLACEHOLDER, alt: '', display: 'background' },
  },
};

export const PrimaryVariant: Story = {
  args: {
    variant: 'primary',
    title: 'Try our new investment calculator',
    description: 'Model how different contribution rates affect your projected retirement balance.',
    action: { label: 'Try it now', onClick: () => {} },
    image: { src: ILLUSTRATION_PLACEHOLDER, alt: '', display: 'background' },
  },
};

export const DarkVariant: Story = {
  args: {
    variant: 'dark',
    title: 'Introducing ART Advice',
    description: 'Get personalised advice from a qualified financial adviser, included with your membership.',
    action: { label: 'Find out more', onClick: () => {} },
    image: { src: ILLUSTRATION_PLACEHOLDER, alt: '', display: 'background' },
  },
};

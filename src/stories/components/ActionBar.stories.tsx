import type { Meta, StoryObj } from '@storybook/react';
import Box from '@mui/material/Box';
import { ActionBar } from '../../components/ActionBar';

// Inline SVG placeholders — no external dependencies required.
const ICON_PLACEHOLDER =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 64 64'%3E%3Ccircle cx='32' cy='32' r='32' fill='%23e2e8f0'/%3E%3Ctext x='50%25' y='55%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='28' fill='%2394a3b8'%3E🤝%3C/text%3E%3C/svg%3E";

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
          'A promotional banner placed after a section of content. Combines a title, supporting text, and a CTA button. Supports an optional icon or decorative image. Two colour variants: `dark` (brand navy) and `light` (neutral tinted surface).',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['light', 'dark'],
      description: '`light` — neutral tinted surface. `dark` — brand navy with inverse text.',
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

// ── Default (playground) ───────────────────────────────────────────────────────

export const Default: Story = {
  args: {
    variant: 'dark',
    title: 'Become a member today',
    description:
      'With over a century of experience, why not join a super fund that works for you, not shareholders.',
    image: { src: ICON_PLACEHOLDER, alt: '', variant: 'icon' },
    action: { label: 'Join us today', onClick: () => {} },
  },
};

// ── Variants ───────────────────────────────────────────────────────────────────

export const Variants: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Both colour variants side by side.',
      },
    },
  },
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, maxWidth: 800 }}>
      <ActionBar
        variant="dark"
        title="Become a member today"
        description="With over a century of experience, why not join a super fund that works for you, not shareholders."
        image={{ src: ICON_PLACEHOLDER, alt: '', variant: 'icon' }}
        action={{ label: 'Join us today', onClick: () => {} }}
      />
      <ActionBar
        variant="light"
        title="Join a super fund you can trust"
        description="Awaken your super today. You'll be joining over 2.4 million members who trust us to manage their super savings."
        image={{ src: DECORATIVE_PLACEHOLDER, alt: 'Person with a friendly monster', variant: 'decorative' }}
        action={{ label: 'Join ART', onClick: () => {} }}
      />
    </Box>
  ),
};

// ── With icon image (dark) ─────────────────────────────────────────────────────

export const DarkWithIcon: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Dark variant with a circular icon image. Button floats to the right. Use for brand-coloured CTAs at the end of a content section.',
      },
    },
  },
  args: {
    variant: 'dark',
    title: 'Become a member today',
    description:
      'With over a century of experience, why not join a super fund that works for you, not shareholders.',
    image: { src: ICON_PLACEHOLDER, alt: '', variant: 'icon' },
    action: { label: 'Join us today', onClick: () => {} },
  },
};

// ── With decorative image (light) ─────────────────────────────────────────────

export const LightWithDecorative: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Light variant with a large decorative image on the left. Button renders below the text. Use for lifestyle or brand storytelling placements.',
      },
    },
  },
  args: {
    variant: 'light',
    title: 'Join a super fund you can trust',
    description:
      "Awaken your super today. You'll be joining over 2.4 million members who trust us to manage their super savings.",
    image: {
      src: DECORATIVE_PLACEHOLDER,
      alt: 'Person sitting on a friendly monster',
      variant: 'decorative',
    },
    action: { label: 'Join ART', onClick: () => {} },
  },
};

// ── No image ───────────────────────────────────────────────────────────────────

export const NoImage: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Image is optional. Without one, title and description fill the available space.',
      },
    },
  },
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, maxWidth: 800 }}>
      <ActionBar
        variant="dark"
        title="Ready to get started?"
        description="Open an account in minutes and join over 2 million members."
        action={{ label: 'Get started', onClick: () => {} }}
      />
      <ActionBar
        variant="light"
        title="Ready to get started?"
        description="Open an account in minutes and join over 2 million members."
        action={{ label: 'Get started', onClick: () => {} }}
      />
    </Box>
  ),
};

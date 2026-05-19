import type { Meta, StoryObj } from '@storybook/react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { SkipLinks, type SkipLink } from '../../components/SkipLinks'

const meta = {
  title: 'Accessibility / SkipLinks',
  component: SkipLinks,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Visually hidden navigation landmarks that appear when focused via keyboard. Must be the first focusable element on the page — rendered in `layout.tsx` before all other content. Tab into this story to see the links appear.',
      },
    },
  },
  argTypes: {
    links: {
      description:
        'Array of skip link targets. Each entry needs a `label` (visible text), a `targetId` (the `id` attribute on the landmark element), and an optional `icon` (FontAwesome icon name). Defaults to main content, navigation, and footer.',
      control: 'object',
      table: { type: { summary: 'SkipLink[]' } },
    },
  },
} satisfies Meta<typeof SkipLinks>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  name: 'Default (tab to reveal)',
  render: () => (
    <Box sx={{ position: 'relative', minHeight: 120, bgcolor: 'background.default' }}>
      <SkipLinks />
      <Box sx={{ p: 4 }}>
        <Typography variant="body" sx={{ color: 'text.muted' }}>
          Tab into this canvas to reveal the skip links.
        </Typography>
      </Box>
    </Box>
  ),
}

const VISIBLE_LINKS: SkipLink[] = [
  { label: 'Skip to main content', targetId: 'main-content', icon: 'house' },
  { label: 'Skip to navigation', targetId: 'main-nav', icon: 'bars' },
  { label: 'Skip to footer', targetId: 'footer', icon: 'arrow-down-to-line' },
]

export const Visible: Story = {
  name: 'Visible (design review)',
  parameters: {
    docs: {
      description: {
        story: 'Forces links into their revealed state for design review. In production they are hidden until focused via keyboard.',
      },
    },
  },
  render: () => (
    <Box
      sx={{
        minHeight: 300,
        bgcolor: 'background.default',
        // Override the translate so cards are always visible
        '& nav a': { transform: 'translateX(0) !important' },
      }}
    >
      <SkipLinks links={VISIBLE_LINKS} />
    </Box>
  ),
}

export const Custom: Story = {
  name: 'Custom links',
  args: {
    links: [
      { label: 'Skip to main content', targetId: 'main-content', icon: 'house' },
      { label: 'Skip to navigation', targetId: 'main-nav', icon: 'bars' },
    ],
  },
  render: (args) => (
    <Box sx={{ position: 'relative', minHeight: 120, bgcolor: 'background.default' }}>
      <SkipLinks {...args} />
      <Box sx={{ p: 4 }}>
        <Typography variant="body" sx={{ color: 'text.muted' }}>
          Tab into this canvas to reveal the skip links.
        </Typography>
      </Box>
    </Box>
  ),
}

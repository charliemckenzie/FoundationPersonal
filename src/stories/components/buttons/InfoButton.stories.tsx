import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { InfoButton, type InfoButtonSize } from '../../../components/InfoButton';

const meta: Meta<typeof InfoButton> = {
  title: 'Components / Buttons / InfoButton',
  component: InfoButton,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    label: { control: 'text' },
    icon: { control: 'text' },
    size: { control: 'select', options: ['sm', 'md', 'lg', 'xl'] },
    placement: {
      control: 'select',
      options: ['top', 'top-start', 'top-end', 'bottom', 'bottom-start', 'bottom-end', 'left', 'right'],
    },
    sx: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof InfoButton>;

export const TooltipMode: Story = {
  name: 'Tooltip mode',
  parameters: {
    docs: {
      description: {
        story:
          'Default mode. Shows a tooltip on hover/focus. Use for short, supplementary text. Not reachable on touch-only devices — use **Dialog mode** for essential information.',
      },
    },
  },
  args: {
    tooltip: 'Your preservation age is when you can first access your super.',
    placement: 'top',
  },
};

export const SizeByLineHeight: Story = {
  name: 'Size — line height matching',
  parameters: {
    docs: {
      description: {
        story:
`Match \`size\` to the line height of the surrounding text. \`sm\` is the minimum — use it for any text whose line height is 24px or below (\`body\`, \`small\`, \`caption\`, \`h5\`, \`h6\`).

| Typography | Line height | size |
|---|---|---|
| \`caption\` 12px × 1.5 | 18px | \`sm\` |
| \`small\` 14px × 1.5 | 21px | \`sm\` |
| \`h6\` 18px × 1.333 | 24px | \`sm\` |
| \`h5\` 20px × 1.2 | 24px | \`sm\` |
| \`body\` 16px × 1.5 | 24px | \`sm\` |
| \`h4\` 24px × 1.2 | 29px | \`md\` |
| \`lead\` 20px × 1.6 | 32px | \`lg\` |
| \`h3\` 28px × 1.2 | 34px | \`lg\` |
| \`h2\` (max) 32px × 1.2 | 38px | \`xl\` |

The button always uses \`vertical-align: middle\` to stay centred on the text baseline.`,
      },
    },
  },
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Typography variant="caption" color="text.muted" sx={{ width: '4rem', flexShrink: 0 }}>caption</Typography>
        <Typography variant="caption">Account opened 12 Jan 2020<InfoButton size="sm" tooltip="The date your account was created." sx={{ ml: 0.5 }} /></Typography>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Typography variant="caption" color="text.muted" sx={{ width: '4rem', flexShrink: 0 }}>small</Typography>
        <Typography variant="small">Helper text goes here<InfoButton size="sm" tooltip="Additional context for this field." sx={{ ml: 0.5 }} /></Typography>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Typography variant="caption" color="text.muted" sx={{ width: '4rem', flexShrink: 0 }}>body</Typography>
        <Typography variant="body">Preservation age<InfoButton size="sm" tooltip="The age at which you can first access your super." sx={{ ml: 0.5 }} /></Typography>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Typography variant="caption" color="text.muted" sx={{ width: '4rem', flexShrink: 0 }}>h4</Typography>
        <Typography variant="h4">Account balance<InfoButton size="md" tooltip="Total value of all investments in your account." sx={{ ml: 0.5 }} /></Typography>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Typography variant="caption" color="text.muted" sx={{ width: '4rem', flexShrink: 0 }}>lead</Typography>
        <Typography variant="lead">Investment returns<InfoButton size="lg" tooltip="Returns are calculated net of fees and taxes." sx={{ ml: 0.5 }} /></Typography>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Typography variant="caption" color="text.muted" sx={{ width: '4rem', flexShrink: 0 }}>h3</Typography>
        <Typography variant="h3">Your super<InfoButton size="lg" tooltip="All amounts shown are in Australian dollars." sx={{ ml: 0.5 }} /></Typography>
      </Box>
    </Box>
  ),
};

export const DialogMode: Story = {
  name: 'Dialog mode',
  parameters: {
    docs: {
      description: {
        story:
          'Opens a Dialog on click. Use when the content is longer than a sentence or must be accessible on touch devices.',
      },
    },
  },
  args: {
    dialogTitle: 'About preservation age',
    dialogContent: (
      <Typography variant="body">
        Your preservation age is between 55 and 60 depending on your date of birth. Once you reach
        preservation age and meet a condition of release, you can access your super.
      </Typography>
    ),
  },
};

export const InlineWithText: Story = {
  name: 'Inline with text',
  parameters: {
    docs: {
      description: {
        story:
          'The primary use case — sits alongside a label or heading without disrupting line height. `display: inline-flex; vertical-align: middle` keeps it flush with the text baseline.',
      },
    },
  },
  render: () => (
    <Box sx={{ maxWidth: 360 }}>
      <Typography variant="body">
        Preservation age
        <InfoButton
          tooltip="The age at which you can first access your super."
          sx={{ ml: 0.5 }}
        />
      </Typography>

      <Typography variant="body" sx={{ mt: 2, display: 'block' }}>
        Investment returns
        <InfoButton
          dialogTitle="About investment returns"
          dialogContent={
            <Typography variant="body">
              Returns are calculated net of fees and taxes, based on unit prices.
            </Typography>
          }
          sx={{ ml: 0.5 }}
        />
      </Typography>

      <Typography variant="h6" sx={{ mt: 3 }}>
        Account balance
        <InfoButton
          tooltip="The total value of all investments in your account."
          sx={{ ml: 0.5 }}
        />
      </Typography>
    </Box>
  ),
};

const SIZES: InfoButtonSize[] = ['sm', 'md', 'lg', 'xl'];
const SIZE_LABELS: Record<InfoButtonSize, string> = {
  sm: 'sm — 24×24',
  md: 'md — 28×28',
  lg: 'lg — 32×32',
  xl: 'xl — 36×36',
};

export const Sizes: Story = {
  parameters: {
    docs: {
      description: {
        story: 'All five sizes. The hit target grows while the icon scales proportionally.',
      },
    },
  },
  render: () => (
    <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
      {SIZES.map((s) => (
        <Box key={s} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
          <InfoButton size={s} tooltip={`Size: ${s}`} />
          <Typography variant="caption" color="text.muted">{SIZE_LABELS[s]}</Typography>
        </Box>
      ))}
    </Box>
  ),
};

export const CustomIcon: Story = {
  name: 'Custom icon',
  parameters: {
    docs: {
      description: {
        story: 'Override the default `circle-info` icon. Use `circle-question` for help text, or a warning icon for caveats.',
      },
    },
  },
  render: () => (
    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
        <Typography variant="small" color="text.muted">info (default)</Typography>
        <InfoButton tooltip="Info tooltip" />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
        <Typography variant="small" color="text.muted">question</Typography>
        <InfoButton icon="circle-question" tooltip="Help tooltip" />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
        <Typography variant="small" color="text.muted">exclamation</Typography>
        <InfoButton icon="circle-exclamation" tooltip="Warning tooltip" />
      </Box>
    </Box>
  ),
};

import type { Meta, StoryObj } from '@storybook/react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ArtieAIButton } from '../../../components/ArtieAIButton';

const meta = {
  title: 'Components / Buttons / ArtieAI Button',
  component: ArtieAIButton,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Specialised AI entry-point button with a light-to-vivid blue gradient (electric blue → sky blue). Use to invoke Artie AI features — not as a general-purpose action button.',
      },
    },
  },
  argTypes: {
    label:    { control: 'text' },
    size:     { control: 'select', options: ['small', 'medium', 'large'] },
    disabled: { control: 'boolean' },
    onClick:  { table: { disable: true } },
    type:     { table: { disable: true } },
  },
} satisfies Meta<typeof ArtieAIButton>;

export default meta;
type Story = StoryObj<typeof ArtieAIButton>;

export const Default: Story = {
  args: {
    label: 'Ask Artie',
    size: 'medium',
    disabled: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Playground. Toggle **disabled** in the controls panel to preview the de-animated state.',
      },
    },
  },
};

export const Sizes: Story = {
  render: () => (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 4, flexWrap: 'wrap' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
        <ArtieAIButton size="small" label="Ask Artie" />
        <Typography variant="caption" sx={{ color: 'text.muted' }}>small</Typography>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
        <ArtieAIButton size="medium" label="Ask Artie" />
        <Typography variant="caption" sx={{ color: 'text.muted' }}>medium</Typography>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
        <ArtieAIButton size="large" label="Ask Artie" />
        <Typography variant="caption" sx={{ color: 'text.muted' }}>large</Typography>
      </Box>
    </Box>
  ),
  parameters: {
    docs: {
      description: { story: 'Three sizes — matching the standard Button size scale.' },
    },
  },
};

export const Disabled: Story = {
  args: {
    label: 'Ask Artie',
    size: 'medium',
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Disabled state: gradient dims via opacity reduction. The button remains inert.',
      },
    },
  },
};

export const InHeader: Story = {
  render: () => (
    <Box
      sx={(t) => ({
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        px: 3,
        height: '4.5rem',
        backgroundColor: t.palette.background.paper,
        borderBottom: `1px solid ${t.palette.border.subtle}`,
        borderRadius: 1,
        minWidth: '28rem',
      })}
    >
      <ArtieAIButton size="small" label="Ask Artie" />
    </Box>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'As it appears in the MemberHeader — small size, paper background context.',
      },
    },
  },
};

export const CustomLabel: Story = {
  args: {
    label: 'Ask a question',
    size: 'medium',
    disabled: false,
  },
  parameters: {
    docs: {
      description: { story: 'The label prop accepts any string.' },
    },
  },
};

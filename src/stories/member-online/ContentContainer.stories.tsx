import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ContentContainer } from '../../components/MemberOnline';
import type { ContentContainerSize } from '../../components/MemberOnline';

const meta: Meta<typeof ContentContainer> = {
  title: 'Member Online / Target State / ContentContainer',
  component: ContentContainer,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Centers page content within the MemberOnline main area. The outer box provides responsive horizontal padding (20px below 600px, 28px from 600px, 40px from 1200px). The inner box constrains the content to the chosen max-width. All sizes are in pixels and divisible by 8.',
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'] satisfies ContentContainerSize[],
      description: 'Max-width of the content area (edge to edge, excluding padding).',
      table: {
        defaultValue: { summary: 'lg' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ContentContainer>;

function Placeholder({ size }: { size: ContentContainerSize }) {
  const labels: Record<ContentContainerSize, string> = {
    xs: 'xs — 512px',
    sm: 'sm — 648px',
    md: 'md — 768px',
    lg: 'lg — 960px',
    xl: 'xl — 1200px',
    '2xl': '2xl — 1440px',
  };
  return (
    <Box
      sx={{
        bgcolor: 'action.hover',
        borderRadius: 2,
        height: '12rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Typography variant="body" color="text.secondary">
        Content area — {labels[size]}
      </Typography>
    </Box>
  );
}

export const Default: Story = {
  args: { size: 'lg' },
  render: (args) => (
    <ContentContainer {...args}>
      <Placeholder size={args.size ?? 'lg'} />
    </ContentContainer>
  ),
};

export const AllSizes: Story = {
  parameters: {
    docs: {
      description: { story: 'All six sizes stacked. Resize the viewport to see responsive padding in action.' },
    },
  },
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, py: 2 }}>
      {(['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as ContentContainerSize[]).map((size) => (
        <ContentContainer key={size} size={size}>
          <Placeholder size={size} />
        </ContentContainer>
      ))}
    </Box>
  ),
};

import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Logo } from '../../components/Logo';

type Story = StoryObj<typeof Logo>;

const meta: Meta<typeof Logo> = {
  title: 'Atomic Components / Logo',
  component: Logo,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'mark'],
      description: 'Logo variant. `secondary` and `mark` fall back to `primary` if not defined for the current brand.',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Controls the logo height. Width scales proportionally.',
    },
    alt: {
      control: 'text',
      description: 'Overrides the brand default alt text.',
    },
  },
  args: {
    variant: 'primary',
    size: 'md',
  },
};

export default meta;

export const Default: Story = {};

export const AllVariants: Story = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      {(['primary', 'secondary', 'mark'] as const).map((variant) => (
        <Box key={variant} sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Typography variant="small" sx={{ color: 'text.secondary' }}>
            {variant}
          </Typography>
          <Logo variant={variant} size="md" />
        </Box>
      ))}
    </Box>
  ),
  parameters: { controls: { disable: true } },
};

export const AllSizes: Story = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <Box key={size} sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          <Typography variant="small" sx={{ color: 'text.secondary', width: (t) => t.spacing(4) }}>
            {size}
          </Typography>
          <Logo variant="primary" size={size} />
        </Box>
      ))}
    </Box>
  ),
  parameters: { controls: { disable: true } },
};

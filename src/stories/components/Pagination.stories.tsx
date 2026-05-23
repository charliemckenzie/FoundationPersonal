import type { Meta, StoryObj } from '@storybook/react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Pagination } from '../../components/Pagination';
import type { PaginationProps } from '../../components/Pagination';

const meta = {
  title: 'Components / Pagination',
  component: Pagination,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Wraps MUI Pagination. Connects to brand design tokens for colour, border, focus, and disabled states. Supports three sizes and controlled or uncontrolled usage.',
      },
    },
  },
  argTypes: {
    count:         { control: { type: 'number', min: 1 } },
    page:          { control: { type: 'number', min: 1 }, table: { disable: true } },
    defaultPage:   { table: { disable: true } },
    variant:       { table: { disable: true } },
    color:         { table: { disable: true } },
    size:          { table: { disable: true } },
    siblingCount:  { control: { type: 'number', min: 0, max: 3 } },
    boundaryCount: { control: { type: 'number', min: 0, max: 3 } },
    disabled:      { control: 'boolean' },
    showFirstButton: { control: 'boolean' },
    showLastButton:  { control: 'boolean' },
    onChange:      { table: { disable: true } },
    sx:            { table: { disable: true } },
  },
} satisfies Meta<PaginationProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    count: 10,
    defaultPage: 1,
    color: 'primary',
    disabled: false,
    siblingCount: 0,
    boundaryCount: 1,
    showFirstButton: false,
    showLastButton: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive playground. Use controls to explore all props.',
      },
    },
  },
};

export const WithFirstLastButtons: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Show jump-to-first and jump-to-last buttons for long page ranges.',
      },
    },
  },
  render: () => (
    <Pagination count={20} defaultPage={10} showFirstButton showLastButton />
  ),
};

export const Disabled: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Disables all interaction. Uses `text.disabled` and `border.subtle` tokens.',
      },
    },
  },
  render: () => (
    <Pagination count={10} defaultPage={3} disabled />
  ),
};

export const ManyPages: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Ellipsis appear when pages exceed `siblingCount` + `boundaryCount` on each side.',
      },
    },
  },
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box>
        <Typography variant="caption" sx={{ display: 'block', mb: 1, color: 'text.muted' }}>siblingCount=1 boundaryCount=1 (default)</Typography>
        <Pagination count={50} defaultPage={25} />
      </Box>
      <Box>
        <Typography variant="caption" sx={{ display: 'block', mb: 1, color: 'text.muted' }}>siblingCount=2 boundaryCount=2</Typography>
        <Pagination count={50} defaultPage={25} siblingCount={2} boundaryCount={2} />
      </Box>
    </Box>
  ),
};

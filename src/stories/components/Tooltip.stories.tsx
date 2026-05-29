import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Tooltip } from '../../components/Tooltip';
import { Button } from '../../components/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const meta: Meta<typeof Tooltip> = {
  title: 'Components / Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    placement: {
      control: 'select',
      options: ['top', 'top-start', 'top-end', 'bottom', 'bottom-start', 'bottom-end', 'left', 'right'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  args: { title: 'This is a tooltip', arrow: true, placement: 'top' },
  render: (args) => (
    <Tooltip {...args}>
      <Button label="Hover me" />
    </Tooltip>
  ),
};

export const Placements: Story = {
  render: () => (
    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, auto)', gap: 2, justifyItems: 'center', alignItems: 'center', p: 4 }}>
      <div />
      <Tooltip title="Top" placement="top"><Button label="Top" size="small" /></Tooltip>
      <div />
      <Tooltip title="Left" placement="left"><Button label="Left" size="small" /></Tooltip>
      <Typography variant="body" color="text.muted" align="center">Placements</Typography>
      <Tooltip title="Right" placement="right"><Button label="Right" size="small" /></Tooltip>
      <div />
      <Tooltip title="Bottom" placement="bottom"><Button label="Bottom" size="small" /></Tooltip>
      <div />
    </Box>
  ),
};

export const NoArrow: Story = {
  args: { title: 'No arrow tooltip', arrow: false, placement: 'top' },
  render: (args) => (
    <Tooltip {...args}>
      <Button label="Hover me" />
    </Tooltip>
  ),
};

export const DisabledTrigger: Story = {
  render: () => (
    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
      <Tooltip title="Tooltip on a disabled button" placement="top">
        <span>
          <Button label="Disabled button" disabled />
        </span>
      </Tooltip>
      <Tooltip title="This tooltip never shows" disableHoverListener disableFocusListener disableTouchListener>
        <Button label="All listeners off" variant="outlined" />
      </Tooltip>
    </Box>
  ),
};

export const RichContent: Story = {
  render: () => (
    <Tooltip
      title={
        <Box>
          <Typography variant="small" sx={{ fontWeight: 600, display: 'block' }}>Keyboard shortcut</Typography>
          <Typography variant="small">⌘ + K</Typography>
        </Box>
      }
      placement="bottom"
    >
      <Button label="Rich tooltip" variant="outlined" />
    </Tooltip>
  ),
};

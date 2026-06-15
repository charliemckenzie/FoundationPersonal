import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Button } from '../../../components/Button';
import {
  SuccessSummaryCard,
  SummaryRow,
  ImpactBox,
} from '../../../features/retirement-projection/SuccessSummaryCard';

const meta = {
  title: 'Features / Retirement Projection / SuccessSummaryCard',
  component: SuccessSummaryCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Expanded "completed journey" card: green success header, white body of SummaryRows / ImpactBox, and an action row. Shared by the contributions, investment, TTR, and retirement-goal summaries.',
      },
    },
  },
  decorators: [(Story) => <Box sx={{ maxWidth: 480 }}><Story /></Box>],
} satisfies Meta<typeof SuccessSummaryCard>;

export default meta;
type Story = StoryObj<typeof SuccessSummaryCard>;

export const Contributions: Story = {
  render: () => (
    <SuccessSummaryCard
      title="Extra contributions added"
      actions={
        <>
          <Button label="View details" size="small" variant="outlined" />
          <Button label="Undo" size="small" variant="ghost" />
        </>
      }
    >
      <Box sx={{ mb: 2 }}>
        <SummaryRow label="Salary sacrifice" value="$150/fn" />
        <SummaryRow label="After-tax contributions" value="$50/fn" />
        <SummaryRow label="Total extra per year" value="$5,200" strongLabel divider={false} />
      </Box>
      <ImpactBox label="Projected impact on your super balance">
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <Typography variant="small">Improvement</Typography>
          <Typography variant="small" sx={{ fontWeight: 700, color: 'success.main' }}>+$75,331</Typography>
        </Box>
      </ImpactBox>
    </SuccessSummaryCard>
  ),
};

export const RetirementGoal: Story = {
  render: () => (
    <SuccessSummaryCard
      title="Retirement goal updated"
      actions={
        <>
          <Button label="Edit" size="small" variant="outlined" />
          <Button label="Undo" size="small" variant="ghost" />
        </>
      }
    >
      <Box sx={{ mb: 2 }}>
        <SummaryRow label="Retirement age" value="67" />
        <SummaryRow label="Target income" value="Comfortable ($51,630 p.a.)" divider={false} />
      </Box>
    </SuccessSummaryCard>
  ),
};

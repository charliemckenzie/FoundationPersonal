import type { Meta, StoryObj } from '@storybook/react'
import { BarChart } from '../../../components/Charts'

const MONTHLY_DATA = [
  { month: 'Jan', revenue: 4200, expenses: 2800 },
  { month: 'Feb', revenue: 3800, expenses: 3100 },
  { month: 'Mar', revenue: 5100, expenses: 2900 },
  { month: 'Apr', revenue: 4700, expenses: 3200 },
  { month: 'May', revenue: 6200, expenses: 3400 },
  { month: 'Jun', revenue: 5800, expenses: 3000 },
]

const meta = {
  title: 'Components / Charts / BarChart',
  component: BarChart,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Bar chart built with Recharts. Supports single and grouped bars. Colours pull from the MUI theme palette in order — override per series with the `color` prop. Keyboard accessible via the `accessibilityLayer` prop.',
      },
    },
  },
  argTypes: {
    height: { control: { type: 'range', min: 200, max: 600, step: 50 } },
    barSize: { control: { type: 'range', min: 4, max: 60, step: 2 } },
    showGrid: { control: 'boolean' },
    showLegend: { control: 'boolean' },
    showTooltip: { control: 'boolean' },
    ariaLabel: { control: 'text' },
    data: { table: { disable: true } },
    bars: { table: { disable: true } },
    xKey: { table: { disable: true } },
    sx: { table: { disable: true } },
  },
} satisfies Meta<typeof BarChart>

export default meta
type Story = StoryObj<typeof BarChart>

export const Default: Story = {
  args: {
    data: MONTHLY_DATA,
    xKey: 'month',
    bars: [{ dataKey: 'revenue', label: 'Revenue' }],
    height: 300,
    barSize: 40,
    showGrid: true,
    showLegend: true,
    showTooltip: true,
    ariaLabel: 'Monthly revenue bar chart',
  },
  parameters: {
    docs: {
      description: {
        story: 'Single series. Toggle grid, legend, and tooltip via the controls panel.',
      },
    },
  },
}

export const Grouped: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Multiple series rendered side by side. Each series picks the next colour from the theme palette.',
      },
    },
  },
  render: () => (
    <BarChart
      data={MONTHLY_DATA}
      xKey="month"
      bars={[
        { dataKey: 'revenue', label: 'Revenue' },
        { dataKey: 'expenses', label: 'Expenses' },
      ]}
      height={300}
      ariaLabel="Monthly revenue and expenses bar chart"
    />
  ),
}

export const Minimal: Story = {
  parameters: {
    docs: {
      description: {
        story: 'No grid, legend, or tooltip — useful for compact dashboard tiles.',
      },
    },
  },
  render: () => (
    <BarChart
      data={MONTHLY_DATA}
      xKey="month"
      bars={[{ dataKey: 'revenue', label: 'Revenue' }]}
      height={200}
      showGrid={false}
      showLegend={false}
      showTooltip={false}
      ariaLabel="Monthly revenue summary"
    />
  ),
}

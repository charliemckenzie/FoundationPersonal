import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { LineChart } from '../../../components/Charts'

const PERFORMANCE_DATA = [
  { quarter: 'Q1 2023', growth: 4.2, benchmark: 3.8 },
  { quarter: 'Q2 2023', growth: 5.1, benchmark: 4.1 },
  { quarter: 'Q3 2023', growth: 3.7, benchmark: 4.3 },
  { quarter: 'Q4 2023', growth: 6.2, benchmark: 4.9 },
  { quarter: 'Q1 2024', growth: 5.8, benchmark: 5.2 },
  { quarter: 'Q2 2024', growth: 7.1, benchmark: 5.5 },
]

const meta = {
  title: 'Components / Charts / LineChart',
  component: LineChart,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Line chart built with Recharts. Supports multiple series, dashed lines for benchmarks or targets, optional dots, and full keyboard accessibility.',
      },
    },
  },
  argTypes: {
    height: { control: { type: 'range', min: 200, max: 600, step: 50 } },
    showGrid: { control: 'boolean' },
    showLegend: { control: 'boolean' },
    showTooltip: { control: 'boolean' },
    showDots: { control: 'boolean' },
    ariaLabel: { control: 'text' },
    data: { table: { disable: true } },
    lines: { table: { disable: true } },
    xKey: { table: { disable: true } },
    sx: { table: { disable: true } },
  },
} satisfies Meta<typeof LineChart>

export default meta
type Story = StoryObj<typeof LineChart>

export const Default: Story = {
  args: {
    data: PERFORMANCE_DATA,
    xKey: 'quarter',
    lines: [{ dataKey: 'growth', label: 'Fund Growth (%)' }],
    height: 300,
    showGrid: true,
    showLegend: true,
    showTooltip: true,
    showDots: true,
    ariaLabel: 'Quarterly fund growth line chart',
  },
  parameters: {
    docs: {
      description: {
        story: 'Single series. Toggle grid, legend, tooltip, and dots via the controls panel.',
      },
    },
  },
}

export const MultiSeries: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Two series compared side by side. Each picks the next theme palette colour.',
      },
    },
  },
  render: () => (
    <LineChart
      data={PERFORMANCE_DATA}
      xKey="quarter"
      lines={[
        { dataKey: 'growth', label: 'Fund Growth (%)' },
        { dataKey: 'benchmark', label: 'Benchmark (%)' },
      ]}
      height={300}
      ariaLabel="Quarterly fund growth vs benchmark"
    />
  ),
}

export const DashedBenchmark: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Use `dashed: true` on a series to visually distinguish benchmarks or target lines.',
      },
    },
  },
  render: () => (
    <LineChart
      data={PERFORMANCE_DATA}
      xKey="quarter"
      lines={[
        { dataKey: 'growth', label: 'Fund Growth (%)' },
        { dataKey: 'benchmark', label: 'Benchmark (%)', dashed: true },
      ]}
      height={300}
      ariaLabel="Quarterly fund growth with dashed benchmark"
    />
  ),
}

export const NoDots: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Set `showDots={false}` for dense datasets — cleaner trend line.',
      },
    },
  },
  render: () => (
    <LineChart
      data={PERFORMANCE_DATA}
      xKey="quarter"
      lines={[{ dataKey: 'growth', label: 'Fund Growth (%)' }]}
      height={300}
      showDots={false}
      ariaLabel="Quarterly fund growth trend without dots"
    />
  ),
}

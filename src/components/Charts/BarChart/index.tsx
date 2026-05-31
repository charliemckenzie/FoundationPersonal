'use client'

import { Box } from '@mui/material'
import type { SxProps } from '@mui/material'
import type { Theme } from '@mui/material/styles'
import { useTheme, alpha } from '@mui/material/styles'
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import type { ChartDataPoint, BarSeries } from '../types'

export interface BarChartProps {
  data: ChartDataPoint[]
  xKey: string
  bars: BarSeries[]
  height?: number
  barSize?: number
  showGrid?: boolean
  showLegend?: boolean
  showTooltip?: boolean
  ariaLabel?: string
  sx?: SxProps<Theme>
}

function getDefaultColors(theme: Theme): string[] {
  return [
    theme.palette.primary.main,
    theme.palette.secondary.main,
    theme.palette.info.main,
    theme.palette.success.main,
    theme.palette.warning.main,
    theme.palette.error.main,
  ]
}

export function BarChart({
  data,
  xKey,
  bars,
  height = 300,
  barSize = 40,
  showGrid = true,
  showLegend = true,
  showTooltip = true,
  ariaLabel = 'Bar chart',
  sx,
}: BarChartProps) {
  const theme = useTheme()
  const defaultColors = getDefaultColors(theme)

  return (
    <Box sx={sx} role="img" aria-label={ariaLabel}>
      <ResponsiveContainer width="100%" height={height}>
        <RechartsBarChart data={data} accessibilityLayer>
          {showGrid && (
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={theme.palette.divider}
            />
          )}
          <XAxis
            dataKey={xKey}
            tick={{ fill: theme.palette.text.secondary, fontSize: theme.typography.caption.fontSize }}
            axisLine={{ stroke: theme.palette.divider }}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: theme.palette.text.secondary, fontSize: theme.typography.caption.fontSize }}
            axisLine={false}
            tickLine={false}
          />
          {showTooltip && (
            <Tooltip
              cursor={{ fill: alpha(theme.palette.text.primary, 0.08) }}
              contentStyle={{
                backgroundColor: theme.palette.background.paper,
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: `${theme.shape.borderRadius}px`,
                color: theme.palette.text.primary,
                fontSize: theme.typography.small.fontSize,
              }}
            />
          )}
          {showLegend && (
            <Legend
              wrapperStyle={{
                color: theme.palette.text.secondary,
                fontSize: theme.typography.small.fontSize,
              }}
            />
          )}
          {bars.map((bar, index) => (
            <Bar
              key={bar.dataKey}
              dataKey={bar.dataKey}
              name={bar.label ?? bar.dataKey}
              fill={bar.color ?? defaultColors[index % defaultColors.length]}
              barSize={barSize}
              radius={[10, 10, 0, 0]}
            />
          ))}
        </RechartsBarChart>
      </ResponsiveContainer>
    </Box>
  )
}

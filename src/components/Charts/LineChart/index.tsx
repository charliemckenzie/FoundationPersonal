'use client'

import { Box } from '@mui/material'
import type { SxProps } from '@mui/material'
import type { Theme } from '@mui/material/styles'
import { useTheme, alpha } from '@mui/material/styles'
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import type { ChartDataPoint, LineSeries } from '../types'

export interface LineChartProps {
  data: ChartDataPoint[]
  xKey: string
  lines: LineSeries[]
  height?: number
  showGrid?: boolean
  showLegend?: boolean
  showTooltip?: boolean
  showDots?: boolean
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

export function LineChart({
  data,
  xKey,
  lines,
  height = 300,
  showGrid = true,
  showLegend = true,
  showTooltip = true,
  showDots = true,
  ariaLabel = 'Line chart',
  sx,
}: LineChartProps) {
  const theme = useTheme()
  const defaultColors = getDefaultColors(theme)

  return (
    <Box sx={sx} role="img" aria-label={ariaLabel}>
      <ResponsiveContainer width="100%" height={height}>
        <RechartsLineChart data={data} accessibilityLayer>
          {showGrid && (
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={theme.palette.divider}
            />
          )}
          <XAxis
            dataKey={xKey}
            tick={{ fill: theme.palette.text.secondary, fontSize: '0.75rem' }}
            axisLine={{ stroke: theme.palette.divider }}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: theme.palette.text.secondary, fontSize: '0.75rem' }}
            axisLine={false}
            tickLine={false}
          />
          {showTooltip && (
            <Tooltip
              cursor={{ stroke: theme.palette.divider, strokeWidth: 1, fill: alpha(theme.palette.text.primary, 0.08) }}
              contentStyle={{
                backgroundColor: theme.palette.background.paper,
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: `${theme.shape.borderRadius}px`,
                color: theme.palette.text.primary,
                fontSize: '0.875rem',
              }}
            />
          )}
          {showLegend && (
            <Legend
              wrapperStyle={{
                color: theme.palette.text.secondary,
                fontSize: '0.875rem',
              }}
            />
          )}
          {lines.map((line, index) => (
            <Line
              key={line.dataKey}
              type="monotone"
              dataKey={line.dataKey}
              name={line.label ?? line.dataKey}
              stroke={line.color ?? defaultColors[index % defaultColors.length]}
              strokeWidth={2}
              strokeDasharray={line.dashed ? '5 5' : undefined}
              dot={showDots}
              activeDot={{ r: 6 }}
            />
          ))}
        </RechartsLineChart>
      </ResponsiveContainer>
    </Box>
  )
}

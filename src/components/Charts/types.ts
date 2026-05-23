export interface ChartDataPoint {
  [key: string]: string | number
}

export interface BarSeries {
  dataKey: string
  label?: string
  color?: string
}

export interface LineSeries {
  dataKey: string
  label?: string
  color?: string
  dashed?: boolean
}

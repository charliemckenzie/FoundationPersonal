import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'
import type { BrandConfig, GridConfig } from '../../app/themes/brands/index'

declare module '@mui/material/styles' {
  interface Theme {
    brandConfig: BrandConfig;
  }
}

type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

const BP_ORDER: Breakpoint[] = ['xs', 'sm', 'md', 'lg', 'xl']

const BP_RANGES: Record<Breakpoint, string> = {
  xs: '0 – 599px',
  sm: '600 – 899px',
  md: '900 – 1,199px',
  lg: '1,200 – 1,535px',
  xl: '1,536px+',
}

// Representative reference widths for proportional scaling
const REFERENCE_WIDTHS: Record<Breakpoint, number> = {
  xs: 375,
  sm: 768,
  md: 1024,
  lg: 1280,
  xl: 1440,
}

// Strip widths rendered in the canvas
const STRIP_WIDTHS: Record<Breakpoint, number> = {
  xs: 240,
  sm: 400,
  md: 580,
  lg: 700,
  xl: 700,
}

function ColumnStrip({
  columns,
  gutter,
  margin,
  bp,
}: {
  columns: number
  gutter: number
  margin: number | 'auto'
  bp: Breakpoint
}) {
  const stripWidth = STRIP_WIDTHS[bp]
  const scale = stripWidth / REFERENCE_WIDTHS[bp]
  const m = margin === 'auto' ? 0 : (margin as number)
  const scaledMargin = m * scale
  const scaledGutter = gutter * scale
  const innerWidth = stripWidth - scaledMargin * 2
  const colWidth = (innerWidth - scaledGutter * (columns - 1)) / columns

  return (
    <Box
      sx={{
        position: 'relative',
        width: stripWidth,
        height: 32,
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: '4px',
        overflow: 'hidden',
        flexShrink: 0,
        bgcolor: 'background.paper',
      }}
    >
      {scaledMargin > 0 && (
        <>
          <Box sx={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: scaledMargin, bgcolor: 'primary.main', opacity: 0.08 }} />
          <Box sx={{ position: 'absolute', top: 0, bottom: 0, right: 0, width: scaledMargin, bgcolor: 'primary.main', opacity: 0.08 }} />
        </>
      )}
      {Array.from({ length: columns }).map((_, i) => (
        <Box
          key={i}
          sx={{
            position: 'absolute',
            top: 3,
            bottom: 3,
            left: scaledMargin + i * (colWidth + scaledGutter),
            width: Math.max(colWidth, 0),
            bgcolor: 'primary.main',
            opacity: 0.22,
            borderRadius: '2px',
          }}
        />
      ))}
    </Box>
  )
}

function SpacingBadge({ value, unit = 'px' }: { value: number; unit?: string }) {
  return (
    <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5 }}>
      <Typography variant="body" component="span">
        {value}{unit}
      </Typography>
      <Typography variant="small" component="span" color="text.muted">
        ({value / 8}×)
      </Typography>
    </Box>
  )
}

function SpecTable({ grid }: { grid: GridConfig }) {
  return (
    <Box
      component="table"
      sx={{
        width: '100%',
        borderCollapse: 'collapse',
        '& th, & td': {
          textAlign: 'left',
          py: 1.5,
          px: 2,
          borderBottom: '1px solid',
          borderColor: 'divider',
          verticalAlign: 'middle',
        },
        '& th': {
          fontWeight: 700,
          color: 'text.muted',
          fontSize: '0.75rem',
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          bgcolor: 'background.elevated',
        },
        '& tr:last-child td': {
          borderBottom: 'none',
        },
      }}
    >
      <thead>
        <tr>
          <th>Breakpoint</th>
          <th>Viewport</th>
          <th>Columns</th>
          <th>Gutter</th>
          <th>Margin</th>
          <th>Max width</th>
        </tr>
      </thead>
      <tbody>
        {BP_ORDER.map((bp) => {
          const isConstrained = grid.margin[bp] === 'auto'
          return (
            <tr key={bp}>
              <td>
                <Box
                  component="code"
                  sx={{ fontFamily: 'monospace', color: 'primary.main', fontWeight: 700, fontSize: '0.875rem' }}
                >
                  {bp}
                </Box>
              </td>
              <td>
                <Typography variant="small" color="text.muted" sx={{ fontFamily: 'monospace' }}>
                  {BP_RANGES[bp]}
                </Typography>
              </td>
              <td>
                <Typography variant="body" sx={{ fontWeight: 600 }}>
                  {grid.columns[bp]}
                </Typography>
              </td>
              <td>
                <SpacingBadge value={grid.gutter[bp]} />
              </td>
              <td>
                {isConstrained ? (
                  <Typography variant="small" color="text.muted" sx={{ fontFamily: 'monospace' }}>
                    auto
                  </Typography>
                ) : (
                  <SpacingBadge value={grid.margin[bp] as number} />
                )}
              </td>
              <td>
                {isConstrained ? (
                  <Typography variant="body" sx={{ fontFamily: 'monospace', fontWeight: 600 }}>
                    {grid.maxWidth.toLocaleString()}px
                  </Typography>
                ) : (
                  <Typography variant="small" color="text.muted">—</Typography>
                )}
              </td>
            </tr>
          )
        })}
      </tbody>
    </Box>
  )
}

function GridDoc() {
  const theme = useTheme()
  const grid = theme.brandConfig.grid

  if (!grid) {
    return (
      <Box sx={{ p: 6 }}>
        <Typography variant="h4" sx={{ mb: 1 }}>Grid System</Typography>
        <Typography variant="body" color="text.muted">
          No grid configuration defined for this theme. Switch to <strong>Theme B</strong> in the toolbar to view the grid specification.
        </Typography>
      </Box>
    )
  }

  return (
    <Box sx={{ p: 4, maxWidth: 960 }}>
      <Typography variant="h4" sx={{ mb: 0.5 }}>Grid System</Typography>
      <Typography variant="body" color="text.muted" sx={{ display: 'block', mb: 4 }}>
        12-column fluid grid. Gutters and margins are derived from the spacing scale (base&nbsp;8px).
        Content max-width {grid.maxWidth.toLocaleString()}px, centred at lg and above.
      </Typography>

      {/* Spec table */}
      <Box sx={{ mb: 6, border: '1px solid', borderColor: 'divider', borderRadius: 1, overflow: 'hidden' }}>
        <SpecTable grid={grid} />
      </Box>

      {/* Visual column strips */}
      <Typography variant="h6" sx={{ mb: 0.5 }}>Column layout</Typography>
      <Typography variant="small" color="text.muted" sx={{ display: 'block', mb: 3 }}>
        Columns (solid) and page margins (tinted) per breakpoint. Widths are proportionally scaled from the reference viewport.
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
        {BP_ORDER.map((bp) => (
          <Box key={bp} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ width: 28, flexShrink: 0 }}>
              <Typography variant="small" sx={{ fontFamily: 'monospace', color: 'primary.main', fontWeight: 700 }}>
                {bp}
              </Typography>
            </Box>
            <Box sx={{ width: 110, flexShrink: 0 }}>
              <Typography variant="small" color="text.muted">
                {grid.columns[bp]}&nbsp;col · {grid.gutter[bp]}px gap
              </Typography>
            </Box>
            <ColumnStrip
              columns={grid.columns[bp]}
              gutter={grid.gutter[bp]}
              margin={grid.margin[bp]}
              bp={bp}
            />
          </Box>
        ))}
      </Box>

      {/* Legend */}
      <Box sx={{ display: 'flex', gap: 3, mt: 2.5, mb: 6 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box sx={{ width: 16, height: 12, bgcolor: 'primary.main', opacity: 0.22, borderRadius: '2px' }} />
          <Typography variant="small" color="text.muted">Column</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box sx={{ width: 16, height: 12, bgcolor: 'primary.main', opacity: 0.08, borderRadius: '2px' }} />
          <Typography variant="small" color="text.muted">Page margin</Typography>
        </Box>
      </Box>

      {/* How to use */}
      <Typography variant="h6" sx={{ mb: 1.5 }}>How to use</Typography>
      <Typography variant="body" color="text.muted" sx={{ display: 'block', mb: 2 }}>
        Wrap page content in a{' '}
        <Box component="code" sx={{ fontFamily: 'monospace', fontSize: '0.875em', color: 'primary.main' }}>Container</Box>
        {' '}and use MUI{' '}
        <Box component="code" sx={{ fontFamily: 'monospace', fontSize: '0.875em', color: 'primary.main' }}>Grid</Box>
        {' '}for column spans. Gutter and margin are applied via the{' '}
        <Box component="code" sx={{ fontFamily: 'monospace', fontSize: '0.875em', color: 'primary.main' }}>spacing</Box>
        {' '}prop on{' '}
        <Box component="code" sx={{ fontFamily: 'monospace', fontSize: '0.875em', color: 'primary.main' }}>Grid container</Box>.
      </Typography>

      <Box
        component="pre"
        sx={{
          p: 2.5,
          bgcolor: 'background.elevated',
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 1,
          fontFamily: 'monospace',
          fontSize: '0.8125rem',
          lineHeight: 1.7,
          overflowX: 'auto',
          color: 'text.primary',
          whiteSpace: 'pre',
        }}
      >{`import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'

// Constrain content to ${grid.maxWidth}px, centred at lg+
<Container maxWidth={false} sx={{ maxWidth: ${grid.maxWidth} }}>

  {/* Gutter matches spacing scale: xs/sm = 2×8px, md/lg = 3×8px, xl = 4×8px */}
  <Grid container spacing={{ xs: 2, md: 3, xl: 4 }}>

    {/* Full width on mobile → half on tablet → third on desktop */}
    <Grid size={{ xs: 4, sm: 4, md: 4 }}>...</Grid>

    {/* Sidebar: full width on mobile → 3 of 8 on tablet → 3 of 12 on desktop */}
    <Grid size={{ xs: 4, sm: 3, md: 3 }}>...</Grid>

  </Grid>
</Container>`}
      </Box>

      <Box sx={{ mt: 3, p: 2.5, bgcolor: 'background.elevated', borderRadius: 1, border: '1px solid', borderColor: 'divider' }}>
        <Typography variant="body" sx={{ fontWeight: 700, display: 'block', mb: 0.5 }}>
          Column span reference
        </Typography>
        <Typography variant="small" color="text.muted">
          On mobile (4 col), each{' '}
          <Box component="code" sx={{ fontFamily: 'monospace', fontSize: '0.875em' }}>size&#123; xs: n &#125;</Box>
          {' '}spans n of 4 columns.
          On tablet (8 col), n of 8. On desktop (12 col), n of 12.
          A component spanning half the page is{' '}
          <Box component="code" sx={{ fontFamily: 'monospace', fontSize: '0.875em' }}>size=&#123;&#123; xs: 4, sm: 4, md: 6 &#125;&#125;</Box>.
        </Typography>
      </Box>
    </Box>
  )
}

const meta: Meta<typeof GridDoc> = {
  title: 'Design Tokens / Grid',
  component: GridDoc,
  parameters: {
    layout: 'fullscreen',
    docs: { canvas: { sourceState: 'hidden' } },
  },
}
export default meta

export const Default: StoryObj<typeof GridDoc> = {
  render: () => <GridDoc />,
}

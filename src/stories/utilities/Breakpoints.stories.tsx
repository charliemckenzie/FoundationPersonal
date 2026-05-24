import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'

const BP_KEYS = ['xs', 'sm', 'md', 'lg', 'xl'] as const

function BreakpointsDoc() {
  const theme = useTheme()
  const bpValues = theme.breakpoints.values as Record<string, number>
  const brand     = theme.brandConfig
  const grid      = brand.grid

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" sx={{ mb: 1 }}>Breakpoints</Typography>
      <Typography variant="body" color="text.muted" sx={{ mb: 0.5 }}>
        Standard MUI breakpoints. Use <code>theme.breakpoints.up/down/between()</code> in{' '}
        <code>sx</code> props or <code>styleOverrides</code>.
      </Typography>
      <Typography variant="small" color="text.muted" component="p" sx={{ mb: 4, fontFamily: 'monospace' }}>
        {'sx={{ display: { xs: \'none\', md: \'flex\' } }}'}
      </Typography>

      {/* ── Breakpoint values ─────────────────────────────── */}
      <Typography variant="h6" sx={{ mb: 1.5 }}>Breakpoint values</Typography>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '48px 80px 1fr',
          gap: 0,
          mb: 2,
          '& > *': { borderBottom: '1px solid', borderColor: 'divider', py: 1.5 },
        }}
      >
        {['Key', 'Min-width', 'Range'].map((h) => (
          <Typography key={h} variant="small" sx={{ fontWeight: 700, color: 'text.muted', py: '0.625rem !important' }}>
            {h}
          </Typography>
        ))}
        {BP_KEYS.map((bp, i) => {
          const min  = bpValues[bp]
          const next = BP_KEYS[i + 1]
          const max  = next ? bpValues[next] : null
          const rangeLabel = max ? `${min}px – ${max - 0.05}px` : `${min}px and above`
          const barW = max ? ((max - min) / 1536) * 100 : 20
          return [
            <Typography key={`${bp}-k`} variant="body" sx={{ fontFamily: 'monospace', fontWeight: 700, color: 'primary.main' }}>
              {bp}
            </Typography>,
            <Typography key={`${bp}-v`} variant="small" sx={{ fontFamily: 'monospace' }}>
              {min}px
            </Typography>,
            <Box key={`${bp}-bar`} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box sx={{ height: 10, width: `${Math.min(barW, 80)}%`, bgcolor: 'primary.light', borderRadius: '4px', opacity: 0.6 }} />
              <Typography variant="small" color="text.muted">{rangeLabel}</Typography>
            </Box>,
          ]
        })}
      </Box>

      {/* ── sx shorthand ──────────────────────────────────── */}
      <Typography variant="h6" sx={{ mb: 1 }}>sx breakpoint shorthand</Typography>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 2,
          mb: 5,
        }}
      >
        {[
          { label: 'Responsive values', code: "sx={{ display: { xs: 'none', md: 'flex' } }}" },
          { label: 'up() helper', code: "sx={{ [t.breakpoints.up('md')]: { p: 4 } }}" },
          { label: 'down() helper', code: "sx={{ [t.breakpoints.down('sm')]: { flexDirection: 'column' } }}" },
          { label: 'between() helper', code: "sx={{ [t.breakpoints.between('sm','lg')]: { gap: 2 } }}" },
        ].map(({ label, code }) => (
          <Box key={label} sx={{ p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
            <Typography variant="small" sx={{ fontWeight: 700, mb: 0.75, display: 'block' }}>{label}</Typography>
            <Typography variant="small" sx={{ fontFamily: 'monospace', color: 'text.secondary', wordBreak: 'break-all' }}>
              {code}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* ── Brand grid config ─────────────────────────────── */}
      {grid && (
        <>
          <Typography variant="h6" sx={{ mb: 0.5 }}>Brand grid config — <code>{brand.name}</code></Typography>
          <Typography variant="small" color="text.muted" component="p" sx={{ mb: 2 }}>
            Columns, gutters, and margins defined in <code>BrandConfig.grid</code>. Max-width:{' '}
            <strong>{grid.maxWidth}px</strong>.
          </Typography>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: `100px repeat(${BP_KEYS.length}, 1fr)`,
              gap: 0,
              mb: 4,
              '& > *': { borderBottom: '1px solid', borderColor: 'divider', py: 1.5, textAlign: 'center' },
              '& > *:first-of-type': { textAlign: 'left' },
            }}
          >
            {['', ...BP_KEYS].map((h) => (
              <Typography key={String(h)} variant="small" sx={{ fontWeight: 700, color: h ? 'primary.main' : 'text.muted', fontFamily: 'monospace', py: '0.625rem !important' }}>
                {h || 'Property'}
              </Typography>
            ))}
            {(['columns', 'gutter', 'margin'] as const).map((prop) => [
              <Typography key={`${prop}-l`} variant="small" sx={{ fontFamily: 'monospace', textAlign: 'left !important' as 'left' }}>
                {prop}
              </Typography>,
              ...BP_KEYS.map((bp) => {
                const val = grid[prop][bp]
                return (
                  <Typography key={`${prop}-${bp}`} variant="small" sx={{ fontFamily: 'monospace', color: 'text.secondary' }}>
                    {typeof val === 'number' ? `${val}px` : val}
                  </Typography>
                )
              }),
            ])}
          </Box>
        </>
      )}

      {/* ── Live resize indicator ─────────────────────────── */}
      <Typography variant="h6" sx={{ mb: 1 }}>Current breakpoint</Typography>
      <Typography variant="small" color="text.muted" component="p" sx={{ mb: 2 }}>
        Resize the Storybook viewport (toolbar) to see the active breakpoint change.
      </Typography>
      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
        {BP_KEYS.map((bp) => {
          // Build the responsive maps as plain Records so TS doesn't try to widen
          // the inferred sx union — the BP_KEYS × token-string permutations otherwise
          // exceed the type-system's complexity limit.
          const others = (val: string): Record<string, string> =>
            Object.fromEntries(BP_KEYS.filter((b) => b !== bp).map((b) => [b, val]));
          const borderColor: Record<string, string> = { [bp]: 'primary.main', ...others('divider') };
          const bgcolor:    Record<string, string> = { [bp]: 'primary.background', ...others('background.paper') };
          const colorMap:   Record<string, string> = { [bp]: 'primary.dark', ...others('text.muted') };
          const display:    Record<string, string> = { [bp]: 'flex', ...others('none') };
          return (
          <Box
            key={bp}
            sx={{
              px: 2,
              py: 1,
              borderRadius: 1,
              border: '2px solid',
              borderColor,
              bgcolor,
              color: colorMap,
              display,
              alignItems: 'center',
              gap: 1,
            }}
          >
            <Typography variant="body" sx={{ fontFamily: 'monospace', fontWeight: 700 }}>
              {bp}
            </Typography>
            <Typography variant="small" color="inherit" sx={{ opacity: 0.75 }}>
              ≥{bpValues[bp]}px
            </Typography>
          </Box>
          );
        })}
      </Box>
    </Box>
  )
}

const meta: Meta<typeof BreakpointsDoc> = {
  title: 'Utilities/Breakpoints',
  component: BreakpointsDoc,
  parameters: {
    layout: 'fullscreen',
    docs: { canvas: { sourceState: 'hidden' } },
  },
}
export default meta

export const Default: StoryObj<typeof BreakpointsDoc> = {
  render: () => <BreakpointsDoc />,
}

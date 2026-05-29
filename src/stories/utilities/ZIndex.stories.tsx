import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'

// MUI defaults + our custom tokens, in stacking order (lowest first)
const LAYERS: Array<{ key: string; custom?: boolean; description: string }> = [
  { key: 'mobileStepper', description: 'MobileStepper dots' },
  { key: 'fab',           description: 'Floating action button' },
  { key: 'speedDial',     description: 'SpeedDial actions' },
  { key: 'appBar',        description: 'AppBar / top navigation bar' },
  { key: 'megaMenu',      custom: true, description: 'Mega-menu panel (appBar + 1)' },
  { key: 'stickyHeader',  custom: true, description: 'Condensed sticky header (appBar + 2)' },
  { key: 'drawer',        description: 'Drawer — side panels, mobile nav' },
  { key: 'modal',         description: 'Modal backdrop and content' },
  { key: 'snackbar',      description: 'Toast / snackbar notifications' },
  { key: 'tooltip',       description: 'Tooltip popovers' },
  { key: 'skipLink',      custom: true, description: 'Skip-links — above all overlays (tooltip + 1)' },
]

function ZIndexDoc() {
  const theme = useTheme()
  const zIndex = theme.zIndex as unknown as Record<string, number>

  const values  = LAYERS.map((l) => zIndex[l.key] ?? 0)
  const minVal  = Math.min(...values)
  const maxVal  = Math.max(...values)
  const range   = maxVal - minVal || 1

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" sx={{ mb: 1 }}>Z-Index</Typography>
      <Typography variant="body" color="text.muted" sx={{ mb: 0.5 }}>
        Named layer tokens for the stacking context. Use{' '}
        <code>t.zIndex.megaMenu</code> in <code>sx</code> props — never use arithmetic
        offsets like <code>t.zIndex.appBar + 1</code>.
      </Typography>
      <Typography variant="small" color="text.muted" component="p" sx={{ mb: 4, fontFamily: 'monospace' }}>
        {'sx={{ zIndex: (t) => t.zIndex.megaMenu }}'}
      </Typography>

      {/* ── Layer table ───────────────────────────────────── */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '160px 64px 1fr auto',
          gap: 0,
          mb: 5,
          '& > *': { borderBottom: '1px solid', borderColor: 'divider', py: 1.5 },
        }}
      >
        {['Token', 'Value', 'Relative depth', 'Usage'].map((h) => (
          <Typography key={h} variant="small" sx={{ fontWeight: 700, color: 'text.muted', py: '0.625rem !important' }}>
            {h}
          </Typography>
        ))}
        {LAYERS.map(({ key, custom, description }) => {
          const value = zIndex[key]
          const pct   = value !== undefined ? ((value - minVal) / range) * 80 + 4 : 0
          return [
            <Typography key={`${key}-k`} variant="small" sx={{ fontFamily: 'monospace', display: 'flex', alignItems: 'center', gap: 0.75 }}>
              {key}
              {custom && (
                <Box
                  component="span"
                  sx={{ px: 0.75, py: 0.25, bgcolor: 'primary.background', color: 'primary.dark', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 700, lineHeight: 1.4 }}
                >
                  custom
                </Box>
              )}
            </Typography>,
            <Typography key={`${key}-v`} variant="small" sx={{ fontFamily: 'monospace' }}>
              {value ?? '—'}
            </Typography>,
            <Box key={`${key}-bar`} sx={{ display: 'flex', alignItems: 'center' }}>
              {value !== undefined && (
                <Box
                  sx={{
                    height: 8,
                    width: `${pct}%`,
                    bgcolor: custom ? 'primary.main' : 'primary.light',
                    borderRadius: '4px',
                    opacity: 0.7,
                  }}
                />
              )}
            </Box>,
            <Typography key={`${key}-d`} variant="small" color="text.muted">
              {description}
            </Typography>,
          ]
        })}
      </Box>

      {/* ── Stack visualisation ───────────────────────────── */}
      <Typography variant="h6" sx={{ mb: 1 }}>Layer stack visualisation</Typography>
      <Typography variant="small" color="text.muted" component="p" sx={{ mb: 2 }}>
        Layers ordered by z-index value — lowest at bottom, highest at top.
      </Typography>
      <Box sx={{ position: 'relative', height: `${LAYERS.length * 36 + 16}px`, maxWidth: 480 }}>
        {[...LAYERS].reverse().map(({ key, custom }, i) => {
          const value = zIndex[key]
          return (
            <Box
              key={key}
              sx={{
                position: 'absolute',
                left: `${i * 6}px`,
                right: 0,
                top: `${i * 36}px`,
                height: 32,
                borderRadius: 1,
                bgcolor: custom ? 'primary.background' : 'background.elevated',
                border: '1px solid',
                borderColor: custom ? 'primary.main' : 'divider',
                display: 'flex',
                alignItems: 'center',
                px: 1.5,
                gap: 1.5,
              }}
            >
              <Typography variant="small" sx={{ fontFamily: 'monospace', fontWeight: custom ? 700 : 400, color: custom ? 'primary.dark' : 'text.primary' }}>
                {key}
              </Typography>
              <Typography variant="small" sx={{ fontFamily: 'monospace', color: 'text.muted' }}>
                {value}
              </Typography>
            </Box>
          )
        })}
      </Box>
    </Box>
  )
}

const meta: Meta<typeof ZIndexDoc> = {
  title: 'Utilities/Z-Index',
  component: ZIndexDoc,
  parameters: {
    layout: 'fullscreen',
    docs: { canvas: { sourceState: 'hidden' } },
  },
}
export default meta

export const Default: StoryObj<typeof ZIndexDoc> = {
  render: () => <ZIndexDoc />,
}

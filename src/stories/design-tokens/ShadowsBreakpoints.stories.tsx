import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'

const ELEVATIONS = [0, 1, 2, 3, 4, 6, 8, 12, 16, 24]

interface ShadowLayer {
  x: string
  y: string
  blur: string
  color: string
}

function parseShadow(shadow: string): ShadowLayer[] {
  if (shadow === 'none') return []
  const layers: ShadowLayer[] = []
  const layerRe = /(-?[\d.]+px)\s+(-?[\d.]+px)\s+(-?[\d.]+px)\s+(-?[\d.]+px)\s+(rgba\([^)]+\)|#[\da-f]+|\w+)/gi
  let match: RegExpExecArray | null
  while ((match = layerRe.exec(shadow)) !== null) {
    layers.push({ x: match[1], y: match[2], blur: match[3], color: match[5] })
  }
  return layers
}

function ShadowsDoc() {
  const theme = useTheme()

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" sx={{ mb: 1 }}>Shadows</Typography>
      <Typography variant="body2" color="text.muted" sx={{ mb: 4 }}>
        Elevation shadows are themed per colour scheme. Toggle Light / Dark in the toolbar to see each scale.
      </Typography>

      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mb: 4 }}>
        {[
          {
            label: 'Light mode',
            description: 'Reduced opacity for a soft, airy feel on white/light backgrounds.',
            rows: [
              { name: 'Umbra', value: 'rgba(0,0,0,0.12)' },
              { name: 'Penumbra', value: 'rgba(0,0,0,0.08)' },
              { name: 'Ambient', value: 'rgba(0,0,0,0.06)' },
            ],
          },
          {
            label: 'Dark mode',
            description: 'Higher opacity to maintain depth visibility on dark backgrounds.',
            rows: [
              { name: 'Umbra', value: 'rgba(0,0,0,0.50)' },
              { name: 'Penumbra', value: 'rgba(0,0,0,0.35)' },
              { name: 'Ambient', value: 'rgba(0,0,0,0.30)' },
            ],
          },
        ].map(({ label, description, rows }) => (
          <Box key={label} sx={{ p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
            <Typography variant="body2" sx={{ fontWeight: 700, mb: 0.5 }}>{label}</Typography>
            <Typography variant="caption" color="text.muted" sx={{ display: 'block', mb: 1.5 }}>{description}</Typography>
            {rows.map(({ name, value }) => (
              <Box key={name} sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                <Typography variant="caption" sx={{ fontFamily: 'monospace', color: 'text.secondary' }}>{name}</Typography>
                <Typography variant="caption" sx={{ fontFamily: 'monospace', color: 'text.muted' }}>{value}</Typography>
              </Box>
            ))}
          </Box>
        ))}
      </Box>

      <Typography variant="h6" sx={{ mb: 1 }}>Elevation Shadows</Typography>
      <Typography variant="body2" color="text.muted" sx={{ mb: 3 }}>
        Each elevation is composed of 3 CSS shadow layers (umbra, penumbra, ambient) blended to create realistic depth.
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {ELEVATIONS.map((elev) => {
          const layers = parseShadow(theme.shadows[elev])
          return (
            <Box
              key={elev}
              sx={{
                display: 'grid',
                gridTemplateColumns: '72px 140px 1fr',
                alignItems: 'start',
                gap: 3,
                borderBottom: '1px solid',
                borderColor: 'divider',
                pb: 2,
              }}
            >
              <Box
                sx={{
                  width: 64,
                  height: 64,
                  bgcolor: 'background.paper',
                  boxShadow: theme.shadows[elev],
                  borderRadius: 1,
                  flexShrink: 0,
                }}
              />
              <Box sx={{ pt: 0.5 }}>
                <Typography variant="body2" sx={{ fontFamily: 'monospace', fontWeight: 600 }}>
                  elevation {elev}
                </Typography>
                {layers.length === 0 && (
                  <Typography variant="caption" color="text.muted">none</Typography>
                )}
              </Box>
              {layers.length > 0 && (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75, pt: 0.5 }}>
                  {layers.map((layer, i) => (
                    <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Box
                        sx={{
                          width: 12,
                          height: 12,
                          borderRadius: '50%',
                          bgcolor: layer.color,
                          border: '1px solid',
                          borderColor: 'divider',
                          flexShrink: 0,
                        }}
                      />
                      <Typography variant="caption" sx={{ fontFamily: 'monospace', color: 'text.secondary', minWidth: 64 }}>
                        {(['Umbra', 'Penumbra', 'Ambient'] as const)[i]}
                      </Typography>
                      <Typography variant="caption" sx={{ fontFamily: 'monospace', color: 'text.muted', minWidth: 140 }}>
                        {layer.color}
                      </Typography>
                      <Typography variant="caption" sx={{ fontFamily: 'monospace' }}>
                        x&nbsp;{layer.x}
                      </Typography>
                      <Typography variant="caption" sx={{ fontFamily: 'monospace' }}>
                        y&nbsp;{layer.y}
                      </Typography>
                      <Typography variant="caption" sx={{ fontFamily: 'monospace' }}>
                        blur&nbsp;{layer.blur}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              )}
            </Box>
          )
        })}
      </Box>
    </Box>
  )
}

const meta: Meta<typeof ShadowsDoc> = {
  title: 'Design Tokens/Shadows',
  component: ShadowsDoc,
  parameters: {
    layout: 'fullscreen',
    docs: { canvas: { sourceState: 'hidden' } },
  },
}
export default meta

export const Default: StoryObj<typeof ShadowsDoc> = {
  render: () => <ShadowsDoc />,
}

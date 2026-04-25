import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'

const SPACING_STEPS = [0, 0.5, 1, 1.5, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24]

function SpacingBreakpointsDoc() {
  const theme = useTheme()
  const maxBp = Math.max(...Object.values(theme.breakpoints.values))

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" sx={{ mb: 1 }}>Breakpoints & Spacing</Typography>
      <Typography variant="body" color="text.muted" sx={{ mb: 4 }}>
        Base unit: {theme.spacing(1)} — multiply by factor (e.g. <code>theme.spacing(2)</code> = {theme.spacing(2)})
      </Typography>

      <Typography variant="h6" sx={{ mb: 2 }}>Spacing Scale</Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 6 }}>
        {SPACING_STEPS.map((step) => (
          <Box key={step} sx={{ display: 'grid', gridTemplateColumns: '48px 60px 1fr', alignItems: 'center', gap: 2 }}>
            <Typography variant="small" color="text.muted" sx={{ fontFamily: 'monospace' }}>
              ×{step}
            </Typography>
            <Typography variant="small" sx={{ fontFamily: 'monospace' }}>
              {theme.spacing(step)}
            </Typography>
            {step > 0 && (
              <Box
                sx={{
                  height: 16,
                  width: theme.spacing(step),
                  maxWidth: '100%',
                  bgcolor: 'primary.main',
                  opacity: 0.6,
                  borderRadius: 0.5,
                }}
              />
            )}
          </Box>
        ))}
      </Box>

      <Typography variant="h6" sx={{ mb: 2 }}>Breakpoints</Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
        {(Object.entries(theme.breakpoints.values) as [string, number][]).map(([bp, value]) => (
          <Box
            key={bp}
            sx={{
              display: 'grid',
              gridTemplateColumns: '32px 80px 1fr',
              alignItems: 'center',
              gap: 2,
              borderBottom: '1px solid',
              borderColor: 'divider',
              py: 1.5,
            }}
          >
            <Typography variant="body" sx={{ fontFamily: 'monospace', color: 'primary.main' }}>
              {bp}
            </Typography>
            <Typography variant="body" color="text.muted">
              {value}px
            </Typography>
            <Box sx={{ position: 'relative', height: 8 }}>
              <Box
                sx={{
                  height: '100%',
                  width: `${(value / maxBp) * 100}%`,
                  bgcolor: 'primary.main',
                  opacity: 0.4,
                  borderRadius: 0.5,
                }}
              />
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  )
}

const meta: Meta<typeof SpacingBreakpointsDoc> = {
  title: 'Design Tokens/Breakpoints & Spacing',
  component: SpacingBreakpointsDoc,
  parameters: {
    layout: 'fullscreen',
    docs: { canvas: { sourceState: 'hidden' } },
  },
}
export default meta

export const Default: StoryObj<typeof SpacingBreakpointsDoc> = {
  render: () => <SpacingBreakpointsDoc />,
}

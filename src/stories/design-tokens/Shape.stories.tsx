import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'

const SCALE: { token: string; value: number }[] = [
  { token: 'none',  value: 0 },
  { token: 'xs',    value: 4 },
  { token: 'sm',    value: 8 },
  { token: 'md',    value: 12 },
  { token: 'lg',    value: 16 },
  { token: 'xl',    value: 24 },
  { token: '2xl',   value: 32 },
  { token: 'full',  value: 9999 },
]

function ShapeDoc() {
  const theme = useTheme()
  const themeShape = theme.shape as unknown as Record<string, number>

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" sx={{ mb: 1 }}>Shape</Typography>
      <Typography variant="body" color="text.muted" sx={{ mb: 4 }}>
        Border radius tokens. Use <code>theme.shape.&lt;token&gt;</code> in <code>sx</code> props or component styles.
      </Typography>

      <Typography variant="h6" sx={{ mb: 3 }}>Border Radius Scale</Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
        {SCALE.map(({ token, value: defaultValue }) => {
          const value = themeShape[token] ?? defaultValue
          const previewRadius = value >= 9999 ? '9999px' : `${value}px`
          return (
            <Box
              key={token}
              sx={{
                display: 'grid',
                gridTemplateColumns: '80px 60px 1fr',
                alignItems: 'center',
                gap: 3,
                borderBottom: '1px solid',
                borderColor: 'divider',
                py: 2,
              }}
            >
              <Typography variant="body" sx={{ fontFamily: 'monospace', fontWeight: 600 }}>
                {token}
              </Typography>
              <Typography variant="body" color="text.muted" sx={{ fontFamily: 'monospace' }}>
                {value >= 9999 ? '∞' : `${value}px`}
              </Typography>
              <Box
                sx={{
                  width: 220,
                  height: 110,
                  bgcolor: 'primary.light',
                  borderRadius: previewRadius,
                }}
              />
            </Box>
          )
        })}
      </Box>
    </Box>
  )
}

const meta: Meta<typeof ShapeDoc> = {
  title: 'Design Tokens/Shape',
  component: ShapeDoc,
  parameters: {
    layout: 'fullscreen',
    docs: { canvas: { sourceState: 'hidden' } },
  },
}
export default meta

export const Default: StoryObj<typeof ShapeDoc> = {
  render: () => <ShapeDoc />,
}

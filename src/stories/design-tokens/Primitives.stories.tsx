import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { primitiveScales, white, black, qsuperInvestmentAllocations, qsuperAssetAllocations, artInvestmentOptions, artAssetMix, sharedDiversifiedOptions } from '../../app/themes/primitives/colors'
import type { ColorScale, PrimitiveScaleName } from '../../app/themes/primitives/colors'

const STEPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const

function Swatch({ step, value }: { step: number; value: string }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5 }}>
      <Box
        sx={{
          width: 56,
          height: 56,
          bgcolor: value,
          borderRadius: 1,
          border: '1px solid',
          borderColor: 'divider',
        }}
      />
      <Typography variant="small" sx={{ lineHeight: 1.2 }}>
        {step}
      </Typography>
      <Typography
        variant="small"
        color="text.muted"
        sx={{ fontFamily: 'monospace', fontSize: 10 }}
      >
        {value}
      </Typography>
    </Box>
  )
}

function ScaleRow({ name, scale }: { name: string; scale: ColorScale }) {
  return (
    <Box sx={{ mb: 3 }}>
      <Typography
        variant="small"
        sx={{ mb: 1.5, display: 'block', color: 'text.muted', letterSpacing: 2 }}
      >
        {name}
      </Typography>
      <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
        {STEPS.map((step) => (
          <Swatch key={step} step={step} value={scale[step]} />
        ))}
      </Box>
    </Box>
  )
}

function PrimitivesDoc() {
  return (
    <Box sx={{ p: 4, maxWidth: 960 }}>
      <Typography variant="h4" sx={{ mb: 0.5, fontWeight: 800 }}>
        Primitive Scales
      </Typography>
      <Typography variant="body" color="text.muted" sx={{ mb: 4 }}>
        Raw hue families — steps 50–950. Never reference these directly in components. Use semantic
        tokens from the Colors story instead.
      </Typography>
      {(Object.entries(primitiveScales) as [PrimitiveScaleName, ColorScale][]).map(
        ([name, scale]) => (
          <ScaleRow key={name} name={name} scale={scale} />
        ),
      )}

      <Typography
        variant="small"
        sx={{ mb: 1.5, display: 'block', color: 'text.muted', letterSpacing: 2 }}
      >
        Static Values
      </Typography>
      <Box sx={{ display: 'flex', gap: 1.5 }}>
        {([['white', white], ['black', black]] as const).map(([name, value]) => (
          <Box key={name} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5 }}>
            <Box
              sx={{
                width: 56,
                height: 56,
                bgcolor: value,
                borderRadius: 1,
                border: '1px solid',
                borderColor: 'divider',
              }}
            />
            <Typography variant="small" sx={{ lineHeight: 1.2 }}>{name}</Typography>
            <Typography variant="small" color="text.muted" sx={{ fontFamily: 'monospace', fontSize: 10 }}>
              {value}
            </Typography>
          </Box>
        ))}
      </Box>

      <Typography
        variant="small"
        sx={{ mt: 5, mb: 1.5, display: 'block', color: 'text.muted', letterSpacing: 2 }}
      >
        Shared Diversified Options
      </Typography>
      <Typography variant="small" color="text.muted" sx={{ display: 'block', mb: 2 }}>
        Fixed single values — not scales. Shared across ART and QSuper for diversified investment option data visualisation.
      </Typography>
      <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
        {(Object.entries(sharedDiversifiedOptions) as [string, string][]).map(([name, value]) => (
          <Box key={name} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5 }}>
            <Box sx={{ width: 56, height: 56, bgcolor: value, borderRadius: 1, border: '1px solid', borderColor: 'divider' }} />
            <Typography variant="small" sx={{ lineHeight: 1.2, textAlign: 'center', maxWidth: 64, wordBreak: 'break-word' }}>{name}</Typography>
            <Typography variant="small" color="text.muted" sx={{ fontFamily: 'monospace', fontSize: 10 }}>{value}</Typography>
          </Box>
        ))}
      </Box>

      <Typography
        variant="small"
        sx={{ mt: 5, mb: 1.5, display: 'block', color: 'text.muted', letterSpacing: 2 }}
      >
        QSuper Investment Allocations
      </Typography>
      <Typography variant="small" color="text.muted" sx={{ display: 'block', mb: 2 }}>
        Fixed single values — not scales. Use only for data visualisation of QSuper investment options.
      </Typography>
      <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
        {(Object.entries(qsuperInvestmentAllocations) as [string, string][]).map(([name, value]) => (
          <Box key={name} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5 }}>
            <Box
              sx={{
                width: 56,
                height: 56,
                bgcolor: value,
                borderRadius: 1,
                border: '1px solid',
                borderColor: 'divider',
              }}
            />
            <Typography variant="small" sx={{ lineHeight: 1.2 }}>{name}</Typography>
            <Typography variant="small" color="text.muted" sx={{ fontFamily: 'monospace', fontSize: 10 }}>
              {value}
            </Typography>
          </Box>
        ))}
      </Box>

      <Typography
        variant="small"
        sx={{ mt: 5, mb: 1.5, display: 'block', color: 'text.muted', letterSpacing: 2 }}
      >
        QSuper Asset Class Allocations
      </Typography>
      <Typography variant="small" color="text.muted" sx={{ display: 'block', mb: 2 }}>
        Fixed single values — not scales. Use only for data visualisation of QSuper asset class allocations.
      </Typography>
      <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
        {(Object.entries(qsuperAssetAllocations) as [string, string][]).map(([name, value]) => (
          <Box key={name} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5 }}>
            <Box
              sx={{
                width: 56,
                height: 56,
                bgcolor: value,
                borderRadius: 1,
                border: '1px solid',
                borderColor: 'divider',
              }}
            />
            <Typography variant="small" sx={{ lineHeight: 1.2 }}>{name}</Typography>
            <Typography variant="small" color="text.muted" sx={{ fontFamily: 'monospace', fontSize: 10 }}>
              {value}
            </Typography>
          </Box>
        ))}
      </Box>

      <Typography
        variant="small"
        sx={{ mt: 5, mb: 1.5, display: 'block', color: 'text.muted', letterSpacing: 2 }}
      >
        ART Investment Options
      </Typography>
      <Typography variant="small" color="text.muted" sx={{ display: 'block', mb: 2 }}>
        Fixed single values — not scales. Use only for data visualisation of ART investment options.
      </Typography>
      <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
        {(Object.entries(artInvestmentOptions) as [string, string][]).map(([name, value]) => (
          <Box key={name} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5 }}>
            <Box sx={{ width: 56, height: 56, bgcolor: value, borderRadius: 1, border: '1px solid', borderColor: 'divider' }} />
            <Typography variant="small" sx={{ lineHeight: 1.2, textAlign: 'center', maxWidth: 64, wordBreak: 'break-word' }}>{name}</Typography>
            <Typography variant="small" color="text.muted" sx={{ fontFamily: 'monospace', fontSize: 10 }}>{value}</Typography>
          </Box>
        ))}
      </Box>

      <Typography
        variant="small"
        sx={{ mt: 5, mb: 1.5, display: 'block', color: 'text.muted', letterSpacing: 2 }}
      >
        ART Asset Mix
      </Typography>
      <Typography variant="small" color="text.muted" sx={{ display: 'block', mb: 2 }}>
        Fixed single values — not scales. Use only for data visualisation of ART asset mix allocations.
      </Typography>
      <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
        {(Object.entries(artAssetMix) as [string, string][]).map(([name, value]) => (
          <Box key={name} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5 }}>
            <Box sx={{ width: 56, height: 56, bgcolor: value, borderRadius: 1, border: '1px solid', borderColor: 'divider' }} />
            <Typography variant="small" sx={{ lineHeight: 1.2, textAlign: 'center', maxWidth: 64, wordBreak: 'break-word' }}>{name}</Typography>
            <Typography variant="small" color="text.muted" sx={{ fontFamily: 'monospace', fontSize: 10 }}>{value}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  )
}

const meta: Meta<typeof PrimitivesDoc> = {
  title: 'Design Tokens/Colors/Primitives',
  component: PrimitivesDoc,
  parameters: {
    layout: 'fullscreen',
    docs: { canvas: { sourceState: 'hidden' } },
  },
}
export default meta

export const Default: StoryObj<typeof PrimitivesDoc> = {
  render: () => <PrimitivesDoc />,
}

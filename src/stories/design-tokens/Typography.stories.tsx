import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import Box from '@mui/material/Box'
import MuiTypography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'

const DISPLAY_VARIANTS = ['display-1', 'display-2', 'display-3', 'display-4', 'display-5', 'display-6'] as const
const HEADING_VARIANTS = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const
const BODY_VARIANTS = ['lead', 'body', 'small', 'caption'] as const

function remToPx(value: unknown): number {
  const str = String(value)
  // For clamp() values, extract the max (desktop) size for line-height calculations
  const clampMax = str.match(/clamp\(.*,\s*([\d.]+rem)\s*\)$/)
  if (clampMax) return Math.round(parseFloat(clampMax[1]) * 16)
  return Math.round(parseFloat(str) * 16)
}

function formatSize(fontSize: unknown): string {
  const str = String(fontSize)
  const clampMatch = str.match(/^clamp\(\s*([\d.]+rem),.*,\s*([\d.]+rem)\s*\)$/)
  if (clampMatch) {
    const minPx = Math.round(parseFloat(clampMatch[1]) * 16)
    const maxPx = Math.round(parseFloat(clampMatch[2]) * 16)
    return `${clampMatch[1]} → ${clampMatch[2]} (${minPx}–${maxPx}px)`
  }
  const px = remToPx(fontSize)
  return `${str} (${px}px)`
}

function formatWeight(weight: unknown): string {
  const w = Number(weight)
  const labels: Record<number, string> = {
    300: 'Light',
    400: 'Normal',
    500: 'Medium',
    600: 'Semi Bold',
    700: 'Bold',
    900: 'Black',
  }
  return `${labels[w] ?? String(w)} (${w})`
}

function formatLineHeight(lineHeight: unknown, fontSize: unknown): string {
  const lh = Number(lineHeight)
  const px = Math.round(lh * remToPx(fontSize))
  return `${lh} (${px}px)`
}

function parseFontName(fontFamily: string): string {
  return fontFamily.split(',')[0].replace(/"/g, '').trim()
}

function FontBadge({ fontFamily, baseFontFamily }: { fontFamily: string; baseFontFamily: string }) {
  const name = parseFontName(fontFamily)
  const baseName = parseFontName(baseFontFamily)
  const isHeadingFont = name !== baseName

  return (
    <Box
      component="span"
      sx={{
        display: 'inline-block',
        px: 0.75,
        py: 0.25,
        borderRadius: 0.5,
        fontSize: 11,
        fontFamily: 'monospace',
        fontWeight: 600,
        lineHeight: 1.4,
        bgcolor: isHeadingFont ? 'primary.main' : 'action.hover',
        color: isHeadingFont ? 'primary.contrastText' : 'text.secondary',
      }}
    >
      {name}
    </Box>
  )
}

interface VariantMetaProps {
  label: string
  fontSize: unknown
  fontWeight: unknown
  lineHeight: unknown
  fontFamily: string
  baseFontFamily: string
}

function VariantMeta({ label, fontSize, fontWeight, lineHeight, fontFamily, baseFontFamily }: VariantMetaProps) {
  return (
    <Box>
      <Box
        component="span"
        sx={{ display: 'block', fontFamily: 'monospace', fontSize: 14, color: 'primary.main', mb: 0.75 }}
      >
        {label}
      </Box>
      <Box sx={{ fontSize: 12, color: 'text.primary', lineHeight: 1.7, opacity: 0.6 }}>
        <Box component="span" sx={{ display: 'flex', gap: 2 }}>
          <span>{formatSize(fontSize)}</span>
          <span>LH {formatLineHeight(lineHeight, fontSize)}</span>
        </Box>
        <Box component="span" sx={{ display: 'block' }}>{formatWeight(fontWeight)}</Box>
      </Box>
      <Box sx={{ mt: 0.75 }}>
        <FontBadge fontFamily={fontFamily} baseFontFamily={baseFontFamily} />
      </Box>
    </Box>
  )
}

function TypographyDoc() {
  const { typography } = useTheme()

  const bodyFontFamily = String(typography.fontFamily ?? '')

  function variantFontFamily(variant: string): string {
    const style = typography[variant as keyof typeof typography] as Record<string, unknown> | undefined
    return String(style?.fontFamily ?? bodyFontFamily)
  }

  return (
    <Box sx={{ p: 4 }}>
      <MuiTypography variant="h4" sx={{ mb: 1 }}>Typography</MuiTypography>
      <MuiTypography variant="small" color="text.muted" sx={{ mb: 4, display: 'block' }}>
        Bootstrap-style scale: Display (1–6), Headings (h1–h6), Body variants.
      </MuiTypography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>

        {/* Font Families */}
        <Box>
          <MuiTypography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
            Font Families
          </MuiTypography>
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
            <Box sx={{ p: 3, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
              <Box
                sx={{
                  fontFamily: variantFontFamily('h1'),
                  fontSize: '2rem',
                  fontWeight: 700,
                  lineHeight: 1.2,
                  mb: 0.5,
                }}
              >
                {parseFontName(variantFontFamily('h1'))}
              </Box>
              <MuiTypography variant="small" color="text.muted" sx={{ display: 'block', mb: 1.5 }}>
                Serif · Display & H1–H3
              </MuiTypography>
              <Box
                sx={{
                  fontFamily: variantFontFamily('h1'),
                  fontSize: '0.875rem',
                  lineHeight: 1.6,
                  color: 'text.secondary',
                  mb: 2,
                }}
              >
                ABCDEFGHIJKLMNOPQRSTUVWXYZ<br />
                abcdefghijklmnopqrstuvwxyz 0123456789
              </Box>
              <MuiTypography variant="small" color="text.disabled">
                Override to body font:{' '}
                <code>{'sx={{ fontFamily: theme.typography.fontFamily }}'}</code>
              </MuiTypography>
            </Box>
            <Box sx={{ p: 3, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
              <Box
                sx={{
                  fontFamily: bodyFontFamily,
                  fontSize: '2rem',
                  fontWeight: 700,
                  lineHeight: 1.2,
                  mb: 0.5,
                }}
              >
                {parseFontName(bodyFontFamily)}
              </Box>
              <MuiTypography variant="small" color="text.muted" sx={{ display: 'block', mb: 1.5 }}>
                Sans-serif · H4–H6 & Body
              </MuiTypography>
              <Box
                sx={{
                  fontFamily: bodyFontFamily,
                  fontSize: '0.875rem',
                  lineHeight: 1.6,
                  color: 'text.secondary',
                }}
              >
                ABCDEFGHIJKLMNOPQRSTUVWXYZ<br />
                abcdefghijklmnopqrstuvwxyz 0123456789
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Display Headings */}
        <Box>
          <MuiTypography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
            Display Headings
          </MuiTypography>
          {DISPLAY_VARIANTS.map((variant) => {
            const style = typography[variant] as Record<string, unknown>
            return (
              <Box
                key={variant}
                sx={{
                  display: 'grid',
                  gridTemplateColumns: '300px 1fr',
                  alignItems: 'center',
                  gap: 3,
                  borderBottom: '1px solid',
                  borderColor: 'divider',
                  py: 2,
                }}
              >
                <VariantMeta
                  label={variant}
                  fontSize={style?.fontSize}
                  fontWeight={style?.fontWeight}
                  lineHeight={style?.lineHeight}
                  fontFamily={variantFontFamily(variant)}
                  baseFontFamily={bodyFontFamily}
                />
                <MuiTypography variant={variant} sx={{ color: 'text.heading' }}>Display Heading</MuiTypography>
              </Box>
            )
          })}
        </Box>

        {/* Standard Headings */}
        <Box>
          <MuiTypography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
            Standard Headings
          </MuiTypography>
          {HEADING_VARIANTS.map((variant) => {
            const style = typography[variant] as Record<string, unknown>
            return (
              <Box
                key={variant}
                sx={{
                  display: 'grid',
                  gridTemplateColumns: '300px 1fr',
                  alignItems: 'center',
                  gap: 3,
                  borderBottom: '1px solid',
                  borderColor: 'divider',
                  py: 2,
                }}
              >
                <VariantMeta
                  label={variant}
                  fontSize={style?.fontSize}
                  fontWeight={style?.fontWeight}
                  lineHeight={style?.lineHeight}
                  fontFamily={variantFontFamily(variant)}
                  baseFontFamily={bodyFontFamily}
                />
                <MuiTypography variant={variant} sx={{ color: 'text.heading' }}>Heading Text</MuiTypography>
              </Box>
            )
          })}
        </Box>

        {/* Link Text */}
        <Box>
          <MuiTypography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
            Link Text
          </MuiTypography>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: '300px 1fr',
              alignItems: 'center',
              gap: 3,
              borderBottom: '1px solid',
              borderColor: 'divider',
              py: 2,
            }}
          >
            <Box>
              <Box component="span" sx={{ display: 'block', fontFamily: 'monospace', fontSize: 14, color: 'primary.main', mb: 0.75 }}>
                text.link
              </Box>
              <Box sx={{ fontSize: 12, color: 'text.primary', opacity: 0.6 }}>primary 600</Box>
            </Box>
            <Box
              component="a"
              href="#"
              sx={{
                color: 'text.link',
                fontWeight: 500,
                textDecoration: 'underline',
                textUnderlineOffset: '3px',
                textDecorationColor: 'color-mix(in srgb, currentColor 40%, transparent)',
                cursor: 'pointer',
                transition: 'color 0.15s, text-decoration-color 0.15s',
                '&:hover': {
                  filter: 'brightness(0.75)',
                  textDecorationColor: 'currentColor',
                },
              }}
            >
              <MuiTypography variant="body" component="span" sx={{ fontWeight: 500 }}>Example link text</MuiTypography>
            </Box>
          </Box>
        </Box>

        {/* Body Text */}
        <Box>
          <MuiTypography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
            Body Text
          </MuiTypography>
          {BODY_VARIANTS.map((variant) => {
            const style = typography[variant] as Record<string, unknown>
            return (
              <Box
                key={variant}
                sx={{
                  display: 'grid',
                  gridTemplateColumns: '300px 1fr',
                  alignItems: 'center',
                  gap: 3,
                  borderBottom: '1px solid',
                  borderColor: 'divider',
                  py: 2,
                }}
              >
                <VariantMeta
                  label={variant}
                  fontSize={style?.fontSize}
                  fontWeight={style?.fontWeight}
                  lineHeight={style?.lineHeight}
                  fontFamily={variantFontFamily(variant)}
                  baseFontFamily={bodyFontFamily}
                />
                <MuiTypography variant={variant}>
                  The quick brown fox jumps over the lazy dog
                </MuiTypography>
              </Box>
            )
          })}
        </Box>

      </Box>
    </Box>
  )
}

const meta: Meta<typeof TypographyDoc> = {
  title: 'Design Tokens/Typography',
  component: TypographyDoc,
  parameters: {
    layout: 'fullscreen',
    docs: { canvas: { sourceState: 'hidden' } },
  },
}
export default meta

export const Overview: StoryObj<typeof TypographyDoc> = {
  name: 'Overview',
  render: () => <TypographyDoc />,
}

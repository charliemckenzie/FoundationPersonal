import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import Box from '@mui/material/Box'
import MuiTypography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'

const DISPLAY_VARIANTS = ['display-1', 'display-2', 'display-3', 'display-4', 'display-5'] as const
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
    const minRem = clampMatch[1]
    const maxRem = clampMatch[2]
    const minPx = Math.round(parseFloat(minRem) * 16)
    const maxPx = Math.round(parseFloat(maxRem) * 16)
    return `${minRem} \u2192 ${maxRem} (${minPx}px \u2192 ${maxPx}px)`
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
  letterSpacing: unknown
  fontFamily: string
  baseFontFamily: string
}

function VariantMeta({ label, fontSize, fontWeight, lineHeight, letterSpacing, fontFamily, baseFontFamily }: VariantMetaProps) {
  const ls = letterSpacing !== undefined && String(letterSpacing) !== '0' ? String(letterSpacing) : null
  return (
    <Box>
      <Box
        component="span"
        sx={{ display: 'block', fontFamily: 'monospace', fontSize: 14, color: 'primary.main', mb: 0.75 }}
      >
        {label}
      </Box>
      <Box sx={{ fontSize: 12, color: 'text.primary', lineHeight: 1.7, opacity: 0.6 }}>
        <Box component="span" sx={{ display: 'block' }}>{formatSize(fontSize)}</Box>
        <Box component="span" sx={{ display: 'flex', gap: 2 }}>
          <span>LH {formatLineHeight(lineHeight, fontSize)}</span>
          {ls && <span>LS {ls}</span>}
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
                  letterSpacing={style?.letterSpacing}
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
                  letterSpacing={style?.letterSpacing}
                  fontFamily={variantFontFamily(variant)}
                  baseFontFamily={bodyFontFamily}
                />
                <MuiTypography variant={variant} sx={{ color: 'text.heading' }}>Heading Text</MuiTypography>
              </Box>
            )
          })}
        </Box>

        {/* Responsive heading scale */}
        <Box>
          <MuiTypography variant="h6" sx={{ mb: 1, color: 'primary.main' }}>
            Responsive Heading Scale
          </MuiTypography>
          <MuiTypography variant="small" color="text.muted" sx={{ display: 'block', mb: 2 }}>
            h1–h5 use CSS clamp(). Hierarchy is preserved at every viewport width. h6 is fixed at 16px.
          </MuiTypography>
          <Box sx={{ overflowX: 'auto' }}>
            {/* Header */}
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: '90px repeat(6, 1fr)',
                borderBottom: '2px solid',
                borderColor: 'divider',
                minWidth: 400,
              }}
            >
              {['Viewport', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'].map((h) => (
                <Box
                  key={h}
                  sx={{
                    px: 1.5, py: 1,
                    fontSize: 12, fontFamily: 'monospace', fontWeight: 700,
                    color: h === 'Viewport' ? 'text.muted' : 'primary.main',
                  }}
                >
                  {h}
                </Box>
              ))}
            </Box>
            {/* Rows */}
            {([
              { vp: '360px',  values: ['28px', '24px', '22px', '19px', '17px',   '16px'] },
              { vp: '768px',  values: ['34px', '28px', '25px', '21px', '18.5px', '16px'] },
              { vp: '1200px', values: ['40px', '32px', '28px', '24px', '20px',   '16px'] },
            ] as const).map(({ vp, values }, ri) => (
              <Box
                key={vp}
                sx={{
                  display: 'grid',
                  gridTemplateColumns: '90px repeat(6, 1fr)',
                  bgcolor: ri % 2 === 0 ? 'action.hover' : 'transparent',
                  borderBottom: '1px solid',
                  borderColor: 'divider',
                  minWidth: 400,
                }}
              >
                <Box sx={{ px: 1.5, py: 1.25, fontSize: 12, fontFamily: 'monospace', fontWeight: 600, color: 'text.muted' }}>
                  {vp}
                </Box>
                {values.map((v) => (
                  <Box key={v} sx={{ px: 1.5, py: 1.25, fontSize: 12, fontFamily: 'monospace' }}>{v}</Box>
                ))}
              </Box>
            ))}
          </Box>
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
                  letterSpacing={style?.letterSpacing}
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

        {/* Letter Spacing & Accessibility */}
        <Box>
          <MuiTypography variant="h6" sx={{ mb: 1, color: 'primary.main' }}>
            Letter Spacing &amp; Accessibility
          </MuiTypography>
          <MuiTypography variant="small" color="text.muted" sx={{ display: 'block', mb: 2 }}>
            All variants have explicit letterSpacing set in the theme.
          </MuiTypography>

          {/* WCAG callout */}
          <Box
            sx={{
              borderLeft: '3px solid',
              borderColor: 'info.main',
              bgcolor: 'action.hover',
              px: 2, py: 1.5, mb: 2, borderRadius: '0 4px 4px 0',
            }}
          >
            <MuiTypography variant="small" sx={{ fontWeight: 700, display: 'block', mb: 0.5 }}>
              WCAG 2.1 SC 1.4.12 — Text Spacing (AA)
            </MuiTypography>
            <MuiTypography variant="small" color="text.muted">
              Users must be able to set letter-spacing to ≥ 0.12em without loss of content.
              This criterion applies to user overrides — not author values.
              None of the values below approach that threshold, so all variants are compliant.
            </MuiTypography>
          </Box>

          {/* Practical impact table */}
          <Box sx={{ overflowX: 'auto', mb: 2 }}>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: '200px 100px 1fr',
                borderBottom: '2px solid',
                borderColor: 'divider',
                minWidth: 460,
              }}
            >
              {['Variants', 'Value', 'Risk / rationale'].map((h) => (
                <Box key={h} sx={{ px: 1.5, py: 1, fontSize: 12, fontFamily: 'monospace', fontWeight: 700, color: 'text.muted' }}>{h}</Box>
              ))}
            </Box>
            {([
              { variants: 'display-1 – display-3', value: '-0.03em', note: 'Low — large text, single-line, never constrained' },
              { variants: 'display-4 – display-5, h1, h2', value: '-0.02em', note: 'Low — same reasoning; fluid layout prevents clipping' },
              { variants: 'h3, h4', value: '-0.01em', note: 'None — barely perceptible tightening' },
              { variants: 'h5, h6, lead, body, small', value: '0', note: 'None — neutral; body text should not be artificially tracked' },
              { variants: 'caption', value: '+0.02em', note: 'None — opens spacing; improves legibility at 12px' },
            ] as const).map(({ variants, value, note }, ri) => (
              <Box
                key={variants}
                sx={{
                  display: 'grid',
                  gridTemplateColumns: '200px 100px 1fr',
                  bgcolor: ri % 2 === 0 ? 'action.hover' : 'transparent',
                  borderBottom: '1px solid',
                  borderColor: 'divider',
                  minWidth: 460,
                }}
              >
                <Box sx={{ px: 1.5, py: 1.25, fontSize: 12, fontFamily: 'monospace' }}>{variants}</Box>
                <Box sx={{ px: 1.5, py: 1.25, fontSize: 12, fontFamily: 'monospace', fontWeight: 600, color: 'primary.main' }}>{value}</Box>
                <Box sx={{ px: 1.5, py: 1.25, fontSize: 12, color: 'text.muted' }}>{note}</Box>
              </Box>
            ))}
          </Box>

          {/* Legibility note */}
          <Box
            sx={{
              borderLeft: '3px solid',
              borderColor: 'success.main',
              bgcolor: 'action.hover',
              px: 2, py: 1.5, borderRadius: '0 4px 4px 0',
            }}
          >
            <MuiTypography variant="small" sx={{ fontWeight: 700, display: 'block', mb: 0.5 }}>
              Legibility note
            </MuiTypography>
            <MuiTypography variant="small" color="text.muted">
              Negative tracking at display sizes (−0.02em to −0.03em) improves readability.
              Default letterSpacing was designed for body text — at 48–80px it reads as artificially loose.
              Tightening large text is standard typographic practice (see: NYT, Apple, Google’s Material 3).
              Caption’s +0.02em is equally conventional — slightly open tracking aids legibility at small sizes.
            </MuiTypography>
          </Box>
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
  render: () => <TypographyDoc />,
}

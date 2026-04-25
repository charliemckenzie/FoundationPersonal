import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'
import { buildLightPalette, buildDarkPalette } from '../../app/themes/semantic'

// --- WCAG contrast utilities ---

function hexToRgb(hex: string): [number, number, number] {
  const clean = hex.replace('#', '')
  const full = clean.length === 3
    ? clean.split('').map(c => c + c).join('')
    : clean
  const n = parseInt(full, 16)
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
}

function linearise(channel: number): number {
  const s = channel / 255
  return s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4)
}

function relativeLuminance(hex: string): number {
  const [r, g, b] = hexToRgb(hex)
  return 0.2126 * linearise(r) + 0.7152 * linearise(g) + 0.0722 * linearise(b)
}

function contrastRatio(fg: string, bg: string): number {
  const l1 = relativeLuminance(fg)
  const l2 = relativeLuminance(bg)
  const lighter = Math.max(l1, l2)
  const darker = Math.min(l1, l2)
  return (lighter + 0.05) / (darker + 0.05)
}

// --- Types ---

interface TextToken {
  label: string
  tokenPath: string
  exempt?: boolean
}

interface BgToken {
  label: string
  tokenPath: string
}

// --- Badge ---

interface BadgeProps {
  ratio: number
  exempt: boolean
}

function ContrastBadge({ ratio, exempt }: BadgeProps) {
  const pillBase = {
    display: 'inline-flex', alignItems: 'center', gap: 0.75,
    px: 1, py: 0.4, borderRadius: 1,
    bgcolor: '#ffffff',
    boxShadow: '0 1px 3px rgba(0,0,0,0.18)',
    fontFamily: 'monospace', fontSize: 12, fontWeight: 700,
    whiteSpace: 'nowrap',
  } as const

  if (exempt) {
    return (
      <Box sx={{ ...pillBase }}>
        <Box component="span" sx={{ color: '#64748b' }}>EXEMPT</Box>
      </Box>
    )
  }

  const passAAA = ratio >= 7
  const passAA = ratio >= 4.5
  const passAALarge = ratio >= 3

  let label: string
  let color: string

  if (passAAA) {
    label = 'AAA'; color = '#065f46'
  } else if (passAA) {
    label = 'AA'; color = '#1d4ed8'
  } else if (passAALarge) {
    label = 'AA Large'; color = '#92400e'
  } else {
    label = 'FAIL'; color = '#be123c'
  }

  return (
    <Box sx={{ ...pillBase }}>
      <Box component="span" sx={{ color, fontWeight: 800 }}>{label}</Box>
      <Box component="span" sx={{ color: '#64748b', fontWeight: 500 }}>{ratio.toFixed(2)}:1</Box>
    </Box>
  )
}

// --- Matrix cell ---

interface CellProps {
  textHex: string
  bgHex: string
  exempt: boolean
}

function MatrixCell({ textHex, bgHex, exempt }: CellProps) {
  const ratio = contrastRatio(textHex, bgHex)
  const passAA = exempt || ratio >= 4.5
  const borderColor = exempt
    ? 'rgba(100,116,139,0.2)'
    : passAA ? 'rgba(6,95,70,0.3)' : 'rgba(190,18,60,0.3)'

  return (
    <Box
      sx={{
        bgcolor: bgHex,
        border: '1.5px solid',
        borderColor,
        borderRadius: 1.5,
        p: 1.5,
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        minHeight: 80,
      }}
    >
      <Typography
        variant="body"
        sx={{ color: textHex, fontWeight: 500, lineHeight: 1.3, flexGrow: 1, fontSize: '1.1rem' }}
      >
        Aa
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
        <ContrastBadge ratio={ratio} exempt={exempt} />
      </Box>
    </Box>
  )
}

// --- Mode panel ---

interface ModePanelProps {
  mode: 'light' | 'dark'
  textTokens: TextToken[]
  bgTokens: BgToken[]
  getTextHex: (token: TextToken) => string
  getBgHex: (token: BgToken) => string
}

function ModePanel({ mode, textTokens, bgTokens, getTextHex, getBgHex }: ModePanelProps) {
  const panelBg = mode === 'light' ? '#f8fafc' : '#0f172a'
  const headingColor = mode === 'light' ? '#1e293b' : '#f1f5f9'
  const mutedColor = mode === 'light' ? '#64748b' : '#94a3b8'
  const borderColor = mode === 'light' ? '#e2e8f0' : '#1e293b'

  return (
    <Box
      sx={{
        bgcolor: panelBg,
        border: '1px solid',
        borderColor,
        borderRadius: 2,
        p: 3,
        overflow: 'auto',
      }}
    >
      <Typography variant="h6" sx={{ color: headingColor, mb: 0.5, fontWeight: 700 }}>
        {mode === 'light' ? 'Light mode' : 'Dark mode'}
      </Typography>
      <Typography variant="small" sx={{ color: mutedColor, display: 'block', mb: 3 }}>
        Each cell: sample text · contrast ratio · WCAG level. AA requires 4.5:1 for normal text, 3:1 for large text.
      </Typography>

      {/* Column headers */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: `160px repeat(${textTokens.length}, 1fr)`,
          gap: 1,
          mb: 1,
          minWidth: 160 + textTokens.length * 120,
        }}
      >
        <Box />
        {textTokens.map((t) => (
          <Box key={t.label} sx={{ px: 0.5 }}>
            <Typography
              variant="small"
              sx={{
                fontFamily: 'monospace', fontSize: 13, fontWeight: 700,
                color: headingColor, display: 'block', lineHeight: 1.3,
              }}
            >
              {t.label}
            </Typography>
            <Box
              sx={{
                width: 16, height: 16, mt: 0.5, borderRadius: 0.5,
                bgcolor: getTextHex(t),
                border: `1px solid ${borderColor}`,
              }}
            />
          </Box>
        ))}
      </Box>

      {/* Rows */}
      {bgTokens.map((bg) => (
        <Box
          key={bg.label}
          sx={{
            display: 'grid',
            gridTemplateColumns: `160px repeat(${textTokens.length}, 1fr)`,
            gap: 1,
            mb: 1,
            minWidth: 160 + textTokens.length * 120,
          }}
        >
          {/* Row label */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, pr: 1 }}>
            <Box
              sx={{
                width: 16, height: 16, flexShrink: 0, borderRadius: 0.5,
                bgcolor: getBgHex(bg),
                border: `1px solid ${borderColor}`,
              }}
            />
            <Typography
              variant="small"
              sx={{ fontFamily: 'monospace', fontSize: 13, color: mutedColor, lineHeight: 1.3 }}
            >
              {bg.label}
            </Typography>
          </Box>

          {/* Cells */}
          {textTokens.map((text) => (
            <MatrixCell
              key={text.label}
              textHex={getTextHex(text)}
              bgHex={getBgHex(bg)}
              exempt={!!text.exempt}
            />
          ))}
        </Box>
      ))}
    </Box>
  )
}

// --- Legend ---

function Legend() {
  const items = [
    { label: 'AAA', color: '#065f46', note: '≥ 7:1' },
    { label: 'AA', color: '#1d4ed8', note: '≥ 4.5:1' },
    { label: 'AA Large', color: '#92400e', note: '≥ 3:1 (18pt+ or 14pt bold)' },
    { label: 'FAIL', color: '#be123c', note: '< 3:1' },
    { label: 'EXEMPT', color: '#64748b', note: 'Disabled state — SC 1.4.3 exempt' },
  ]

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 4 }}>
      {items.map(({ label, color, note }) => (
        <Box key={label} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box
            sx={{
              px: 1, py: 0.4, borderRadius: 1,
              bgcolor: '#ffffff', boxShadow: '0 1px 3px rgba(0,0,0,0.18)',
              fontSize: 12, fontWeight: 800,
              color, fontFamily: 'monospace',
            }}
          >
            {label}
          </Box>
          <Typography variant="small" sx={{ color: 'text.muted', fontSize: 14 }}>
            {note}
          </Typography>
        </Box>
      ))}
    </Box>
  )
}

// --- Main doc component ---

function TypographyAccessibilityDoc() {
  const theme = useTheme()
  const brand = theme.brandConfig
  const light = buildLightPalette(brand)
  const dark = buildDarkPalette(brand)

  const textTokens: TextToken[] = [
    { label: 'text.primary', tokenPath: 'primary' },
    { label: 'text.heading', tokenPath: 'heading' },
    { label: 'text.muted', tokenPath: 'muted' },
    { label: 'text.link', tokenPath: 'link' },
    { label: 'text.linkInverse', tokenPath: 'linkInverse' },
    { label: 'text.inverse', tokenPath: 'inverse' },
    { label: 'text.disabled', tokenPath: 'disabled', exempt: true },
  ]

  const bgTokens: BgToken[] = [
    { label: 'bg.default', tokenPath: 'default' },
    { label: 'bg.paper', tokenPath: 'paper' },
    { label: 'bg.elevated', tokenPath: 'elevated' },
    { label: 'bg.brandPrimary', tokenPath: 'brandPrimary' },
    { label: 'bg.brandSecondary', tokenPath: 'brandSecondary' },
    { label: 'bg.brandTertiary', tokenPath: 'brandTertiary' },
    { label: 'bg.brandSky', tokenPath: 'brandSky' },
    { label: 'bg.brandClear', tokenPath: 'brandClear' },
    { label: 'bg.brandWarm', tokenPath: 'brandWarm' },
  ]

  const getLightText = (t: TextToken): string =>
    (light.text as Record<string, string>)[t.tokenPath] ?? '#000000'

  const getLightBg = (b: BgToken): string =>
    (light.background as Record<string, string>)[b.tokenPath] ?? '#ffffff'

  const getDarkText = (t: TextToken): string =>
    (dark.text as Record<string, string>)[t.tokenPath] ?? '#ffffff'

  const getDarkBg = (b: BgToken): string =>
    (dark.background as Record<string, string>)[b.tokenPath] ?? '#000000'

  return (
    <Box sx={{ p: 4, maxWidth: 1400 }}>
      <Typography variant="h4" sx={{ mb: 0.5, fontWeight: 800 }}>
        Typography Accessibility
      </Typography>
      <Typography variant="body" color="text.muted" sx={{ display: 'block', mb: 3 }}>
        Contrast ratios for all semantic text tokens against every background token. WCAG 2.2 SC 1.4.3.
      </Typography>

      <Legend />

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <ModePanel
          mode="light"
          textTokens={textTokens}
          bgTokens={bgTokens}
          getTextHex={getLightText}
          getBgHex={getLightBg}
        />
        <ModePanel
          mode="dark"
          textTokens={textTokens}
          bgTokens={bgTokens}
          getTextHex={getDarkText}
          getBgHex={getDarkBg}
        />
      </Box>
    </Box>
  )
}

const meta: Meta<typeof TypographyAccessibilityDoc> = {
  title: 'Design Tokens/Typography',
  component: TypographyAccessibilityDoc,
  parameters: {
    layout: 'fullscreen',
    docs: { canvas: { sourceState: 'hidden' } },
  },
}
export default meta

export const Accessibility: StoryObj<typeof TypographyAccessibilityDoc> = {
  render: () => <TypographyAccessibilityDoc />,
}

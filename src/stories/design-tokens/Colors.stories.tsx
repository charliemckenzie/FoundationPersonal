import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'
import { buildLightPalette, buildDarkPalette } from '../../app/themes/semantic'
import { primitiveScales, type ColorScale } from '../../app/themes/primitives/colors'

const primitiveNameByStop500 = Object.fromEntries(
  Object.entries(primitiveScales).map(([name, scale]) => [scale[500], name])
)

interface TokenDualMode {
  label: string
  lightValue: string
  darkValue: string
  lightSource?: string
  darkSource?: string
}

function DualModeTokenRow({ label, lightValue, darkValue, lightSource, darkSource }: TokenDualMode) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
      {/* Token Label */}
      <Typography variant="caption" sx={{ fontWeight: 600, fontSize: 11 }}>
        {label}
      </Typography>
      
      {/* Light and Dark Backgrounds Side by Side */}
      <Box sx={{ display: 'flex', borderRadius: 1, overflow: 'hidden', border: '1px solid', borderColor: 'divider' }}>
        {/* Light Mode - Light Background */}
        <Box
          sx={{
            flex: 1,
            bgcolor: '#f8f9fa',
            p: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 0.5,
          }}
        >
          <Box
            sx={{
              width: 40,
              height: 40,
              bgcolor: lightValue,
              borderRadius: 1,
              border: '1px solid rgba(0, 0, 0, 0.1)',
            }}
          />
          <Box sx={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>
            <Typography variant="caption" sx={{ fontFamily: 'monospace', fontSize: 11.5, fontWeight: 600, display: 'block', lineHeight: 1, mb: 0 }}>
              {lightValue}
            </Typography>
            {lightSource && lightSource.split(' — ').map((part, i) => (
              <Box key={i} component="span" sx={{ color: '#64748b', fontSize: 11, lineHeight: 1, display: 'block', mt: 0}}>
                {part}
              </Box>
            ))}
          </Box>
        </Box>

        {/* Dark Mode - Dark Background */}
        <Box
          sx={{
            flex: 1,
            bgcolor: '#1a1d24',
            p: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 0.5,
          }}
        >
          <Box
            sx={{
              width: 40,
              height: 40,
              bgcolor: darkValue,
              borderRadius: 1,
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          />
          <Box sx={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>
            <Typography variant="caption" sx={{ fontFamily: 'monospace', color: '#fff', fontSize: 11.5, fontWeight: 600, display: 'block', lineHeight: 1, mb: 0 }}>
              {darkValue}
            </Typography>
            {darkSource && darkSource.split(' — ').map((part, i) => (
              <Box key={i} component="span" sx={{ color: '#94a3b8', fontSize: 11, lineHeight: 1, display: 'block', mt: 0}}>
                {part}
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

function SectionHeading({ children }: { children: string }) {
  return (
    <Typography variant="h5" sx={{ mt: 5, mb: 0.5, fontWeight: 700 }}>
      {children}
    </Typography>
  )
}

function SectionSubtitle({ children }: { children: string }) {
  return (
    <Typography variant="body2" color="text.muted" sx={{ mb: 3 }}>
      {children}
    </Typography>
  )
}

function ColorsDoc() {
  const theme = useTheme()
  const brand = theme.brandConfig
  const lightPalette = buildLightPalette(brand)
  const darkPalette = buildDarkPalette(brand)

  const getPrimitiveName = (scale: ColorScale): string =>
    primitiveNameByStop500[scale[500]] ?? 'unknown'

  const primaryName = getPrimitiveName(brand.primary)
  const secondaryName = getPrimitiveName(brand.secondary)

  const brandTokens: TokenDualMode[] = [
    {
      label: 'primary.light',
      lightValue: lightPalette.primary!.light!,
      darkValue: darkPalette.primary!.light!,
      lightSource: `${primaryName} 400`,
      darkSource: `${primaryName} 300`,
    },
    {
      label: 'primary.main',
      lightValue: lightPalette.primary!.main!,
      darkValue: darkPalette.primary!.main!,
      lightSource: `${primaryName} 600`,
      darkSource: `${primaryName} 300`,
    },
    {
      label: 'primary.dark',
      lightValue: lightPalette.primary!.dark!,
      darkValue: darkPalette.primary!.dark!,
      lightSource: `${primaryName} 700`,
      darkSource: `${primaryName} 400`,
    },
    {
      label: 'primary.contrastText',
      lightValue: lightPalette.primary!.contrastText!,
      darkValue: darkPalette.primary!.contrastText!,
      lightSource: 'white — 5.80:1 ✓ AA',
      darkSource: `${primaryName} 950 — 5.30:1 ✓ AA`,
    },
    {
      label: 'secondary.light',
      lightValue: lightPalette.secondary!.light!,
      darkValue: darkPalette.secondary!.light!,
      lightSource: `${secondaryName} 600`,
      darkSource: `${secondaryName} 400`,
    },
    {
      label: 'secondary.main',
      lightValue: lightPalette.secondary!.main!,
      darkValue: darkPalette.secondary!.main!,
      lightSource: `${secondaryName} 800`,
      darkSource: `${secondaryName} 600`,
    },
    {
      label: 'secondary.dark',
      lightValue: lightPalette.secondary!.dark!,
      darkValue: darkPalette.secondary!.dark!,
      lightSource: `${secondaryName} 900`,
      darkSource: `${secondaryName} 800`,
    },
    {
      label: 'secondary.contrastText',
      lightValue: lightPalette.secondary!.contrastText!,
      darkValue: darkPalette.secondary!.contrastText!,
      lightSource: 'white — 12.21:1 ✓ AAA',
      darkSource: 'white — 6.06:1 ✓ AA',
    },
    ...(lightPalette.tertiary ? [
      {
        label: 'tertiary.light',
        lightValue: lightPalette.tertiary.light!,
        darkValue: darkPalette.tertiary!.light!,
        lightSource: `${getPrimitiveName(brand.tertiary!)} 400`,
        darkSource: `${getPrimitiveName(brand.tertiary!)} 300`,
      },
      {
        label: 'tertiary.main',
        lightValue: lightPalette.tertiary.main!,
        darkValue: darkPalette.tertiary!.main!,
        lightSource: `${getPrimitiveName(brand.tertiary!)} 500`,
        darkSource: `${getPrimitiveName(brand.tertiary!)} 400`,
      },
      {
        label: 'tertiary.dark',
        lightValue: lightPalette.tertiary.dark!,
        darkValue: darkPalette.tertiary!.dark!,
        lightSource: `${getPrimitiveName(brand.tertiary!)} 700`,
        darkSource: `${getPrimitiveName(brand.tertiary!)} 600`,
      },
      {
        label: 'tertiary.contrastText',
        lightValue: lightPalette.tertiary.contrastText!,
        darkValue: darkPalette.tertiary!.contrastText!,
        lightSource: `${getPrimitiveName(brand.tertiary!)} 950 — 4.56:1 ✓ AA`,
        darkSource: 'black — on tertiary 400',
      },
    ] as TokenDualMode[] : []),
  ]

  const feedbackTokens: TokenDualMode[] = [
    {
      label: 'error.light',
      lightValue: lightPalette.error!.light!,
      darkValue: darkPalette.error!.light!,
      lightSource: 'red 400',
      darkSource: 'red 300',
    },
    {
      label: 'error.main',
      lightValue: lightPalette.error!.main!,
      darkValue: darkPalette.error!.main!,
      lightSource: 'red 600',
      darkSource: 'red 400',
    },
    {
      label: 'error.dark',
      lightValue: lightPalette.error!.dark!,
      darkValue: darkPalette.error!.dark!,
      lightSource: 'red 700',
      darkSource: 'red 600',
    },
    {
      label: 'error.contrastText',
      lightValue: lightPalette.error!.contrastText!,
      darkValue: darkPalette.error!.contrastText!,
      lightSource: 'white',
      darkSource: 'white',
    },
    {
      label: 'warning.light',
      lightValue: lightPalette.warning!.light!,
      darkValue: darkPalette.warning!.light!,
      lightSource: 'amber 300',
      darkSource: 'amber 300',
    },
    {
      label: 'warning.main',
      lightValue: lightPalette.warning!.main!,
      darkValue: darkPalette.warning!.main!,
      lightSource: 'amber 500',
      darkSource: 'amber 400',
    },
    {
      label: 'warning.dark',
      lightValue: lightPalette.warning!.dark!,
      darkValue: darkPalette.warning!.dark!,
      lightSource: 'amber 700',
      darkSource: 'amber 500',
    },
    {
      label: 'warning.contrastText',
      lightValue: lightPalette.warning!.contrastText!,
      darkValue: darkPalette.warning!.contrastText!,
      lightSource: 'black',
      darkSource: 'black',
    },
    {
      label: 'info.light',
      lightValue: lightPalette.info!.light!,
      darkValue: darkPalette.info!.light!,
      lightSource: 'cyan 400',
      darkSource: 'cyan 300',
    },
    {
      label: 'info.main',
      lightValue: lightPalette.info!.main!,
      darkValue: darkPalette.info!.main!,
      lightSource: 'cyan 700',
      darkSource: 'cyan 400',
    },
    {
      label: 'info.dark',
      lightValue: lightPalette.info!.dark!,
      darkValue: darkPalette.info!.dark!,
      lightSource: 'cyan 800',
      darkSource: 'cyan 600',
    },
    {
      label: 'info.contrastText',
      lightValue: lightPalette.info!.contrastText!,
      darkValue: darkPalette.info!.contrastText!,
      lightSource: 'white',
      darkSource: 'black',
    },
    {
      label: 'success.light',
      lightValue: lightPalette.success!.light!,
      darkValue: darkPalette.success!.light!,
      lightSource: 'green 400',
      darkSource: 'green 300',
    },
    {
      label: 'success.main',
      lightValue: lightPalette.success!.main!,
      darkValue: darkPalette.success!.main!,
      lightSource: 'green 700',
      darkSource: 'green 400',
    },
    {
      label: 'success.dark',
      lightValue: lightPalette.success!.dark!,
      darkValue: darkPalette.success!.dark!,
      lightSource: 'green 800',
      darkSource: 'green 600',
    },
    {
      label: 'success.contrastText',
      lightValue: lightPalette.success!.contrastText!,
      darkValue: darkPalette.success!.contrastText!,
      lightSource: 'white',
      darkSource: 'black',
    },
  ]

  const surfaceTokens: TokenDualMode[] = [
    {
      label: 'background.default',
      lightValue: lightPalette.background!.default!,
      darkValue: darkPalette.background!.default!,
      lightSource: 'neutral 50',
      darkSource: 'neutral 950',
    },
    {
      label: 'background.paper',
      lightValue: lightPalette.background!.paper!,
      darkValue: darkPalette.background!.paper!,
      lightSource: 'white',
      darkSource: 'neutral 900',
    },
    {
      label: 'background.elevated',
      lightValue: lightPalette.background!.elevated!,
      darkValue: darkPalette.background!.elevated!,
      lightSource: 'neutral 100',
      darkSource: 'neutral 800',
    },
  ]

  const backgroundBrandTokens: TokenDualMode[] = [
    {
      label: 'background.brandPrimary',
      lightValue: lightPalette.background!.brandPrimary!,
      darkValue: darkPalette.background!.brandPrimary!,
      lightSource: 'primary 600',
      darkSource: 'neutral 800',
    },
    {
      label: 'background.brandSecondary',
      lightValue: lightPalette.background!.brandSecondary!,
      darkValue: darkPalette.background!.brandSecondary!,
      lightSource: 'secondary 800',
      darkSource: 'neutral 800',
    },
    {
      label: 'background.brandTertiary',
      lightValue: lightPalette.background!.brandTertiary!,
      darkValue: darkPalette.background!.brandTertiary!,
      lightSource: 'tertiary 500',
      darkSource: 'neutral 800',
    },
    {
      label: 'background.brandSky',
      lightValue: lightPalette.background!.brandSky!,
      darkValue: darkPalette.background!.brandSky!,
      lightSource: 'skyBlue 200',
      darkSource: 'neutral 800',
    },
    {
      label: 'background.brandClear',
      lightValue: lightPalette.background!.brandClear!,
      darkValue: darkPalette.background!.brandClear!,
      lightSource: 'clearBlue 100',
      darkSource: 'neutral 800',
    },
    {
      label: 'background.brandWarm',
      lightValue: lightPalette.background!.brandWarm!,
      darkValue: darkPalette.background!.brandWarm!,
      lightSource: 'salmon 50',
      darkSource: 'neutral 800',
    },
  ]

  const textTokens: TokenDualMode[] = [
    {
      label: 'text.primary',
      lightValue: lightPalette.text!.primary!,
      darkValue: darkPalette.text!.primary!,
      lightSource: 'neutral 900 — 18:1 ✓ AAA',
      darkSource: 'neutral 50 — 17.5:1 ✓ AAA',
    },
    {
      label: 'text.heading',
      lightValue: lightPalette.text!.heading!,
      darkValue: darkPalette.text!.heading!,
      lightSource: `${secondaryName} 800 — heading text`,
      darkSource: '#ffffff — heading text',
    },
    {
      label: 'text.muted',
      lightValue: lightPalette.text!.muted!,
      darkValue: darkPalette.text!.muted!,
      lightSource: 'neutral 600 — 6.9:1 ✓ AA',
      darkSource: 'neutral 300 — 12.6:1 ✓ AAA',
    },
    {
      label: 'text.link',
      lightValue: lightPalette.text!.link!,
      darkValue: darkPalette.text!.link!,
      lightSource: `${primaryName} 600 — interactive links`,
      darkSource: `${primaryName} 300 — interactive links`,
    },
    {
      label: 'text.linkInverse',
      lightValue: lightPalette.text!.linkInverse!,
      darkValue: darkPalette.text!.linkInverse!,
      lightSource: 'clearBlue 100 — links on brand backgrounds',
      darkSource: 'clearBlue 100 — links on brand backgrounds',
    },
    {
      label: 'text.disabled',
      lightValue: lightPalette.text!.disabled!,
      darkValue: darkPalette.text!.disabled!,
      lightSource: 'neutral 500 — exempt (inactive)',
      darkSource: 'neutral 500 — exempt (inactive)',
    },
    {
      label: 'text.inverse',
      lightValue: lightPalette.text!.inverse!,
      darkValue: darkPalette.text!.inverse!,
      lightSource: '#ffffff — on brand backgrounds',
      darkSource: 'neutral 900 — on brand backgrounds',
    },
  ]

  const actionTokens: TokenDualMode[] = [
    {
      label: 'action.active',
      lightValue: lightPalette.action!.active!,
      darkValue: darkPalette.action!.active!,
      lightSource: 'neutral 600 — icon/control active colour',
      darkSource: 'neutral 300 — icon/control active colour',
    },
    {
      label: 'action.hover',
      lightValue: lightPalette.action!.hover!,
      darkValue: darkPalette.action!.hover!,
      lightSource: 'neutral 900 @ 4% — hover overlay',
      darkSource: 'neutral 50 @ 8% — hover overlay',
    },
    {
      label: 'action.selected',
      lightValue: lightPalette.action!.selected!,
      darkValue: darkPalette.action!.selected!,
      lightSource: 'neutral 900 @ 8% — selected/expanded overlay',
      darkSource: 'neutral 50 @ 16% — selected/expanded overlay',
    },
    {
      label: 'action.disabled',
      lightValue: lightPalette.action!.disabled!,
      darkValue: darkPalette.action!.disabled!,
      lightSource: 'neutral 500 — disabled text & icons',
      darkSource: 'neutral 500 — disabled text & icons',
    },
    {
      label: 'action.disabledBackground',
      lightValue: lightPalette.action!.disabledBackground!,
      darkValue: darkPalette.action!.disabledBackground!,
      lightSource: 'neutral 200 — disabled control fill',
      darkSource: 'neutral 800 — disabled control fill',
    },
    {
      label: 'action.focus',
      lightValue: lightPalette.action!.focus!,
      darkValue: darkPalette.action!.focus!,
      lightSource: 'neutral 900 @ 12% — focus overlay',
      darkSource: 'neutral 50 @ 12% — focus overlay',
    },
  ]

  const dividerBorderTokens: TokenDualMode[] = [
    {
      label: 'divider',
      lightValue: lightPalette.divider!,
      darkValue: darkPalette.divider!,
      lightSource: 'neutral 300 — subtle separators',
      darkSource: 'neutral 700 — subtle separators',
    },
    {
      label: 'border.subtle',
      lightValue: lightPalette.border!.subtle!,
      darkValue: darkPalette.border!.subtle!,
      lightSource: 'neutral 200 — light dividers, inner sections',
      darkSource: 'neutral 800 — light dividers, inner sections',
    },
    {
      label: 'border.default',
      lightValue: lightPalette.border!.default!,
      darkValue: darkPalette.border!.default!,
      lightSource: 'neutral 300 — cards, containers',
      darkSource: 'neutral 700 — cards, containers',
    },
    {
      label: 'border.input',
      lightValue: lightPalette.border!.input!,
      darkValue: darkPalette.border!.input!,
      lightSource: 'neutral 500 — 4.25:1 ✓',
      darkSource: 'neutral 400 — 8:1 ✓',
    },
    {
      label: 'border.focus',
      lightValue: lightPalette.border!.focus!,
      darkValue: darkPalette.border!.focus!,
      lightSource: 'neutral 700 — focus states',
      darkSource: 'neutral 300 — focus states',
    },
  ]

  return (
    <Box sx={{ p: 4, maxWidth: 1200 }}>
      <Typography variant="h4" sx={{ mb: 0.5, fontWeight: 800 }}>
        Semantic Colors
      </Typography>
      <Typography variant="body2" color="text.muted" sx={{ mb: 4 }}>
        All tokens shown with both light and dark mode values and their primitive sources.
      </Typography>

      <SectionHeading>Brand</SectionHeading>
      <SectionSubtitle>
        Swappable per brand. Sourced from the brand's primary and secondary primitive scales.
      </SectionSubtitle>
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 2, mb: 3 }}>
        {brandTokens.map((token) => (
          <DualModeTokenRow key={token.label} {...token} />
        ))}
      </Box>

      <SectionHeading>Surface</SectionHeading>
      <SectionSubtitle>Backgrounds and surfaces. Sourced from the brand's neutral scale.</SectionSubtitle>
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2, mb: 3, maxWidth: 900 }}>
        {surfaceTokens.map((token) => (
          <DualModeTokenRow key={token.label} {...token} />
        ))}
      </Box>

      <SectionHeading>Background Brand</SectionHeading>
      <SectionSubtitle>Branded background colors. Swappable per brand.</SectionSubtitle>
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2, mb: 3, maxWidth: 900 }}>
        {backgroundBrandTokens.map((token) => (
          <DualModeTokenRow key={token.label} {...token} />
        ))}
      </Box>

      <SectionHeading>Text</SectionHeading>
      <SectionSubtitle>Text colors. Ratios measured against paper. Disabled is exempt per WCAG 2.2 SC 1.4.3.</SectionSubtitle>
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2, mb: 3, maxWidth: 900 }}>
        {textTokens.map((token) => (
          <DualModeTokenRow key={token.label} {...token} />
        ))}
      </Box>

      <SectionHeading>Dividers &amp; Borders</SectionHeading>
      <SectionSubtitle>
        divider: content separators | border.subtle: lighter borders, inner sections | border.default: element outlines (cards, panels) | border.input: form fields (3:1 contrast) | border.focus: interactive focus states
      </SectionSubtitle>
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 2, mb: 3 }}>
        {dividerBorderTokens.map((token) => (
          <DualModeTokenRow key={token.label} {...token} />
        ))}
      </Box>

      <SectionHeading>Action</SectionHeading>
      <SectionSubtitle>
        Interaction state overlays and disabled colours. hover, selected, and focus are semi-transparent overlays — they layer over any surface. Opacity scalars (both modes): hoverOpacity 0.04 · selectedOpacity 0.08 · disabledOpacity 0.38 · focusOpacity 0.12 · activatedOpacity 0.12
      </SectionSubtitle>
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2, mb: 3, maxWidth: 900 }}>
        {actionTokens.map((token) => (
          <DualModeTokenRow key={token.label} {...token} />
        ))}
      </Box>

      <SectionHeading>Feedback</SectionHeading>
      <SectionSubtitle>Fixed across all brands.</SectionSubtitle>
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 2, mb: 3 }}>
        {feedbackTokens.map((token) => (
          <DualModeTokenRow key={token.label} {...token} />
        ))}
      </Box>

    </Box>
  )
}

const meta: Meta<typeof ColorsDoc> = {
  title: 'Design Tokens/Colors/Semantic',
  component: ColorsDoc,
  parameters: {
    layout: 'fullscreen',
    docs: { canvas: { sourceState: 'hidden' } },
  },
}
export default meta

export const Default: StoryObj<typeof ColorsDoc> = {
  render: () => <ColorsDoc />,
}

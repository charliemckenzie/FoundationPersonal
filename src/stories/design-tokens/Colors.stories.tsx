import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'
import type { Palette } from '@mui/material/styles'
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
      <Typography variant="small" sx={{ fontWeight: 600, fontSize: 11 }}>
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
            <Typography variant="small" sx={{ fontFamily: 'monospace', fontSize: 11.5, fontWeight: 600, display: 'block', lineHeight: 1, mb: 0 }}>
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
            <Typography variant="small" sx={{ fontFamily: 'monospace', color: '#fff', fontSize: 11.5, fontWeight: 600, display: 'block', lineHeight: 1, mb: 0 }}>
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
    <Typography variant="body" color="text.muted" sx={{ mb: 3 }}>
      {children}
    </Typography>
  )
}

function ColorsDoc() {
  const theme = useTheme()
  const brand = theme.brandConfig
  const lightPalette = buildLightPalette(brand) as unknown as Palette
  const darkPalette = buildDarkPalette(brand) as unknown as Palette

  const getPrimitiveName = (scale: ColorScale): string =>
    primitiveNameByStop500[scale[500]] ?? 'unknown'

  const primaryName = getPrimitiveName(brand.primary)
  const secondaryName = getPrimitiveName(brand.secondary)
  const neutralName = getPrimitiveName(brand.neutral)

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
    ...(lightPalette.quaternary ? [
      {
        label: 'quaternary.light',
        lightValue: lightPalette.quaternary.light!,
        darkValue: darkPalette.quaternary!.light!,
        lightSource: `${getPrimitiveName(brand.quaternary!)} 100`,
        darkSource: `${getPrimitiveName(brand.quaternary!)} 200`,
      },
      {
        label: 'quaternary.main',
        lightValue: lightPalette.quaternary.main!,
        darkValue: darkPalette.quaternary!.main!,
        lightSource: `${getPrimitiveName(brand.quaternary!)} 300 — #8CDDFF`,
        darkSource: `${getPrimitiveName(brand.quaternary!)} 300 — #8CDDFF`,
      },
      {
        label: 'quaternary.dark',
        lightValue: lightPalette.quaternary.dark!,
        darkValue: darkPalette.quaternary!.dark!,
        lightSource: `${getPrimitiveName(brand.quaternary!)} 500`,
        darkSource: `${getPrimitiveName(brand.quaternary!)} 500`,
      },
      {
        label: 'quaternary.contrastText',
        lightValue: lightPalette.quaternary.contrastText!,
        darkValue: darkPalette.quaternary!.contrastText!,
        lightSource: `${getPrimitiveName(brand.quaternary!)} 950`,
        darkSource: 'black',
      },
    ] as TokenDualMode[] : []),
  ]

  // Tinted-surface fields for each brand colour. Mirrors the status-colour pattern
  // (.text · .icon · .background · .border). Use these for chips, badges, selected
  // states, and any tinted brand surface — not .main/.light/.dark (those are for
  // identity moments: focal CTAs, indicators, hero accents).
  const brandTintTokens: TokenDualMode[] = [
    // primary tints
    {
      label: 'primary.background',
      lightValue: (lightPalette.primary as unknown as Record<string, string>).background,
      darkValue: (darkPalette.primary as unknown as Record<string, string>).background,
      lightSource: `${primaryName} 50 — tinted surface fill`,
      darkSource: `${primaryName} 400 @ 16% — tinted overlay`,
    },
    {
      label: 'primary.border',
      lightValue: (lightPalette.primary as unknown as Record<string, string>).border,
      darkValue: (darkPalette.primary as unknown as Record<string, string>).border,
      lightSource: `${primaryName} 100 — companion border`,
      darkSource: `${primaryName} 700 — companion border`,
    },
    {
      label: 'primary.text',
      lightValue: (lightPalette.primary as unknown as Record<string, string>).text,
      darkValue: (darkPalette.primary as unknown as Record<string, string>).text,
      lightSource: `${primaryName} 800 — text on .background`,
      darkSource: `${primaryName} 200 — text on .background`,
    },
    {
      label: 'primary.icon',
      lightValue: (lightPalette.primary as unknown as Record<string, string>).icon,
      darkValue: (darkPalette.primary as unknown as Record<string, string>).icon,
      lightSource: `${primaryName} 600 — matches .main`,
      darkSource: `${primaryName} 300 — matches .main`,
    },
    // secondary tints
    {
      label: 'secondary.background',
      lightValue: (lightPalette.secondary as unknown as Record<string, string>).background,
      darkValue: (darkPalette.secondary as unknown as Record<string, string>).background,
      lightSource: `${secondaryName} 50 — tinted surface fill`,
      darkSource: `${secondaryName} 400 @ 16% — tinted overlay`,
    },
    {
      label: 'secondary.border',
      lightValue: (lightPalette.secondary as unknown as Record<string, string>).border,
      darkValue: (darkPalette.secondary as unknown as Record<string, string>).border,
      lightSource: `${secondaryName} 100 — companion border`,
      darkSource: `${secondaryName} 700 — companion border`,
    },
    {
      label: 'secondary.text',
      lightValue: (lightPalette.secondary as unknown as Record<string, string>).text,
      darkValue: (darkPalette.secondary as unknown as Record<string, string>).text,
      lightSource: `${secondaryName} 800 — text on .background`,
      darkSource: `${secondaryName} 200 — text on .background`,
    },
    {
      label: 'secondary.icon',
      lightValue: (lightPalette.secondary as unknown as Record<string, string>).icon,
      darkValue: (darkPalette.secondary as unknown as Record<string, string>).icon,
      lightSource: `${secondaryName} 800 — matches .main`,
      darkSource: `${secondaryName} 400 — matches .main`,
    },
    // tertiary tints (only present when brand defines tertiary)
    ...(lightPalette.tertiary ? [
      {
        label: 'tertiary.background',
        lightValue: (lightPalette.tertiary as unknown as Record<string, string>).background,
        darkValue: (darkPalette.tertiary as unknown as Record<string, string>).background,
        lightSource: `${getPrimitiveName(brand.tertiary!)} 50 — tinted surface fill`,
        darkSource: `${getPrimitiveName(brand.tertiary!)} 400 @ 16%`,
      },
      {
        label: 'tertiary.border',
        lightValue: (lightPalette.tertiary as unknown as Record<string, string>).border,
        darkValue: (darkPalette.tertiary as unknown as Record<string, string>).border,
        lightSource: `${getPrimitiveName(brand.tertiary!)} 100 — companion border`,
        darkSource: `${getPrimitiveName(brand.tertiary!)} 700`,
      },
      {
        label: 'tertiary.text',
        lightValue: (lightPalette.tertiary as unknown as Record<string, string>).text,
        darkValue: (darkPalette.tertiary as unknown as Record<string, string>).text,
        lightSource: `${getPrimitiveName(brand.tertiary!)} 800`,
        darkSource: `${getPrimitiveName(brand.tertiary!)} 200`,
      },
      {
        label: 'tertiary.icon',
        lightValue: (lightPalette.tertiary as unknown as Record<string, string>).icon,
        darkValue: (darkPalette.tertiary as unknown as Record<string, string>).icon,
        lightSource: `${getPrimitiveName(brand.tertiary!)} 500 — matches .main`,
        darkSource: `${getPrimitiveName(brand.tertiary!)} 400 — matches .main`,
      },
    ] as TokenDualMode[] : []),
    // quaternary tints (only present when brand defines quaternary — QSuper)
    ...(lightPalette.quaternary ? [
      {
        label: 'quaternary.background',
        lightValue: (lightPalette.quaternary as unknown as Record<string, string>).background,
        darkValue: (darkPalette.quaternary as unknown as Record<string, string>).background,
        lightSource: `${getPrimitiveName(brand.quaternary!)} 50 — tinted surface fill`,
        darkSource: `${getPrimitiveName(brand.quaternary!)} 400 @ 16%`,
      },
      {
        label: 'quaternary.border',
        lightValue: (lightPalette.quaternary as unknown as Record<string, string>).border,
        darkValue: (darkPalette.quaternary as unknown as Record<string, string>).border,
        lightSource: `${getPrimitiveName(brand.quaternary!)} 100 — companion border`,
        darkSource: `${getPrimitiveName(brand.quaternary!)} 700`,
      },
      {
        label: 'quaternary.text',
        lightValue: (lightPalette.quaternary as unknown as Record<string, string>).text,
        darkValue: (darkPalette.quaternary as unknown as Record<string, string>).text,
        lightSource: `${getPrimitiveName(brand.quaternary!)} 800`,
        darkSource: `${getPrimitiveName(brand.quaternary!)} 100`,
      },
      {
        label: 'quaternary.icon',
        lightValue: (lightPalette.quaternary as unknown as Record<string, string>).icon,
        darkValue: (darkPalette.quaternary as unknown as Record<string, string>).icon,
        lightSource: `${getPrimitiveName(brand.quaternary!)} 500 — matches .main`,
        darkSource: `${getPrimitiveName(brand.quaternary!)} 300 — matches .main`,
      },
    ] as TokenDualMode[] : []),
  ]

  const feedbackTokens: TokenDualMode[] = [
    // error
    {
      label: 'error.main',
      lightValue: lightPalette.error!.main!,
      darkValue: darkPalette.error!.main!,
      lightSource: 'red 600 — icon, interactive',
      darkSource: 'red 400 — icon, interactive',
    },
    {
      label: 'error.background',
      lightValue: (lightPalette.error as unknown as Record<string, string>).background,
      darkValue: (darkPalette.error as unknown as Record<string, string>).background,
      lightSource: 'red 50 — alert fill',
      darkSource: 'red 950 — alert fill',
    },
    {
      label: 'error.border',
      lightValue: (lightPalette.error as unknown as Record<string, string>).border,
      darkValue: (darkPalette.error as unknown as Record<string, string>).border,
      lightSource: 'red 100 — alert border',
      darkSource: 'red 900 — alert border',
    },
    {
      label: 'error.text',
      lightValue: (lightPalette.error as unknown as Record<string, string>).text,
      darkValue: (darkPalette.error as unknown as Record<string, string>).text,
      lightSource: 'red 800 — alert body text',
      darkSource: 'red 300 — alert body text',
    },
    {
      label: 'error.icon',
      lightValue: (lightPalette.error as unknown as Record<string, string>).icon,
      darkValue: (darkPalette.error as unknown as Record<string, string>).icon,
      lightSource: 'red 600 — alert icon',
      darkSource: 'red 400 — alert icon',
    },
    // warning
    {
      label: 'warning.main',
      lightValue: lightPalette.warning!.main!,
      darkValue: darkPalette.warning!.main!,
      lightSource: 'amber 600 — icon, interactive',
      darkSource: 'amber 400 — icon, interactive',
    },
    {
      label: 'warning.background',
      lightValue: (lightPalette.warning as unknown as Record<string, string>).background,
      darkValue: (darkPalette.warning as unknown as Record<string, string>).background,
      lightSource: 'amber 50 — alert fill',
      darkSource: 'amber 950 — alert fill',
    },
    {
      label: 'warning.border',
      lightValue: (lightPalette.warning as unknown as Record<string, string>).border,
      darkValue: (darkPalette.warning as unknown as Record<string, string>).border,
      lightSource: 'amber 100 — alert border',
      darkSource: 'amber 900 — alert border',
    },
    {
      label: 'warning.text',
      lightValue: (lightPalette.warning as unknown as Record<string, string>).text,
      darkValue: (darkPalette.warning as unknown as Record<string, string>).text,
      lightSource: 'amber 800 — alert body text',
      darkSource: 'amber 300 — alert body text',
    },
    {
      label: 'warning.icon',
      lightValue: (lightPalette.warning as unknown as Record<string, string>).icon,
      darkValue: (darkPalette.warning as unknown as Record<string, string>).icon,
      lightSource: 'amber 600 — alert icon',
      darkSource: 'amber 400 — alert icon',
    },
    // info
    {
      label: 'info.main',
      lightValue: lightPalette.info!.main!,
      darkValue: darkPalette.info!.main!,
      lightSource: 'blue 600 — icon, interactive',
      darkSource: 'blue 400 — icon, interactive',
    },
    {
      label: 'info.background',
      lightValue: (lightPalette.info as unknown as Record<string, string>).background,
      darkValue: (darkPalette.info as unknown as Record<string, string>).background,
      lightSource: 'blue 50 — alert fill',
      darkSource: 'blue 950 — alert fill',
    },
    {
      label: 'info.border',
      lightValue: (lightPalette.info as unknown as Record<string, string>).border,
      darkValue: (darkPalette.info as unknown as Record<string, string>).border,
      lightSource: 'blue 100 — alert border',
      darkSource: 'blue 900 — alert border',
    },
    {
      label: 'info.text',
      lightValue: (lightPalette.info as unknown as Record<string, string>).text,
      darkValue: (darkPalette.info as unknown as Record<string, string>).text,
      lightSource: 'blue 800 — alert body text',
      darkSource: 'blue 300 — alert body text',
    },
    {
      label: 'info.icon',
      lightValue: (lightPalette.info as unknown as Record<string, string>).icon,
      darkValue: (darkPalette.info as unknown as Record<string, string>).icon,
      lightSource: 'blue 600 — alert icon',
      darkSource: 'blue 400 — alert icon',
    },
    // success
    {
      label: 'success.main',
      lightValue: lightPalette.success!.main!,
      darkValue: darkPalette.success!.main!,
      lightSource: 'green 600 — icon, interactive',
      darkSource: 'green 400 — icon, interactive',
    },
    {
      label: 'success.background',
      lightValue: (lightPalette.success as unknown as Record<string, string>).background,
      darkValue: (darkPalette.success as unknown as Record<string, string>).background,
      lightSource: 'green 50 — alert fill',
      darkSource: 'green 950 — alert fill',
    },
    {
      label: 'success.border',
      lightValue: (lightPalette.success as unknown as Record<string, string>).border,
      darkValue: (darkPalette.success as unknown as Record<string, string>).border,
      lightSource: 'green 100 — alert border',
      darkSource: 'green 900 — alert border',
    },
    {
      label: 'success.text',
      lightValue: (lightPalette.success as unknown as Record<string, string>).text,
      darkValue: (darkPalette.success as unknown as Record<string, string>).text,
      lightSource: 'green 800 — alert body text',
      darkSource: 'green 300 — alert body text',
    },
    {
      label: 'success.icon',
      lightValue: (lightPalette.success as unknown as Record<string, string>).icon,
      darkValue: (darkPalette.success as unknown as Record<string, string>).icon,
      lightSource: 'green 600 — alert icon',
      darkSource: 'green 400 — alert icon',
    },
  ]

  const surfaceTokens: TokenDualMode[] = [
    {
      label: 'background.default',
      lightValue: lightPalette.background!.default!,
      darkValue: darkPalette.background!.default!,
      lightSource: `${neutralName} 50`,
      darkSource: `${neutralName} 950`,
    },
    {
      label: 'background.paper',
      lightValue: lightPalette.background!.paper!,
      darkValue: darkPalette.background!.paper!,
      lightSource: 'white',
      darkSource: `${neutralName} 900`,
    },
    {
      label: 'background.elevated',
      lightValue: lightPalette.background!.elevated!,
      darkValue: darkPalette.background!.elevated!,
      lightSource: `${neutralName} 100`,
      darkSource: `${neutralName} 800`,
    },
  ]

  const backgroundBrandTokens: TokenDualMode[] = [
    {
      label: 'background.brandPrimary',
      lightValue: lightPalette.background!.brandPrimary!,
      darkValue: darkPalette.background!.brandPrimary!,
      lightSource: 'primary 600',
      darkSource: `${neutralName} 800`,
    },
    {
      label: 'background.brandSecondary',
      lightValue: lightPalette.background!.brandSecondary!,
      darkValue: darkPalette.background!.brandSecondary!,
      lightSource: 'secondary 800',
      darkSource: `${neutralName} 800`,
    },
    {
      label: 'background.brandTertiary',
      lightValue: lightPalette.background!.brandTertiary!,
      darkValue: darkPalette.background!.brandTertiary!,
      lightSource: 'tertiary 500',
      darkSource: `${neutralName} 800`,
    },
    // Normalised tinted surfaces — same names across brands; brand-specific values
    {
      label: 'background.tintCool',
      lightValue: lightPalette.background!.tintCool!,
      darkValue: darkPalette.background!.tintCool!,
      lightSource: 'ART: skyBlue 200 / QSuper: qSkyBlue 100',
      darkSource: `${neutralName} 800`,
    },
    {
      label: 'background.tintNeutralCool',
      lightValue: lightPalette.background!.tintNeutralCool!,
      darkValue: darkPalette.background!.tintNeutralCool!,
      lightSource: 'ART: clearBlue 100 / QSuper: qSkyBlue 50',
      darkSource: `${neutralName} 800`,
    },
    {
      label: 'background.tintWarm',
      lightValue: lightPalette.background!.tintWarm!,
      darkValue: darkPalette.background!.tintWarm!,
      lightSource: `ART: salmon 50 / QSuper: ${neutralName} 100 (fallback)`,
      darkSource: `${neutralName} 800`,
    },
    {
      label: 'background.tintNeutral',
      lightValue: lightPalette.background!.tintNeutral!,
      darkValue: darkPalette.background!.tintNeutral!,
      lightSource: `${neutralName} 100`,
      darkSource: `${neutralName} 800`,
    },
  ]

  const textTokens: TokenDualMode[] = [
    {
      label: 'text.primary',
      lightValue: lightPalette.text!.primary!,
      darkValue: darkPalette.text!.primary!,
      lightSource: `${neutralName} 700 — 18:1 ✓ AAA`,
      darkSource: `${neutralName} 300 — 17.5:1 ✓ AAA`,
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
      lightSource: `${neutralName} 600 — 6.9:1 ✓ AA`,
      darkSource: `${neutralName} 500 — 12.6:1 ✓ AAA`,
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
      lightSource: `${neutralName} 500 — exempt (inactive)`,
      darkSource: `${neutralName} 500 — exempt (inactive)`,
    },
    {
      label: 'text.inverse',
      lightValue: lightPalette.text!.inverse!,
      darkValue: darkPalette.text!.inverse!,
      lightSource: '#ffffff — on brand backgrounds',
      darkSource: `${neutralName} 900 — on brand backgrounds`,
    },
  ]

  const actionTokens: TokenDualMode[] = [
    {
      label: 'action.active',
      lightValue: lightPalette.action!.active!,
      darkValue: darkPalette.action!.active!,
      lightSource: `${neutralName} 600 — icon/control active colour`,
      darkSource: `${neutralName} 300 — icon/control active colour`,
    },
    {
      label: 'action.hover',
      lightValue: lightPalette.action!.hover!,
      darkValue: darkPalette.action!.hover!,
      lightSource: `${neutralName} 900 @ 4% — hover overlay`,
      darkSource: `${neutralName} 50 @ 8% — hover overlay`,
    },
    {
      label: 'action.selected',
      lightValue: lightPalette.action!.selected!,
      darkValue: darkPalette.action!.selected!,
      lightSource: `${neutralName} 900 @ 8% — selected/expanded overlay`,
      darkSource: `${neutralName} 50 @ 16% — selected/expanded overlay`,
    },
    {
      label: 'action.disabled',
      lightValue: lightPalette.action!.disabled!,
      darkValue: darkPalette.action!.disabled!,
      lightSource: `${neutralName} 500 — disabled text & icons`,
      darkSource: `${neutralName} 500 — disabled text & icons`,
    },
    {
      label: 'action.disabledBackground',
      lightValue: lightPalette.action!.disabledBackground!,
      darkValue: darkPalette.action!.disabledBackground!,
      lightSource: `${neutralName} 200 — disabled control fill`,
      darkSource: `${neutralName} 800 — disabled control fill`,
    },
    {
      label: 'action.focus',
      lightValue: lightPalette.action!.focus!,
      darkValue: darkPalette.action!.focus!,
      lightSource: `${neutralName} 900 @ 12% — focus overlay`,
      darkSource: `${neutralName} 50 @ 12% — focus overlay`,
    },
  ]

  const dividerBorderTokens: TokenDualMode[] = [
    {
      label: 'divider',
      lightValue: lightPalette.divider!,
      darkValue: darkPalette.divider!,
      lightSource: `${neutralName} 300 — subtle separators`,
      darkSource: `${neutralName} 600 — subtle separators`,
    },
    {
      label: 'border.subtle',
      lightValue: lightPalette.border!.subtle!,
      darkValue: darkPalette.border!.subtle!,
      lightSource: `${neutralName} 200 — light dividers, inner sections`,
      darkSource: `${neutralName} 800 — light dividers, inner sections`,
    },
    {
      label: 'border.default',
      lightValue: lightPalette.border!.default!,
      darkValue: darkPalette.border!.default!,
      lightSource: `${neutralName} 300 — cards, containers`,
      darkSource: `${neutralName} 600 — cards, containers`,
    },
    {
      label: 'border.input',
      lightValue: lightPalette.border!.input!,
      darkValue: darkPalette.border!.input!,
      lightSource: `${neutralName} 500 — 4.25:1 ✓`,
      darkSource: `${neutralName} 500 — 8:1 ✓`,
    },
    {
      label: 'border.focus',
      lightValue: lightPalette.border!.focus!,
      darkValue: darkPalette.border!.focus!,
      lightSource: `${neutralName} 600 — focus states`,
      darkSource: `${neutralName} 400 — focus states`,
    },
  ]

  return (
    <Box sx={{ p: 4, maxWidth: 1200 }}>
      <Typography variant="h4" sx={{ mb: 0.5, fontWeight: 800 }}>
        Semantic Colors
      </Typography>
      <Typography variant="body" color="text.muted" sx={{ mb: 4 }}>
        All tokens shown with both light and dark mode values and their primitive sources.
      </Typography>

      <SectionHeading>Brand</SectionHeading>
      <SectionSubtitle>
        Swappable per brand. Sourced from the brand's primary and secondary primitive scales.
        These are the identity tokens (.main · .light · .dark · .contrastText) — for tinted
        surfaces (badges, chips, selected states), see "Brand Tinted Surfaces" below.
      </SectionSubtitle>
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 2, mb: 3 }}>
        {brandTokens.map((token) => (
          <DualModeTokenRow key={token.label} {...token} />
        ))}
      </Box>

      <SectionHeading>Brand Tinted Surfaces</SectionHeading>
      <SectionSubtitle>
        .background · .border · .text · .icon — the soft-tinted set for each brand colour. Use these for chips, badges, toggle-selected states, and any branded surface that isn't a focal CTA. In dark mode, .background is an alpha overlay so it composes onto any underlying surface. Status colours (error/warning/info/success) follow the same pattern — see Feedback below.
      </SectionSubtitle>
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 2, mb: 3 }}>
        {brandTintTokens.map((token) => (
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
        Interaction state overlays and disabled colours. hover, selected, and focus are semi-transparent overlays — they layer over any surface. Opacity scalars: hover 0.04 light / 0.08 dark · selected 0.08 light / 0.16 dark · focus 0.12 · activated 0.12 · disabled 0.38 (defined once in the OPACITY constant in semantic.ts so the alpha() calls and the *Opacity scalars can't drift apart).
      </SectionSubtitle>
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2, mb: 3, maxWidth: 900 }}>
        {actionTokens.map((token) => (
          <DualModeTokenRow key={token.label} {...token} />
        ))}
      </Box>

      <SectionHeading>Feedback</SectionHeading>
      <SectionSubtitle>Fixed across all brands. Each row is one severity: main · background · border · text · icon.</SectionSubtitle>
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 2, mb: 3 }}>
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

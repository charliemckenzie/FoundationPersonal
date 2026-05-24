import type { ReactNode } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

/**
 * Sidebar promo panel shown to the right of the QSuper megamenu columns.
 * Accepts custom children; falls back to a default "Why QSuper?" promo.
 */
export function QSuperPromoPanel({ children }: { children?: ReactNode }) {
  return (
    <Box
      sx={{
        bgcolor: 'background.brandSecondary',
        width: 300,
        flexShrink: 0,
        m: 2,
        borderRadius: (t) => `${t.shape.sm}px`,
        py: 5,
        px: 4,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      {children ?? <DefaultQSuperPromo />}
    </Box>
  )
}

function DefaultQSuperPromo() {
  return (
    <>
      <Typography
        component="p"
        variant="small"
        sx={{
          color: (t) => t.palette.tertiary?.main ?? t.palette.primary.light,
          fontWeight: 700,
          mb: 1.5,
          display: 'block',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
        }}
      >
        Why QSuper?
      </Typography>
      <Typography
        component="p"
        sx={{
          color: 'common.white',
          fontWeight: 700,
          fontSize: '1.375rem',
          lineHeight: 1.3,
          mb: 3,
          fontFamily: (t) => t.brandConfig.headingFontFamily ?? 'inherit',
        }}
      >
        A focus on long-term performance
      </Typography>
      <Box
        component="a"
        href="#"
        sx={(t) => ({
          color: 'common.white',
          fontWeight: 700,
          fontSize: t.typography.small.fontSize,
          lineHeight: t.typography.small.lineHeight,
          textDecoration: 'none !important',
          '&:hover': { color: t.palette.tertiary?.light ?? t.palette.primary.light },
          '&:focus-visible': { outline: '2px solid', outlineColor: 'border.focus', outlineOffset: '2px' },
          '&:focus': { outline: 'none' },
        })}
      >
        More reasons to feel good →
      </Box>
    </>
  )
}

import Portal from '@mui/material/Portal'
import Fade from '@mui/material/Fade'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import { useEffect, useRef } from 'react'
import { alpha, useTheme } from '@mui/material/styles'
import { MegaMenuColumn } from './MegaMenuColumn'
import { QSuperPromoPanel } from './QSuperPromoPanel'
import { PromoCard } from './PromoCard'
import type { NavItemMegamenu } from './types'

interface MegaMenuPanelProps {
  item: NavItemMegamenu
  open: boolean
  headerBottom: number
  experimentalNav?: boolean
  onClose: () => void
  onMouseEnter?: () => void
  onMouseLeave?: () => void
}

export function MegaMenuPanel({ item, open, headerBottom, experimentalNav = false, onClose, onMouseEnter, onMouseLeave }: MegaMenuPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null)
  const theme = useTheme()
  const isQSuper = theme.brandConfig?.name === 'QSuper'
  const isPrimaryExperimentalMenu = experimentalNav && ['Member', 'Adviser', 'Employer'].includes(item.label)

  useEffect(() => {
    if (open && panelRef.current) {
      const firstFocusable = panelRef.current.querySelector<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
      firstFocusable?.focus()
    }
  }, [open])

  return (
    <Portal>
      <Fade in={open} unmountOnExit>
        <Box
          ref={panelRef}
          role="region"
          aria-label={item.label}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          sx={{
            position: 'fixed',
            top: isPrimaryExperimentalMenu ? headerBottom + 10 : headerBottom - 2,
            left: isPrimaryExperimentalMenu ? '50%' : 0,
            right: isPrimaryExperimentalMenu ? 'auto' : 0,
            transform: isPrimaryExperimentalMenu ? 'translateX(-50%)' : 'none',
            width: isPrimaryExperimentalMenu ? 'min(82rem, calc(100vw - 2.5rem))' : 'auto',
            zIndex: (t) => t.zIndex.megaMenu,
          }}
        >
          {isQSuper ? (
            <Box
              sx={{
                maxWidth: (t) => t.breakpoints.values.lg,
                mx: 'auto',
                bgcolor: 'background.paper',
                borderTop: '3px solid',
                borderColor: 'primary.main',
                borderBottom: '1px solid',
                borderBottomColor: 'border.subtle',
                borderRadius: (t) => `0 0 ${t.shape.sm}px ${t.shape.sm}px`,
                boxShadow: 24,
                display: 'flex',
                alignItems: 'stretch',
              }}
            >
              <Box
                sx={{
                  flex: 1,
                  display: 'grid',
                  gridTemplateColumns: `repeat(${Math.min(item.columns.length, 2)}, 1fr)`,
                  gap: 5,
                  py: 5,
                  px: 4,
                }}
              >
                {item.columns.slice(0, 2).map((col, i) => (
                  <MegaMenuColumn key={i} group={col} onClose={onClose} />
                ))}
              </Box>
              <QSuperPromoPanel>{item.promoCard?.children}</QSuperPromoPanel>
            </Box>
          ) : (
            <Box
              sx={experimentalNav
                ? { bgcolor: 'transparent' }
                : { bgcolor: 'background.paper', borderBottom: 1, borderColor: 'border.subtle', boxShadow: 24 }}
            >
              <Container
                maxWidth={experimentalNav ? false : 'lg'}
                sx={experimentalNav ? { width: '100%', maxWidth: 'none', mx: 'auto', px: 0, py: 0 } : { py: 4 }}
              >
                <Box
                  sx={experimentalNav
                    ? {
                        display: 'grid',
                        gridTemplateColumns: isPrimaryExperimentalMenu ? '1.98fr 0.94fr' : '2fr 1fr',
                        bgcolor: 'transparent',
                        border: 1,
                        borderColor: 'border.subtle',
                        borderRadius: '1.75rem',
                        boxShadow: '0 1.25rem 3.5rem rgba(16, 24, 40, 0.18), 0 0.375rem 1rem rgba(16, 24, 40, 0.12)',
                        overflow: 'hidden',
                      }
                    : { display: 'flex', gap: 4 }}
                >
                  <Box
                    sx={experimentalNav
                      ? {
                          display: 'grid',
                          gridTemplateColumns: `repeat(${item.columns.length}, 1fr)`,
                          rowGap: isPrimaryExperimentalMenu ? 2.5 : 3,
                          columnGap: isPrimaryExperimentalMenu ? { xs: '1rem', md: '1.375rem', lg: '1.75rem' } : 3,
                          '& > :nth-of-type(2)': isPrimaryExperimentalMenu
                            ? { ml: { xs: '-0.25rem', md: '-0.4rem', lg: '-0.5rem' } }
                            : undefined,
                          py: isPrimaryExperimentalMenu ? '4rem' : 5,
                          px: isPrimaryExperimentalMenu ? '4rem' : 4,
                          bgcolor: isPrimaryExperimentalMenu ? 'background.paper' : 'transparent',
                        }
                      : { flex: 1, display: 'grid', gridTemplateColumns: `repeat(${item.columns.length}, 1fr)`, gap: 3 }}
                  >
                    {item.columns.map((col, i) => (
                      <MegaMenuColumn key={i} group={col} variant={isPrimaryExperimentalMenu ? 'member-v2' : 'default'} onClose={onClose} />
                    ))}
                  </Box>
                  {item.promoCard && (
                    <Box
                      sx={experimentalNav
                        ? (t) => ({
                            background: isPrimaryExperimentalMenu
                              ? `linear-gradient(165deg, ${alpha(t.palette.common.white, 0.74)}, ${alpha(t.palette.info.light, 0.12)})`
                              : `linear-gradient(160deg, ${alpha(t.palette.info.light, 0.9)}, ${alpha(t.palette.info.main, 0.45)})`,
                            backgroundColor: isPrimaryExperimentalMenu
                              ? alpha(t.palette.common.white, 0.52)
                              : alpha(t.palette.common.white, 0.16),
                            backdropFilter: isPrimaryExperimentalMenu ? 'blur(30px) saturate(145%) brightness(1.05)' : 'blur(12px)',
                            WebkitBackdropFilter: isPrimaryExperimentalMenu ? 'blur(30px) saturate(145%) brightness(1.05)' : 'blur(12px)',
                            borderLeft: '1px solid',
                            borderLeftColor: alpha(t.palette.common.white, 0.62),
                            px: isPrimaryExperimentalMenu ? '3rem' : 4,
                            py: isPrimaryExperimentalMenu ? '4rem' : 5,
                            '& p': { lineHeight: 1.6 },
                          })
                        : { '& p': { lineHeight: 1.75 } }}
                    >
                      {experimentalNav ? item.promoCard.children : <PromoCard>{item.promoCard.children}</PromoCard>}
                    </Box>
                  )}
                </Box>
              </Container>
            </Box>
          )}
        </Box>
      </Fade>
    </Portal>
  )
}

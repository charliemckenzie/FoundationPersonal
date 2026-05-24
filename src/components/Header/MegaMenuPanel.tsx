import Portal from '@mui/material/Portal'
import Fade from '@mui/material/Fade'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import { useEffect, useRef } from 'react'
import { useTheme } from '@mui/material/styles'
import { MegaMenuColumn } from './MegaMenuColumn'
import { QSuperPromoPanel } from './QSuperPromoPanel'
import { PromoCard } from './PromoCard'
import type { NavItemMegamenu } from './types'

interface MegaMenuPanelProps {
  item: NavItemMegamenu
  open: boolean
  headerBottom: number
  onClose: () => void
  onMouseEnter?: () => void
  onMouseLeave?: () => void
}

export function MegaMenuPanel({ item, open, headerBottom, onClose, onMouseEnter, onMouseLeave }: MegaMenuPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null)
  const theme = useTheme()
  const isQSuper = theme.brandConfig?.name === 'QSuper'

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
            top: headerBottom - 2,
            left: 0,
            right: 0,
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
            <Box sx={{ bgcolor: 'background.paper', borderBottom: 1, borderColor: 'border.subtle', boxShadow: 24 }}>
              <Container maxWidth="lg" sx={{ py: 4 }}>
                <Box sx={{ display: 'flex', gap: 4 }}>
                  <Box sx={{ flex: 1, display: 'grid', gridTemplateColumns: `repeat(${item.columns.length}, 1fr)`, gap: 3 }}>
                    {item.columns.map((col, i) => (
                      <MegaMenuColumn key={i} group={col} onClose={onClose} />
                    ))}
                  </Box>
                  {item.promoCard && (
                    <Box sx={{ '& p': { lineHeight: 1.75 } }}>
                      <PromoCard>{item.promoCard.children}</PromoCard>
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

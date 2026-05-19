import type { ReactNode } from 'react'
import Portal from '@mui/material/Portal'
import Backdrop from '@mui/material/Backdrop'
import Fade from '@mui/material/Fade'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { useEffect, useRef } from 'react'
import { useTheme } from '@mui/material/styles'
import { IconButton } from '../IconButton'
import { NavPanelLink } from './NavPanelLink'
import { PromoCard } from './PromoCard'
import type { NavItemMegamenu, NavGroup } from './types'

interface MegaMenuPanelProps {
  item: NavItemMegamenu
  open: boolean
  headerBottom: number
  onClose: () => void
}

interface NavColumnProps {
  group: NavGroup
  onClose: () => void
}

function NavColumn({ group, onClose }: NavColumnProps) {
  const prominent = !group.heading
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      {group.heading && (
        <Typography
          variant="body"
          component="p"
          sx={{ fontWeight: 700, color: 'text.heading', mb: 1, display: 'block' }}
        >
          {group.heading}
        </Typography>
      )}
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        {group.links.map((link) => (
          <NavPanelLink key={link.href} {...link} prominent={prominent} onClick={onClose} />
        ))}
      </Box>
    </Box>
  )
}

function QSuperPromoPanel({ children }: { children?: ReactNode }) {
  return (
    <Box
      sx={{
        bgcolor: 'background.brandSecondary',
        width: 260,
        flexShrink: 0,
        py: 5,
        px: 4,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignSelf: 'stretch',
      }}
    >
      {children ?? (
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
            sx={{
              color: 'common.white',
              fontWeight: 700,
              fontSize: '0.875rem',
              lineHeight: 1.5,
              textDecoration: 'none !important',
              '&:hover': { color: (t) => t.palette.tertiary?.light ?? t.palette.primary.light },
              '&:focus-visible': { outline: '2px solid', outlineColor: 'border.focus', outlineOffset: '2px' },
              '&:focus': { outline: 'none' },
            }}
          >
            More reasons to feel good →
          </Box>
        </>
      )}
    </Box>
  )
}

export function MegaMenuPanel({ item, open, headerBottom, onClose }: MegaMenuPanelProps) {
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
      <Backdrop
        open={open}
        onClick={onClose}
        sx={{ zIndex: (t) => t.zIndex.appBar, bgcolor: 'rgba(0,0,0,0.4)' }}
      />
      <Fade in={open} unmountOnExit>
        <Box
          ref={panelRef}
          role="region"
          aria-label={item.label}
          sx={{
            position: 'fixed',
            top: headerBottom,
            left: 0,
            right: 0,
            bgcolor: 'background.paper',
            borderBottom: 1,
            borderColor: 'border.subtle',
            zIndex: (t) => t.zIndex.appBar + 1,
          }}
        >
          {isQSuper ? (
            <Container maxWidth="lg" disableGutters sx={{ display: 'flex', alignItems: 'stretch' }}>
              <Box
                sx={{
                  flex: 1,
                  display: 'grid',
                  gridTemplateColumns: `repeat(${Math.min(item.columns.length, 3)}, 1fr)`,
                  gap: 4,
                  py: 4,
                  px: 3,
                }}
              >
                {item.columns.slice(0, 3).map((col, i) => (
                  <NavColumn key={i} group={col} onClose={onClose} />
                ))}
              </Box>
              <QSuperPromoPanel>{item.promoCard?.children}</QSuperPromoPanel>
            </Container>
          ) : (
            <Container maxWidth="lg" sx={{ py: 4 }}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1 }}>
                <IconButton icon="xmark" label="Close menu" variant="ghost" size="small" onClick={onClose} />
              </Box>
              <Box sx={{ display: 'flex', gap: 4 }}>
                <Box sx={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 3 }}>
                  {item.columns.map((col, i) => (
                    <NavColumn key={i} group={col} onClose={onClose} />
                  ))}
                </Box>
                {item.promoCard && <PromoCard>{item.promoCard.children}</PromoCard>}
              </Box>
            </Container>
          )}
        </Box>
      </Fade>
    </Portal>
  )
}

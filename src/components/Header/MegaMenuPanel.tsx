import Portal from '@mui/material/Portal'
import Backdrop from '@mui/material/Backdrop'
import Fade from '@mui/material/Fade'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { useEffect, useRef } from 'react'
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
  return (
    <Box>
      {group.heading && (
        <Typography
          variant="small"
          sx={{ fontWeight: 700, color: 'text.muted', mb: 1, display: 'block' }}
        >
          {group.heading}
        </Typography>
      )}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
        {group.links.map((link) => (
          <NavPanelLink key={link.href} {...link} onClick={onClose} />
        ))}
      </Box>
    </Box>
  )
}

export function MegaMenuPanel({ item, open, headerBottom, onClose }: MegaMenuPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null)

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
            py: 4,
          }}
        >
          <Container maxWidth="lg">
            <Box sx={{ display: 'flex', gap: 4 }}>
              <Box
                sx={{
                  flex: 1,
                  display: 'grid',
                  gridTemplateColumns: `repeat(${item.columns.length}, 1fr)`,
                  gap: 3,
                }}
              >
                {item.columns.map((col, i) => (
                  <NavColumn key={i} group={col} onClose={onClose} />
                ))}
              </Box>
              {item.promoCard && <PromoCard {...item.promoCard} />}
            </Box>
          </Container>
        </Box>
      </Fade>
    </Portal>
  )
}

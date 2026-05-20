import type { ReactNode } from 'react'
import Portal from '@mui/material/Portal'
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
  onMouseEnter?: () => void
  onMouseLeave?: () => void
}

interface NavColumnProps {
  group: NavGroup
  onClose: () => void
}

function NavColumn({ group, onClose }: NavColumnProps) {
  // A heading is a true section header (bold) only when it has children underneath it.
  // Standalone items (headingHref + no links + no groups) render as regular-weight links.
  const hasChildren = (group.links && group.links.length > 0) || (group.groups && group.groups.length > 0)
  const headingIsBold = hasChildren

  const headingNode = group.heading ? (
    group.headingHref ? (
      <Box
        component="a"
        href={group.headingHref}
        onClick={onClose}
        sx={{ display: 'block', mb: headingIsBold ? 1 : 0, color: 'text.primary', textDecorationLine: 'none !important', '&:hover': { color: 'primary.main', textDecorationLine: 'none !important' }, '&:focus-visible': { outline: '2px solid', outlineColor: 'border.focus', outlineOffset: '2px', borderRadius: (t) => `${t.shape.sm}px` }, '&:focus': { outline: 'none' } }}
      >
        <Typography variant="body" sx={{ fontWeight: headingIsBold ? 700 : 400, display: 'block' }}>{group.heading}</Typography>
      </Box>
    ) : (
      <Typography variant="body" component="p" sx={{ fontWeight: 700, color: 'text.primary', mb: 1, display: 'block' }}>
        {group.heading}
      </Typography>
    )
  ) : null

  if (group.groups && group.groups.length > 0) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {headingNode}
        {group.groups.map((subGroup, i) => (
          <NavColumn key={i} group={subGroup} onClose={onClose} />
        ))}
      </Box>
    )
  }

  const prominent = !group.heading
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      {headingNode}
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        {(group.links ?? []).map((link) => (
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
        width: 300,
        flexShrink: 0,
        m: 2,
        borderRadius: (t) => `${t.shape.lg}px`,
        py: 5,
        px: 4,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
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
            top: headerBottom,
            left: 0,
            right: 0,
            zIndex: (t) => t.zIndex.appBar + 1,
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
                borderRadius: (t) => `0 0 ${t.shape.lg}px ${t.shape.lg}px`,
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
                  <NavColumn key={i} group={col} onClose={onClose} />
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
                      <NavColumn key={i} group={col} onClose={onClose} />
                    ))}
                  </Box>
                  {item.promoCard && <PromoCard>{item.promoCard.children}</PromoCard>}
                </Box>
              </Container>
            </Box>
          )}
        </Box>
      </Fade>
    </Portal>
  )
}

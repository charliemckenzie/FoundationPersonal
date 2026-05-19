'use client'

import { useState, useRef, useEffect } from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import { useTheme, useMediaQuery } from '@mui/material'
import { Logo } from '../Logo'
import { MegaMenuPanel } from './MegaMenuPanel'
import { NavDrawer } from './NavDrawer'
import { UtilityBar } from './UtilityBar'
import { AudienceBar } from './AudienceBar'
import { QSuperMainBar } from './QSuperMainBar'
import type { HeaderProps, NavItem } from './types'

export function QSuperHeader({
  navItems,
  secondaryNavItems,
  primaryCta,
  secondaryCta,
  onSearch,
  searchPlaceholder,
  audienceLinks,
  resourceLinks,
  activeAudienceHref,
}: HeaderProps) {
  const [activePanel, setActivePanel] = useState<string | null>(null)
  const [headerBottom, setHeaderBottom] = useState(0)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const headerRef = useRef<HTMLElement | null>(null)
  const triggerRef = useRef<HTMLButtonElement | null>(null)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'))
  const isPhone = useMediaQuery(theme.breakpoints.down('md'))

  const closePanel = () => { triggerRef.current?.focus(); setActivePanel(null) }

  useEffect(() => { if (isMobile) closePanel() }, [isMobile])

  useEffect(() => {
    if (activePanel && headerRef.current) {
      setHeaderBottom(headerRef.current.getBoundingClientRect().bottom)
    }
  }, [activePanel])

  useEffect(() => {
    const handleScroll = () => closePanel()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => { if (e.key === 'Escape') closePanel() }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const handleNavClick = (item: NavItem, el: HTMLButtonElement) => {
    if (item.type === 'link') { window.location.href = item.href; return }
    if (activePanel === item.label) { closePanel(); return }
    triggerRef.current = el
    setActivePanel(item.label)
  }

  const activeItem = navItems.find((item) => item.label === activePanel) ?? null

  return (
    <>
      <AppBar
        component="header"
        ref={headerRef}
        position="sticky"
        color="inherit"
        elevation={0}
        sx={{
          top: 0,
          borderBottom: 1,
          borderColor: 'border.subtle',
          zIndex: (t) => t.zIndex.appBar + 2,
          boxShadow: 0,
        }}
      >
        {/* Desktop: logo (full height) on left + two rows on right */}
        {!isMobile && (
          <Container maxWidth="lg" sx={{ display: 'flex', alignItems: 'stretch', px: { xs: 2, sm: 3 } }}>
            {/* Logo — 183×72px, spans both rows vertically centred */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                alignSelf: 'stretch',
                flexShrink: 0,
                pr: 3,
                '& > div': {
                  width: '11.4375rem',
                  height: '4.5rem',
                },
                '& svg': { width: '100%', height: 'auto' },
              }}
            >
              <Logo variant="primary" size="lg" />
            </Box>

            {/* Right column: audience bar row + main bar row */}
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <AudienceBar
                audienceLinks={audienceLinks}
                resourceLinks={resourceLinks}
                activeHref={activeAudienceHref}
              />
              <QSuperMainBar
                navItems={navItems}
                primaryCta={primaryCta}
                secondaryCta={secondaryCta}
                onSearch={onSearch}
                searchPlaceholder={searchPlaceholder}
                activePanel={activePanel}
                onNavClick={handleNavClick}
              />
            </Box>
          </Container>
        )}

        {/* Mobile layout: hamburger + mark logo + CTAs */}
        {isMobile && (
          <UtilityBar
            primaryCta={primaryCta}
            secondaryCta={secondaryCta}
            onSearch={onSearch}
            onMenuOpen={() => setDrawerOpen(true)}
            isMobile={true}
            isPhone={isPhone}
            searchPlaceholder={searchPlaceholder}
          />
        )}
      </AppBar>

      {activeItem?.type === 'megamenu' && (
        <MegaMenuPanel
          item={activeItem}
          open={true}
          headerBottom={headerBottom}
          onClose={closePanel}
        />
      )}

      <NavDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        navItems={navItems}
        secondaryNavItems={secondaryNavItems}
        primaryCta={primaryCta}
        secondaryCta={secondaryCta}
        onSearch={onSearch}
      />
    </>
  )
}

'use client'

import { useState, useRef, useEffect } from 'react'
import Box from '@mui/material/Box'
import AppBar from '@mui/material/AppBar'
import Container from '@mui/material/Container'
import { useTheme, useMediaQuery } from '@mui/material'
import { MegaMenuPanel } from './MegaMenuPanel'
import { NavDrawer } from './NavDrawer'
import { NavItemButton } from './NavItemButton'
import { UtilityBar } from './UtilityBar'
import { CondensedBar } from './CondensedBar'
import { HOMEPAGE_HEADER_CONTAINER_SX } from './headerUtils'
import type { HeaderProps, NavItem } from './types'

export function ARTHeader({ navItems, secondaryNavItems, primaryCta, secondaryCta, utilityLinks, onSearch, searchPlaceholder, condensed, homepageBlend = false }: HeaderProps) {
  const [activePanel, setActivePanel] = useState<string | null>(null)
  const [headerBottom, setHeaderBottom] = useState(0)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const headerRef = useRef<HTMLElement | null>(null)
  const triggerRef = useRef<HTMLButtonElement | null>(null)
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const openTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'))
  const isPhone = useMediaQuery(theme.breakpoints.down('md'))

  const cancelClose = () => {
    if (closeTimerRef.current !== null) { clearTimeout(closeTimerRef.current); closeTimerRef.current = null }
  }

  const cancelOpen = () => {
    if (openTimerRef.current !== null) { clearTimeout(openTimerRef.current); openTimerRef.current = null }
  }

  const scheduleClose = () => {
    cancelOpen()
    cancelClose()
    closeTimerRef.current = setTimeout(() => setActivePanel(null), 300)
  }

  const closePanel = () => { cancelOpen(); cancelClose(); triggerRef.current?.focus(); setActivePanel(null) }

  useEffect(() => { if (isMobile) closePanel() }, [isMobile])

  useEffect(() => {
    if (activePanel && headerRef.current) {
      setHeaderBottom(headerRef.current.getBoundingClientRect().bottom)
    }
  }, [activePanel])

  useEffect(() => {
    const handleScroll = () => { setScrolled(prev => prev ? window.scrollY > 100 : window.scrollY > 150); closePanel() }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => { if (e.key === 'Escape') closePanel() }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  useEffect(() => () => { cancelOpen(); cancelClose() }, [])

  const handleNavClick = (item: NavItem, el: HTMLButtonElement) => {
    if (item.type === 'link') { window.location.href = item.href; return }
    if (activePanel === item.label) { closePanel(); return }
    triggerRef.current = el
    setActivePanel(item.label)
  }

  const handleNavHover = (item: NavItem, el: HTMLButtonElement) => {
    cancelClose()
    cancelOpen()
    if (item.type === 'link') return
    if (activePanel !== null) {
      // Already in menu mode — switch immediately
      triggerRef.current = el
      setActivePanel(item.label)
    } else {
      // Not in menu mode — wait for hover intent before opening
      openTimerRef.current = setTimeout(() => {
        triggerRef.current = el
        setActivePanel(item.label)
      }, 250)
    }
  }

  const activeItem =
    navItems.find((item) => item.label === activePanel) ??
    secondaryNavItems?.find((item) => item.label === activePanel) ?? null

  const isCondensed = condensed ?? (scrolled && !isMobile)
  // Homepage blend applies only to the expanded hero state.
  const blended = homepageBlend && !isCondensed

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
          borderColor: blended ? 'transparent' : 'border.subtle',
          bgcolor: blended ? 'transparent !important' : 'background.default',
          backgroundColor: blended ? 'transparent !important' : undefined,
          backgroundImage: blended ? 'none' : undefined,
          backdropFilter: blended ? 'none' : undefined,
          color: blended ? 'text.inverse' : 'text.primary',
          zIndex: (t) => t.zIndex.stickyHeader,
          boxShadow: isCondensed ? 2 : 0,
          transition: 'box-shadow 0.2s ease',
        }}
      >
        {/* Desktop: both layouts stay in the DOM, height animated via grid-template-rows */}
        {!isMobile && (
          <>
            <Box sx={{ display: 'grid', gridTemplateRows: isCondensed ? '1fr' : '0fr', transition: 'grid-template-rows 0.25s ease' }}>
              <Box sx={{ overflow: 'hidden', opacity: isCondensed ? 1 : 0, transition: 'opacity 0.2s ease' }}>
                <CondensedBar
                  navItems={navItems}
                  utilityLinks={utilityLinks}
                  primaryCta={primaryCta}
                  secondaryCta={secondaryCta}
                  inverted={blended}
                  wide={homepageBlend}
                  onSearch={onSearch}
                  searchPlaceholder={searchPlaceholder}
                  activePanel={activePanel}
                  onNavClick={handleNavClick}
                  onNavHover={handleNavHover}
                  onNavHoverEnd={scheduleClose}
                />
              </Box>
            </Box>

            <Box sx={{ display: 'grid', gridTemplateRows: isCondensed ? '0fr' : '1fr', transition: 'grid-template-rows 0.25s ease' }}>
              <Box sx={{ overflow: 'hidden', opacity: isCondensed ? 0 : 1, transition: 'opacity 0.2s ease' }}>
                <UtilityBar
                  utilityLinks={utilityLinks}
                  primaryCta={primaryCta}
                  secondaryCta={secondaryCta}
                  inverted={blended}
                  wide={blended}
                  onSearch={onSearch}
                  onMenuOpen={() => setDrawerOpen(true)}
                  isMobile={false}
                  isPhone={false}
                  searchPlaceholder={searchPlaceholder}
                />
              <Box>
                <Container maxWidth={blended ? false : 'lg'} sx={blended ? HOMEPAGE_HEADER_CONTAINER_SX : undefined}>
                  <Box
                    component="nav"
                    id="main-nav"
                    aria-label="Main navigation"
                    sx={{ display: 'flex', alignItems: 'stretch', gap: 4 }}
                  >
                    {navItems.map((item) => (
                      <NavItemButton
                        key={item.label}
                        item={item}
                        active={activePanel === item.label}
                        inverted={blended}
                        onClick={handleNavClick}
                        onHover={handleNavHover}
                        onHoverEnd={scheduleClose}
                      />
                    ))}
                    {secondaryNavItems && secondaryNavItems.length > 0 && (
                      <>
                        <Box sx={{ flex: 1 }} />
                        {secondaryNavItems.map((item) => (
                          <NavItemButton
                            key={item.label}
                            item={item}
                            active={activePanel === item.label}
                            inverted={blended}
                            secondary
                            onClick={handleNavClick}
                            onHover={handleNavHover}
                            onHoverEnd={scheduleClose}
                          />
                        ))}
                      </>
                    )}
                  </Box>
                </Container>
              </Box>
            </Box>
          </Box>
          </>
        )}

        {/* Mobile layout */}
        {isMobile && (
          <UtilityBar
            utilityLinks={utilityLinks}
            primaryCta={primaryCta}
            secondaryCta={secondaryCta}
            inverted={blended}
            wide={blended}
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
          onMouseEnter={cancelClose}
          onMouseLeave={scheduleClose}
        />
      )}

      <NavDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        navItems={navItems}
        secondaryNavItems={secondaryNavItems}
        primaryCta={primaryCta}
        secondaryCta={secondaryCta}
        utilityLinks={utilityLinks}
        onSearch={onSearch}
      />
    </>
  )
}

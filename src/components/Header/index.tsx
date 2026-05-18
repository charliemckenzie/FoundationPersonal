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
import type { HeaderProps, NavItem } from './types'

export function Header({ navItems, secondaryNavItems, primaryCta, secondaryCta, utilityLinks, onSearch }: HeaderProps) {
  const [activePanel, setActivePanel] = useState<string | null>(null)
  const [headerBottom, setHeaderBottom] = useState(0)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const headerRef = useRef<HTMLElement | null>(null)
  const triggerRef = useRef<HTMLButtonElement | null>(null)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'))
  const isPhone = useMediaQuery(theme.breakpoints.down('md'))

  const closePanel = () => {
    triggerRef.current?.focus()
    setActivePanel(null)
  }

  useEffect(() => {
    if (isMobile) closePanel()
  }, [isMobile])

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
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closePanel()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const handleNavClick = (item: NavItem, el: HTMLButtonElement) => {
    if (item.type === 'link') {
      window.location.href = item.href
      return
    }
    if (activePanel === item.label) {
      closePanel()
      return
    }
    triggerRef.current = el
    setActivePanel(item.label)
  }

  const activeItem =
    navItems.find((item) => item.label === activePanel) ??
    secondaryNavItems?.find((item) => item.label === activePanel) ??
    null

  return (
    <Box component="div">
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
        }}
      >
        {/* Row 1 — utility bar: Logo, Search, UtilityLinks, CTAs */}
        <UtilityBar
          utilityLinks={utilityLinks}
          primaryCta={primaryCta}
          secondaryCta={secondaryCta}
          onSearch={onSearch}
          onMenuOpen={() => setDrawerOpen(true)}
          isMobile={isMobile}
          isPhone={isPhone}
        />

        {/* Row 2 — primary nav (desktop only) */}
        {!isMobile && (
          <Box>
            <Container maxWidth="lg">
              <Box
                component="nav"
                aria-label="Main navigation"
                sx={{ display: 'flex', alignItems: 'stretch', gap: 0.5 }}
              >
                {navItems.map((item) => (
                  <NavItemButton
                    key={item.label}
                    item={item}
                    active={activePanel === item.label}
                    onClick={handleNavClick}
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
                        secondary
                        onClick={handleNavClick}
                      />
                    ))}
                  </>
                )}
              </Box>
            </Container>
          </Box>
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
    </Box>
  )
}


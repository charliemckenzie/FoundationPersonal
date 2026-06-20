'use client'

import Box from '@mui/material/Box'
import AppBar from '@mui/material/AppBar'
import Container from '@mui/material/Container'
import { MegaMenuPanel } from './MegaMenuPanel'
import { NavDrawer } from './NavDrawer'
import { NavItemButton } from './NavItemButton'
import { UtilityBar } from './UtilityBar'
import { CondensedBar } from './CondensedBar'
import { useArtHeaderNav } from './useArtHeaderNav'
import type { HeaderProps } from './types'

export function ARTHeader({ navItems, secondaryNavItems, primaryCta, secondaryCta, utilityLinks, onSearch, searchPlaceholder, condensed }: HeaderProps) {
  const {
    activePanel,
    headerBottom,
    drawerOpen,
    setDrawerOpen,
    headerRef,
    isMobile,
    isPhone,
    isCondensed,
    activeItem,
    cancelClose,
    scheduleClose,
    closePanel,
    handleNavClick,
    handleNavHover,
  } = useArtHeaderNav(navItems, secondaryNavItems, condensed)

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
                  onSearch={onSearch}
                  onMenuOpen={() => setDrawerOpen(true)}
                  isMobile={false}
                  isPhone={false}
                  searchPlaceholder={searchPlaceholder}
                />
              <Box>
                <Container maxWidth="lg">
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

'use client'

import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import { Logo } from '../Logo'
import { IconButton } from '../IconButton'
import { HeaderCtaButton } from './CtaButton'
import { MegaMenuPanel } from './MegaMenuPanel'
import { NavDrawer } from './NavDrawer'
import { AudienceBar } from './AudienceBar'
import { QSuperMainBar } from './QSuperMainBar'
import { useQSuperHeaderNav } from './useQSuperHeaderNav'
import type { HeaderProps } from './types'

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
  const {
    activePanel,
    headerBottom,
    drawerOpen,
    setDrawerOpen,
    headerRef,
    isTablet,
    isPhone,
    activeItem,
    closePanel,
    handleNavClick,
  } = useQSuperHeaderNav(navItems)

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
          boxShadow: 0,
        }}
      >
        {/* Desktop: logo on left, audience bar + nav on right */}
        {!isTablet && !isPhone && (
          <Container maxWidth="lg" sx={{ display: 'flex', alignItems: 'stretch', px: { xs: 2, sm: 3 }, minHeight: '117px' }}>
            {/* Logo — 182×72px, spans both rows vertically centred */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                alignSelf: 'stretch',
                flexShrink: 0,
                pr: 3,
                mt: '-8px',
                '& > div': {
                  width: '11.375rem',
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
                onNavHoverEnd={closePanel}
              />
            </Box>
          </Container>
        )}

        {/* Tablet: audience bar full-width on top, logo + controls on bottom row */}
        {isTablet && (
          <Container maxWidth="lg" sx={{ display: 'flex', flexDirection: 'column', px: { xs: 2, sm: 3 } }}>
            <AudienceBar
              audienceLinks={audienceLinks}
              resourceLinks={resourceLinks}
              activeHref={activeAudienceHref}
            />
            <Box sx={{ display: 'flex', alignItems: 'center', py: '12px' }}>
              <Box
                sx={{
                  flexShrink: 0,
                  '& > div': { width: '11.375rem', height: '4.5rem' },
                  '& svg': { width: '100%', height: 'auto' },
                }}
              >
                <Logo variant="primary" size="lg" />
              </Box>
              <Box sx={{ flex: 1 }} />
              <QSuperMainBar
                navItems={navItems}
                primaryCta={primaryCta}
                secondaryCta={secondaryCta}
                onSearch={onSearch}
                searchPlaceholder={searchPlaceholder}
                activePanel={activePanel}
                onNavClick={handleNavClick}
                onNavHoverEnd={closePanel}
                showHamburger
                onMenuOpen={() => setDrawerOpen(true)}
              />
            </Box>
          </Container>
        )}

        {/* Phone layout: primary logo LHS, Join + Login + hamburger RHS */}
        {isPhone && (
          <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', py: '12px' }}>
              <Box
                sx={{
                  flexShrink: 0,
                  '& > div': { width: '3rem', height: '3rem' },
                  '& svg': { width: '100%', height: 'auto' },
                }}
              >
                <Logo variant="mark" size="lg" />
              </Box>
              <Box sx={{ flex: 1 }} />
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {primaryCta && <HeaderCtaButton cta={primaryCta} variant="outlined" size="small" condensed noMenu sx={{ height: '36px' }} />}
                {secondaryCta && <HeaderCtaButton cta={secondaryCta} variant="contained" size="small" condensed noMenu sx={{ height: '36px' }} />}
                <IconButton icon="bars" label="Open navigation menu" variant="ghost" onClick={() => setDrawerOpen(true)} />
              </Box>
            </Box>
          </Container>
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
        audienceLinks={audienceLinks}
        activeAudienceHref={activeAudienceHref}
      />
    </>
  )
}

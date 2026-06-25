'use client'

import { useState, useRef, useEffect } from 'react'
import Box from '@mui/material/Box'
import AppBar from '@mui/material/AppBar'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { useTheme, useMediaQuery } from '@mui/material'
import { alpha } from '@mui/material/styles'
import { MegaMenuPanel } from './MegaMenuPanel'
import { NavDrawer } from './NavDrawer'
import { NavItemButton } from './NavItemButton'
import { UtilityBar } from './UtilityBar'
import { CondensedBar } from './CondensedBar'
import { HeaderSearchForm } from './HeaderSearchForm'
import { HeaderCtaButton } from './CtaButton'
import { Logo } from '../Logo'
import { Icon } from '../Icon'
import { HOMEPAGE_HEADER_CONTAINER_SX } from './headerUtils'
import type { HeaderProps, NavItem, NavItemMegamenu } from './types'

export function ARTHeader({ navItems, secondaryNavItems, primaryCta, secondaryCta, utilityLinks, onSearch, searchPlaceholder, condensed, homepageBlend = false, experimentalNav = false, experimentalNavVariant }: HeaderProps) {
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

  const isCondensed = condensed ?? (scrolled && !isMobile)
  // Homepage blend applies only to the expanded hero state.
  const baseBlend = homepageBlend && !isCondensed
  const activeExperimentalVariant = experimentalNavVariant ?? (experimentalNav ? 'member-v1' : undefined)
  const useExperimentalDesktopNav = (activeExperimentalVariant === 'member-v1' || activeExperimentalVariant === 'member-v2') && baseBlend && !isMobile

  const memberV2Item: NavItemMegamenu = {
    type: 'megamenu',
    label: 'Member',
    columns: [
      {
        heading: 'About',
        links: [
          { label: 'Fund details', href: '/about/fund-details' },
          { label: 'Compare us', href: '/about/compare' },
          { label: 'Fees', href: '/about/fees' },
          { label: 'Awards', href: '/about/awards' },
        ],
      },
      {
        heading: 'Saving',
        links: [
          { label: 'Superannuation', href: '/super' },
          { label: 'Investments', href: '/investments' },
          { label: 'Contributions', href: '/super/contribute' },
          { label: 'Insurance', href: '/insurance' },
          { label: 'Beneficiaries', href: '/member-online/beneficiaries' },
        ],
      },
      {
        heading: 'Retiring',
        links: [
          { label: 'Book an advice call', href: '/financial-planning' },
          { label: 'Plan your retirement', href: '/retirement/getting-ready' },
          { label: 'Withdraw a lump sum or start an income account', href: '/retirement/income-accounts' },
          { label: 'Manage your retirement', href: '/retirement' },
        ],
      },
    ],
    promoCard: {
      children: (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h5" sx={{ color: 'text.heading', mb: '2.5rem' }}>
            Our resources
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.25 }}>
            {[
              {
                icon: 'art/Call.svg',
                title: 'Advice',
                href: '/contact',
                description: 'Call or live chat available',
              },
              {
                icon: 'art/Education.svg',
                title: 'Education',
                href: '/about/education',
                description: 'Articles, calculators, podcasts',
              },
              {
                icon: 'art/Rewards.svg',
                title: 'Rewards',
                href: '/rewards',
                description: 'More than 3,000 exclusive deals',
              },
            ].map((link) => (
              <Box key={link.title} component="a" href={link.href} sx={{ display: 'flex', alignItems: 'center', gap: 1.5, textDecorationLine: 'none !important', color: 'inherit', '&:visited': { color: 'inherit' } }}>
                <Box
                  sx={{
                    width: '3.25rem',
                    height: '3.25rem',
                    borderRadius: '0.75rem',
                    bgcolor: 'common.white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'primary.main',
                  }}
                >
                  <Icon icon={link.icon} size="lg" color="inherit" />
                </Box>
                <Box>
                  <Typography variant="body" component="p" sx={{ color: 'text.heading', mb: 0.125, fontWeight: 700 }}>
                    {link.title} <Box component="span" sx={{ color: 'text.heading' }}>→</Box>
                  </Typography>
                  <Typography variant="small" sx={{ color: 'text.primary' }}>
                    {link.description}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      ),
    },
  }

  const memberItem = navItems.find((item) => item.type === 'megamenu') ?? navItems[0]
  const adviserItem = secondaryNavItems?.find((item) => /adviser/i.test(item.label)) ?? secondaryNavItems?.[0]
  const employerItem = secondaryNavItems?.find((item) => /employer/i.test(item.label)) ?? secondaryNavItems?.[1]
  const contactHref = utilityLinks?.find((item) => /contact/i.test(item.label))?.href ?? '/contact'
  const memberExperimentItem: NavItem =
    activeExperimentalVariant === 'member-v2'
      ? memberV2Item
      : memberItem
        ? { ...memberItem, label: 'Member' }
        : { type: 'link', label: 'Member', href: '/member-online' }

  const experimentalItems: NavItem[] = [
    memberExperimentItem,
    ...(adviserItem ? [{ ...adviserItem, label: 'Adviser' }] : []),
    ...(employerItem ? [{ ...employerItem, label: 'Employer' }] : []),
    { type: 'link', label: 'Contact us', href: contactHref },
  ]

  // In experimental mode, check experimental items array too
  const activeItemFromExperimental = useExperimentalDesktopNav
    ? experimentalItems.find((item) => item.label === activePanel)
    : undefined

  const activeItem =
    activeItemFromExperimental ??
    navItems.find((item) => item.label === activePanel) ??
    secondaryNavItems?.find((item) => item.label === activePanel) ?? null

  const blended = baseBlend && !useExperimentalDesktopNav
  const experimentalInverted = useExperimentalDesktopNav

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
          borderColor: blended || experimentalInverted ? 'transparent' : 'border.subtle',
          bgcolor: blended || experimentalInverted ? '#0051FF !important' : 'background.default',
          backgroundColor: blended || experimentalInverted ? '#0051FF !important' : undefined,
          backgroundImage: blended || experimentalInverted ? 'none' : undefined,
          backdropFilter: blended || experimentalInverted ? 'none' : undefined,
          color: blended || experimentalInverted ? 'text.inverse' : 'text.primary',
          zIndex: (t) => t.zIndex.stickyHeader,
          boxShadow: isCondensed ? 2 : 0,
          transition: 'box-shadow 0.2s ease',
        }}
      >
        {/* Desktop: both layouts stay in the DOM, height animated via grid-template-rows */}
        {!isMobile && (
          useExperimentalDesktopNav ? (
            <Container maxWidth={false} sx={HOMEPAGE_HEADER_CONTAINER_SX}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, py: 1.5 }}>
                <Logo size="lg" inverted />

                <Box component="nav" id="main-nav" aria-label="Main navigation" sx={{ display: 'flex', alignSelf: 'stretch', ml: '3rem', gap: '2rem' }}>
                  {experimentalItems.map((item) => (
                    <NavItemButton
                      key={item.label}
                      item={item}
                      active={activePanel === item.label}
                        inverted
                      showChevron={item.type !== 'link'}
                      sx={{
                        px: 0,
                        pt: 0,
                        pb: 0,
                        '& .nav-indicator': {
                          fontWeight: 400,
                          borderBottomWidth: '2px',
                        },
                      }}
                      fontSize="1rem"
                      onClick={handleNavClick}
                      onHover={handleNavHover}
                      onHoverEnd={scheduleClose}
                    />
                  ))}
                </Box>

                <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center', gap: 1.25 }}>
                  {onSearch && (
                    <Box sx={{ width: { md: '20rem', lg: '22rem' } }}>
                      <HeaderSearchForm onSubmit={onSearch} placeholder={searchPlaceholder} inverted />
                    </Box>
                  )}
                  {primaryCta && <HeaderCtaButton cta={primaryCta} variant="outlined" reversed />}
                  {secondaryCta && <HeaderCtaButton cta={secondaryCta} variant="contained" reversed />}
                </Box>
              </Box>
            </Container>
          ) : (
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
                    sx={{
                      display: 'flex',
                      alignItems: 'stretch',
                      gap: useExperimentalDesktopNav ? 1 : 4,
                      ...(useExperimentalDesktopNav && {
                        px: 1,
                        py: 0.5,
                        borderRadius: '999px',
                        bgcolor: alpha('#FFFFFF', 0.12),
                        border: '1px solid',
                        borderColor: alpha('#FFFFFF', 0.26),
                        backdropFilter: 'blur(8px)',
                        width: 'fit-content',
                      }),
                    }}
                  >
                    {navItems.map((item) => (
                      <NavItemButton
                        key={item.label}
                        item={item}
                        active={activePanel === item.label}
                        inverted={blended}
                        sx={useExperimentalDesktopNav ? {
                          px: 1.5,
                          pt: 0,
                          pb: 0,
                          borderRadius: '999px',
                          transition: 'background-color 160ms ease',
                          '& .nav-indicator': {
                            pb: '0.625rem',
                            borderBottomColor: 'transparent',
                          },
                          '&[aria-expanded="true"]': {
                            bgcolor: alpha('#FFFFFF', 0.22),
                          },
                          '&:hover': {
                            bgcolor: alpha('#FFFFFF', 0.14),
                          },
                        } : undefined}
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
          )
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
          experimentalNav={useExperimentalDesktopNav}
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

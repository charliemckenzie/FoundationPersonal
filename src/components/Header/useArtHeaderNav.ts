'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { useTheme, useMediaQuery } from '@mui/material'
import type { HeaderProps, NavItem } from './types'

/**
 * Panel / hover-intent / scroll-condense state for {@link ARTHeader}.
 * Extracted to keep the component file under the size limit; behaviour is unchanged.
 */
export function useArtHeaderNav(
  navItems: HeaderProps['navItems'],
  secondaryNavItems: HeaderProps['secondaryNavItems'],
  condensed: HeaderProps['condensed'],
) {
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

  const cancelClose = useCallback(() => {
    if (closeTimerRef.current !== null) { clearTimeout(closeTimerRef.current); closeTimerRef.current = null }
  }, [])

  const cancelOpen = useCallback(() => {
    if (openTimerRef.current !== null) { clearTimeout(openTimerRef.current); openTimerRef.current = null }
  }, [])

  const closePanel = useCallback(() => { cancelOpen(); cancelClose(); triggerRef.current?.focus(); setActivePanel(null) }, [cancelOpen, cancelClose])

  const scheduleClose = useCallback(() => {
    cancelOpen()
    cancelClose()
    closeTimerRef.current = setTimeout(() => setActivePanel(null), 300)
  }, [cancelOpen, cancelClose])

  useEffect(() => { if (isMobile) closePanel() }, [isMobile, closePanel])

  useEffect(() => {
    if (activePanel && headerRef.current) {
      setHeaderBottom(headerRef.current.getBoundingClientRect().bottom)
    }
  }, [activePanel])

  useEffect(() => {
    const handleScroll = () => { setScrolled(prev => prev ? window.scrollY > 100 : window.scrollY > 150); closePanel() }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [closePanel])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => { if (e.key === 'Escape') closePanel() }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [closePanel])

  useEffect(() => () => { cancelOpen(); cancelClose() }, [cancelOpen, cancelClose])

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

  return {
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
  }
}

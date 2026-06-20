'use client'

import { useState, useRef, useEffect } from 'react'
import { useTheme, useMediaQuery } from '@mui/material'
import type { HeaderProps, NavItem } from './types'

/**
 * Panel / responsive state for {@link QSuperHeader}.
 * Extracted to keep the component file under the size limit; behaviour is unchanged.
 */
export function useQSuperHeaderNav(navItems: HeaderProps['navItems']) {
  const [activePanel, setActivePanel] = useState<string | null>(null)
  const [headerBottom, setHeaderBottom] = useState(0)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const headerRef = useRef<HTMLElement | null>(null)
  const triggerRef = useRef<HTMLButtonElement | null>(null)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'))
  const isTablet = useMediaQuery(theme.breakpoints.between('md', 'lg'))
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

  return {
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
  }
}

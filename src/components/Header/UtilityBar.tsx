'use client'

import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Toolbar from '@mui/material/Toolbar'
import ButtonBase from '@mui/material/ButtonBase'
import Typography from '@mui/material/Typography'
import { Logo } from '../Logo'
import { Icon } from '../Icon'
import { IconButton } from '../IconButton'
import { HeaderCtaButton } from './CtaButton'
import { HeaderSearchForm } from './HeaderSearchForm'
import type { CtaAction, UtilityLink } from './types'

export interface UtilityBarProps {
  utilityLinks?: UtilityLink[]
  primaryCta?: CtaAction
  secondaryCta?: CtaAction
  onSearch?: (query: string) => void
  /** Placeholder text shown in the search input — defaults to "Search". */
  searchPlaceholder?: string
  onMenuOpen: () => void
  isMobile: boolean
  isPhone?: boolean
}

function UtilityLinks({ links }: { links: UtilityLink[] }) {
  return (
    <Box sx={{ display: 'flex', gap: 2 }}>
      {links.map((link) => (
        <ButtonBase
          key={link.href}
          component="a"
          href={link.href}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 0.5,
            px: 0.5,
            py: 0.5,
            borderRadius: 1,
            color: 'text.secondary',
            textDecoration: 'none',
            '&, & *': { textDecoration: 'none !important' },
            '&:hover': { color: 'primary.main' },
            '&:focus-visible': {
              outline: '2px solid',
              outlineColor: 'border.focus',
              outlineOffset: '2px',
            },
            '&:focus': { outline: 'none' },
          }}
        >
          <Icon icon={link.icon} size="xl" />
          <Typography variant="small" sx={{ color: 'inherit', lineHeight: 1.2 }}>
            {link.label}
          </Typography>
        </ButtonBase>
      ))}
    </Box>
  )
}

function CtaPair({ primaryCta, secondaryCta, noMenu }: { primaryCta?: CtaAction; secondaryCta?: CtaAction; noMenu?: boolean }) {
  if (!primaryCta && !secondaryCta) return null
  return (
    <Box sx={{ display: 'flex', gap: 1 }}>
      {primaryCta && <HeaderCtaButton cta={primaryCta} variant="outlined" condensed noMenu={noMenu} />}
      {secondaryCta && <HeaderCtaButton cta={secondaryCta} variant="contained" condensed noMenu={noMenu} />}
    </Box>
  )
}

export function UtilityBar({
  utilityLinks,
  primaryCta,
  secondaryCta,
  onSearch,
  searchPlaceholder,
  onMenuOpen,
  isMobile,
  isPhone = false,
}: UtilityBarProps) {
  return (
    <Container maxWidth="lg">
      {isMobile ? (
        /* Mobile/tablet: hamburger LEFT — logo — [search on tablet] — CTAs RIGHT */
        <Toolbar disableGutters sx={{ gap: 1 }}>
          <Box sx={{ ml: '-12px' }}>
            <IconButton icon="bars" label="Open navigation menu" variant="ghost" onClick={onMenuOpen} />
          </Box>
          {isPhone ? <Logo size="md" variant="mark" /> : <Logo size="md" />}
          {!isPhone && onSearch && <HeaderSearchForm onSubmit={onSearch} />}
          {isPhone && <Box sx={{ flex: 1 }} />}
          <CtaPair primaryCta={primaryCta} secondaryCta={secondaryCta} noMenu={isPhone} />
        </Toolbar>
      ) : (
        /* Desktop: logo — search — utility links — CTAs */
        <Toolbar disableGutters sx={{ gap: 3, py: 1.5 }}>
          <Logo size="lg" />
          {onSearch && <HeaderSearchForm onSubmit={onSearch} placeholder={searchPlaceholder} />}
          {utilityLinks && <UtilityLinks links={utilityLinks} />}
          <CtaPair primaryCta={primaryCta} secondaryCta={secondaryCta} />
        </Toolbar>
      )}
    </Container>
  )
}

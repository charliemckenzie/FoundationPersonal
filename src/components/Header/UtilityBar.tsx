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
import { HOMEPAGE_HEADER_CONTAINER_SX } from './headerUtils'
import type { CtaAction, UtilityLink } from './types'

export interface UtilityBarProps {
  utilityLinks?: UtilityLink[]
  primaryCta?: CtaAction
  secondaryCta?: CtaAction
  inverted?: boolean
  wide?: boolean
  onSearch?: (query: string) => void
  /** Placeholder text shown in the search input — defaults to "Search". */
  searchPlaceholder?: string
  onMenuOpen: () => void
  isMobile: boolean
  isPhone?: boolean
}

function UtilityLinks({ links, inverted = false }: { links: UtilityLink[]; inverted?: boolean }) {
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
            color: inverted ? 'text.inverse' : 'text.secondary',
            textDecoration: 'none',
            '&, & *': { textDecoration: 'none !important' },
            '&:hover': { color: inverted ? 'common.white' : 'primary.main' },
            '&:focus-visible': {
              outline: '2px solid',
              outlineColor: inverted ? 'common.white' : 'border.focus',
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

function CtaPair({ primaryCta, secondaryCta, noMenu, inverted = false }: { primaryCta?: CtaAction; secondaryCta?: CtaAction; noMenu?: boolean; inverted?: boolean }) {
  if (!primaryCta && !secondaryCta) return null
  return (
    <Box sx={{ display: 'flex', gap: 1 }}>
      {primaryCta && <HeaderCtaButton cta={primaryCta} variant="outlined" condensed noMenu={noMenu} reversed={inverted} />}
      {secondaryCta && <HeaderCtaButton cta={secondaryCta} variant="contained" condensed noMenu={noMenu} reversed={inverted} />}
    </Box>
  )
}

export function UtilityBar({
  utilityLinks,
  primaryCta,
  secondaryCta,
  inverted = false,
  wide = false,
  onSearch,
  searchPlaceholder,
  onMenuOpen,
  isMobile,
  isPhone = false,
}: UtilityBarProps) {
  return (
    <Container maxWidth={wide ? false : 'lg'} sx={wide ? HOMEPAGE_HEADER_CONTAINER_SX : undefined}>
      {isMobile ? (
        /* Mobile/tablet: hamburger LEFT — logo — [search on tablet] — CTAs RIGHT */
        <Toolbar disableGutters sx={{ gap: 1 }}>
          <Box sx={{ ml: '-12px' }}>
            <IconButton icon="bars" label="Open navigation menu" variant="ghost" reversed={inverted} onClick={onMenuOpen} />
          </Box>
          {isPhone ? <Logo size="md" variant="mark" inverted={inverted} /> : <Logo size="md" inverted={inverted} />}
          {!isPhone && onSearch && <HeaderSearchForm onSubmit={onSearch} inverted={inverted} />}
          {isPhone && <Box sx={{ flex: 1 }} />}
          <CtaPair primaryCta={primaryCta} secondaryCta={secondaryCta} noMenu={isPhone} inverted={inverted} />
        </Toolbar>
      ) : (
        /* Desktop: logo — search — utility links — CTAs */
        <Toolbar disableGutters sx={{ gap: 3, py: 1.5 }}>
          <Logo size="lg" inverted={inverted} />
          {onSearch && <HeaderSearchForm onSubmit={onSearch} placeholder={searchPlaceholder} inverted={inverted} />}
          {utilityLinks && <UtilityLinks links={utilityLinks} inverted={inverted} />}
          <CtaPair primaryCta={primaryCta} secondaryCta={secondaryCta} inverted={inverted} />
        </Toolbar>
      )}
    </Container>
  )
}

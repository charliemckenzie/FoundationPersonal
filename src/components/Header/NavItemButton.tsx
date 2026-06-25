import ButtonBase from '@mui/material/ButtonBase'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { Icon } from '../Icon'
import type { SxProps, Theme } from '@mui/material/styles'
import type { NavItem } from './types'

interface NavItemButtonProps {
  item: NavItem
  active: boolean
  inverted?: boolean
  secondary?: boolean
  showChevron?: boolean
  fontSize?: string
  sx?: SxProps<Theme>
  onClick: (item: NavItem, el: HTMLButtonElement) => void
  onHover?: (item: NavItem, el: HTMLButtonElement) => void
  onHoverEnd?: () => void
}

export function NavItemButton({ item, active, inverted = false, secondary = false, showChevron = false, fontSize, sx, onClick, onHover, onHoverEnd }: NavItemButtonProps) {
  const hasPanel = item.type !== 'link'
  const renderChevron = showChevron && hasPanel
  const baseFontWeight = secondary ? 400 : 500
  const activeFontWeight = secondary ? 500 : 700

  return (
    <ButtonBase
      component="button"
      type="button"
      disableRipple
      aria-expanded={hasPanel ? active : undefined}
      aria-haspopup={hasPanel ? 'menu' : undefined}
      onClick={(e: React.MouseEvent<HTMLButtonElement>) => onClick(item, e.currentTarget)}
      onMouseEnter={onHover ? (e: React.MouseEvent<HTMLButtonElement>) => onHover(item, e.currentTarget) : undefined}
      onMouseLeave={onHoverEnd}
      sx={[
        {
        pt: '15px',
        pb: 0,
        alignSelf: 'stretch',
        display: 'flex',
        alignItems: 'flex-end',
        gap: 0.5,
        borderRadius: 0,
        fontFamily: 'inherit',
        color: active ? (inverted ? 'common.white' : 'primary.main') : 'inherit',
        '&:hover': {
          color: inverted ? 'common.white' : 'primary.main',
          '& .nav-indicator': { fontWeight: activeFontWeight },
        },
        '&:focus-visible': {
          outline: '2px solid',
          outlineColor: inverted ? 'common.white' : 'border.focus',
          outlineOffset: '2px',
        },
        '&:focus': {
          outline: 'none',
        },
        },
        ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
      ]}
    >
      <Typography variant="body" component="span" className="nav-indicator" sx={{ fontSize: fontSize ?? '1.125rem', lineHeight: 1.5, fontWeight: active ? activeFontWeight : baseFontWeight, pb: 'var(--nav-indicator-pb, 15px)', transition: 'font-weight 160ms ease, color 160ms ease' }}>
        {item.label}
        {renderChevron && (
          <Box component="span" sx={{ display: 'inline-flex', alignItems: 'center', ml: 0.5, transform: 'translateY(0.0625rem)' }}>
            <Icon icon="chevron-down" style="regular" size="sm" color="inherit" />
          </Box>
        )}
      </Typography>
    </ButtonBase>
  )
}

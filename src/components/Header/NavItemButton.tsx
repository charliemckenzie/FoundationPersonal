import ButtonBase from '@mui/material/ButtonBase'
import Typography from '@mui/material/Typography'
import type { SxProps, Theme } from '@mui/material/styles'
import type { NavItem } from './types'

interface NavItemButtonProps {
  item: NavItem
  active: boolean
  secondary?: boolean
  fontSize?: string
  sx?: SxProps<Theme>
  onClick: (item: NavItem, el: HTMLButtonElement) => void
  onHover?: (item: NavItem, el: HTMLButtonElement) => void
  onHoverEnd?: () => void
}

export function NavItemButton({ item, active, secondary = false, fontSize, sx, onClick, onHover, onHoverEnd }: NavItemButtonProps) {
  const hasPanel = item.type !== 'link'

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
        color: active ? 'primary.main' : 'inherit',
        '&:hover': {
          color: 'primary.main',
          '& .nav-indicator': { borderColor: 'primary.main' },
        },
        '&:focus-visible': {
          outline: '2px solid',
          outlineColor: 'border.focus',
          outlineOffset: '2px',
        },
        '&:focus': {
          outline: 'none',
        },
        },
        ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
      ]}
    >
      <Typography variant="body" component="span" className="nav-indicator" sx={{ fontSize: fontSize ?? '1.125rem', lineHeight: 1.5, fontWeight: secondary ? 400 : 600, borderBottom: '2px solid', borderColor: active ? 'primary.main' : 'transparent', pb: '15px' }}>
        {item.label}
      </Typography>
    </ButtonBase>
  )
}

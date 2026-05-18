import ButtonBase from '@mui/material/ButtonBase'
import Typography from '@mui/material/Typography'
import type { NavItem } from './types'

interface NavItemButtonProps {
  item: NavItem
  active: boolean
  secondary?: boolean
  onClick: (item: NavItem, el: HTMLButtonElement) => void
}

export function NavItemButton({ item, active, secondary = false, onClick }: NavItemButtonProps) {
  const hasPanel = item.type !== 'link'

  return (
    <ButtonBase
      component="button"
      type="button"
      aria-expanded={hasPanel ? active : undefined}
      aria-haspopup={hasPanel ? 'menu' : undefined}
      onClick={(e: React.MouseEvent<HTMLButtonElement>) => onClick(item, e.currentTarget)}
      sx={{
        px: 1.5,
        pt: 1,
        pb: '12px',
        alignSelf: 'stretch',
        display: 'flex',
        alignItems: 'center',
        gap: 0.5,
        borderRadius: 0,
        fontFamily: 'inherit',
        borderBottom: '2px solid',
        borderColor: active ? 'primary.main' : 'transparent',
        color: active ? 'primary.main' : 'inherit',
        '&:hover': {
          borderColor: 'primary.main',
          color: 'primary.main',
        },
        '&:focus-visible': {
          outline: '2px solid',
          outlineColor: 'border.focus',
          outlineOffset: '2px',
        },
        '&:focus': {
          outline: 'none',
        },
      }}
    >
      <Typography variant="body" component="span" sx={{ fontWeight: secondary ? 400 : 700 }}>
        {item.label}
      </Typography>
    </ButtonBase>
  )
}

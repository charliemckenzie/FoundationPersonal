import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

interface NavPanelLinkProps {
  href: string
  label: string
  description?: string
  /** Renders the label bold — used when the link itself is the primary item (no group heading above). */
  prominent?: boolean
  onClick?: () => void
}

export function NavPanelLink({ href, label, description, prominent, onClick }: NavPanelLinkProps) {
  return (
    <Box
      component="a"
      href={href}
      onClick={onClick}
      sx={{
        display: 'block',
        py: 0.75,
        textDecorationLine: 'none !important',
        color: 'text.primary',
        '&:visited': { color: 'text.primary' },
        '&:hover': {
          color: 'primary.main',
          textDecorationLine: 'none !important',
        },
        '&:focus-visible': {
          outline: '2px solid',
          outlineColor: 'border.focus',
          outlineOffset: '2px',
          borderRadius: (t) => `${t.shape.sm}px`,
        },
        '&:focus': {
          outline: 'none',
        },
      }}
    >
      <Typography variant="body" sx={{ display: 'block', fontWeight: prominent ? 700 : 400 }}>
        {label}
      </Typography>
      {description && (
        <Typography variant="small" sx={{ color: 'text.muted', display: 'block' }}>
          {description}
        </Typography>
      )}
    </Box>
  )
}

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

interface NavPanelLinkProps {
  href: string
  label: string
  description?: string
  onClick?: () => void
}

export function NavPanelLink({ href, label, description, onClick }: NavPanelLinkProps) {
  return (
    <Box
      component="a"
      href={href}
      onClick={onClick}
      sx={{
        display: 'block',
        px: 1.5,
        py: 1,
        textDecoration: 'none !important',
        color: 'inherit',
        borderRadius: (t) => `${t.shape.sm}px`,
        '&:hover': {
          bgcolor: 'action.hover',
          textDecoration: 'none !important',
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
      <Typography variant="body" sx={{ display: 'block' }}>
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

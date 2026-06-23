import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

interface NavPanelLinkProps {
  href: string
  label: string
  description?: string
  /** Renders the label bold — used when the link itself is the primary item (no group heading above). */
  prominent?: boolean
  variant?: 'default' | 'member-v2'
  onClick?: () => void
}

export function NavPanelLink({ href, label, description, prominent, variant = 'default', onClick }: NavPanelLinkProps) {
  const isMemberV2 = variant === 'member-v2'

  return (
    <Box
      component="a"
      href={href}
      onClick={onClick}
      sx={{
        display: 'block',
        py: isMemberV2 ? 0 : 0.75,
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
      <Typography
        variant={isMemberV2 ? 'body' : 'body'}
        sx={{
          display: 'block',
          fontSize: isMemberV2 ? '1rem' : undefined,
          fontWeight: prominent ? 700 : 400,
          lineHeight: isMemberV2 ? 1.4 : undefined,
        }}
      >
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

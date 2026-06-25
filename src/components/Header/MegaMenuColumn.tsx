import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { NavPanelLink } from './NavPanelLink'
import type { NavGroup } from './types'

interface MegaMenuColumnProps {
  group: NavGroup
  variant?: 'default' | 'member-v2'
  onClose: () => void
}

/**
 * One column inside a MegaMenuPanel. Recursively renders nested `groups` and
 * shows the heading as a link (with underlined hover) when `headingHref` is set.
 *
 * Heading rendering rules:
 *   - true section header (bold) when it has children underneath, OR explicitly `bold: true`
 *   - standalone item (just headingHref, no children) renders as a regular-weight link
 *   - "prominent" link styling kicks in when there's no heading at all
 */
export function MegaMenuColumn({ group, variant = 'default', onClose }: MegaMenuColumnProps) {
  const isMemberV2 = variant === 'member-v2'
  const hasChildren = (group.links && group.links.length > 0) || (group.groups && group.groups.length > 0)
  const headingIsBold = hasChildren || group.bold === true

  const headingNode = group.heading ? (
    group.headingHref ? (
      <Box
        component="a"
        href={group.headingHref}
        onClick={onClose}
        sx={{
          display: 'block',
          mb: headingIsBold ? (isMemberV2 ? '2.5rem' : 1) : 0,
          color: 'text.primary',
          textDecorationLine: 'none !important',
          '&:hover': { color: 'primary.main', textDecorationLine: 'none !important' },
          '&:focus-visible': {
            outline: '2px solid',
            outlineColor: 'border.focus',
            outlineOffset: '2px',
            borderRadius: (t) => `${t.shape.sm}px`,
          },
          '&:focus': { outline: 'none' },
        }}
      >
        <Typography variant={isMemberV2 ? 'h6' : 'body'} sx={{ fontWeight: headingIsBold ? 700 : 400, display: 'block' }}>
          {group.heading}
        </Typography>
      </Box>
    ) : (
      <Typography variant={isMemberV2 ? 'h6' : 'body'} component="p" sx={{ fontWeight: 700, color: 'text.primary', mb: isMemberV2 ? '2.5rem' : 1, display: 'block' }}>
        {group.heading}
      </Typography>
    )
  ) : null

  if (group.groups && group.groups.length > 0) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {headingNode}
        {group.groups.map((subGroup, i) => (
          <MegaMenuColumn key={i} group={subGroup} variant={variant} onClose={onClose} />
        ))}
      </Box>
    )
  }

  const prominent = !group.heading
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      {headingNode}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: isMemberV2 ? '2rem' : 0 }}>
        {(group.links ?? []).map((link) => (
          <NavPanelLink key={link.href} {...link} variant={variant} prominent={prominent} onClick={onClose} />
        ))}
      </Box>
    </Box>
  )
}

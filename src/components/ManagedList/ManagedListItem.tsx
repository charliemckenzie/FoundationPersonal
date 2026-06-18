import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type { Theme } from '@mui/material/styles';
import { Chip } from '../Chip';
import { Icon } from '../Icon';
import { IconButton } from '../IconButton';
import { useManagedListContext } from './context';
import { focusRingSx } from './styles';
import type { ManagedListItemProps } from './ManagedList.types';

export function ManagedListItem({
  icon,
  name,
  badge,
  metadata,
  onEdit,
  onDelete,
  metadataVariant: metadataVariantOverride,
  allocation,
  href,
  onClick,
}: ManagedListItemProps) {
  const { itemVariant, metadataVariant: contextMetadataVariant } = useManagedListContext();
  const metadataVariant = metadataVariantOverride ?? contextMetadataVariant;
  const showActions = itemVariant === 'card' && (onEdit !== undefined || onDelete !== undefined);
  const isNavLink = href !== undefined || onClick !== undefined;

  const rowContent = (
    <>
      {isNavLink && icon && (
        <Box
          sx={{
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '3rem',
            height: '3rem',
            borderRadius: '50%',
            bgcolor: 'primary.softMain',
          }}
        >
          <Icon icon={icon} style="regular" size="xl" color="primary" />
        </Box>
      )}
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
          {!isNavLink && icon && <Icon icon={icon} style="regular" size="md" color="text.primary" />}
          <Typography variant="body" sx={isNavLink ? { color: 'primary.main', fontWeight: 700 } : undefined}>
            {name}
          </Typography>
          {badge && <Chip label={badge} variant="outlined" size="small" />}
        </Box>
        {metadataVariant === 'column' ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.25, mt: 0.25 }}>
            {metadata.map((entry) => (
              <Typography key={entry} variant="small" sx={{ color: 'text.muted' }}>
                {entry}
              </Typography>
            ))}
          </Box>
        ) : (
          <Typography variant="small" sx={{ color: 'text.muted' }}>
            {metadata.join(' · ')}
          </Typography>
        )}
      </Box>
      {allocation && (
        <Box sx={{ flexShrink: 0, textAlign: 'right', ml: 1 }}>
          <Typography variant="body" sx={{ color: 'text.muted' }}>
            {allocation.label ?? 'Allocation'}{' '}
            <Box component="span" sx={{ color: 'text.primary', fontWeight: 700 }}>
              {allocation.value}
            </Box>
          </Typography>
        </Box>
      )}
      {showActions && (
        <Box sx={{ display: 'flex', gap: 0.5, flexShrink: 0 }}>
          {onEdit && <IconButton icon="pen" label="Edit" variant="ghost" size="small" onClick={onEdit} />}
          {onDelete && <IconButton icon="trash" label="Delete" variant="ghost" size="small" onClick={onDelete} />}
        </Box>
      )}
      {isNavLink && (
        <Box
          className="managed-list-item-arrow"
          sx={{
            flexShrink: 0,
            display: 'flex',
            transition: (t) =>
              t.transitions.create(['transform'], { duration: t.transitions.duration.short }),
          }}
        >
          <Icon icon="arrow-right" style="regular" size="lg" color="text.primary" />
        </Box>
      )}
    </>
  );

  return (
    <Box
      component="li"
      className={isNavLink ? 'link-no-underline' : undefined}
      sx={(t: Theme) => ({
        display: 'flex',
        listStyle: 'none',
        ...(!isNavLink && { alignItems: 'center', gap: 1.5, px: 2.5, py: 2 }),
        ...(isNavLink && { overflow: 'hidden' }),
        ...(itemVariant === 'card'
          ? {
              backgroundColor: 'background.paper',
              border: '1px solid',
              borderColor: 'border.default',
              borderRadius: `${t.shape.sm}px`,
              ...(isNavLink && {
                transition: t.transitions.create(['border-color'], { duration: t.transitions.duration.short }),
                '&:hover': { borderColor: 'border.input' },
              }),
            }
          : {
              borderBottom: '1px solid',
              borderBottomColor: 'border.subtle',
              '&:last-child': { borderBottom: 'none' },
            }),
      })}
    >
      {isNavLink ? (
        <Box
          component={onClick ? 'button' : 'a'}
          type={onClick ? 'button' : undefined}
          href={onClick ? undefined : href}
          onClick={onClick}
          sx={(t) => ({
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            px: 2.5,
            py: 1.5,
            flex: 1,
            textDecoration: 'none',
            color: 'inherit',
            transition: t.transitions.create(['background-color'], { duration: t.transitions.duration.short }),
            '&:hover': {
              backgroundColor: 'action.hover',
              '& .managed-list-item-arrow': { transform: 'translateX(4px)' },
            },
            '&:focus-visible': focusRingSx,
          })}
        >
          {rowContent}
        </Box>
      ) : (
        rowContent
      )}
    </Box>
  );
}

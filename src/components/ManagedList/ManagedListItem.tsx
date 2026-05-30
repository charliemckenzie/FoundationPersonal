import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type { Theme } from '@mui/material/styles';
import { Chip } from '../Chip';
import { Icon } from '../Icon';
import { IconButton } from '../IconButton';
import { useManagedListContext } from './context';
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
}: ManagedListItemProps) {
  const { itemVariant, metadataVariant: contextMetadataVariant } = useManagedListContext();
  const metadataVariant = metadataVariantOverride ?? contextMetadataVariant;
  const showActions = itemVariant === 'card' && (onEdit !== undefined || onDelete !== undefined);

  return (
    <Box
      component="li"
      sx={(t: Theme) => ({
        display: 'flex',
        alignItems: 'center',
        gap: 1.5,
        px: 2.5,
        py: 2,
        listStyle: 'none',
        ...(itemVariant === 'card'
          ? {
              backgroundColor: 'background.paper',
              border: '1px solid',
              borderColor: 'border.default',
              borderRadius: `${t.shape.sm}px`,
            }
          : {
              borderBottom: '1px solid',
              borderBottomColor: 'border.subtle',
              '&:last-child': { borderBottom: 'none' },
            }),
      })}
    >
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
          {icon && <Icon icon={icon} style="regular" size="md" color="text.primary" />}
          <Typography variant="body">{name}</Typography>
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
    </Box>
  );
}

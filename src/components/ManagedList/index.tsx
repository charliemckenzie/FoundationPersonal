import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useMemo } from 'react';
import type { Theme } from '@mui/material/styles';
import { Icon } from '../Icon';
import { ManagedListItem } from './ManagedListItem';
import { ManagedListSkeleton } from './ManagedListSkeleton';
import { ManagedListContext, type ManagedListContextValue } from './context';
import { PanelFooter } from './PanelFooter';
import { focusRingSx } from './styles';
import type { ManagedListProps } from './ManagedList.types';

function EmptyState({ icon, message, onClick }: { icon: string; message: string; onClick: () => void }) {
  return (
    <Box
      component="button"
      type="button"
      onClick={onClick}
      sx={(t: Theme) => ({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        minHeight: t.spacing(12.5),
        gap: 1,
        py: 3,
        px: 2,
        border: '1px dashed',
        borderColor: 'border.default',
        borderRadius: `${t.shape.sm}px`,
        backgroundColor: 'transparent',
        cursor: 'pointer',
        fontFamily: 'inherit',
        transition: 'border-color 200ms ease, background-color 200ms ease',
        '&:hover': { borderColor: 'border.input', backgroundColor: 'action.hover' },
        '&:focus-visible': focusRingSx,
      })}
    >
      <Icon icon={icon} size="2xl" color="text.disabled" />
      <Typography variant="small" sx={{ color: 'text.muted' }}>
        {message}
      </Typography>
    </Box>
  );
}

function HeaderChevronLink({ href, title }: { href: string; title: string }) {
  return (
    <Box
      component="a"
      href={href}
      aria-label={`Manage ${title}`}
      sx={(t: Theme) => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: t.spacing(5),
        height: t.spacing(5),
        borderRadius: '50%',
        color: 'text.secondary',
        textDecoration: 'none',
        flexShrink: 0,
        '&:hover': { backgroundColor: 'action.hover' },
        '&:focus-visible': focusRingSx,
      })}
    >
      <Icon icon="chevron-right" size="lg" />
    </Box>
  );
}

export function ManagedList({
  icon,
  title,
  description,
  href,
  items,
  emptyIcon,
  emptyMessage = 'No items added',
  addLabel,
  addIcon = 'plus',
  onAdd,
  onRemoveAll,
  removeAllLabel = 'Remove all',
  itemVariant = 'card',
  metadataVariant = 'row',
  loading = false,
  loadingItemCount = 3,
}: ManagedListProps) {
  const contextValue = useMemo<ManagedListContextValue>(
    () => ({ itemVariant, metadataVariant }),
    [itemVariant, metadataVariant],
  );

  if (loading) {
    return (
      <ManagedListSkeleton
        itemCount={loadingItemCount}
        itemVariant={itemVariant}
        splitFooter={onRemoveAll !== undefined}
        hasHeaderLink={href !== undefined}
      />
    );
  }

  return (
    <ManagedListContext.Provider value={contextValue}>
      <Box
        component="section"
        sx={(t: Theme) => ({
          borderRadius: `${t.shape.lg}px`,
          backgroundColor: 'background.paper',
          border: '1px solid',
          borderColor: 'border.default',
        })}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, px: 3, py: 2.5 }}>
          <Box
            sx={(t: Theme) => ({
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: t.spacing(5),
              height: t.spacing(5),
              borderRadius: '50%',
              backgroundColor: 'background.default',
              flexShrink: 0,
            })}
          >
            <Icon icon={icon} size="xl" color="primary" />
          </Box>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography variant="h6">{title}</Typography>
            <Typography variant="small" sx={{ color: 'text.muted' }}>
              {description}
            </Typography>
          </Box>
          {href && <HeaderChevronLink href={href} title={title} />}
        </Box>

        <Box
          sx={{
            borderTop: '1px solid',
            borderTopColor: 'border.subtle',
            backgroundColor: 'background.default',
            p: 1.5,
          }}
        >
          {items.length === 0 ? (
            <EmptyState icon={emptyIcon ?? icon} message={emptyMessage} onClick={onAdd} />
          ) : itemVariant === 'list' ? (
            <Box
              component="ul"
              sx={(t: Theme) => ({
                m: 0,
                p: 0,
                listStyle: 'none',
                border: '1px solid',
                borderColor: 'border.default',
                borderRadius: `${t.shape.sm}px`,
                overflow: 'hidden',
                backgroundColor: 'background.paper',
              })}
            >
              {items.map((item) => <ManagedListItem key={item.id} {...item} />)}
            </Box>
          ) : (
            <Box
              component="ul"
              sx={{ m: 0, p: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 1 }}
            >
              {items.map((item) => <ManagedListItem key={item.id} {...item} />)}
            </Box>
          )}
        </Box>

        <PanelFooter
          primary={{ icon: addIcon, label: addLabel, onClick: onAdd }}
          secondary={onRemoveAll ? { icon: 'trash', label: removeAllLabel, onClick: onRemoveAll } : undefined}
        />
      </Box>
    </ManagedListContext.Provider>
  );
}

ManagedList.Item = ManagedListItem;

export { ManagedListSkeleton } from './ManagedListSkeleton';
export type { ManagedListSkeletonProps } from './ManagedListSkeleton';

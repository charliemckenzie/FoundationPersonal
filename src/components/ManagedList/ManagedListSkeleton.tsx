import Box from '@mui/material/Box';
import type { Theme } from '@mui/material/styles';
import { Skeleton } from '../Skeleton';

export interface ManagedListSkeletonProps {
  /** Number of placeholder item rows to render. Defaults to 3. */
  itemCount?: number;
  /** Matches the `itemVariant` of the list being loaded. Defaults to `card`. */
  itemVariant?: 'card' | 'list';
  /** Renders a split footer (two action buttons) when true. */
  splitFooter?: boolean;
  /** Reserves space for the header chevron link when true. */
  hasHeaderLink?: boolean;
}

function ItemRowSkeleton() {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, px: 2.5, py: 2 }}>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Skeleton variant="text" width="45%" height="1.5rem" />
        <Skeleton variant="text" width="70%" height="1.25rem" />
        <Skeleton variant="text" width="55%" height="1.25rem" />
      </Box>
      <Skeleton variant="rounded" width="4.5rem" height="1.5rem" />
    </Box>
  );
}

/** Loading placeholder for `ManagedList`. Mirrors the panel's header, body, and footer layout. */
export function ManagedListSkeleton({
  itemCount = 3,
  itemVariant = 'card',
  splitFooter = false,
  hasHeaderLink = false,
}: ManagedListSkeletonProps) {
  const rows = Array.from({ length: itemCount }, (_, i) => i);

  return (
    <Box
      component="section"
      aria-busy="true"
      aria-live="polite"
      aria-label="Loading"
      sx={(t: Theme) => ({
        borderRadius: `${t.shape.lg}px`,
        backgroundColor: 'background.paper',
        border: '1px solid',
        borderColor: 'border.default',
      })}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, px: 3, py: 2.5 }}>
        <Skeleton variant="circular" width="2.5rem" height="2.5rem" />
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Skeleton variant="text" width="50%" height="1.5rem" />
          <Skeleton variant="text" width="75%" height="1.25rem" />
        </Box>
        {hasHeaderLink && <Skeleton variant="circular" width="2.5rem" height="2.5rem" />}
      </Box>

      <Box
        sx={{
          borderTop: '1px solid',
          borderTopColor: 'border.subtle',
          backgroundColor: 'background.default',
          p: 1.5,
        }}
      >
        {itemVariant === 'list' ? (
          <Box
            sx={(t: Theme) => ({
              border: '1px solid',
              borderColor: 'border.default',
              borderRadius: `${t.shape.sm}px`,
              overflow: 'hidden',
              backgroundColor: 'background.paper',
            })}
          >
            {rows.map((i) => (
              <Box
                key={i}
                sx={{
                  borderBottom: '1px solid',
                  borderBottomColor: 'border.subtle',
                  '&:last-child': { borderBottom: 'none' },
                }}
              >
                <ItemRowSkeleton />
              </Box>
            ))}
          </Box>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {rows.map((i) => (
              <Box
                key={i}
                sx={(t: Theme) => ({
                  border: '1px solid',
                  borderColor: 'border.default',
                  borderRadius: `${t.shape.sm}px`,
                  backgroundColor: 'background.paper',
                })}
              >
                <ItemRowSkeleton />
              </Box>
            ))}
          </Box>
        )}
      </Box>

      <Box
        sx={(t: Theme) => ({
          borderTop: '1px solid',
          borderTopColor: 'border.subtle',
          display: 'grid',
          gridTemplateColumns: splitFooter ? '1fr 1fr' : '1fr',
          height: t.spacing(7),
        })}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
          <Skeleton variant="circular" width="1.25rem" height="1.25rem" />
          <Skeleton variant="text" width="7.5rem" height="1.25rem" />
        </Box>
        {splitFooter && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 1,
              borderLeft: '1px solid',
              borderLeftColor: 'border.subtle',
            }}
          >
            <Skeleton variant="circular" width="1.25rem" height="1.25rem" />
            <Skeleton variant="text" width="5rem" height="1.25rem" />
          </Box>
        )}
      </Box>
    </Box>
  );
}

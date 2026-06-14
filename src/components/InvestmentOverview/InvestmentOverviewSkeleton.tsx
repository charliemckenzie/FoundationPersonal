import Box from '@mui/material/Box';
import type { Theme } from '@mui/material/styles';
import { Skeleton } from '../Skeleton';

function LegendRowSkeleton({ last }: { last?: boolean }) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1.5,
        py: 1,
        ...(!last && { borderBottom: '1px solid', borderBottomColor: 'border.subtle' }),
      }}
    >
      <Box sx={{ flexShrink: 0, display: 'flex' }}>
        <Skeleton variant="circular" width="0.75rem" height="0.75rem" />
      </Box>
      <Box sx={{ flex: 1 }}>
        <Skeleton variant="text" width="55%" height="1.25rem" />
      </Box>
      <Skeleton variant="text" width="2.5rem" height="1.25rem" />
    </Box>
  );
}

/** One dial card placeholder: title row with edit button, allocation bar, legend. */
function DialItemSkeleton() {
  return (
    <Box
      sx={(t: Theme) => ({
        backgroundColor: 'background.paper',
        border: '1px solid',
        borderColor: 'border.default',
        borderRadius: `${t.shape.sm}px`,
        p: 2.5,
      })}
    >
      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5, mb: 2 }}>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Skeleton variant="text" width="40%" height="1.5rem" />
          <Skeleton variant="text" width="60%" height="1.25rem" />
        </Box>
        <Box sx={{ flexShrink: 0, display: 'flex' }}>
          <Skeleton variant="circular" width="2.25rem" height="2.25rem" />
        </Box>
      </Box>
      <Box sx={{ mb: 2 }}>
        <Skeleton variant="rounded" width="100%" height="0.75rem" />
      </Box>
      <LegendRowSkeleton />
      <LegendRowSkeleton last />
    </Box>
  );
}

/** Loading placeholder for `InvestmentOverview`. Mirrors header, two dial cards, and footer. */
export function InvestmentOverviewSkeleton() {
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
        <Box sx={{ flexShrink: 0, display: 'flex' }}>
          <Skeleton variant="circular" width="2.5rem" height="2.5rem" />
        </Box>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Skeleton variant="text" width="50%" height="1.5rem" />
          <Skeleton variant="text" width="70%" height="1.25rem" />
        </Box>
      </Box>

      <Box
        sx={{
          borderTop: '1px solid',
          borderTopColor: 'border.subtle',
          backgroundColor: 'background.default',
          p: 1.5,
          display: 'flex',
          flexDirection: 'column',
          gap: 1.5,
        }}
      >
        <DialItemSkeleton />
        <DialItemSkeleton />
      </Box>

      <Box
        sx={(t: Theme) => ({
          borderTop: '1px solid',
          borderTopColor: 'border.subtle',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          height: t.spacing(7),
        })}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Skeleton variant="text" width="5.5rem" height="1.25rem" />
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderLeft: '1px solid',
            borderLeftColor: 'border.subtle',
          }}
        >
          <Skeleton variant="text" width="4.5rem" height="1.25rem" />
        </Box>
      </Box>
    </Box>
  );
}

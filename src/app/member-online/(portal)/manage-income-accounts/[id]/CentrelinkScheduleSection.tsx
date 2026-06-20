import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { Theme } from '@mui/material/styles';
import { SectionHeading } from './parts';
import type { AccountDetail } from './types';

export function CentrelinkScheduleSection({ schedule }: { schedule: AccountDetail['centrelinkSchedule'] }) {
  return (
    <Stack spacing={2.5}>
      <SectionHeading>Centrelink schedule</SectionHeading>
      {schedule.length === 0 ? (
        <Box
          sx={(t: Theme) => ({
            border: '1px solid',
            borderColor: 'border.default',
            borderRadius: `${t.shape.sm}px`,
            p: 3,
            textAlign: 'center',
          })}
        >
          <Typography variant="body" sx={{ color: 'text.muted' }}>
            No Centrelink schedule is available for this account.
          </Typography>
        </Box>
      ) : (
        <Box
          sx={(t: Theme) => ({
            border: '1px solid',
            borderColor: 'border.default',
            borderRadius: `${t.shape.sm}px`,
            overflow: 'hidden',
          })}
        >
          {/* Table header */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr 1fr', sm: '1fr 1fr 1fr 1fr' },
              gap: 1,
              px: 3,
              py: 1.5,
              bgcolor: 'background.default',
              borderBottom: '1px solid',
              borderBottomColor: 'border.default',
            }}
          >
            {['Date', 'Gross amount', 'Tax-free component', 'Taxable component'].map((h) => (
              <Typography key={h} variant="small" sx={{ fontWeight: 700, color: 'text.muted' }}>
                {h}
              </Typography>
            ))}
          </Box>
          {/* Rows */}
          {schedule.map((row, i) => (
            <Box
              key={i}
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr 1fr', sm: '1fr 1fr 1fr 1fr' },
                gap: 1,
                px: 3,
                py: 2,
                borderBottom: i < schedule.length - 1 ? '1px solid' : 'none',
                borderBottomColor: 'border.subtle',
                bgcolor: 'background.paper',
              }}
            >
              <Typography variant="body">{row.date}</Typography>
              <Typography variant="body">{row.grossAmount}</Typography>
              <Typography variant="body" sx={{ display: { xs: 'none', sm: 'block' } }}>{row.taxFreeComponent}</Typography>
              <Typography variant="body" sx={{ display: { xs: 'none', sm: 'block' } }}>{row.taxableComponent}</Typography>
            </Box>
          ))}
        </Box>
      )}
    </Stack>
  );
}

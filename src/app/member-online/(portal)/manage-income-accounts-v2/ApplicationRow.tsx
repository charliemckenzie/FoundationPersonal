import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type { Theme } from '@mui/material/styles';
import { Chip } from '../../../../components/Chip';
import { Icon } from '../../../../components/Icon';
import type { Application } from './types';

export function ApplicationRow({ app, onClick }: { app: Application; onClick: () => void }) {
  const isSubmitted = app.status === 'Submitted';
  return (
    <Box
      component="button"
      type="button"
      onClick={onClick}
      sx={(t: Theme) => ({
        display: 'flex',
        alignItems: 'flex-start',
        gap: 1.5,
        px: 2,
        py: 1.75,
        width: '100%',
        border: '1px solid',
        borderColor: 'border.default',
        borderRadius: `${t.shape.sm}px`,
        bgcolor: 'background.paper',
        cursor: 'pointer',
        textAlign: 'left',
        transition: 'background-color 150ms ease',
        '&:hover': { bgcolor: t.palette.action.hover },
        '&:focus-visible': { outline: '2px solid', outlineColor: 'border.focus', outlineOffset: -2, zIndex: 1, position: 'relative' },
      })}
    >
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography variant="body" sx={{ fontWeight: 700, color: 'text.heading', display: 'block', mb: 0.5 }}>
          {app.accountType}
        </Typography>
        <Chip label={app.status} severity={app.severity} size="small" />
        <Typography variant="small" sx={{ color: 'text.muted', display: 'block', mt: 0.75 }}>
          {isSubmitted ? `Submitted ${app.startedAt}` : `Started ${app.startedAt}`}
        </Typography>
      </Box>
      <Box sx={{ color: 'text.muted', flexShrink: 0, mt: 0.25 }}>
        <Icon icon="arrow-right" style="regular" size="sm" />
      </Box>
    </Box>
  );
}

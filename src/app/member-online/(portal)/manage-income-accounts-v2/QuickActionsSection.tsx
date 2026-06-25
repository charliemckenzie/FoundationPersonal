import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type { Theme } from '@mui/material/styles';
import { useRouter } from 'next/navigation';
import { Icon } from '../../../../components/Icon';

interface QuickAction {
  label: string;
  icon: string;
  href: string;
}

const QUICK_ACTIONS: QuickAction[] = [
  { label: 'Update payment details', icon: 'credit-card', href: '#' },
  { label: 'Change payment frequency', icon: 'calendar-days', href: '#' },
  { label: 'View statements', icon: 'file-lines', href: '#' },
  { label: 'Manage investments', icon: 'chart-line-up', href: '#' },
];

export function QuickActionsSection() {
  const router = useRouter();

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Quick actions
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(4, 1fr)' },
          gap: 1.5,
        }}
      >
        {QUICK_ACTIONS.map((action) => (
          <Box
            key={action.label}
            component="button"
            type="button"
            onClick={() => router.push(action.href)}
            sx={(t: Theme) => ({
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 1.25,
              px: 1.5,
              py: 2.5,
              border: '1px solid',
              borderColor: 'border.default',
              borderRadius: `${t.shape.lg}px`,
              bgcolor: 'background.paper',
              cursor: 'pointer',
              fontFamily: 'inherit',
              textAlign: 'center',
              transition: 'background-color 150ms ease, border-color 150ms ease',
              '&:hover': {
                bgcolor: t.palette.action.hover,
                borderColor: 'border.strong',
              },
              '&:focus-visible': {
                outline: '2px solid',
                outlineColor: 'border.focus',
                outlineOffset: 2,
              },
            })}
          >
            <Box
              sx={(t: Theme) => ({
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '2.75rem',
                height: '2.75rem',
                borderRadius: '50%',
                bgcolor: 'primary.softMain',
                flexShrink: 0,
              })}
            >
              <Icon icon={action.icon} style="light" size="lg" color="primary" />
            </Box>
            <Typography
              variant="small"
              sx={{ fontWeight: 600, color: 'text.primary', lineHeight: 1.4 }}
            >
              {action.label}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

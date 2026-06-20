import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type { Theme } from '@mui/material/styles';
import { useRouter } from 'next/navigation';
import { TextButton } from '../../../../components/TextButton';

interface DetailRowProps {
  label: string;
  value: React.ReactNode;
  note?: string;
}

export function DetailRow({ label, value, note }: DetailRowProps) {
  return (
    <Box sx={{ display: 'flex', py: 1.5, borderBottom: '1px solid', borderBottomColor: 'border.subtle' }}>
      <Typography variant="body" sx={{ color: 'text.muted', width: '40%', flexShrink: 0 }}>
        {label}
      </Typography>
      <Box sx={{ flex: 1 }}>
        <Typography variant="body" sx={{ fontWeight: 600, color: 'text.primary' }}>
          {value}
        </Typography>
        {note && (
          <Typography variant="small" sx={{ color: 'text.muted', display: 'block', mt: 0.5 }}>
            {note}
          </Typography>
        )}
      </Box>
    </Box>
  );
}

interface SectionProps {
  title: string;
  children: React.ReactNode;
  action?: { label: string; href: string; icon?: string };
}

export function Section({ title, children, action }: SectionProps) {
  const router = useRouter();
  return (
    <Box
      sx={(t: Theme) => ({
        border: '1px solid',
        borderColor: 'border.default',
        borderRadius: `${t.shape.lg}px`,
        bgcolor: 'background.paper',
        overflow: 'hidden',
      })}
    >
      <Box sx={{ p: 4 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>{title}</Typography>
        {children}
      </Box>
      {action && (
        <Box
          sx={{
            px: 4, py: 1.5,
            borderTop: '1px solid', borderTopColor: 'border.subtle',
            bgcolor: 'background.paper',
          }}
        >
          <TextButton
            label={action.label}
            onClick={() => router.push(action.href)}
            {...(action.icon ? { startIcon: action.icon } : {})}
          />
        </Box>
      )}
    </Box>
  );
}

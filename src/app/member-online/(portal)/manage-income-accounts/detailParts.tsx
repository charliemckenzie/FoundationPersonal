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
    <Box sx={{ display: 'flex', py: 1.5, borderBottom: '1px solid', borderBottomColor: 'border.subtle', '&:last-child': { borderBottom: 'none' } }}>
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
  hideAction?: boolean;
}

export function Section({ title, children, action, hideAction }: SectionProps) {
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
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h6">{title}</Typography>
          {action && !hideAction && (
            <TextButton
              size="small"
              hideIcon
              label={action.label}
              onClick={() => router.push(action.href)}
            />
          )}
        </Box>
        {children}
      </Box>
    </Box>
  );
}

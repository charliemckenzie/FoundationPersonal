import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { Theme } from '@mui/material/styles';
import { TextButton } from '../../../../../components/TextButton';

export function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <Typography variant="h5" sx={{ mb: 2.5 }}>
      {children}
    </Typography>
  );
}

export function DetailRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
        columnGap: 2,
        rowGap: { xs: 0.5, sm: 0 },
        alignItems: 'center',
        py: 1.5,
        borderTop: '1px solid',
        borderTopColor: 'border.subtle',
      }}
    >
      <Typography variant="body" component="dt" sx={{ color: 'text.muted' }}>
        {label}
      </Typography>
      <Typography variant="body" component="dd" sx={{ m: 0, color: 'text.primary', fontWeight: 500 }}>
        {children}
      </Typography>
    </Box>
  );
}

export function InlineCard({
  title,
  footnote,
  action,
  children,
}: {
  title: string;
  footnote?: string;
  action?: { label: string; onClick: () => void };
  children: React.ReactNode;
}) {
  return (
    <Stack spacing={1}>
      <Box
        sx={(t: Theme) => ({
          backgroundColor: 'background.paper',
          border: '1px solid',
          borderColor: 'border.default',
          borderRadius: `${t.shape.sm}px`,
          p: 2.5,
        })}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 0.5 }}>
          <Typography variant="h6" sx={{ color: 'text.heading' }}>{title}</Typography>
          {action && (
            <TextButton label={action.label} onClick={action.onClick} size="small" />
          )}
        </Box>
        <Box component="dl" sx={{ m: 0 }}>
          {children}
        </Box>
      </Box>
      {footnote && (
        <Typography variant="small" sx={{ color: 'text.muted', px: 0.5 }}>
          {footnote}
        </Typography>
      )}
    </Stack>
  );
}

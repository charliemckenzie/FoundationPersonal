import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { IconList } from '../../components/IconList';

interface ThingsToConsiderProps {
  items: string[];
}

export function ThingsToConsider({ items }: ThingsToConsiderProps) {
  return (
    <Box
      sx={{
        border: '1px solid',
        borderColor: 'border.default',
        borderRadius: '0.75rem',
        p: 2.5,
        mt: 3,
      }}
    >
      <Typography variant="small" sx={{ display: 'block', fontWeight: 700, mb: 1.5 }}>
        Things to consider
      </Typography>
      <IconList
        size="sm"
        items={items.map((text) => ({ text }))}
        defaultIcon="circle-check"
        iconColor="primary"
      />
    </Box>
  );
}

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export function AwardPlaceholder() {
  return (
    <Box
      sx={{
        width: '5rem',
        height: '5rem',
        borderRadius: '50%',
        backgroundColor: 'background.elevated',
        border: '1px solid',
        borderColor: 'border.subtle',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      <Typography
        component="span"
        sx={{ color: 'text.muted', fontSize: '0.625rem', lineHeight: 1.3, textAlign: 'center' }}
      >
        Award
      </Typography>
    </Box>
  );
}

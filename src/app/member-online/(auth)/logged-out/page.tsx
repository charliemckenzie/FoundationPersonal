import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function MemberLoggedOutPage() {
  return (
    <Box sx={{ p: 4, textAlign: 'center' }}>
      <Typography variant="h2" sx={{ mb: 1 }}>You&apos;ve been logged out</Typography>
      <Typography variant="body" color="text.muted">
        Member Online — logged out page placeholder.
      </Typography>
    </Box>
  );
}

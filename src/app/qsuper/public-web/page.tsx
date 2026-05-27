import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

export default function QSuperPublicWebPage() {
  return (
    <Box sx={{ bgcolor: 'background.default', py: { xs: 6, md: 10 } }}>
      <Container maxWidth="lg">
        <Typography variant="display-5" component="h1" sx={{ mb: 1 }}>
          QSuper Public Web
        </Typography>
        <Typography variant="lead" component="p" sx={{ color: 'text.secondary' }}>
          Public-facing website placeholder — add pages here.
        </Typography>
      </Container>
    </Box>
  );
}

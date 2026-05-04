import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function Home() {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="display-4" component="h1" gutterBottom>
        Foundation
      </Typography>
      <Typography variant="lead" color="text.muted">
        Design system component library. Open Storybook to browse components.
      </Typography>
    </Box>
  );
}

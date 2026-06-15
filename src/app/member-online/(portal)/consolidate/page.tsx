import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ContentContainer } from '../../../../components/MemberOnline';

export default function ConsolidateSuperPage() {
  return (
    <ContentContainer size="md">
      <Stack spacing={1.5} sx={{ pb: 4 }}>
        <Typography variant="h1" component="h1">
          Consolidate your super
        </Typography>
        <Typography variant="lead">
          Find and combine your super accounts into one place to reduce fees, simplify your
          finances, and keep better track of your retirement savings.
        </Typography>
      </Stack>
    </ContentContainer>
  );
}

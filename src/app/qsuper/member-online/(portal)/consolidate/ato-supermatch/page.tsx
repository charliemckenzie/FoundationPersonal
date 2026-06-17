import { AtoSuperMatchFlow } from '@/features/consolidate/AtoSuperMatchFlow';

export default function QSuperAtoSuperMatchPage() {
  return <AtoSuperMatchFlow basePath="/qsuper/member-online/consolidate" />;
}

import { ContentContainer, MOBreadcrumb } from '@/components/MemberOnline';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Alert } from '@/components/Alert';

export default function QSuperAtoSuperMatchPage() {
  return (
    <>
      <ContentContainer size="md">
        <MOBreadcrumb
          items={[
            { label: 'Consolidate super', href: '/qsuper/member-online/consolidate' },
            { label: 'ATO SuperMatch' },
          ]}
        />
        <Stack spacing={3} sx={{ py: 4 }}>
          <Typography variant="h2" component="h1">
            Find my super (ATO SuperMatch)
          </Typography>
          <Alert severity="info">
            This flow is under construction. Please use the manual transfer option for now.
          </Alert>
        </Stack>
      </ContentContainer>
    </>
  );
}

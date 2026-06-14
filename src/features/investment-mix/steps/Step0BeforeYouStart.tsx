'use client';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { IconList } from '../../../components/IconList';

export function Step0BeforeYouStart() {
  return (
    <Stack spacing={3}>
      <div>
        <Typography variant="h5" sx={{ mb: 0.5 }}>
          Before you start
        </Typography>
        <Typography variant="body">
          Use this form to update how your super is invested across our available investment
          options. Here&rsquo;s what to expect.
        </Typography>
      </div>

      <IconList
        items={[
          { text: 'Takes around 5 minutes to complete' },
          {
            text: 'You\u2019ll choose which investment options to allocate your money to, and in what proportions',
          },
          { text: 'Changes apply from the next business day' },
          { text: 'You can return and make further changes at any time' },
        ]}
      />
    </Stack>
  );
}

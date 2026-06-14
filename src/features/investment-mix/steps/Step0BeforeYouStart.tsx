'use client';

import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { IconList } from '../../../components/IconList';
import { Checkbox } from '../../../components/Checkbox';

interface Step0BeforeYouStartProps {
  reviewed: boolean;
  onReviewedChange: (checked: boolean) => void;
  reviewedError?: boolean;
}

export function Step0BeforeYouStart({ reviewed, onReviewedChange, reviewedError }: Step0BeforeYouStartProps) {
  return (
    <Stack spacing={3}>
      <div>
        <Typography variant="h5" sx={{ mb: 0.5 }}>
          Before you start
        </Typography>
        <Typography variant="body">
          Use this form to change how your super is invested. Here&rsquo;s what to expect.
        </Typography>
      </div>

      <IconList
        items={[
          { text: 'Takes around 5 minutes to complete' },
          { text: 'Choose which investment options to use, and what percentage goes to each' },
          { text: 'Changes apply from the next business day' },
          { text: 'You can return and update your mix at any time' },
        ]}
      />

      <Divider sx={{ borderColor: 'border.subtle' }} />

      <Stack spacing={1.5}>
        <Typography variant="h6">Important information</Typography>
        <Box
          component="ul"
          sx={{ m: 0, pl: 2.5, display: 'flex', flexDirection: 'column', gap: 1 }}
        >
          {[
            'When you change options, we sell units in your current options and buy units in your new selections on the same business day, at that day\'s unit prices.',
            'Your balance in Member Online may not reflect your actual balance while the switch is being processed.',
            'Each option has its own risk level, asset mix, and fees, which can change over time.',
          ].map((text) => (
            <Typography key={text} component="li" variant="small">
              {text}
            </Typography>
          ))}
          <Typography component="li" variant="small">
            Read the relevant{' '}
            <Box component="a" href="#" sx={{ color: 'primary.main' }}>
              Product Disclosure Statement (PDS)
            </Box>{' '}
            for your account type before confirming.
          </Typography>
        </Box>
      </Stack>

      <Checkbox
        label="I've read and understood the above information."
        checked={reviewed}
        onChange={onReviewedChange}
        error={reviewedError}
        errorMessage="Please confirm you have read and understood the information to continue."
      />
    </Stack>
  );
}

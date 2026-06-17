import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Alert } from '@/components/Alert';
import { IconList } from '@/components/IconList';
import { Checkbox } from '@/components/Checkbox';

export interface ManualStep0BeforeYouStartProps {
  acknowledged: boolean;
  onChange: (checked: boolean) => void;
  error?: string;
}

export function ManualStep0BeforeYouStart({
  acknowledged,
  onChange,
  error,
}: ManualStep0BeforeYouStartProps) {
  return (
    <Stack spacing={3}>
      <div>
        <Typography variant="h3" component="h2" sx={{ mb: 2 }}>
          Before you start
        </Typography>
        <Typography variant="body" sx={{ color: 'text.muted', lineHeight: 1.75 }}>
          Make sure you have the details of the fund you want to transfer from. You'll need your
          member number and the fund's ABN.
        </Typography>
      </div>

      <Alert severity="info" title="Things to consider">
        <IconList
          items={[
            {
              text: 'Closing your other super fund may end any insurance cover or benefits you have with them.',
            },
            {
              text: 'If you have future contributions going to your other fund, you\'ll need to redirect them separately.',
            },
            {
              text: 'Check if your other fund charges exit fees before proceeding.',
            },
          ]}
        />
      </Alert>

      <Checkbox
        label="I've read the information above and want to continue"
        checked={acknowledged}
        onChange={onChange}
        variant="boxed"
        error={!!error}
        errorMessage={error}
      />
    </Stack>
  );
}

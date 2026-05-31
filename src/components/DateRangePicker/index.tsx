import Box from '@mui/material/Box';
import { DatePicker } from '../DatePicker';

export interface DateRangePickerProps {
  value?: [Date | null, Date | null];
  onChange?: (value: [Date | null, Date | null]) => void;
  startLabel?: string;
  endLabel?: string;
  minDate?: Date;
  maxDate?: Date;
  disabled?: boolean;
  error?: boolean;
  helperText?: string;
}

export function DateRangePicker({
  value = [null, null],
  onChange,
  startLabel = 'Start date',
  endLabel = 'End date',
  minDate,
  maxDate,
  disabled,
  error,
  helperText,
}: DateRangePickerProps) {
  const [startDate, endDate] = value;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <Box sx={{ flex: '1 1 10rem' }}>
          <DatePicker
            value={startDate}
            onChange={(date) => onChange?.([date, endDate])}
            label={startLabel}
            minDate={minDate}
            maxDate={endDate ?? maxDate}
            disabled={disabled}
            error={error}
          />
        </Box>
        <Box sx={{ flex: '1 1 10rem' }}>
          <DatePicker
            value={endDate}
            onChange={(date) => onChange?.([startDate, date])}
            label={endLabel}
            minDate={startDate ?? minDate}
            maxDate={maxDate}
            disabled={disabled}
            error={error}
          />
        </Box>
      </Box>
      {helperText && (
        <Box
          component="p"
          sx={(t) => ({
            margin: 0,
            paddingX: '0.875rem',
            fontSize: t.typography.caption.fontSize,
            color: error ? 'error.main' : 'text.muted',
            fontFamily: t.typography.fontFamily,
          })}
        >
          {helperText}
        </Box>
      )}
    </Box>
  );
}

'use client';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { Icon } from '../Icon';

export interface CalendarProps {
  value?: Date | null;
  onChange?: (date: Date | null) => void;
  minDate?: Date;
  maxDate?: Date;
  disabled?: boolean;
}

function ChevronLeftIcon() { return <Icon icon="chevron-left" size="md" />; }
function ChevronRightIcon() { return <Icon icon="chevron-right" size="md" />; }
function ChevronDownIcon() { return <Icon icon="chevron-down" size="sm" />; }

export function Calendar({ value, onChange, minDate, maxDate, disabled }: CalendarProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        value={value ? dayjs(value) : null}
        onChange={(v) => onChange?.(v ? v.toDate() : null)}
        minDate={minDate ? dayjs(minDate) : undefined}
        maxDate={maxDate ? dayjs(maxDate) : undefined}
        disabled={disabled}
        slots={{
          leftArrowIcon: ChevronLeftIcon,
          rightArrowIcon: ChevronRightIcon,
          switchViewIcon: ChevronDownIcon,
        }}
        slotProps={{
          previousIconButton: { disableRipple: true },
          nextIconButton: { disableRipple: true },
          switchViewButton: { disableRipple: true },
          day: { disableRipple: true },
        }}
      />
    </LocalizationProvider>
  );
}

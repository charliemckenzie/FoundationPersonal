import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import { Spinner } from '../../Spinner';

interface LoadingRowProps {
  colSpan: number;
}

/** Centred spinner row shown while the table is loading. */
export function TableLoadingRow({ colSpan }: LoadingRowProps) {
  return (
    <TableRow>
      <TableCell colSpan={colSpan} align="center" sx={{ py: 4 }}>
        <Spinner size="medium" />
      </TableCell>
    </TableRow>
  );
}

interface EmptyRowProps {
  colSpan: number;
  message: string;
}

/** "No data" row shown when the table has no rows and isn't loading. */
export function TableEmptyRow({ colSpan, message }: EmptyRowProps) {
  return (
    <TableRow>
      <TableCell colSpan={colSpan} align="center" sx={{ py: 4 }}>
        <Typography variant="body" color="text.muted">
          {message}
        </Typography>
      </TableCell>
    </TableRow>
  );
}

import Typography from '@mui/material/Typography';

export interface PaymentOrderMeta {
  /** Ordinal label, e.g. "1st". */
  ord: string;
}

/** Right-aligned ordinal shown in the "Payment order" column of the payment grids. */
export function PaymentOrderCell({ meta }: { meta?: PaymentOrderMeta }) {
  if (!meta) return null;
  return (
    <Typography variant="small" sx={{ fontWeight: 700, textAlign: 'right', display: 'block' }}>
      {meta.ord}
    </Typography>
  );
}

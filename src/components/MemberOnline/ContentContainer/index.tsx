import Box from '@mui/material/Box';

export type ContentContainerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export interface ContentContainerProps {
  /** Max-width of the content area. Defaults to 'lg'. */
  size?: ContentContainerSize;
  children: React.ReactNode;
}

const MAX_WIDTHS: Record<ContentContainerSize, string> = {
  xs:    '32rem',   // 512px
  sm:    '40.5rem', // 648px
  md:    '48rem',   // 768px
  lg:    '60rem',   // 960px
  xl:    '75rem',   // 1200px
  '2xl': '90rem',   // 1440px
};

export function ContentContainer({ size = 'lg', children }: ContentContainerProps) {
  return (
    <Box sx={{ px: { xs: '1.25rem', sm: '1.75rem', lg: 5 }, py: 0, pb: '3.5rem' }}>
      <Box sx={{ maxWidth: MAX_WIDTHS[size], mx: 'auto' }}>
        {children}
      </Box>
    </Box>
  );
}

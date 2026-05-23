import MuiSkeleton from '@mui/material/Skeleton';

export type SkeletonVariant = 'text' | 'circular' | 'rectangular' | 'rounded';
export type SkeletonAnimation = 'pulse' | 'wave' | false;

export interface SkeletonProps {
  variant?: SkeletonVariant;
  width?: number | string;
  height?: number | string;
  animation?: SkeletonAnimation;
}

export function Skeleton({ variant = 'text', width, height, animation = 'pulse' }: SkeletonProps) {
  return <MuiSkeleton variant={variant} width={width} height={height} animation={animation} />;
}

import type { ColorScale } from '../primitives/colors';
import type {
  QSuperInvestmentAllocationKey,
  QSuperAssetAllocationKey,
  ARTInvestmentOptionKey,
  ARTAssetMixKey,
  SharedDiversifiedOptionKey,
  SharedAssetClassOptionKey,
} from '../primitives/colors';

export interface GridConfig {
  columns: Record<'xs' | 'sm' | 'md' | 'lg' | 'xl', number>;
  gutter:  Record<'xs' | 'sm' | 'md' | 'lg' | 'xl', number>;
  margin:  Record<'xs' | 'sm' | 'md' | 'lg' | 'xl', number | 'auto'>;
  maxWidth: number;
}

export interface BrandConfig {
  name: string;
  primary: ColorScale;
  secondary: ColorScale;
  tertiary?: ColorScale;
  quaternary?: ColorScale;
  neutral: ColorScale;
  buttonBorderRadius: string | number;
  fontFamily: string;
  headingFontFamily: string;
  grid?: GridConfig;
  /** Fixed data-visualisation colours for investment option allocations. QSuper only. */
  investmentAllocations?: Record<QSuperInvestmentAllocationKey, string>;
  /** Fixed data-visualisation colours for asset class allocations. QSuper only. */
  assetAllocations?: Record<QSuperAssetAllocationKey, string>;
  /** Fixed data-visualisation colours for ART investment options. ART only. */
  artInvestmentOptions?: Record<ARTInvestmentOptionKey, string>;
  /** Fixed data-visualisation colours for ART asset mix. ART only. */
  artAssetMix?: Record<ARTAssetMixKey, string>;
  /** Shared diversified investment option colours. Available to both ART and QSuper. */
  diversifiedOptions?: Record<SharedDiversifiedOptionKey, string>;
  /** Shared asset class option colours. Available to both ART and QSuper. */
  assetClassOptions?: Record<SharedAssetClassOptionKey, string>;
}

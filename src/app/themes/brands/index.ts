import type { ColorScale } from '../primitives/colors';
import type {
  QSuperInvestmentAllocationKey,
  QSuperAssetAllocationKey,
  ARTInvestmentOptionKey,
  ARTAssetMixKey,
  SharedDiversifiedOptionKey,
  SharedAssetClassOptionKey,
} from '../primitives/colors';

export type LogoVariant = 'primary' | 'secondary' | 'mark';

export interface LogoConfig {
  /** The brand's preferred/full logo. */
  primary: string;
  /** Alternative layout (e.g. stacked or wordmark-only). Falls back to primary if absent. */
  secondary?: string;
  /** Icon/mark only. Falls back to primary if absent. */
  mark?: string;
  /** Default accessible alt text for the brand logo. */
  alt: string;
}

export interface GridConfig {
  columns: Record<'xs' | 'sm' | 'md' | 'lg' | 'xl', number>;
  gutter:  Record<'xs' | 'sm' | 'md' | 'lg' | 'xl', number>;
  margin:  Record<'xs' | 'sm' | 'md' | 'lg' | 'xl', number | 'auto'>;
  maxWidth: number;
}

/**
 * Per-brand semantic token overrides for one mode (light or dark).
 *
 * These are the values that *differ between brands* and used to be embedded as
 * ternaries inside `semantic.ts` (`brand.quaternary ? X : Y`). Moving them onto
 * the brand config makes the palette builder brand-agnostic and lets every brand
 * declare a value for every token — required for the Figma export, which produces
 * parallel modes (ART Light, ART Dark, QSuper Light, QSuper Dark).
 */
export interface BrandSemanticTokens {
  /** Surface tints — soft branded fills for callouts, cards, and feature blocks. */
  tintCool:        string;  // ART: skyBlue / QSuper: qSkyBlue
  tintNeutralCool: string;  // ART: clearBlue / QSuper: qSkyBlue (lightest)
  tintWarm:        string;  // ART: salmon / QSuper: neutral fallback
  tintNeutral:     string;  // ART: neutral fallback / QSuper: brand neutral
  /** Text colour overrides — values where ART and QSuper diverge for contrast reasons. */
  text: {
    primary:     string;
    muted:       string;
    /** Resting colour for links rendered on brand-coloured surfaces. */
    linkInverse: string;
  };
  /** Divider colour — slightly different per brand for visual hierarchy in dark mode. */
  divider: string;
  /** Border colour overrides — input field contrast is brand-tuned. */
  border: {
    default: string;
    input:   string;
  };
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
  /** Brand-specific semantic token values for light and dark modes. */
  semanticOverrides: { light: BrandSemanticTokens; dark: BrandSemanticTokens };
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
  /** Brand logo paths and alt text. */
  logos: LogoConfig;
}

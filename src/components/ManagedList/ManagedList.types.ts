export interface ManagedListAllocation {
  /** Label shown before the value. Defaults to 'Allocation'. */
  label?: string;
  /** Bold value shown after the label (e.g. '100%'). */
  value: string;
}

export interface ManagedListItemProps {
  id: string;
  /** Font Awesome icon name shown inline with the item name. Optional. */
  icon?: string;
  name: string;
  /** Optional chip label displayed beside the name (e.g. 'This device'). */
  badge?: string;
  /** Rendered as a dot-separated string below the name (or stacked, in column variant). */
  metadata: string[];
  /** Edit icon button is shown when provided. Hidden in `list` variant — use a footer-level Edit action instead. */
  onEdit?: () => void;
  /** Delete icon button is shown when provided. Hidden in `list` variant. */
  onDelete?: () => void;
  /** When provided, renders the item as a navigable anchor link with a right chevron. */
  href?: string;
  /** When provided (and no href), renders the item as a button-style nav row with a right chevron. */
  onClick?: () => void;
  /** Overrides the parent's `metadataVariant` for this row only. */
  metadataVariant?: 'row' | 'column';
  /** Displays a right-aligned label + bold value (e.g. 'Allocation 100%'). Use for the beneficiary variant. */
  allocation?: ManagedListAllocation;
}

export interface ManagedListProps {
  /** Font Awesome icon name for the panel header. */
  icon: string;
  /** Font Awesome style variant for the header icon. Defaults to 'solid'. */
  iconStyle?: 'solid' | 'regular' | 'light';
  title: string;
  description: string;
  /** If provided, a chevron link is rendered in the header. */
  href?: string;
  items: ManagedListItemProps[];
  /** Text for the empty state. Defaults to 'No items added'. */
  emptyMessage?: string;
  /** Label for the add action button (e.g. 'Add passkey'). Omit to suppress the footer entirely. */
  addLabel?: string;
  /** Font Awesome icon for the add action button. Defaults to 'plus'. */
  addIcon?: string;
  onAdd?: () => void;
  /** If provided, a secondary footer button is rendered alongside the add button. */
  onRemoveAll?: () => void;
  /** Label for the secondary footer button. Defaults to 'Remove all'. */
  removeAllLabel?: string;
  /** `card` (default) renders each item as a bordered card with gaps. `list` renders items as a connected list with dividers; per-row edit/delete are hidden — use a footer Edit action instead. */
  itemVariant?: 'card' | 'list';
  /** `row` (default) joins metadata entries with a dot separator. `column` stacks each entry on its own line. */
  metadataVariant?: 'row' | 'column';
  /** When true, renders a skeleton placeholder matching the panel layout instead of the items. */
  loading?: boolean;
  /** Number of skeleton item rows to render while `loading`. Defaults to 3. */
  loadingItemCount?: number;
}

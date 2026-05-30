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
  /** Overrides the parent's `metadataVariant` for this row only. */
  metadataVariant?: 'row' | 'column';
}

export interface ManagedListProps {
  /** Font Awesome icon name for the panel header. */
  icon: string;
  title: string;
  description: string;
  /** If provided, a chevron link is rendered in the header. */
  href?: string;
  items: ManagedListItemProps[];
  /** Icon for the empty state. Defaults to the header icon. */
  emptyIcon?: string;
  /** Text for the empty state. Defaults to 'No items added'. */
  emptyMessage?: string;
  /** Label for the add action button (e.g. 'Add passkey'). */
  addLabel: string;
  /** Font Awesome icon for the add action button. Defaults to 'plus'. */
  addIcon?: string;
  onAdd: () => void;
  /** If provided, a 'Remove all' button is rendered alongside the add button. */
  onRemoveAll?: () => void;
  /** `card` (default) renders each item as a bordered card with gaps. `list` renders items as a connected list with dividers; per-row edit/delete are hidden — use a footer Edit action instead. */
  itemVariant?: 'card' | 'list';
  /** `row` (default) joins metadata entries with a dot separator. `column` stacks each entry on its own line. */
  metadataVariant?: 'row' | 'column';
}

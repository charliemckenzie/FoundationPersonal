import type { DataGridColumn } from '../types';

interface AffordanceOptions {
  selectable?: boolean;
  reorderable?: boolean;
}

/**
 * Builds the `grid-template-columns` track list, prepending fixed tracks for the
 * reorder drag handle and selection checkbox and appending one for the reorder
 * controls, so every header/row/footer shares one column model.
 */
export function buildGridTemplate<T>(
  columns: DataGridColumn<T>[],
  { selectable, reorderable }: AffordanceOptions,
): string {
  const tracks: string[] = [];
  // Fixed widths for system columns whose header cells are intentionally empty.
  // Per-row grids size `auto` tracks independently — an empty header cell shrinks to
  // zero while body cells expand to content, breaking column alignment. Fixed tracks
  // are derived from the known intrinsic size of each column's body content.
  if (reorderable) tracks.push('2rem');    // drag handle: one sm icon
  if (selectable) tracks.push('auto');     // checkbox: header also has a checkbox, so auto syncs fine
  for (const col of columns) {
    const width = col.width ?? '1fr';
    // Wrap fr values in minmax(0, ...) so each row's fractional track resolves
    // to the same width rather than expanding to its content's min-content size.
    tracks.push(/^\d*\.?\d+fr$/.test(width) ? `minmax(0, ${width})` : width);
  }
  if (reorderable) tracks.push('4.5rem'); // move controls: two small IconButtons + gap
  return tracks.join(' ');
}

export function dashedBorderSvg(color: string, radius: number): string {
  const c = encodeURIComponent(color);
  return `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='${radius}' ry='${radius}' stroke='${c}' stroke-width='1' stroke-dasharray='6%2c4' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e")`;
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function isFileAccepted(file: File, accept?: string): boolean {
  if (!accept) return true;
  return accept
    .split(',')
    .map((t) => t.trim())
    .some((token) => {
      if (token.startsWith('.')) return file.name.toLowerCase().endsWith(token.toLowerCase());
      if (token.endsWith('/*')) return file.type.startsWith(token.slice(0, -1));
      return file.type === token;
    });
}

export function genId(prefix?: string): string {
  // return Math.random().toString(36).substring(7);
  return `${prefix || ""}${Math.random().toString(36).substring(2, 11)}`;
}

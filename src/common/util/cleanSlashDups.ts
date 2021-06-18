export function cleanSlashDups(value: string): string {
  return value.replace(/\/+/g, '/');
}

export function isDateValid(date: unknown): boolean {
  return date && date instanceof Date && Number.isFinite(date.getTime());
}

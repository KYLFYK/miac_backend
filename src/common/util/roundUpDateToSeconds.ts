export function roundUpDateToSeconds(date: Date): Date {
  const timestamp = date.getTime();

  if (!Number.isNaN(timestamp)) {
    return new Date(Math.ceil(timestamp * 1000) / 1000);
  }

  return date;
}

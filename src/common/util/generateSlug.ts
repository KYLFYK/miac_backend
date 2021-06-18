import slugify from 'slugify';

export function generateSlug(value: string): string {
  return slugify(value, { strict: true, lower: true });
}

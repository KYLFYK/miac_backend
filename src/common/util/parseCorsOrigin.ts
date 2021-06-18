export function parseCorsOrigin(cors: string): (string | RegExp)[] {
  const items = cors.split(',');

  return items.map(item => {
    if (item === '*' || item.startsWith('http')) {
      return item;
    } else {
      return new RegExp(item);
    }
  });
}

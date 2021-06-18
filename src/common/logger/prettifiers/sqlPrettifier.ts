export function sqlPrettifier(sql: string): string {
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const sqlFormatter = require('sql-formatter');

    return '\n' + sqlFormatter.format(sql, {
      language: 'postgresql',
    });
  } catch {
    return sql;
  }
}

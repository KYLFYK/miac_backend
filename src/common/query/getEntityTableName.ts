import { getMetadataArgsStorage, ObjectType } from 'typeorm';

export function getEntityTableName<Entity extends Record<string, unknown>>(entity: ObjectType<Entity>): string {
  const meta = getMetadataArgsStorage();

  return meta.tables.find(table => table.target === entity).name;
}

import { getMetadataArgsStorage, ObjectType } from 'typeorm';
import { ColumnMetadataArgs } from 'typeorm/metadata-args/ColumnMetadataArgs';

type AllowFieldsType = 'regular' | 'string' | 'tsvector';

function columnTypeFilterExpression(type: AllowFieldsType): (column: ColumnMetadataArgs) => boolean {
  if (type === 'string') return (column: ColumnMetadataArgs): boolean => (column.options.type === String);
  if (type === 'regular') return (column: ColumnMetadataArgs): boolean => (column.options.type !== 'tsvector');

  return (column: ColumnMetadataArgs): boolean => (column.options.type === type);
}

export function getEntityFields<Entity extends Record<string, unknown>>(
  entity: ObjectType<Entity>,
  type: 'relation' | AllowFieldsType,
): (keyof Entity)[] {
  const meta = getMetadataArgsStorage();

  if (type === 'relation') {
    return meta.relations
      .filter(relation => relation.target === entity)
      .map(relation => relation.propertyName);
  }

  return meta.columns
    .filter(column => column.target === entity)
    .filter(column => columnTypeFilterExpression(type)(column))
    .map(column => column.propertyName);
}

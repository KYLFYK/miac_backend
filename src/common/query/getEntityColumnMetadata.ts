import { ColumnMetadataArgs } from 'typeorm/metadata-args/ColumnMetadataArgs';

import { IEntityMetadata } from './interfaces/IEntityMetadata';
import { IQueryFilter } from './interfaces/IQueryFilter';

export function getEntityColumnMetadata<Entity>(entityMetadata: IEntityMetadata, item: IQueryFilter<Entity>): ColumnMetadataArgs {
  return entityMetadata.columns.find(column => column.propertyName === item.field);
}

import { getMetadataArgsStorage, ObjectType } from 'typeorm';

import { IEntityMetadata } from './interfaces/IEntityMetadata';

export function getEntityMetadata<Entity extends Record<string, unknown>>(entity: ObjectType<Entity>): IEntityMetadata {
  const meta = getMetadataArgsStorage();

  const columns = meta.columns
    .filter(column => column.target === entity);

  return {
    columns,
  };
}

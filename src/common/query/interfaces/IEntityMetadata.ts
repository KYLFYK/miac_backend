import { ColumnMetadataArgs } from 'typeorm/metadata-args/ColumnMetadataArgs';

export interface IEntityMetadata {
  columns: ColumnMetadataArgs[];
}

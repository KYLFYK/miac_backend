import { IBaseEntity } from './IBaseEntity';

export interface IBaseSoftDeleteEntity extends IBaseEntity {
  readonly id: number;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly deletedAt: Date;
}

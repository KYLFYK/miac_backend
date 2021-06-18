import { IQueryFilter } from './IQueryFilter';

export type IQueryFilterMap<Entity> = {
  [key in keyof Entity]?: IQueryFilter<Entity>;
};

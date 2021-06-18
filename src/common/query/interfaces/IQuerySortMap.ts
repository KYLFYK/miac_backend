import { QuerySortDirection } from '../types/QuerySortDirection';

export type IQuerySortMap<Entity> = {
  [key in keyof Entity]?: QuerySortDirection;
};

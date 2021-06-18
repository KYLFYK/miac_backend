import { IQuerySortMap } from './IQuerySortMap';
import { IQueryFilterMap } from './IQueryFilterMap';

export interface IQueryFull<Entity extends Record<string, unknown>> {
  search?: string;
  take?: number;
  skip?: number;
  where?: IQueryFilterMap<Entity>;
  relations?: (keyof Entity)[];
  sort?: IQuerySortMap<Entity>;
  [key: string]: any;
}

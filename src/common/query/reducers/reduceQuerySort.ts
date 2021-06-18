import { IQuerySort } from '../interfaces/IQuerySort';
import { IQuerySortMap } from '../interfaces/IQuerySortMap';

export function reduceQuerySort<Entity>(querySort: IQuerySort<Entity>[]): IQuerySortMap<Entity> {
  return querySort.reduce((acc, item) => ({
    ...acc,
    [item.field]: item.direction,
  }), {});
}

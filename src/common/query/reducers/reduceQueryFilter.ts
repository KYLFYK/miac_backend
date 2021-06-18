import { IQueryFilter } from '../interfaces/IQueryFilter';
import { IQueryFilterMap } from '../interfaces/IQueryFilterMap';

export function reduceQueryFilter<Entity>(queryFilter: IQueryFilter<Entity>[]): IQueryFilterMap<Entity> {
  return queryFilter.reduce((acc, item) => ({
    ...acc,
    [item.field]: item,
  }), {});
}

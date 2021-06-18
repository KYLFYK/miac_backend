import { IQueryFull } from '../interfaces/IQueryFull';
import { QueryField } from '../types/QueryField';
import { serializeQueryFilter } from './serializeQueryFilter';
import { serializeQueryRelations } from './serializeQueryRelations';
import { serializeQuerySort } from './serializeQuerySort';

export function serializeQueryFull<Entity extends Record<string, string>>(restQuery: IQueryFull<Entity>): string {
  const urlSearchParams = new URLSearchParams();

  Object.entries(restQuery).forEach(([key, value]) => {
    urlSearchParams.set(key, value);
  });

  if (restQuery.where) {
    // transform object to array, object key used as field name
    const queryFilter = Object.entries(restQuery.where).map(([field, item]) => ({ ...item, field }));

    urlSearchParams.set(QueryField.where, serializeQueryFilter<Entity>(queryFilter));
  }

  if (restQuery.sort) {
    const querySort = Object.entries(restQuery.sort).map(([field, direction]) => ({ direction, field }));

    urlSearchParams.set(QueryField.sort, serializeQuerySort<Entity>(querySort));
  }

  if (restQuery.relations) {
    urlSearchParams.set(QueryField.relations, serializeQueryRelations<Entity>(restQuery.relations));
  }

  // explicit set params
  if (restQuery.take) {
    urlSearchParams.set(QueryField.take, `${restQuery.take}`);
  }

  if (restQuery.skip) {
    urlSearchParams.set(QueryField.skip, `${restQuery.skip}`);
  }

  if (restQuery.search) {
    urlSearchParams.set(QueryField.search, restQuery.search);
  }

  return urlSearchParams.toString();
}

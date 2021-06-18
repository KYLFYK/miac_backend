import { IQueryFull } from '../interfaces/IQueryFull';
import { QueryField } from '../types/QueryField';
import { parseQueryFilter } from './parseQueryFilter';
import { parseQueryRelations } from './parseQueryRelations';
import { parseQuerySort } from './parseQuerySort';
import { reduceQueryFilter } from '../reducers/reduceQueryFilter';
import { reduceQuerySort } from '../reducers/reduceQuerySort';

function parseNumber(value: string): number {
  const result = parseInt(value, 10);

  return Number.isInteger(result) ? result : null;
}

export function parseQueryFull<Entity extends Record<string, unknown>>(urlSearchParams: string): IQueryFull<Entity> {
  const query = new URLSearchParams(urlSearchParams);

  const search = query.get(QueryField.search) || '';
  const take = parseNumber(query.get(QueryField.take));
  const skip = parseNumber(query.get(QueryField.skip));

  const queryFilter = parseQueryFilter<Entity>(query.get(QueryField.where));
  const where = reduceQueryFilter(queryFilter);

  const relations = parseQueryRelations(query.get(QueryField.relations));

  const querySort = parseQuerySort<Entity>(query.get(QueryField.sort));
  const sort = reduceQuerySort(querySort);

  const allQueryParams = Array.from(query.entries()).reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

  return {
    ...allQueryParams,
    search,
    take,
    skip,
    where,
    relations,
    sort,
  };
}

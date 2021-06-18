import { IQueryFilter } from '../interfaces/IQueryFilter';
import { QUERY_FILTER_OPERATION_DELIMETER } from '../query.const';
import { QueryAllFilterOperation } from '../types/QueryAllFilterOperation';

const filterRegexp = /^([a-z]+)\(([_a-z]+),?(.*)\)$/i;

export function parseQueryFilter<Entity>(query: string): IQueryFilter<Entity>[] {
  const whereFilter = (query || '')
    .split(QUERY_FILTER_OPERATION_DELIMETER)
    .map(item => filterRegexp.exec(item))
    .filter(Boolean)
    .map(([, operation, field, value]) => ({
      operation: operation as QueryAllFilterOperation,
      field: field as Extract<keyof Entity, string>,
      value,
    }));

  return whereFilter;
}

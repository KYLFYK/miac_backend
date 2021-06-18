import { QUERY_SORT_ASC, QUERY_SORT_DELIMITER, QUERY_SORT_DESC } from '../query.const';
import { IQuerySort } from '../interfaces/IQuerySort';
import { QuerySortDirection } from '../types/QuerySortDirection';

const reSort = /^([a-z]+)\(([_a-z]+)\)$/i;

const directionByName = {
  [QUERY_SORT_ASC]: QuerySortDirection.asc,
  [QUERY_SORT_DESC]: QuerySortDirection.desc,
};

export function parseQuerySort<Entity>(query: string): IQuerySort<Entity>[] {
  const sortOrder = (query || '')
    .split(QUERY_SORT_DELIMITER)
    .map(item => reSort.exec(item))
    .filter(Boolean)
    .map(([, direction, field]) => ({
      field: field as Extract<keyof Entity, string>,
      direction: directionByName[direction],
    }));

  return sortOrder;
}

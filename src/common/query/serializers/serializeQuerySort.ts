import { IQuerySort } from '../interfaces/IQuerySort';
import { QUERY_SORT_ASC, QUERY_SORT_DELIMITER, QUERY_SORT_DESC } from '../query.const';
import { QuerySortDirection } from '../types/QuerySortDirection';

const directionByValue = {
  [QuerySortDirection.asc]: QUERY_SORT_ASC,
  [QuerySortDirection.desc]: QUERY_SORT_DESC,
};

export function serializeQuerySort<Entity>(querySort: IQuerySort<Entity>[]): string {
  return querySort
    .map(item => `${directionByValue[item.direction]}(${item.field})`)
    .join(QUERY_SORT_DELIMITER);
}

import { QuerySortDirection } from '../types/QuerySortDirection';

import { QUERY_FULL_TEXT_SEARCH_SORT_FIELD } from '../query.const';

export interface IQuerySort<Entity> {
  field: keyof Entity | typeof QUERY_FULL_TEXT_SEARCH_SORT_FIELD;
  direction: QuerySortDirection;
}

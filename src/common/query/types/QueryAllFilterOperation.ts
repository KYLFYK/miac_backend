import { QueryFilterOperation } from './QueryFilterOperation';
import { QueryDateFilterOperation } from './QueryDateFilterOperation';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const QueryAllFilterOperation = {
  ...QueryFilterOperation,
  ...QueryDateFilterOperation,
};

export type QueryAllFilterOperation = QueryFilterOperation | QueryDateFilterOperation;

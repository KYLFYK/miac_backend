import { QueryAllFilterOperation } from '../types/QueryAllFilterOperation';

export interface IQueryFilter<Entity> {
  field: keyof Entity;
  value: string;
  operation: QueryAllFilterOperation;
}

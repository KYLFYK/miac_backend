import { FindConditions } from 'typeorm';

import { QuerySearchOperation } from '../types/QuerySearchOperation';

export interface IQueryTransformedSearch<Entity> {
  operation: QuerySearchOperation;
  value: string;
  conditions: FindConditions <Entity>[];
  tsRankExpression?: string;
};

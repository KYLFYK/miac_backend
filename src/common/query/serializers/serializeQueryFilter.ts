import { IQueryFilter } from '../interfaces/IQueryFilter';
import { QUERY_FILTER_OPERATION_DELIMETER } from '../query.const';

function serializeQueryFilterValue(value: unknown): string {
  if (typeof value === 'string') {
    return `${value}`;
  } else
  if (typeof value === 'number') {
    return `${value}`;
  } else
  if (Array.isArray(value)) {
    return value.map(serializeQueryFilterValue).join(',');
  } else {
    return `${value}`;
  }
}

export function serializeQueryFilter<Entity>(queryFilter: IQueryFilter<Entity>[]): string {
  return queryFilter
    .map(item => `${item.operation}(${item.field},${serializeQueryFilterValue(item.value)})`)
    .join(QUERY_FILTER_OPERATION_DELIMETER);
}

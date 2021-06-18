import { QUERY_RELATIONS_DELIMITER } from '../query.const';

export function serializeQueryRelations<Entity>(queryRelations: (keyof Entity)[]): string {
  return queryRelations.join(QUERY_RELATIONS_DELIMITER);
}

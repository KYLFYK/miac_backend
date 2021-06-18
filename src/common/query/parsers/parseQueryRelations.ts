import { QUERY_RELATIONS_DELIMITER } from '../query.const';

export function parseQueryRelations<Entity>(query: string): Extract<keyof Entity, string>[] {
  const queryRelations = (query || '')
    .split(QUERY_RELATIONS_DELIMITER)
    .map(relation => relation.trim())
    .filter(Boolean);

  return queryRelations as Extract<keyof Entity, string>[];
}

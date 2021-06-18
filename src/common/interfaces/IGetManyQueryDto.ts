import { FindConditions, FindManyOptions, SelectQueryBuilder } from 'typeorm';

import { IQuerySort } from '../query/interfaces/IQuerySort';
import { IQueryTransformedSearch } from '../query/interfaces/IQueryTransformedSearch';

import { QueryField } from '../query/types/QueryField';

export interface IGetManyQueryDto<Entity> {
  [QueryField.skip]: number;
  [QueryField.take]: number;
  [QueryField.where]: FindConditions<Entity>;
  [QueryField.search]: IQueryTransformedSearch<Entity>;
  [QueryField.relations]: string[];
  [QueryField.sort]: IQuerySort<Entity>[];

  getFindOptions(additionalWhere?: FindConditions<Entity>): FindManyOptions<Entity>;

  applyOptionsToQueryBuilder(
    qb: SelectQueryBuilder<Entity>,
    additionalWhere?: FindConditions<Entity>,
  ): SelectQueryBuilder<Entity>;

  andWhere(additionalWhere: FindConditions<Entity>): IGetManyQueryDto<Entity>;
}

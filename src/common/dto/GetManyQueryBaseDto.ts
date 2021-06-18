import { FindConditions, FindManyOptions, SelectQueryBuilder } from 'typeorm';
import { isEmpty } from 'lodash';

import { IGetManyQueryDto } from '../interfaces/IGetManyQueryDto';
import { IQuerySort } from '../query/interfaces/IQuerySort';
import { IQueryTransformedSearch } from '../query/interfaces/IQueryTransformedSearch';

import { QueryField } from '../query/types/QueryField';
import { QuerySortDirection } from '../query/types/QuerySortDirection';
import { QuerySearchOperation } from '../query/types/QuerySearchOperation';

import { reduceQuerySort } from '../query/reducers/reduceQuerySort';

import {
  QUERY_FULL_TEXT_SEARCH_SORT_FIELD,
  QUERY_FULL_TEXT_SEARCH_PARAM_NAME,
} from '../query/query.const';

export class GetManyQueryBaseDto<Entity> implements IGetManyQueryDto<Entity> {
  [QueryField.skip]: number;
  [QueryField.take]: number;
  [QueryField.where]: FindConditions<Entity>;
  [QueryField.search]: IQueryTransformedSearch<Entity>;
  [QueryField.relations]: string[];
  [QueryField.sort]: IQuerySort<Entity>[];

  private additionalWhere: FindConditions<Entity> = {};

  andWhere(additionalWhere: FindConditions<Entity>): IGetManyQueryDto<Entity> {
    this.additionalWhere = {
      ...this.additionalWhere,
      ...additionalWhere,
    };

    return this;
  }

  getFindOptions(additionalWhere?: FindConditions<Entity>): FindManyOptions<Entity> {
    let where: FindManyOptions<Entity>['where'];

    const searchValue = this[QueryField.search];
    const whereValue = this[QueryField.where];
    const take = this[QueryField.take];
    const skip = this[QueryField.skip];
    const relations = this[QueryField.relations] || [];
    const sort = this[QueryField.sort] || [];
    const order = reduceQuerySort<Entity>(sort);

    if (searchValue && searchValue.conditions?.length > 0) {
      where = searchValue.conditions.map(item => ({
        ...item,
        ...whereValue,
        ...this.additionalWhere,
        ...additionalWhere,
      }));
    } else {
      where = {
        ...whereValue,
        ...this.additionalWhere,
        ...additionalWhere,
      };
    }

    return {
      take,
      skip,
      where,
      relations,
      order,
    };
  }

  applyOptionsToQueryBuilder(
    qb: SelectQueryBuilder<Entity>,
    additionalWhere?: FindConditions<Entity>,
  ): SelectQueryBuilder<Entity> {
    const options: FindManyOptions<Entity> = this.getFindOptions(additionalWhere);

    if (!isEmpty(options.where)) {
      qb.where(options.where);
    }

    if (options.skip) {
      qb.skip(options.skip);
    }

    if (options.take) {
      qb.take(options.take);
    }

    if (!isEmpty(options.order)) {
      const transformedSearchData = this[QueryField.search];
      const isFtsSearch =
        !isEmpty(transformedSearchData)
        && transformedSearchData.operation === QuerySearchOperation.fts;

      Object.keys(options.order).forEach(function (fieldName) {
        const order: number = options.order[fieldName];

        const direction = <'ASC' | 'DESC'>QuerySortDirection[order].toUpperCase();

        if (fieldName === QUERY_FULL_TEXT_SEARCH_SORT_FIELD) {
          if (isFtsSearch) {
            qb.addSelect(transformedSearchData.tsRankExpression, 'rank');
            qb.addOrderBy('rank', direction);
            qb.setParameter(QUERY_FULL_TEXT_SEARCH_PARAM_NAME, transformedSearchData.value);
          }
        } else {
          qb.addOrderBy(`${qb.alias}.${fieldName}`, direction);
        }
      });
    }

    if (!isEmpty(options.relations)) {
      options.relations.forEach(relationName => (
        qb.leftJoinAndSelect(`${qb.alias}.${relationName}`, relationName)
      ));
    }

    return qb;
  }
}

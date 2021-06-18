import { FindConditions, ILike, Raw } from 'typeorm';
import { BadRequestException } from '@nestjs/common';
import { snakeCase } from 'lodash';

import { IApiPropertyQuerySearchOptions } from './interfaces/IApiPropertyQuerySearchOptions';
import { IQuerySearch } from './interfaces/IQuerySearch';
import { IQueryTransformedSearch } from './interfaces/IQueryTransformedSearch';

import { QuerySearchOperation } from './types/QuerySearchOperation';

import { QUERY_FULL_TEXT_SEARCH_PARAM_NAME } from './query.const';

import { getEntityFields } from './getEntityFields';
import { getEntityTableName } from './getEntityTableName';

type IOperationTransformation = {
  [key in keyof typeof QuerySearchOperation]: <Entity>(
    querySearch: IQuerySearch,
    options: IApiPropertyQuerySearchOptions
  ) => IQueryTransformedSearch<Entity>;
};

const transformations: IOperationTransformation = {
  simple<Entity>(querySearch: IQuerySearch, options: IApiPropertyQuerySearchOptions): IQueryTransformedSearch<Entity> {
    const conditions = options.fields.map(field => ({
      [field]: ILike(`%${querySearch.value}%`),
    } as unknown as FindConditions<Entity>));

    return {
      operation: querySearch.operation,
      value: querySearch.value,
      conditions,
    };
  },

  fts<Entity>(querySearch: IQuerySearch, options: IApiPropertyQuerySearchOptions): IQueryTransformedSearch<Entity> {
    const tableName = getEntityTableName(options.entity);
    const tsFieldName = getEntityFields(options.entity, 'tsvector')[0];

    if (!tsFieldName) {
      throw new BadRequestException('Wrong FTS configuration: entity not exists tsvector column');
    }

    const value = prepareFtsValue(querySearch.value);

    const fullTsFieldName = `${tableName}.${snakeCase(tsFieldName)}`;

    const tsRankExpression = `ts_rank(${fullTsFieldName}, to_tsquery('russian', :${QUERY_FULL_TEXT_SEARCH_PARAM_NAME}))`;
    const conditions = [
      {
        [options.fields[0]]: Raw(
          alias => `${fullTsFieldName} @@ to_tsquery('russian', :${QUERY_FULL_TEXT_SEARCH_PARAM_NAME})`,
          { [QUERY_FULL_TEXT_SEARCH_PARAM_NAME]: value }
        ),
      } as unknown as FindConditions<Entity>,
    ];

    return {
      operation: querySearch.operation,
      value,
      tsRankExpression,
      conditions,
    };
  },
};

export function transformQuerySearch<Entity>(
  querySearch: IQuerySearch,
  options: IApiPropertyQuerySearchOptions
): IQueryTransformedSearch<Entity> {
  const transform = transformations[querySearch.operation];

  return transform(querySearch, options);
}

function prepareFtsValue(value: string): string {
  return `"${value.replace(/[^A-zА-я0-9]+/, '+')}":*`;
}

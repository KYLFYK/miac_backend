import { ApiPropertyOptional, ApiPropertyOptions } from '@nestjs/swagger';
import { BadRequestException } from '@nestjs/common';
import { Expose, Transform } from 'class-transformer';
import { Allow } from 'class-validator';

import { IApiPropertyQuerySearchOptions } from '../query/interfaces/IApiPropertyQuerySearchOptions';
import { IQuerySearch } from '../query/interfaces/IQuerySearch';

import { QuerySearchOperation } from '../query/types/QuerySearchOperation';

import { transformQuerySearch } from '../query/transformQuerySearch';

import { QUERY_FULL_TEXT_SEARCH_SORT_FIELD } from '../query/query.const';
import { markdownPre } from '../util/markdownPre';
import { getEntityFields } from '../query/getEntityFields';

// eslint-disable-next-line @typescript-eslint/naming-convention
export function ApiPropertyQuerySearch(options: IApiPropertyQuerySearchOptions): PropertyDecorator {
  const allowFts = options.allowFts || false;

  if (allowFts && !options.entity) {
    throw new BadRequestException('Wrong FTS configuration: not set Entity');
  }

  const operation = allowFts ? QuerySearchOperation.fts : QuerySearchOperation.simple;
  const example = '?search=Поисковый%20запрос';
  const fields = options.fields || getEntityFields(options.entity, 'string');

  const description: string[] = [
    `${allowFts ? 'Полнотекстовый' : 'Текстовый'} поиск:`,
    '---',
    `Используемые поля:${markdownPre(fields.join(', '))}`,
    `Пример:${markdownPre(example)}`,
  ];

  if (allowFts) {
    description.push(
      [
        'Для получения релевантных значений',
        'необходимо сортировать по фиктивному полю',
        QUERY_FULL_TEXT_SEARCH_SORT_FIELD,
      ].join(' ')
    );
  }

  const apiPropertyOptions: ApiPropertyOptions = {
    type: String,
    description: description.join('\n\n'),
  };

  const transformer = ({ value }: { value: string }): any => {
    if (!value) {
      return;
    }

    const searchValue = value.replace(/\s{2,}/g, ' ').replace(/%/g, '\\%').trim();

    const querySearch: IQuerySearch = {
      value: searchValue,
      operation,
    };

    return transformQuerySearch(querySearch, { ...options, fields });
  };

  return function (target: unknown, propertyKey: string): void {
    ApiPropertyOptional(apiPropertyOptions)(target, propertyKey);
    Allow()(target, propertyKey);
    Expose()(target, propertyKey);
    Transform(transformer)(target, propertyKey);
  };
}

import { Type } from '@nestjs/common';
import { ApiPropertyOptional, ApiPropertyOptions } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';
import { IsArray } from 'class-validator';

import { getEntityFields } from '../query/getEntityFields';
import { parseQuerySort } from '../query/parsers/parseQuerySort';

import { validateQuerySort } from '../query/validators/validateQuerySort';

import { QUERY_FULL_TEXT_SEARCH_SORT_FIELD } from '../query/query.const';
import { markdownPre } from '../util/markdownPre';

interface IApiPropertyQuerySortOptions {
  fields?: string[];
  entity?: Type<unknown>;
  allowFts?: boolean;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export function ApiPropertyQuerySort(options: IApiPropertyQuerySortOptions): PropertyDecorator {
  const availFields = options.fields || getEntityFields(options.entity, 'regular');

  const examples = [
    '?sort=asc(createdAt),desc(updatedAt)',
  ];

  if (options.allowFts) {
    examples.push(`?sort=desc(${QUERY_FULL_TEXT_SEARCH_SORT_FIELD}),asc(createdAt)`);
  }

  const description = [
    'Сортировка:',
    '---',
    `Формат:${markdownPre('asc|desc(поле1),asc|desc(поле2)')}`,
    `Доступные поля:${markdownPre(availFields.join(', '))}`,
    `Пример:${markdownPre(examples.join('\n'))}`,
  ];

  if (options.allowFts) {
    description.push(
      `Для полнотекстового поиска доступно фиктивное поле \`${QUERY_FULL_TEXT_SEARCH_SORT_FIELD}\``
    );
  }

  const apiPropertyOptions: ApiPropertyOptions = {
    type: String,
    description: description.join('\n\n'),
  };

  const transformer = ({ value }: { value: string }): any => {
    const querySort = parseQuerySort(value);

    if (options.allowFts) {
      availFields.push(QUERY_FULL_TEXT_SEARCH_SORT_FIELD);
    }

    validateQuerySort(querySort, {
      availFields,
    });

    return querySort;
  };

  return function (target: unknown, propertyKey: string): void {
    ApiPropertyOptional(apiPropertyOptions)(target, propertyKey);
    IsArray()(target, propertyKey);
    Expose()(target, propertyKey);
    Transform(transformer)(target, propertyKey);
  };
}

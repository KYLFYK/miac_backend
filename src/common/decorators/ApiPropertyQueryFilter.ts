import { Type } from '@nestjs/common';
import { ApiPropertyOptional, ApiPropertyOptions } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';
import { IsObject } from 'class-validator';

import { createFindConditionsFromQueryFilter } from '../query/createFindConditionsFromQueryFilter';
import { getEntityFields } from '../query/getEntityFields';
import { parseQueryFilter } from '../query/parsers/parseQueryFilter';
import { validateQueryFilter } from '../query/validators/validateQueryFilter';
import { QueryAllFilterOperation } from '../query/types/QueryAllFilterOperation';
import { markdownPre } from '../util/markdownPre';
import { getEntityMetadata } from '../query/getEntityMetadata';

interface IApiPropertyQueryFilterBaseOptions {
  entity: Type<unknown>;
  fields?: string[];
  operations?: QueryAllFilterOperation[];
}

interface IApiPropertyQueryFilterRequiredFieldsOptions extends IApiPropertyQueryFilterBaseOptions {
  fields: string[];
}

interface IApiPropertyQueryFilterRequiredTypeOptions extends IApiPropertyQueryFilterBaseOptions {
  entity: Type<unknown>;
}

type IApiPropertyQueryFilterOptions = IApiPropertyQueryFilterRequiredFieldsOptions | IApiPropertyQueryFilterRequiredTypeOptions;

// eslint-disable-next-line @typescript-eslint/naming-convention
export function ApiPropertyQueryFilter(options: IApiPropertyQueryFilterOptions): PropertyDecorator {
  const availOperations = options.operations || Object.values(QueryAllFilterOperation);
  const availFields = options.fields || getEntityFields(options.entity, 'regular');
  const example = '?where=in(status,1,2);eq(active,1);day(createdAt,2021-05-28T12:47:00.353Z)';

  const description = [
    'Фильтр по полям:',
    '---',
    `Доступные операции:${markdownPre(availOperations.join(', '))}`,
    `Доступные поля:${markdownPre(availFields.join(', '))}`,
    `Пример:${markdownPre(example)}`,
  ];

  const apiPropertyOptions: ApiPropertyOptions = {
    type: String,
    description: description.join('\n\n'),
  };

  const transformer = ({ value }: { value: string }): any => {
    const queryFilter = parseQueryFilter(value);

    const entityMetadata = getEntityMetadata(options.entity);

    validateQueryFilter(queryFilter, {
      availFields,
      availOperations,
      entityMetadata,
    });

    const conditions = createFindConditionsFromQueryFilter(queryFilter, entityMetadata);

    return conditions;
  };

  return function (target: unknown, propertyKey: string): void {
    ApiPropertyOptional(apiPropertyOptions)(target, propertyKey);
    IsObject()(target, propertyKey);
    Expose()(target, propertyKey);
    Transform(transformer)(target, propertyKey);
  };
}

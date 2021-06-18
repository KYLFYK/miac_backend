import { BadRequestException, Type } from '@nestjs/common';
import { ApiPropertyOptional, ApiPropertyOptions } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';
import { IsArray } from 'class-validator';
import { getEntityFields } from '../query/getEntityFields';

import { parseQueryRelations } from '../query/parsers/parseQueryRelations';
import { QUERY_RELATIONS_DELIMITER } from '../query/query.const';

import { markdownPre } from '../util/markdownPre';
import { checkCompoundRelations } from '../util/checkCompoundRelations';

interface IApiPropertyQueryRelationsOptions {
  fields?: string[];
  entity?: Type<unknown>;
  additionalFields?: string[];
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export function ApiPropertyQueryRelations(options: IApiPropertyQueryRelationsOptions): PropertyDecorator {
  const availFields = options.fields || [
    ...getEntityFields(options.entity, 'relation'),
    ...options.additionalFields || [],
  ];

  const example = [
    '?relations=account,account.avatar',
    '?relations=account&relations=account.avatar',
  ];

  const description = [
    'Поля для раскрытия:',
    '---',
    `Пример:${markdownPre(example.join('\n'))}`,
    `Доступные поля:${markdownPre(availFields.join(', '))}`,
  ];

  const apiPropertyOptions: ApiPropertyOptions = {
    type: String,
    description: description.join('\n\n'),
    enum: availFields,
    isArray: true,
  };

  const transformer = ({ value }: { value: string | string[] }): any => {
    let queryRelations: string[] = parseQueryRelations(Array.isArray(value) ? value.join(QUERY_RELATIONS_DELIMITER) : value);

    const unknownFields = queryRelations.filter(field => !availFields.includes(field));

    if (unknownFields.length > 0) {
      throw new BadRequestException(`Unknown field ${unknownFields[0]}`);
    }

    const compoundFields = queryRelations.filter(field => field.includes('.'));

    if (compoundFields.length > 0) {
      queryRelations = checkCompoundRelations(queryRelations, compoundFields);
    }

    return queryRelations;
  };

  return function (target: unknown, propertyKey: string): void {
    if (availFields.length === 0) {
      return;
    }

    ApiPropertyOptional(apiPropertyOptions)(target, propertyKey);
    IsArray()(target, propertyKey);
    Expose()(target, propertyKey);
    Transform(transformer)(target, propertyKey);
  };
}

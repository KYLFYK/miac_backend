import { BadRequestException } from '@nestjs/common';

import { IQueryFilter } from '../interfaces/IQueryFilter';
import { IEntityMetadata } from '../interfaces/IEntityMetadata';

import { QueryAllFilterOperation } from '../types/QueryAllFilterOperation';
import { QueryDateFilterOperation } from '../types/QueryDateFilterOperation';

import { castValue, castToArray } from '../createFindConditionsFromQueryFilter';
import { getEntityColumnMetadata } from '../getEntityColumnMetadata';
import { isDateValid } from '../../util/isDateValid';

interface IValidateQueryFilterOptions<Entity> {
  availFields: (keyof Entity)[];
  availOperations: QueryAllFilterOperation[];
  entityMetadata: IEntityMetadata;
}

export function validateQueryFilter<Entity extends Record<string, unknown>>(whereFilter: IQueryFilter<Entity>[], options: IValidateQueryFilterOptions<Entity>): void {
  whereFilter.forEach(item => {
    if (!item.field) {
      throw new BadRequestException('Field is undefined');
    }

    if (!item.operation) {
      throw new BadRequestException('Operation is undefined');
    }

    if (Object.keys(QueryDateFilterOperation).includes(item.operation)) {
      const columnMetadata = getEntityColumnMetadata(options.entityMetadata, item);

      if (item.operation === QueryDateFilterOperation.period) {
        if (castToArray<Entity>(item.value, columnMetadata).some(param => !isDateValid(param))) {
          throw new BadRequestException(`Each value in '${item.operation}' operation should be a valid ISO8061 date string`);
        }
      } else if (!isDateValid(castValue(item.value, columnMetadata))) {
        throw new BadRequestException(`Value in '${item.operation}' operation should be a valid ISO8061 date string`);
      }
    }

    if (!options.availFields.includes(item.field)) {
      throw new BadRequestException(`Unknwon field '${item.field}'`);
    }

    if (!options.availOperations.includes(item.operation)) {
      throw new BadRequestException(`Unknown operation '${item.operation}'`);
    }
  });
}

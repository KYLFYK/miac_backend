import { BadRequestException } from '@nestjs/common';

import { IQuerySort } from '../interfaces/IQuerySort';
import { QuerySortDirection } from '../types/QuerySortDirection';

interface IValidateQuerySortOptions<Entity> {
  availFields: (keyof Entity)[];
}

const querySortDirections = Object.values(QuerySortDirection);

export function validateQuerySort<Entity extends Record<string, unknown>>(querySort: IQuerySort<Entity>[], options: IValidateQuerySortOptions<Entity>): void {
  querySort.forEach(item => {
    if (!item.field) {
      throw new BadRequestException('Field is undefined');
    }

    if (!item.direction) {
      throw new BadRequestException('Direction is undefined');
    }

    if (!options.availFields.includes(item.field)) {
      throw new BadRequestException(`Unknwon field '${item.field}'`);
    }

    if (!querySortDirections.includes(item.direction)) {
      throw new BadRequestException(`Direction must be one of ${querySortDirections}`);
    }
  });
}

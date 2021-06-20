import { FindConditions } from 'typeorm';

import { ApiPropertyQueryFilter } from '../../common/decorators/ApiPropertyQueryFilter';
import { ApiPropertyQueryRelations } from '../../common/decorators/ApiPropertyQueryRelations';
import { ApiPropertyQuerySearch } from '../../common/decorators/ApiPropertyQuerySearch';
import { ApiPropertyQuerySort } from '../../common/decorators/ApiPropertyQuerySort';

import { DEFAULT_CHRONIC_RELATIONS } from '../chronic.const';

import { QueryField } from '../../common/query/types/QueryField';

import { IQuerySort } from '../../common/query/interfaces/IQuerySort';
import { IQueryTransformedSearch } from '../../common/query/interfaces/IQueryTransformedSearch';

import { GetManyQueryDto } from '../../common/dto/GetManyQueryDto';

import { ChronicEntity } from '../entities/ChronicEntity';

export class GetManyChronicsQueryDto extends GetManyQueryDto<ChronicEntity> {
  @ApiPropertyQueryFilter({
    entity: ChronicEntity,
  })
  [QueryField.where]: FindConditions<ChronicEntity>;

  @ApiPropertyQuerySearch({
    fields: ['name'],
  })
  [QueryField.search]: IQueryTransformedSearch<ChronicEntity>;

  @ApiPropertyQueryRelations({
    fields: DEFAULT_CHRONIC_RELATIONS,
  })
  [QueryField.relations]: string[];

  @ApiPropertyQuerySort({
    entity: ChronicEntity,
  })
  [QueryField.sort]: IQuerySort<ChronicEntity>[];
}

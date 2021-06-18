import { FindConditions } from 'typeorm';

import { ApiPropertyQueryFilter } from '../../common/decorators/ApiPropertyQueryFilter';
import { ApiPropertyQueryRelations } from '../../common/decorators/ApiPropertyQueryRelations';
import { ApiPropertyQuerySearch } from '../../common/decorators/ApiPropertyQuerySearch';
import { ApiPropertyQuerySort } from '../../common/decorators/ApiPropertyQuerySort';

import { DEFAULT_RECORDS_RELATIONS } from '../records.const';

import { QueryField } from '../../common/query/types/QueryField';

import { IQuerySort } from '../../common/query/interfaces/IQuerySort';
import { IQueryTransformedSearch } from '../../common/query/interfaces/IQueryTransformedSearch';

import { GetManyQueryDto } from '../../common/dto/GetManyQueryDto';

import { RecordsEntity } from '../entities/RecordsEntity';

export class GetManyRecordsQueryDto extends GetManyQueryDto<RecordsEntity> {
  @ApiPropertyQueryFilter({
    entity: RecordsEntity,
  })
  [QueryField.where]: FindConditions<RecordsEntity>;

  @ApiPropertyQuerySearch({
    fields: ['name'],
  })
  [QueryField.search]: IQueryTransformedSearch<RecordsEntity>;

  @ApiPropertyQueryRelations({
    fields: DEFAULT_RECORDS_RELATIONS,
  })
  [QueryField.relations]: string[];

  @ApiPropertyQuerySort({
    entity: RecordsEntity,
  })
  [QueryField.sort]: IQuerySort<RecordsEntity>[];
}

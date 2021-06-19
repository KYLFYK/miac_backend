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


  @ApiPropertyQuerySort({
    entity: RecordsEntity,
  })
  [QueryField.sort]: IQuerySort<RecordsEntity>[];
}

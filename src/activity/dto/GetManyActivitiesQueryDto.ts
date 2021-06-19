import { FindConditions } from 'typeorm';

import { ApiPropertyQueryFilter } from '../../common/decorators/ApiPropertyQueryFilter';
import { ApiPropertyQueryRelations } from '../../common/decorators/ApiPropertyQueryRelations';
import { ApiPropertyQuerySearch } from '../../common/decorators/ApiPropertyQuerySearch';
import { ApiPropertyQuerySort } from '../../common/decorators/ApiPropertyQuerySort';

import { DEFAULT_ACTIVITY_RELATIONS } from '../activity.const';

import { QueryField } from '../../common/query/types/QueryField';

import { IQuerySort } from '../../common/query/interfaces/IQuerySort';
import { IQueryTransformedSearch } from '../../common/query/interfaces/IQueryTransformedSearch';

import { GetManyQueryDto } from '../../common/dto/GetManyQueryDto';

import { ActivityEntity } from '../entities/ActivityEntity';

export class GetManyActivitiesQueryDto extends GetManyQueryDto<ActivityEntity> {
  @ApiPropertyQueryFilter({
    entity: ActivityEntity,
  })
  [QueryField.where]: FindConditions<ActivityEntity>;

  @ApiPropertyQuerySearch({
    fields: ['name'],
  })
  [QueryField.search]: IQueryTransformedSearch<ActivityEntity>;

  @ApiPropertyQueryRelations({
    fields: DEFAULT_ACTIVITY_RELATIONS,
  })
  [QueryField.relations]: string[];

  @ApiPropertyQuerySort({
    entity: ActivityEntity,
  })
  [QueryField.sort]: IQuerySort<ActivityEntity>[];
}

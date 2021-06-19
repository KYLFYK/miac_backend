import { FindConditions } from 'typeorm';

import { ApiPropertyQueryFilter } from '../../common/decorators/ApiPropertyQueryFilter';
import { ApiPropertyQueryRelations } from '../../common/decorators/ApiPropertyQueryRelations';
import { ApiPropertyQuerySearch } from '../../common/decorators/ApiPropertyQuerySearch';
import { ApiPropertyQuerySort } from '../../common/decorators/ApiPropertyQuerySort';

import { DEFAULT_RECOMMEND_RELATIONS } from '../recommend.const';

import { QueryField } from '../../common/query/types/QueryField';

import { IQuerySort } from '../../common/query/interfaces/IQuerySort';
import { IQueryTransformedSearch } from '../../common/query/interfaces/IQueryTransformedSearch';

import { GetManyQueryDto } from '../../common/dto/GetManyQueryDto';

import { RecommendEntity } from '../entities/RecommendEntity';

export class GetManyRecommendsQueryDto extends GetManyQueryDto<RecommendEntity> {
  @ApiPropertyQueryFilter({
    entity: RecommendEntity,
  })
  [QueryField.where]: FindConditions<RecommendEntity>;

  @ApiPropertyQuerySearch({
    fields: ['name'],
  })
  [QueryField.search]: IQueryTransformedSearch<RecommendEntity>;

  @ApiPropertyQueryRelations({
    fields: DEFAULT_RECOMMEND_RELATIONS,
  })
  [QueryField.relations]: string[];

  @ApiPropertyQuerySort({
    entity: RecommendEntity,
  })
  [QueryField.sort]: IQuerySort<RecommendEntity>[];
}

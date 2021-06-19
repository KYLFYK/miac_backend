import { ApiPropertyQueryRelations } from '../../common/decorators/ApiPropertyQueryRelations';

import { DEFAULT_RECOMMEND_RELATIONS } from '../recommend.const';

import { QueryField } from '../../common/query/types/QueryField';

import { IGetByIdQueryDto } from '../../common/interfaces/IGetByIdQueryDto';

export class CreateRecommendQueryDto implements IGetByIdQueryDto {
  @ApiPropertyQueryRelations({
    fields: DEFAULT_RECOMMEND_RELATIONS,
  })
  [QueryField.relations]: string[];
}

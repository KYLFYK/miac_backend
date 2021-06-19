import { ApiPropertyQueryRelations } from '../../common/decorators/ApiPropertyQueryRelations';

import { DEFAULT_ACTIVITY_RELATIONS } from '../activity.const';

import { QueryField } from '../../common/query/types/QueryField';

import { IGetByIdQueryDto } from '../../common/interfaces/IGetByIdQueryDto';

export class CreateActivityQueryDto implements IGetByIdQueryDto {
  @ApiPropertyQueryRelations({
    fields: DEFAULT_ACTIVITY_RELATIONS,
  })
  [QueryField.relations]: string[];
}

import { ApiPropertyQueryRelations } from '../../common/decorators/ApiPropertyQueryRelations';

import { DEFAULT_RECORDS_RELATIONS } from '../records.const';

import { QueryField } from '../../common/query/types/QueryField';

import { IGetByIdQueryDto } from '../../common/interfaces/IGetByIdQueryDto';

export class CreateRecordsQueryDto implements IGetByIdQueryDto {
  @ApiPropertyQueryRelations({
    fields: DEFAULT_RECORDS_RELATIONS,
  })
  [QueryField.relations]: string[];
}

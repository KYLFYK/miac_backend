import { ApiPropertyQueryRelations } from '../../common/decorators/ApiPropertyQueryRelations';

import { DEFAULT_DOCTOR_RELATIONS } from '../doctor.const';

import { QueryField } from '../../common/query/types/QueryField';

import { IGetByIdQueryDto } from '../../common/interfaces/IGetByIdQueryDto';

export class GetDoctorByIdQueryDto implements IGetByIdQueryDto {
  @ApiPropertyQueryRelations({
    fields: DEFAULT_DOCTOR_RELATIONS,
  })
  [QueryField.relations]: string[];
}

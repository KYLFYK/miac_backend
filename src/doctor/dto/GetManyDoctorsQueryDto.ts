import { FindConditions } from 'typeorm';

import { ApiPropertyQueryFilter } from '../../common/decorators/ApiPropertyQueryFilter';
import { ApiPropertyQueryRelations } from '../../common/decorators/ApiPropertyQueryRelations';
import { ApiPropertyQuerySearch } from '../../common/decorators/ApiPropertyQuerySearch';
import { ApiPropertyQuerySort } from '../../common/decorators/ApiPropertyQuerySort';

import { DEFAULT_DOCTOR_RELATIONS } from '../doctor.const';

import { QueryField } from '../../common/query/types/QueryField';

import { IQuerySort } from '../../common/query/interfaces/IQuerySort';
import { IQueryTransformedSearch } from '../../common/query/interfaces/IQueryTransformedSearch';

import { GetManyQueryDto } from '../../common/dto/GetManyQueryDto';

import { DoctorEntity } from '../entities/DoctorEntity';

export class GetManyDoctorsQueryDto extends GetManyQueryDto<DoctorEntity> {
  @ApiPropertyQueryFilter({
    entity: DoctorEntity,
  })
  [QueryField.where]: FindConditions<DoctorEntity>;

  @ApiPropertyQuerySearch({
    fields: ['name'],
  })
  [QueryField.search]: IQueryTransformedSearch<DoctorEntity>;

  @ApiPropertyQueryRelations({
    fields: DEFAULT_DOCTOR_RELATIONS,
  })
  [QueryField.relations]: string[];

  @ApiPropertyQuerySort({
    entity: DoctorEntity,
  })
  [QueryField.sort]: IQuerySort<DoctorEntity>[];
}

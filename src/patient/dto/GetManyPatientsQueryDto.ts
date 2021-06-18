import { FindConditions } from 'typeorm';

import { ApiPropertyQueryFilter } from '../../common/decorators/ApiPropertyQueryFilter';
import { ApiPropertyQueryRelations } from '../../common/decorators/ApiPropertyQueryRelations';
import { ApiPropertyQuerySearch } from '../../common/decorators/ApiPropertyQuerySearch';
import { ApiPropertyQuerySort } from '../../common/decorators/ApiPropertyQuerySort';

import { DEFAULT_PATIENT_RELATIONS } from '../patient.const';

import { QueryField } from '../../common/query/types/QueryField';

import { IQuerySort } from '../../common/query/interfaces/IQuerySort';
import { IQueryTransformedSearch } from '../../common/query/interfaces/IQueryTransformedSearch';

import { GetManyQueryDto } from '../../common/dto/GetManyQueryDto';

import { PatientEntity } from '../entities/PatientEntity';

export class GetManyPatientsQueryDto extends GetManyQueryDto<PatientEntity> {
  @ApiPropertyQueryFilter({
    entity: PatientEntity,
  })
  [QueryField.where]: FindConditions<PatientEntity>;

  @ApiPropertyQuerySearch({
    fields: ['name'],
  })
  [QueryField.search]: IQueryTransformedSearch<PatientEntity>;

  @ApiPropertyQueryRelations({
    fields: DEFAULT_PATIENT_RELATIONS,
  })
  [QueryField.relations]: string[];

  @ApiPropertyQuerySort({
    entity: PatientEntity,
  })
  [QueryField.sort]: IQuerySort<PatientEntity>[];
}

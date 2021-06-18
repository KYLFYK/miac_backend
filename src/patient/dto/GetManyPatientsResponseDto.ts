import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

import { IGetManyResponseDto } from '../../common/interfaces/IGetManyResponseDto';

import { GetManyMetaResponseDto } from '../../common/dto/GetManyMetaResponseDto';
import { PatientResponseDto } from './PatientResponseDto';

export class GetManyPatientsResponseDto implements IGetManyResponseDto<PatientResponseDto> {
  @Expose()
  @Type(() => PatientResponseDto)
  @ApiProperty({ type: PatientResponseDto, isArray: true })
  items: PatientResponseDto[];

  @Expose()
  @Type(() => GetManyMetaResponseDto)
  @ApiProperty({ type: GetManyMetaResponseDto })
  meta: GetManyMetaResponseDto;
}

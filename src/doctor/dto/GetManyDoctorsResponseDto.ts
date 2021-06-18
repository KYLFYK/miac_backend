import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

import { IGetManyResponseDto } from '../../common/interfaces/IGetManyResponseDto';

import { GetManyMetaResponseDto } from '../../common/dto/GetManyMetaResponseDto';
import { DoctorResponseDto } from './DoctorResponseDto';

export class GetManyDoctorsResponseDto implements IGetManyResponseDto<DoctorResponseDto> {
  @Expose()
  @Type(() => DoctorResponseDto)
  @ApiProperty({ type: DoctorResponseDto, isArray: true })
  items: DoctorResponseDto[];

  @Expose()
  @Type(() => GetManyMetaResponseDto)
  @ApiProperty({ type: GetManyMetaResponseDto })
  meta: GetManyMetaResponseDto;
}

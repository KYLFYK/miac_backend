import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

import { IGetManyResponseDto } from '../../common/interfaces/IGetManyResponseDto';

import { GetManyMetaResponseDto } from '../../common/dto/GetManyMetaResponseDto';
import { RecordsResponseDto } from './RecordsResponseDto';

export class GetManyRecordsResponseDto implements IGetManyResponseDto<RecordsResponseDto> {
  @Expose()
  @Type(() => RecordsResponseDto)
  @ApiProperty({ type: RecordsResponseDto, isArray: true })
  items: RecordsResponseDto[];

  @Expose()
  @Type(() => GetManyMetaResponseDto)
  @ApiProperty({ type: GetManyMetaResponseDto })
  meta: GetManyMetaResponseDto;
}

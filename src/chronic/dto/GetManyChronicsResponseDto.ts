import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

import { IGetManyResponseDto } from '../../common/interfaces/IGetManyResponseDto';

import { GetManyMetaResponseDto } from '../../common/dto/GetManyMetaResponseDto';
import { ChronicResponseDto } from './ChronicResponseDto';

export class GetManyChronicsResponseDto implements IGetManyResponseDto<ChronicResponseDto> {
  @Expose()
  @Type(() => ChronicResponseDto)
  @ApiProperty({ type: ChronicResponseDto, isArray: true })
  items: ChronicResponseDto[];

  @Expose()
  @Type(() => GetManyMetaResponseDto)
  @ApiProperty({ type: GetManyMetaResponseDto })
  meta: GetManyMetaResponseDto;
}

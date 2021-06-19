import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

import { IGetManyResponseDto } from '../../common/interfaces/IGetManyResponseDto';

import { GetManyMetaResponseDto } from '../../common/dto/GetManyMetaResponseDto';
import { RecommendResponseDto } from './RecommendResponseDto';

export class GetManyRecommendsResponseDto implements IGetManyResponseDto<RecommendResponseDto> {
  @Expose()
  @Type(() => RecommendResponseDto)
  @ApiProperty({ type: RecommendResponseDto, isArray: true })
  items: RecommendResponseDto[];

  @Expose()
  @Type(() => GetManyMetaResponseDto)
  @ApiProperty({ type: GetManyMetaResponseDto })
  meta: GetManyMetaResponseDto;
}

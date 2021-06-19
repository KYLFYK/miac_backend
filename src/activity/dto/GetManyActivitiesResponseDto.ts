import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

import { IGetManyResponseDto } from '../../common/interfaces/IGetManyResponseDto';

import { GetManyMetaResponseDto } from '../../common/dto/GetManyMetaResponseDto';
import { ActivityResponseDto } from './ActivityResponseDto';

export class GetManyActivitiesResponseDto implements IGetManyResponseDto<ActivityResponseDto> {
  @Expose()
  @Type(() => ActivityResponseDto)
  @ApiProperty({ type: ActivityResponseDto, isArray: true })
  items: ActivityResponseDto[];

  @Expose()
  @Type(() => GetManyMetaResponseDto)
  @ApiProperty({ type: GetManyMetaResponseDto })
  meta: GetManyMetaResponseDto;
}

import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class GetManyMetaResponseDto {
  @ApiProperty({
    description: 'Общее количество записей',
  })
  @Expose()
  count: number;
}

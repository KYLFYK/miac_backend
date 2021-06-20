import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

import { IChronic } from '../interfaces/IChronic';
import { IChronicExtended } from '../interfaces/IChronicExtended';

export class ChronicResponseDto implements IChronic, IChronicExtended {
  @Expose()
  @ApiProperty()
  id: number;

  @Expose()
  @ApiProperty()
  name: string;

  @Expose()
  @ApiProperty()
  description: string;

  @Expose()
  @ApiProperty()
  createdAt: Date;

  @Expose()
  @ApiProperty()
  updatedAt: Date;
}

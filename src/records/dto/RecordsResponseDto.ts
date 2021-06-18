import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

import { IRecords } from '../interfaces/IRecords';
import { IRecordsExtended } from '../interfaces/IRecordsExtended';

export class RecordsResponseDto implements IRecords, IRecordsExtended {
  @Expose()
  @ApiProperty()
  id: number;

  @Expose()
  @ApiProperty()
  sys: number;

  @Expose()
  @ApiProperty()
  dia: number;

  @Expose()
  @ApiProperty()
  heartRate: number;

  @Expose()
  @ApiProperty()
  feeling: string;

  @Expose()
  @ApiProperty()
  createdAt: Date;

  @Expose()
  @ApiProperty()
  updatedAt: Date;
}

import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

import { IActivity } from '../interfaces/IActivity';
import { IActivityExtended } from '../interfaces/IActivityExtended';

export class ActivityResponseDto implements IActivity, IActivityExtended {
  @Expose()
  @ApiProperty()
  id: number;

  @Expose()
  @ApiProperty()
  name: string;

  @Expose()
  @ApiProperty()
  createdAt: Date;

  @Expose()
  @ApiProperty()
  updatedAt: Date;
}

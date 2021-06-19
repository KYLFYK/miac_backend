import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

import { IActivityCreateData } from '../interfaces/IActivityCreateData';

export class CreateActivityBodyDto implements IActivityCreateData {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly name: string;
}

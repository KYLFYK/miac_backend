import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

import { IPatientCreateData } from '../interfaces/IPatientCreateData';

export class CreatePatientBodyDto implements IPatientCreateData {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly name: string;
}

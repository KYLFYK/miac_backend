import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { IPatientUpdateData } from '../interfaces/IPatientUpdateData';

export class UpdatePatientBodyDto implements IPatientUpdateData {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiPropertyOptional()
  readonly name: string;
}

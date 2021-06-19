import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { IActivityUpdateData } from '../interfaces/IActivityUpdateData';

export class UpdateActivityBodyDto implements IActivityUpdateData {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiPropertyOptional()
  readonly name: string;
}

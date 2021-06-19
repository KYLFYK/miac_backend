import {ApiProperty, ApiPropertyOptional} from '@nestjs/swagger';
import {IsNotEmpty, IsNumber, IsOptional, IsString} from 'class-validator';

import { IRecordsUpdateData } from '../interfaces/IRecordsUpdateData';

export class UpdateRecordsBodyDto implements IRecordsUpdateData {
  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  @ApiPropertyOptional()
  readonly sys: number;

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  @ApiPropertyOptional()
  readonly dia: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiPropertyOptional({ example: 95 })
  readonly heartRate: number;

  @IsString()
  @IsNotEmpty()
  @ApiPropertyOptional({ example: 'Нормальное состояние' })
  readonly feeling: string;

  @IsString()
  @IsNotEmpty()
  @ApiPropertyOptional({ example: 'Нормальное состояние' })
  readonly description: string;
}

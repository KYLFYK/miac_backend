import { ApiProperty } from '@nestjs/swagger';
import {IsString, IsNotEmpty, IsNumber} from 'class-validator';

import { IRecordsCreateData } from '../interfaces/IRecordsCreateData';

export class CreateRecordsBodyDto implements IRecordsCreateData {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ example: 120 })
  readonly sys: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ example: 80 })
  readonly dia: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ example: 95 })
  readonly heartRate: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Нормальное состояние' })
  readonly feeling: string;
}

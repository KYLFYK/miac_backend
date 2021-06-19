import { ApiProperty } from '@nestjs/swagger';
import {IsString, IsNotEmpty, IsNumber} from 'class-validator';

import { IRecordsCreateData } from '../interfaces/IRecordsCreateData';
import {IPatient} from "../../patient/interfaces/IPatient";

export class CreateRecordsBodyDto implements Omit<IRecordsCreateData, 'owner'>{
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

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: 'Айдишник владельца', type: Number })
  ownerId: IPatient['id'];

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Описание' })
  readonly description: string;
}

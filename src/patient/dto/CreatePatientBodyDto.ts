import {ApiProperty, ApiPropertyOptional} from '@nestjs/swagger';
import {IsString, IsNotEmpty, IsBoolean, IsEnum, IsNumber} from 'class-validator';

import { IPatientCreateData } from '../interfaces/IPatientCreateData';
import {sexType} from "../interfaces/IPatient";

export class CreatePatientBodyDto implements IPatientCreateData {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ default: 'Ivan' })
  readonly firstName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ default: 'Ivanov' })
  readonly lastName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ default: 'test@test.ru' })
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '+79999999999', default: '+79999999999'})
  readonly phone: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ example: '75', default: '75'})
  readonly weight: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ example: 55, default: 55 })
  readonly age: number;

  @IsEnum(sexType)
  @ApiProperty({ type: 'enum', enum: sexType, default: sexType.MALE })
  readonly sex: sexType;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({ default: true })
  readonly isVerify: boolean;
}

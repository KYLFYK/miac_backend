import {ApiProperty, ApiPropertyOptional} from '@nestjs/swagger';
import {IsString, IsNotEmpty, IsBoolean, IsEnum, IsNumber, IsOptional} from 'class-validator';

import { IPatientCreateData } from '../interfaces/IPatientCreateData';
import {sexType} from "../interfaces/IPatient";
import {IActivity} from "../../activity/interfaces/IActivity";

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
  @IsNotEmpty()
  @ApiProperty({ type: 'enum', enum: sexType, default: sexType.MALE })
  readonly sex: sexType;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ example: 120, default: 120})
  height: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ example: '2390482384782374', default: '239482398493284'})
  readonly snils: string;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({ default: true })
  readonly isVerify: boolean;
}

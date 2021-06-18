import {ApiProperty, ApiPropertyOptional} from '@nestjs/swagger';
import {IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString} from 'class-validator';

import { IPatientUpdateData } from '../interfaces/IPatientUpdateData';
import {sexType} from "../interfaces/IPatient";

export class UpdatePatientBodyDto implements IPatientUpdateData {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ default: 'Ivan' })
  readonly firstName: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ default: 'Ivanov' })
  readonly lastName: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ default: 'test@test.ru' })
  readonly email: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ example: '+79999999999', default: '+79999999999'})
  readonly phone: string;

  @IsEnum(sexType)
  @IsOptional()
  @ApiPropertyOptional({ type: 'enum', enum: sexType, default: sexType.MALE })
  readonly sex: sexType;

  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional({ example: '76', default: '75'})
  readonly weight: number;

  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional({ example: '55', default: '55'})
  readonly age: number;

  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional({ default: true })
  readonly isVerify: boolean;
}

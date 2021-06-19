import {ApiProperty, ApiPropertyOptional} from '@nestjs/swagger';
import {IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString} from 'class-validator';

import { IPatientUpdateData } from '../interfaces/IPatientUpdateData';
import {sexType} from "../interfaces/IPatient";
import {IActivity} from "../../activity/interfaces/IActivity";
import {ActivityResponseDto} from "../../activity/dto/ActivityResponseDto";
import {Type} from "class-transformer";

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
  @ApiPropertyOptional({ example: '150', default: '150'})
  readonly height: number;

  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional({ example: '2390482384782374', default: '239482398493284'})
  readonly snils: string;

  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional({ example: '55', default: '55'})
  readonly age: number;

  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional({ default: true })
  readonly isVerify: boolean;

  @ApiPropertyOptional({ type: ActivityResponseDto, isArray: true})
  @Type(() => ActivityResponseDto)
  activityId: ActivityResponseDto["id"][];
}

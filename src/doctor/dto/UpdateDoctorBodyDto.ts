import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { IDoctorUpdateData } from '../interfaces/IDoctorUpdateData';
import {IPatient} from "../../patient/interfaces/IPatient";

export class UpdateDoctorBodyDto implements IDoctorUpdateData {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiPropertyOptional()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiPropertyOptional()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiPropertyOptional()
  phone?: string;

  @ApiPropertyOptional({ isArray: true })
  patientIds: IPatient['id'][];
}

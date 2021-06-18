import { ApiProperty } from '@nestjs/swagger';
import {Expose, Type} from 'class-transformer';

import { IDoctor } from '../interfaces/IDoctor';
import { IDoctorExtended } from '../interfaces/IDoctorExtended';
import {GetManyPatientsResponseDto} from "../../patient/dto/GetManyPatientsResponseDto";
import {PatientResponseDto} from "../../patient/dto/PatientResponseDto";

export class DoctorResponseDto implements Omit<IDoctor, 'patientIds'>, IDoctorExtended {
  @Expose()
  @ApiProperty()
  id: number;

  @Expose()
  @ApiProperty()
  firstName: string;

  @Expose()
  @ApiProperty()
  lastName: string;

  @Expose()
  @ApiProperty()
  phone: string;

  @Expose()
  @Type(()=> PatientResponseDto)
  @ApiProperty({ type: PatientResponseDto, isArray: true })
  patients: PatientResponseDto[];

  @Expose()
  @ApiProperty()
  createdAt: Date;

  @Expose()
  @ApiProperty()
  updatedAt: Date;

}

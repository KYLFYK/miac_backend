import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

import { IDoctorCreateData } from '../interfaces/IDoctorCreateData';
import {IPatient} from "../../patient/interfaces/IPatient";

export class CreateDoctorBodyDto implements IDoctorCreateData {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Petr' })
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Petrov'})
  lastName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '+79999999999' })
  phone: string;

  @ApiProperty({ isArray: true })
  patientIds: IPatient['id'][];
}

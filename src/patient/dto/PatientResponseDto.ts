import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

import {currentStatusType, IPatient, sexType} from '../interfaces/IPatient';
import { IPatientExtended } from '../interfaces/IPatientExtended';

export class PatientResponseDto implements IPatient, IPatientExtended {
  @Expose()
  @ApiProperty()
  id: number;

  @Expose()
  @ApiProperty()
  email: string;

  @Expose()
  @ApiProperty()
  firstName: string;

  @Expose()
  @ApiProperty()
  isVerify: boolean;

  @Expose()
  @ApiProperty()
  lastName: string;

  @Expose()
  @ApiProperty()
  phone: string;

  @Expose()
  @ApiProperty()
  age: number;

  @Expose()
  @ApiProperty()
  weight: number;

  @Expose()
  @ApiProperty()
  height: number;

  @Expose()
  @ApiProperty()
  snils: string;

  @Expose()
  @ApiProperty({ type: 'enum', enum: sexType, default: sexType.MALE})
  sex: sexType;

  @Expose()
  @ApiProperty({ type: 'enum', enum: currentStatusType, default: currentStatusType.NORMAL})
  currentStatus: currentStatusType;

  @Expose()
  @ApiProperty()
  readonly createdAt: Date;

  @Expose()
  @ApiProperty()
  readonly updatedAt: Date;


}

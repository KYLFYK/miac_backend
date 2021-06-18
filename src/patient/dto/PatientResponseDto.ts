import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

import { IPatient } from '../interfaces/IPatient';
import { IPatientExtended } from '../interfaces/IPatientExtended';

export class PatientResponseDto implements IPatient, IPatientExtended {
  @Expose()
  @ApiProperty()
  id: number;

  @Expose()
  @ApiProperty()
  name: string;

  @Expose()
  @ApiProperty()
  createdAt: Date;

  @Expose()
  @ApiProperty()
  updatedAt: Date;
}

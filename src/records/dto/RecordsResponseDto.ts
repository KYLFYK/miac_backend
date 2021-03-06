import { ApiProperty } from '@nestjs/swagger';
import {Expose, Type} from 'class-transformer';

import { IRecords } from '../interfaces/IRecords';
import { IRecordsExtended } from '../interfaces/IRecordsExtended';
import {PatientResponseDto} from "../../patient/dto/PatientResponseDto";
import {IPatient} from "../../patient/interfaces/IPatient";

export class RecordsResponseDto implements IRecords, IRecordsExtended {
  @Expose()
  @ApiProperty()
  id: number;

  @Expose()
  @ApiProperty()
  sys: number;

  @Expose()
  @ApiProperty()
  dia: number;

  @Expose()
  @ApiProperty()
  heartRate: number;

  @Expose()
  @ApiProperty()
  feeling: string;

  @ApiProperty()
  ownerId: IPatient['id']

  @Expose()
  @ApiProperty()
  description: string;

  @Expose()
  @ApiProperty()
  createdAt: Date;

  @Expose()
  @ApiProperty()
  updatedAt: Date;

  @Expose()
  @ApiProperty({type: PatientResponseDto})
  owner: IPatient;
}

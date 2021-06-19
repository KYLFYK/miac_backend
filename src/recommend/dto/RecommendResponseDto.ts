import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

import { IRecommend } from '../interfaces/IRecommend';
import { IRecommendExtended } from '../interfaces/IRecommendExtended';
import {IDoctor} from "../../doctor/interfaces/IDoctor";
import {IPatient} from "../../patient/interfaces/IPatient";

export class RecommendResponseDto implements IRecommend, IRecommendExtended {
  @Expose()
  @ApiProperty()
  id: number;

  @Expose()
  @ApiProperty()
  name: string;

  @Expose()
  @ApiProperty()
  description: string;

  @Expose()
  @ApiProperty()
  patientId: IPatient['id'];

  @Expose()
  @ApiProperty()
  ownerId: IDoctor['id'];

  @Expose()
  @ApiProperty()
  createdAt: Date;

  @Expose()
  @ApiProperty()
  updatedAt: Date;
}

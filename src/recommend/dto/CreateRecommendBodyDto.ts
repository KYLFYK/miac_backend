import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

import { IRecommendCreateData } from '../interfaces/IRecommendCreateData';
import {IDoctor} from "../../doctor/interfaces/IDoctor";
import {IPatient} from "../../patient/interfaces/IPatient";

export class CreateRecommendBodyDto implements IRecommendCreateData {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly description: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: Number })
  readonly ownerId: IDoctor['id'];

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: Number })
  readonly patientId: IPatient['id'];
}

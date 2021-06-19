import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { IRecommendUpdateData } from '../interfaces/IRecommendUpdateData';
import {IDoctor} from "../../doctor/interfaces/IDoctor";

export class UpdateRecommendBodyDto implements IRecommendUpdateData {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiPropertyOptional()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiPropertyOptional()
  readonly description: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiPropertyOptional()
  readonly owner: IDoctor['id'];
}

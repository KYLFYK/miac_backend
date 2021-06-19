import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PatientEntity } from './entities/PatientEntity';

import { PatientService } from './PatientService';

import { PatientController } from './PatientController';
import {RecordsModule} from "../records/RecordsModule";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PatientEntity,
    ]),
  ],
  controllers: [
    PatientController,
  ],
  providers: [
    PatientService,
  ],
  exports: [
    PatientService
  ]
})
export class PatientModule {}

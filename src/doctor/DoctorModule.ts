import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DoctorEntity } from './entities/DoctorEntity';

import { DoctorService } from './DoctorService';

import { DoctorController } from './DoctorController';
import {PatientModule} from "../patient/PatientModule";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      DoctorEntity,
    ]),
    PatientModule
  ],
  controllers: [
    DoctorController,
  ],
  providers: [
    DoctorService,
  ],
})
export class DoctorModule {}

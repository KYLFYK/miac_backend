import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RecordsEntity } from './entities/RecordsEntity';

import { RecordsService } from './RecordsService';

import { RecordsController } from './RecordsController';
import {PatientModule} from "../patient/PatientModule";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      RecordsEntity,
    ]),
    PatientModule
  ],
  controllers: [
    RecordsController,
  ],
  providers: [
    RecordsService,
  ],
  exports: [
    RecordsService
  ]
})
export class RecordsModule {}

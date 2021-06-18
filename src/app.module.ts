import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { TypeOrmModule } from '@nestjs/typeorm';

import { AppService } from './app.service';
import {PatientEntity} from "./patient/entities/PatientEntity";
import {PatientModule} from "./patient/PatientModule";
import {DoctorEntity} from "./doctor/entities/DoctorEntity";
import {DoctorModule} from "./doctor/DoctorModule";
import {RecordsEntity} from "./records/entities/RecordsEntity";
import {RecordsModule} from "./records/RecordsModule";

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'mariadb',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT) || 3307,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        entities: [
          RecordsEntity,
          PatientEntity,
          DoctorEntity,

        ],
        synchronize: true
      })
    }),
    RecordsModule,
    PatientModule,
    DoctorModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}

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
import {RecommendEntity} from "./recommend/entities/RecommendEntity";
import {RecommendModule} from "./recommend/RecommendModule";
import {ActivityEntity} from "./activity/entities/ActivityEntity";
import {ActivityModule} from "./activity/ActivityModule";
import {ChronicEntity} from "./chronic/entities/ChronicEntity";
import {ChronicModule} from "./chronic/ChronicModule";

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
          ChronicEntity,
          ActivityEntity,
          RecordsEntity,
          PatientEntity,
          DoctorEntity,
          RecommendEntity,
        ],
        synchronize: true
      })
    }),
    ChronicModule,
    ActivityModule,
    RecordsModule,
    PatientModule,
    DoctorModule,
    RecommendModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}

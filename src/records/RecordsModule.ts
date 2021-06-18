import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RecordsEntity } from './entities/RecordsEntity';

import { RecordsService } from './RecordsService';

import { RecordsController } from './RecordsController';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      RecordsEntity,
    ]),
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

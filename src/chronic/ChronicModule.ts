import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ChronicEntity } from './entities/ChronicEntity';

import { ChronicService } from './ChronicService';

import { ChronicController } from './ChronicController';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ChronicEntity,
    ]),
  ],
  controllers: [
    ChronicController,
  ],
  providers: [
    ChronicService,
  ],
})
export class ChronicModule {}

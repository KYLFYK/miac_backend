import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ActivityEntity } from './entities/ActivityEntity';

import { ActivityService } from './ActivityService';

import { ActivityController } from './ActivityController';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ActivityEntity,
    ]),
  ],
  controllers: [
    ActivityController,
  ],
  providers: [
    ActivityService,
  ],
})
export class ActivityModule {}

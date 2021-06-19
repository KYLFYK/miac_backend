import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RecommendEntity } from './entities/RecommendEntity';

import { RecommendService } from './RecommendService';

import { RecommendController } from './RecommendController';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      RecommendEntity,
    ]),
  ],
  controllers: [
    RecommendController,
  ],
  providers: [
    RecommendService,
  ],
})
export class RecommendModule {}

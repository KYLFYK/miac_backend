import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';

import { RecommendEntity } from '../../src/recommend/entities/RecommendEntity';

export default class RecommendSeeder implements Seeder {
  public async run(factory: Factory, connection: Connection) : Promise<void> {
    const recommendFactory = factory(RecommendEntity)();

    await recommendFactory.createMany(5);
  }
}

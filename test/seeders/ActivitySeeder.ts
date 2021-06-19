import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';

import { ActivityEntity } from '../../src/activity/entities/ActivityEntity';

export default class ActivitySeeder implements Seeder {
  public async run(factory: Factory, connection: Connection) : Promise<void> {
    const activityFactory = factory(ActivityEntity)();

    await activityFactory.createMany(5);
  }
}

import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';

import { RecordsEntity } from '../../src/records/entities/RecordsEntity';

export default class RecordsSeeder implements Seeder {
  public async run(factory: Factory, connection: Connection) : Promise<void> {
    const recordsFactory = factory(RecordsEntity)();

    await recordsFactory.createMany(5);
  }
}

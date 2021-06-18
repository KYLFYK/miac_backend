import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';

import { DoctorEntity } from '../../src/doctor/entities/DoctorEntity';

export default class DoctorSeeder implements Seeder {
  public async run(factory: Factory, connection: Connection) : Promise<void> {
    const doctorFactory = factory(DoctorEntity)();

    await doctorFactory.createMany(5);
  }
}

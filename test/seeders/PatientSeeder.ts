import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';

import { PatientEntity } from '../../src/patient/entities/PatientEntity';

export default class PatientSeeder implements Seeder {
  public async run(factory: Factory, connection: Connection) : Promise<void> {
    const patientFactory = factory(PatientEntity)();

    await patientFactory.createMany(5);
  }
}

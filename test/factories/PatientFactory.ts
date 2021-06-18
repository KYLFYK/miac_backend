import Faker from 'faker';
import { define } from 'typeorm-seeding';

import { PatientEntity } from '../../src/patient/entities/PatientEntity';
import { IPatientCreateData } from '../../src/patient/interfaces/IPatientCreateData';

define(PatientEntity, (faker: typeof Faker) => {
  const entity = new PatientEntity();

  const data: IPatientCreateData = {
    name: faker.lorem.word(),
  };

  return Object.assign(entity, data);
});

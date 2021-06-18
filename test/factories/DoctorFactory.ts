import Faker from 'faker';
import { define } from 'typeorm-seeding';

import { DoctorEntity } from '../../src/doctor/entities/DoctorEntity';
import { IDoctorCreateData } from '../../src/doctor/interfaces/IDoctorCreateData';

define(DoctorEntity, (faker: typeof Faker) => {
  const entity = new DoctorEntity();

  const data: IDoctorCreateData = {
    name: faker.lorem.word(),
  };

  return Object.assign(entity, data);
});

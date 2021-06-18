import Faker from 'faker';
import { define } from 'typeorm-seeding';

import { RecordsEntity } from '../../src/records/entities/RecordsEntity';
import { IRecordsCreateData } from '../../src/records/interfaces/IRecordsCreateData';

define(RecordsEntity, (faker: typeof Faker) => {
  const entity = new RecordsEntity();

  const data: IRecordsCreateData = {
    name: faker.lorem.word(),
  };

  return Object.assign(entity, data);
});

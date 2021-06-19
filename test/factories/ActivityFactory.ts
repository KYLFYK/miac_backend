import Faker from 'faker';
import { define } from 'typeorm-seeding';

import { ActivityEntity } from '../../src/activity/entities/ActivityEntity';
import { IActivityCreateData } from '../../src/activity/interfaces/IActivityCreateData';

define(ActivityEntity, (faker: typeof Faker) => {
  const entity = new ActivityEntity();

  const data: IActivityCreateData = {
    name: faker.lorem.word(),
  };

  return Object.assign(entity, data);
});

import Faker from 'faker';
import { define } from 'typeorm-seeding';

import { RecommendEntity } from '../../src/recommend/entities/RecommendEntity';
import { IRecommendCreateData } from '../../src/recommend/interfaces/IRecommendCreateData';

define(RecommendEntity, (faker: typeof Faker) => {
  const entity = new RecommendEntity();

  const data: IRecommendCreateData = {
    name: faker.lorem.word(),
  };

  return Object.assign(entity, data);
});

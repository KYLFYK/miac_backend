import { INestApplication } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { factory, useSeeding } from 'typeorm-seeding';
import * as request from 'supertest';
import { random } from 'faker';

import { repositoryMockFactory } from '../utils/repositoryMock';

import { ActivityResponseDto } from '../../src/activity/dto/ActivityResponseDto';

import { ActivityEntity } from '../../src/activity/entities/ActivityEntity';

import { createAppTestingModule } from '../utils/createAppTestingModule';
import { createNestTestingApplication } from '../utils/createNestTestingApplication';

describe('Activity (e2e)', () => {
  let app: INestApplication;
  const activityRepositoryMock = repositoryMockFactory();

  beforeAll(async () => {
    const module = await createAppTestingModule()
      .overrideProvider(getRepositoryToken(ActivityEntity))
      .useValue(activityRepositoryMock)
      .compile();

    await useSeeding();

    app = await createNestTestingApplication(module);
  });

  afterAll(async () => {
    await app.close();
  });

  it('GET /activities', async () => {
    const activities = await factory(ActivityEntity)().makeMany(2);

    activities.forEach((item) => item.id = random.number());

    activityRepositoryMock.findAndCount.mockReturnValue([
      activities,
      activities.length,
    ]);

    const items: ActivityResponseDto[] = activities.map(item => ({
      id: item.id,
      name: item.name,
    }));

    return request(app.getHttpServer())
      .get('/activities')
      .expect(200)
      .expect({
        items,
        meta: {
          count: items.length,
        },
      });
  });
});

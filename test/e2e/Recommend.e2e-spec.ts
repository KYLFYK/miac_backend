import { INestApplication } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { factory, useSeeding } from 'typeorm-seeding';
import * as request from 'supertest';
import { random } from 'faker';

import { repositoryMockFactory } from '../utils/repositoryMock';

import { RecommendResponseDto } from '../../src/recommend/dto/RecommendResponseDto';

import { RecommendEntity } from '../../src/recommend/entities/RecommendEntity';

import { createAppTestingModule } from '../utils/createAppTestingModule';
import { createNestTestingApplication } from '../utils/createNestTestingApplication';

describe('Recommend (e2e)', () => {
  let app: INestApplication;
  const recommendRepositoryMock = repositoryMockFactory();

  beforeAll(async () => {
    const module = await createAppTestingModule()
      .overrideProvider(getRepositoryToken(RecommendEntity))
      .useValue(recommendRepositoryMock)
      .compile();

    await useSeeding();

    app = await createNestTestingApplication(module);
  });

  afterAll(async () => {
    await app.close();
  });

  it('GET /recommends', async () => {
    const recommends = await factory(RecommendEntity)().makeMany(2);

    recommends.forEach((item) => item.id = random.number());

    recommendRepositoryMock.findAndCount.mockReturnValue([
      recommends,
      recommends.length,
    ]);

    const items: RecommendResponseDto[] = recommends.map(item => ({
      id: item.id,
      name: item.name,
    }));

    return request(app.getHttpServer())
      .get('/recommends')
      .expect(200)
      .expect({
        items,
        meta: {
          count: items.length,
        },
      });
  });
});

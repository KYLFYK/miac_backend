import { INestApplication } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { factory, useSeeding } from 'typeorm-seeding';
import * as request from 'supertest';
import { random } from 'faker';

import { repositoryMockFactory } from '../utils/repositoryMock';

import { RecordsResponseDto } from '../../src/records/dto/RecordsResponseDto';

import { RecordsEntity } from '../../src/records/entities/RecordsEntity';

import { createAppTestingModule } from '../utils/createAppTestingModule';
import { createNestTestingApplication } from '../utils/createNestTestingApplication';

describe('Records (e2e)', () => {
  let app: INestApplication;
  const recordsRepositoryMock = repositoryMockFactory();

  beforeAll(async () => {
    const module = await createAppTestingModule()
      .overrideProvider(getRepositoryToken(RecordsEntity))
      .useValue(recordsRepositoryMock)
      .compile();

    await useSeeding();

    app = await createNestTestingApplication(module);
  });

  afterAll(async () => {
    await app.close();
  });

  it('GET /records', async () => {
    const records = await factory(RecordsEntity)().makeMany(2);

    records.forEach((item) => item.id = random.number());

    recordsRepositoryMock.findAndCount.mockReturnValue([
      records,
      records.length,
    ]);

    const items: RecordsResponseDto[] = records.map(item => ({
      id: item.id,
      name: item.name,
    }));

    return request(app.getHttpServer())
      .get('/records')
      .expect(200)
      .expect({
        items,
        meta: {
          count: items.length,
        },
      });
  });
});

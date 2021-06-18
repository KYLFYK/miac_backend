import { INestApplication } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { factory, useSeeding } from 'typeorm-seeding';
import * as request from 'supertest';
import { random } from 'faker';

import { repositoryMockFactory } from '../utils/repositoryMock';

import { DoctorResponseDto } from '../../src/doctor/dto/DoctorResponseDto';

import { DoctorEntity } from '../../src/doctor/entities/DoctorEntity';

import { createAppTestingModule } from '../utils/createAppTestingModule';
import { createNestTestingApplication } from '../utils/createNestTestingApplication';

describe('Doctor (e2e)', () => {
  let app: INestApplication;
  const doctorRepositoryMock = repositoryMockFactory();

  beforeAll(async () => {
    const module = await createAppTestingModule()
      .overrideProvider(getRepositoryToken(DoctorEntity))
      .useValue(doctorRepositoryMock)
      .compile();

    await useSeeding();

    app = await createNestTestingApplication(module);
  });

  afterAll(async () => {
    await app.close();
  });

  it('GET /doctors', async () => {
    const doctors = await factory(DoctorEntity)().makeMany(2);

    doctors.forEach((item) => item.id = random.number());

    doctorRepositoryMock.findAndCount.mockReturnValue([
      doctors,
      doctors.length,
    ]);

    const items: DoctorResponseDto[] = doctors.map(item => ({
      id: item.id,
      name: item.name,
    }));

    return request(app.getHttpServer())
      .get('/doctors')
      .expect(200)
      .expect({
        items,
        meta: {
          count: items.length,
        },
      });
  });
});

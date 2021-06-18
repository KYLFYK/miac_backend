import { INestApplication } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { factory, useSeeding } from 'typeorm-seeding';
import * as request from 'supertest';
import { random } from 'faker';

import { repositoryMockFactory } from '../utils/repositoryMock';

import { PatientResponseDto } from '../../src/patient/dto/PatientResponseDto';

import { PatientEntity } from '../../src/patient/entities/PatientEntity';

import { createAppTestingModule } from '../utils/createAppTestingModule';
import { createNestTestingApplication } from '../utils/createNestTestingApplication';

describe('Patient (e2e)', () => {
  let app: INestApplication;
  const patientRepositoryMock = repositoryMockFactory();

  beforeAll(async () => {
    const module = await createAppTestingModule()
      .overrideProvider(getRepositoryToken(PatientEntity))
      .useValue(patientRepositoryMock)
      .compile();

    await useSeeding();

    app = await createNestTestingApplication(module);
  });

  afterAll(async () => {
    await app.close();
  });

  it('GET /patients', async () => {
    const patients = await factory(PatientEntity)().makeMany(2);

    patients.forEach((item) => item.id = random.number());

    patientRepositoryMock.findAndCount.mockReturnValue([
      patients,
      patients.length,
    ]);

    const items: PatientResponseDto[] = patients.map(item => ({
      id: item.id,
      name: item.name,
    }));

    return request(app.getHttpServer())
      .get('/patients')
      .expect(200)
      .expect({
        items,
        meta: {
          count: items.length,
        },
      });
  });
});

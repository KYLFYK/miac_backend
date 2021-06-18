import { NotFoundException } from '@nestjs/common';

import { IPatient } from '../interfaces/IPatient';

export class EPatientNotFound extends NotFoundException {
  constructor(id: IPatient['id']) {
    super({
      code: 'E_PATIENT_01',
      message: `Patient ${id} does not exist`,
    });
  }
}

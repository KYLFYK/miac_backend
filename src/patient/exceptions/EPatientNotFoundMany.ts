import { NotFoundException } from '@nestjs/common';

import { IPatient } from '../interfaces/IPatient';

export class EPatientNotFoundMany extends NotFoundException {
  constructor(ids: IPatient['id'][]) {
    super({
      code: 'E_PATIENT_02',
      message: `Patients with ${ids.join(', ')} do not exist`,
    });
  }
}

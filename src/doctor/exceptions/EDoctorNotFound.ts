import { NotFoundException } from '@nestjs/common';

import { IDoctor } from '../interfaces/IDoctor';

export class EDoctorNotFound extends NotFoundException {
  constructor(id: IDoctor['id']) {
    super({
      code: 'E_DOCTOR_01',
      message: `Doctor ${id} does not exist`,
    });
  }
}

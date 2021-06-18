import { NotFoundException } from '@nestjs/common';

import { IDoctor } from '../interfaces/IDoctor';

export class EDoctorNotFoundMany extends NotFoundException {
  constructor(ids: IDoctor['id'][]) {
    super({
      code: 'E_DOCTOR_02',
      message: `Doctors with ${ids.join(', ')} do not exist`,
    });
  }
}

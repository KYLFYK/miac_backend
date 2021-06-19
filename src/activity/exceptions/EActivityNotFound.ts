import { NotFoundException } from '@nestjs/common';

import { IActivity } from '../interfaces/IActivity';

export class EActivityNotFound extends NotFoundException {
  constructor(id: IActivity['id']) {
    super({
      code: 'E_ACTIVITY_01',
      message: `Activity ${id} does not exist`,
    });
  }
}

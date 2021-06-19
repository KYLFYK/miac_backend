import { NotFoundException } from '@nestjs/common';

import { IActivity } from '../interfaces/IActivity';

export class EActivityNotFoundMany extends NotFoundException {
  constructor(ids: IActivity['id'][]) {
    super({
      code: 'E_ACTIVITY_02',
      message: `Activities with ${ids.join(', ')} do not exist`,
    });
  }
}

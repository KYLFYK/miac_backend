import { NotFoundException } from '@nestjs/common';

import { IChronic } from '../interfaces/IChronic';

export class EChronicNotFound extends NotFoundException {
  constructor(id: IChronic['id']) {
    super({
      code: 'E_CHRONIC_01',
      message: `Chronic ${id} does not exist`,
    });
  }
}

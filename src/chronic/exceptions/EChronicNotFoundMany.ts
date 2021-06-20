import { NotFoundException } from '@nestjs/common';

import { IChronic } from '../interfaces/IChronic';

export class EChronicNotFoundMany extends NotFoundException {
  constructor(ids: IChronic['id'][]) {
    super({
      code: 'E_CHRONIC_02',
      message: `Chronics with ${ids.join(', ')} do not exist`,
    });
  }
}

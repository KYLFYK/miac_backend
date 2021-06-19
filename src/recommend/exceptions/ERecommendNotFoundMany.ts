import { NotFoundException } from '@nestjs/common';

import { IRecommend } from '../interfaces/IRecommend';

export class ERecommendNotFoundMany extends NotFoundException {
  constructor(ids: IRecommend['id'][]) {
    super({
      code: 'E_RECOMMEND_02',
      message: `Recommends with ${ids.join(', ')} do not exist`,
    });
  }
}

import { NotFoundException } from '@nestjs/common';

import { IRecommend } from '../interfaces/IRecommend';

export class ERecommendNotFound extends NotFoundException {
  constructor(id: IRecommend['id']) {
    super({
      code: 'E_RECOMMEND_01',
      message: `Recommend ${id} does not exist`,
    });
  }
}

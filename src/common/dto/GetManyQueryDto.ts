import { ApiPropertyQueryNumber } from '../decorators/ApiPropertyQueryNumber';

import { QueryField } from '../query/types/QueryField';

import { GetManyQueryBaseDto } from './GetManyQueryBaseDto';

const DEFAULT_TAKE_COUNT = 20;

export class GetManyQueryDto<Entity> extends GetManyQueryBaseDto<Entity> {
  @ApiPropertyQueryNumber({
    default: 0,
    description: 'Количество пропущенных элементов',
  })
  [QueryField.skip]: number;

  @ApiPropertyQueryNumber({
    default: DEFAULT_TAKE_COUNT,
    description: 'Количество возвращаемых элементов',
  })
  [QueryField.take]: number;
}

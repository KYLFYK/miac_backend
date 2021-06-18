import { NotFoundException } from '@nestjs/common';

import { IRecords } from '../interfaces/IRecords';

export class ERecordsNotFoundMany extends NotFoundException {
  constructor(ids: IRecords['id'][]) {
    super({
      code: 'E_RECORDS_02',
      message: `Records with ${ids.join(', ')} do not exist`,
    });
  }
}

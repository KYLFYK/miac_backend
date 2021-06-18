import { NotFoundException } from '@nestjs/common';

import { IRecords } from '../interfaces/IRecords';

export class ERecordsNotFound extends NotFoundException {
  constructor(id: IRecords['id']) {
    super({
      code: 'E_RECORDS_01',
      message: `Records ${id} does not exist`,
    });
  }
}

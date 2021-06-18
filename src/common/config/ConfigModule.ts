import { ConfigModule as NestConfigModule } from '@nestjs/config';

import { loadConfig } from './loadConfig';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ConfigModule = NestConfigModule.forRoot({
  isGlobal: true,
  load: [
    loadConfig,
  ],
});

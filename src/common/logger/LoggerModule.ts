import { ConfigService } from '@nestjs/config';
import { IncomingMessage } from 'http';
import { LoggerModule as PinoLoggerModule, Params } from 'nestjs-pino';

import { IConfig } from '../config/IConfig';

import { generateUid } from '../util/generateUid';
import { sqlPrettifier } from './prettifiers/sqlPrettifier';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const LoggerModule = PinoLoggerModule.forRootAsync({
  inject: [
    ConfigService,
  ],
  useFactory: (configService: ConfigService<IConfig>) => ({
    pinoHttp: {
      prettyPrint: process.env.NODE_ENV !== 'production' && {
        customPrettifiers: {
          sql: sqlPrettifier,
        },
      },
      level: configService.get('logLevel'),
      genReqId: (req: IncomingMessage): string => generateUid(),
    },
  } as Params),
});

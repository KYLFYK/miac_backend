import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PinoLogger } from 'nestjs-pino';

import { TypeOrmPinoLogger } from '../logger/TypeOrmPinoLogger';

import { CustomNamingStrategy } from './CustomNamingStrategy';
import { IConfig } from '../config/IConfig';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const DatabaseModule = TypeOrmModule.forRootAsync({
  inject: [
    ConfigService,
    PinoLogger,
  ],
  useFactory: (configService: ConfigService<IConfig>, logger: PinoLogger) => ({
    type: 'postgres',
    url: configService.get('postgresUrl'),
    namingStrategy: new CustomNamingStrategy(),
    entities: [

    ],
    synchronize: true,

    logger: new TypeOrmPinoLogger(logger, configService.get('typeOrmLoggerOptions')),

    logging: configService.get('logLevel') === 'debug',
  }),
});
